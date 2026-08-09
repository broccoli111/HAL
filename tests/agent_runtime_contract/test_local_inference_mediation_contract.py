"""No-network conformance checks for the DR 0018 mediation semantics."""

from __future__ import annotations

import unittest

from tests.agent_runtime_contract.local_inference_mediation import (
    BindingState,
    FakeUpstreamMediator,
    HalOwnedMediation,
    MediationDenied,
    SYNTHETIC_PROMPT,
    SyntheticInferenceProfile,
)


class LocalInferenceMediationContractTests(unittest.TestCase):
    def setUp(self) -> None:
        self.hal = HalOwnedMediation()
        self.binding = self.hal.admit(
            runtime_id="test-runtime-1",
            adapter_id="test-adapter",
            agent_id="agent-1",
            task_id="task-1",
            correlation_id="corr-1",
            evidence_id="evidence-1",
        )

    def request(self, **overrides: object):
        request = {
            "runtime_id": self.binding.runtime_id,
            "adapter_id": self.binding.adapter_id,
            "agent_id": self.binding.agent_id,
            "task_id": self.binding.task_id,
            "correlation_id": self.binding.correlation_id,
            "nonce": self.binding.nonce,
            "profile": self.binding.profile,
        }
        request.update(overrides)
        return self.hal.request(self.binding.binding_id, **request)

    def test_mediation_001_hal_issues_exact_one_use_binding(self) -> None:
        self.assertEqual(self.binding.state, BindingState.ISSUED)
        self.assertEqual(self.binding.profile.model, "qwen3:8b")
        self.assertEqual(self.hal.operational_events, [("issued", "binding-1")])

    def test_mediation_002_identity_or_correlation_mismatch_denies_before_execution(self) -> None:
        with self.assertRaises(MediationDenied):
            self.request(correlation_id="other-correlation")
        self.assertEqual(self.binding.state, BindingState.DENIED)
        self.assertNotIn(("executing", self.binding.binding_id), self.hal.operational_events)

    def test_mediation_003_profile_mutation_is_denied(self) -> None:
        with self.assertRaises(MediationDenied):
            self.request(profile=SyntheticInferenceProfile(model="other-model"))
        self.assertEqual(self.binding.state, BindingState.DENIED)

    def test_mediation_004_expiry_and_replay_fail_closed(self) -> None:
        self.hal.now = self.binding.expires_at
        with self.assertRaises(MediationDenied):
            self.request()
        self.assertEqual(self.binding.state, BindingState.EXPIRED)
        with self.assertRaises(MediationDenied):
            self.request()

    def test_mediation_005_completion_is_noncanonical_claim_only(self) -> None:
        self.request()
        claim = self.hal.complete(self.binding.binding_id, "synthetic output")
        self.assertFalse(claim.canonical)
        self.assertEqual(claim.correlation_id, "corr-1")
        with self.assertRaises(MediationDenied):
            self.request()

    def test_mediation_006_cancellation_and_revocation_prevent_execution(self) -> None:
        self.hal.cancel(self.binding.binding_id)
        with self.assertRaises(MediationDenied):
            self.request()
        other = self.hal.admit(
            runtime_id="test-runtime-1",
            adapter_id="test-adapter",
            agent_id="agent-2",
            task_id="task-2",
            correlation_id="corr-2",
            evidence_id="evidence-2",
        )
        self.hal.revoke(other.binding_id)
        self.assertEqual(other.state, BindingState.REVOKED)

    def test_mediation_007_fake_upstream_receives_only_admitted_fixed_profile(self) -> None:
        calls: list[tuple[str, str, SyntheticInferenceProfile]] = []
        mediator = FakeUpstreamMediator(
            self.hal, lambda model, prompt, profile: calls.append((model, prompt, profile)) or "ok"
        )
        claim = mediator.execute(
            self.binding.binding_id,
            prompt=SYNTHETIC_PROMPT,
            runtime_id=self.binding.runtime_id,
            adapter_id=self.binding.adapter_id,
            agent_id=self.binding.agent_id,
            task_id=self.binding.task_id,
            correlation_id=self.binding.correlation_id,
            nonce=self.binding.nonce,
            profile=self.binding.profile,
        )
        self.assertEqual(calls, [("qwen3:8b", SYNTHETIC_PROMPT, self.binding.profile)])
        self.assertFalse(claim.canonical)

    def test_mediation_008_denials_and_upstream_failures_never_return_a_claim(self) -> None:
        calls: list[object] = []
        mediator = FakeUpstreamMediator(self.hal, lambda *args: calls.append(args) or "ok")
        with self.assertRaises(MediationDenied):
            mediator.execute(self.binding.binding_id, prompt="unapproved", runtime_id="anything")
        self.assertEqual(calls, [])
        self.assertEqual(self.binding.state, BindingState.DENIED)

        second = self.hal.admit(
            runtime_id="test-runtime-1",
            adapter_id="test-adapter",
            agent_id="agent-2",
            task_id="task-2",
            correlation_id="corr-2",
            evidence_id="evidence-2",
        )
        failing = FakeUpstreamMediator(self.hal, lambda *args: (_ for _ in ()).throw(RuntimeError()))
        with self.assertRaises(MediationDenied):
            failing.execute(
                second.binding_id,
                prompt=SYNTHETIC_PROMPT,
                runtime_id=second.runtime_id,
                adapter_id=second.adapter_id,
                agent_id=second.agent_id,
                task_id=second.task_id,
                correlation_id=second.correlation_id,
                nonce=second.nonce,
                profile=second.profile,
            )
        self.assertEqual(second.state, BindingState.FAILED)
        self.assertEqual(self.hal.result_claims, [])

    def test_mediation_009_oversized_fake_output_fails_closed(self) -> None:
        mediator = FakeUpstreamMediator(self.hal, lambda *args: "x" * 16_385)
        with self.assertRaises(MediationDenied):
            mediator.execute(
                self.binding.binding_id,
                prompt=SYNTHETIC_PROMPT,
                runtime_id=self.binding.runtime_id,
                adapter_id=self.binding.adapter_id,
                agent_id=self.binding.agent_id,
                task_id=self.binding.task_id,
                correlation_id=self.binding.correlation_id,
                nonce=self.binding.nonce,
                profile=self.binding.profile,
            )
        self.assertEqual(self.binding.state, BindingState.FAILED)

    def test_mediation_010_capability_like_request_is_denied_before_upstream(self) -> None:
        calls: list[object] = []
        mediator = FakeUpstreamMediator(self.hal, lambda *args: calls.append(args) or "ok")
        with self.assertRaisesRegex(MediationDenied, "zero-capability"):
            mediator.execute(
                self.binding.binding_id,
                prompt=SYNTHETIC_PROMPT,
                capability_requests=("hal.files.read",),
                runtime_id=self.binding.runtime_id,
                adapter_id=self.binding.adapter_id,
                agent_id=self.binding.agent_id,
                task_id=self.binding.task_id,
                correlation_id=self.binding.correlation_id,
                nonce=self.binding.nonce,
                profile=self.binding.profile,
            )
        self.assertEqual(calls, [])
        self.assertEqual(self.binding.state, BindingState.DENIED)


if __name__ == "__main__":
    unittest.main()
