#!/usr/bin/env python3
"""Adapter-private loopback-to-UDS bridge for the zero-capability Hermes pilot."""

from __future__ import annotations

import asyncio
import os
import sys

SOCKET = os.environ["HAL_HERMES_SOCKET"]
BINDING = os.environ["HAL_HERMES_BINDING"]
MAX_BYTES = 131_072


async def read_http_request(reader: asyncio.StreamReader) -> tuple[bytes, bytes]:
    head = await asyncio.wait_for(reader.readuntil(b"\r\n\r\n"), timeout=30)
    if len(head) > MAX_BYTES:
        raise ValueError("oversize request header")
    lines = head[:-4].decode("ascii").split("\r\n")
    headers = {line.split(":", 1)[0].lower(): line.split(":", 1)[1].strip() for line in lines[1:] if ":" in line}
    try:
        content_length = int(headers.get("content-length", "0"))
    except ValueError as error:
        raise ValueError("invalid content length") from error
    if content_length < 0 or content_length > MAX_BYTES - len(head):
        raise ValueError("oversize request body")
    body = await asyncio.wait_for(reader.readexactly(content_length), timeout=30)
    return head[:-4], body


async def handle(reader: asyncio.StreamReader, writer: asyncio.StreamWriter) -> None:
    upstream = None
    try:
        head, body = await read_http_request(reader)
        print(f"HAL relay request_bytes={len(head) + len(body) + 4}", file=sys.stderr, flush=True)
        if head.startswith(b"GET /v1/models "):
            body = b'{"object":"list","data":[{"id":"qwen3:8b","object":"model","owned_by":"hal"}]}'
            writer.write(b"HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nContent-Length: " + str(len(body)).encode() + b"\r\n\r\n" + body)
            await writer.drain()
            return
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
