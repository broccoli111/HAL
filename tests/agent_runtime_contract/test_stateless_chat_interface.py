"""Static checks for the bounded terminal UI over the restricted assistant path."""

from __future__ import annotations

from pathlib import Path
import unittest


SCRIPT = (
    Path(__file__).resolve().parents[2]
    / "implementation"
    / "hal-core"
    / "scripts"
    / "chat-gx10-hermes.mjs"
)


class StatelessChatInterfaceTests(unittest.TestCase):
    def test_chat_is_bounded_stateless_and_uses_only_existing_ask_transport(self) -> None:
        source = SCRIPT.read_text(encoding="utf-8")
        self.assertIn("const MAX_TURNS = 20;", source)
        self.assertIn("const MAX_PROMPT_CHARS = 8_192;", source)
        self.assertIn('"ask-gx10-hermes.mjs"', source)
        self.assertIn("bounded, stateless", source)
        self.assertIn("No tools or resource capabilities are available.", source)
        self.assertIn('error?.code === "ERR_USE_AFTER_CLOSE"', source)
        self.assertIn("shell: false", source)
        self.assertNotIn("history", source.lower())
        self.assertNotIn("writeFile", source)
        self.assertNotIn("http://", source)
        self.assertNotIn("https://", source)


if __name__ == "__main__":
    unittest.main()
