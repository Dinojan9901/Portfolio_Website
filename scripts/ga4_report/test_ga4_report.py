"""Tests for ga4_report.py. A fake client stands in for the GA4 Data API: no network, no credentials."""

from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path

import pytest
from google.analytics.data_v1beta.types import (
    DimensionValue,
    MetricValue,
    Row,
    RunReportRequest,
    RunReportResponse,
)
from google.api_core import exceptions as api_exceptions

import ga4_report
from ga4_report import (
    TRACKED_EVENTS,
    Period,
    ReportError,
    load_client,
    main,
    normalize_property_id,
    resolve_periods,
)

TODAY = date(2026, 10, 22)  # default report: 2026-10-15..21, previous 2026-10-08..14
ACCOUNT = "ga4-reporter@portfolio-ga4.iam.gserviceaccount.com"
SITE_ANALYTICS = Path(__file__).resolve().parents[2] / "src" / "lib" / "analytics.ts"


def _response(rows: list[tuple[list[str], list[str]]]) -> RunReportResponse:
    return RunReportResponse(
        rows=[
            Row(
                dimension_values=[DimensionValue(value=d) for d in dims],
                metric_values=[MetricValue(value=m) for m in metrics],
            )
            for dims, metrics in rows
        ]
    )


class FakeClient:
    """Answers run_report from canned data keyed by each period's start date."""

    def __init__(
        self, data: dict[str, dict] | None = None, error: Exception | None = None
    ):
        self.data = data or {}
        self.error = error
        self.requests: list[RunReportRequest] = []

    def run_report(self, request: RunReportRequest) -> RunReportResponse:
        self.requests.append(request)
        if self.error:
            raise self.error
        period = self.data.get(request.date_ranges[0].start_date, {})
        dims = [d.name for d in request.dimensions]
        if not dims:
            totals = period.get("totals")
            return _response([([], [str(totals[0]), str(totals[1])])] if totals else [])
        if dims == ["eventName"]:
            return _response(
                [
                    ([name], [str(count)])
                    for name, count in period.get("events", {}).items()
                ]
            )
        if dims == ["pagePath"]:
            pages = period.get("pages", [])[: request.limit or None]
            return _response([([path], [str(views)]) for path, views in pages])
        raise AssertionError(f"unexpected request: {request}")


SAMPLE = {
    "2026-10-15": {
        "totals": (42, 57),
        "events": {
            "contact_form_submit": 3,
            "project_link_click": 25,
            "cv_or_profile_click": 12,
        },
        "pages": [("/", 54), ("/resume", 2)],
    },
    "2026-10-08": {
        "totals": (30, 40),
        "events": {"project_link_click": 20, "cv_or_profile_click": 12},
        "pages": [("/", 38)],
    },
}


def run(
    capsys, argv: list[str], client: FakeClient | None = None, env: dict | None = None
) -> tuple[int, str, str]:
    factory = (lambda _env: (client, ACCOUNT)) if client is not None else load_client
    code = main(argv, env=env or {}, today=TODAY, client_factory=factory)
    out, err = capsys.readouterr()
    return code, out, err


# --- the event names can't drift from the site -------------------------------------------------


def test_tracked_events_match_the_site_module():
    source = SITE_ANALYTICS.read_text(encoding="utf-8")
    block = re.search(r"ANALYTICS_EVENTS = \{(.*?)\}", source, re.DOTALL)
    assert block, "ANALYTICS_EVENTS not found in src/lib/analytics.ts"
    assert set(re.findall(r"'([a-z_]+)'", block.group(1))) == set(TRACKED_EVENTS)


# --- arguments ------------------------------------------------------------------------------------


def test_default_period_is_last_seven_complete_days():
    current, previous = resolve_periods(None, None, TODAY)
    assert (current.start, current.end) == (date(2026, 10, 15), date(2026, 10, 21))
    assert (previous.start, previous.end) == (date(2026, 10, 8), date(2026, 10, 14))


