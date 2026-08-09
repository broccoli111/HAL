#!/usr/bin/env python3
"""Synthetic-only Unix-socket proxy for the local Ollama pilot.

This is deliberately not a general proxy.  It accepts one exact test request,
uses one loopback-only upstream, and applies fixed generation limits.  It is
not an authorization service and must run only from the dedicated ``hal_eval``
identity after HAL has admitted the synthetic test.
"""
import asyncio
import json
import os
from pathlib import Path
import signal
import stat

SOCKET_VALUE = os.environ.get("HAL_OLLAMA_PROXY_SOCKET")
UPSTREAM = ("127.0.0.1", 11434)
MAX_BYTES = 16_384
MODEL = "qwen3:8b"
APPROVED_REQUEST = {"model": MODEL, "prompt": "HAL synthetic mediation pilot"}
GENERATION_OPTIONS = {"num_ctx": 512, "num_predict": 16, "temperature": 0, "seed": 0}
REQUEST_TIMEOUT_SECONDS = 30
UPSTREAM_CONNECT_TIMEOUT_SECONDS = 5
UPSTREAM_RESPONSE_TIMEOUT_SECONDS = 300
IN_FLIGHT = asyncio.Lock()


class RequestDenied(ValueError):
    """An untrusted downstream request failed the fixed pilot allow-list."""


def validated_request(raw: bytes) -> dict[str, str]:
    """Return the sole permitted request; reject every variation."""
    if not raw or len(raw) > MAX_BYTES:
        raise RequestDenied("request size")
    try:
        request = json.loads(raw)
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise RequestDenied("invalid json") from error
    if request != APPROVED_REQUEST:
        raise RequestDenied("request allow-list")
    return request


def upstream_body(request: dict[str, str]) -> bytes:
    """Build the immutable local Ollama request; callers cannot supply options."""
    return json.dumps(
        {
            "model": MODEL,
            "prompt": request["prompt"],
            "stream": False,
            "keep_alive": 0,
            "options": GENERATION_OPTIONS,
        },
        separators=(",", ":"),
    ).encode()


async def send_error(writer: asyncio.StreamWriter, code: str) -> None:
    writer.write(json.dumps({"error": code}, separators=(",", ":")).encode())
    await writer.drain()


async def handle(reader: asyncio.StreamReader, writer: asyncio.StreamWriter) -> None:
    acquired_slot = False
    upstream_writer: asyncio.StreamWriter | None = None
    try:
        raw = await asyncio.wait_for(reader.read(MAX_BYTES + 1), timeout=REQUEST_TIMEOUT_SECONDS)
        request = validated_request(raw)
        if IN_FLIGHT.locked():
            raise RequestDenied("concurrency")
        await IN_FLIGHT.acquire()
        acquired_slot = True
        upstream_reader, upstream_writer = await asyncio.wait_for(
            asyncio.open_connection(*UPSTREAM), timeout=UPSTREAM_CONNECT_TIMEOUT_SECONDS
        )
        body = upstream_body(request)
        upstream_writer.write(
            b"POST /api/generate HTTP/1.1\r\nHost: 127.0.0.1\r\nContent-Type: application/json\r\n"
            + f"Content-Length: {len(body)}\r\nConnection: close\r\n\r\n".encode() + body
        )
        await upstream_writer.drain()
        response = await asyncio.wait_for(
            upstream_reader.read(MAX_BYTES + 1), timeout=UPSTREAM_RESPONSE_TIMEOUT_SECONDS
        )
        if len(response) > MAX_BYTES:
            raise RequestDenied("upstream response size")
        writer.write(response)
        await writer.drain()
    except RequestDenied:
        await send_error(writer, "request_denied")
    except (ConnectionError, TimeoutError, asyncio.TimeoutError):
        await send_error(writer, "upstream_unavailable")
    except Exception:
        await send_error(writer, "proxy_failure")
    finally:
        if upstream_writer is not None:
            upstream_writer.close()
            await upstream_writer.wait_closed()
        if acquired_slot:
            IN_FLIGHT.release()
        writer.close()
        await writer.wait_closed()


async def main() -> None:
    if not SOCKET_VALUE:
        raise SystemExit("HAL_OLLAMA_PROXY_SOCKET is required")
    SOCKET_PATH = Path(SOCKET_VALUE)
    if not SOCKET_PATH.is_absolute():
        raise SystemExit("HAL_OLLAMA_PROXY_SOCKET must be an absolute path")
    if not SOCKET_PATH.parent.is_dir():
        raise SystemExit("proxy socket parent must be provisioned first")
    parent_mode = stat.S_IMODE(SOCKET_PATH.parent.stat().st_mode)
    if parent_mode & 0o077:
        raise SystemExit("proxy socket parent must not be group/world accessible")
    if SOCKET_PATH.exists():
        raise SystemExit("proxy socket already exists; refuse to replace it")
    server = await asyncio.start_unix_server(handle, path=str(SOCKET_PATH))
    os.chmod(SOCKET_PATH, 0o600)
    stop_requested = asyncio.get_running_loop().create_future()

    def request_stop() -> None:
        if not stop_requested.done():
            stop_requested.set_result(None)

    for shutdown_signal in (signal.SIGINT, signal.SIGTERM):
        asyncio.get_running_loop().add_signal_handler(shutdown_signal, request_stop)
    try:
        async with server:
            await stop_requested
    finally:
        if SOCKET_PATH.exists() and stat.S_ISSOCK(SOCKET_PATH.stat().st_mode):
            SOCKET_PATH.unlink()


if __name__ == "__main__":
    asyncio.run(main())
