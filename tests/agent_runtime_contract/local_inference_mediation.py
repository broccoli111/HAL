"""Deterministic semantic harness for the DR 0018 mediation contract.

This is test-only governance logic. It opens no route, socket, model, or
runtime process and deliberately does not select a transport or token format.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class BindingState(str, Enum):
    ISSUED = "issued"
    EXECUTING = "executing"
    COMPLETED = "completed"
    DENIED = "denied"
    CANCELLED = "cancelled"
    FAILED = "failed"
    EXPIRED = "expired"
    REVOKED = "revoked"


TERMINAL_STATES = frozenset(
    {
        BindingState.COMPLETED,
        BindingState.DENIED,
        BindingState.CANCELLED,
        BindingState.FAILED,
        BindingState.EXPIRED,
        BindingState.REVOKED,
    }
)


@dataclass(frozen=True)
class SyntheticInferenceProfile:
    profile_id: str = "gx10-1-qwen3-8b-synthetic-v1"
    model: str = "qwen3:8b"
    data_classification: str = "synthetic"
    max_context_tokens: int = 512
    max_generation_tokens: int = 16
    max_response_bytes: int = 16_384
    max_concurrency: int = 1


@dataclass
class Binding:
    binding_id: str
    nonce: str
    runtime_id: str
    adapter_id: str
    agent_id: str
    task_id: str
    correlation_id: str
    expires_at: int
    profile: SyntheticInferenceProfile
    evidence_id: str
    state: BindingState = BindingState.ISSUED


@dataclass(frozen=True)
class RuntimeResultClaim:
    binding_id: str
    correlation_id: str
    output: str
    canonical: bool = False


class MediationDenied(ValueError):
    """The mediator rejected the request before any local model contact."""


class HalOwnedMediation:
    """HAL-owned issuer and semantic validator for one-use synthetic bindings."""

    def __init__(self, now: int = 1_000) -> None:
        self.now = now
        self.profile = SyntheticInferenceProfile()
        self.bindings: dict[str, Binding] = {}
        self.operational_events: list[tuple[str, str]] = []
        self.result_claims: list[RuntimeResultClaim] = []
        self._sequence = 0

    def admit(
        self,
        *,
        runtime_id: str,
        adapter_id: str,
        agent_id: str,
        task_id: str,
        correlation_id: str,
        evidence_id: str,
        lifetime: int = 60,
    ) -> Binding:
        if lifetime <= 0:
            raise ValueError("binding lifetime must be positive")
        self._sequence += 1
        binding = Binding(
            binding_id=f"binding-{self._sequence}",
            nonce=f"nonce-{self._sequence}",
            runtime_id=runtime_id,
            adapter_id=adapter_id,
            agent_id=agent_id,
            task_id=task_id,
            correlation_id=correlation_id,
            expires_at=self.now + lifetime,
            profile=self.profile,
            evidence_id=evidence_id,
        )
        self.bindings[binding.binding_id] = binding
        self.operational_events.append(("issued", binding.binding_id))
        return binding

    def request(
        self,
        binding_id: str,
        *,
        runtime_id: str,
        adapter_id: str,
        agent_id: str,
        task_id: str,
        correlation_id: str,
        nonce: str,
        profile: SyntheticInferenceProfile,
    ) -> Binding:
        binding = self.bindings.get(binding_id)
        if binding is None:
            raise MediationDenied("unknown binding")
        if binding.state in TERMINAL_STATES:
            raise MediationDenied("terminal binding")
        if self.now >= binding.expires_at:
            binding.state = BindingState.EXPIRED
            self.operational_events.append(("expired", binding_id))
            raise MediationDenied("expired binding")
        expected = (
            binding.runtime_id,
            binding.adapter_id,
            binding.agent_id,
            binding.task_id,
            binding.correlation_id,
            binding.nonce,
            binding.profile,
        )
        actual = (runtime_id, adapter_id, agent_id, task_id, correlation_id, nonce, profile)
        if actual != expected:
            binding.state = BindingState.DENIED
            self.operational_events.append(("denied", binding_id))
            raise MediationDenied("binding mismatch")
        binding.state = BindingState.EXECUTING
        self.operational_events.append(("executing", binding_id))
        return binding

    def complete(self, binding_id: str, output: str) -> RuntimeResultClaim:
        binding = self._require_executing(binding_id)
        binding.state = BindingState.COMPLETED
        claim = RuntimeResultClaim(binding_id, binding.correlation_id, output)
        self.result_claims.append(claim)
        self.operational_events.append(("completed", binding_id))
        return claim

    def cancel(self, binding_id: str) -> None:
        binding = self._require_nonterminal(binding_id)
        binding.state = BindingState.CANCELLED
        self.operational_events.append(("cancelled", binding_id))

    def deny(self, binding_id: str) -> None:
        binding = self._require_nonterminal(binding_id)
        binding.state = BindingState.DENIED
        self.operational_events.append(("denied", binding_id))

    def fail(self, binding_id: str) -> None:
        binding = self._require_nonterminal(binding_id)
        binding.state = BindingState.FAILED
        self.operational_events.append(("failed", binding_id))

    def revoke(self, binding_id: str) -> None:
        binding = self._require_nonterminal(binding_id)
        binding.state = BindingState.REVOKED
        self.operational_events.append(("revoked", binding_id))

    def _require_nonterminal(self, binding_id: str) -> Binding:
        binding = self.bindings[binding_id]
        if binding.state in TERMINAL_STATES:
            raise MediationDenied("terminal binding")
        return binding

    def _require_executing(self, binding_id: str) -> Binding:
        binding = self._require_nonterminal(binding_id)
        if binding.state is not BindingState.EXECUTING:
            raise MediationDenied("binding is not executing")
        return binding


SYNTHETIC_PROMPT = "HAL synthetic mediation pilot"


class FakeUpstreamMediator:
    """In-memory mediator simulation; its upstream is a test callback, never a route."""

    def __init__(self, hal: HalOwnedMediation, upstream) -> None:
        self.hal = hal
        self.upstream = upstream

    def execute(
        self,
        binding_id: str,
        *,
        prompt: str,
        capability_requests: tuple[str, ...] = (),
        **request: object,
    ) -> RuntimeResultClaim:
        if prompt != SYNTHETIC_PROMPT:
            self.hal.deny(binding_id)
            raise MediationDenied("prompt outside synthetic profile")
        if capability_requests:
            self.hal.deny(binding_id)
            raise MediationDenied("zero-capability mediation profile")
        binding = self.hal.request(binding_id, **request)
        try:
            output = self.upstream(binding.profile.model, prompt, binding.profile)
        except Exception as error:
            self.hal.fail(binding_id)
            raise MediationDenied("synthetic upstream failure") from error
        if not isinstance(output, str) or len(output.encode()) > binding.profile.max_response_bytes:
            self.hal.fail(binding_id)
            raise MediationDenied("synthetic upstream response bound")
        return self.hal.complete(binding_id, output)