def test_custom_range_is_compared_with_an_equally_long_previous_range():
    current, previous = resolve_periods(date(2026, 10, 1), date(2026, 10, 10))
    assert current == Period(date(2026, 10, 1), date(2026, 10, 10))
    assert previous == Period(date(2026, 9, 21), date(2026, 9, 30))


@pytest.mark.parametrize(
    ("start", "end", "message"),
    [
        (date(2026, 10, 1), None, "both --start and --end"),
        (date(2026, 10, 10), date(2026, 10, 1), "is after --end"),
    ],
)
def test_bad_date_ranges_are_rejected(start, end, message):
    with pytest.raises(ReportError, match=message):
        resolve_periods(start, end)


def test_property_id_accepts_digits_and_the_properties_prefix():
    assert normalize_property_id(" properties/123456789 ") == "123456789"


@pytest.mark.parametrize(
    ("raw", "message"),
    [
        ("G-AB12CD34EF", "measurement ID"),
        ("my-site", "should be all digits"),
        ("", "No GA4 property ID"),
    ],
)
def test_bad_property_ids_explain_what_is_needed(raw, message):
    with pytest.raises(ReportError, match=message):
        normalize_property_id(raw)


def test_property_id_can_come_from_the_environment(capsys):
    client = FakeClient(SAMPLE)
    code, _, _ = run(capsys, [], client, env={"GA4_PROPERTY_ID": "987654321"})
    assert code == 0
    assert client.requests[0].property == "properties/987654321"


# --- the report -----------------------------------------------------------------------------------


def test_report_compares_traffic_events_and_pages_with_the_previous_week(capsys):
    client = FakeClient(SAMPLE)
    code, out, err = run(capsys, ["--property", "123456789"], client)

    assert code == 0, err
    assert (
        "Property 123456789: **2026-10-15 to 2026-10-21**, compared with 2026-10-08 to 2026-10-14."
        in out
    )
    assert "| Users | 42 | 30 | +40.0% |" in out
    assert "| Sessions | 57 | 40 | +42.5% |" in out
    assert "| contact_form_submit (key event) | 3 | 0 | new |" in out
    assert "| project_link_click | 25 | 20 | +25.0% |" in out
    assert "| cv_or_profile_click | 12 | 12 | +0.0% |" in out
    assert "| `/` | 54 | 38 |" in out
    assert "| `/resume` | 2 | 0 |" in out
    assert "No data for this period" not in out


def test_requests_target_the_property_dates_and_tracked_events(capsys):
    client = FakeClient(SAMPLE)
    run(capsys, ["--property", "123456789", "--top-pages", "5"], client)

    assert (
        len(client.requests) == 6
    )  # totals, events and pages for each of the two periods
    assert {r.property for r in client.requests} == {"properties/123456789"}
    assert [
        (r.date_ranges[0].start_date, r.date_ranges[0].end_date)
        for r in client.requests[::3]
    ] == [
        ("2026-10-15", "2026-10-21"),
        ("2026-10-08", "2026-10-14"),
    ]
    events_request = client.requests[1]
    assert events_request.dimension_filter.filter.field_name == "eventName"
    assert (
        tuple(events_request.dimension_filter.filter.in_list_filter.values)
        == TRACKED_EVENTS
    )
    pages_request = client.requests[2]
    assert pages_request.limit == 5
    assert pages_request.order_bys[0].desc


def test_empty_data_gives_zeros_and_a_hint_not_an_error(capsys):
    code, out, err = run(capsys, ["--property", "123456789"], FakeClient({}))

    assert code == 0, err
    assert "No data for this period" in out
    assert "NEXT_PUBLIC_GA_ID" in out
    assert "| Users | 0 | 0 | - |" in out
    assert "| contact_form_submit (key event) | 0 | 0 | - |" in out
    assert "No page views recorded in this period." in out


