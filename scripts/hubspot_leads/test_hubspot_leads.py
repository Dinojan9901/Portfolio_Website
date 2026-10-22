"""Tests for hubspot_leads.py. A fake HTTP session stands in for HubSpot: no network, no token."""

from __future__ import annotations

import csv
from pathlib import Path

import pytest

import hubspot_leads as hl
from hubspot_leads import (
    MAX_RETRIES,
    Contact,
    HubSpotError,
    LeadsError,
    clean_csv,
    clean_rows,
    main,
    split_full_name,
    upload_contacts,
)

HERE = Path(__file__).resolve().parent
SAMPLE = HERE / "sample_leads.csv"
TOKEN = "pat-na1-00000000-test-fake-token"
UPSERT_URL = "https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert"


# --- fakes ----------------------------------------------------------------------------------------


class FakeResponse:
    def __init__(self, status: int, body=None, headers=None):
        self.status_code = status
        self._body = body
        self.headers = headers or {}

    def json(self):
        if self._body is None:
            raise ValueError("no JSON body")
        return self._body


def ok(payload) -> FakeResponse:
    """A 200 like HubSpot's: every input upserted, alternating new and existing records."""
    results = [
        {"id": str(i), "new": i % 2 == 0, "properties": item["properties"]}
        for i, item in enumerate(payload["inputs"])
    ]
    return FakeResponse(200, {"status": "COMPLETE", "results": results})


class FakeSession:
    """Replies with queued responses (or exceptions) in order; then with ok(payload)."""

    def __init__(self, *replies):
        self.replies = list(replies)
        self.calls: list[dict] = []

    def post(self, url, *, json, headers, timeout):
        self.calls.append(
            {"url": url, "json": json, "headers": headers, "timeout": timeout}
        )
        if self.replies:
            reply = self.replies.pop(0)
            if isinstance(reply, Exception):
                raise reply
            return reply
        return ok(json)


def contacts(n: int) -> list[Contact]:
    return [Contact(f"lead{i}@example.com", f"First{i}") for i in range(n)]


def rows(*cells_per_row):
    return [(line, list(cells)) for line, cells in enumerate(cells_per_row, start=2)]


# --- column mapping -------------------------------------------------------------------------------


@pytest.mark.parametrize(
    "header",
    ["Email", "E-mail", "Email Address", "email_address", " EMAIL ", "Work Email"],
)
def test_email_header_variants_are_recognised(header):
    result = clean_rows([header], rows(["a@example.com"]))
    assert result.columns == {header.strip(): "email"}
    assert [c.email for c in result.contacts] == ["a@example.com"]


def test_other_headers_map_to_hubspot_properties():
    headers = ["First Name", "Surname", "Organisation", "Position", "e-mail", "Phone"]
    result = clean_rows(
        headers, rows(["Jane", "Doe", "Contoso", "CTO", "jane@example.com", "555-0100"])
    )
    assert result.contacts == [
        Contact("jane@example.com", "Jane", "Doe", "Contoso", "CTO")
    ]
    assert result.ignored_columns == ["Phone"]


def test_a_second_email_column_is_ignored_not_merged():
    result = clean_rows(
        ["Email", "Work Email"], rows(["a@example.com", "b@example.com"])
    )
    assert [c.email for c in result.contacts] == ["a@example.com"]
    assert result.ignored_columns == ["Work Email"]


def test_missing_email_column_is_an_error_listing_the_headers():
    with pytest.raises(
        LeadsError, match="No email column found. Headers were: Name, Company"
    ):
        clean_rows(["Name", "Company"], rows(["Jane", "Contoso"]))


# --- cleaning rules -------------------------------------------------------------------------------


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ("  Jane.Doe@Example.COM ", "jane.doe@example.com"),
        ("mailto:jane@example.com", "jane@example.com"),
        ("<jane@example.com>", "jane@example.com"),
        ('"jane@example.com"', "jane@example.com"),
    ],
)
def test_emails_are_trimmed_unwrapped_and_lowercased(raw, expected):
    assert [c.email for c in clean_rows(["Email"], rows([raw])).contacts] == [expected]


