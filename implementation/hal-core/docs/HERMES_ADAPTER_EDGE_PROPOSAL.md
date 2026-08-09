# Hermes Reference Runtime v1 — Adapter-Edge Proposal

> **Status:** Design proposal only. It defines no wire protocol, credential mechanism, process model, or activation authority.

## 1. Purpose and Scope

This proposal defines the future adapter-edge responsibilities needed to implement the existing semantic Agent Runtime Contract without coupling HAL Core to Hermes. It is governed by Book II Chapters 2, 15, 16, 28, and 29; Book III Chapters 3, 5, and 6; and [DR 0011](../../../decisions/0011-production-runtime-integration-design-phase.md).

It does not define an actual Hermes integration. The current `HermesAdapter`, line driver, and GX10 harness remain test-only and are not implementation candidates by implication.

## 2. Responsibility Partition

| HAL-owned                                                                                                                                              | Adapter-edge translation only                                                                            | Runtime-local                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Admission, placement, identity, authority, policy, Gateway disposition, evidence custody, lifecycle authority, recovery, rollback, canonical knowledge | Translate semantic Contract operations and runtime claims; preserve bounded linkage; expose no authority | Reasoning, context compression, tool mechanics, skills, subagents, scheduling, and sandbox mechanics within HAL-admitted limits |

The adapter may not decide a capability disposition, accept a claim as canonical, manufacture a HAL lifecycle state, retry an ambiguous action, or bypass the Gateway. It must not export Hermes-specific data structures into HAL Core.

## 3. Semantic Lifecycle Envelope

The adapter-edge implementation must map the existing Contract operations to an adapter-private implementation while retaining the following HAL-observable lifecycle semantics:

| HAL operation                 | Required adapter behavior                                                                            | Fail-closed condition                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Start runtime                 | Bind the authenticated runtime identity to HAL callback custody; establish no ambient authority      | Identity, compatibility, or callback-custody binding unavailable                   |
| Create agent                  | Bind a HAL-admitted agent, task, and correlation context                                             | Agent identity, task, or correlation mismatch                                      |
| Provide context               | Deliver only the bounded, classified context approved for that execution                             | Context is absent, unclassified, out of scope, or cannot be minimized              |
| Provide capability manifest   | Deliver only HAL-issued scope descriptors; no resource handles or implied grant                      | Manifest is broadened, stale, malformed, or lacks required binding                 |
| Execute task                  | Dispatch the bounded task; return claims only through HAL callback custody                           | Execution not admitted, malformed, uncorrelated, or ambiguous                      |
| Checkpoint / cancel / destroy | Preserve HAL lifecycle authority and evidence; do not accept unsolicited claims as control responses | Agent not admitted, state ambiguous, or control response attempts to carry a claim |

Terminal result or failure closes the current dispatch claim stream. A later claim requires a new HAL-admitted execution context; an adapter must reject it rather than infer continuity.

## 4. Runtime-to-HAL Claim Rules

Every future runtime-originated claim must carry enough information for HAL to bind it to the admitted execution: runtime identity, agent identity, task identity, correlation identity, claim kind, and provenance/ordering information appropriate to the selected adapter-private protocol. Exact field names and serialization remain deferred.

Before forwarding a claim, HAL-owned callback custody must verify:

1. the runtime identity equals the admitted runtime;
2. the agent is currently admitted through the HAL-owned host;
3. the task and correlation match the active HAL execution;
4. the claim kind is allowed in the current lifecycle state; and
5. replay, duplicate, malformed, post-terminal, and control-plane claim rules are satisfied.

Capability requests proceed to the HAL Capability Gateway. Evidence, progress, result, failure, and subagent requests become non-canonical submissions only. Their transport receipt or persistence never means permission, outcome verification, authority, or canonical-knowledge acceptance.

## 5. Idempotency, Ordering, and Failure

- The selected adapter-private design must identify an idempotency scope for lifecycle commands and resource-affecting capability requests.
- Ordering must be explicit at least within one admitted execution. If ordering cannot be proven, HAL must preserve the ambiguity and pause/contain rather than fabricate a result.
- Duplicate, late, replayed, malformed, or mislinked messages are rejected and recorded as applicable evidence; they must not restart execution or alter authority.
- A transport loss, crash, timeout, cancellation uncertainty, or runtime identity failure yields a HAL-owned failure/containment disposition, not an adapter-generated success or retry.
- Checkpoints are operational runtime state only. Recovery reconstructs authority and canonical state from HAL-owned records before considering runtime replacement or resumed work.

## 6. Compatibility and Replaceability

The adapter-specific protocol may evolve only behind `HermesAdapter` with explicit version/compatibility, error, ordering, and migration behavior. HAL Core continues to use the semantic Contract. A compatible `NativeHALAdapter`, `TestRuntimeAdapter`, or future adapter must be substitutable without changes to HAL’s constitutional identity, Owner authority, canonical knowledge, Evidence Graph semantics, Gateway semantics, or HAL-facing interface.

## 7. Required Pre-Implementation Tests

- identity, task, correlation, and lifecycle-state linkage positive and negative cases;
- malformed, replayed, duplicated, reordered, control-plane, and post-terminal claim cases;
- Gateway permit, deny, authorization-required, stale, broadened, and unavailable cases;
- context minimization and capability-manifest no-handle tests;
- cancellation, destroy, disconnect, crash, replacement, checkpoint, recovery, and rollback/containment cases; and
- static proof that HAL Core has no Hermes package, process, protocol, or implementation-detail dependency.

## 8. Deferred Decisions and Implementation Gate

Transport, serialization, authentication technology, process/container model, model/provider, credential mechanism, network posture, resource scope, and host placement remain unresolved. Selecting or implementing any of them requires the later Owner-approved implementation/activation record required by the readiness checklist.
