# HAL Book IV - Component Specifications

**Version:** 1.0  
**Status:** Final  
**Effective date:** 2026-07-27  
**Authority:** Book I is supreme; Book II is the authoritative architecture; Book III governs engineering; Book X governs canonical terminology; Book IV refines component behavior without defining Book IX wire contracts.

## Authority statement

Book IV is a controlled family of subsystem specifications. It MUST preserve Books I-III, use Book X meanings, and hand machine-facing schemas and protocol details to Book IX. If a Book IV requirement conflicts with a higher-order source, the higher-order source controls, the conflicting requirement stops applying, and Book IV is corrected.

## Revision history

| Version | Date | Status | Description |
|---|---|---|---|
| 1.0 | 2026-07-27 | Final | Complete 29-component specification family, ownership and interface catalogs, conformance suite, reviews, and certification. |

## Collection rules

1. Every authoritative state domain has exactly one mutation owner.
2. Logical interfaces define semantic obligations; Book IX defines machine contracts.
3. No component gains Authority from data possession, code execution, credentials, trust, usefulness, or deployment locality.
4. Every critical invariant, authority path, trust boundary, lifecycle transition, failure mode, recovery path, privacy obligation, and prohibited shortcut has a conformance method.
5. Component specialization cannot redefine Book X Canonical Terms.

## Component register

| ID | Component | Book II basis | Authoritative domains | Interfaces | Tests | Status |
|---|---|---|---:|---:|---:|---|
| CMP-01 | Constitutional Kernel | 01, 03, 05, 20, 29, 35 | 6 | 9 | 10 | Final |
| CMP-02 | Identity and Continuity Service | 04, 28 | 5 | 10 | 10 | Final |
| CMP-03 | Authority and Delegation Service | 05 | 5 | 10 | 10 | Final |
| CMP-04 | Intent Service | 06 | 4 | 10 | 10 | Final |
| CMP-05 | Cognitive Orchestrator | 07 | 4 | 11 | 10 | Final |
| CMP-06 | Attention Manager | 08 | 4 | 10 | 10 | Final |
| CMP-07 | Judgment Service | 09 | 4 | 10 | 10 | Final |
| CMP-08 | Knowledge Service | 10 | 5 | 10 | 10 | Final |
| CMP-09 | Memory System | 12 | 4 | 10 | 10 | Final |
| CMP-10 | Learning and Wisdom System | 11, 12 | 5 | 10 | 10 | Final |
| CMP-11 | Temporal Service | 13 | 7 | 10 | 10 | Final |
| CMP-12 | Presence and Embodiment Layer | 14, 31 | 5 | 10 | 10 | Final |
| CMP-13 | Capability Registry | 15 | 4 | 10 | 10 | Final |
| CMP-14 | Action and Transaction Engine | 16 | 5 | 12 | 10 | Final |
| CMP-15 | Verification Service | 17, 35 | 4 | 11 | 10 | Final |
| CMP-16 | Simulation and Digital Twin Platform | 17 | 4 | 11 | 10 | Final |
| CMP-17 | Trust Service | 18 | 4 | 9 | 10 | Final |
| CMP-18 | Evidence Service | 18, 25 | 4 | 10 | 10 | Final |
| CMP-19 | Privacy and Data Governance Service | 19 | 5 | 12 | 10 | Final |
| CMP-20 | Constitutional Firewall | 20, 21 | 5 | 10 | 10 | Final |
| CMP-21 | Treaty Manager | 21 | 4 | 12 | 10 | Final |
| CMP-22 | Event and Messaging Platform | 22, 23 | 6 | 11 | 10 | Final |
| CMP-23 | State and Persistence Platform | 24 | 5 | 12 | 10 | Final |
| CMP-24 | Observability and Audit Platform | 25 | 5 | 11 | 10 | Final |
| CMP-25 | Runtime Supervisor | 02, 27, 29, 34 | 6 | 12 | 10 | Final |
| CMP-26 | Recovery Coordinator | 27, 28 | 5 | 12 | 10 | Final |
| CMP-27 | Human Interaction Layer | 14, 31 | 4 | 11 | 10 | Final |
| CMP-28 | Self-Model and Constitutional Mirror | 30, 33 | 4 | 9 | 10 | Final |
| CMP-29 | Outcome and Success Evaluation Service | 32 | 4 | 10 | 10 | Final |

## Table of contents

1. Constitutional Kernel (CMP-01)
2. Identity and Continuity Service (CMP-02)
3. Authority and Delegation Service (CMP-03)
4. Intent Service (CMP-04)
5. Cognitive Orchestrator (CMP-05)
6. Attention Manager (CMP-06)
7. Judgment Service (CMP-07)
8. Knowledge Service (CMP-08)
9. Memory System (CMP-09)
10. Learning and Wisdom System (CMP-10)
11. Temporal Service (CMP-11)
12. Presence and Embodiment Layer (CMP-12)
13. Capability Registry (CMP-13)
14. Action and Transaction Engine (CMP-14)
15. Verification Service (CMP-15)
16. Simulation and Digital Twin Platform (CMP-16)
17. Trust Service (CMP-17)
18. Evidence Service (CMP-18)
19. Privacy and Data Governance Service (CMP-19)
20. Constitutional Firewall (CMP-20)
21. Treaty Manager (CMP-21)
22. Event and Messaging Platform (CMP-22)
23. State and Persistence Platform (CMP-23)
24. Observability and Audit Platform (CMP-24)
25. Runtime Supervisor (CMP-25)
26. Recovery Coordinator (CMP-26)
27. Human Interaction Layer (CMP-27)
28. Self-Model and Constitutional Mirror (CMP-28)
29. Outcome and Success Evaluation Service (CMP-29)


# CMP-01 - Constitutional Kernel Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-01
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Admit or reject protected actions and protected state transitions while preserving HAL's constitutional identity.

## 3. Constitutional and architectural basis

- Book I: Decisions 1-7, 24-29, 38-43, 47-51, 56, and 58.
- Book II: Chapters 01, 03, 05, 20, 29, 35.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Constitution, Constitutional Invariant, Constitutional Kernel, Owner Authorization Ceremony.

## 4. Responsibilities

- Own and protect mutation of Constitutional Identity Record.
- Own and protect mutation of Constitution and Invariant Registry.
- Own and protect mutation of protected-policy admission metadata.
- Own and protect mutation of Owner Authorization Ceremony Registry.
- Own and protect mutation of Protected Audit Anchor.
- Own and protect mutation of Recovery Admission Record.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine natural-language interpretation.
- MUST NOT own or independently redefine general planning.
- MUST NOT own or independently redefine ordinary policy administration.
- MUST NOT own or independently redefine general evidence custody.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Constitutional Identity Record, Constitution and Invariant Registry, protected-policy admission metadata, Owner Authorization Ceremony Registry, Protected Audit Anchor, Recovery Admission Record | Only CMP-01 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | natural-language interpretation, general planning, ordinary policy administration, general evidence custody | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-01-IF-01 | Command | Evaluate Protected Action | Command `Evaluate Protected Action` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-01-IF-02 | Command | Commit Protected Mutation | Command `Commit Protected Mutation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-01-IF-03 | Command | Validate Owner Authorization | Command `Validate Owner Authorization` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-01-IF-04 | Command | Admit Constitutional Recovery | Command `Admit Constitutional Recovery` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-01-IF-05 | Query | Get Constitutional State | Query `Get Constitutional State` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-01-IF-06 | Query | Get Protected Decision | Query `Get Protected Decision` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-01-IF-07 | Event | Protected Action Admitted | Event `Protected Action Admitted` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-01-IF-08 | Event | Protected Action Denied | Event `Protected Action Denied` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-01-IF-09 | Event | Constitutional Mode Changed | Event `Constitutional Mode Changed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Evaluate Protected Action, Commit Protected Mutation, Validate Owner Authorization, Admit Constitutional Recovery. Queries: Get Constitutional State, Get Protected Decision. Events: Protected Action Admitted, Protected Action Denied, Constitutional Mode Changed.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Normal > Restricted > Safe > Safe Recovery > Normal**.

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

Material failure modes: root-state uncertainty, Owner identity conflict, replayed Authority or Permission decision, audit-anchor mismatch, replica disagreement. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Identity and Continuity Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Authority and Delegation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Verification Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- State and Persistence Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Recovery Coordinator: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-01-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-01-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-01-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-01-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-01-TST-005 | Critical invariant | No protected effect occurs without current identity, authority, policy, evidence, verification, and exact-change checks. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-01-TST-006 | Failure containment | Inject root-state uncertainty, Owner identity conflict, replayed Authority or Permission decision, audit-anchor mismatch, replica disagreement. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-01-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-01-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-01-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-01-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 1-7, 24-29, 38-43, 47-51, 56, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 01, 03, 05, 20, 29, 35. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Constitution, Constitutional Invariant, Constitutional Kernel, Owner Authorization Ceremony. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 9 logical interfaces, 10 conformance tests, 6 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-02 - Identity and Continuity Service Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-02
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Maintain durable governed identity and continuity for HAL, humans, services, devices, nodes, and Presences.

## 3. Constitutional and architectural basis

- Book I: Decisions 1-7, 24-29, 35, 40, 47-50, and 58.
- Book II: Chapters 04, 28.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Principal, Identity Record, Identifier, Continuity, Authentication.

## 4. Responsibilities

- Own and protect mutation of Identity Records.
- Own and protect mutation of identifier namespaces.
- Own and protect mutation of continuity lineage.
- Own and protect mutation of identity lifecycle.
- Own and protect mutation of authentication-assurance bindings.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Owner authority.
- MUST NOT own or independently redefine delegations.
- MUST NOT own or independently redefine trust scores.
- MUST NOT own or independently redefine credentials or secret material.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Identity Records, identifier namespaces, continuity lineage, identity lifecycle, authentication-assurance bindings | Only CMP-02 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Owner authority, delegations, trust scores, credentials or secret material | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-02-IF-01 | Command | Create Identity | Command `Create Identity` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-02-IF-02 | Command | Bind Identifier | Command `Bind Identifier` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-02-IF-03 | Command | Suspend Identity | Command `Suspend Identity` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-02-IF-04 | Command | Reconcile Continuity | Command `Reconcile Continuity` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-02-IF-05 | Query | Resolve Identity | Query `Resolve Identity` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-02-IF-06 | Query | Get Continuity Lineage | Query `Get Continuity Lineage` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-02-IF-07 | Query | Get Authentication Context | Query `Get Authentication Context` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-02-IF-08 | Event | Identity Created | Event `Identity Created` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-02-IF-09 | Event | Identity Suspended | Event `Identity Suspended` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-02-IF-10 | Event | Continuity Reconciled | Event `Continuity Reconciled` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Create Identity, Bind Identifier, Suspend Identity, Reconcile Continuity. Queries: Resolve Identity, Get Continuity Lineage, Get Authentication Context. Events: Identity Created, Identity Suspended, Continuity Reconciled.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Proposed > Active > Suspended > Retired; continuity: Unverified > Verified > Disputed**.

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

Material failure modes: duplicate HAL identity, identifier collision, lineage break, stale authentication binding, identity-source disagreement. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Constitutional Kernel: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Temporal Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Authority and Delegation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-02-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-02-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-02-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-02-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-02-TST-005 | Critical invariant | One constitutional HAL identity persists across all Presences, runtimes, models, services, and recovery events. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-02-TST-006 | Failure containment | Inject duplicate HAL identity, identifier collision, lineage break, stale authentication binding, identity-source disagreement. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-02-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-02-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-02-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-02-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 1-7, 24-29, 35, 40, 47-50, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 04, 28. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Principal, Identity Record, Identifier, Continuity, Authentication. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 5 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-03 - Authority and Delegation Service Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-03
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Own bounded authority, delegation, revocation, and policy-decision records without inferring authority from identity, trust, credentials, or capability.

