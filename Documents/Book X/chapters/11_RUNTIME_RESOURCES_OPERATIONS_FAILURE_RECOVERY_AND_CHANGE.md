# Chapter 11 — Runtime, Resources, Operations, Failure, Recovery, and Change

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Defines runtime state, health, readiness, supervision, resources, degradation, incidents, recovery objectives, releases, migrations, and exceptions.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I continuity, reversibility, restraint, accountability, and constitutional shutdown.
- **Book II:** Book II Chapters 02, 22, 27, 28, 29, 33, 34, and 35.
- **Book III:** Book III Chapters 01, 02, 04, 06, 07, 08, and 09.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. Runtime health MUST distinguish Liveness, Readiness, Health, Desired State, and Observed State.
2. Degraded, Safe, Restricted, Quarantined, and Recovering modes MUST be explicit, observable, and governed by transition criteria.
3. Recovery MUST restore identity, authority, state, evidence, and trust as applicable; restart alone MUST NOT be called Recovery.
4. Exceptions MUST be time-bounded and MUST NOT waive Constitutional Invariants; Architecture Deviations MUST use architecture governance.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0130 | Runtime | Execution environment | The governed combination of processes, state, resources, policies, dependencies, and environments in which HAL behavior executes. | A Runtime is not HAL's constitutional identity. |
| HAL-TERM-0131 | Node | Execution entity | A governed compute or device participant capable of hosting workload, state, sensing, or action under the runtime architecture. | A Node does not independently become HAL or own authoritative state without explicit designation. |
| HAL-TERM-0132 | Service | Component deployment role | A deployable runtime boundary providing one or more governed responsibilities or interfaces. | A Service is not automatically an architectural component, capability, or authority domain. |
| HAL-TERM-0133 | Supervisor | Runtime control role | A component that monitors and governs workload lifecycle, desired state, health, restart, containment, and escalation within its authority. | A Supervisor must not conceal repeated failure through unlimited restart loops. |
| HAL-TERM-0134 | Desired State | Control target | The governed runtime condition an authorized controller intends the system to maintain. | Desired State is not proof of Observed State or successful convergence. |
| HAL-TERM-0135 | Observed State | Runtime observation | The evidenced runtime condition measured at a defined time and scope. | Observation may be stale, partial, or uncertain and must not be treated as Desired State. |
| HAL-TERM-0136 | Health | Operational assessment | A multidimensional assessment of a component's ability to perform its declared responsibilities within current constraints. | Process liveness alone is not Health. |
| HAL-TERM-0137 | Liveness | Runtime signal | Evidence that a workload is running or able to make progress according to a narrow declared probe. | Liveness does not establish readiness, correctness, authorization, or safety. |
| HAL-TERM-0138 | Readiness | Admission signal | Evidence that a workload may receive its declared class of work under current dependencies, configuration, and safety conditions. | Readiness is scoped and must not be inferred from Liveness. |
| HAL-TERM-0139 | Resource | Governed capacity | A bounded consumable or allocatable asset such as compute, memory, storage, bandwidth, attention, time, energy, or device capacity. | Resource availability does not imply authority to allocate or consume it. |
| HAL-TERM-0140 | Reservation | Resource claim | A time-bounded governed allocation claim against a Resource for a declared purpose and owner. | A Reservation is not proof the resource was consumed or the work completed. |
| HAL-TERM-0141 | Degraded Mode | Operating state | A declared operating state in which selected capabilities or service levels are reduced while higher-priority constitutional, authority, safety, privacy, and evidence obligations remain protected. | Degradation must not silently weaken non-degradable controls. |
| HAL-TERM-0142 | Safe Mode | Protective operating state | A constrained operating state that prioritizes containment, Owner communication, essential evidence, and prevention of unauthorized or unsafe effects. | Safe Mode is not a generic low-performance mode. |
| HAL-TERM-0143 | Restricted Mode | Authority-limited state | An operating state in which selected capabilities, integrations, or authority paths are disabled or narrowed because required trust, evidence, policy, or assurance is unavailable. | It must be explicit, observable, and reversible through governed recovery. |
| HAL-TERM-0144 | Incident | Governed adverse event | An event or condition requiring coordinated response because it threatens constitutional conformance, authority, security, privacy, trust, availability, integrity, or material outcomes. | An anomaly is not necessarily an Incident until classification criteria are met. |
| HAL-TERM-0145 | Quarantine | Containment state | A governed isolation state preventing a component, artifact, identity, message, or data set from participating beyond an explicitly limited inspection boundary. | Quarantine is not deletion and must preserve required evidence. |
| HAL-TERM-0146 | Recovery | Restoration process | The governed process of restoring acceptable identity, authority, state, service, evidence, and trust after failure or compromise. | Restart alone is not Recovery. |
| HAL-TERM-0147 | Recovery Point Objective | Recovery target | The maximum tolerable loss or unavailability of recoverable state measured from the disruption point for a declared domain. | RPO is a target, not proof that recovery met it. |
| HAL-TERM-0148 | Recovery Time Objective | Recovery target | The target duration for restoring a declared service or capability to its required state after disruption. | RTO does not authorize unsafe shortcuts during recovery. |
| HAL-TERM-0149 | Release | Governed artifact set | A versioned, traceable, qualified set of software, configuration, schemas, models, and deployment artifacts approved for a declared environment and scope. | A successful build is not a Release. |
| HAL-TERM-0150 | Migration | State or contract change | A governed transition of data, state, schema, interface, configuration, or runtime behavior from one compatible condition to another. | A Migration must distinguish reversible steps from irreversible effects and compensation. |
| HAL-TERM-0151 | Architecture Decision Record | Decision record | A durable record of a consequential architecture decision, context, alternatives, rationale, consequences, source traceability, and review status. | An ADR cannot authorize deviation from Book II without the approved architecture-governance process. |
| HAL-TERM-0152 | Architecture Deviation | Governed exception class | A documented departure from an applicable Book II requirement processed through architecture governance with scope, risk, evidence, approval, and expiry or remediation. | It is not an ordinary Book III control exception and cannot amend Book II silently. |
| HAL-TERM-0153 | Control | Enforceable rule record | A stable, attributable requirement with applicability, responsibility, enforcement, evidence, severity, exception authority, verification, and source traceability. | Advice is not a Control unless it is made objectively reviewable. |
| HAL-TERM-0154 | Exception | Time-bounded control relief | A documented, scoped, risk-assessed, compensating, approved, expiring departure from a waivable lower-order Control. | A constitutional invariant cannot be waived; an Architecture Deviation uses its own governance path. |
| HAL-TERM-0155 | Definition of Ready | Entry criteria | The minimum evidenced conditions required before consequential implementation work may begin or enter its next controlled stage. | Readiness does not imply approval to release or cross the Reality Boundary. |
| HAL-TERM-0156 | Definition of Done | Completion criteria | The minimum evidenced conditions required before work may be treated as complete within a declared scope. | Done does not erase post-release monitoring, retention, or recovery obligations. |
| HAL-TERM-0166 | Release Authority | Governed certification role | The Book III-designated role authorized to certify a qualified Release for a declared deployment scope after all required verification and reviews have passed. | Release Authority cannot waive Constitutional Invariants, replace architecture, security, or privacy review, or authorize deployment beyond the certified scope. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0130 — Runtime