def test_output_option_writes_the_report_to_a_file(capsys, tmp_path):
    target = tmp_path / "weekly.md"
    code, out, err = run(
        capsys, ["--property", "123456789", "--output", str(target)], FakeClient(SAMPLE)
    )

    assert code == 0
    assert out == ""
    assert "| Users | 42 | 30 | +40.0% |" in target.read_text(encoding="utf-8")
    assert str(target) in err


# --- errors ---------------------------------------------------------------------------------------


def test_permission_denied_names_the_service_account_to_add_as_viewer(capsys):
    client = FakeClient(
        error=api_exceptions.PermissionDenied(
            "User does not have sufficient permissions"
        )
    )
    code, out, err = run(capsys, ["--property", "123456789"], client)

    assert code == 1
    assert out == ""
    assert "Permission denied for GA4 property 123456789" in err
    assert f"add {ACCOUNT} as a Viewer" in err
    assert "Traceback" not in err


@pytest.mark.parametrize(
    "error",
    [
        api_exceptions.NotFound("Property not found"),
        api_exceptions.InvalidArgument("Invalid property"),
    ],
)
def test_bad_property_errors_are_reported_clearly(capsys, error):
    code, _, err = run(capsys, ["--property", "123456789"], FakeClient(error=error))
    assert code == 1
    assert "GA4 rejected the request for property 123456789" in err


def test_missing_credentials_variable(capsys):
    code, _, err = run(capsys, ["--property", "123456789"], env={})
    assert code == 1
    assert "GOOGLE_APPLICATION_CREDENTIALS is not set" in err


def test_credentials_file_that_does_not_exist(capsys, tmp_path):
    missing = tmp_path / "nope.json"
    code, _, err = run(
        capsys,
        ["--property", "123456789"],
        env={"GOOGLE_APPLICATION_CREDENTIALS": str(missing)},
    )
    assert code == 1
    assert "Service-account key not found" in err
    assert str(missing) in err


@pytest.mark.parametrize(
    ("content", "message"),
    [
        ("{not json", "Could not read"),
        (
            json.dumps({"type": "authorized_user", "client_id": "x"}),
            "is not a service-account key",
        ),
    ],
)
def test_credentials_file_that_is_not_a_service_account_key(tmp_path, content, message):
    key = tmp_path / "key.json"
    key.write_text(content, encoding="utf-8")
    with pytest.raises(ReportError, match=message):
        load_client({"GOOGLE_APPLICATION_CREDENTIALS": str(key)})


def test_valid_key_file_builds_a_client(tmp_path, monkeypatch):
    info = {
        "type": "service_account",
        "client_email": ACCOUNT,
        "private_key": "unused-in-this-test",
    }
    key = tmp_path / "key.json"
    key.write_text(json.dumps(info), encoding="utf-8")
    seen = {}

    def fake_from_info(cls_info):
        seen["info"] = cls_info
        return "client"

    monkeypatch.setattr(
        ga4_report.BetaAnalyticsDataClient,
        "from_service_account_info",
        staticmethod(fake_from_info),
    )
    assert load_client({"GOOGLE_APPLICATION_CREDENTIALS": str(key)}) == (
        "client",
        ACCOUNT,
    )
    assert seen["info"] == info


def test_unparseable_private_key_is_reported(tmp_path):
    key = tmp_path / "key.json"
    key.write_text(
        json.dumps(
            {
                "type": "service_account",
                "client_email": ACCOUNT,
                "private_key": "not a real key",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        ),
        encoding="utf-8",
    )
    with pytest.raises(ReportError, match="could not be loaded"):
        load_client({"GOOGLE_APPLICATION_CREDENTIALS": str(key)})


def test_invalid_date_argument_is_a_usage_error(capsys):
    with pytest.raises(SystemExit) as exit_info:
        main(
            ["--property", "1", "--start", "22/10/2026", "--end", "2026-10-22"],
            env={},
            today=TODAY,
        )
    assert exit_info.value.code == 2
    assert "not a date in YYYY-MM-DD form" in capsys.readouterr().err
