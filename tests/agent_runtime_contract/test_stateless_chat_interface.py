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
KNOWLEDGE_SCRIPT = SCRIPT.with_name("chat-gx10-hermes-with-approved-knowledge.mjs")
PERSONAL_DOCUMENT_CHAT = SCRIPT.with_name("chat-gx10-hermes-with-personal-document-pilot.mjs")
OWNER_LAUNCHER = SCRIPT.with_name("hal-owner-chat.mjs")
CANON_OWNER_LAUNCHER = SCRIPT.with_name("hal-canon-chat.mjs")
ASSISTANT_SELECTOR = SCRIPT.with_name("hal-assistant.mjs")
DUAL_SCOPE_LAUNCHER = SCRIPT.with_name("hal-dual-scope-chat.mjs")
DUAL_SCOPE_CHAT = SCRIPT.with_name("chat-gx10-hermes-with-dual-approved-knowledge.mjs")
DUAL_SCOPE_ASK = SCRIPT.with_name("ask-gx10-hermes-with-dual-approved-knowledge.mjs")
ASSISTANT_STATUS = SCRIPT.with_name("hal-assistant-status.mjs")


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

    def test_personal_document_chat_handles_owner_commands_without_resource_expansion(self) -> None:
        source = PERSONAL_DOCUMENT_CHAT.read_text(encoding="utf-8")
        self.assertIn('prompt === "exit"', source)
        self.assertIn('prompt === "/help"', source)
        self.assertIn('prompt === "/status"', source)
        self.assertIn('readline.on("SIGINT"', source)
        self.assertIn("const MAX_CONTEXT_TURNS = 3;", source)
        self.assertIn("const MAX_CONTEXT_UTF8_BYTES = 4_096;", source)
        self.assertIn("HAL_EPHEMERAL_SESSION_CONTEXT", source)
        self.assertIn("sessionTurns.shift()", source)
        self.assertIn("shell: false", source)
        self.assertNotIn("writeFile", source)
        self.assertNotIn("http://", source)
        self.assertNotIn("https://", source)

    def test_knowledge_chat_is_equally_bounded_and_has_no_direct_resource_path(self) -> None:
        source = KNOWLEDGE_SCRIPT.read_text(encoding="utf-8")
        self.assertIn("const MAX_TURNS = 20;", source)
        self.assertIn("const MAX_PROMPT_CHARS = 8_192;", source)
        self.assertIn('"ask-gx10-hermes-with-approved-knowledge.mjs"', source)
        self.assertIn("Context is non-canonical", source)
        self.assertIn("no tools or resource capabilities are available.", source)
        self.assertIn('error?.code === "ERR_USE_AFTER_CLOSE"', source)
        self.assertIn("shell: false", source)
        self.assertNotIn("writeFile", source)
        self.assertNotIn("http://", source)
        self.assertNotIn("https://", source)

    def test_owner_launcher_activates_only_the_approved_folder_pack_and_uses_existing_chat(self) -> None:
        source = OWNER_LAUNCHER.read_text(encoding="utf-8")
        self.assertIn('const APPROVED_PACK_ID = "personal_document_folder_pilot_v1";', source)
        self.assertIn("activateApprovedM9Pack", source)
        self.assertIn("chat-gx10-hermes-with-personal-document-pilot.mjs", source)
        self.assertIn('ownerConfirmationClaim: "local_owner_confirmed"', source)
        self.assertIn("shell: false", source)
        self.assertNotIn("ollama", source.lower())
        self.assertNotIn("http://", source)
        self.assertNotIn("https://", source)
        self.assertNotIn("writeFile", source)

    def test_canon_owner_launcher_uses_a_separate_state_and_exact_canon_pack(self) -> None:
        source = CANON_OWNER_LAUNCHER.read_text(encoding="utf-8")
        self.assertIn('const APPROVED_PACK_ID = "hal_canon_v1";', source)
        self.assertIn('"canonKnowledgeStateDirectory"', source)
        self.assertIn("activateApprovedM9Pack", source)
        self.assertIn("chat-gx10-hermes-with-approved-knowledge.mjs", source)
        self.assertIn('ownerConfirmationClaim: "local_owner_confirmed"', source)
        self.assertIn("shell: false", source)
        self.assertNotIn("ollama", source.lower())
        self.assertNotIn("http://", source)
        self.assertNotIn("https://", source)
        self.assertNotIn("writeFile", source)

    def test_owner_assistant_selector_only_dispatches_to_existing_governed_launchers(self) -> None:
        source = ASSISTANT_SELECTOR.read_text(encoding="utf-8")
        self.assertIn('requestedScope === "canon"', source)
        self.assertIn('requestedScope === "documents"', source)
        self.assertIn('"hal-canon-chat.mjs"', source)
        self.assertIn('"hal-owner-chat.mjs"', source)
        self.assertIn("shell: false", source)
        self.assertNotIn("ollama", source.lower())
        self.assertNotIn("http://", source)
        self.assertNotIn("https://", source)
        self.assertNotIn("writeFile", source)

    def test_dual_scope_path_validates_both_packs_before_using_existing_transport(self) -> None:
        launcher = DUAL_SCOPE_LAUNCHER.read_text(encoding="utf-8")
        chat = DUAL_SCOPE_CHAT.read_text(encoding="utf-8")
        ask = DUAL_SCOPE_ASK.read_text(encoding="utf-8")
        self.assertIn('const CANON_PACK_ID = "hal_canon_v1";', launcher)
        self.assertIn('const DOCUMENT_PACK_ID = "personal_document_folder_pilot_v1";', launcher)
        self.assertIn("activateExactPack(config.canonStateDirectory, CANON_PACK_ID)", launcher)
        self.assertIn("activateExactPack(config.documentStateDirectory, DOCUMENT_PACK_ID)", launcher)
        self.assertIn("HAL_CANON_KNOWLEDGE_STATE_DIRECTORY", launcher)
        self.assertIn("runM6DualScopeInquiry", ask)
        self.assertIn("ask-gx10-hermes.mjs", ask)
        self.assertIn("dual-scope", chat)
        self.assertIn("const MAX_CONTEXT_TURNS = 3;", chat)
        self.assertIn("const MAX_CONTEXT_UTF8_BYTES = 4_096;", chat)
        self.assertIn("HAL_EPHEMERAL_SESSION_CONTEXT", chat)
        self.assertIn("HAL_EPHEMERAL_SESSION_CONTEXT", ask)
        for source in (launcher, chat, ask):
            self.assertIn("shell: false", source)
            self.assertNotIn("ollama", source.lower())
            self.assertNotIn("http://", source)
            self.assertNotIn("https://", source)
            self.assertNotIn("writeFile", source)

    def test_assistant_status_is_local_read_only_and_does_not_contact_the_runtime(self) -> None:
        source = ASSISTANT_STATUS.read_text(encoding="utf-8")
        self.assertIn("getM9ActivePackState", source)
        self.assertIn('const CANON_PACK_ID = "hal_canon_v1";', source)
        self.assertIn('const DOCUMENT_PACK_ID = "personal_document_folder_pilot_v1";', source)
        self.assertIn("restricted_ssh_zero_capability_not_contacted", source)
        self.assertNotIn("spawn(", source)
        self.assertNotIn("ollama", source.lower())
        self.assertNotIn("http://", source)
        self.assertNotIn("https://", source)
        self.assertNotIn("writeFile", source)


if __name__ == "__main__":
    unittest.main()
