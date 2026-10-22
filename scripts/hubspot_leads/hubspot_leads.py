"""Clean an event-lead CSV and upsert the leads into HubSpot as contacts.

    python hubspot_leads.py sample_leads.csv --dry-run     # clean and show the plan; sends nothing
    python hubspot_leads.py leads.csv                      # clean, then upsert to HubSpot

Cleaning maps messy headers (E-mail, Email Address, Full Name, Organisation, ...) to HubSpot's
email, firstname, lastname, company and jobtitle; trims and lowercases emails, validates them,
splits full names and merges duplicates by email. Valid rows go to <input>.clean.csv.

Uploading uses the CRM v3 batch upsert endpoint, matched on email, 100 contacts per request.
The token comes from HUBSPOT_ACCESS_TOKEN: a HubSpot service key (or an existing legacy private
app token) with the crm.objects.contacts.read and crm.objects.contacts.write scopes.
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import os
import re
import sys
import time
from collections.abc import Callable, Iterator, Mapping, Sequence
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Protocol

TOKEN_ENV = "HUBSPOT_ACCESS_TOKEN"
API_BASE = "https://api.hubapi.com"
UPSERT_PATH = "/crm/v3/objects/contacts/batch/upsert"
MAX_BATCH = 100  # HubSpot's limit for batch endpoints
MAX_RETRIES = 5
MAX_WAIT_SECONDS = 60.0
FIELDS = ("email", "firstname", "lastname", "company", "jobtitle")

# Header aliases, compared after lowercasing and dropping everything but letters and digits,
# so "E-mail", "Email Address", "email_address" and " EMAIL " all match.
_ALIASES = {
    "email": {
        "email",
        "emailaddress",
        "mail",
        "workemail",
        "businessemail",
        "emailid",
        "contactemail",
    },
    "firstname": {"firstname", "first", "givenname", "fname", "forename"},
    "lastname": {"lastname", "last", "surname", "familyname", "lname"},
    "fullname": {
        "name",
        "fullname",
        "contactname",
        "attendee",
        "attendeename",
        "leadname",
    },
    "company": {
        "company",
        "companyname",
        "organisation",
        "organization",
        "org",
        "employer",
        "account",
    },
    "jobtitle": {"jobtitle", "title", "position", "role", "designation"},
}
_HEADER_TO_FIELD = {
    alias: name for name, aliases in _ALIASES.items() for alias in aliases
}

_EMAIL_RE = re.compile(
    r"^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*"
    r"@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$"
)


class LeadsError(Exception):
    """A problem with the input file; main() prints it without a traceback."""


class HubSpotError(Exception):
    """HubSpot refused the whole upload (bad token, missing scope, limits): stop."""


class BatchRejected(HubSpotError):
    """HubSpot rejected one batch (e.g. a validation error): record it, carry on."""


# --- cleaning -------------------------------------------------------------------------------------


@dataclass
class Contact:
    email: str
    firstname: str = ""
    lastname: str = ""
    company: str = ""
    jobtitle: str = ""

    def properties(self) -> dict[str, str]:
        """Only non-empty values, so an upsert never blanks a field already set in HubSpot."""
        return {name: value for name in FIELDS if (value := getattr(self, name))}


@dataclass
class Rejected:
    line: int
    reason: str


@dataclass
class CleanResult:
    contacts: list[Contact]
    rows_in: int
    duplicates: int
    blank_rows: int
    invalid: list[Rejected]
    columns: dict[str, str]  # original header -> field it was mapped to
    ignored_columns: list[str]


def _header_key(header: str) -> str:
    return re.sub(r"[^a-z0-9]", "", header.lower())


def map_columns(
    headers: Sequence[str],
) -> tuple[dict[int, str], dict[str, str], list[str]]:
    """Return (column index -> field, original header -> field, ignored headers)."""
    by_index: dict[int, str] = {}
    mapped: dict[str, str] = {}
    ignored: list[str] = []
    for index, header in enumerate(headers):
        name = _HEADER_TO_FIELD.get(_header_key(header))
        if name is None or name in by_index.values():
            ignored.append(header.strip() or f"(column {index + 1})")
            continue
        by_index[index] = name
        mapped[header.strip()] = name
    if "email" not in by_index.values():
        raise LeadsError(
            f"No email column found. Headers were: {', '.join(h.strip() for h in headers)}"
        )
    return by_index, mapped, ignored


def normalize_email(value: str) -> str:
    email = value.strip().strip("<>\"'").strip()
    if email.lower().startswith("mailto:"):
        email = email[len("mailto:") :]
    return email.lower()


def email_problem(email: str) -> str | None:
    if not email:
        return "missing email"
    if email.count("@") != 1:
        return f"email must contain exactly one @ ({email})"
    if any(ch.isspace() for ch in email):
        return f"email contains a space ({email})"
    if not _EMAIL_RE.match(email):
        return f"invalid email format ({email})"
    return None


def tidy(value: str) -> str:
    return " ".join(value.split())


def tidy_name(value: str) -> str:
    """Collapse spaces; fix ALL-CAPS or all-lowercase names, but leave mixed case (McDonald) alone."""
    name = tidy(value)
    if any(ch.isalpha() for ch in name) and (name.isupper() or name.islower()):
        return name.title()
    return name


def split_full_name(full_name: str) -> tuple[str, str]:
    """'Jane Doe' -> (Jane, Doe); 'Doe, Jane' -> (Jane, Doe); 'Jane van der Berg' -> (Jane, van der Berg)."""
    name = tidy(full_name)
    if "," in name:
        last, _, first = name.partition(",")
        return tidy_name(first), tidy_name(last)
    first, _, last = name.partition(" ")
    return tidy_name(first), tidy_name(last)


def clean_rows(
    headers: Sequence[str], rows: Sequence[tuple[int, Sequence[str]]]
) -> CleanResult:
    """Clean parsed CSV rows. Each row is (line number in the file, cells)."""
    by_index, mapped, ignored = map_columns(headers)
    contacts: dict[str, Contact] = {}
    invalid: list[Rejected] = []
    duplicates = blank_rows = 0

    for line, cells in rows:
        if not any(cell.strip() for cell in cells):
            blank_rows += 1
            continue
        values = {
            name: (cells[i] if i < len(cells) else "") for i, name in by_index.items()
        }
        email = normalize_email(values.get("email", ""))
        problem = email_problem(email)
        if problem:
            invalid.append(Rejected(line, problem))
            continue

        first, last = (
            tidy_name(values.get("firstname", "")),
            tidy_name(values.get("lastname", "")),
        )
        if not first and not last and values.get("fullname", "").strip():
            first, last = split_full_name(values["fullname"])
        contact = Contact(
            email,
            first,
            last,
            tidy(values.get("company", "")),
            tidy(values.get("jobtitle", "")),
        )

        kept = contacts.get(email)
        if kept is None:
            contacts[email] = contact
            continue
        duplicates += 1  # keep the first row, fill its blanks from the duplicate
        for name in FIELDS[1:]:
            if not getattr(kept, name):
                setattr(kept, name, getattr(contact, name))

    return CleanResult(
        contacts=list(contacts.values()),
        rows_in=len(rows),
        duplicates=duplicates,
        blank_rows=blank_rows,
        invalid=invalid,
        columns=mapped,
        ignored_columns=ignored,
    )


def read_csv(path: Path) -> tuple[list[str], list[tuple[int, list[str]]]]:
    try:
        raw = path.read_bytes()
    except OSError as exc:
        raise LeadsError(f"Could not read {path}: {exc.strerror or exc}") from exc
    try:
        text = raw.decode("utf-8-sig")
    except UnicodeDecodeError:
        text = raw.decode("cp1252", errors="replace")  # Excel's default on Windows
    if not text.strip():
        raise LeadsError(f"{path} is empty.")
    try:
        dialect: Any = csv.Sniffer().sniff(text[:4096], delimiters=",;\t")
    except csv.Error:
        dialect = csv.excel
    reader = csv.reader(io.StringIO(text), dialect)
    headers = next(reader)
    rows = [(reader.line_num, row) for row in reader]
    return headers, rows


def clean_csv(path: Path) -> CleanResult:
    headers, rows = read_csv(path)
    return clean_rows(headers, rows)


def write_clean_csv(contacts: Sequence[Contact], path: Path) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.writer(handle)
        writer.writerow(FIELDS)
        for contact in contacts:
            writer.writerow([getattr(contact, name) for name in FIELDS])


def default_output(input_path: Path) -> Path:
    return input_path.with_name(f"{input_path.stem}.clean.csv")


# --- uploading ------------------------------------------------------------------------------------


class Response(Protocol):
    status_code: int
    headers: Mapping[str, str]

    def json(self) -> Any: ...


class Session(Protocol):
    def post(
        self, url: str, *, json: Any, headers: Mapping[str, str], timeout: float
    ) -> Response: ...


@dataclass
class UploadResult:
    batches: int = 0
    upserted: int = 0
    created: int = 0
    updated: int = 0
    retries: int = 0
    errors: list[str] = field(default_factory=list)


def batches(items: Sequence[Contact], size: int) -> Iterator[Sequence[Contact]]:
    for start in range(0, len(items), size):
        yield items[start : start + size]


def upsert_payload(contacts: Sequence[Contact]) -> dict[str, Any]:
    return {
        "inputs": [
            {"idProperty": "email", "id": c.email, "properties": c.properties()}
            for c in contacts
        ]
    }


def _body(response: Response) -> dict[str, Any]:
    try:
        body = response.json()
    except ValueError:
        return {}
    return body if isinstance(body, dict) else {}


def _short(message: str, limit: int = 300) -> str:
    message = " ".join(str(message).split())
    return message if len(message) <= limit else message[: limit - 3] + "..."


def _wait_seconds(response: Response, attempt: int) -> float:
    """Retry-After if HubSpot sent one; otherwise the rate-limit window, backing off per attempt."""
    headers = {k.lower(): v for k, v in response.headers.items()}
    try:
        return min(float(headers["retry-after"]), MAX_WAIT_SECONDS)
    except (KeyError, ValueError):
        pass
    try:
        window = float(headers["x-hubspot-ratelimit-interval-milliseconds"]) / 1000
    except (KeyError, ValueError):
        window = 1.0
    return min(window * (2**attempt), MAX_WAIT_SECONDS)


def _error_for(response: Response) -> HubSpotError:
    body = _body(response)
    status = response.status_code
    message = _short(body.get("message") or f"HTTP {status}")
    if status == 401:
        return HubSpotError(
            f"HubSpot rejected the token (401). Check that {TOKEN_ENV} holds a current service key or "
            "private app token; it may have been rotated or deleted."
        )
    if status == 403:
        scopes = sorted(
            {
                scope
                for error in body.get("errors") or []
                for key in ("requiredGranularScopes", "requiredScopes")
                for scope in (error.get("context") or {}).get(key) or []
            }
        )
        if body.get("category") == "MISSING_SCOPES" or scopes:
            needed = (
                ", ".join(scopes)
                or "crm.objects.contacts.read and crm.objects.contacts.write"
            )
            return HubSpotError(
                f"The HubSpot key is missing a required scope: {needed}. Add it to the key "
                "(Development > Keys > Service keys > your key > Edit), then run again."
            )
        return HubSpotError(f"HubSpot refused access (403): {message}")
    return BatchRejected(f"HubSpot rejected the batch ({status}): {message}")


def _post_with_retry(
    session: Session,
    url: str,
    payload: dict[str, Any],
    headers: Mapping[str, str],
    sleep: Callable[[float], None],
    result: UploadResult,
) -> dict[str, Any]:
    for attempt in range(MAX_RETRIES + 1):
        try:
            response = session.post(url, json=payload, headers=headers, timeout=30)
        except OSError as exc:  # requests' network errors are OSError subclasses
            if attempt == MAX_RETRIES:
                raise HubSpotError(
                    f"Could not reach HubSpot after {MAX_RETRIES} retries: {_short(str(exc))}"
                ) from exc
            result.retries += 1
            sleep(min(2.0**attempt, MAX_WAIT_SECONDS))
            continue

        status = response.status_code
        if status in (200, 201, 207):
            return _body(response)
        if status == 429 or status >= 500:
            if status == 429 and _body(response).get("policyName") == "DAILY":
                raise HubSpotError(
                    "HubSpot's daily API limit is used up; it resets at midnight in the account's "
                    "time zone. Try again then."
                )
            if attempt == MAX_RETRIES:
                raise HubSpotError(
                    f"HubSpot still returned {status} after {MAX_RETRIES} retries; try again later."
                )
            result.retries += 1
            sleep(_wait_seconds(response, attempt))
            continue
        raise _error_for(response)
    raise AssertionError("unreachable")


def upload_contacts(
    contacts: Sequence[Contact],
    token: str,
    session: Session,
    *,
    batch_size: int = MAX_BATCH,
    sleep: Callable[[float], None] = time.sleep,
    log: Callable[[str], None] = lambda _msg: None,
) -> UploadResult:
    """Upsert contacts in batches. Raises HubSpotError on problems that affect every batch."""
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    url = API_BASE + UPSERT_PATH
    result = UploadResult()
    total = -(-len(contacts) // batch_size)
    for number, batch in enumerate(batches(contacts, batch_size), start=1):
        result.batches += 1
        try:
            body = _post_with_retry(
                session, url, upsert_payload(batch), headers, sleep, result
            )
        except BatchRejected as exc:
            result.errors.append(f"batch {number} ({len(batch)} contacts): {exc}")
            log(f"batch {number}/{total}: rejected")
            continue
        records = body.get("results") or []
        result.upserted += len(records)
        result.created += sum(1 for r in records if r.get("new") is True)
        result.updated += sum(1 for r in records if r.get("new") is False)
        for error in body.get("errors") or []:
            result.errors.append(
                f"batch {number}: {_short(error.get('message') or error)}"
            )
        log(f"batch {number}/{total}: {len(records)} upserted")
    return result


# --- reporting and CLI ----------------------------------------------------------------------------


def format_summary(result: CleanResult, output: Path) -> str:
    lines = [
        f"Rows in:     {result.rows_in}",
        f"Valid:       {len(result.contacts)}  (written to {output})",
        f"Duplicates:  {result.duplicates}  (merged by email)",
        f"Invalid:     {len(result.invalid)}",
    ]
    lines += [f"  line {r.line}: {r.reason}" for r in result.invalid]
    if result.blank_rows:
        lines.append(f"Blank rows:  {result.blank_rows}  (skipped)")
    columns = ", ".join(
        f'"{header}" -> {"firstname + lastname" if name == "fullname" else name}'
        for header, name in result.columns.items()
    )
    lines.append(f"Columns:     {columns}")
    if result.ignored_columns:
        lines.append(f"Ignored:     {', '.join(result.ignored_columns)}")
    return "\n".join(lines)


def _batch_size(value: str) -> int:
    size = int(value)
    if not 1 <= size <= MAX_BATCH:
        raise argparse.ArgumentTypeError(f"must be between 1 and {MAX_BATCH}")
    return size


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Clean an event-lead CSV and upsert it into HubSpot contacts."
    )
    parser.add_argument(
        "input", type=Path, help="lead CSV exported from the event tool"
    )
    parser.add_argument(
        "--output", type=Path, help="clean CSV path (default: <input>.clean.csv)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="clean and show the upload plan; send nothing",
    )
    parser.add_argument(
        "--batch-size",
        type=_batch_size,
        default=MAX_BATCH,
        help="contacts per request (max 100)",
    )
    return parser


def _requests_session() -> Session:
    import requests  # imported here so cleaning and dry runs work without it

    return requests.Session()


def main(
    argv: list[str] | None = None,
    *,
    env: Mapping[str, str] | None = None,
    session_factory: Callable[[], Session] = _requests_session,
    sleep: Callable[[float], None] = time.sleep,
) -> int:
    args = build_parser().parse_args(argv)
    env = os.environ if env is None else env
    output = args.output or default_output(args.input)
    try:
        cleaned = clean_csv(args.input)
        write_clean_csv(cleaned.contacts, output)
    except LeadsError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    print(format_summary(cleaned, output))

    contacts = cleaned.contacts
    if not contacts:
        print("\nNo valid contacts to upload.")
        return 0
    planned = -(-len(contacts) // args.batch_size)
    if args.dry_run:
        print(
            f"\nDry run: would upsert {len(contacts)} contacts to HubSpot in {planned} batch(es) of up to "
            f"{args.batch_size}, matched on email. Nothing was sent."
        )
        preview = upsert_payload(contacts[:3])
        print(
            "First records of batch 1:\n"
            + json.dumps(preview, indent=2, ensure_ascii=False)
        )
        return 0

    token = env.get(TOKEN_ENV, "").strip()
    if not token:
        print(
            f"error: {TOKEN_ENV} is not set. Create a HubSpot service key with the "
            "crm.objects.contacts.read and crm.objects.contacts.write scopes, then set it, or use --dry-run.",
            file=sys.stderr,
        )
        return 1
    try:
        uploaded = upload_contacts(
            contacts,
            token,
            session_factory(),
            batch_size=args.batch_size,
            sleep=sleep,
            log=lambda msg: print(msg, file=sys.stderr),
        )
    except HubSpotError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1

    print(
        f"\nUpserted {uploaded.upserted} contacts in {uploaded.batches} batch(es): "
        f"{uploaded.created} created, {uploaded.updated} updated, {uploaded.retries} retries."
    )
    if uploaded.errors:
        print(f"{len(uploaded.errors)} problem(s):", file=sys.stderr)
        for error in uploaded.errors:
            print(f"  {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