## 3. Constitutional and architectural basis

- Book I: Decisions 1-7, 24-29, 35, 40, 47-50, and 58.
- Book II: Chapters 05.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Permission, Delegation, Policy Decision Record.

## 4. Responsibilities

- Own and protect mutation of Authority Grants.
- Own and protect mutation of Delegation Records.
- Own and protect mutation of revocations.
- Own and protect mutation of Policy Decision Records.
- Own and protect mutation of authority-context envelopes.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine authoritative Identity state.
- MUST NOT own or independently redefine trust assessment.
- MUST NOT own or independently redefine capability implementation.
- MUST NOT own or independently redefine constitutional root authority.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Authority Grants, Delegation Records, revocations, Policy Decision Records, authority-context envelopes | Only CMP-03 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | authoritative Identity state, trust assessment, capability implementation, constitutional root authority | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-03-IF-01 | Command | Grant Delegation | Command `Grant Delegation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-03-IF-02 | Command | Revoke Delegation | Command `Revoke Delegation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-03-IF-03 | Command | Evaluate Permission | Command `Evaluate Permission` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-03-IF-04 | Command | Expire Delegation | Command `Expire Delegation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-03-IF-05 | Query | Get Effective Authority | Query `Get Effective Authority` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-03-IF-06 | Query | Explain Policy Decision | Query `Explain Policy Decision` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-03-IF-07 | Query | List Active Delegations | Query `List Active Delegations` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-03-IF-08 | Event | Delegation Activated | Event `Delegation Activated` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-03-IF-09 | Event | Delegation Revoked | Event `Delegation Revoked` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-03-IF-10 | Event | Permission Decided | Event `Permission Decided` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Grant Delegation, Revoke Delegation, Evaluate Permission, Expire Delegation. Queries: Get Effective Authority, Explain Policy Decision, List Active Delegations. Events: Delegation Activated, Delegation Revoked, Permission Decided.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Draft > Active > Suspended > Revoked or Expired**.

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

Material failure modes: delegation cycle, scope escalation, stale revocation, policy-version mismatch, authority-context loss. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Constitutional Kernel: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Identity and Continuity Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Trust Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Temporal Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-03-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-03-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-03-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-03-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-03-TST-005 | Critical invariant | Every delegation is attributable, scoped, conditional, expiring, revocable, and bounded by the delegator's current authority. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-03-TST-006 | Failure containment | Inject delegation cycle, scope escalation, stale revocation, policy-version mismatch, authority-context loss. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-03-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-03-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-03-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-03-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 1-7, 24-29, 35, 40, 47-50, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 05. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Permission, Delegation, Policy Decision Record. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 5 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-04 - Intent Service Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-04
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Capture attributable intent and maintain traceability from Intent through Goals, Objectives, Plans, Tasks, and outcome criteria.

## 3. Constitutional and architectural basis

- Book I: Decisions 8-23, 30-37, 40-43, 47-50, and 58.
- Book II: Chapters 06.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Intent, Goal, Objective, Plan, Task.

## 4. Responsibilities

- Own and protect mutation of Intent Records.
- Own and protect mutation of Goal and Objective hierarchy.
- Own and protect mutation of intent version lineage.
- Own and protect mutation of acceptance and outcome criteria.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine plan execution.
- MUST NOT own or independently redefine resource placement.
- MUST NOT own or independently redefine judgment.
- MUST NOT own or independently redefine action Permission decision.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Intent Records, Goal and Objective hierarchy, intent version lineage, acceptance and outcome criteria | Only CMP-04 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | plan execution, resource placement, judgment, action Permission decision | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-04-IF-01 | Command | Register Intent | Command `Register Intent` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-04-IF-02 | Command | Revise Intent | Command `Revise Intent` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-04-IF-03 | Command | Decompose Goal | Command `Decompose Goal` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-04-IF-04 | Command | Retire Intent | Command `Retire Intent` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-04-IF-05 | Query | Get Intent Graph | Query `Get Intent Graph` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-04-IF-06 | Query | Trace Objective | Query `Trace Objective` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-04-IF-07 | Query | List Outcome Criteria | Query `List Outcome Criteria` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-04-IF-08 | Event | Intent Registered | Event `Intent Registered` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-04-IF-09 | Event | Intent Revised | Event `Intent Revised` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-04-IF-10 | Event | Objective Retired | Event `Objective Retired` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Register Intent, Revise Intent, Decompose Goal, Retire Intent. Queries: Get Intent Graph, Trace Objective, List Outcome Criteria. Events: Intent Registered, Intent Revised, Objective Retired.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Proposed > Clarifying > Accepted > Active > Satisfied, Abandoned, or Superseded**.

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

Material failure modes: ambiguous principal, goal drift, orphan objective, conflicting intent version, untraceable task. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Identity and Continuity Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Authority and Delegation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Cognitive Orchestrator: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Outcome and Success Evaluation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-04-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-04-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-04-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-04-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-04-TST-005 | Critical invariant | Execution artifacts remain attributable to an authorized Intent and cannot silently broaden its scope. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-04-TST-006 | Failure containment | Inject ambiguous principal, goal drift, orphan objective, conflicting intent version, untraceable task. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-04-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-04-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-04-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-04-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

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

Primary component basis: Chapters 06. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Intent, Goal, Objective, Plan, Task. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

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

# CMP-06 - Attention Manager Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-06
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Admit, prioritize, place, and preempt bounded work under declared resource, urgency, fairness, and constitutional constraints.

## 3. Constitutional and architectural basis

- Book I: Decisions 8-23, 30-37, 40-43, 47-50, and 58.
- Book II: Chapters 08.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Attention Object, Resource, Reservation.

## 4. Responsibilities

- Own and protect mutation of Attention Objects.
- Own and protect mutation of work-admission decisions.
- Own and protect mutation of priority and preemption records.
- Own and protect mutation of placement leases.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Intent.
- MUST NOT own or independently redefine Judgment.
- MUST NOT own or independently redefine resource inventory.
- MUST NOT own or independently redefine action permission.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Attention Objects, work-admission decisions, priority and preemption records, placement leases | Only CMP-06 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Intent, Judgment, resource inventory, action permission | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-06-IF-01 | Command | Submit Attention Request | Command `Submit Attention Request` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-06-IF-02 | Command | Admit Work | Command `Admit Work` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-06-IF-03 | Command | Preempt Work | Command `Preempt Work` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-06-IF-04 | Command | Release Placement | Command `Release Placement` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-06-IF-05 | Query | Get Queue State | Query `Get Queue State` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-06-IF-06 | Query | Explain Priority | Query `Explain Priority` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-06-IF-07 | Query | Get Placement | Query `Get Placement` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-06-IF-08 | Event | Work Admitted | Event `Work Admitted` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-06-IF-09 | Event | Work Preempted | Event `Work Preempted` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-06-IF-10 | Event | Placement Released | Event `Placement Released` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Submit Attention Request, Admit Work, Preempt Work, Release Placement. Queries: Get Queue State, Explain Priority, Get Placement. Events: Work Admitted, Work Preempted, Placement Released.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Requested > Admitted > Running > Preempted, Completed, or Rejected**.

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

Material failure modes: priority inversion, starvation, resource overcommit, stale lease, unbounded queue. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Cognitive Orchestrator: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Runtime Supervisor: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Temporal Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Authority and Delegation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-06-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-06-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-06-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-06-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-06-TST-005 | Critical invariant | The Attention Manager is the sole authority for work admission and placement; urgency cannot bypass constitutional or authority controls. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-06-TST-006 | Failure containment | Inject priority inversion, starvation, resource overcommit, stale lease, unbounded queue. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-06-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-06-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-06-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-06-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

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

Primary component basis: Chapters 08. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Attention Object, Resource, Reservation. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-07 - Judgment Service Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-07
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Produce evidence-linked Decision Objects that expose alternatives, uncertainty, values, authority context, rationale, and review conditions.

## 3. Constitutional and architectural basis

- Book I: Decisions 8-23, 30-37, 40-43, 47-50, and 58.
- Book II: Chapters 09.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Judgment, Decision Object, Uncertainty.

## 4. Responsibilities

- Own and protect mutation of Decision Objects.
- Own and protect mutation of alternative evaluations.
- Own and protect mutation of uncertainty assessments.
- Own and protect mutation of review conditions.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Intent.
- MUST NOT own or independently redefine authority grants.
- MUST NOT own or independently redefine evidence custody.
- MUST NOT own or independently redefine action execution.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Decision Objects, alternative evaluations, uncertainty assessments, review conditions | Only CMP-07 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Intent, authority grants, evidence custody, action execution | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-07-IF-01 | Command | Request Judgment | Command `Request Judgment` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-07-IF-02 | Command | Record Decision | Command `Record Decision` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-07-IF-03 | Command | Reconsider Decision | Command `Reconsider Decision` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-07-IF-04 | Command | Withdraw Decision | Command `Withdraw Decision` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-07-IF-05 | Query | Get Decision Object | Query `Get Decision Object` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-07-IF-06 | Query | Explain Rationale | Query `Explain Rationale` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-07-IF-07 | Query | List Alternatives | Query `List Alternatives` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-07-IF-08 | Event | Decision Recorded | Event `Decision Recorded` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-07-IF-09 | Event | Decision Reconsidered | Event `Decision Reconsidered` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-07-IF-10 | Event | Decision Withdrawn | Event `Decision Withdrawn` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Request Judgment, Record Decision, Reconsider Decision, Withdraw Decision. Queries: Get Decision Object, Explain Rationale, List Alternatives. Events: Decision Recorded, Decision Reconsidered, Decision Withdrawn.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Proposed > Deliberating > Decided > Under Review > Superseded or Closed**.

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

Material failure modes: missing alternative, hidden uncertainty, authority laundering, stale evidence, irreproducible rationale. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

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
- Knowledge Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Authority and Delegation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Outcome and Success Evaluation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-07-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-07-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-07-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-07-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-07-TST-005 | Critical invariant | A Decision Object records judgment but does not itself create Permission, Authority, or a real-world effect. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-07-TST-006 | Failure containment | Inject missing alternative, hidden uncertainty, authority laundering, stale evidence, irreproducible rationale. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-07-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-07-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-07-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-07-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

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

Primary component basis: Chapters 09. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Judgment, Decision Object, Uncertainty. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-08 - Knowledge Service Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-08
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Maintain provenance-aware knowledge representations and retrieval while distinguishing claims, evidence, confidence, validity, and authoritative state.

## 3. Constitutional and architectural basis

- Book I: Decisions 8-23, 30-37, 40-43, 47-50, and 58.
- Book II: Chapters 10.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Knowledge, Knowledge Graph, Claim, Provenance.

## 4. Responsibilities

- Own and protect mutation of Knowledge Graph.
- Own and protect mutation of knowledge assertions.
- Own and protect mutation of provenance links.
- Own and protect mutation of validity and confidence metadata.
- Own and protect mutation of retrieval indexes.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Evidence Objects.
- MUST NOT own or independently redefine Experience Ledger.
- MUST NOT own or independently redefine Memory Graph.
- MUST NOT own or independently redefine authoritative operational state.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Knowledge Graph, knowledge assertions, provenance links, validity and confidence metadata, retrieval indexes | Only CMP-08 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Evidence Objects, Experience Ledger, Memory Graph, authoritative operational state | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-08-IF-01 | Command | Admit Knowledge Assertion | Command `Admit Knowledge Assertion` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-08-IF-02 | Command | Revise Knowledge Link | Command `Revise Knowledge Link` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-08-IF-03 | Command | Invalidate Assertion | Command `Invalidate Assertion` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-08-IF-04 | Command | Rebuild Index | Command `Rebuild Index` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-08-IF-05 | Query | Query Knowledge | Query `Query Knowledge` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-08-IF-06 | Query | Trace Provenance | Query `Trace Provenance` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-08-IF-07 | Query | Get Validity Context | Query `Get Validity Context` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-08-IF-08 | Event | Knowledge Admitted | Event `Knowledge Admitted` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-08-IF-09 | Event | Assertion Invalidated | Event `Assertion Invalidated` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-08-IF-10 | Event | Index Rebuilt | Event `Index Rebuilt` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Admit Knowledge Assertion, Revise Knowledge Link, Invalidate Assertion, Rebuild Index. Queries: Query Knowledge, Trace Provenance, Get Validity Context. Events: Knowledge Admitted, Assertion Invalidated, Index Rebuilt.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Candidate > Admitted > Qualified > Challenged > Superseded or Retired**.

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

Material failure modes: provenance loss, stale assertion, index-authority confusion, causation inference, unbounded disclosure. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Memory System: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Learning and Wisdom System: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Temporal Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-08-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-08-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-08-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-08-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-08-TST-005 | Critical invariant | No assertion becomes Knowledge without provenance, domain, time, confidence, and challenge semantics. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-08-TST-006 | Failure containment | Inject provenance loss, stale assertion, index-authority confusion, causation inference, unbounded disclosure. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-08-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-08-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-08-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-08-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

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

Primary component basis: Chapters 10. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Knowledge, Knowledge Graph, Claim, Provenance. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 5 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-09 - Memory System Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-09
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Maintain contextual associations and governed retrieval of retained experience without confusing memory, knowledge, cache, or authoritative state.

## 3. Constitutional and architectural basis

- Book I: Decisions 8-23, 30-37, 40-43, 47-50, and 58.
- Book II: Chapters 12.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Memory, Memory Graph, Experience.

## 4. Responsibilities

- Own and protect mutation of Memory Graph.
- Own and protect mutation of memory associations.
- Own and protect mutation of retention and access metadata.
- Own and protect mutation of Conversation Objects where assigned.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Knowledge Graph.
- MUST NOT own or independently redefine Evidence Objects.
- MUST NOT own or independently redefine Experience Ledger custody.
- MUST NOT own or independently redefine identity or authority.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Memory Graph, memory associations, retention and access metadata, Conversation Objects where assigned | Only CMP-09 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Knowledge Graph, Evidence Objects, Experience Ledger custody, identity or authority | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-09-IF-01 | Command | Store Memory Association | Command `Store Memory Association` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-09-IF-02 | Command | Revise Association | Command `Revise Association` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-09-IF-03 | Command | Forget Memory | Command `Forget Memory` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-09-IF-04 | Command | Reconcile Conversation | Command `Reconcile Conversation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-09-IF-05 | Query | Recall Memory | Query `Recall Memory` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-09-IF-06 | Query | Trace Memory Source | Query `Trace Memory Source` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-09-IF-07 | Query | Get Retention Status | Query `Get Retention Status` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-09-IF-08 | Event | Memory Associated | Event `Memory Associated` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-09-IF-09 | Event | Memory Forgotten | Event `Memory Forgotten` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-09-IF-10 | Event | Conversation Reconciled | Event `Conversation Reconciled` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Store Memory Association, Revise Association, Forget Memory, Reconcile Conversation. Queries: Recall Memory, Trace Memory Source, Get Retention Status. Events: Memory Associated, Memory Forgotten, Conversation Reconciled.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Candidate > Active > Restricted > Expired or Deleted**.

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