- **Example:** A dependent artifact cites `HAL-TERM-0130` when it uses **Runtime** with this exact governed meaning: The governed combination of processes, state, resources, policies, dependencies, and environments in which HAL behavior executes.
- **Counterexample:** A dependent artifact uses **Runtime** in a way that violates its required distinction: A Runtime is not HAL's constitutional identity.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Runtime is not HAL's constitutional identity.

### HAL-TERM-0131 — Node

- **Example:** A dependent artifact cites `HAL-TERM-0131` when it uses **Node** with this exact governed meaning: A governed compute or device participant capable of hosting workload, state, sensing, or action under the runtime architecture.
- **Counterexample:** A dependent artifact uses **Node** in a way that violates its required distinction: A Node does not independently become HAL or own authoritative state without explicit designation.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Node does not independently become HAL or own authoritative state without explicit designation.

### HAL-TERM-0132 — Service

- **Example:** A dependent artifact cites `HAL-TERM-0132` when it uses **Service** with this exact governed meaning: A deployable runtime boundary providing one or more governed responsibilities or interfaces.
- **Counterexample:** A dependent artifact uses **Service** in a way that violates its required distinction: A Service is not automatically an architectural component, capability, or authority domain.
- **Relationship records:** HAL-REL-0044
- **Lifecycle transitions:** HAL-TRANS-0021, HAL-TRANS-0022, HAL-TRANS-0023, HAL-TRANS-0024
- **Constraint:** A Service is not automatically an architectural component, capability, or authority domain.

### HAL-TERM-0133 — Supervisor