@pytest.mark.parametrize(
    ("raw", "reason"),
    [
        ("", "missing email"),
        ("   ", "missing email"),
        ("jane.example.com", "exactly one @"),
        ("jane@@example.com", "exactly one @"),
        ("jane @example.com", "contains a space"),
        ("jane@example", "invalid email format"),
        ("jane..doe@example.com", "invalid email format"),
        ("jane@-example.com", "invalid email format"),
    ],
)
def test_invalid_emails_are_rejected_with_a_reason_and_line_number(raw, reason):
    result = clean_rows(
        ["Email", "Name"], rows(["ok@example.com", "Ok"], [raw, "Someone"])
    )
    assert [c.email for c in result.contacts] == ["ok@example.com"]
    assert len(result.invalid) == 1
    assert result.invalid[0].line == 3
    assert reason in result.invalid[0].reason


@pytest.mark.parametrize(
    ("full", "first", "last"),
    [
        ("Jane Doe", "Jane", "Doe"),
        ("Doe, Jane", "Jane", "Doe"),
        ("  jane   van der Berg ", "Jane", "van der Berg"),
        ("Ana María López", "Ana", "María López"),
        ("Prince", "Prince", ""),
        ("JAMES OKAFOR", "James", "Okafor"),
        ("o'brien, sean", "Sean", "O'Brien"),
    ],
)
def test_full_names_are_split(full, first, last):
    assert split_full_name(full) == (first, last)


def test_explicit_first_and_last_columns_win_over_a_full_name_column():
    headers = ["Email", "Name", "First Name", "Last Name"]
    result = clean_rows(headers, rows(["a@example.com", "Someone Else", "Jane", "Doe"]))
    assert (result.contacts[0].firstname, result.contacts[0].lastname) == (
        "Jane",
        "Doe",
    )


def test_name_case_is_fixed_only_when_all_caps_or_all_lowercase():
    headers = ["Email", "First Name", "Last Name"]
    result = clean_rows(
        headers,
        rows(["a@example.com", "JANE", "McDonald"], ["b@example.com", "li", "WEI"]),
    )
    assert [(c.firstname, c.lastname) for c in result.contacts] == [
        ("Jane", "McDonald"),
        ("Li", "Wei"),
    ]


def test_company_and_title_spaces_are_collapsed_but_case_is_kept():
    result = clean_rows(
        ["Email", "Company", "Title"],
        rows(["a@example.com", "  ACME   GmbH ", " Head of  QA "]),
    )
    assert (result.contacts[0].company, result.contacts[0].jobtitle) == (
        "ACME GmbH",
        "Head of QA",
    )


def test_duplicates_keep_the_first_row_and_fill_its_blanks():
    headers = ["Email", "Name", "Company", "Title"]
    result = clean_rows(
        headers,
        rows(
            ["jane@example.com", "Jane Doe", "Contoso", ""],
            ["JANE@example.com", "J. Doe", "Other Co", "CTO"],
            ["jane@example.com", "", "", ""],
        ),
    )
    assert result.duplicates == 2
    assert result.contacts == [
        Contact("jane@example.com", "Jane", "Doe", "Contoso", "CTO")
    ]


def test_counts_add_up_and_blank_rows_are_skipped():
    result = clean_rows(
        ["Email"],
        rows(
            ["a@example.com"],
            [
                "",
            ],
            ["bad"],
            ["a@example.com"],
            ["  "],
        ),
    )
    assert (
        result.rows_in,
        len(result.contacts),
        result.duplicates,
        len(result.invalid),
        result.blank_rows,
    ) == (
        5,
        1,
        1,
        1,
        2,
    )


def test_short_rows_are_padded_instead_of_crashing():
    result = clean_rows(["Email", "Company", "Title"], rows(["a@example.com"]))
    assert result.contacts == [Contact("a@example.com")]


# --- files ----------------------------------------------------------------------------------------