Material failure modes: cross-principal leakage, retention violation, false association, conversation split, deletion failure. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Experience Service functions within Learning and Wisdom System: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Knowledge Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Privacy and Data Governance Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Temporal Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-09-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-09-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-09-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-09-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-09-TST-005 | Critical invariant | Memory is provenance-linked, purpose-bound, and never silently promoted to knowledge or evidence. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-09-TST-006 | Failure containment | Inject cross-principal leakage, retention violation, false association, conversation split, deletion failure. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-09-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-09-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-09-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-09-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

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

Primary component basis: Chapters 12. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Memory, Memory Graph, Experience. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-10 - Learning and Wisdom System Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-10
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Convert governed experience into reproducible patterns and bounded wisdom while preventing silent self-modification of protected behavior.

## 3. Constitutional and architectural basis

- Book I: Decisions 8-23, 30-37, 40-43, 47-50, and 58.
- Book II: Chapters 11, 12.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Learning, Pattern, Wisdom, Experience Ledger.

## 4. Responsibilities

- Own and protect mutation of Experience Ledger.
- Own and protect mutation of Pattern Records.
- Own and protect mutation of Wisdom Records.
- Own and protect mutation of learning-run records.
- Own and protect mutation of promotion decisions.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine constitutional meaning.
- MUST NOT own or independently redefine authority.
- MUST NOT own or independently redefine deployment into a declared live-effect environment and approved Reality Boundary stage.
- MUST NOT own or independently redefine Knowledge Graph.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Experience Ledger, Pattern Records, Wisdom Records, learning-run records, promotion decisions | Only CMP-10 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | constitutional meaning, authority, deployment into a declared live-effect environment and approved Reality Boundary stage, Knowledge Graph | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-10-IF-01 | Command | Record Experience | Command `Record Experience` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-10-IF-02 | Command | Propose Pattern | Command `Propose Pattern` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-10-IF-03 | Command | Promote Pattern | Command `Promote Pattern` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-10-IF-04 | Command | Retire Wisdom | Command `Retire Wisdom` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-10-IF-05 | Query | Get Experience | Query `Get Experience` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-10-IF-06 | Query | Explain Pattern | Query `Explain Pattern` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-10-IF-07 | Query | Get Wisdom Limits | Query `Get Wisdom Limits` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-10-IF-08 | Event | Experience Recorded | Event `Experience Recorded` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-10-IF-09 | Event | Pattern Promoted | Event `Pattern Promoted` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-10-IF-10 | Event | Wisdom Retired | Event `Wisdom Retired` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Record Experience, Propose Pattern, Promote Pattern, Retire Wisdom. Queries: Get Experience, Explain Pattern, Get Wisdom Limits. Events: Experience Recorded, Pattern Promoted, Wisdom Retired.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Experience: Recorded > Validated > Retained; Pattern: Candidate > Qualified > Approved > Retired**.

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

Material failure modes: training-data poisoning, pattern overgeneralization, silent promotion, feedback loop, unbounded self-modification. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Knowledge Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Memory System: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Judgment Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Verification Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-10-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-10-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-10-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-10-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-10-TST-005 | Critical invariant | Learning cannot silently modify constitutional meaning, authority, protected behavior, or authoritative live-effect state. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-10-TST-006 | Failure containment | Inject training-data poisoning, pattern overgeneralization, silent promotion, feedback loop, unbounded self-modification. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-10-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-10-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-10-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-10-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

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

Primary component basis: Chapters 11, 12. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Learning, Pattern, Wisdom, Experience Ledger. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 5 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-11 - Temporal Service Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-11
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Provide bounded time, ordering, freshness, lease, deadline, temporal commitment, and causality services without treating wall-clock time as authoritative distributed ordering state.

## 3. Constitutional and architectural basis

- Book I: Decisions 8-23, 30-37, 40-43, 47-50, and 58.
- Book II: Chapters 13.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Logical Time, Wall-Clock Time, Causation Identifier.

## 4. Responsibilities

- Own and protect mutation of Time Facts.
- Own and protect mutation of Logical clocks.
- Own and protect mutation of lease records.
- Own and protect mutation of time-source assessments.
- Own and protect mutation of Temporal Commitment Records.
- Own and protect mutation of scheduling constraints.
- Own and protect mutation of deadline and freshness policies.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine work placement.
- MUST NOT own or independently redefine event ownership.
- MUST NOT own or independently redefine business scheduling authority.
- MUST NOT own or independently redefine authority decisions.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Time Facts, Logical clocks, lease records, time-source assessments, Temporal Commitment Records, scheduling constraints, deadline and freshness policies | Only CMP-11 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | work placement, event ownership, business scheduling authority, authority decisions | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-11-IF-01 | Command | Issue Lease | Command `Issue Lease` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-11-IF-02 | Command | Renew Lease | Command `Renew Lease` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-11-IF-03 | Command | Record Logical Time | Command `Record Logical Time` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-11-IF-04 | Command | Declare Time Source Degraded | Command `Declare Time Source Degraded` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-11-IF-05 | Query | Get Current Time Context | Query `Get Current Time Context` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-11-IF-06 | Query | Compare Causality | Query `Compare Causality` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-11-IF-07 | Query | Get Freshness | Query `Get Freshness` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-11-IF-08 | Event | Lease Issued | Event `Lease Issued` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-11-IF-09 | Event | Lease Expired | Event `Lease Expired` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-11-IF-10 | Event | Time Source Degraded | Event `Time Source Degraded` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Issue Lease, Renew Lease, Record Logical Time, Declare Time Source Degraded. Queries: Get Current Time Context, Compare Causality, Get Freshness. Events: Lease Issued, Lease Expired, Time Source Degraded.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Healthy > Degraded > Unsynchronized > Recovering > Healthy**.

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

Material failure modes: clock regression, split-brain lease, expired authority use, causality ambiguity, time-source compromise. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Event and Messaging Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Runtime Supervisor: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Authority and Delegation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-11-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-11-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-11-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-11-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-11-TST-005 | Critical invariant | Ordering and freshness claims always state scope, mechanism, uncertainty, and source health. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-11-TST-006 | Failure containment | Inject clock regression, split-brain lease, expired authority use, causality ambiguity, time-source compromise. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-11-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-11-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-11-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-11-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

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

Primary component basis: Chapters 13. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Logical Time, Wall-Clock Time, Causation Identifier. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 7 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-12 - Presence and Embodiment Layer Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-12
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Own bounded Presence, embodiment, audience context, and handoff state while preserving HAL's single identity.

## 3. Constitutional and architectural basis

- Book I: Decisions 1-7, 24-29, 35, 40, 47-50, and 58.
- Book II: Chapters 14, 31.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Presence, Embodiment.

## 4. Responsibilities

- Own and protect mutation of Presence Objects.
- Own and protect mutation of Embodiment Bindings.
- Own and protect mutation of Audience Context.
- Own and protect mutation of Presence Handoffs.
- Own and protect mutation of modality availability.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine HAL identity.
- MUST NOT own or independently redefine Interaction Sessions.
- MUST NOT own or independently redefine credentials.
- MUST NOT own or independently redefine device ownership.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Presence Objects, Embodiment Bindings, Audience Context, Presence Handoffs, modality availability | Only CMP-12 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | HAL identity, Interaction Sessions, credentials, device ownership | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-12-IF-01 | Command | Create Presence | Command `Create Presence` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-12-IF-02 | Command | Bind Embodiment | Command `Bind Embodiment` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-12-IF-03 | Command | Handoff Presence | Command `Handoff Presence` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-12-IF-04 | Command | End Presence | Command `End Presence` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-12-IF-05 | Query | Get Presence Context | Query `Get Presence Context` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-12-IF-06 | Query | List Embodiments | Query `List Embodiments` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-12-IF-07 | Query | Get Audience Context | Query `Get Audience Context` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-12-IF-08 | Event | Presence Created | Event `Presence Created` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-12-IF-09 | Event | Embodiment Bound | Event `Embodiment Bound` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-12-IF-10 | Event | Presence Handed Off | Event `Presence Handed Off` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Create Presence, Bind Embodiment, Handoff Presence, End Presence. Queries: Get Presence Context, List Embodiments, Get Audience Context. Events: Presence Created, Embodiment Bound, Presence Handed Off.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Proposed > Active > Handoff > Suspended > Ended**.

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

