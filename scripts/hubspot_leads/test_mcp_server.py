"""The MCP server, driven in-process through the SDK's own client: a real protocol round trip,
no network and no token. Pinned: the tools and their hints, dry run by default, the token only
ever coming from the server's environment, and .csv-only file access."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

import anyio
import pytest
from mcp.client import Client

import mcp_server
from test_hubspot_leads import SAMPLE, TOKEN, FakeResponse, FakeSession


def _call(name, arguments, *, env=None, session=None):
    def factory():
        if session is None:
            pytest.fail("no HTTP session should be created for this call")
        return session

    server = mcp_server.build_server(
        env=env or {}, session_factory=factory, sleep=lambda s: None
    )

    async def run():
        async with Client(server) as client:
            result = await client.call_tool(name, arguments)
            return json.loads(result.content[0].text), result.is_error

    return anyio.run(run)


def _tools():
    async def run():
        async with Client(mcp_server.build_server(env={})) as client:
            return {t.name: t for t in (await client.list_tools()).tools}

    return anyio.run(run)


@pytest.fixture
def sample(tmp_path) -> Path:
    path = tmp_path / "leads.csv"
    shutil.copy(SAMPLE, path)
    return path


def test_two_tools_with_honest_hints():
    tools = _tools()
    assert set(tools) == {"clean_leads", "upload_leads"}
    assert tools["upload_leads"].annotations.destructive_hint is True
    assert tools["upload_leads"].annotations.open_world_hint is True
    assert tools["clean_leads"].annotations.open_world_hint is False
    assert "token" not in json.dumps(tools["upload_leads"].input_schema).lower()


def test_clean_leads_returns_the_summary_and_writes_the_file(sample):
    result, is_error = _call("clean_leads", {"csv_path": str(sample)})
    assert not is_error
    assert (
        result["rows_in"],
        result["valid"],
        result["duplicates_merged"],
        result["blank_rows"],
    ) == (14, 6, 2, 1)
    assert [r["line"] for r in result["invalid"]] == [5, 6, 7, 12, 14]
    assert Path(result["clean_csv"]) == sample.with_name("leads.clean.csv")
    assert Path(result["clean_csv"]).is_file()


def test_upload_is_a_dry_run_unless_asked(sample):
    result, is_error = _call(
        "upload_leads", {"csv_path": str(sample)}, env={"HUBSPOT_ACCESS_TOKEN": TOKEN}
    )
    assert not is_error
    assert (result["dry_run"], result["would_upsert"], result["batches"]) == (
        True,
        6,
        1,
    )


def test_real_upload_uses_the_servers_token(sample):
    session = FakeSession()
    result, is_error = _call(
        "upload_leads",
        {"csv_path": str(sample), "dry_run": False},
        env={"HUBSPOT_ACCESS_TOKEN": TOKEN},
        session=session,
    )
    assert not is_error
    assert (result["upserted"], result["created"], result["updated"]) == (6, 3, 3)
    assert session.calls[0]["headers"]["Authorization"] == f"Bearer {TOKEN}"
    assert TOKEN not in json.dumps(result)


def test_upload_without_a_token_in_the_environment_is_an_error(sample):
    result, is_error = _call(
        "upload_leads", {"csv_path": str(sample), "dry_run": False}
    )
    assert is_error
    assert (
        "HUBSPOT_ACCESS_TOKEN is not set in the MCP server's environment"
        in result["error"]
    )


def test_hubspot_errors_come_back_as_tool_errors(sample):
    session = FakeSession(FakeResponse(401, {}))
    result, is_error = _call(
        "upload_leads",
        {"csv_path": str(sample), "dry_run": False},
        env={"HUBSPOT_ACCESS_TOKEN": TOKEN},
        session=session,
    )
    assert is_error
    assert "rejected the token (401)" in result["error"]


@pytest.mark.parametrize(
    ("arguments", "message"),
    [
        ({"csv_path": "C:/Windows/win.ini"}, "Only .csv files are allowed"),
        ({"csv_path": "missing-file.csv"}, "File not found"),
        ({"csv_path": ""}, "Give a path to a .csv file"),
    ],
)
def test_paths_are_restricted_to_existing_csv_files(arguments, message):
    result, is_error = _call("clean_leads", arguments)
    assert is_error
    assert message in result["error"]


def test_output_must_be_a_different_csv(sample):
    result, is_error = _call(
        "clean_leads", {"csv_path": str(sample), "output_path": str(sample)}
    )
    assert is_error and "never overwritten" in result["error"]
    result, is_error = _call(
        "clean_leads",
        {"csv_path": str(sample), "output_path": str(sample.with_suffix(".txt"))},
    )
    assert is_error and "Only .csv files" in result["error"]


def test_dry_run_must_be_a_boolean(sample):
    result, is_error = _call("upload_leads", {"csv_path": str(sample), "dry_run": "no"})
    assert is_error
    assert "dry_run must be true or false" in result["error"]


def test_unknown_tool_is_an_error():
    result, is_error = _call("delete_everything", {})
    assert is_error
    assert result["error"] == "Unknown tool: delete_everything"