def test_semicolon_delimited_file_with_a_byte_order_mark(tmp_path):
    path = tmp_path / "leads.csv"
    path.write_text(
        "Email;Full Name;Company\njane@example.com;Jane Doe;Contoso, Inc.\n",
        encoding="utf-8-sig",
    )
    result = clean_csv(path)
    assert result.contacts == [
        Contact("jane@example.com", "Jane", "Doe", "Contoso, Inc.")
    ]


def test_windows_1252_file_falls_back_cleanly(tmp_path):
    path = tmp_path / "leads.csv"
    path.write_bytes("Email,Name\nana@example.com,Ana López\n".encode("cp1252"))
    assert clean_csv(path).contacts[0].lastname == "López"


@pytest.mark.parametrize(
    ("content", "message"), [(None, "Could not read"), ("", "is empty")]
)
def test_unreadable_or_empty_files_are_clear_errors(tmp_path, content, message):
    path = tmp_path / "leads.csv"
    if content is not None:
        path.write_text(content, encoding="utf-8")
    with pytest.raises(LeadsError, match=message):
        clean_csv(path)


def test_sample_file_cleans_to_the_expected_result():
    result = clean_csv(SAMPLE)
    assert (
        result.rows_in,
        len(result.contacts),
        result.duplicates,
        len(result.invalid),
        result.blank_rows,
    ) == (
        14,
        6,
        2,
        5,
        1,
    )
    assert [r.line for r in result.invalid] == [5, 6, 7, 12, 14]
    by_email = {c.email: c for c in result.contacts}
    assert by_email["james.okafor@example.com"] == Contact(
        "james.okafor@example.com", "James", "Okafor", "Contoso Ltd", "Data Engineer"
    )
    assert by_email["lin.wei@example.com"].firstname == "Lin"
    assert by_email["sam.taylor@example.com"].company == "Litware, Inc."
    assert (
        by_email["priya.nair@example.com"].company == "Northwind Traders"
    )  # first row wins
    assert result.ignored_columns == ["Phone", "Notes"]


def test_sample_file_holds_only_fake_example_com_addresses():
    with SAMPLE.open(encoding="utf-8") as handle:
        cells = [row[0] for row in csv.reader(handle)][1:]
    domains = {
        c.rsplit("@", 1)[1].strip().rstrip(">").lower() for c in cells if "@" in c
    }
    assert domains == {
        "example.com",
        "example",
    }  # reserved for documentation (RFC 2606); "example" is a bad row


# --- upload: batching and payloads -----------------------------------------------------------------


def test_contacts_are_sent_in_batches_of_100():
    session = FakeSession()
    result = upload_contacts(contacts(250), TOKEN, session, sleep=lambda s: None)
    assert [len(call["json"]["inputs"]) for call in session.calls] == [100, 100, 50]
    assert (result.batches, result.upserted, result.errors) == (3, 250, [])


def test_upsert_request_matches_on_email_and_sends_only_filled_properties():
    session = FakeSession()
    upload_contacts(
        [Contact("jane@example.com", "Jane", "", "Contoso", "")], TOKEN, session
    )
    call = session.calls[0]
    assert call["url"] == UPSERT_URL
    assert call["headers"]["Authorization"] == f"Bearer {TOKEN}"
    assert call["json"] == {
        "inputs": [
            {
                "idProperty": "email",
                "id": "jane@example.com",
                "properties": {
                    "email": "jane@example.com",
                    "firstname": "Jane",
                    "company": "Contoso",
                },
            }
        ]
    }


def test_created_and_updated_counts_come_from_the_response():
    result = upload_contacts(contacts(5), TOKEN, FakeSession())
    assert (result.upserted, result.created, result.updated) == (5, 3, 2)


def test_partial_errors_in_a_207_response_are_reported():
    multi = FakeResponse(
        207,
        {
            "status": "COMPLETE",
            "results": [{"id": "1", "new": True}],
            "numErrors": 1,
            "errors": [
                {
                    "status": "error",
                    "category": "VALIDATION_ERROR",
                    "message": 'Property "x" does not exist',
                }
            ],
        },
    )
    result = upload_contacts(contacts(2), TOKEN, FakeSession(multi))
    assert result.upserted == 1
    assert result.errors == ['batch 1: Property "x" does not exist']


