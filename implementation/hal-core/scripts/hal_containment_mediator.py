#!/usr/bin/env python3
"""Negative-test-only Unix-socket mediator for DR 0019.

It has no upstream, model, network, credential, or positive request path. Every
request is retained as a minimized test event and denied. It exists only to
prove that a mounted test endpoint is not a bypass around HAL admission.
"""

from __future__ import annotations

import asyncio
import json
import os
from pathlib import Path
import signal
import stat


SOCKET_VALUE = os.environ.get("HAL_CONTAINMENT_MEDIATOR_SOCKET")
EVENT_LOG_VALUE = os.environ.get("HAL_CONTAINMENT_MEDIATOR_EVENT_LOG")
MAX_REQUEST_BYTES = 4096


async def handle(reader: asyncio.StreamReader, writer: asyncio.StreamWriter) -> None:
    event = "malformed"
    try:
        raw = await asyncio.wait_for(reader.read(MAX_REQUEST_BYTES + 1), timeout=10)
        if raw and len(raw) <= MAX_REQUEST_BYTES:
            try:
                json.loads(raw)
                event = "binding_denied"
            except (UnicodeDecodeError, json.JSONDecodeError):
                pass
        writer.write(b'{"error":"binding_denied"}')
        await writer.drain()
    finally:
        if EVENT_LOG_VALUE:
            Path(EVENT_LOG_VALUE).open("a", encoding="utf-8").write(f'{json.dumps({"event": event})}\n')
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