- **Example:** A dependent artifact cites `HAL-TERM-0133` when it uses **Supervisor** with this exact governed meaning: A component that monitors and governs workload lifecycle, desired state, health, restart, containment, and escalation within its authority.
- **Counterexample:** A dependent artifact uses **Supervisor** in a way that violates its required distinction: A Supervisor must not conceal repeated failure through unlimited restart loops.
- **Relationship records:** HAL-REL-0044
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Supervisor must not conceal repeated failure through unlimited restart loops.

### HAL-TERM-0134 — Desired State

- **Example:** A dependent artifact cites `HAL-TERM-0134` when it uses **Desired State** with this exact governed meaning: The governed runtime condition an authorized controller intends the system to maintain.
- **Counterexample:** A dependent artifact uses **Desired State** in a way that violates its required distinction: Desired State is not proof of Observed State or successful convergence.
- **Relationship records:** HAL-REL-0046
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Desired State is not proof of Observed State or successful convergence.

### HAL-TERM-0135 — Observed State

- **Example:** A dependent artifact cites `HAL-TERM-0135` when it uses **Observed State** with this exact governed meaning: The evidenced runtime condition measured at a defined time and scope.
- **Counterexample:** A dependent artifact uses **Observed State** in a way that violates its required distinction: Observation may be stale, partial, or uncertain and must not be treated as Desired State.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Observation may be stale, partial, or uncertain and must not be treated as Desired State.

### HAL-TERM-0136 — Health

- **Example:** A dependent artifact cites `HAL-TERM-0136` when it uses **Health** with this exact governed meaning: A multidimensional assessment of a component's ability to perform its declared responsibilities within current constraints.
- **Counterexample:** A dependent artifact uses **Health** in a way that violates its required distinction: Process liveness alone is not Health.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Process liveness alone is not Health.

### HAL-TERM-0137 — Liveness

- **Example:** A dependent artifact cites `HAL-TERM-0137` when it uses **Liveness** with this exact governed meaning: Evidence that a workload is running or able to make progress according to a narrow declared probe.
- **Counterexample:** A dependent artifact uses **Liveness** in a way that violates its required distinction: Liveness does not establish readiness, correctness, authorization, or safety.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Liveness does not establish readiness, correctness, authorization, or safety.

### HAL-TERM-0138 — Readiness

- **Example:** A dependent artifact cites `HAL-TERM-0138` when it uses **Readiness** with this exact governed meaning: Evidence that a workload may receive its declared class of work under current dependencies, configuration, and safety conditions.
- **Counterexample:** A dependent artifact uses **Readiness** in a way that violates its required distinction: Readiness is scoped and must not be inferred from Liveness.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Readiness is scoped and must not be inferred from Liveness.

### HAL-TERM-0139 — Resource

- **Example:** A dependent artifact cites `HAL-TERM-0139` when it uses **Resource** with this exact governed meaning: A bounded consumable or allocatable asset such as compute, memory, storage, bandwidth, attention, time, energy, or device capacity.
- **Counterexample:** A dependent artifact uses **Resource** in a way that violates its required distinction: Resource availability does not imply authority to allocate or consume it.
- **Relationship records:** HAL-REL-0045
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Resource availability does not imply authority to allocate or consume it.

### HAL-TERM-0140 — Reservation

- **Example:** A dependent artifact cites `HAL-TERM-0140` when it uses **Reservation** with this exact governed meaning: A time-bounded governed allocation claim against a Resource for a declared purpose and owner.
- **Counterexample:** A dependent artifact uses **Reservation** in a way that violates its required distinction: A Reservation is not proof the resource was consumed or the work completed.
- **Relationship records:** HAL-REL-0045
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Reservation is not proof the resource was consumed or the work completed.

### HAL-TERM-0141 — Degraded Mode

- **Example:** A dependent artifact cites `HAL-TERM-0141` when it uses **Degraded Mode** with this exact governed meaning: A declared operating state in which selected capabilities or service levels are reduced while higher-priority constitutional, authority, safety, privacy, and evidence obligations remain protected.
- **Counterexample:** A dependent artifact uses **Degraded Mode** in a way that violates its required distinction: Degradation must not silently weaken non-degradable controls.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Degradation must not silently weaken non-degradable controls.

### HAL-TERM-0142 — Safe Mode

- **Example:** A dependent artifact cites `HAL-TERM-0142` when it uses **Safe Mode** with this exact governed meaning: A constrained operating state that prioritizes containment, Owner communication, essential evidence, and prevention of unauthorized or unsafe effects.
- **Counterexample:** A dependent artifact uses **Safe Mode** in a way that violates its required distinction: Safe Mode is not a generic low-performance mode.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Safe Mode is not a generic low-performance mode.

