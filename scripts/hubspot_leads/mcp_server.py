"""MCP server: clean event leads and upsert them into HubSpot, over the Model Context Protocol (stdio).

    python mcp_server.py
    claude mcp add hubspot-leads -e HUBSPOT_ACCESS_TOKEN=... -- <venv python> <path>/mcp_server.py

A thin adapter over hubspot_leads.py, with the same guarantees as the CLI:

  * **clean_leads** cleans a CSV and writes <input>.clean.csv. Nothing leaves the machine.
  * **upload_leads** cleans, then upserts to HubSpot, but only when called with dry_run=false.
    By default it returns the plan and sends nothing.
  * **The token never passes through a tool call.** It's read from HUBSPOT_ACCESS_TOKEN in the
    server's own environment, so it can't land in a model's context or a transcript.
  * Only .csv files are read or written.

Write nothing to stdout: on the stdio transport it is the protocol channel.
"""

from __future__ import annotations

import json
import os
import time
from collections.abc import Callable, Mapping
from pathlib import Path
from typing import Any

import anyio
from mcp import types
from mcp.server.lowlevel import Server
from mcp.server.stdio import stdio_server

import hubspot_leads as hl

_PATH_ARGS = {
    "csv_path": {
        "type": "string",
        "description": "Path to the lead CSV exported from the event tool.",
    },
    "output_path": {
        "type": "string",
        "description": "Where to write the cleaned CSV (default: <input>.clean.csv next to the input).",
    },
}

TOOLS = [
    types.Tool(
        name="clean_leads",
        description=(
            "Clean an event-lead CSV for HubSpot: map messy headers to email, firstname, lastname, company "
            "and jobtitle; trim and lowercase emails; reject invalid emails with reasons; split full names; "
            "merge duplicates by email. Writes the cleaned CSV and returns a summary. Sends nothing anywhere."
        ),
        input_schema={
            "type": "object",
            "properties": _PATH_ARGS,
            "required": ["csv_path"],
            "additionalProperties": False,
        },
        annotations=types.ToolAnnotations(
            title="Clean lead CSV",
            read_only_hint=False,
            destructive_hint=False,
            idempotent_hint=True,
            open_world_hint=False,
        ),
    ),
    types.Tool(
        name="upload_leads",
        description=(
            "Clean an event-lead CSV, then upsert the valid leads into HubSpot contacts, matched on email, "
            "100 per request. Dry run by default: returns what would be sent and sends nothing. Pass "
            "dry_run=false only after the user has confirmed the upload. Existing contacts with the same "
            "email are updated with the CSV's non-empty values."
        ),
        input_schema={
            "type": "object",
            "properties": {
                **_PATH_ARGS,
                "dry_run": {
                    "type": "boolean",
                    "default": True,
                    "description": "true (default): plan only, send nothing. false: upload to HubSpot.",
                },
            },
            "required": ["csv_path"],
            "additionalProperties": False,
        },
        annotations=types.ToolAnnotations(
            title="Upload leads to HubSpot",
            read_only_hint=False,
            destructive_hint=True,
            idempotent_hint=True,
            open_world_hint=True,
        ),
    ),
]


class ToolInputError(Exception):
    pass


def _csv_path(raw: Any, *, must_exist: bool) -> Path:
    if not isinstance(raw, str) or not raw.strip():
        raise ToolInputError("Give a path to a .csv file.")
    path = Path(raw.strip()).expanduser().resolve()
    if path.suffix.lower() != ".csv":
        raise ToolInputError(f"Only .csv files are allowed: {path.name}")
    if must_exist and not path.is_file():
        raise ToolInputError(f"File not found: {path}")
    return path


