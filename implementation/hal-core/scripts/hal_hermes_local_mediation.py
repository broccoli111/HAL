#!/usr/bin/env python3
"""Bounded HAL-owned Unix-socket mediator for the real Hermes v1 pilot.

This is deliberately a bounded synthetic inference path.  It is not a
general model proxy: a caller must supply the exact HAL-issued binding and the
only upstream is local Ollama's OpenAI-compatible loopback endpoint.
"""

from __future__ import annotations

import asyncio
import contextlib
import json
import os
from pathlib import Path
import signal
import stat
import time

SOCKET = Path(os.environ["HAL_HERMES_SOCKET"])
BINDING = os.environ["HAL_HERMES_BINDING"]
EXPIRES_AT = float(os.environ["HAL_HERMES_EXPIRES_AT"])
MAX_BYTES = 131_072
REQUESTS = 0
MAX_REQUESTS = 4


def normalize_upstream_response(response: bytes) -> bytes:
    """Remove local-provider reasoning traces before handing a result to Hermes.

    The bounded local Qwen profile returns both visible final content and an
    implementation-specific ``reasoning`` field.  Hermes's CLI loop treats
    that combination as continuable despite a ``stop`` result, so this adapter
    normalization exposes only the ordinary OpenAI-compatible final message.
    """
    head, separator, body = response.partition(b"\r\n\r\n")
    if not separator:
        return response
    try:
        payload = json.loads(body)
        message = payload["choices"][0]["message"]
        if not isinstance(message, dict) or "reasoning" not in message:
            return response
        del message["reasoning"]
        normalized_body = json.dumps(payload, separators=(",", ":")).encode()
    except (KeyError, TypeError, UnicodeDecodeError, json.JSONDecodeError, IndexError):
        return response
    headers = [line for line in head.split(b"\r\n") if not line.lower().startswith(b"content-length:")]
    return b"\r\n".join(headers + [f"Content-Length: {len(normalized_body)}".encode()]) + b"\r\n\r\n" + normalized_body


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


def admitted(headers: dict[str, str], body: bytes) -> dict[str, object] | None:
    if REQUESTS >= MAX_REQUESTS or time.time() >= EXPIRES_AT or len(body) > MAX_BYTES:
        print("HAL mediator denial=used-expired-or-oversize", flush=True)
        return None
    if headers.get("x-hal-binding") != BINDING:
        print("HAL mediator denial=invalid-binding", flush=True)
        return None
    try:
        request = json.loads(body)
    except (UnicodeDecodeError, json.JSONDecodeError):
        print("HAL mediator denial=invalid-json", flush=True)
        return None
    if isinstance(request, dict) and isinstance(request.get("messages"), list):
        print(
            "HAL mediator message_structure="
            + repr(
                [
                    (type(item.get("role")).__name__, type(item.get("content")).__name__)
                    for item in request["messages"]
                    if isinstance(item, dict)
                ]
            ),
            flush=True,
        )
    if not isinstance(request, dict) or not isinstance(request.get("messages"), list) or len(request["messages"]) > 32:
        print("HAL mediator denial=invalid-message-envelope", flush=True)
        return None
    messages = request["messages"]
    if not all(isinstance(message, dict) and isinstance(message.get("role"), str) and isinstance(message.get("content"), str) for message in messages):
        print("HAL mediator denial=unsupported-message-content", flush=True)
        return None
    print("HAL mediator decision=permit-local-inference", flush=True)
    return {
        "model": "qwen3:8b",
        "messages": messages,
        "stream": False,
        "max_tokens": 2_048,
        "temperature": 0,
        "think": False,
    }


async def handle(reader: asyncio.StreamReader, writer: asyncio.StreamWriter) -> None:
    global REQUESTS
    upstream = None
    try:
        head, body = await read_http_request(reader)
        lines = head.decode().split("\r\n")
        headers = {line.split(":", 1)[0].lower(): line.split(":", 1)[1].strip() for line in lines[1:] if ":" in line}
        request = admitted(headers, body) if lines[0].startswith("POST /v1/chat/completions ") else None
        if request is None:
            writer.write(b"HTTP/1.1 403 Forbidden\r\nContent-Length: 0\r\n\r\n")
            await writer.drain()
            return
        REQUESTS += 1
        upstream_reader, upstream = await asyncio.open_connection("127.0.0.1", 11434)
        body = json.dumps(request, separators=(",", ":")).encode()
        upstream.write(
            b"POST /v1/chat/completions HTTP/1.1\r\nHost: 127.0.0.1\r\nContent-Type: application/json\r\n"
            + f"Content-Length: {len(body)}\r\nConnection: close\r\n\r\n".encode()
            + body
        )
        await upstream.drain()
        response = await asyncio.wait_for(upstream_reader.read(MAX_BYTES + 1), timeout=300)
        if len(response) > MAX_BYTES:
            raise ValueError("oversize upstream response")
        print("HAL mediator upstream_status=" + response.split(b"\r\n", 1)[0].decode("ascii", "replace"), flush=True)
        _, _, response_body = response.partition(b"\r\n\r\n")
        try:
            choice = json.loads(response_body)["choices"][0]
            message = choice["message"]
            print(
                "HAL mediator response_shape="
                + repr({key: type(value).__name__ for key, value in message.items()}),
                flush=True,
            )
            print(
                "HAL mediator response_lengths="
                + repr({key: len(value) for key, value in message.items() if isinstance(value, str)}),
                flush=True,
            )
            print("HAL mediator finish_reason=" + repr(choice.get("finish_reason")), flush=True)
        except (KeyError, TypeError, UnicodeDecodeError, json.JSONDecodeError, IndexError):
            print("HAL mediator response_shape=unrecognized", flush=True)
        response = normalize_upstream_response(response)
        writer.write(response)
        await writer.drain()
    except Exception as error:
        print("HAL mediator upstream_error=" + type(error).__name__, flush=True)
        writer.write(b"HTTP/1.1 502 Bad Gateway\r\nContent-Length: 0\r\n\r\n")
        await writer.drain()
    finally:
        if upstream is not None:
            upstream.close()
            await upstream.wait_closed()
        writer.close()
        with contextlib.suppress(ConnectionResetError):
            await writer.wait_closed()


async def main() -> None:
    if not SOCKET.is_absolute() or not SOCKET.parent.is_dir() or stat.S_IMODE(SOCKET.parent.stat().st_mode) & 0o077:
        raise SystemExit("HAL_HERMES_SOCKET requires an owner-only absolute parent")
    if SOCKET.exists():
        raise SystemExit("refuse to replace socket")
    server = await asyncio.start_unix_server(handle, path=str(SOCKET))
    os.chmod(SOCKET, 0o600)
    stop = asyncio.get_running_loop().create_future()
    for sig in (signal.SIGINT, signal.SIGTERM):
        asyncio.get_running_loop().add_signal_handler(sig, lambda: not stop.done() and stop.set_result(None))
    async with server:
        await stop
    SOCKET.unlink(missing_ok=True)


if __name__ == "__main__":
    asyncio.run(main())