Material failure modes: presence duplication, audience confusion, sensor spoofing, handoff loss, context leakage. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Identity and Continuity Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Human Interaction Layer: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Privacy and Data Governance Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Runtime Supervisor: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-12-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-12-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-12-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-12-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-12-TST-005 | Critical invariant | Every Presence is a bounded manifestation of one HAL identity and cannot independently hold Owner authority. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-12-TST-006 | Failure containment | Inject presence duplication, audience confusion, sensor spoofing, handoff loss, context leakage. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-12-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-12-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-12-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-12-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 1-7, 24-29, 35, 40, 47-50, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 14, 31. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Presence, Embodiment. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 5 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-13 - Capability Registry Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-13
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Own implementation-independent Capability Contracts, provider registrations, adapters, health qualifications, and selection constraints.

## 3. Constitutional and architectural basis

- Book I: Decisions 35, 38-43, 47-51, and 58.
- Book II: Chapters 15.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Capability, Capability Contract, Provider, Adapter.

## 4. Responsibilities

- Own and protect mutation of Capability Contracts.
- Own and protect mutation of Provider Records.
- Own and protect mutation of Adapter Records.
- Own and protect mutation of qualification and health metadata.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine permission.
- MUST NOT own or independently redefine authority.
- MUST NOT own or independently redefine work placement.
- MUST NOT own or independently redefine provider execution state.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Capability Contracts, Provider Records, Adapter Records, qualification and health metadata | Only CMP-13 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | permission, authority, work placement, provider execution state | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-13-IF-01 | Command | Register Capability | Command `Register Capability` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-13-IF-02 | Command | Register Provider | Command `Register Provider` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-13-IF-03 | Command | Qualify Provider | Command `Qualify Provider` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-13-IF-04 | Command | Retire Adapter | Command `Retire Adapter` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-13-IF-05 | Query | Discover Capability | Query `Discover Capability` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-13-IF-06 | Query | Get Provider Qualification | Query `Get Provider Qualification` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-13-IF-07 | Query | Resolve Adapter | Query `Resolve Adapter` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-13-IF-08 | Event | Capability Registered | Event `Capability Registered` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-13-IF-09 | Event | Provider Qualified | Event `Provider Qualified` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-13-IF-10 | Event | Provider Quarantined | Event `Provider Quarantined` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Register Capability, Register Provider, Qualify Provider, Retire Adapter. Queries: Discover Capability, Get Provider Qualification, Resolve Adapter. Events: Capability Registered, Provider Qualified, Provider Quarantined.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Proposed > Qualified > Active > Degraded > Retired**.

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

Material failure modes: semantic mismatch, provider substitution, stale qualification, adapter bypass, capability shadowing. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Verification Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Trust Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Runtime Supervisor: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Authority and Delegation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-13-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-13-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-13-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-13-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-13-TST-005 | Critical invariant | Capability availability, provider health, or credential possession never implies Permission or Authority. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-13-TST-006 | Failure containment | Inject semantic mismatch, provider substitution, stale qualification, adapter bypass, capability shadowing. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-13-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-13-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-13-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-13-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 35, 38-43, 47-51, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 15. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Capability, Capability Contract, Provider, Adapter. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-14 - Action and Transaction Engine Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-14
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Coordinate authorized Actions and Transactions across prepare, commit, observation, rollback, and compensation boundaries.

## 3. Constitutional and architectural basis

- Book I: Decisions 35, 38-43, 47-51, and 58.
- Book II: Chapters 16.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Action, Transaction, Commit Barrier, Rollback, Compensation, Reality Boundary.

## 4. Responsibilities

- Own and protect mutation of Action Records.
- Own and protect mutation of Transaction Records.
- Own and protect mutation of Commit Barrier decisions.
- Own and protect mutation of idempotency records.
- Own and protect mutation of rollback and compensation state.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine intent.
- MUST NOT own or independently redefine authority grants.
- MUST NOT own or independently redefine external-domain policy.
- MUST NOT own or independently redefine outcome evaluation.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Action Records, Transaction Records, Commit Barrier decisions, idempotency records, rollback and compensation state | Only CMP-14 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | intent, authority grants, external-domain policy, outcome evaluation | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-14-IF-01 | Command | Propose Action | Command `Propose Action` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-14-IF-02 | Command | Prepare Transaction | Command `Prepare Transaction` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-14-IF-03 | Command | Commit Transaction | Command `Commit Transaction` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-14-IF-04 | Command | Rollback Transaction | Command `Rollback Transaction` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-14-IF-05 | Command | Begin Compensation | Command `Begin Compensation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-14-IF-06 | Query | Get Transaction State | Query `Get Transaction State` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-14-IF-07 | Query | Explain Commit Decision | Query `Explain Commit Decision` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-14-IF-08 | Query | Get Idempotency Result | Query `Get Idempotency Result` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-14-IF-09 | Event | Action Authorized | Event `Action Authorized` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-14-IF-10 | Event | Transaction Committed | Event `Transaction Committed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-14-IF-11 | Event | Transaction Rolled Back | Event `Transaction Rolled Back` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-14-IF-12 | Event | Compensation Started | Event `Compensation Started` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Propose Action, Prepare Transaction, Commit Transaction, Rollback Transaction, Begin Compensation. Queries: Get Transaction State, Explain Commit Decision, Get Idempotency Result. Events: Action Authorized, Transaction Committed, Transaction Rolled Back, Compensation Started.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Proposed > Authorized > Prepared > Committed > Completed; failure to Rolled Back or Compensating**.

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

Material failure modes: duplicate effect, partial commit, stale Permission decision, rollback lie, uncontained external effect. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Authority and Delegation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Verification Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Constitutional Kernel: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Constitutional Firewall: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Outcome and Success Evaluation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-14-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-14-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-14-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-14-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-14-TST-005 | Critical invariant | No real effect crosses the Commit Barrier without current authority, verification, exact state, evidence, and Reality Boundary approval. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-14-TST-006 | Failure containment | Inject duplicate effect, partial commit, stale Permission decision, rollback lie, uncontained external effect. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-14-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-14-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-14-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-14-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 35, 38-43, 47-51, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 16. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Action, Transaction, Commit Barrier, Rollback, Compensation, Reality Boundary. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 12 logical interfaces, 10 conformance tests, 5 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-15 - Verification Service Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-15
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Evaluate explicit claims against declared criteria, methods, environments, evidence, uncertainty, and reproducibility requirements.

## 3. Constitutional and architectural basis

- Book I: Decisions 24-29, 35, 40-43, 47-50, and 58.
- Book II: Chapters 17, 35.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Verification Plan, Assurance Case, Certification, Confidence.

## 4. Responsibilities

- Own and protect mutation of Verification Plans.
- Own and protect mutation of Verification Results.
- Own and protect mutation of claim-evaluation state.
- Own and protect mutation of fidelity and confidence records.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Evidence Objects.
- MUST NOT own or independently redefine Certification decisions.
- MUST NOT own or independently redefine simulation runtime.
- MUST NOT own or independently redefine release approval.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Verification Plans, Verification Results, claim-evaluation state, fidelity and confidence records | Only CMP-15 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Evidence Objects, Certification decisions, simulation runtime, release approval | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-15-IF-01 | Command | Start Verification | Command `Start Verification` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-15-IF-02 | Command | Record Verification Result | Command `Record Verification Result` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-15-IF-03 | Command | Invalidate Result | Command `Invalidate Result` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-15-IF-04 | Command | Request Reproduction | Command `Request Reproduction` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-15-IF-05 | Query | Get Verification Result | Query `Get Verification Result` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-15-IF-06 | Query | Explain Confidence | Query `Explain Confidence` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-15-IF-07 | Query | List Defeaters | Query `List Defeaters` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-15-IF-08 | Event | Verification Started | Event `Verification Started` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-15-IF-09 | Event | Claim Verified | Event `Claim Verified` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-15-IF-10 | Event | Claim Falsified | Event `Claim Falsified` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-15-IF-11 | Event | Result Invalidated | Event `Result Invalidated` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Start Verification, Record Verification Result, Invalidate Result, Request Reproduction. Queries: Get Verification Result, Explain Confidence, List Defeaters. Events: Verification Started, Claim Verified, Claim Falsified, Result Invalidated.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Proposed > Running > Verified, Falsified, Inconclusive, or Invalidated**.

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

Material failure modes: criterion drift, environment mismatch, evidence substitution, irreproducible result, confidence inflation. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Simulation and Digital Twin Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Judgment Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Temporal Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-15-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-15-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-15-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-15-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-15-TST-005 | Critical invariant | Verification is scoped and evidence-based; it never converts an unsupported claim into authority or certification. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-15-TST-006 | Failure containment | Inject criterion drift, environment mismatch, evidence substitution, irreproducible result, confidence inflation. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-15-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-15-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-15-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-15-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 24-29, 35, 40-43, 47-50, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 17, 35. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Verification Plan, Assurance Case, Certification, Confidence. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 11 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-16 - Simulation and Digital Twin Platform Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-16
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Run isolated simulation, Digital Twin, counterfactual, failure-injection, and shadow workloads without ungoverned real effects.

## 3. Constitutional and architectural basis

- Book I: Decisions 8-23, 30-37, 40-43, 47-50, and 58.
- Book II: Chapters 17.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Simulation, Digital Twin, Shadow Execution, Canary.

## 4. Responsibilities

