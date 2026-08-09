"""Deterministic checks for HAL's fixed read-only repository-status composition.

These checks execute only the HAL-local allow-listed probe.  They never invoke
the GX10 transport, Hermes, Ollama, a network service, or a runtime capability.
"""

from __future__ import annotations

import json
from pathlib import Path
import subprocess
import sys
import unittest


SCRIPTS = Path(__file__).resolve().parents[2] / "implementation" / "hal-core" / "scripts"
PILOT = SCRIPTS / "hal_readonly_shell_pilot.py"
STATUS_COMPOSITION = SCRIPTS / "ask-gx10-hermes-repository-status.mjs"
HISTORY_COMPOSITION = SCRIPTS / "ask-gx10-hermes-repository-history.mjs"


class ReadOnlyShellPilotTests(unittest.TestCase):
    def run_pilot(self, payload: object) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [sys.executable, str(PILOT)],
            input=json.dumps(payload),
            text=True,
            capture_output=True,
            check=False,
            timeout=15,
        )

    def test_allows_only_the_fixed_read_only_probes(self) -> None:
        for command in (
            ["pwd"],
            ["git", "status", "--short"],
            ["git", "log", "--oneline", "-n", "20"],
        ):
            with self.subTest(command=command):
                result = self.run_pilot({"argv": command})
                self.assertEqual(result.returncode, 0, result.stderr)
                record = json.loads(result.stdout)
                self.assertEqual(record["status"], "completed")
                self.assertEqual(record["command"], command)
                self.assertIsInstance(record["exitCode"], int)
                self.assertLessEqual(len(record["output"].encode()), 16_384)

    def test_denies_arbitrary_and_shell_like_commands_before_execution(self) -> None:
        for payload in (
            {"argv": ["id"]},
            {"argv": ["git", "status", "--short;", "id"]},
            {"argv": "git status --short"},
            {"argv": ["git", 7]},
        ):
            with self.subTest(payload=payload):
                result = self.run_pilot(payload)
                self.assertNotEqual(result.returncode, 0)
                self.assertEqual(result.stdout, "")

    def test_pilot_and_compositions_preserve_the_fixed_boundary(self) -> None:
        pilot = PILOT.read_text(encoding="utf-8")
        compositions = {
            STATUS_COMPOSITION: ('{"argv":["git","status","--short"]}', "repository status"),
            HISTORY_COMPOSITION: ('{"argv":["git","log","--oneline","-n","20"]}', "repository history"),
        }
        self.assertIn('("git", "status", "--short")', pilot)
        self.assertIn("shell=False", pilot)
        self.assertNotIn("http://", pilot)
        self.assertNotIn("https://", pilot)
        for path, (payload, topic) in compositions.items():
            with self.subTest(path=path.name):
                composition = path.read_text(encoding="utf-8")
                self.assertIn('"hal_readonly_shell_pilot.py"', composition)
                self.assertIn(payload, composition)
                self.assertIn(topic, composition)
                self.assertIn("Do not use tools.", composition)
                self.assertNotIn('spawn("git"', composition)
                self.assertNotIn("shell: true", composition)


if __name__ == "__main__":
    unittest.main()
