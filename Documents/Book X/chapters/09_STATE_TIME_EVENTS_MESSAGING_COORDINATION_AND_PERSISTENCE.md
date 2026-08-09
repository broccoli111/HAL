# Chapter 9 — State, Time, Events, Messaging, Coordination, and Persistence

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Defines authoritative state, projections, commands, queries, events, ordering, time, idempotency, messaging, and durable persistence.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I evidence, continuity, reversibility, accountability, and failure containment.
- **Book II:** Book II Chapters 13, 22, 23, 24, 25, 27, and 28.
- **Book III:** Book III Chapters 03, 04, 06, and 07.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. Commands MUST request possible change; Events MUST state completed facts; Queries MUST NOT intentionally mutate authoritative state.
2. Each authoritative state domain MUST identify one mutation owner; projections, caches, and replicas MUST remain explicitly derived.
3. Ordering claims MUST state scope and mechanism; Wall-Clock Time MUST NOT be used as sole proof of distributed causality.
4. Idempotency claims MUST state operation, key scope, retention horizon, result semantics, and external-effect limitations.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0101 | Command | Intent message | A request addressed to an authoritative owner to evaluate and, if allowed, perform a state-changing operation. | A Command is not evidence that the operation was authorized, committed, or completed. |
| HAL-TERM-0102 | Query | Read request | A request for information that must not intentionally mutate authoritative state or external reality. | Telemetry side effects must remain non-authoritative and must not turn a Query into a hidden Command. |
| HAL-TERM-0103 | Event | Completed-fact record | An immutable message stating that a defined fact or state transition has completed in its owning domain. | An Event is not a request, intention, or mutable current-state record. |
| HAL-TERM-0104 | Event Journal | Durable event store | The ordered durable record of Events for an owning domain, with identity, sequence, provenance, and integrity controls. | Global total order must not be inferred when only per-stream ordering exists. |
| HAL-TERM-0105 | Message Envelope | Transport record | The governed wrapper carrying message identity, schema version, source, destination, time, correlation, causation, authority context, classification, and integrity metadata. | The envelope does not change the semantic type of its payload. |
| HAL-TERM-0106 | Idempotency Key | Deduplication value | A scoped stable value allowing a receiver to recognize equivalent retry Attempts for one declared operation and result horizon. | It does not make non-idempotent external effects reversible or globally exactly-once. |
| HAL-TERM-0107 | Correlation Identifier | Trace reference | A value linking related work, messages, evidence, and telemetry across a bounded flow. | Correlation does not prove causation. |
| HAL-TERM-0108 | Causation Identifier | Causal reference | A value identifying the immediate initiating message, decision, or event for a derived operation. | It records declared lineage and must not be used as sole proof of real-world causality. |
| HAL-TERM-0109 | Authoritative State | Owned state | State whose mutation and truth are governed by the designated owning domain. | A cache, replica, projection, search index, or local aggregate is not authoritative unless explicitly designated. |
| HAL-TERM-0110 | Projection | Derived state | A read-optimized representation derived from authoritative records or Events for a declared purpose. | A Projection may be stale and must not silently accept authoritative mutations. |
| HAL-TERM-0111 | Cache | Disposable derived state | A replaceable performance-oriented copy whose loss does not destroy authoritative truth. | A Cache must not become the only copy of required state or evidence. |
| HAL-TERM-0112 | Replica | Replicated state | A governed copy maintained from an authoritative source under declared consistency, lag, and failover rules. | Replication alone does not transfer semantic ownership. |
| HAL-TERM-0113 | Transactional Outbox | Publication pattern | A durable pattern that records an authoritative state change and its pending Event publication in one local commit boundary. | It reduces dual-write failure but does not guarantee global exactly-once processing. |
| HAL-TERM-0114 | Logical Time | Ordering construct | A non-wall-clock ordering value used to represent causal or domain sequence relationships. | Logical Time must not be presented as real elapsed or calendar time. |
| HAL-TERM-0115 | Wall-Clock Time | Temporal observation | A timestamp from a declared clock source, precision, and synchronization context. | Wall-Clock Time alone must not establish distributed causal order. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0101 — Command

- **Example:** A dependent artifact cites `HAL-TERM-0101` when it uses **Command** with this exact governed meaning: A request addressed to an authoritative owner to evaluate and, if allowed, perform a state-changing operation.
- **Counterexample:** A dependent artifact uses **Command** in a way that violates its required distinction: A Command is not evidence that the operation was authorized, committed, or completed.
- **Relationship records:** HAL-REL-0037, HAL-REL-0040
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Command is not evidence that the operation was authorized, committed, or completed.

### HAL-TERM-0102 — Query

- **Example:** A dependent artifact cites `HAL-TERM-0102` when it uses **Query** with this exact governed meaning: A request for information that must not intentionally mutate authoritative state or external reality.
- **Counterexample:** A dependent artifact uses **Query** in a way that violates its required distinction: Telemetry side effects must remain non-authoritative and must not turn a Query into a hidden Command.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Telemetry side effects must remain non-authoritative and must not turn a Query into a hidden Command.

### HAL-TERM-0103 — Event

- **Example:** A dependent artifact cites `HAL-TERM-0103` when it uses **Event** with this exact governed meaning: An immutable message stating that a defined fact or state transition has completed in its owning domain.
- **Counterexample:** A dependent artifact uses **Event** in a way that violates its required distinction: An Event is not a request, intention, or mutable current-state record.
- **Relationship records:** HAL-REL-0037, HAL-REL-0039
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An Event is not a request, intention, or mutable current-state record.

### HAL-TERM-0104 — Event Journal