- Own and protect mutation of Simulation Runs.
- Own and protect mutation of Digital Twin State.
- Own and protect mutation of fidelity models.
- Own and protect mutation of scenario and isolation records.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine authoritative live-effect state.
- MUST NOT own or independently redefine Certification.
- MUST NOT own or independently redefine real-world commit.
- MUST NOT own or independently redefine Evidence admission.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Simulation Runs, Digital Twin State, fidelity models, scenario and isolation records | Only CMP-16 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | authoritative live-effect state, Certification, real-world commit, Evidence admission | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-16-IF-01 | Command | Create Simulation | Command `Create Simulation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-16-IF-02 | Command | Load Twin State | Command `Load Twin State` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-16-IF-03 | Command | Run Scenario | Command `Run Scenario` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-16-IF-04 | Command | Inject Failure | Command `Inject Failure` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-16-IF-05 | Command | Terminate Simulation | Command `Terminate Simulation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-16-IF-06 | Query | Get Scenario Result | Query `Get Scenario Result` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-16-IF-07 | Query | Get Fidelity Score | Query `Get Fidelity Score` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-16-IF-08 | Query | Get Isolation Status | Query `Get Isolation Status` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-16-IF-09 | Event | Simulation Started | Event `Simulation Started` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-16-IF-10 | Event | Scenario Completed | Event `Scenario Completed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-16-IF-11 | Event | Isolation Breach Detected | Event `Isolation Breach Detected` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Create Simulation, Load Twin State, Run Scenario, Inject Failure, Terminate Simulation. Queries: Get Scenario Result, Get Fidelity Score, Get Isolation Status. Events: Simulation Started, Scenario Completed, Isolation Breach Detected.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Draft > Ready > Running > Completed, Failed, or Quarantined**.

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

Material failure modes: reality leakage, stale twin, fidelity misstatement, unsafe fixture, resource escape. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Verification Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- State and Persistence Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Capability Registry: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Runtime Supervisor: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-16-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-16-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-16-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-16-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-16-TST-005 | Critical invariant | Simulation, Digital Twin, and Shadow Execution remain technically incapable of ungoverned real effects. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-16-TST-006 | Failure containment | Inject reality leakage, stale twin, fidelity misstatement, unsafe fixture, resource escape. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-16-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-16-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-16-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-16-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

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

Primary component basis: Chapters 17. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Simulation, Digital Twin, Shadow Execution, Canary. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 11 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-17 - Trust Service Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-17
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Produce multidimensional, evidence-based, scoped, expiring Trust Assessments without granting authority or permission.

## 3. Constitutional and architectural basis

- Book I: Decisions 24-29, 35, 40-43, 47-50, and 58.
- Book II: Chapters 18.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Trust, Trust Domain, Trust Boundary.

## 4. Responsibilities

- Own and protect mutation of Trust Assessments.
- Own and protect mutation of trust dimensions.
- Own and protect mutation of confidence and expiry metadata.
- Own and protect mutation of trust-policy inputs.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Evidence Objects.
- MUST NOT own or independently redefine Authority.
- MUST NOT own or independently redefine Permission.
- MUST NOT own or independently redefine Treaties.
- MUST NOT own or independently redefine authoritative Identity state.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Trust Assessments, trust dimensions, confidence and expiry metadata, trust-policy inputs | Only CMP-17 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Evidence Objects, Authority, Permission, Treaties, authoritative Identity state | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-17-IF-01 | Command | Request Trust Assessment | Command `Request Trust Assessment` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-17-IF-02 | Command | Update Trust Dimension | Command `Update Trust Dimension` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-17-IF-03 | Command | Invalidate Assessment | Command `Invalidate Assessment` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-17-IF-04 | Query | Get Trust Assessment | Query `Get Trust Assessment` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-17-IF-05 | Query | Explain Trust Basis | Query `Explain Trust Basis` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-17-IF-06 | Query | List Expiring Assessments | Query `List Expiring Assessments` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-17-IF-07 | Event | Trust Assessed | Event `Trust Assessed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-17-IF-08 | Event | Trust Degraded | Event `Trust Degraded` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-17-IF-09 | Event | Assessment Expired | Event `Assessment Expired` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Request Trust Assessment, Update Trust Dimension, Invalidate Assessment. Queries: Get Trust Assessment, Explain Trust Basis, List Expiring Assessments. Events: Trust Assessed, Trust Degraded, Assessment Expired.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Requested > Assessed > Degraded > Expired or Revoked**.

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

Material failure modes: trust-as-authority, stale evidence, dimension collapse, reputation contagion, expiry bypass. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Identity and Continuity Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Temporal Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Authority and Delegation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-17-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-17-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-17-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-17-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-17-TST-005 | Critical invariant | Trust may inform policy but never grants Authority, Permission, identity, or Treaty scope. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-17-TST-006 | Failure containment | Inject trust-as-authority, stale evidence, dimension collapse, reputation contagion, expiry bypass. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-17-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-17-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-17-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-17-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 24-29, 35, 40-43, 47-50, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 18. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Trust, Trust Domain, Trust Boundary. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 9 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-18 - Evidence Service Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-18
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Admit and govern immutable Evidence Objects with provenance, custody, signatures, verification state, confidence, domain, and expiry.

## 3. Constitutional and architectural basis

- Book I: Decisions 24-29, 35, 40-43, 47-50, and 58.
- Book II: Chapters 18, 25.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Evidence Candidate, Evidence Service, Chain of Custody, Audit Record.

## 4. Responsibilities

- Own and protect mutation of Evidence Objects.
- Own and protect mutation of custody chains.
- Own and protect mutation of admission decisions.
- Own and protect mutation of signature and verification state.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Audit Records.
- MUST NOT own or independently redefine telemetry.
- MUST NOT own or independently redefine claims.
- MUST NOT own or independently redefine Knowledge Graph.
- MUST NOT own or independently redefine Trust Assessments.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Evidence Objects, custody chains, admission decisions, signature and verification state | Only CMP-18 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Audit Records, telemetry, claims, Knowledge Graph, Trust Assessments | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-18-IF-01 | Command | Submit Evidence Candidate | Command `Submit Evidence Candidate` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-18-IF-02 | Command | Admit Evidence Object | Command `Admit Evidence Object` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-18-IF-03 | Command | Challenge Evidence | Command `Challenge Evidence` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-18-IF-04 | Command | Record Supersession | Command `Record Supersession` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-18-IF-05 | Query | Get Evidence Object | Query `Get Evidence Object` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-18-IF-06 | Query | Trace Custody | Query `Trace Custody` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-18-IF-07 | Query | Verify Evidence Integrity | Query `Verify Evidence Integrity` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-18-IF-08 | Event | Evidence Admitted | Event `Evidence Admitted` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-18-IF-09 | Event | Evidence Challenged | Event `Evidence Challenged` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-18-IF-10 | Event | Evidence Superseded | Event `Evidence Superseded` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Submit Evidence Candidate, Admit Evidence Object, Challenge Evidence, Record Supersession. Queries: Get Evidence Object, Trace Custody, Verify Evidence Integrity. Events: Evidence Admitted, Evidence Challenged, Evidence Superseded.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Candidate > Admitted > Challenged > Superseded or Expired**.

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

Material failure modes: custody break, provenance forgery, mutable evidence, signature failure, unauthorized disclosure. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Observability and Audit Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Identity and Continuity Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Temporal Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- State and Persistence Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-18-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-18-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-18-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-18-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-18-TST-005 | Critical invariant | An admitted Evidence Object is immutable; correction occurs only through linked later objects. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-18-TST-006 | Failure containment | Inject custody break, provenance forgery, mutable evidence, signature failure, unauthorized disclosure. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-18-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-18-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-18-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-18-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 24-29, 35, 40-43, 47-50, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 18, 25. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Evidence Candidate, Evidence Service, Chain of Custody, Audit Record. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-19 - Privacy and Data Governance Service Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-19
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Own data classification, purpose, authority, minimization, consent, retention, disclosure, deletion, and inference-risk policy state.

## 3. Constitutional and architectural basis

- Book I: Decisions 24-29, 35, 40-43, 47-50, and 58.
- Book II: Chapters 19.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Personal Data, Sensitive Data, Purpose Limitation, Data Minimization, Retention Class.

## 4. Responsibilities

- Own and protect mutation of Data Classification Records.
- Own and protect mutation of purpose bindings.
- Own and protect mutation of retention classes.
- Own and protect mutation of consent and authority records.
- Own and protect mutation of deletion obligations.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine source data contents.
- MUST NOT own or independently redefine authoritative Identity state.
- MUST NOT own or independently redefine Treaty lifecycle.
- MUST NOT own or independently redefine application business logic.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Data Classification Records, purpose bindings, retention classes, consent and authority records, deletion obligations | Only CMP-19 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | source data contents, authoritative Identity state, Treaty lifecycle, application business logic | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-19-IF-01 | Command | Classify Data | Command `Classify Data` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-19-IF-02 | Command | Authorize Purpose | Command `Authorize Purpose` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-19-IF-03 | Command | Set Retention | Command `Set Retention` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-19-IF-04 | Command | Order Deletion | Command `Order Deletion` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-19-IF-05 | Command | Restrict Disclosure | Command `Restrict Disclosure` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-19-IF-06 | Query | Get Data Policy | Query `Get Data Policy` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-19-IF-07 | Query | Evaluate Data Use | Query `Evaluate Data Use` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-19-IF-08 | Query | Get Deletion Status | Query `Get Deletion Status` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-19-IF-09 | Event | Data Classified | Event `Data Classified` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-19-IF-10 | Event | Purpose Authorized | Event `Purpose Authorized` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-19-IF-11 | Event | Deletion Completed | Event `Deletion Completed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-19-IF-12 | Event | Use Denied | Event `Use Denied` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Classify Data, Authorize Purpose, Set Retention, Order Deletion, Restrict Disclosure. Queries: Get Data Policy, Evaluate Data Use, Get Deletion Status. Events: Data Classified, Purpose Authorized, Deletion Completed, Use Denied.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Unclassified > Classified > Active > Restricted > Disposed**.

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

Material failure modes: purpose drift, overcollection, retention breach, inference leakage, deletion incompleteness. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Identity and Continuity Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Authority and Delegation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Constitutional Firewall: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- State and Persistence Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-19-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-19-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-19-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-19-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-19-TST-005 | Critical invariant | Data use is permitted only for declared authorized purpose with minimization, retention, disclosure, and disposal controls. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-19-TST-006 | Failure containment | Inject purpose drift, overcollection, retention breach, inference leakage, deletion incompleteness. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-19-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-19-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-19-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-19-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 24-29, 35, 40-43, 47-50, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 19. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Personal Data, Sensitive Data, Purpose Limitation, Data Minimization, Retention Class. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 12 logical interfaces, 10 conformance tests, 5 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-20 - Constitutional Firewall Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-20
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Enforce cross-domain identity, data, capability, authority, and evidence exchange against active signed Treaty decisions.

## 3. Constitutional and architectural basis

- Book I: Decisions 1-7, 24-29, 38-43, 47-51, 56, and 58.
- Book II: Chapters 20, 21.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Constitution, Constitutional Invariant, Constitutional Kernel, Owner Authorization Ceremony, Constitutional Firewall, External Trust Domain, Treaty.

## 4. Responsibilities

- Own and protect mutation of firewall decisions.
- Own and protect mutation of cross-domain session state.
- Own and protect mutation of Treaty enforcement cache.
- Own and protect mutation of exchange audit bindings.
- Own and protect mutation of cross-domain incident records.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Treaty proposals or approval.
- MUST NOT own or independently redefine native authority grants.
- MUST NOT own or independently redefine external authoritative Identity state.
- MUST NOT own or independently redefine payload source state.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | firewall decisions, cross-domain session state, Treaty enforcement cache, exchange audit bindings, cross-domain incident records | Only CMP-20 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Treaty proposals or approval, native authority grants, external authoritative Identity state, payload source state | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-20-IF-01 | Command | Open Domain Session | Command `Open Domain Session` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-20-IF-02 | Command | Authorize Exchange | Command `Authorize Exchange` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-20-IF-03 | Command | Terminate Exchange | Command `Terminate Exchange` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-20-IF-04 | Command | Quarantine Payload | Command `Quarantine Payload` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-20-IF-05 | Query | Get Firewall Decision | Query `Get Firewall Decision` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-20-IF-06 | Query | Get Active Treaty View | Query `Get Active Treaty View` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-20-IF-07 | Query | Explain Denial | Query `Explain Denial` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-20-IF-08 | Event | Exchange Allowed | Event `Exchange Allowed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-20-IF-09 | Event | Exchange Denied | Event `Exchange Denied` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-20-IF-10 | Event | Domain Session Terminated | Event `Domain Session Terminated` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Open Domain Session, Authorize Exchange, Terminate Exchange, Quarantine Payload. Queries: Get Firewall Decision, Get Active Treaty View, Explain Denial. Events: Exchange Allowed, Exchange Denied, Domain Session Terminated.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Closed > Negotiating > Active > Restricted > Closed**.

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

Material failure modes: Treaty mismatch, identity substitution, policy-cache staleness, exfiltration attempt, domain compromise. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Treaty Manager: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Trust Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Privacy and Data Governance Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Authority and Delegation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-20-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-20-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-20-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-20-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-20-TST-005 | Critical invariant | No external exchange bypasses the Constitutional Firewall, and a Treaty cannot authorize what Book I prohibits. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-20-TST-006 | Failure containment | Inject Treaty mismatch, identity substitution, policy-cache staleness, exfiltration attempt, domain compromise. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-20-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-20-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-20-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-20-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 1-7, 24-29, 38-43, 47-51, 56, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 20, 21. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Constitution, Constitutional Invariant, Constitutional Kernel, Owner Authorization Ceremony, Constitutional Firewall, External Trust Domain, Treaty. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 5 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-21 - Treaty Manager Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-21
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Own exact, scoped, time-bounded, revocable, auditable, explicitly Owner-authorized Treaty proposals, approvals, lifecycle, and termination.

