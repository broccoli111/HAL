"""Unit checks for the bounded real-Hermes local-inference mediator.

These tests never contact Ollama or execute Hermes.  They exercise only the
HAL-owned admission logic that stands in front of the local model route.
"""

from __future__ import annotations

import asyncio
import importlib.util
import json
import os
from pathlib import Path
import tempfile
import unittest


SCRIPT = Path(__file__).parents[2] / "implementation/hal-core/scripts/hal_hermes_local_mediation.py"


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


if __name__ == "__main__":
    unittest.main()