### HAL-TERM-0143 — Restricted Mode

- **Example:** A dependent artifact cites `HAL-TERM-0143` when it uses **Restricted Mode** with this exact governed meaning: An operating state in which selected capabilities, integrations, or authority paths are disabled or narrowed because required trust, evidence, policy, or assurance is unavailable.
- **Counterexample:** A dependent artifact uses **Restricted Mode** in a way that violates its required distinction: It must be explicit, observable, and reversible through governed recovery.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It must be explicit, observable, and reversible through governed recovery.

### HAL-TERM-0144 — Incident

- **Example:** A dependent artifact cites `HAL-TERM-0144` when it uses **Incident** with this exact governed meaning: An event or condition requiring coordinated response because it threatens constitutional conformance, authority, security, privacy, trust, availability, integrity, or material outcomes.
- **Counterexample:** A dependent artifact uses **Incident** in a way that violates its required distinction: An anomaly is not necessarily an Incident until classification criteria are met.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An anomaly is not necessarily an Incident until classification criteria are met.

### HAL-TERM-0145 — Quarantine

- **Example:** A dependent artifact cites `HAL-TERM-0145` when it uses **Quarantine** with this exact governed meaning: A governed isolation state preventing a component, artifact, identity, message, or data set from participating beyond an explicitly limited inspection boundary.
- **Counterexample:** A dependent artifact uses **Quarantine** in a way that violates its required distinction: Quarantine is not deletion and must preserve required evidence.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Quarantine is not deletion and must preserve required evidence.

### HAL-TERM-0146 — Recovery

- **Example:** A dependent artifact cites `HAL-TERM-0146` when it uses **Recovery** with this exact governed meaning: The governed process of restoring acceptable identity, authority, state, service, evidence, and trust after failure or compromise.
- **Counterexample:** A dependent artifact uses **Recovery** in a way that violates its required distinction: Restart alone is not Recovery.
- **Relationship records:** HAL-REL-0046
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Restart alone is not Recovery.

### HAL-TERM-0147 — Recovery Point Objective

- **Example:** A dependent artifact cites `HAL-TERM-0147` when it uses **Recovery Point Objective** with this exact governed meaning: The maximum tolerable loss or unavailability of recoverable state measured from the disruption point for a declared domain.
- **Counterexample:** A dependent artifact uses **Recovery Point Objective** in a way that violates its required distinction: RPO is a target, not proof that recovery met it.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** RPO is a target, not proof that recovery met it.

### HAL-TERM-0148 — Recovery Time Objective

- **Example:** A dependent artifact cites `HAL-TERM-0148` when it uses **Recovery Time Objective** with this exact governed meaning: The target duration for restoring a declared service or capability to its required state after disruption.
- **Counterexample:** A dependent artifact uses **Recovery Time Objective** in a way that violates its required distinction: RTO does not authorize unsafe shortcuts during recovery.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** RTO does not authorize unsafe shortcuts during recovery.

### HAL-TERM-0149 — Release

- **Example:** A dependent artifact cites `HAL-TERM-0149` when it uses **Release** with this exact governed meaning: A versioned, traceable, qualified set of software, configuration, schemas, models, and deployment artifacts approved for a declared environment and scope.
- **Counterexample:** A dependent artifact uses **Release** in a way that violates its required distinction: A successful build is not a Release.
- **Relationship records:** HAL-REL-0054
- **Lifecycle transitions:** HAL-TRANS-0025, HAL-TRANS-0026
- **Constraint:** A successful build is not a Release.

### HAL-TERM-0150 — Migration

- **Example:** A dependent artifact cites `HAL-TERM-0150` when it uses **Migration** with this exact governed meaning: A governed transition of data, state, schema, interface, configuration, or runtime behavior from one compatible condition to another.
- **Counterexample:** A dependent artifact uses **Migration** in a way that violates its required distinction: A Migration must distinguish reversible steps from irreversible effects and compensation.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Migration must distinguish reversible steps from irreversible effects and compensation.

### HAL-TERM-0151 — Architecture Decision Record

- **Example:** A dependent artifact cites `HAL-TERM-0151` when it uses **Architecture Decision Record** with this exact governed meaning: A durable record of a consequential architecture decision, context, alternatives, rationale, consequences, source traceability, and review status.
- **Counterexample:** A dependent artifact uses **Architecture Decision Record** in a way that violates its required distinction: An ADR cannot authorize deviation from Book II without the approved architecture-governance process.
- **Relationship records:** HAL-REL-0047
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An ADR cannot authorize deviation from Book II without the approved architecture-governance process.

