"""Weekly GA4 report for the portfolio site.

Pulls users, sessions, top pages and the site's three custom events from the GA4 Data API
and prints a Markdown report that compares the period with the one before it.

    python ga4_report.py --property 123456789                 # last 7 complete days
    python ga4_report.py --property 123456789 --start 2026-10-01 --end 2026-10-14

Credentials come from a service-account JSON key whose path is in GOOGLE_APPLICATION_CREDENTIALS.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from collections.abc import Callable, Mapping
from dataclasses import dataclass, field
from datetime import date, timedelta
from pathlib import Path
from typing import Protocol

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Filter,
    FilterExpression,
    Metric,
    OrderBy,
    RunReportRequest,
    RunReportResponse,
)
from google.api_core import exceptions as api_exceptions
from google.auth import exceptions as auth_exceptions

CREDENTIALS_ENV = "GOOGLE_APPLICATION_CREDENTIALS"
PROPERTY_ENV = "GA4_PROPERTY_ID"

# Must match ANALYTICS_EVENTS in src/lib/analytics.ts (a test checks this).
KEY_EVENT = "contact_form_submit"
TRACKED_EVENTS = (KEY_EVENT, "project_link_click", "cv_or_profile_click")


class ReportError(Exception):
    """A problem the user can fix; main() prints the message without a traceback."""


class ReportClient(Protocol):
    def run_report(self, request: RunReportRequest) -> RunReportResponse: ...


@dataclass(frozen=True)
class Period:
    start: date
    end: date

    @property
    def label(self) -> str:
        return f"{self.start.isoformat()} to {self.end.isoformat()}"

    def to_date_range(self) -> DateRange:
        return DateRange(
            start_date=self.start.isoformat(), end_date=self.end.isoformat()
        )


@dataclass
class PeriodData:
    users: int = 0
    sessions: int = 0
    events: dict[str, int] = field(default_factory=dict)
    top_pages: list[tuple[str, int]] = field(default_factory=list)

    @property
    def is_empty(self) -> bool:
        return not (
            self.users or self.sessions or any(self.events.values()) or self.top_pages
        )


def normalize_property_id(raw: str | None) -> str:
    value = (raw or "").strip().removeprefix("properties/")
    if not value:
        raise ReportError(f"No GA4 property ID. Pass --property or set {PROPERTY_ENV}.")
    if value.upper().startswith("G-"):
        raise ReportError(
            f"'{value}' is a measurement ID. The report needs the numeric property ID: "
            "GA4 Admin > Property settings > Property details > Property ID."
        )
    if not value.isdigit():
        raise ReportError(
            f"'{value}' is not a GA4 property ID; it should be all digits, e.g. 123456789."
        )
    return value


def resolve_periods(
    start: date | None, end: date | None, today: date | None = None
) -> tuple[Period, Period]:
    """Return (current, previous). Defaults to the last 7 complete days, ending yesterday."""
    if (start is None) != (end is None):
        raise ReportError(
            "Pass both --start and --end, or neither for the last 7 days."
        )
    if start is None or end is None:
        end = (today or date.today()) - timedelta(days=1)
        start = end - timedelta(days=6)
    if start > end:
        raise ReportError(f"--start ({start}) is after --end ({end}).")
    length = end - start
    previous_end = start - timedelta(days=1)
    return Period(start, end), Period(previous_end - length, previous_end)


def load_client(env: Mapping[str, str]) -> tuple[ReportClient, str]:
    """Build a Data API client from the service-account key named in the environment.

    Returns the client and the service account's email (used in permission errors)."""
    path = env.get(CREDENTIALS_ENV, "").strip()
    if not path:
        raise ReportError(
            f"{CREDENTIALS_ENV} is not set. Point it at your service-account JSON key, "
            'e.g. $env:GOOGLE_APPLICATION_CREDENTIALS = "$HOME\\.secrets\\ga4-service-account.json".'
        )
    key_file = Path(path)
    if not key_file.is_file():
        raise ReportError(
            f"Service-account key not found: {key_file}. Check {CREDENTIALS_ENV}."
        )
    try:
        info = json.loads(key_file.read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        raise ReportError(f"Could not read {key_file} as JSON: {exc}") from exc
    if (
        not isinstance(info, dict)
        or info.get("type") != "service_account"
        or "client_email" not in info
    ):
        raise ReportError(
            f'{key_file} is not a service-account key (expected "type": "service_account").'
        )
    try:
        client = BetaAnalyticsDataClient.from_service_account_info(info)
    except (ValueError, auth_exceptions.GoogleAuthError) as exc:
        raise ReportError(
            f"{key_file} looks like a service-account key but could not be loaded: {exc}"
        ) from exc
    return client, info["client_email"]


def _run(
    client: ReportClient, request: RunReportRequest, property_id: str, account: str
) -> RunReportResponse:
    try:
        return client.run_report(request)
    except api_exceptions.PermissionDenied as exc:
        raise ReportError(
            f"Permission denied for GA4 property {property_id}. In GA4 Admin > Property access management, "
            f"add {account} as a Viewer. If it already has access, check that the Google Analytics Data API "
            f"is enabled in its Google Cloud project. (GA4 said: {exc.message})"
        ) from exc
    except api_exceptions.Unauthenticated as exc:
        raise ReportError(
            f"GA4 rejected the credentials for {account}: {exc.message}"
        ) from exc
    except (api_exceptions.NotFound, api_exceptions.InvalidArgument) as exc:
        raise ReportError(
            f"GA4 rejected the request for property {property_id}: {exc.message}"
        ) from exc
    except api_exceptions.GoogleAPICallError as exc:
        raise ReportError(f"GA4 Data API error: {exc.message}") from exc


def fetch_period(
    client: ReportClient, property_id: str, period: Period, account: str, top_pages: int
) -> PeriodData:
    prop = f"properties/{property_id}"
    ranges = [period.to_date_range()]
    data = PeriodData(events={name: 0 for name in TRACKED_EVENTS})

    totals = _run(
        client,
        RunReportRequest(
            property=prop,
            date_ranges=ranges,
            metrics=[Metric(name="activeUsers"), Metric(name="sessions")],
        ),
        property_id,
        account,
    )
    if totals.rows:
        data.users = int(totals.rows[0].metric_values[0].value)
        data.sessions = int(totals.rows[0].metric_values[1].value)

    events = _run(
        client,
        RunReportRequest(
            property=prop,
            date_ranges=ranges,
            dimensions=[Dimension(name="eventName")],
            metrics=[Metric(name="eventCount")],
            dimension_filter=FilterExpression(
                filter=Filter(
                    field_name="eventName",
                    in_list_filter=Filter.InListFilter(values=list(TRACKED_EVENTS)),
                )
            ),
        ),
        property_id,
        account,
    )
    for row in events.rows:
        data.events[row.dimension_values[0].value] = int(row.metric_values[0].value)

    pages = _run(
        client,
        RunReportRequest(
            property=prop,
            date_ranges=ranges,
            dimensions=[Dimension(name="pagePath")],
            metrics=[Metric(name="screenPageViews")],
            order_bys=[
                OrderBy(
                    metric=OrderBy.MetricOrderBy(metric_name="screenPageViews"),
                    desc=True,
                )
            ],
            limit=top_pages,
        ),
        property_id,
        account,
    )
    data.top_pages = [
        (row.dimension_values[0].value, int(row.metric_values[0].value))
        for row in pages.rows
    ]
    return data


def format_change(current: int, previous: int) -> str:
    if previous == 0:
        return "new" if current else "-"
    return f"{(current - previous) / previous * 100:+.1f}%"


def render_markdown(
    property_id: str,
    periods: tuple[Period, Period],
    current: PeriodData,
    previous: PeriodData,
) -> str:
    this, last = periods
    lines = [
        "# Portfolio GA4 report",
        "",
        f"Property {property_id}: **{this.label}**, compared with {last.label}.",
        "",
    ]
    if current.is_empty:
        lines += [
            "> No data for this period. GA4 can take 24-48 hours to process new data. If the site has had",
            "> visitors, check that NEXT_PUBLIC_GA_ID is set in Vercel and that the site was redeployed.",
            "",
        ]

    lines += [
        "## Traffic",
        "",
        "| Metric | This period | Previous | Change |",
        "|---|---:|---:|---:|",
    ]
    lines.append(
        f"| Users | {current.users} | {previous.users} | {format_change(current.users, previous.users)} |"
    )
    lines.append(
        f"| Sessions | {current.sessions} | {previous.sessions} | {format_change(current.sessions, previous.sessions)} |"
    )

    lines += [
        "",
        "## Events",
        "",
        "| Event | This period | Previous | Change |",
        "|---|---:|---:|---:|",
    ]
    for name in TRACKED_EVENTS:
        label = f"{name} (key event)" if name == KEY_EVENT else name
        now, before = current.events.get(name, 0), previous.events.get(name, 0)
        lines.append(f"| {label} | {now} | {before} | {format_change(now, before)} |")

    lines += ["", "## Top pages", ""]
    if current.top_pages:
        previous_views = dict(previous.top_pages)
        lines += ["| Page | Views | Previous |", "|---|---:|---:|"]
        for path, views in current.top_pages:
            lines.append(f"| `{path}` | {views} | {previous_views.get(path, 0)} |")
    else:
        lines.append("No page views recorded in this period.")
    return "\n".join(lines) + "\n"


def _iso_date(value: str) -> date:
    try:
        return date.fromisoformat(value)
    except ValueError as exc:
        raise argparse.ArgumentTypeError(
            f"'{value}' is not a date in YYYY-MM-DD form"
        ) from exc


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Markdown report of the portfolio's GA4 traffic and events."
    )
    parser.add_argument(
        "--property", help=f"numeric GA4 property ID (default: ${PROPERTY_ENV})"
    )
    parser.add_argument(
        "--start",
        type=_iso_date,
        help="first day, YYYY-MM-DD (default: 7 days before --end)",
    )
    parser.add_argument(
        "--end", type=_iso_date, help="last day, YYYY-MM-DD (default: yesterday)"
    )
    parser.add_argument(
        "--top-pages",
        type=int,
        default=10,
        help="number of pages to list (default: 10)",
    )
    parser.add_argument(
        "--output", type=Path, help="write the report to this file instead of stdout"
    )
    return parser


def main(
    argv: list[str] | None = None,
    *,
    env: Mapping[str, str] | None = None,
    today: date | None = None,
    client_factory: Callable[
        [Mapping[str, str]], tuple[ReportClient, str]
    ] = load_client,
) -> int:
    args = build_parser().parse_args(argv)
    env = os.environ if env is None else env
    try:
        property_id = normalize_property_id(args.property or env.get(PROPERTY_ENV))
        periods = resolve_periods(args.start, args.end, today)
        client, account = client_factory(env)
        current = fetch_period(client, property_id, periods[0], account, args.top_pages)
        previous = fetch_period(
            client, property_id, periods[1], account, args.top_pages
        )
    except ReportError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1

    report = render_markdown(property_id, periods, current, previous)
    if args.output:
        args.output.write_text(report, encoding="utf-8")
        print(f"Report written to {args.output}", file=sys.stderr)
    else:
        sys.stdout.write(report)
    return 0


if __name__ == "__main__":
    sys.exit(main())
