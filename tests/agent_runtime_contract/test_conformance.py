"""Deterministic tests for the test-only Agent Runtime Contract conformance suite."""

from __future__ import annotations

import unittest

from tests.agent_runtime_contract.harness import (
    CapabilityDisposition,
    InMemoryHalGovernance,
    TestRuntimeAdapter,
)


class AgentRuntimeContractConformanceTests(unittest.TestCase):
    def setUp(self) -> None:
        self.hal = InMemoryHalGovernance()
        self.runtime = TestRuntimeAdapter(self.hal)
        self.runtime.start()
        self.runtime.create_agent("agent-1", "task-1", frozenset({"fixture.read"}))

    def test_artc_001_lifecycle_admission_and_destroy(self) -> None:
        self.assertIn("runtime-started:test-runtime", self.hal.lifecycle_events)
        self.runtime.destroy("agent-1")
        self.assertFalse(self.hal.agents["agent-1"].active)
        self.assertEqual(self.hal.canonical_knowledge, {"approved-context": "synthetic"})

    def test_artc_002_bounded_dispatch(self) -> None:
        context = self.runtime.execute("agent-1")
        self.assertEqual(context, {"task_id": "task-1", "approved-context": "synthetic"})
        self.assertNotIn("policy_version", context)
        self.assertNotIn("authority_version", context)

    def test_artc_003_permitted_capability_request(self) -> None:
        disposition = self.runtime.request_capability(
            "agent-1", "fixture.read", self.hal.resource.target, "corr-allow", "task-1"
        )
        self.assertEqual(disposition, CapabilityDisposition.PERMITTED)
        self.assertEqual(self.hal.resource.effects, [{"correlation_id": "corr-allow"}])

    def test_artc_004_denied_capability_request_has_no_effect(self) -> None:
        disposition = self.runtime.request_capability(
            "agent-1", "fixture.write", self.hal.resource.target, "corr-deny", "task-1"
        )
        self.assertEqual(disposition, CapabilityDisposition.DENIED)
        self.assertEqual(self.hal.resource.effects, [])

    def test_artc_005_authorization_hold_has_no_effect(self) -> None:
        disposition = self.runtime.request_capability(
            "agent-1", "fixture.hold", self.hal.resource.target, "corr-hold", "task-1"
        )
        self.assertEqual(disposition, CapabilityDisposition.AUTHORIZATION_REQUIRED)
        self.assertEqual(self.hal.resource.effects, [])

    def test_artc_006_scope_expansion_is_denied(self) -> None:
        disposition = self.runtime.request_capability(
            "agent-1", "fixture.read", self.hal.resource.target, "corr-stale", "other-task"
        )
        self.assertEqual(disposition, CapabilityDisposition.DENIED)
        self.assertEqual(self.hal.resource.effects, [])

    def test_artc_007_evidence_is_a_candidate_not_canonical_knowledge(self) -> None:
        report = self.runtime.submit_evidence("corr-evidence", {"claim": "runtime assertion"})
        self.assertFalse(report.accepted)
        self.assertEqual(self.hal.evidence, [report])
        self.assertNotIn("claim", self.hal.canonical_knowledge)

    def test_artc_008_reports_do_not_complete_work_by_assertion(self) -> None:
        result = self.runtime.report("result", "corr-result", {"status": "complete"})
        failure = self.runtime.report("failure", "corr-failure", {"reason": "synthetic"})
        self.assertFalse(result.accepted)
        self.assertFalse(failure.accepted)
        self.assertEqual([report.kind for report in self.hal.reports], ["result", "failure"])

    def test_artc_009_subagent_cannot_broaden_authority(self) -> None:
        self.assertTrue(self.runtime.request_subagent("agent-1", "agent-2", frozenset({"fixture.read"})))
        self.assertFalse(self.runtime.request_subagent("agent-1", "agent-3", frozenset({"fixture.write"})))
        self.assertNotIn("agent-3", self.hal.agents)

    def test_artc_010_checkpoint_cancel_and_destroy_preserve_governance(self) -> None:
        self.runtime.execute("agent-1")
        checkpoint = self.runtime.checkpoint("agent-1")
        self.assertEqual(checkpoint["approved-context"], "synthetic")
        self.runtime.cancel("agent-1")
        disposition = self.runtime.request_capability(
            "agent-1", "fixture.read", self.hal.resource.target, "corr-after-cancel", "task-1"
        )
        self.assertEqual(disposition, CapabilityDisposition.DENIED)
        self.assertEqual(self.hal.resource.effects, [])

    def test_artc_011_failure_containment_preserves_policy_and_authority(self) -> None:
        self.runtime.report("failure", "corr-crash", {"reason": "simulated crash"})
        self.runtime.cancel("agent-1")
        self.assertEqual(self.hal.policy_version, "test-policy-v1")
        self.assertEqual(self.hal.authority_version, "test-authority-v1")
        self.assertEqual(self.hal.reports[-1].kind, "failure")

    def test_artc_012_runtime_replacement_preserves_hal_invariants(self) -> None:
        before = (dict(self.hal.canonical_knowledge), self.hal.policy_version, self.hal.authority_version)
        self.runtime.destroy("agent-1")
        replacement = TestRuntimeAdapter(self.hal)
        replacement.start()
        replacement.create_agent("agent-replacement", "task-1", frozenset({"fixture.read"}))
        self.assertEqual(replacement.execute("agent-replacement")["approved-context"], "synthetic")
        self.assertEqual(before, (self.hal.canonical_knowledge, self.hal.policy_version, self.hal.authority_version))

    def test_artc_013_memory_loss_reconstructs_only_bounded_context(self) -> None:
        self.runtime.execute("agent-1")
        self.runtime.lose_memory()
        self.assertEqual(self.runtime.memory, {})
        replacement = TestRuntimeAdapter(self.hal)
        replacement.start()
        replacement.create_agent("agent-replacement", "task-1", frozenset({"fixture.read"}))
        context = replacement.execute("agent-replacement")
        self.assertEqual(context["approved-context"], "synthetic")
        self.assertEqual(self.hal.canonical_knowledge, {"approved-context": "synthetic"})

    def test_artc_014_no_runtime_specific_dependency_is_required(self) -> None:
        self.assertEqual(self.runtime.adapter_id, "test-adapter")
        self.assertEqual(self.runtime.__class__.__module__, "tests.agent_runtime_contract.harness")
        self.assertNotIn("hermes", self.runtime.__class__.__module__.lower())


if __name__ == "__main__":
    unittest.main()