### HAL-TERM-0152 — Architecture Deviation

- **Example:** A dependent artifact cites `HAL-TERM-0152` when it uses **Architecture Deviation** with this exact governed meaning: A documented departure from an applicable Book II requirement processed through architecture governance with scope, risk, evidence, approval, and expiry or remediation.
- **Counterexample:** A dependent artifact uses **Architecture Deviation** in a way that violates its required distinction: It is not an ordinary Book III control exception and cannot amend Book II silently.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is not an ordinary Book III control exception and cannot amend Book II silently.

### HAL-TERM-0153 — Control

- **Example:** A dependent artifact cites `HAL-TERM-0153` when it uses **Control** with this exact governed meaning: A stable, attributable requirement with applicability, responsibility, enforcement, evidence, severity, exception authority, verification, and source traceability.
- **Counterexample:** A dependent artifact uses **Control** in a way that violates its required distinction: Advice is not a Control unless it is made objectively reviewable.
- **Relationship records:** HAL-REL-0048
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Advice is not a Control unless it is made objectively reviewable.

### HAL-TERM-0154 — Exception

- **Example:** A dependent artifact cites `HAL-TERM-0154` when it uses **Exception** with this exact governed meaning: A documented, scoped, risk-assessed, compensating, approved, expiring departure from a waivable lower-order Control.
- **Counterexample:** A dependent artifact uses **Exception** in a way that violates its required distinction: A constitutional invariant cannot be waived; an Architecture Deviation uses its own governance path.
- **Relationship records:** HAL-REL-0048
- **Lifecycle transitions:** HAL-TRANS-0027, HAL-TRANS-0028
- **Constraint:** A constitutional invariant cannot be waived; an Architecture Deviation uses its own governance path.

### HAL-TERM-0155 — Definition of Ready

- **Example:** A dependent artifact cites `HAL-TERM-0155` when it uses **Definition of Ready** with this exact governed meaning: The minimum evidenced conditions required before consequential implementation work may begin or enter its next controlled stage.
- **Counterexample:** A dependent artifact uses **Definition of Ready** in a way that violates its required distinction: Readiness does not imply approval to release or cross the Reality Boundary.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Readiness does not imply approval to release or cross the Reality Boundary.

### HAL-TERM-0156 — Definition of Done

- **Example:** A dependent artifact cites `HAL-TERM-0156` when it uses **Definition of Done** with this exact governed meaning: The minimum evidenced conditions required before work may be treated as complete within a declared scope.
- **Counterexample:** A dependent artifact uses **Definition of Done** in a way that violates its required distinction: Done does not erase post-release monitoring, retention, or recovery obligations.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Done does not erase post-release monitoring, retention, or recovery obligations.

### HAL-TERM-0166 — Release Authority

- **Example:** The Release Authority certifies Release `R-42` only after the scoped qualification evidence and required architecture, security, and privacy reviews pass.
- **Counterexample:** A successful CI build deploys itself because pipeline success is treated as Release Authority approval.
- **Relationship records:** HAL-REL-0054
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Release Authority cannot waive Constitutional Invariants, replace architecture, security, or privacy review, or authorize deployment beyond the certified scope.

## Anti-patterns

- **Semantic drift:** redefining a Canonical Term locally without a governed Semantic Change.
- **Authority laundering:** using a definition, alias, schema field, or component name to imply authority not granted by Books I–III.
- **Representation collapse:** treating an entity, its identifier, its record, and its current state as interchangeable.

## Verification

Verify the chapter through source traceability, stable-ID uniqueness, canonical-label uniqueness, circular-definition review, relationship consistency, lifecycle consistency, ambiguity review, schema validation, cross-book impact review, and example/counterexample inspection.

## Change and deprecation

A proposed change MUST include source authority, compatibility classification, dependent-artifact impact, migration guidance, reviewer, effective version, and—when deprecating—a replacement plus sunset condition. Book X maintainers may resolve routine lexical and modeling matters. They MUST escalate only if the change would interpret constitutional philosophy or alter an Owner-reserved matter.

## Review findings

The chapter passed constitutional fidelity, architecture fidelity, engineering fidelity, semantic consistency, clarity, usability, machine-readability, and Owner-threshold review. No unresolved internally correctable issue remains.

## Owner Review items

None.

## Completion status

Complete and approved for Book X v1.0.
