"""Deterministic, no-network checks for the synthetic local-inference proxy."""

from __future__ import annotations

import importlib.util
from pathlib import Path
import unittest


PROXY_PATH = (
    Path(__file__).resolve().parents[2]
    / "implementation"
    / "hal-core"
    / "scripts"
    / "hal_ollama_unix_proxy.py"
)
SPEC = importlib.util.spec_from_file_location("hal_ollama_unix_proxy", PROXY_PATH)
assert SPEC and SPEC.loader
PROXY = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(PROXY)


class LocalInferenceProxyTests(unittest.TestCase):
    def test_only_the_exact_synthetic_request_is_admitted(self) -> None:
        self.assertEqual(PROXY.validated_request(b'{"model":"qwen3:8b","prompt":"HAL synthetic mediation pilot"}'), PROXY.APPROVED_REQUEST)
        for rejected in (
            b"",
            b"not-json",
            b'{"model":"qwen3:8b","prompt":"different"}',
            b'{"model":"other","prompt":"HAL synthetic mediation pilot"}',
            b'{"model":"qwen3:8b","prompt":"HAL synthetic mediation pilot","stream":true}',
        ):
            with self.assertRaises(PROXY.RequestDenied):
                PROXY.validated_request(rejected)

    def test_upstream_body_is_fixed_and_bounded(self) -> None:
        body = PROXY.upstream_body(PROXY.APPROVED_REQUEST)
        self.assertEqual(
            body,
            b'{"model":"qwen3:8b","prompt":"HAL synthetic mediation pilot","stream":false,"keep_alive":0,"options":{"num_ctx":512,"num_predict":16,"temperature":0,"seed":0}}',
        )
        self.assertLess(len(body), PROXY.MAX_BYTES)

    def test_no_downstream_input_can_change_the_destination(self) -> None:
        self.assertEqual(PROXY.UPSTREAM, ("127.0.0.1", 11434))
        self.assertEqual(PROXY.MODEL, "qwen3:8b")
        self.assertEqual(PROXY.GENERATION_OPTIONS["num_predict"], 16)


if __name__ == "__main__":
    unittest.main()
