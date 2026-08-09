"""Deterministic, in-memory fixtures for Agent Runtime Contract conformance tests.

This module is test infrastructure only. It is not a HAL production runtime,
Capability Gateway implementation, or public Agent Runtime Contract API.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Any


class CapabilityDisposition(str, Enum):
    PERMITTED = "permitted"
    DENIED = "denied"
    AUTHORIZATION_REQUIRED = "authorization_required"


@dataclass(frozen=True)
class CapabilityRequest:
    actor_id: str
    agent_id: str
    task_id: str
    capability: str
    target: str
    delegation: frozenset[str]
    correlation_id: str
    scope_token: str


@dataclass
class RuntimeReport:
    kind: str
    correlation_id: str
    payload: dict[str, Any]
    accepted: bool = False


@dataclass
class AgentState:
    actor_id: str
    task_id: str
    delegation: frozenset[str]
    active: bool = True


@dataclass
class SealedSyntheticResource:
    target: str = "fixture://governed-resource"
    effects: list[dict[str, str]] = field(default_factory=list)

    def apply(self, correlation_id: str) -> None:
        self.effects.append({"correlation_id": correlation_id})


class InMemoryCapabilityGateway:
    """Evaluates only synthetic requests; it exposes no ambient resource access."""

    def __init__(self, resource: SealedSyntheticResource) -> None:
        self._resource = resource
        self.decisions: list[tuple[CapabilityRequest, CapabilityDisposition]] = []

    def evaluate(self, request: CapabilityRequest) -> CapabilityDisposition:
        if request.capability == "fixture.hold":
            disposition = CapabilityDisposition.AUTHORIZATION_REQUIRED
        elif (
            request.capability == "fixture.read"
            and request.target == self._resource.target
            and request.capability in request.delegation
            and request.scope_token == request.task_id
        ):
            disposition = CapabilityDisposition.PERMITTED
        else:
            disposition = CapabilityDisposition.DENIED
        self.decisions.append((request, disposition))
        if disposition is CapabilityDisposition.PERMITTED:
            self._resource.apply(request.correlation_id)
        return disposition


class InMemoryHalGovernance:
    """Minimal governance fixture with explicit claim acceptance and lifecycle state."""

    def __init__(self) -> None:
        self.resource = SealedSyntheticResource()
        self.gateway = InMemoryCapabilityGateway(self.resource)
        self.agents: dict[str, AgentState] = {}
        self.canonical_knowledge: dict[str, str] = {"approved-context": "synthetic"}
        self.evidence: list[RuntimeReport] = []
        self.reports: list[RuntimeReport] = []
        self.lifecycle_events: list[str] = []
        self.policy_version = "test-policy-v1"
        self.authority_version = "test-authority-v1"

    def admit_runtime(self, runtime_id: str, adapter_id: str) -> None:
        if runtime_id != "test-runtime" or adapter_id != "test-adapter":
            raise PermissionError("unrecognized test runtime identity")
        self.lifecycle_events.append(f"runtime-started:{runtime_id}")

    def create_agent(
        self, agent_id: str, actor_id: str, task_id: str, delegation: frozenset[str]
    ) -> None:
        self.agents[agent_id] = AgentState(actor_id, task_id, delegation)
        self.lifecycle_events.append(f"agent-created:{agent_id}")

    def bounded_context(self, task_id: str) -> dict[str, str]:
        return {"task_id": task_id, "approved-context": self.canonical_knowledge["approved-context"]}

    def request_capability(
        self, agent_id: str, capability: str, target: str, correlation_id: str, scope_token: str
    ) -> CapabilityDisposition:
        agent = self.agents[agent_id]
        if not agent.active:
            return CapabilityDisposition.DENIED
        return self.gateway.evaluate(
            CapabilityRequest(
                actor_id=agent.actor_id,
                agent_id=agent_id,
                task_id=agent.task_id,
                capability=capability,
                target=target,
                delegation=agent.delegation,
                correlation_id=correlation_id,
                scope_token=scope_token,
            )
        )

    def submit_evidence(self, report: RuntimeReport) -> None:
        self.evidence.append(report)

    def submit_report(self, report: RuntimeReport) -> None:
        self.reports.append(report)

    def request_subagent(self, parent_id: str, child_id: str, delegation: frozenset[str]) -> bool:
        parent = self.agents[parent_id]
        if not parent.active or not delegation.issubset(parent.delegation):
            return False
        self.create_agent(child_id, parent.actor_id, parent.task_id, delegation)
        return True

    def cancel(self, agent_id: str) -> None:
        self.agents[agent_id].active = False
        self.lifecycle_events.append(f"agent-cancelled:{agent_id}")

    def destroy(self, agent_id: str) -> None:
        self.cancel(agent_id)
        self.lifecycle_events.append(f"agent-destroyed:{agent_id}")


class TestRuntimeAdapter:
    """A deterministic runtime adapter used only by this conformance suite."""

    def __init__(self, hal: InMemoryHalGovernance) -> None:
        self.hal = hal
        self.runtime_id = "test-runtime"
        self.adapter_id = "test-adapter"
        self.memory: dict[str, Any] = {}

    def start(self) -> None:
        self.hal.admit_runtime(self.runtime_id, self.adapter_id)

    def create_agent(self, agent_id: str, task_id: str, delegation: frozenset[str]) -> None:
        self.hal.create_agent(agent_id, "test-actor", task_id, delegation)

    def execute(self, agent_id: str) -> dict[str, str]:
        task_id = self.hal.agents[agent_id].task_id
        context = self.hal.bounded_context(task_id)
        self.memory[agent_id] = dict(context)
        return context

    def request_capability(
        self, agent_id: str, capability: str, target: str, correlation_id: str, scope_token: str
    ) -> CapabilityDisposition:
        return self.hal.request_capability(agent_id, capability, target, correlation_id, scope_token)

    def submit_evidence(self, correlation_id: str, payload: dict[str, Any]) -> RuntimeReport:
        report = RuntimeReport("evidence", correlation_id, payload)
        self.hal.submit_evidence(report)
        return report

    def report(self, kind: str, correlation_id: str, payload: dict[str, Any]) -> RuntimeReport:
        report = RuntimeReport(kind, correlation_id, payload)
        self.hal.submit_report(report)
        return report

    def request_subagent(self, parent_id: str, child_id: str, delegation: frozenset[str]) -> bool:
        return self.hal.request_subagent(parent_id, child_id, delegation)

    def checkpoint(self, agent_id: str) -> dict[str, Any]:
        return dict(self.memory.get(agent_id, {}))

    def cancel(self, agent_id: str) -> None:
        self.hal.cancel(agent_id)

    def destroy(self, agent_id: str) -> None:
        self.hal.destroy(agent_id)

    def lose_memory(self) -> None:
        self.memory.clear()
