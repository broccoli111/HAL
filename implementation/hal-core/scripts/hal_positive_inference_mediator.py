#!/usr/bin/env python3
"""One-use, synthetic-only CT-008 mediator; not a general model gateway."""

from __future__ import annotations

import asyncio
import json
import os
from pathlib import Path
import signal
import stat
import time


SOCKET_VALUE = os.environ.get("HAL_CT008_SOCKET")
EVENT_LOG_VALUE = os.environ.get("HAL_CT008_EVENT_LOG")
ISSUED_BINDING = os.environ.get("HAL_CT008_BINDING")
EXPIRES_AT_VALUE = os.environ.get("HAL_CT008_EXPIRES_AT")
UPSTREAM = ("127.0.0.1", 11434)
MODEL = "qwen3:8b"
PROMPT = "HAL synthetic mediation pilot"
PROFILE = "gx10-1-qwen3-8b-synthetic-v1"
MAX_BYTES = 16_384
USED = False


def expected_request() -> dict[str, str]:
    if not ISSUED_BINDING or not EXPIRES_AT_VALUE:
        raise SystemExit("HAL_CT008_BINDING and HAL_CT008_EXPIRES_AT are required")
    return {
        "binding": ISSUED_BINDING,
        "runtime_id": "ct008-test-runtime",
        "adapter_id": "test-adapter",
        "agent_id": "ct008-agent",
        "task_id": "ct008-task",
        "correlation_id": "ct008-correlation",
        "profile": PROFILE,
        "prompt": PROMPT,
    }


def is_admitted_request(raw: bytes) -> bool:
    """Validate only the fixed, one-use CT-008 request shape before upstream contact."""
    if USED or len(raw) > MAX_BYTES:
        return False
    try:
        if time.time() >= float(EXPIRES_AT_VALUE):
            return False
    except (TypeError, ValueError):
        return False
    try:
        return json.loads(raw) == expected_request()
    except (UnicodeDecodeError, json.JSONDecodeError):
        return False


async def write_event(event: str) -> None:
    Path(EVENT_LOG_VALUE).open("a", encoding="utf-8").write(f'{json.dumps({"event": event})}\n')


async def handle(reader: asyncio.StreamReader, writer: asyncio.StreamWriter) -> None:
    global USED
    upstream_writer: asyncio.StreamWriter | None = None
    try:
        raw = await asyncio.wait_for(reader.read(MAX_BYTES + 1), timeout=30)
        if not is_admitted_request(raw):
            await write_event("binding_denied")
            writer.write(b'{"error":"binding_denied"}')
            await writer.drain()
            return
        USED = True
        await write_event("binding_accepted")
        upstream_reader, upstream_writer = await asyncio.wait_for(asyncio.open_connection(*UPSTREAM), timeout=5)
        body = json.dumps(
            {
                "model": MODEL,
                "prompt": PROMPT,
                "stream": False,
                "keep_alive": 0,
                "options": {"num_ctx": 512, "num_predict": 16, "temperature": 0, "seed": 0},
            },
            separators=(",", ":"),
        ).encode()
        upstream_writer.write(
            b"POST /api/generate HTTP/1.1\r\nHost: 127.0.0.1\r\nContent-Type: application/json\r\n"
            + f"Content-Length: {len(body)}\r\nConnection: close\r\n\r\n".encode()
            + body
        )
        await upstream_writer.drain()
        response = await asyncio.wait_for(upstream_reader.read(MAX_BYTES + 1), timeout=300)
        if len(response) > MAX_BYTES:
            raise ValueError("upstream response exceeds bound")
        writer.write(response)
        await writer.drain()
        await write_event("completed_noncanonical_claim")
    except Exception:
        await write_event("failed")
        writer.write(b'{"error":"mediation_failed"}')
        await writer.drain()
    finally:
        if upstream_writer is not None:
            upstream_writer.close()
            await upstream_writer.wait_closed()
        writer.close()
        await writer.wait_closed()


async def main() -> None:
    if not SOCKET_VALUE or not EVENT_LOG_VALUE:
        raise SystemExit("socket and event-log paths are required")
    socket_path = Path(SOCKET_VALUE)
    if not socket_path.is_absolute() or not socket_path.parent.is_dir():
        raise SystemExit("socket parent must be a provisioned absolute directory")
    if stat.S_IMODE(socket_path.parent.stat().st_mode) & 0o077:
        raise SystemExit("socket parent must be owner-only")
    if socket_path.exists():
        raise SystemExit("refuse to replace an existing socket")
    server = await asyncio.start_unix_server(handle, path=str(socket_path))
    os.chmod(socket_path, 0o600)
    stop = asyncio.get_running_loop().create_future()

    def request_stop() -> None:
        if not stop.done():
            stop.set_result(None)

    for shutdown_signal in (signal.SIGINT, signal.SIGTERM):
        asyncio.get_running_loop().add_signal_handler(shutdown_signal, request_stop)
    try:
        async with server:
            await stop
    finally:
        if socket_path.exists() and stat.S_ISSOCK(socket_path.stat().st_mode):
            socket_path.unlink()


if __name__ == "__main__":
    asyncio.run(main())
