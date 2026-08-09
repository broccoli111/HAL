#!/usr/bin/env python3
"""Adapter-private loopback-to-UDS bridge for the zero-capability Hermes pilot."""

from __future__ import annotations

import asyncio
import os
import sys

SOCKET = os.environ["HAL_HERMES_SOCKET"]
BINDING = os.environ["HAL_HERMES_BINDING"]
MAX_BYTES = 131_072


async def handle(reader: asyncio.StreamReader, writer: asyncio.StreamWriter) -> None:
    upstream = None
    try:
        raw = await asyncio.wait_for(reader.read(MAX_BYTES + 1), timeout=30)
        print(f"HAL relay request_bytes={len(raw)}", file=sys.stderr, flush=True)
        head, separator, body = raw.partition(b"\r\n\r\n")
        if head.startswith(b"GET /v1/models "):
            body = b'{"object":"list","data":[{"id":"qwen3:8b","object":"model","owned_by":"hal"}]}'
            writer.write(b"HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: " + str(len(body)).encode() + b"\r\n\r\n" + body)
            await writer.drain()
            return
        if not separator or len(raw) > MAX_BYTES:
            raise ValueError("malformed request")
        upstream_reader, upstream = await asyncio.open_unix_connection(SOCKET)
        lines = head.split(b"\r\n")
        upstream.write(lines[0] + b"\r\nX-HAL-Binding: " + BINDING.encode() + b"\r\n" + b"\r\n".join(lines[1:]) + b"\r\n\r\n" + body)
        await upstream.drain()
        response = await asyncio.wait_for(upstream_reader.read(MAX_BYTES + 1), timeout=300)
        if len(response) > MAX_BYTES:
            raise ValueError("oversize mediator response")
        writer.write(response)
        await writer.drain()
    except Exception:
        writer.write(b"HTTP/1.1 502 Bad Gateway\r\nContent-Length: 0\r\n\r\n")
        await writer.drain()
    finally:
        if upstream is not None:
            upstream.close()
            await upstream.wait_closed()
        writer.close()
        await writer.wait_closed()


async def main() -> None:
    server = await asyncio.start_server(handle, "127.0.0.1", 11434)
    async with server:
        await server.serve_forever()


if __name__ == "__main__":
    asyncio.run(main())
