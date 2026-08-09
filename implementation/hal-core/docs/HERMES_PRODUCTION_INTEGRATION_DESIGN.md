# Hermes Reference Runtime v1 — Production-Integration Design

> **Status:** Owner-approved design and conformance planning only. Not an implementation specification, activation approval, transport definition, or resource authorization.

## 1. Purpose and Authority

This document translates the accepted runtime-sovereignty architecture into an implementation-ready design envelope for a future Hermes Reference Runtime v1 adapter. It is subordinate to Book I, Book II, Book III, [DR 0001](../../../decisions/0001-agent-runtime-sovereignty-and-replaceability.md), and [DR 0011](../../../decisions/0011-production-runtime-integration-design-phase.md).

HAL Core may depend on the Agent Runtime Contract. Hermes-specific behavior must remain entirely behind the Hermes adapter edge. No detail here changes the Contract, Capability Gateway semantics, canonical-knowledge rules, or constitutional authority.

## 2. Non-Negotiable Boundary

```text
HAL-owned RuntimeHost
  -> Agent Runtime Contract
    -> HermesAdapter
      -> adapter-specific driver boundary
        -> Hermes Reference Runtime v1

Hermes runtime claim
  -> HAL-owned callback custody
    -> identity/task/correlation validation
      -> Capability Gateway or RuntimeSubmissionRecorder
        -> governed policy/evidence path
```

The runtime may propose work or request a capability. HAL alone admits work, places it, evaluates authority, permits or denies consequential action, and accepts or rejects claims. Runtime technical reachability, tool availability, state, or credentials never imply authority.

## 3. Design Constraints

- The future adapter receives only task-bounded context and a HAL-issued capability manifest.
- HAL authenticates and binds runtime/provider identity before admitting execution; protocol and credential choices remain deferred.
- Every runtime-to-HAL callback must match the HAL-admitted runtime, agent, task, and correlation context before it reaches a Gateway, evidence recorder, or lifecycle handler.
- The adapter has no ambient filesystem, shell, network, node, credential, secret, or governed-resource authority. Any required operation must be expressed through the Contract and HAL-owned Gateway path.
- Runtime reports and memory are non-canonical claims or disposable operational state until accepted through separate HAL-governed processes.
- Runtime failure, disconnect, malformed input, lost correlation, or unavailable identity fails closed: no new resource effect, authority expansion, canonical acceptance, or silent continuation.
- Runtime replacement requires no change to HAL identity, policy, canonical knowledge, Evidence Graph semantics, Capability Gateway semantics, or HAL-facing Contract.

## 4. Design Threat Model

| Threat                                                 | Required design control                                                       | Required evidence before activation                                 |
| ------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Runtime forges or replays a claim                      | HAL-owned identity, task, correlation, ordering, and replay controls          | Negative and replay tests with attributable audit records           |
| Runtime seeks ambient authority                        | No direct governed-resource handles; Gateway-only capability path             | Static dependency/handle review and negative capability tests       |
| Runtime report becomes HAL truth                       | Submission custody and explicit downstream acceptance only                    | Evidence/canonical-knowledge separation tests                       |
| Hermes adapter leaks implementation coupling into Core | Adapter-only dependency boundary                                              | Static anti-coupling and replacement tests                          |
| Runtime failure causes unverified retry or loss        | HAL-owned lifecycle, quarantine, checkpoint, cancellation, recovery           | Fault-injection, containment, rollback, and reconstruction tests    |
| Supply-chain or runtime compromise                     | Pinned provenance, inventory, isolation, review, revocation, and removal plan | Provenance, inventory, vulnerability disposition, removal rehearsal |
| Context or secret disclosure                           | Classification, minimization, bounded context, no ambient credential path     | Data-flow inventory and negative disclosure tests                   |

## 5. Required Design Artifacts Before Implementation Approval

1. A versioned adapter-specific boundary proposal that preserves the semantic Agent Runtime Contract and does not introduce a HAL Core Hermes dependency.
2. Provider/runtime identity and attestation design, including rotation, revocation, failure behavior, and accountable HAL owner; see [runtime identity and trust design](HERMES_RUNTIME_IDENTITY_AND_TRUST_DESIGN.md).
3. Capability request and response mediation design, including the approved Gateway path, scopes, time bounds, authorization holds, and audit/evidence records; see [Capability Gateway mediation design](HERMES_CAPABILITY_GATEWAY_MEDIATION_DESIGN.md).
4. Context classification, minimization, retention, runtime-local-state, and deletion/reconstruction design; see [context, lifecycle, and recovery design](HERMES_CONTEXT_LIFECYCLE_RECOVERY_DESIGN.md).
5. Lifecycle design for admission, health, checkpoint, cancellation, destruction, quarantine, replacement, recovery, and rollback; see [context, lifecycle, and recovery design](HERMES_CONTEXT_LIFECYCLE_RECOVERY_DESIGN.md).
6. Threat model, supply-chain inventory, dependency vulnerability disposition, test plan, and negative-authority test matrix. The existing [source preflight](HERMES_SOURCE_PREFLIGHT_v2026.8.3.md) is input evidence only, not a completed activation review.
7. Containment and removal plan that returns the environment to a verified no-runtime state. Existing [GX10-1 containment evidence](HERMES_GX10_1_CONTAINMENT_PROBE.md) is synthetic-only input evidence, not a production containment certification.

## 6. Explicitly Deferred Decisions

This phase does not select or define a transport, wire schema, programming language, credential mechanism, execution environment, host placement, provider/model configuration, capability naming convention, data-retention period, network posture, or production scheduler mechanics. Each becomes a separately traceable proposal and, when materially consequential, an Owner Review item.

## 7. Activation Gate

Before implementation or activation, an Owner-approved change record must identify the exact immutable runtime input, accountable HAL components, deployment environment, trust assumptions, resource and data classification scope, permitted operations, secret/credential posture, security controls, evidence requirements, rollback/removal steps, and conformance/acceptance criteria.

No design artifact itself authorizes activation.
