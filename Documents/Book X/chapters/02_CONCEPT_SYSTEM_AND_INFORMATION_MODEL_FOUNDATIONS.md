# Chapter 2 — Concept System and Information-Model Foundations

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Defines semantic types, entity and record distinctions, relationships, states, events, claims, constraints, and machine-readable representations.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I Articles II, IV, IX, and XI.
- **Book II:** Book II Chapters 01, 02, 22, 23, 24, 25, and 30.
- **Book III:** Book III Chapters 03, 04, 06, and 09.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. Every modeled concept MUST be classified as an entity, value, record, role, relationship, event, state, process, constraint, assessment, or governed decision when applicable.
2. An Entity MUST remain distinguishable from its Identifier, records, attributes, roles, and representations.
3. Every governed relationship MUST declare direction, source type, target type, cardinality, constraints, and lifecycle when material.
4. Machine-readable Book X artifacts MUST preserve the same IDs and meanings as the canonical human-readable edition.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0011 | Entity | Semantic type | A distinguishable thing with identity and continuity relevant to the HAL domain. | An Entity is not the same as its record, identifier, state, role, or representation. |
| HAL-TERM-0012 | Value Object | Semantic type | An immutable value defined by its attributes rather than by independent identity. | Changing a Value Object produces another value; it does not mutate an enduring identity. |
| HAL-TERM-0013 | Record | Semantic type | A governed representation of facts, state, decisions, or observations retained by an owning domain. | A Record is not necessarily authoritative evidence and is not interchangeable with the entity represented. |
| HAL-TERM-0014 | Authoritative Record | State role | The record owned by the designated source of truth for a governed state domain. | A replica, cache, index, projection, or local copy is not authoritative merely because it is current. |
| HAL-TERM-0015 | Relationship | Semantic type | A typed association between concepts or entity instances with declared direction, cardinality, constraints, and lifecycle. | Proximity or co-occurrence does not imply a governed Relationship. |
| HAL-TERM-0016 | State | Semantic type | The values and lifecycle condition of an entity or process at a defined observation point. | State is not an Event; an Event records a completed fact about change. |
| HAL-TERM-0017 | Lifecycle | Semantic model | The allowed states, transitions, entry conditions, exit conditions, terminal conditions, and evidence for a governed concept. | A list of statuses without transition rules is not a complete Lifecycle. |
| HAL-TERM-0018 | Invariant | Constraint | A condition required to remain true throughout a defined scope or transition set. | An engineering invariant is not automatically a Constitutional invariant. |
| HAL-TERM-0019 | Claim | Evidence-bearing assertion | A proposition stated for evaluation and linked to its subject, issuer, scope, time, and supporting or opposing evidence. | A Claim is not true merely because it is recorded or signed. |
| HAL-TERM-0020 | Constraint | Rule element | A condition that limits valid state, relationships, transitions, or behavior within a defined scope. | A preference or target is not a Constraint unless its governing source makes it binding. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0011 — Entity

- **Example:** A dependent artifact cites `HAL-TERM-0011` when it uses **Entity** with this exact governed meaning: A distinguishable thing with identity and continuity relevant to the HAL domain.
- **Counterexample:** A dependent artifact uses **Entity** in a way that violates its required distinction: An Entity is not the same as its record, identifier, state, role, or representation.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An Entity is not the same as its record, identifier, state, role, or representation.

### HAL-TERM-0012 — Value Object

- **Example:** A dependent artifact cites `HAL-TERM-0012` when it uses **Value Object** with this exact governed meaning: An immutable value defined by its attributes rather than by independent identity.
- **Counterexample:** A dependent artifact uses **Value Object** in a way that violates its required distinction: Changing a Value Object produces another value; it does not mutate an enduring identity.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Changing a Value Object produces another value; it does not mutate an enduring identity.

### HAL-TERM-0013 — Record

- **Example:** A dependent artifact cites `HAL-TERM-0013` when it uses **Record** with this exact governed meaning: A governed representation of facts, state, decisions, or observations retained by an owning domain.
- **Counterexample:** A dependent artifact uses **Record** in a way that violates its required distinction: A Record is not necessarily authoritative evidence and is not interchangeable with the entity represented.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Record is not necessarily authoritative evidence and is not interchangeable with the entity represented.

### HAL-TERM-0014 — Authoritative Record

- **Example:** A dependent artifact cites `HAL-TERM-0014` when it uses **Authoritative Record** with this exact governed meaning: The record owned by the designated source of truth for a governed state domain.
- **Counterexample:** A dependent artifact uses **Authoritative Record** in a way that violates its required distinction: A replica, cache, index, projection, or local copy is not authoritative merely because it is current.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A replica, cache, index, projection, or local copy is not authoritative merely because it is current.

### HAL-TERM-0015 — Relationship

- **Example:** A dependent artifact cites `HAL-TERM-0015` when it uses **Relationship** with this exact governed meaning: A typed association between concepts or entity instances with declared direction, cardinality, constraints, and lifecycle.
- **Counterexample:** A dependent artifact uses **Relationship** in a way that violates its required distinction: Proximity or co-occurrence does not imply a governed Relationship.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Proximity or co-occurrence does not imply a governed Relationship.

### HAL-TERM-0016 — State

- **Example:** A dependent artifact cites `HAL-TERM-0016` when it uses **State** with this exact governed meaning: The values and lifecycle condition of an entity or process at a defined observation point.
- **Counterexample:** A dependent artifact uses **State** in a way that violates its required distinction: State is not an Event; an Event records a completed fact about change.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** State is not an Event; an Event records a completed fact about change.

### HAL-TERM-0017 — Lifecycle

- **Example:** A dependent artifact cites `HAL-TERM-0017` when it uses **Lifecycle** with this exact governed meaning: The allowed states, transitions, entry conditions, exit conditions, terminal conditions, and evidence for a governed concept.
- **Counterexample:** A dependent artifact uses **Lifecycle** in a way that violates its required distinction: A list of statuses without transition rules is not a complete Lifecycle.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A list of statuses without transition rules is not a complete Lifecycle.

### HAL-TERM-0018 — Invariant

- **Example:** A dependent artifact cites `HAL-TERM-0018` when it uses **Invariant** with this exact governed meaning: A condition required to remain true throughout a defined scope or transition set.
- **Counterexample:** A dependent artifact uses **Invariant** in a way that violates its required distinction: An engineering invariant is not automatically a Constitutional invariant.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An engineering invariant is not automatically a Constitutional invariant.

### HAL-TERM-0019 — Claim

- **Example:** A dependent artifact cites `HAL-TERM-0019` when it uses **Claim** with this exact governed meaning: A proposition stated for evaluation and linked to its subject, issuer, scope, time, and supporting or opposing evidence.
- **Counterexample:** A dependent artifact uses **Claim** in a way that violates its required distinction: A Claim is not true merely because it is recorded or signed.
- **Relationship records:** HAL-REL-0027, HAL-REL-0029, HAL-REL-0030
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Claim is not true merely because it is recorded or signed.

### HAL-TERM-0020 — Constraint

- **Example:** A dependent artifact cites `HAL-TERM-0020` when it uses **Constraint** with this exact governed meaning: A condition that limits valid state, relationships, transitions, or behavior within a defined scope.
- **Counterexample:** A dependent artifact uses **Constraint** in a way that violates its required distinction: A preference or target is not a Constraint unless its governing source makes it binding.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A preference or target is not a Constraint unless its governing source makes it binding.

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
