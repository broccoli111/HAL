"""Static containment checks for the test-only local-inference scripts."""

from __future__ import annotations

from pathlib import Path
import unittest


SCRIPTS = Path(__file__).resolve().parents[2] / "implementation" / "hal-core" / "scripts"


class MediationScriptBoundaryTests(unittest.TestCase):
    def test_containment_mediator_has_no_upstream_or_model_path(self) -> None:
        source = (SCRIPTS / "hal_containment_mediator.py").read_text(encoding="utf-8")
        self.assertNotIn("open_connection", source)
        self.assertNotIn("ollama", source.lower())
        self.assertNotIn("subprocess", source)

    def test_positive_mediator_has_only_fixed_loopback_upstream(self) -> None:
        source = (SCRIPTS / "hal_positive_inference_mediator.py").read_text(encoding="utf-8")
        self.assertIn('UPSTREAM = ("127.0.0.1", 11434)', source)
        self.assertIn('MODEL = "qwen3:8b"', source)
        self.assertIn("HAL_CT008_EXPIRES_AT", source)
        self.assertNotIn("http://", source)
        self.assertNotIn("https://", source)
        self.assertNotIn("subprocess", source)

    def test_container_harnesses_are_networkless_and_hermes_free(self) -> None:
        for name in (
            "run-contained-mediation-negative-tests.sh",
            "run-ct008-positive-mediation-test.sh",
        ):
            source = (SCRIPTS / name).read_text(encoding="utf-8")
            executable = "\n".join(
                line for line in source.splitlines() if not line.lstrip().startswith("#")
            )
            self.assertIn("--network none", source)
            self.assertIn("--read-only", source)
            self.assertIn("--cap-drop ALL", source)
            self.assertNotIn("hermes", executable.lower())
            self.assertNotIn("--network host", source)


if __name__ == "__main__":
    unittest.main()