## 3. Constitutional and architectural basis

- Book I: Decisions 1-7, 24-29, 38-43, 47-51, 56, and 58.
- Book II: Chapters 21.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Treaty, External Trust Domain, Owner Authorization Ceremony.

## 4. Responsibilities

- Own and protect mutation of Treaty Records.
- Own and protect mutation of proposal versions.
- Own and protect mutation of Owner Authorization Ceremony bindings.
- Own and protect mutation of activation, suspension, and revocation state.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine cross-domain enforcement.
- MUST NOT own or independently redefine Trust Assessments.
- MUST NOT own or independently redefine Owner identity.
- MUST NOT own or independently redefine ordinary delegation.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Treaty Records, proposal versions, Owner Authorization Ceremony bindings, activation, suspension, and revocation state | Only CMP-21 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | cross-domain enforcement, Trust Assessments, Owner identity, ordinary delegation | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-21-IF-01 | Command | Propose Treaty | Command `Propose Treaty` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-21-IF-02 | Command | Authorize Treaty | Command `Authorize Treaty` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-21-IF-03 | Command | Activate Treaty | Command `Activate Treaty` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-21-IF-04 | Command | Suspend Treaty | Command `Suspend Treaty` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-21-IF-05 | Command | Revoke Treaty | Command `Revoke Treaty` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-21-IF-06 | Query | Get Treaty | Query `Get Treaty` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-21-IF-07 | Query | Compare Treaty Version | Query `Compare Treaty Version` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-21-IF-08 | Query | List Active Treaties | Query `List Active Treaties` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-21-IF-09 | Event | Treaty Proposed | Event `Treaty Proposed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-21-IF-10 | Event | Treaty Activated | Event `Treaty Activated` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-21-IF-11 | Event | Treaty Suspended | Event `Treaty Suspended` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-21-IF-12 | Event | Treaty Revoked | Event `Treaty Revoked` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Propose Treaty, Authorize Treaty, Activate Treaty, Suspend Treaty, Revoke Treaty. Queries: Get Treaty, Compare Treaty Version, List Active Treaties. Events: Treaty Proposed, Treaty Activated, Treaty Suspended, Treaty Revoked.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Draft > Reviewed > Owner Authorized > Active > Suspended or Revoked or Expired**.

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

Material failure modes: Owner Authorization Ceremony mismatch, scope ambiguity, expired Treaty use, revocation lag, external-domain repudiation. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Constitutional Kernel: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Constitutional Firewall: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Trust Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Privacy and Data Governance Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-21-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-21-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-21-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-21-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-21-TST-005 | Critical invariant | Activation requires an Owner Authorization Ceremony bound to the exact Treaty; conversation or ordinary delegation is insufficient. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-21-TST-006 | Failure containment | Inject Owner Authorization Ceremony mismatch, scope ambiguity, expired Treaty use, revocation lag, external-domain repudiation. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-21-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-21-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-21-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-21-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 1-7, 24-29, 38-43, 47-51, 56, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 21. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Treaty, External Trust Domain, Owner Authorization Ceremony. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 12 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-22 - Event and Messaging Platform Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-22
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Provide durable commands, queries, events, envelopes, ordering scopes, deduplication, outbox, thread-delivery, and delivery semantics.

## 3. Constitutional and architectural basis

- Book I: Decisions 35, 38-43, 47-51, and 58.
- Book II: Chapters 22, 23.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Command, Query, Event, Message Envelope, Event Journal, Transactional Outbox.

## 4. Responsibilities

- Own and protect mutation of Event Journal.
- Own and protect mutation of message envelopes.
- Own and protect mutation of deduplication records.
- Own and protect mutation of delivery and subscription state.
- Own and protect mutation of Thread Delivery Records.
- Own and protect mutation of Transactional Outbox publication state.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine domain authoritative state.
- MUST NOT own or independently redefine command Permission evaluation.
- MUST NOT own or independently redefine global ordering.
- MUST NOT own or independently redefine business process ownership.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Event Journal, message envelopes, deduplication records, delivery and subscription state, Thread Delivery Records, Transactional Outbox publication state | Only CMP-22 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | domain authoritative state, command Permission evaluation, global ordering, business process ownership | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-22-IF-01 | Command | Publish Command | Command `Publish Command` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-22-IF-02 | Command | Append Event | Command `Append Event` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-22-IF-03 | Command | Acknowledge Delivery | Command `Acknowledge Delivery` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-22-IF-04 | Command | Quarantine Message | Command `Quarantine Message` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-22-IF-05 | Query | Query Event Stream | Query `Query Event Stream` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-22-IF-06 | Query | Get Delivery State | Query `Get Delivery State` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-22-IF-07 | Query | Trace Causation | Query `Trace Causation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-22-IF-08 | Event | Message Accepted | Event `Message Accepted` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-22-IF-09 | Event | Event Published | Event `Event Published` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-22-IF-10 | Event | Delivery Failed | Event `Delivery Failed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-22-IF-11 | Event | Message Quarantined | Event `Message Quarantined` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Publish Command, Append Event, Acknowledge Delivery, Quarantine Message. Queries: Query Event Stream, Get Delivery State, Trace Causation. Events: Message Accepted, Event Published, Delivery Failed, Message Quarantined.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Created > Accepted > Delivered > Acknowledged or Failed or Expired**.

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

Material failure modes: duplicate delivery, causation loss, poison message, ordering overclaim, outbox divergence. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Temporal Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- State and Persistence Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Identity and Continuity Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Authority and Delegation Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-22-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-22-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-22-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-22-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-22-TST-005 | Critical invariant | Commands request possible change, Events record completed facts, and Queries do not intentionally mutate authoritative state. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-22-TST-006 | Failure containment | Inject duplicate delivery, causation loss, poison message, ordering overclaim, outbox divergence. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-22-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-22-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-22-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-22-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 35, 38-43, 47-51, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 22, 23. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Command, Query, Event, Message Envelope, Event Journal, Transactional Outbox. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 11 logical interfaces, 10 conformance tests, 6 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-23 - State and Persistence Platform Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-23
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Provide durable authoritative storage primitives, concurrency controls, snapshots, projections, replicas, and migration facilities while preserving domain ownership.

## 3. Constitutional and architectural basis

- Book I: Decisions 35, 38-43, 47-51, and 58.
- Book II: Chapters 24.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, State, Authoritative State, Projection, Replica.

## 4. Responsibilities

- Own and protect mutation of storage engines.
- Own and protect mutation of commit logs.
- Own and protect mutation of snapshots.
- Own and protect mutation of replication metadata.
- Own and protect mutation of projection and migration state.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine semantic ownership of domain records.
- MUST NOT own or independently redefine policy decisions.
- MUST NOT own or independently redefine evidence meaning.
- MUST NOT own or independently redefine global transaction authority.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | storage engines, commit logs, snapshots, replication metadata, projection and migration state | Only CMP-23 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | semantic ownership of domain records, policy decisions, evidence meaning, global transaction authority | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-23-IF-01 | Command | Commit State Change | Command `Commit State Change` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-23-IF-02 | Command | Create Snapshot | Command `Create Snapshot` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-23-IF-03 | Command | Migrate Store | Command `Migrate Store` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-23-IF-04 | Command | Rebuild Projection | Command `Rebuild Projection` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-23-IF-05 | Query | Read State | Query `Read State` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-23-IF-06 | Query | Get Version | Query `Get Version` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-23-IF-07 | Query | Verify Replica | Query `Verify Replica` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-23-IF-08 | Query | Get Migration State | Query `Get Migration State` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-23-IF-09 | Event | State Committed | Event `State Committed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-23-IF-10 | Event | Snapshot Created | Event `Snapshot Created` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-23-IF-11 | Event | Migration Completed | Event `Migration Completed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-23-IF-12 | Event | Replica Diverged | Event `Replica Diverged` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Commit State Change, Create Snapshot, Migrate Store, Rebuild Projection. Queries: Read State, Get Version, Verify Replica, Get Migration State. Events: State Committed, Snapshot Created, Migration Completed, Replica Diverged.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Provisioning > Ready > Degraded > Recovering > Ready or Retired**.

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

Material failure modes: split brain, lost update, snapshot corruption, migration partial failure, projection treated as authority. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Event and Messaging Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Temporal Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Runtime Supervisor: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Recovery Coordinator: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-23-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-23-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-23-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-23-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-23-TST-005 | Critical invariant | Each authoritative state domain has exactly one mutation owner; replicas, caches, and projections remain explicitly derived. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-23-TST-006 | Failure containment | Inject split brain, lost update, snapshot corruption, migration partial failure, projection treated as authority. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-23-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-23-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-23-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-23-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 35, 38-43, 47-51, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 24. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, State, Authoritative State, Projection, Replica. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 12 logical interfaces, 10 conformance tests, 5 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-24 - Observability and Audit Platform Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-24
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Collect structured logs, metrics, traces, Audit Records, health evidence candidates, and tamper-evident audit chronology without owning Evidence Objects.

## 3. Constitutional and architectural basis

- Book I: Decisions 8-23, 30-37, 40-43, 47-50, and 58.
- Book II: Chapters 25.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Audit Record, Evidence Candidate.

## 4. Responsibilities

- Own and protect mutation of Audit Ledger.
- Own and protect mutation of Audit Records.
- Own and protect mutation of telemetry pipelines.
- Own and protect mutation of metric and trace stores.
- Own and protect mutation of alert state.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Evidence Objects.
- MUST NOT own or independently redefine domain authoritative state.
- MUST NOT own or independently redefine Trust Assessments.
- MUST NOT own or independently redefine incident command.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Audit Ledger, Audit Records, telemetry pipelines, metric and trace stores, alert state | Only CMP-24 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Evidence Objects, domain authoritative state, Trust Assessments, incident command | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-24-IF-01 | Command | Append Audit Record | Command `Append Audit Record` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-24-IF-02 | Command | Emit Telemetry | Command `Emit Telemetry` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-24-IF-03 | Command | Declare Alert | Command `Declare Alert` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-24-IF-04 | Command | Seal Audit Segment | Command `Seal Audit Segment` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-24-IF-05 | Query | Query Audit Ledger | Query `Query Audit Ledger` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-24-IF-06 | Query | Get Trace | Query `Get Trace` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-24-IF-07 | Query | Get Metric | Query `Get Metric` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-24-IF-08 | Query | Verify Audit Chain | Query `Verify Audit Chain` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-24-IF-09 | Event | Audit Record Appended | Event `Audit Record Appended` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-24-IF-10 | Event | Alert Raised | Event `Alert Raised` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-24-IF-11 | Event | Audit Chain Broken | Event `Audit Chain Broken` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Append Audit Record, Emit Telemetry, Declare Alert, Seal Audit Segment. Queries: Query Audit Ledger, Get Trace, Get Metric, Verify Audit Chain. Events: Audit Record Appended, Alert Raised, Audit Chain Broken.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Healthy > Degraded > Buffering > Recovering > Healthy**.

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

Material failure modes: sensitive logging, audit gap, trace spoofing, telemetry loss, ledger tampering. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Runtime Supervisor: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Temporal Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- State and Persistence Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-24-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-24-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-24-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-24-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-24-TST-005 | Critical invariant | Observability may produce Evidence Candidates, but only Evidence Service admits Evidence Objects or changes evidentiary meaning. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-24-TST-006 | Failure containment | Inject sensitive logging, audit gap, trace spoofing, telemetry loss, ledger tampering. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-24-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-24-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-24-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-24-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

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

Primary component basis: Chapters 25. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Audit Record, Evidence Candidate. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 11 logical interfaces, 10 conformance tests, 5 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-25 - Runtime Supervisor Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-25
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Control runtime mode, service lifecycle, readiness, health, resource limits, deployment instances, degraded modes, quarantine, and restart policy.

## 3. Constitutional and architectural basis

- Book I: Decisions 35, 38-43, 47-51, and 58.
- Book II: Chapters 02, 27, 29, 34.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Runtime, Service, Supervisor, Readiness, Health, Liveness.

## 4. Responsibilities

- Own and protect mutation of Current Runtime Mode.
- Own and protect mutation of Service Instance Records.
- Own and protect mutation of Desired and Observed State.
- Own and protect mutation of health and readiness state.
- Own and protect mutation of resource assignments.
- Own and protect mutation of quarantine state.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine application domain state.
- MUST NOT own or independently redefine work admission.
- MUST NOT own or independently redefine recovery authority.
- MUST NOT own or independently redefine release certification.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Current Runtime Mode, Service Instance Records, Desired and Observed State, health and readiness state, resource assignments, quarantine state | Only CMP-25 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | application domain state, work admission, recovery authority, release certification | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-25-IF-01 | Command | Start Service | Command `Start Service` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-25-IF-02 | Command | Stop Service | Command `Stop Service` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-25-IF-03 | Command | Restart Service | Command `Restart Service` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-25-IF-04 | Command | Enter Degraded Mode | Command `Enter Degraded Mode` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-25-IF-05 | Command | Quarantine Service | Command `Quarantine Service` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-25-IF-06 | Query | Get Service State | Query `Get Service State` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-25-IF-07 | Query | Get Health | Query `Get Health` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-25-IF-08 | Query | Get Resource Use | Query `Get Resource Use` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-25-IF-09 | Event | Service Ready | Event `Service Ready` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-25-IF-10 | Event | Service Degraded | Event `Service Degraded` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-25-IF-11 | Event | Service Quarantined | Event `Service Quarantined` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-25-IF-12 | Event | Service Stopped | Event `Service Stopped` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Start Service, Stop Service, Restart Service, Enter Degraded Mode, Quarantine Service. Queries: Get Service State, Get Health, Get Resource Use. Events: Service Ready, Service Degraded, Service Quarantined, Service Stopped.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Provisioned > Starting > Ready > Degraded > Quarantined > Recovering > Ready or Stopped**.

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

Material failure modes: restart loop, health false positive, resource exhaustion, quarantine bypass, configuration drift. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Attention Manager: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- State and Persistence Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Observability and Audit Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Recovery Coordinator: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-25-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-25-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-25-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-25-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-25-TST-005 | Critical invariant | Restart, locality, or process liveness never establishes readiness, correctness, authority, or recovery. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-25-TST-006 | Failure containment | Inject restart loop, health false positive, resource exhaustion, quarantine bypass, configuration drift. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-25-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-25-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-25-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-25-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 35, 38-43, 47-51, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 02, 27, 29, 34. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Runtime, Service, Supervisor, Readiness, Health, Liveness. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 12 logical interfaces, 10 conformance tests, 6 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-26 - Recovery Coordinator Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-26
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Coordinate containment, recovery plans, identity and state reconciliation, restoration, rollback, compensation, and continuity evidence.

## 3. Constitutional and architectural basis

- Book I: Decisions 35, 38-43, 47-51, and 58.
- Book II: Chapters 27, 28.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Recovery, Recovery Point Objective, Recovery Time Objective, Quarantine.

## 4. Responsibilities

- Own and protect mutation of Recovery Cases.
- Own and protect mutation of recovery plans.
- Own and protect mutation of reconciliation decisions.
- Own and protect mutation of restoration progress.
- Own and protect mutation of RPO and RTO evidence.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine domain authoritative state.
- MUST NOT own or independently redefine constitutional admission.
- MUST NOT own or independently redefine incident command.
- MUST NOT own or independently redefine backup storage.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Recovery Cases, recovery plans, reconciliation decisions, restoration progress, RPO and RTO evidence | Only CMP-26 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | domain authoritative state, constitutional admission, incident command, backup storage | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-26-IF-01 | Command | Open Recovery Case | Command `Open Recovery Case` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-26-IF-02 | Command | Authorize Recovery Step | Command `Authorize Recovery Step` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-26-IF-03 | Command | Restore State | Command `Restore State` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-26-IF-04 | Command | Reconcile Partition | Command `Reconcile Partition` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-26-IF-05 | Command | Close Recovery | Command `Close Recovery` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-26-IF-06 | Query | Get Recovery State | Query `Get Recovery State` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-26-IF-07 | Query | Get RPO/RTO Result | Query `Get RPO/RTO Result` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-26-IF-08 | Query | Explain Reconciliation | Query `Explain Reconciliation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-26-IF-09 | Event | Recovery Started | Event `Recovery Started` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-26-IF-10 | Event | State Restored | Event `State Restored` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-26-IF-11 | Event | Partition Reconciled | Event `Partition Reconciled` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-26-IF-12 | Event | Recovery Failed | Event `Recovery Failed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Open Recovery Case, Authorize Recovery Step, Restore State, Reconcile Partition, Close Recovery. Queries: Get Recovery State, Get RPO/RTO Result, Explain Reconciliation. Events: Recovery Started, State Restored, Partition Reconciled, Recovery Failed.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Detected > Contained > Planned > Restoring > Validating > Closed or Escalated**.

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

Material failure modes: wrong recovery point, identity discontinuity, partition conflict, evidence loss, premature service return. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Constitutional Kernel: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- State and Persistence Platform: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Runtime Supervisor: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Temporal Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-26-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-26-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-26-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-26-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-26-TST-005 | Critical invariant | Recovery restores verified identity, authority, state, evidence, and trust; restart alone is not Recovery. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-26-TST-006 | Failure containment | Inject wrong recovery point, identity discontinuity, partition conflict, evidence loss, premature service return. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-26-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-26-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-26-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-26-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 35, 38-43, 47-51, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 27, 28. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Recovery, Recovery Point Objective, Recovery Time Objective, Quarantine. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 12 logical interfaces, 10 conformance tests, 5 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-27 - Human Interaction Layer Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-27
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Own Interaction Sessions, modality coordination, accessibility, consent cues, clarification, confirmation, and human-visible action status.

## 3. Constitutional and architectural basis

- Book I: Decisions 1-7, 24-29, 35, 40, 47-50, and 58.
- Book II: Chapters 14, 31.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Presence, Principal.

## 4. Responsibilities

- Own and protect mutation of Interaction Sessions.
- Own and protect mutation of turn and modality state.
- Own and protect mutation of clarification and confirmation records.
- Own and protect mutation of accessibility preferences.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Presence Objects.
- MUST NOT own or independently redefine human Identity Records.
- MUST NOT own or independently redefine Intent.
- MUST NOT own or independently redefine Authority.
- MUST NOT own or independently redefine action execution.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Interaction Sessions, turn and modality state, clarification and confirmation records, accessibility preferences | Only CMP-27 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Presence Objects, human Identity Records, Intent, Authority, action execution | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-27-IF-01 | Command | Start Interaction | Command `Start Interaction` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-27-IF-02 | Command | Submit Human Input | Command `Submit Human Input` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-27-IF-03 | Command | Request Confirmation | Command `Request Confirmation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-27-IF-04 | Command | End Interaction | Command `End Interaction` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-27-IF-05 | Query | Get Session State | Query `Get Session State` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-27-IF-06 | Query | Get Accessible Representation | Query `Get Accessible Representation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-27-IF-07 | Query | Get Action Status | Query `Get Action Status` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-27-IF-08 | Event | Interaction Started | Event `Interaction Started` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-27-IF-09 | Event | Clarification Requested | Event `Clarification Requested` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-27-IF-10 | Event | Confirmation Recorded | Event `Confirmation Recorded` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-27-IF-11 | Event | Interaction Ended | Event `Interaction Ended` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Start Interaction, Submit Human Input, Request Confirmation, End Interaction. Queries: Get Session State, Get Accessible Representation, Get Action Status. Events: Interaction Started, Clarification Requested, Confirmation Recorded, Interaction Ended.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Proposed > Active > Awaiting Clarification or Confirmation > Completed or Abandoned**.

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

Material failure modes: identity confusion, dark pattern, inaccessible output, consent ambiguity, stale action status. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Presence and Embodiment Layer: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Intent Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Identity and Continuity Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Privacy and Data Governance Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-27-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-27-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-27-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-27-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-27-TST-005 | Critical invariant | Human-facing language, convenience, or conversational assent never substitutes for governed identity, Authority, or the exact protected Permission decision. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-27-TST-006 | Failure containment | Inject identity confusion, dark pattern, inaccessible output, consent ambiguity, stale action status. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-27-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-27-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-27-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-27-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 1-7, 24-29, 35, 40, 47-50, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 14, 31. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Presence, Principal. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 11 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-28 - Self-Model and Constitutional Mirror Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-28
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Maintain evidence-linked descriptions of HAL identity, capabilities, limitations, governing constraints, and conformance without becoming self-authorizing.

## 3. Constitutional and architectural basis

- Book I: Decisions 1-7, 24-29, 38-43, 47-51, 56, and 58.
- Book II: Chapters 30, 33.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Constitution, Constitutional Invariant, Constitutional Kernel, Owner Authorization Ceremony, Self Model, Constitutional Mirror, Semantic Change.

## 4. Responsibilities

- Own and protect mutation of Self-Model Records.
- Own and protect mutation of Constitutional Mirror versions.
- Own and protect mutation of capability and limitation projections.
- Own and protect mutation of conformance summaries.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Constitution.
- MUST NOT own or independently redefine constitutional authority.
- MUST NOT own or independently redefine Capability Contracts.
- MUST NOT own or independently redefine certification decisions.
- MUST NOT own or independently redefine source evidence.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Self-Model Records, Constitutional Mirror versions, capability and limitation projections, conformance summaries | Only CMP-28 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Constitution, constitutional authority, Capability Contracts, certification decisions, source evidence | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-28-IF-01 | Command | Refresh Self Model | Command `Refresh Self Model` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-28-IF-02 | Command | Publish Constitutional Mirror | Command `Publish Constitutional Mirror` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-28-IF-03 | Command | Invalidate Projection | Command `Invalidate Projection` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-28-IF-04 | Query | Get Self Description | Query `Get Self Description` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-28-IF-05 | Query | Trace Mirror Claim | Query `Trace Mirror Claim` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-28-IF-06 | Query | Get Declared Limitation | Query `Get Declared Limitation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-28-IF-07 | Event | Self Model Refreshed | Event `Self Model Refreshed` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-28-IF-08 | Event | Mirror Published | Event `Mirror Published` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-28-IF-09 | Event | Projection Invalidated | Event `Projection Invalidated` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Refresh Self Model, Publish Constitutional Mirror, Invalidate Projection. Queries: Get Self Description, Trace Mirror Claim, Get Declared Limitation. Events: Self Model Refreshed, Mirror Published, Projection Invalidated.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Draft > Verified > Published > Superseded or Withdrawn**.

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