# --- upload: retries ------------------------------------------------------------------------------


def test_429_waits_for_retry_after_then_succeeds():
    sleeps: list[float] = []
    session = FakeSession(
        FakeResponse(429, {"errorType": "RATE_LIMIT"}, {"Retry-After": "3"})
    )
    result = upload_contacts(contacts(2), TOKEN, session, sleep=sleeps.append)
    assert sleeps == [3.0]
    assert (result.retries, result.upserted, len(session.calls)) == (1, 2, 2)


def test_429_without_retry_after_waits_for_the_rate_limit_window_and_backs_off():
    limited = {"X-HubSpot-RateLimit-Interval-Milliseconds": "10000"}
    session = FakeSession(
        FakeResponse(429, {}, limited), FakeResponse(429, {}, limited)
    )
    sleeps: list[float] = []
    upload_contacts(contacts(1), TOKEN, session, sleep=sleeps.append)
    assert sleeps == [10.0, 20.0]


def test_server_errors_and_network_errors_are_retried():
    session = FakeSession(
        FakeResponse(503), ConnectionError("connection reset"), FakeResponse(502, {})
    )
    result = upload_contacts(contacts(1), TOKEN, session, sleep=lambda s: None)
    assert (result.retries, result.upserted) == (3, 1)


def test_persistent_429_gives_up_after_the_retry_limit():
    session = FakeSession(
        *[FakeResponse(429, {}, {"Retry-After": "1"}) for _ in range(MAX_RETRIES + 1)]
    )
    sleeps: list[float] = []
    with pytest.raises(
        HubSpotError, match=f"still returned 429 after {MAX_RETRIES} retries"
    ):
        upload_contacts(contacts(1), TOKEN, session, sleep=sleeps.append)
    assert len(sleeps) == MAX_RETRIES
    assert len(session.calls) == MAX_RETRIES + 1


def test_daily_limit_is_not_retried():
    session = FakeSession(
        FakeResponse(429, {"errorType": "RATE_LIMIT", "policyName": "DAILY"})
    )
    with pytest.raises(HubSpotError, match="daily API limit"):
        upload_contacts(
            contacts(1), TOKEN, session, sleep=lambda s: pytest.fail("should not wait")
        )
    assert len(session.calls) == 1


def test_waits_are_capped():
    session = FakeSession(FakeResponse(429, {}, {"Retry-After": "3600"}))
    sleeps: list[float] = []
    upload_contacts(contacts(1), TOKEN, session, sleep=sleeps.append)
    assert sleeps == [hl.MAX_WAIT_SECONDS]


# --- upload: errors -------------------------------------------------------------------------------


def test_401_is_one_clear_line_without_the_token():
    session = FakeSession(
        FakeResponse(401, {"status": "error", "category": "INVALID_AUTHENTICATION"})
    )
    with pytest.raises(HubSpotError) as info:
        upload_contacts(contacts(150), TOKEN, session)
    message = str(info.value)
    assert "rejected the token (401)" in message
    assert TOKEN not in message
    assert len(session.calls) == 1  # stops; doesn't try the other batches


def test_403_missing_scope_names_the_scope():
    body = {
        "status": "error",
        "category": "MISSING_SCOPES",
        "message": "This app hasn't been granted all required scopes to make this call.",
        "errors": [
            {
                "message": "One or more of the following scopes are required.",
                "context": {"requiredGranularScopes": ["crm.objects.contacts.write"]},
            }
        ],
    }
    with pytest.raises(
        HubSpotError, match="missing a required scope: crm.objects.contacts.write"
    ):
        upload_contacts(contacts(1), TOKEN, FakeSession(FakeResponse(403, body)))


def test_403_missing_scope_without_details_names_both_contact_scopes():
    with pytest.raises(
        HubSpotError, match="crm.objects.contacts.read and crm.objects.contacts.write"
    ):
        upload_contacts(
            contacts(1),
            TOKEN,
            FakeSession(FakeResponse(403, {"category": "MISSING_SCOPES"})),
        )


