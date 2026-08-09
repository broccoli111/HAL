# Proposed Decision Record 0012 — Bounded Hermes Implementation and Activation Phase

| Field | Value |
| --- | --- |
| Status | Accepted — sequential gated implementation and activation evaluation |
| Date | 2026-08-09 |
| Scope | Sequential, gated Hermes Reference Runtime v1 implementation and isolated activation evaluation |
| Owner Review | Explicit Owner approval of the recommended Phases A–C on 2026-08-09 |

## Decision

The Owner authorizes the bounded Phases A–C below. Each phase remains sequential and fail-closed: its acceptance evidence and stop conditions must be satisfied before work enters the next phase. This approval does not authorize a broader production deployment.

## Recommended Scope

### Phase A — Adapter Implementation Without Runtime Activation

Implement only the HAL-side adapter-edge mechanics described in the approved design package. No Hermes package, process, transport, connection, provider, credential, real capability, or governed resource is used.

**Allowed:** contract-compatible adapter-private abstractions, deterministic fakes, negative-authority tests, fault injection, static dependency checks, documentation, and test-only evidence.

**Prohibited:** any executable Hermes interaction or resource/provider integration.

### Phase B — Isolated Runtime Activation Evaluation

Only after Phase A acceptance, run the immutable input pinned in [DR 0004](0004-hermes-latest-evaluation-source-pin.md)—`v2026.8.3`, commit `3c27eb6234bf91b8ceee9e9071591b31e9b148cb`—on the Owner-selected GX10-1 `hal_eval` rootless-Docker environment under the already evidenced hardened containment profile.

**Allowed:** one bounded, network-denied, no-provider, zero-capability, synthetic task through a HAL-owned adapter test harness; bounded progress/result/failure claims; evidence capture; container/process destruction; removal verification.

**Prohibited:** HAL secrets, owner credentials, model-provider configuration, network, MCP, browser, terminal, shell, filesystem access beyond the isolated disposable state area, home automation, messaging, scheduler, GPU/device access, inbound listeners, NAS, production data, canonical-knowledge acceptance, real Capability Gateway provider effects, and any direct governed-resource access.

### Phase C — Evaluation Disposition

Record containment, identity, claim-custody, cancellation, failure, removal, and replacement evidence. Phase C produces an evaluation disposition only; it does not authorize production service deployment, real capabilities, provider credentials, or user-facing activation.

## Required Acceptance Evidence

1. Full test-only contract and HAL Core verification gate passes.
2. Static proof confirms no HAL Core Hermes dependency and no ambient resource handle.
3. The adapter-edge, identity/trust, Gateway-mediation, context/lifecycle/recovery designs are mapped to implementation tests.
4. Immutable source provenance and containment-profile integrity are recorded immediately before activation.
5. Negative controls prove no network, secrets, default Hermes home, host/NAS mount, resource provider, or tool surface is reachable.
6. Runtime claims are rejected unless bound to the admitted runtime, agent, task, and correlation; all retained claims remain non-canonical.
7. Cancellation, failure, destruction, removal, and recovery/replacement evidence are captured.

## Stop and Revocation Conditions

Stop immediately, preserve evidence, destroy the disposable runtime environment where safe, and return to no-runtime state on any containment escape, identity mismatch, unexpected write, network attempt, secret/provider request, tool-surface activation, direct resource path, claim-custody failure, policy/authority bypass, or material Canon conflict.

## Phase C Evaluation Disposition

Phase A conformance evidence passed on 2026-08-09. Phase B ran one bounded safe-mode/no-provider synthetic task on the accepted GX10-1 containment path. Hermes exited before inference because no API key or provider was configured; no provider, network, tool, capability, credential, HAL resource, or canonical-knowledge path was used. Cleanup verified zero containers and no default Hermes state. See [Phase B evidence](../implementation/hal-core/docs/HERMES_GX10_1_PHASE_B_SAFE_MODE_EVALUATION.md).

**Disposition:** the isolated evaluation boundary behaved as expected for this no-provider safe failure. The result does not authorize model/provider configuration, real capabilities/resources, production transport, service deployment, or certification. Those remain prohibited pending a new Owner decision and the applicable review evidence.

## Alternatives

- **Approve Phase A only.** Lowest risk; builds HAL-side implementation with no external runtime execution.
- **Approve Phases A through C.** Recommended bounded path; produces real isolated evidence while retaining zero capability and no provider/resource access.
- **Authorize broader production deployment.** Not recommended; requires additional resource, credential, data-classification, and operational decisions not yet specified.

## Architectural and Constitutional Impact

No Constitutional amendment is proposed. The design preserves HAL sovereignty and all current Book II boundaries. It introduces an executable external-runtime evaluation boundary only if Phase B is accepted; therefore it requires explicit Owner authorization and must remain adapter-confined, reversible, evidence-producing, and fail-closed.

## Security Impact and Reversibility

Phase A is local, deterministic, and reversible. Phase B is an isolated, disposable, network-denied, no-provider, zero-capability evaluation with removal verification. Neither phase authorizes production deployment. The Phase B risk is bounded but non-zero because an external runtime process executes; containment and stop conditions are mandatory.
