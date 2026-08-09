"""Deterministic validation checks for the one-use DR 0020 mediator."""

from __future__ import annotations

import importlib.util
import json
from pathlib import Path
import unittest
from unittest.mock import patch


MEDIATOR_PATH = (
    Path(__file__).resolve().parents[2]
    / "implementation"
    / "hal-core"
    / "scripts"
    / "hal_positive_inference_mediator.py"
)
SPEC = importlib.util.spec_from_file_location("hal_positive_inference_mediator", MEDIATOR_PATH)
assert SPEC and SPEC.loader
MEDIATOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MEDIATOR)


class PositiveMediationValidationTests(unittest.TestCase):
    def setUp(self) -> None:
        MEDIATOR.ISSUED_BINDING = "test-one-use-binding"
        MEDIATOR.EXPIRES_AT_VALUE = "4102444800"
        MEDIATOR.USED = False
        self.request = MEDIATOR.expected_request()

    def test_ct008_001_only_exact_issued_binding_is_admitted(self) -> None:
        raw = json.dumps(self.request, separators=(",", ":")).encode()
        self.assertTrue(MEDIATOR.is_admitted_request(raw))
        self.request["binding"] = "other-binding"
        self.assertFalse(MEDIATOR.is_admitted_request(json.dumps(self.request).encode()))

    def test_ct008_002_mutation_malformed_input_and_replay_are_denied(self) -> None:
        self.request["model"] = "other"
        self.assertFalse(MEDIATOR.is_admitted_request(json.dumps(self.request).encode()))
        self.assertFalse(MEDIATOR.is_admitted_request(b"not-json"))
        MEDIATOR.USED = True
        self.assertFalse(MEDIATOR.is_admitted_request(json.dumps(MEDIATOR.expected_request()).encode()))

    def test_ct008_003_expired_or_invalid_lifetime_is_denied(self) -> None:
        raw = json.dumps(self.request).encode()
        with patch.object(MEDIATOR.time, "time", return_value=4102444800):
            self.assertFalse(MEDIATOR.is_admitted_request(raw))
        MEDIATOR.EXPIRES_AT_VALUE = "not-a-time"
        self.assertFalse(MEDIATOR.is_admitted_request(raw))


if __name__ == "__main__":
    unittest.main()