def test_other_403_reports_hubspots_message():
    body = {"status": "error", "message": "Portal is locked"}
    with pytest.raises(HubSpotError, match=r"refused access \(403\): Portal is locked"):
        upload_contacts(contacts(1), TOKEN, FakeSession(FakeResponse(403, body)))


def test_a_rejected_batch_is_recorded_and_the_rest_still_upload():
    bad = FakeResponse(
        400,
        {"status": "error", "category": "VALIDATION_ERROR", "message": "Invalid input"},
    )
    session = FakeSession(bad)
    result = upload_contacts(contacts(150), TOKEN, session)
    assert len(session.calls) == 2
    assert result.upserted == 50
    assert result.errors == [
        "batch 1 (100 contacts): HubSpot rejected the batch (400): Invalid input"
    ]


# --- command line ---------------------------------------------------------------------------------


def run(capsys, argv, *, env=None, session=None):
    def factory():
        if session is None:
            pytest.fail("the dry run must not create an HTTP session")
        return session

    code = main(argv, env=env or {}, session_factory=factory, sleep=lambda s: None)
    out, err = capsys.readouterr()
    return code, out, err


def test_dry_run_cleans_writes_and_sends_nothing(capsys, tmp_path):
    output = tmp_path / "clean.csv"
    code, out, _ = run(capsys, [str(SAMPLE), "--dry-run", "--output", str(output)])
    assert code == 0
    assert "Rows in:     14" in out
    assert "Valid:       6" in out
    assert "Duplicates:  2" in out
    assert "line 7: invalid email format (sofia.marquez@example)" in out
    assert "would upsert 6 contacts to HubSpot in 1 batch(es)" in out
    assert "Nothing was sent." in out
    with output.open(encoding="utf-8") as handle:
        written = list(csv.reader(handle))
    assert written[0] == ["email", "firstname", "lastname", "company", "jobtitle"]
    assert len(written) == 7


def test_default_output_sits_next_to_the_input(capsys, tmp_path):
    source = tmp_path / "leads.csv"
    source.write_text("Email\na@example.com\n", encoding="utf-8")
    code, _, _ = run(capsys, [str(source), "--dry-run"])
    assert code == 0
    assert (tmp_path / "leads.clean.csv").is_file()


def test_upload_without_a_token_stops_before_any_request(capsys, tmp_path):
    code, _, err = run(capsys, [str(SAMPLE), "--output", str(tmp_path / "c.csv")])
    assert code == 1
    assert "HUBSPOT_ACCESS_TOKEN is not set" in err


def test_full_upload_reports_results_and_never_prints_the_token(capsys, tmp_path):
    session = FakeSession()
    code, out, err = run(
        capsys,
        [str(SAMPLE), "--output", str(tmp_path / "c.csv")],
        env={"HUBSPOT_ACCESS_TOKEN": TOKEN},
        session=session,
    )
    assert code == 0, err
    assert "Upserted 6 contacts in 1 batch(es): 3 created, 3 updated, 0 retries." in out
    assert TOKEN not in out + err
    assert len(session.calls) == 1


def test_upload_problems_give_exit_code_1(capsys, tmp_path):
    session = FakeSession(FakeResponse(401, {}))
    code, _, err = run(
        capsys,
        [str(SAMPLE), "--output", str(tmp_path / "c.csv")],
        env={"HUBSPOT_ACCESS_TOKEN": TOKEN},
        session=session,
    )
    assert code == 1
    assert err.startswith("error: HubSpot rejected the token (401).")


def test_missing_email_column_is_reported_by_the_cli(capsys, tmp_path):
    source = tmp_path / "leads.csv"
    source.write_text("Name\nJane\n", encoding="utf-8")
    code, _, err = run(capsys, [str(source), "--dry-run"])
    assert code == 1
    assert "No email column found" in err


@pytest.mark.parametrize("size", ["0", "101"])
def test_batch_size_must_be_between_1_and_100(capsys, size):
    with pytest.raises(SystemExit) as info:
        main([str(SAMPLE), "--dry-run", "--batch-size", size], env={})
    assert info.value.code == 2
    assert "must be between 1 and 100" in capsys.readouterr().err