def _clean(arguments: Mapping[str, Any]) -> tuple[hl.CleanResult, dict[str, Any]]:
    source = _csv_path(arguments.get("csv_path"), must_exist=True)
    output = (
        _csv_path(arguments["output_path"], must_exist=False)
        if arguments.get("output_path")
        else hl.default_output(source)
    )
    if output == source:
        raise ToolInputError(
            "output_path must differ from csv_path; the input file is never overwritten."
        )
    result = hl.clean_csv(source)
    hl.write_clean_csv(result.contacts, output)
    summary = {
        "rows_in": result.rows_in,
        "valid": len(result.contacts),
        "duplicates_merged": result.duplicates,
        "invalid": [{"line": r.line, "reason": r.reason} for r in result.invalid],
        "blank_rows": result.blank_rows,
        "columns": result.columns,
        "ignored_columns": result.ignored_columns,
        "clean_csv": str(output),
    }
    return result, summary


def call(
    name: str,
    arguments: Mapping[str, Any] | None,
    *,
    env: Mapping[str, str],
    session_factory: Callable[[], hl.Session],
    sleep: Callable[[float], None],
) -> tuple[dict[str, Any], bool]:
    """Run one tool. Returns (result, is_error)."""
    arguments = arguments or {}
    try:
        if name == "clean_leads":
            return _clean(arguments)[1], False
        if name != "upload_leads":
            return {"error": f"Unknown tool: {name}"}, True

        dry_run = arguments.get("dry_run", True)
        if not isinstance(dry_run, bool):
            raise ToolInputError("dry_run must be true or false.")
        cleaned, summary = _clean(arguments)
        contacts = cleaned.contacts
        planned = -(-len(contacts) // hl.MAX_BATCH)
        if dry_run or not contacts:
            note = (
                "Dry run: nothing was sent."
                if contacts
                else "No valid contacts to upload."
            )
            return {
                **summary,
                "dry_run": True,
                "would_upsert": len(contacts),
                "batches": planned,
                "note": note,
            }, False

        token = env.get(hl.TOKEN_ENV, "").strip()
        if not token:
            return {
                "error": f"{hl.TOKEN_ENV} is not set in the MCP server's environment. Add it to the server's "
                "configuration (never pass it as a tool argument)."
            }, True
        uploaded = hl.upload_contacts(contacts, token, session_factory(), sleep=sleep)
        report = {
            **summary,
            "dry_run": False,
            "upserted": uploaded.upserted,
            "created": uploaded.created,
            "updated": uploaded.updated,
            "batches": uploaded.batches,
            "retries": uploaded.retries,
            "errors": uploaded.errors,
        }
        return report, bool(uploaded.errors)
    except (ToolInputError, hl.LeadsError, hl.HubSpotError) as exc:
        return {"error": str(exc)}, True


def build_server(
    env: Mapping[str, str] | None = None,
    session_factory: Callable[[], hl.Session] = hl._requests_session,
    sleep: Callable[[float], None] = time.sleep,
) -> Server:
    env = os.environ if env is None else env

    async def on_list_tools(ctx, params) -> types.ListToolsResult:
        return types.ListToolsResult(tools=TOOLS)

    async def on_call_tool(
        ctx, params: types.CallToolRequestParams
    ) -> types.CallToolResult:
        # File and network work is synchronous; keep the event loop free.
        result, is_error = await anyio.to_thread.run_sync(
            lambda: call(
                params.name,
                params.arguments,
                env=env,
                session_factory=session_factory,
                sleep=sleep,
            )
        )
        text = json.dumps(result, ensure_ascii=False)
        return types.CallToolResult(
            content=[types.TextContent(type="text", text=text)], is_error=is_error
        )

    return Server(
        "hubspot-leads",
        version="1.0.0",
        instructions=(
            "Clean event-lead CSVs and upsert them into HubSpot contacts, matched on email. Run clean_leads "
            "or upload_leads with the default dry run first, show the user the summary, and call "
            "upload_leads with dry_run=false only after they confirm."
        ),
        on_list_tools=on_list_tools,
        on_call_tool=on_call_tool,
    )


def main() -> None:
    server = build_server()

    async def serve() -> None:
        async with stdio_server() as (read_stream, write_stream):
            await server.run(
                read_stream, write_stream, server.create_initialization_options()
            )

    anyio.run(serve)


if __name__ == "__main__":
    main()
