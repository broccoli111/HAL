# CMP-05 - Cognitive Orchestrator Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-05
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Coordinate bounded cognitive work, model and tool routing, execution graphs, and result assembly without gaining authority to act.

## 3. Constitutional and architectural basis

- Book I: Decisions 8-23, 30-37, 40-43, 47-50, and 58.
- Book II: Chapters 07.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Execution Graph, Provider, Capability.

## 4. Responsibilities

- Own and protect mutation of Execution Graphs.
- Own and protect mutation of orchestration runs.
- Own and protect mutation of provider-selection records.
- Own and protect mutation of result assembly state.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Intent meaning.
- MUST NOT own or independently redefine attention priority.
- MUST NOT own or independently redefine judgment.
- MUST NOT own or independently redefine capability authority.
- MUST NOT own or independently redefine real-world commit.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Execution Graphs, orchestration runs, provider-selection records, result assembly state | Only CMP-05 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Intent meaning, attention priority, judgment, capability authority, real-world commit | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-05-IF-01 | Command | Start Orchestration | Command `Start Orchestration` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-05-IF-02 | Command | Advance Execution Graph | Command `Advance Execution Graph` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-05-IF-03 | Command | Cancel Run | Command `Cancel Run` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-05-IF-04 | Command | Request Provider Work | Command `Request Provider Work` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-05-IF-05 | Query | Get Run State | Query `Get Run State` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-05-IF-06 | Query | Explain Routing | Query `Explain Routing` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-05-IF-07 | Query | Get Execution Graph | Query `Get Execution Graph` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-05-IF-08 | Event | Run Started | Event `Run Started` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-05-IF-09 | Event | Node Completed | Event `Node Completed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-05-IF-10 | Event | Run Failed | Event `Run Failed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-05-IF-11 | Event | Result Assembled | Event `Result Assembled` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Start Orchestration, Advance Execution Graph, Cancel Run, Request Provider Work. Queries: Get Run State, Explain Routing, Get Execution Graph. Events: Run Started, Node Completed, Run Failed, Result Assembled.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Queued > Running > Waiting > Completed, Failed, or Cancelled**.

Every transition requires an expected prior state and version, authenticated initiator, current authority and policy context where applicable, transition guard, idempotency key, timestamp with declared time semantics, and immutable transition evidence. Terminal states MUST reject further mutation except through an explicitly governed reactivation or recovery transition.

## 10. Identity, authority, and policy checks

Every command MUST resolve a durable caller Identity, authenticate the current context, evaluate effective Authority and Permission, verify delegation scope and expiry where used, enforce applicable policy and operating mode, and bind the decision to the exact requested effect. Trust, role, network location, credential possession, conversation, historical approval, or capability availability MUST NOT substitute for Authority.

## 11. Trust boundaries

All callers, dependencies, operators, infrastructure, providers, replicas, and recovery inputs remain outside the component's semantic trust boundary. Co-process or same-host deployment does not remove identity, integrity, freshness, Authority, Permission, provenance, or replay checks. Cross-domain exchange MUST traverse the Constitutional Firewall under an active Treaty.

## 12. Security controls

The component MUST apply least privilege, authenticated and integrity-protected communication, input and output validation, replay resistance, defaults that deny protected effects when prerequisites are absent, secret indirection, dependency provenance, signed build and release evidence, tamper-evident audit, and explicit failure decisions naming the protected value, hazard, containment, and residual risk. Compromised callers and dependencies MUST be assumed possible.

## 13. Privacy controls

The component MUST classify handled data; verify authorized purpose; minimize collection, processing, retention, logging, and disclosure; enforce access and deletion obligations; evaluate inference risk; and preserve evidence of privacy decisions. Sensitive payloads MUST NOT be copied into errors, metrics, traces, or ordinary Audit Records.

## 14. Failure modes and containment

Material failure modes: provider hallucination, graph deadlock, unbounded recursion, result provenance loss, cancel failure. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Intent Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Attention Manager: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Judgment Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Capability Registry: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Knowledge Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Runtime Supervisor: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-05-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-05-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-05-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-05-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-05-TST-005 | Critical invariant | Orchestration coordinates work but never converts provider availability, model output, or useful results into authority. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-05-TST-006 | Failure containment | Inject provider hallucination, graph deadlock, unbounded recursion, result provenance loss, cancel failure. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-05-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-05-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-05-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-05-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 8-23, 30-37, 40-43, 47-50, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 07. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Execution Graph, Provider, Capability. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 11 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.
