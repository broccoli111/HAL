# Decision Record 0018 — HAL-Owned Local Inference Mediation Contract

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | Design and conformance planning for the synthetic-only GX10-1 local-inference mediator |
| Owner Review | Explicit Owner authorization of the recommended HAL-owned identity-and-correlation mediation design |

## Decision

Define a versioned, HAL-owned Local Inference Mediation Contract before any runtime-facing route to the GX10-1 Ollama/Qwen3 service is considered. HAL creates and verifies the admission binding for an exact runtime, agent, task, correlation, model, purpose, lifetime, and limits. A runtime may present that binding to request the one admitted inference operation; it cannot create, extend, reuse, or interpret it as Authority, Permission, a capability, or access to another resource.

The contract is an adapter-neutral security boundary. Hermes-specific mechanics, if later needed, remain contained in `HermesAdapter`; HAL Core remains independent of Hermes internals. This decision authorizes design, deterministic conformance tests, and non-activating implementation planning only. It does not authorize a container mount, network route, proxy activation, Hermes connection, data flow, credentials, or production use.

## Supporting Authority

- Book I Decisions 5, 27, 35–36, and 50: single authoritative ownership, identity/delegated authority, bounded capabilities/recovery, and verified safe change.
- Book II Chapter 2 §3.1–§3.2: implementation-neutral Agent Runtime Contract, HAL lifecycle/authority custody, and anti-coupling direction.
- Book II Chapter 10, “Runtime Memory Sovereignty”: runtime output and memory are non-authoritative unless admitted through governed HAL processes.
- Book II Chapter 15, “Capability Gateway Boundary”: technical reachability does not imply authority; consequential runtime actions require HAL evaluation and evidence.
- Book III Chapter 5 and Chapter 6: authenticated/correlated trust-boundary requests, least privilege, and risk-based reproducible verification.
- DR 0013, DR 0015, DR 0016, and DR 0017: local-only model policy, approved model/service limits, and controlled proxy selection.

## Alternatives Considered

| Alternative | Disposition | Reason |
| --- | --- | --- |
| Generic Unix-socket or TCP forwarder | Rejected | It cannot prove HAL-owned identity, correlation, or admission custody. |
| Direct container-to-Ollama network route | Rejected | It broadens the network/host-service trust boundary and bypass risk. |
| Hermes-specific authentication design | Rejected | It would couple HAL Core to a replaceable runtime. |
| HAL-owned mediation contract | Accepted | It preserves replaceability, bounded authority, and evidentiary control. |

## Consequences

- A mediation binding is a revocable, one-use operational control object, not a credential with standing authority.
- HAL records admission, disposition, completion/failure, and teardown as non-canonical operational evidence; model output remains a claim pending ordinary HAL evidence/knowledge admission.
- Any identity mismatch, expired/replayed binding, unexpected model/parameter, missing evidence, bypass indicator, or inability to demonstrate network denial fails closed to the current no-connection state.
- A future implementation may replace the mediator transport without changing the semantic contract, Canon, Capability Gateway semantics, Owner identity, or canonical knowledge.

## Implementation Implications

The design package is [Local Inference Mediation Contract](../implementation/hal-core/docs/LOCAL_INFERENCE_MEDIATION_CONTRACT.md), its [control matrix](../implementation/hal-core/docs/LOCAL_INFERENCE_MEDIATION_CONTROL_MATRIX.md), and [verification plan](../implementation/hal-core/docs/LOCAL_INFERENCE_MEDIATION_VERIFICATION_PLAN.md). Any activation remains gated by the verification plan and a further explicit Owner decision.