- **Example:** A dependent artifact cites `HAL-TERM-0104` when it uses **Event Journal** with this exact governed meaning: The ordered durable record of Events for an owning domain, with identity, sequence, provenance, and integrity controls.
- **Counterexample:** A dependent artifact uses **Event Journal** in a way that violates its required distinction: Global total order must not be inferred when only per-stream ordering exists.
- **Relationship records:** HAL-REL-0038
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Global total order must not be inferred when only per-stream ordering exists.

### HAL-TERM-0105 — Message Envelope

- **Example:** A dependent artifact cites `HAL-TERM-0105` when it uses **Message Envelope** with this exact governed meaning: The governed wrapper carrying message identity, schema version, source, destination, time, correlation, causation, authority context, classification, and integrity metadata.
- **Counterexample:** A dependent artifact uses **Message Envelope** in a way that violates its required distinction: The envelope does not change the semantic type of its payload.
- **Relationship records:** HAL-REL-0040
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** The envelope does not change the semantic type of its payload.

### HAL-TERM-0106 — Idempotency Key

- **Example:** A dependent artifact cites `HAL-TERM-0106` when it uses **Idempotency Key** with this exact governed meaning: A scoped stable value allowing a receiver to recognize equivalent retry Attempts for one declared operation and result horizon.
- **Counterexample:** A dependent artifact uses **Idempotency Key** in a way that violates its required distinction: It does not make non-idempotent external effects reversible or globally exactly-once.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It does not make non-idempotent external effects reversible or globally exactly-once.

### HAL-TERM-0107 — Correlation Identifier

- **Example:** A dependent artifact cites `HAL-TERM-0107` when it uses **Correlation Identifier** with this exact governed meaning: A value linking related work, messages, evidence, and telemetry across a bounded flow.
- **Counterexample:** A dependent artifact uses **Correlation Identifier** in a way that violates its required distinction: Correlation does not prove causation.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Correlation does not prove causation.

### HAL-TERM-0108 — Causation Identifier

- **Example:** A dependent artifact cites `HAL-TERM-0108` when it uses **Causation Identifier** with this exact governed meaning: A value identifying the immediate initiating message, decision, or event for a derived operation.
- **Counterexample:** A dependent artifact uses **Causation Identifier** in a way that violates its required distinction: It records declared lineage and must not be used as sole proof of real-world causality.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It records declared lineage and must not be used as sole proof of real-world causality.

### HAL-TERM-0109 — Authoritative State

- **Example:** A dependent artifact cites `HAL-TERM-0109` when it uses **Authoritative State** with this exact governed meaning: State whose mutation and truth are governed by the designated owning domain.
- **Counterexample:** A dependent artifact uses **Authoritative State** in a way that violates its required distinction: A cache, replica, projection, search index, or local aggregate is not authoritative unless explicitly designated.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A cache, replica, projection, search index, or local aggregate is not authoritative unless explicitly designated.

### HAL-TERM-0110 — Projection

- **Example:** A dependent artifact cites `HAL-TERM-0110` when it uses **Projection** with this exact governed meaning: A read-optimized representation derived from authoritative records or Events for a declared purpose.
- **Counterexample:** A dependent artifact uses **Projection** in a way that violates its required distinction: A Projection may be stale and must not silently accept authoritative mutations.
- **Relationship records:** HAL-REL-0038
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Projection may be stale and must not silently accept authoritative mutations.

### HAL-TERM-0111 — Cache

- **Example:** A dependent artifact cites `HAL-TERM-0111` when it uses **Cache** with this exact governed meaning: A replaceable performance-oriented copy whose loss does not destroy authoritative truth.
- **Counterexample:** A dependent artifact uses **Cache** in a way that violates its required distinction: A Cache must not become the only copy of required state or evidence.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Cache must not become the only copy of required state or evidence.

### HAL-TERM-0112 — Replica

- **Example:** A dependent artifact cites `HAL-TERM-0112` when it uses **Replica** with this exact governed meaning: A governed copy maintained from an authoritative source under declared consistency, lag, and failover rules.
- **Counterexample:** A dependent artifact uses **Replica** in a way that violates its required distinction: Replication alone does not transfer semantic ownership.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Replication alone does not transfer semantic ownership.

### HAL-TERM-0113 — Transactional Outbox

- **Example:** A dependent artifact cites `HAL-TERM-0113` when it uses **Transactional Outbox** with this exact governed meaning: A durable pattern that records an authoritative state change and its pending Event publication in one local commit boundary.
- **Counterexample:** A dependent artifact uses **Transactional Outbox** in a way that violates its required distinction: It reduces dual-write failure but does not guarantee global exactly-once processing.
- **Relationship records:** HAL-REL-0039
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It reduces dual-write failure but does not guarantee global exactly-once processing.

### HAL-TERM-0114 — Logical Time

- **Example:** A dependent artifact cites `HAL-TERM-0114` when it uses **Logical Time** with this exact governed meaning: A non-wall-clock ordering value used to represent causal or domain sequence relationships.
- **Counterexample:** A dependent artifact uses **Logical Time** in a way that violates its required distinction: Logical Time must not be presented as real elapsed or calendar time.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Logical Time must not be presented as real elapsed or calendar time.

### HAL-TERM-0115 — Wall-Clock Time

- **Example:** A dependent artifact cites `HAL-TERM-0115` when it uses **Wall-Clock Time** with this exact governed meaning: A timestamp from a declared clock source, precision, and synchronization context.
- **Counterexample:** A dependent artifact uses **Wall-Clock Time** in a way that violates its required distinction: Wall-Clock Time alone must not establish distributed causal order.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Wall-Clock Time alone must not establish distributed causal order.

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