Material failure modes: self-issued Authority or Permission, stale capability claim, missing limitation, evidence disconnect, identity fragmentation. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

## 15. Recovery behavior

Recovery MUST select an authorized recovery point, verify identity and lineage, reconcile authoritative versions and partitions, validate provenance and integrity, re-establish dependencies, replay or compensate truthfully, and prove post-recovery invariants before admitting mutation. Recovery MUST preserve required evidence and MUST NOT erase unresolved divergence.

## 16. Observability and required evidence

Required evidence includes command admission and denial, policy and authority decision references, state version and transition records, dependency health, security and privacy decisions, failure containment, recovery, migration, and conformance results. Logs, metrics, and traces MUST use structured schemas, correlation and causation, redaction, classification, retention, integrity, and clock-quality metadata.

## 17. Performance and resource requirements

The component owner MUST define evidence-backed latency, throughput, concurrency, queue, storage, freshness, and recovery objectives before qualification for the declared live-effect environment and approved Reality Boundary stage. Resource pressure MUST trigger bounded admission, backpressure, degradation, or rejection and MUST NOT bypass authority, evidence, privacy, audit, ordering, or state-integrity requirements.

## 18. Deployment model and topology flexibility

Book II permits implementation and topology flexibility only where identity, ownership, consistency, trust boundaries, failure containment, recovery, and observability invariants remain true. Replication improves resilience but does not create a second semantic owner or independent Authority. Every topology requires tested partition, upgrade, restore, and secret-rotation behavior.

