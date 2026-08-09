"""Unit checks for the bounded real-Hermes local-inference mediator.

These tests never contact Ollama or execute Hermes.  They exercise only the
HAL-owned admission logic that stands in front of the local model route.
"""

from __future__ import annotations

import asyncio
import contextlib
import io
import importlib.util
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest


SCRIPT = Path(__file__).parents[2] / "implementation/hal-core/scripts/hal_hermes_local_mediation.py"
RUNTIME_SCRIPT = Path(__file__).parents[2] / "implementation/hal-core/scripts/hal_gx10_stateless_runtime.py"
CLI_PROBE_SCRIPT = Path(__file__).parents[2] / "implementation/hal-core/scripts/hal_hermes_cli_no_tools_probe.py"


def load_mediator():
    with tempfile.TemporaryDirectory() as directory:
        socket_path = Path(directory) / "hal.sock"
        previous = {key: os.environ.get(key) for key in ("HAL_HERMES_SOCKET", "HAL_HERMES_BINDING", "HAL_HERMES_EXPIRES_AT")}
        os.environ.update(
            {
                "HAL_HERMES_SOCKET": str(socket_path),
                "HAL_HERMES_BINDING": "test-binding",
                "HAL_HERMES_EXPIRES_AT": "4102444800",
            }
        )
        try:
            spec = importlib.util.spec_from_file_location("test_hermes_mediator", SCRIPT)
            assert spec is not None and spec.loader is not None
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            return module
        finally:
            for key, value in previous.items():
                if value is None:
                    os.environ.pop(key, None)
                else:
                    os.environ[key] = value


def load_runtime_entrypoint():
    spec = importlib.util.spec_from_file_location("test_gx10_runtime", RUNTIME_SCRIPT)
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class HermesLocalMediationTests(unittest.TestCase):
    def setUp(self) -> None:
        self.mediator = load_mediator()
        self.headers = {"x-hal-binding": "test-binding"}
        self.body = json.dumps(
            {"model": "untrusted-model", "messages": [{"role": "user", "content": "synthetic"}]}
        ).encode()

    def test_permits_only_bound_text_messages_and_fixes_model_parameters(self) -> None:
        request = self.mediator.admitted(self.headers, self.body)
        self.assertEqual(
            request,
            {
                "model": "qwen3:8b",
                "messages": [{"role": "user", "content": "synthetic"}],
                "stream": False,
                "max_tokens": 2_048,
                "temperature": 0,
                "think": False,
            },
        )

    def test_permits_only_boolean_streaming_mode(self) -> None:
        streaming = json.dumps({"messages": [{"role": "user", "content": "synthetic"}], "stream": True}).encode()
        self.assertTrue(self.mediator.admitted(self.headers, streaming)["stream"])
        invalid = json.dumps({"messages": [{"role": "user", "content": "synthetic"}], "stream": "yes"}).encode()
        self.assertIsNone(self.mediator.admitted(self.headers, invalid))

    def test_denies_invalid_binding_and_non_text_content(self) -> None:
        self.assertIsNone(self.mediator.admitted({"x-hal-binding": "wrong"}, self.body))
        body = json.dumps({"messages": [{"role": "user", "content": [{"type": "text"}]}]}).encode()
        self.assertIsNone(self.mediator.admitted(self.headers, body))

    def test_denies_after_the_bounded_inference_budget(self) -> None:
        self.mediator.REQUESTS = self.mediator.MAX_REQUESTS
        self.assertIsNone(self.mediator.admitted(self.headers, self.body))

    def test_reads_a_complete_length_bounded_http_request(self) -> None:
        async def read() -> tuple[bytes, bytes]:
            reader = asyncio.StreamReader()
            reader.feed_data(b"POST /v1/chat/completions HTTP/1.1\r\nContent-Length: 4\r\n\r\ntest")
            reader.feed_eof()
            return await self.mediator.read_http_request(reader)

        head, body = asyncio.run(read())
        self.assertTrue(head.startswith(b"POST /v1/chat/completions"))
        self.assertEqual(body, b"test")

    def test_strips_local_reasoning_without_altering_final_content(self) -> None:
        upstream = {
            "choices": [{"message": {"role": "assistant", "content": "HAL_LOCAL_OK", "reasoning": "private"}, "finish_reason": "stop"}]
        }
        body = json.dumps(upstream).encode()
        response = b"HTTP/1.1 200 OK\r\nContent-Length: " + str(len(body)).encode() + b"\r\n\r\n" + body
        normalized, disposition = self.mediator.normalize_upstream_response(response)
        self.assertEqual(disposition, "stripped")
        payload = json.loads(normalized.partition(b"\r\n\r\n")[2])
        self.assertEqual(payload["choices"][0]["message"], {"role": "assistant", "content": "HAL_LOCAL_OK"})


class Gx10ForcedRuntimeEntrypointTests(unittest.TestCase):
    def call_read_request(self, payload: bytes, original_command: str = "") -> tuple[str, str]:
        module = load_runtime_entrypoint()
        previous_stdin = sys.stdin
        previous_command = os.environ.get("SSH_ORIGINAL_COMMAND")
        sys.stdin = io.TextIOWrapper(io.BytesIO(payload), encoding="utf-8")
        os.environ["SSH_ORIGINAL_COMMAND"] = original_command
        try:
            return module.read_request()
        finally:
            sys.stdin = previous_stdin
            if previous_command is None:
                os.environ.pop("SSH_ORIGINAL_COMMAND", None)
            else:
                os.environ["SSH_ORIGINAL_COMMAND"] = previous_command

    def test_accepts_only_the_exact_bounded_request_shape(self) -> None:
        correlation, prompt = self.call_read_request(
            b'{"correlationId":"runtime-001","prompt":"synthetic"}\n'
        )
        self.assertEqual((correlation, prompt), ("runtime-001", "synthetic"))

    def test_rejects_an_ssh_command_and_capability_like_input(self) -> None:
        with contextlib.redirect_stdout(io.StringIO()):
            with self.assertRaises(SystemExit):
                self.call_read_request(b'{"correlationId":"runtime-001","prompt":"synthetic"}\n', "id")
            with self.assertRaises(SystemExit):
                self.call_read_request(
                    b'{"correlationId":"runtime-001","prompt":"synthetic","capabilities":[]}\n'
                )


class HermesCliNoToolsProbeTests(unittest.TestCase):
    def test_probe_is_fixed_prompt_no_tools_and_uses_the_hal_relay(self) -> None:
        source = CLI_PROBE_SCRIPT.read_text(encoding="utf-8")
        self.assertIn('PROMPT = "Reply with exactly: HAL_LOCAL_OK"', source)
        self.assertIn('"  cli: []",', source)
        self.assertIn('http://127.0.0.1:11434/v1', source)
        self.assertIn('"--network", "none"', source)
        self.assertIn('"--read-only"', source)
        self.assertIn('"--cap-drop", "ALL"', source)
        self.assertNotIn('HAL_HERMES_PROMPT', source)


if __name__ == "__main__":
    unittest.main()