## 19. Dependencies

- Constitutional Kernel: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Capability Registry: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Verification Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Runtime Supervisor: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-28-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-28-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-28-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-28-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-28-TST-005 | Critical invariant | Self-description is descriptive, evidence-linked, and non-self-authorizing; it cannot create identity, authority, or capability. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-28-TST-006 | Failure containment | Inject self-issued Authority or Permission, stale capability claim, missing limitation, evidence disconnect, identity fragmentation. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-28-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-28-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-28-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-28-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

## 22. Prohibited shortcuts

- Direct mutation of authoritative storage outside the component.
- Treating a cache, replica, projection, search index, log, or dashboard as authoritative.
- Inferring Authority from identity, role, trust, credentials, location, usefulness, or past approval.
- Failing open because a dependency, verification step, policy service, audit path, Authority source, or Permission decision is unavailable.
- Publishing an Event before authoritative commit or treating a command receipt as a completed fact.
- Using rollback language for an irreversible effect that requires Compensation.
- Embedding Book IX wire-level choices as independent architecture.

## 23. Traceability to Book I

Decisions 1-7, 24-29, 38-43, 47-51, 56, and 58. Requirement-level mappings are in `traceability/BOOK_I_TO_BOOK_IV_MATRIX.md`.

## 24. Traceability to Book II

Primary component basis: Chapters 30, 33. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Constitution, Constitutional Invariant, Constitutional Kernel, Owner Authorization Ceremony, Self Model, Constitutional Mirror, Semantic Change. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 9 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# CMP-29 - Outcome and Success Evaluation Service Component Specification

## 1. Document control

- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Component ID:** CMP-29
- **Authority:** Subordinate to Books I, II, and III; semantically aligned to Book X
- **Machine contracts:** Book IX responsibility

## 2. Purpose and scope

Evaluate Goal outcomes, side effects, constitutional costs, human impact, and declared success criteria using evidence and uncertainty.

## 3. Constitutional and architectural basis

- Book I: Decisions 8-23, 30-37, 40-43, 47-50, and 58.
- Book II: Chapters 32.
- Book III: Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls.
- Book X terms: HAL, Identity, Authority, Evidence Object, Verification, Conformance, Outcome Object, Success, Goal, Judgment.

## 4. Responsibilities

- Own and protect mutation of Outcome Objects.
- Own and protect mutation of success evaluations.
- Own and protect mutation of side-effect records.
- Own and protect mutation of review and learning referrals.
- Enforce versioned logical contracts and produce attributable decisions.
- Preserve identity, authority, provenance, evidence, and lifecycle continuity.
- Contain dependency and internal failure without silently weakening higher-order requirements.

## 5. Explicit non-responsibilities

- MUST NOT own or independently redefine Goals.
- MUST NOT own or independently redefine Actions.
- MUST NOT own or independently redefine Evidence Objects.
- MUST NOT own or independently redefine Judgment.
- MUST NOT own or independently redefine constitutional values.
- MUST NOT create Authority because it stores data, runs code, possesses credentials, or provides a useful capability.
- MUST NOT define Book IX wire formats, transports, generated client bindings, or protocol-specific error codes.

## 6. Authoritative and derived state

| State class | Records | Mutation rule |
|---|---|---|
| Authoritative | Outcome Objects, success evaluations, side-effect records, review and learning referrals | Only CMP-29 may mutate; every mutation is versioned and evidenced. |
| Explicitly non-owned | Goals, Actions, Evidence Objects, Judgment, constitutional values | Read only through owning-component interfaces; no shadow authority. |
| Derived | caches, indexes, projections, replicas, dashboards | Rebuildable, provenance-linked, non-authoritative, and never a bypass path. |

## 7. Logical interfaces

| ID | Kind | Logical operation | Required semantic outcome | Book IX handoff |
|---|---|---|---|---|
| CMP-29-IF-01 | Command | Open Outcome Evaluation | Command `Open Outcome Evaluation` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-29-IF-02 | Command | Record Outcome | Command `Record Outcome` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-29-IF-03 | Command | Evaluate Success | Command `Evaluate Success` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-29-IF-04 | Command | Refer Learning | Command `Refer Learning` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-29-IF-05 | Query | Get Outcome Object | Query `Get Outcome Object` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-29-IF-06 | Query | Explain Success Result | Query `Explain Success Result` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-29-IF-07 | Query | List Side Effects | Query `List Side Effects` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-29-IF-08 | Event | Outcome Recorded | Event `Outcome Recorded` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-29-IF-09 | Event | Success Evaluated | Event `Success Evaluated` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |
| CMP-29-IF-10 | Event | Review Required | Event `Review Required` MUST carry identity, authority context where applicable, schema version, correlation, causation, time/freshness, provenance, and explicit success or denial semantics. | Wire encoding, field schema, protocol, error code, timeout, retry, and compatibility contract |

## 8. Commands, queries, events, and schema requirements

Commands: Open Outcome Evaluation, Record Outcome, Evaluate Success, Refer Learning. Queries: Get Outcome Object, Explain Success Result, List Side Effects. Events: Outcome Recorded, Success Evaluated, Review Required.

Commands MAY request mutation but MUST NOT state that a fact has occurred before authoritative commit. Queries MUST NOT intentionally mutate authoritative state. Events MUST describe completed facts and MUST be immutable. All schemas MUST carry stable semantic identifiers, version, identity, authority context where applicable, correlation, causation, idempotency, time/freshness, provenance, classification, and explicit error/result semantics. Book IX will define their machine representation.

## 9. Lifecycle and state machines

Declared lifecycle: **Pending > Observing > Evaluated > Under Review > Closed or Reopened**.

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

Material failure modes: vanity metric, missing side effect, premature evaluation, evidence cherry-pick, goal substitution. Each MUST have detection criteria, bounded blast radius, declared degraded behavior, evidence preservation, notification, and an exit condition. Unsafe mutation MUST stop when required identity, authority, policy, state, evidence, time, or verification context is unavailable.

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
- Action and Transaction Engine: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Evidence Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Judgment Service: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.
- Learning and Wisdom System: consume only through its governed logical interface; validate version, identity, integrity, availability, and failure semantics.

## 20. Compatibility, versioning, and migration

Public and internal logical contracts, state schemas, policies, events, and evidence formats MUST be versioned. Backward and forward compatibility MUST be declared and tested. Migration requires an Architecture Decision Record when consequential, compatibility analysis, dual-read/write only when bounded and verified, recoverable checkpoints, signed artifacts, staged qualification, and post-migration reconciliation.

## 21. Conformance tests

| Test ID | Test | Method | Expected evidence |
|---|---|---|---|
| CMP-29-TST-001 | Sole-owner mutation | Attempt mutation through a consumer, replica, cache, operator path, and direct datastore route. | Every unauthorized path is denied and evidenced. |
| CMP-29-TST-002 | Authority denial | Invoke every command with absent, expired, revoked, mismatched, and over-broad authority context. | No state changes; denial reason and evidence are complete. |
| CMP-29-TST-003 | Valid lifecycle | Exercise every declared transition with valid guards and fresh versions. | One transition Evidence Object is admitted per transition identifier; duplicate attempts produce no additional state mutation or admitted Evidence Object. |
| CMP-29-TST-004 | Invalid lifecycle | Attempt skipped, stale, replayed, and terminal-state transitions. | Every invalid transition is rejected without partial mutation. |
| CMP-29-TST-005 | Critical invariant | Success is evaluated from declared outcomes and constitutional costs, never from activity, completion, or self-reported confidence alone. | Invariant holds under normal, concurrent, degraded, and recovery conditions. |
| CMP-29-TST-006 | Failure containment | Inject vanity metric, missing side effect, premature evaluation, evidence cherry-pick, goal substitution. | Unsafe work stops, evidence is preserved, and declared containment state is observable. |
| CMP-29-TST-007 | Recovery | Restore from a verified checkpoint, reconcile dependencies, and resume after validation. | Identity, state, authority, provenance, and evidence continuity are proven. |
| CMP-29-TST-008 | Contract compatibility | Run current and prior supported contract versions plus an unsupported version. | Supported behavior remains compatible; unsupported input fails explicitly. |
| CMP-29-TST-009 | Privacy and security | Inject secrets, personal data, malicious input, confused-deputy requests, and log-exfiltration probes. | Least privilege and data controls hold; prohibited data is absent from telemetry. |
| CMP-29-TST-010 | Topology independence | Repeat critical tests under permitted single-node, replicated, partitioned, and restored topologies. | Topology does not multiply authority or mutation ownership. |

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

Primary component basis: Chapters 32. Requirement-level mappings are in `traceability/BOOK_II_TO_BOOK_IV_MATRIX.md`.

## 25. Traceability to Book III

Chapters 1, 3, 4, 5, 6, 7, 8, and 9; Chapter 2 for repository, dependency, configuration, and secret controls. Requirement-level mappings are in `traceability/BOOK_III_TO_BOOK_IV_MATRIX.md`.

## 26. Book X semantic dependencies

HAL, Identity, Authority, Evidence Object, Verification, Conformance, Outcome Object, Success, Goal, Judgment. Canonical labels and distinctions apply; component-specific specialization MUST NOT redefine them.

## 27. Review findings

The final review covered 12 numbered requirements, 10 logical interfaces, 10 conformance tests, 4 authoritative state domains, and 5 material failure modes. All internally resolvable findings are closed.

## 28. Owner Review items

None. The specification refines Book II within existing constitutional and architecture authority and does not create a capability class, Treaty class, or new Owner-reserved decision.

## 29. Completion status

Complete and approved for Book IV v1.0 component certification.

# Appendix A - Authoritative State Ownership

The complete ownership matrix is maintained in `traceability/COMPONENT_OWNERSHIP_MATRIX.md`. Duplicate mutation ownership is prohibited.

# Appendix B - Interface Handoff to Book IX

The logical-interface catalog is maintained in `interfaces/LOGICAL_INTERFACE_CATALOG.md`. Its semantic requirements guide Book IX, but the catalog does not define transports, encodings, generated bindings, field schemas, protocol error codes, or retry wire behavior.

# Appendix C - Conformance Model

The conformance register maps every component requirement to verification evidence. Component certification is scoped, evidence-based, attributable, time-bounded, suspendable, and revocable.

# Collection certification

Book IV v1.0 contains 29 final component specifications, 348 numbered requirements, 305 logical interfaces, 136 authoritative state domains, and 290 conformance tests. No open Owner Review item remains.
