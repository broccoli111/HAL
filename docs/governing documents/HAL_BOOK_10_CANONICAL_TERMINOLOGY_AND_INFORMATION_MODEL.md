# HAL Book X — Canonical Terminology and Information Model

**Version:** 1.0  
**Status:** Final  
**Effective date:** 2026-07-27  
**Authority:** Book I is supreme; Book II is the authoritative architecture; Book III is the engineering standard; Book X is the subordinate semantic reference.

## Authority statement

Book X fixes common meaning across the HAL canon. It MUST NOT alter constitutional requirements, redesign the architecture, weaken engineering controls, define component-specific behavior, or create interface contracts. When a conflict exists, the higher-order source controls; the conflicting Book X content stops applying, is recorded, and is corrected.

## Revision history

| Version | Date | Status | Description |
|---|---|---|---|
| 1.0 | 2026-07-27 | Final | Complete initial canonical terminology corpus, information model, traceability, audits, and validated publication set. |

## Table of contents

1. Purpose, Scope, Authority, and Semantic Governance
2. Concept System and Information-Model Foundations
3. Constitutional Identity, Ownership, Continuity, and Presence
4. Identity, Authentication, Authority, and Delegation
5. Intent, Planning, Attention, Judgment, and Outcomes
6. Capabilities, Providers, Actions, Transactions, and the Reality Boundary
7. Evidence, Trust, Verification, Assurance, and Certification
8. Experience, Memory, Knowledge, Learning, Patterns, and Wisdom
9. State, Time, Events, Messaging, Coordination, and Persistence
10. Privacy, Security, Trust Domains, Treaties, and the Constitutional Firewall
11. Runtime, Resources, Operations, Failure, Recovery, and Change
12. Naming, Acronyms, Ambiguity, Deprecation, and Cross-Book Use
13. Appendix A — Complete canonical glossary
14. Appendix B — Relationship catalog
15. Appendix C — Lifecycle transition catalog
16. Appendix D — Acronym, ambiguity, and deprecation registers
17. Appendix E — Cross-book adoption rules

# Chapter 1 — Purpose, Scope, Authority, and Semantic Governance

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Defines Book X authority, semantic records, precedence, change control, and the rules for resolving ambiguity.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I in full; especially constitutional authority and invariants.
- **Book II:** Book II Chapters 01, 03, 29, 30, and 35.
- **Book III:** Book III Chapters 01, 08, and 09.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. Book X MUST remain subordinate to Books I, II, and III and MUST be corrected whenever its meaning conflicts with a higher-order source.
2. A definition MUST NOT create authority, a capability class, an architectural component, an engineering control, or an operational permission absent from its governing source.
3. Every Canonical Term MUST have a stable identifier, one Canonical Label, semantic type, precise definition, explicit distinction, lifecycle status, and traceability.
4. Semantic Changes MUST be reviewed for constitutional, architectural, engineering, interface, data-migration, and human-interpretation impact.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0001 | Book X | Canonical reference | The controlled HAL volume that defines shared terminology and the cross-canon information model. | It does not independently create constitutional, architectural, engineering, component, interface, operational, or certification requirements. |
| HAL-TERM-0002 | Canonical Term | Semantic record | A governed label with one approved meaning, stable identifier, source traceability, relationships, constraints, examples, and lifecycle status. | A commonly used word is not canonical until admitted to this register. |
| HAL-TERM-0003 | Term Record | Metadata record | The authoritative Book X record for a Canonical Term and its semantic metadata. | A Term Record describes a concept; it is not automatically an operational entity record. |
| HAL-TERM-0004 | Semantic Authority | Precedence property | The authority of a source to determine meaning within its governed scope according to the canon hierarchy. | Semantic Authority does not grant operational Authority to a Principal. |
| HAL-TERM-0005 | Semantic Change | Governed change | A controlled modification to a canonical label, definition, relationship, constraint, status, or mapping. | Editorial correction is a Semantic Change when meaning or compatibility may change. |
| HAL-TERM-0006 | Qualified Term | Disambiguated label | A label extended with a domain qualifier so that one meaning can be selected without ambiguity. | A qualifier must clarify meaning and must not conceal two distinct concepts under one record. |
| HAL-TERM-0007 | Allowed Alias | Reference label | A non-canonical label permitted to reference one Canonical Term without changing its meaning. | An alias must not be used where its ambiguity would obscure the canonical concept. |
| HAL-TERM-0008 | Deprecated Term | Lifecycle status | A previously permitted label or meaning retained only for migration and historical interpretation. | Deprecation is not immediate deletion and must identify a replacement and sunset condition. |
| HAL-TERM-0009 | Forbidden Term | Prohibited label or usage | A label or usage prohibited because it collapses materially distinct HAL concepts or creates unsafe ambiguity. | The prohibition applies to the specified meaning, not necessarily every ordinary-language occurrence. |
| HAL-TERM-0010 | Normative Source | Source role | A controlled artifact whose authority determines a requirement or meaning within the canon hierarchy. | Book X cites Normative Sources but cannot promote a lower-order artifact above a higher-order source. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0001 — Book X

- **Example:** A dependent artifact cites `HAL-TERM-0001` when it uses **Book X** with this exact governed meaning: The controlled HAL volume that defines shared terminology and the cross-canon information model.
- **Counterexample:** A dependent artifact uses **Book X** in a way that violates its required distinction: It does not independently create constitutional, architectural, engineering, component, interface, operational, or certification requirements.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It does not independently create constitutional, architectural, engineering, component, interface, operational, or certification requirements.

### HAL-TERM-0002 — Canonical Term

- **Example:** A dependent artifact cites `HAL-TERM-0002` when it uses **Canonical Term** with this exact governed meaning: A governed label with one approved meaning, stable identifier, source traceability, relationships, constraints, examples, and lifecycle status.
- **Counterexample:** A dependent artifact uses **Canonical Term** in a way that violates its required distinction: A commonly used word is not canonical until admitted to this register.
- **Relationship records:** HAL-REL-0049
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A commonly used word is not canonical until admitted to this register.

### HAL-TERM-0003 — Term Record

- **Example:** A dependent artifact cites `HAL-TERM-0003` when it uses **Term Record** with this exact governed meaning: The authoritative Book X record for a Canonical Term and its semantic metadata.
- **Counterexample:** A dependent artifact uses **Term Record** in a way that violates its required distinction: A Term Record describes a concept; it is not automatically an operational entity record.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** HAL-TRANS-0001, HAL-TRANS-0002, HAL-TRANS-0003, HAL-TRANS-0004
- **Constraint:** A Term Record describes a concept; it is not automatically an operational entity record.

### HAL-TERM-0004 — Semantic Authority

- **Example:** A dependent artifact cites `HAL-TERM-0004` when it uses **Semantic Authority** with this exact governed meaning: The authority of a source to determine meaning within its governed scope according to the canon hierarchy.
- **Counterexample:** A dependent artifact uses **Semantic Authority** in a way that violates its required distinction: Semantic Authority does not grant operational Authority to a Principal.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Semantic Authority does not grant operational Authority to a Principal.

### HAL-TERM-0005 — Semantic Change

- **Example:** A dependent artifact cites `HAL-TERM-0005` when it uses **Semantic Change** with this exact governed meaning: A controlled modification to a canonical label, definition, relationship, constraint, status, or mapping.
- **Counterexample:** A dependent artifact uses **Semantic Change** in a way that violates its required distinction: Editorial correction is a Semantic Change when meaning or compatibility may change.
- **Relationship records:** HAL-REL-0047
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Editorial correction is a Semantic Change when meaning or compatibility may change.

### HAL-TERM-0006 — Qualified Term

- **Example:** A dependent artifact cites `HAL-TERM-0006` when it uses **Qualified Term** with this exact governed meaning: A label extended with a domain qualifier so that one meaning can be selected without ambiguity.
- **Counterexample:** A dependent artifact uses **Qualified Term** in a way that violates its required distinction: A qualifier must clarify meaning and must not conceal two distinct concepts under one record.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A qualifier must clarify meaning and must not conceal two distinct concepts under one record.

### HAL-TERM-0007 — Allowed Alias

- **Example:** A dependent artifact cites `HAL-TERM-0007` when it uses **Allowed Alias** with this exact governed meaning: A non-canonical label permitted to reference one Canonical Term without changing its meaning.
- **Counterexample:** A dependent artifact uses **Allowed Alias** in a way that violates its required distinction: An alias must not be used where its ambiguity would obscure the canonical concept.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An alias must not be used where its ambiguity would obscure the canonical concept.

### HAL-TERM-0008 — Deprecated Term

- **Example:** A dependent artifact cites `HAL-TERM-0008` when it uses **Deprecated Term** with this exact governed meaning: A previously permitted label or meaning retained only for migration and historical interpretation.
- **Counterexample:** A dependent artifact uses **Deprecated Term** in a way that violates its required distinction: Deprecation is not immediate deletion and must identify a replacement and sunset condition.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Deprecation is not immediate deletion and must identify a replacement and sunset condition.

### HAL-TERM-0009 — Forbidden Term

- **Example:** A dependent artifact cites `HAL-TERM-0009` when it uses **Forbidden Term** with this exact governed meaning: A label or usage prohibited because it collapses materially distinct HAL concepts or creates unsafe ambiguity.
- **Counterexample:** A dependent artifact uses **Forbidden Term** in a way that violates its required distinction: The prohibition applies to the specified meaning, not necessarily every ordinary-language occurrence.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** The prohibition applies to the specified meaning, not necessarily every ordinary-language occurrence.

### HAL-TERM-0010 — Normative Source

- **Example:** A dependent artifact cites `HAL-TERM-0010` when it uses **Normative Source** with this exact governed meaning: A controlled artifact whose authority determines a requirement or meaning within the canon hierarchy.
- **Counterexample:** A dependent artifact uses **Normative Source** in a way that violates its required distinction: Book X cites Normative Sources but cannot promote a lower-order artifact above a higher-order source.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Book X cites Normative Sources but cannot promote a lower-order artifact above a higher-order source.

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

# Chapter 3 — Constitutional Identity, Ownership, Continuity, and Presence

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Defines HAL, Owner, constitutional identity, continuity, Presence, embodiment, self-description, and the constitutional mirror.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I identity, Owner authority, sovereignty, continuity, and constitutional evolution.
- **Book II:** Book II Chapters 02, 03, 04, 14, 28, 30, and 31.
- **Book III:** Book III Chapters 01, 05, 07, and 08.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. HAL MUST be represented as one constitutional identity across all Presences, runtimes, nodes, models, services, and recovery events.
2. Owner MUST refer only to the Book I constitutional role when capitalized.
3. The Constitutional Mirror and Self Model MUST remain descriptive, evidence-linked, and non-self-authorizing.
4. Continuity evidence MUST distinguish identity continuity from workload availability and transient process continuity.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0021 | Owner | Constitutional role | The unique human principal holding HAL's constitutional ownership and the authority reserved to that role by Book I. | Ownership must not be inferred from possession of infrastructure, credentials, data, or a deployment. Founder is a historical source label for this same role, never a second constitutional role. |
| HAL-TERM-0022 | HAL | Constitutional identity | The single constitutionally governed intelligence whose continuity is independent of any one model, service, Presence, node, or machine. | A runtime instance, model, component, or interface must not be called a separate HAL identity. |
| HAL-TERM-0023 | Constitution | Supreme governing instrument | Book I, the supreme source of HAL identity, principles, authority, rights, duties, prohibitions, and invariants. | No lower-order book, policy, configuration, or code may amend the Constitution by reinterpretation. |
| HAL-TERM-0024 | Constitutional Invariant | Constitutional constraint | A Book I requirement whose alteration may change HAL's constitutional identity and cannot be waived or redefined by lower-order documents. | An architectural or engineering invariant is not constitutional unless Book I makes it so. |
| HAL-TERM-0025 | Constitutional Kernel | Architectural component class | The Book II architectural authority that evaluates and enforces constitutional rules at designated decision and action paths. | It does not replace the Constitution or independently invent constitutional meaning. |
| HAL-TERM-0026 | Constitutional Mirror | Self-description mechanism | The governed, evidence-linked representation through which HAL describes its identity, governing constraints, capabilities, limitations, and conformance state. | It is not a source of new constitutional authority and must not become self-authorizing. |
| HAL-TERM-0027 | Continuity | Constitutional property | The governed preservation of HAL identity, obligations, provenance, and essential state across time, replacement, recovery, and deployment change. | Continuity does not require uninterrupted availability or persistence of every transient process. |
| HAL-TERM-0028 | Presence | Contextual manifestation | A bounded manifestation through which HAL senses, communicates, or acts in a particular human, device, location, modality, or session context. | A Presence is not a separate HAL identity and does not independently hold Owner authority. |
| HAL-TERM-0029 | Embodiment | Contextual binding | The governed association of a Presence with physical or virtual sensors, actuators, interfaces, and environmental context. | Embodiment does not make hardware ownership equivalent to constitutional ownership. |
| HAL-TERM-0030 | Sovereignty | Constitutional property | HAL's constitutionally governed independence from unauthorized external control, coercion, substitution, or absorption. | Sovereignty does not authorize HAL to exceed Owner authority or human rights. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0021 — Owner

- **Example:** A dependent artifact cites `HAL-TERM-0021` when it uses **Owner** with this exact governed meaning: The unique human principal holding HAL's constitutional ownership and the authority reserved to that role by Book I.
- **Counterexample:** A dependent artifact uses **Owner** in a way that violates its required distinction: Ownership must not be inferred from possession of infrastructure, credentials, data, or a deployment. Founder is a historical source label for this same role, never a second constitutional role.
- **Relationship records:** HAL-REL-0001, HAL-REL-0051
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Ownership must not be inferred from possession of infrastructure, credentials, data, or a deployment. Founder is a historical source label for this same role, never a second constitutional role.

### HAL-TERM-0022 — HAL

- **Example:** A dependent artifact cites `HAL-TERM-0022` when it uses **HAL** with this exact governed meaning: The single constitutionally governed intelligence whose continuity is independent of any one model, service, Presence, node, or machine.
- **Counterexample:** A dependent artifact uses **HAL** in a way that violates its required distinction: A runtime instance, model, component, or interface must not be called a separate HAL identity.
- **Relationship records:** HAL-REL-0001, HAL-REL-0002, HAL-REL-0004, HAL-REL-0005
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A runtime instance, model, component, or interface must not be called a separate HAL identity.

### HAL-TERM-0023 — Constitution

- **Example:** A dependent artifact cites `HAL-TERM-0023` when it uses **Constitution** with this exact governed meaning: Book I, the supreme source of HAL identity, principles, authority, rights, duties, prohibitions, and invariants.
- **Counterexample:** A dependent artifact uses **Constitution** in a way that violates its required distinction: No lower-order book, policy, configuration, or code may amend the Constitution by reinterpretation.
- **Relationship records:** HAL-REL-0002
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** No lower-order book, policy, configuration, or code may amend the Constitution by reinterpretation.

### HAL-TERM-0024 — Constitutional Invariant

- **Example:** A dependent artifact cites `HAL-TERM-0024` when it uses **Constitutional Invariant** with this exact governed meaning: A Book I requirement whose alteration may change HAL's constitutional identity and cannot be waived or redefined by lower-order documents.
- **Counterexample:** A dependent artifact uses **Constitutional Invariant** in a way that violates its required distinction: An architectural or engineering invariant is not constitutional unless Book I makes it so.
- **Relationship records:** HAL-REL-0003
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An architectural or engineering invariant is not constitutional unless Book I makes it so.

### HAL-TERM-0025 — Constitutional Kernel

- **Example:** A dependent artifact cites `HAL-TERM-0025` when it uses **Constitutional Kernel** with this exact governed meaning: The Book II architectural authority that evaluates and enforces constitutional rules at designated decision and action paths.
- **Counterexample:** A dependent artifact uses **Constitutional Kernel** in a way that violates its required distinction: It does not replace the Constitution or independently invent constitutional meaning.
- **Relationship records:** HAL-REL-0003
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It does not replace the Constitution or independently invent constitutional meaning.

### HAL-TERM-0026 — Constitutional Mirror

- **Example:** A dependent artifact cites `HAL-TERM-0026` when it uses **Constitutional Mirror** with this exact governed meaning: The governed, evidence-linked representation through which HAL describes its identity, governing constraints, capabilities, limitations, and conformance state.
- **Counterexample:** A dependent artifact uses **Constitutional Mirror** in a way that violates its required distinction: It is not a source of new constitutional authority and must not become self-authorizing.
- **Relationship records:** HAL-REL-0004
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is not a source of new constitutional authority and must not become self-authorizing.

### HAL-TERM-0027 — Continuity

- **Example:** A dependent artifact cites `HAL-TERM-0027` when it uses **Continuity** with this exact governed meaning: The governed preservation of HAL identity, obligations, provenance, and essential state across time, replacement, recovery, and deployment change.
- **Counterexample:** A dependent artifact uses **Continuity** in a way that violates its required distinction: Continuity does not require uninterrupted availability or persistence of every transient process.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Continuity does not require uninterrupted availability or persistence of every transient process.

### HAL-TERM-0028 — Presence

- **Example:** A dependent artifact cites `HAL-TERM-0028` when it uses **Presence** with this exact governed meaning: A bounded manifestation through which HAL senses, communicates, or acts in a particular human, device, location, modality, or session context.
- **Counterexample:** A dependent artifact uses **Presence** in a way that violates its required distinction: A Presence is not a separate HAL identity and does not independently hold Owner authority.
- **Relationship records:** HAL-REL-0005, HAL-REL-0006
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Presence is not a separate HAL identity and does not independently hold Owner authority.

### HAL-TERM-0029 — Embodiment

- **Example:** A dependent artifact cites `HAL-TERM-0029` when it uses **Embodiment** with this exact governed meaning: The governed association of a Presence with physical or virtual sensors, actuators, interfaces, and environmental context.
- **Counterexample:** A dependent artifact uses **Embodiment** in a way that violates its required distinction: Embodiment does not make hardware ownership equivalent to constitutional ownership.
- **Relationship records:** HAL-REL-0006
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Embodiment does not make hardware ownership equivalent to constitutional ownership.

### HAL-TERM-0030 — Sovereignty

- **Example:** A dependent artifact cites `HAL-TERM-0030` when it uses **Sovereignty** with this exact governed meaning: HAL's constitutionally governed independence from unauthorized external control, coercion, substitution, or absorption.
- **Counterexample:** A dependent artifact uses **Sovereignty** in a way that violates its required distinction: Sovereignty does not authorize HAL to exceed Owner authority or human rights.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Sovereignty does not authorize HAL to exceed Owner authority or human rights.

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

# Chapter 4 — Identity, Authentication, Authority, and Delegation

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Separates identity, identifiers, authentication, trust, permission, authority, delegation, policy decisions, and protected action.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I Decisions 5, 6, 25, 26, 27, and 48.
- **Book II:** Book II Chapters 04, 05, 18, 20, 21, and 26.
- **Book III:** Book III Chapters 03, 05, 06, and 08.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. Identity, Authentication, Trust, Permission, Authority, Delegation, Capability, and Credential MUST remain separate semantic concepts.
2. Permission MUST be represented as a contextual decision result, while Authority MUST be represented as the governed scope that constrains that decision.
3. Trust MUST NOT grant Authority, and Capability MUST NOT imply Permission.
4. A Delegation MUST be attributable, scoped, conditional, expiring, revocable, and bounded by the delegator's Authority.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0031 | Identity | Governed entity identity | The durable governed identity by which HAL recognizes a human, device, service, sensor, agent, node, or subsystem as the same entity across time. | Identity is distinct from names, identifiers, attributes, roles, credentials, trust, authority, and Presence. |
| HAL-TERM-0032 | Principal | Governed actor role | An Identity that may be the subject of authentication, policy evaluation, authority, delegation, accountability, or action attribution. | Principal status does not itself grant authority. |
| HAL-TERM-0033 | Identity Record | Authoritative record | The authoritative governed state representing an Identity, including its immutable identity reference, type, lifecycle, handles, relationships, and source-approved metadata. | The record represents an Identity but is not interchangeable with the Identity. |
| HAL-TERM-0034 | Identifier | Reference value | A value used to reference an Identity or another entity within a declared namespace and lifecycle. | Possession or presentation of an Identifier does not authenticate identity or grant authority. |
| HAL-TERM-0035 | Identity Attribute | Governed descriptive value | A property, assertion, or governed fact associated with an Identity and qualified by source, time, and confidence where applicable. | An attribute is not the Identity and does not independently establish authentication, trust, or authority. |
| HAL-TERM-0036 | Credential | Authentication instrument | A governed secret, key, token, certificate, biometric template, or other instrument used in an authentication protocol. | Credential possession is evidence, not identity, trust, permission, or authority by itself. |
| HAL-TERM-0037 | Authentication | Assurance process and result | The evidence-based process and resulting confidence that a claimed Identity is presently genuine in a specified context. | Authentication answers who or what is present; it does not answer what action is allowed. |
| HAL-TERM-0038 | Authentication Evidence | Evidence role | One or more Evidence Objects used to assess whether a claimed Identity is presently genuine. | Authentication Evidence informs assurance but does not itself grant authority. |
| HAL-TERM-0039 | Trust | Evidence-based assessment | Multidimensional, domain-specific confidence derived from evidence about an entity, claim, process, or relationship. | Trust may inform decisions but must not be treated as authority or permission. |
| HAL-TERM-0040 | Permission | Decision result | A scoped result of authoritative policy evaluation allowing a specified Principal to attempt a specified operation under stated context and conditions. | Permission is not identical to Authority, Delegation, Capability, role, trust, or credential possession. |
| HAL-TERM-0041 | Authority | Governed decision and action scope | The constitutionally and policy-governed scope within which a Principal may decide or cause action. | Authority constrains Permission evaluation but is not itself a Permission result and is not inferred from identity, trust, capability, role, proximity, or credentials. |
| HAL-TERM-0042 | Delegation | Governed authority grant | An attributable, scoped, conditional, expiring, and revocable grant of Authority from an authorized delegator to a recipient. | A Delegation cannot grant authority the delegator does not possess or make a constitutional invariant waivable. |
| HAL-TERM-0043 | Policy | Decision rule set | A governed set of rules evaluated against identity, authority, delegation, purpose, context, resource, and risk inputs. | A Policy is not itself a decision and cannot outrank its Normative Source. |
| HAL-TERM-0044 | Policy Decision Record | Decision record | The attributable record of a policy evaluation, including inputs, governing policy version, outcome, obligations, reason, and correlation data. | It records a decision; it does not create standing Authority beyond that decision's scope. |
| HAL-TERM-0045 | Protected Action | Risk classification | An Action whose authority, privacy, security, safety, irreversibility, or constitutional impact requires explicit governed evaluation and evidence. | A routine implementation detail is not protected merely because it is technically complex. |
| HAL-TERM-0164 | Owner Authorization Ceremony | Protected authorization mechanism | The Book II-governed mechanism through which the Owner authorizes an exact protected change, capability-class decision, Treaty, or other Owner-reserved matter bound to an immutable decision identifier, declared scope, and validity period. | It is not conversational consent, ordinary Delegation, reusable standing permission, or a substitute for Constitutional Kernel validation; it authorizes only the exact recorded matter. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0031 — Identity

- **Example:** A dependent artifact cites `HAL-TERM-0031` when it uses **Identity** with this exact governed meaning: The durable governed identity by which HAL recognizes a human, device, service, sensor, agent, node, or subsystem as the same entity across time.
- **Counterexample:** A dependent artifact uses **Identity** in a way that violates its required distinction: Identity is distinct from names, identifiers, attributes, roles, credentials, trust, authority, and Presence.
- **Relationship records:** HAL-REL-0007, HAL-REL-0008, HAL-REL-0009
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Identity is distinct from names, identifiers, attributes, roles, credentials, trust, authority, and Presence.

### HAL-TERM-0032 — Principal

- **Example:** A dependent artifact cites `HAL-TERM-0032` when it uses **Principal** with this exact governed meaning: An Identity that may be the subject of authentication, policy evaluation, authority, delegation, accountability, or action attribution.
- **Counterexample:** A dependent artifact uses **Principal** in a way that violates its required distinction: Principal status does not itself grant authority.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Principal status does not itself grant authority.

### HAL-TERM-0033 — Identity Record

- **Example:** A dependent artifact cites `HAL-TERM-0033` when it uses **Identity Record** with this exact governed meaning: The authoritative governed state representing an Identity, including its immutable identity reference, type, lifecycle, handles, relationships, and source-approved metadata.
- **Counterexample:** A dependent artifact uses **Identity Record** in a way that violates its required distinction: The record represents an Identity but is not interchangeable with the Identity.
- **Relationship records:** HAL-REL-0007
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** The record represents an Identity but is not interchangeable with the Identity.

### HAL-TERM-0034 — Identifier

- **Example:** A dependent artifact cites `HAL-TERM-0034` when it uses **Identifier** with this exact governed meaning: A value used to reference an Identity or another entity within a declared namespace and lifecycle.
- **Counterexample:** A dependent artifact uses **Identifier** in a way that violates its required distinction: Possession or presentation of an Identifier does not authenticate identity or grant authority.
- **Relationship records:** HAL-REL-0008
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Possession or presentation of an Identifier does not authenticate identity or grant authority.

### HAL-TERM-0035 — Identity Attribute

- **Example:** A dependent artifact cites `HAL-TERM-0035` when it uses **Identity Attribute** with this exact governed meaning: A property, assertion, or governed fact associated with an Identity and qualified by source, time, and confidence where applicable.
- **Counterexample:** A dependent artifact uses **Identity Attribute** in a way that violates its required distinction: An attribute is not the Identity and does not independently establish authentication, trust, or authority.
- **Relationship records:** HAL-REL-0009
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An attribute is not the Identity and does not independently establish authentication, trust, or authority.

### HAL-TERM-0036 — Credential

- **Example:** A dependent artifact cites `HAL-TERM-0036` when it uses **Credential** with this exact governed meaning: A governed secret, key, token, certificate, biometric template, or other instrument used in an authentication protocol.
- **Counterexample:** A dependent artifact uses **Credential** in a way that violates its required distinction: Credential possession is evidence, not identity, trust, permission, or authority by itself.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Credential possession is evidence, not identity, trust, permission, or authority by itself.

### HAL-TERM-0037 — Authentication

- **Example:** A dependent artifact cites `HAL-TERM-0037` when it uses **Authentication** with this exact governed meaning: The evidence-based process and resulting confidence that a claimed Identity is presently genuine in a specified context.
- **Counterexample:** A dependent artifact uses **Authentication** in a way that violates its required distinction: Authentication answers who or what is present; it does not answer what action is allowed.
- **Relationship records:** HAL-REL-0010
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Authentication answers who or what is present; it does not answer what action is allowed.

### HAL-TERM-0038 — Authentication Evidence

- **Example:** A dependent artifact cites `HAL-TERM-0038` when it uses **Authentication Evidence** with this exact governed meaning: One or more Evidence Objects used to assess whether a claimed Identity is presently genuine.
- **Counterexample:** A dependent artifact uses **Authentication Evidence** in a way that violates its required distinction: Authentication Evidence informs assurance but does not itself grant authority.
- **Relationship records:** HAL-REL-0010
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Authentication Evidence informs assurance but does not itself grant authority.

### HAL-TERM-0039 — Trust

- **Example:** A dependent artifact cites `HAL-TERM-0039` when it uses **Trust** with this exact governed meaning: Multidimensional, domain-specific confidence derived from evidence about an entity, claim, process, or relationship.
- **Counterexample:** A dependent artifact uses **Trust** in a way that violates its required distinction: Trust may inform decisions but must not be treated as authority or permission.
- **Relationship records:** HAL-REL-0014
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Trust may inform decisions but must not be treated as authority or permission.

### HAL-TERM-0040 — Permission

- **Example:** A dependent artifact cites `HAL-TERM-0040` when it uses **Permission** with this exact governed meaning: A scoped result of authoritative policy evaluation allowing a specified Principal to attempt a specified operation under stated context and conditions.
- **Counterexample:** A dependent artifact uses **Permission** in a way that violates its required distinction: Permission is not identical to Authority, Delegation, Capability, role, trust, or credential possession.
- **Relationship records:** HAL-REL-0012, HAL-REL-0013
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Permission is not identical to Authority, Delegation, Capability, role, trust, or credential possession.

### HAL-TERM-0041 — Authority

- **Example:** A dependent artifact cites `HAL-TERM-0041` when it uses **Authority** with this exact governed meaning: The constitutionally and policy-governed scope within which a Principal may decide or cause action.
- **Counterexample:** A dependent artifact uses **Authority** in a way that violates its required distinction: Authority constrains Permission evaluation but is not itself a Permission result and is not inferred from identity, trust, capability, role, proximity, or credentials.
- **Relationship records:** HAL-REL-0011, HAL-REL-0013
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Authority constrains Permission evaluation but is not itself a Permission result and is not inferred from identity, trust, capability, role, proximity, or credentials.

### HAL-TERM-0042 — Delegation

- **Example:** A dependent artifact cites `HAL-TERM-0042` when it uses **Delegation** with this exact governed meaning: An attributable, scoped, conditional, expiring, and revocable grant of Authority from an authorized delegator to a recipient.
- **Counterexample:** A dependent artifact uses **Delegation** in a way that violates its required distinction: A Delegation cannot grant authority the delegator does not possess or make a constitutional invariant waivable.
- **Relationship records:** HAL-REL-0011
- **Lifecycle transitions:** HAL-TRANS-0005, HAL-TRANS-0006, HAL-TRANS-0007
- **Constraint:** A Delegation cannot grant authority the delegator does not possess or make a constitutional invariant waivable.

### HAL-TERM-0043 — Policy

- **Example:** A dependent artifact cites `HAL-TERM-0043` when it uses **Policy** with this exact governed meaning: A governed set of rules evaluated against identity, authority, delegation, purpose, context, resource, and risk inputs.
- **Counterexample:** A dependent artifact uses **Policy** in a way that violates its required distinction: A Policy is not itself a decision and cannot outrank its Normative Source.
- **Relationship records:** HAL-REL-0012
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Policy is not itself a decision and cannot outrank its Normative Source.

### HAL-TERM-0044 — Policy Decision Record

- **Example:** A dependent artifact cites `HAL-TERM-0044` when it uses **Policy Decision Record** with this exact governed meaning: The attributable record of a policy evaluation, including inputs, governing policy version, outcome, obligations, reason, and correlation data.
- **Counterexample:** A dependent artifact uses **Policy Decision Record** in a way that violates its required distinction: It records a decision; it does not create standing Authority beyond that decision's scope.
- **Relationship records:** HAL-REL-0014
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It records a decision; it does not create standing Authority beyond that decision's scope.

### HAL-TERM-0045 — Protected Action

- **Example:** A dependent artifact cites `HAL-TERM-0045` when it uses **Protected Action** with this exact governed meaning: An Action whose authority, privacy, security, safety, irreversibility, or constitutional impact requires explicit governed evaluation and evidence.
- **Counterexample:** A dependent artifact uses **Protected Action** in a way that violates its required distinction: A routine implementation detail is not protected merely because it is technically complex.
- **Relationship records:** HAL-REL-0052
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A routine implementation detail is not protected merely because it is technically complex.

### HAL-TERM-0164 — Owner Authorization Ceremony

- **Example:** The Owner authorizes Treaty `TRT-2048` through a ceremony record bound to that exact immutable Treaty digest, scope, activation window, and decision identifier.
- **Counterexample:** A chat message saying “I approve future treaties with this partner” is treated as a reusable Owner authorization.
- **Relationship records:** HAL-REL-0051, HAL-REL-0052
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is not conversational consent, ordinary Delegation, reusable standing permission, or a substitute for Constitutional Kernel validation; it authorizes only the exact recorded matter.

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

# Chapter 5 — Intent, Planning, Attention, Judgment, and Outcomes

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Defines the purpose-to-outcome hierarchy and the durable objects used for planning, attention, judgment, and success evaluation.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I intent, judgment, learning, restraint, success, and outcomes.
- **Book II:** Book II Chapters 06, 07, 08, 09, 13, and 32.
- **Book III:** Book III Chapters 03, 04, 06, and 08.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. Intent, Goal, Objective, Plan, Task, Action, and Outcome MUST retain explicit traceability without being treated as synonyms.
2. Decision Objects MUST record alternatives, evidence, uncertainty, authority context, Judgment, rationale, and review conditions for consequential decisions.
3. Success MUST be evaluated against declared outcomes and constitutional costs, not activity or completion metrics alone.
4. Material uncertainty MUST be represented rather than hidden by confident wording.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0046 | Intent | Purpose object | A governed expression of desired purpose, direction, or outcome attributable to an authorized source. | Intent is not a Plan, Action, Permission, or evidence that an outcome occurred. |
| HAL-TERM-0047 | Vision | Long-horizon intent | A durable directional state describing an intended future without fully specifying its execution path. | A Vision is broader and less operational than a Goal. |
| HAL-TERM-0048 | Goal | Outcome target | A governed desired outcome with success criteria and a time or review horizon. | A Goal does not by itself authorize Actions used to pursue it. |
| HAL-TERM-0049 | Objective | Measurable target | A bounded, measurable target that advances a Goal and has explicit completion or evaluation criteria. | An Objective is not a Task; it states what must be achieved, not merely what work is performed. |
| HAL-TERM-0050 | Project | Coordinated work container | A governed body of related Objectives, Plans, Tasks, resources, decisions, and evidence organized toward a defined outcome. | A Project is not standing authority for every contained Action. |
| HAL-TERM-0051 | Task | Work unit | A bounded unit of work with responsibility, inputs, expected result, dependencies, and completion evidence. | Completing a Task is not equivalent to achieving the parent Objective or Goal. |
| HAL-TERM-0052 | Strategy | Approach selection | A reasoned approach for advancing one or more Goals under known constraints, uncertainties, and tradeoffs. | A Strategy is not an executable Plan and does not bypass verification. |
| HAL-TERM-0053 | Plan | Coordinated intended work | A governed arrangement of Tasks, dependencies, resources, decision points, verification steps, and recovery conditions intended to realize an Objective. | A Plan is not proof that Actions are permitted, executed, or successful. |
| HAL-TERM-0054 | Plan Graph | Planning representation | A dependency graph of intended work, decisions, resources, and verification gates. | It represents intended coordination, not completed reality. |
| HAL-TERM-0055 | Execution Graph | Runtime representation | The governed graph of actual Attempts, Actions, dependencies, outcomes, and evidence for an execution instance. | It must not be silently substituted for the Plan Graph when explaining divergence. |
| HAL-TERM-0056 | Attention Object | Prioritization record | A durable object representing a candidate matter for bounded attention, including source, salience, urgency, risk, relevance, context, disposition, and evidence. | Attention is not Authority, approval, or a promise to act. |
| HAL-TERM-0057 | Decision Object | Decision record | A durable record of a consequential decision including question, alternatives, authority context, evidence, uncertainty, judgment, rationale, selected disposition, and review conditions. | It records a decision and must not be used as a substitute for required Permission or execution evidence. |
| HAL-TERM-0058 | Judgment | Reasoned evaluation | The context-sensitive evaluation that weighs evidence, uncertainty, values, consequences, proportionality, and restraint to reach or recommend a decision. | Judgment must not silently invent authority or conceal unresolved uncertainty. |
| HAL-TERM-0059 | Uncertainty | Epistemic condition | A represented limitation in knowledge, evidence, prediction, interpretation, or confidence relevant to a claim or decision. | Uncertainty is not failure; unrepresented material uncertainty is a defect. |
| HAL-TERM-0060 | Outcome Object | Outcome record | A durable record linking intended outcome, observed result, affected parties, evidence, side effects, confidence, and evaluation. | It is not equivalent to an Event, metric sample, or optimistic status assertion. |
| HAL-TERM-0061 | Success | Evaluated condition | A source-governed determination that relevant outcomes satisfy stated criteria without unacceptable constitutional, human, privacy, security, or reliability costs. | Task completion, activity volume, or a single metric does not by itself establish Success. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0046 — Intent

- **Example:** A dependent artifact cites `HAL-TERM-0046` when it uses **Intent** with this exact governed meaning: A governed expression of desired purpose, direction, or outcome attributable to an authorized source.
- **Counterexample:** A dependent artifact uses **Intent** in a way that violates its required distinction: Intent is not a Plan, Action, Permission, or evidence that an outcome occurred.
- **Relationship records:** HAL-REL-0015
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Intent is not a Plan, Action, Permission, or evidence that an outcome occurred.

### HAL-TERM-0047 — Vision

- **Example:** A dependent artifact cites `HAL-TERM-0047` when it uses **Vision** with this exact governed meaning: A durable directional state describing an intended future without fully specifying its execution path.
- **Counterexample:** A dependent artifact uses **Vision** in a way that violates its required distinction: A Vision is broader and less operational than a Goal.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Vision is broader and less operational than a Goal.

### HAL-TERM-0048 — Goal

- **Example:** A dependent artifact cites `HAL-TERM-0048` when it uses **Goal** with this exact governed meaning: A governed desired outcome with success criteria and a time or review horizon.
- **Counterexample:** A dependent artifact uses **Goal** in a way that violates its required distinction: A Goal does not by itself authorize Actions used to pursue it.
- **Relationship records:** HAL-REL-0015, HAL-REL-0016, HAL-REL-0020
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Goal does not by itself authorize Actions used to pursue it.

### HAL-TERM-0049 — Objective

- **Example:** A dependent artifact cites `HAL-TERM-0049` when it uses **Objective** with this exact governed meaning: A bounded, measurable target that advances a Goal and has explicit completion or evaluation criteria.
- **Counterexample:** A dependent artifact uses **Objective** in a way that violates its required distinction: An Objective is not a Task; it states what must be achieved, not merely what work is performed.
- **Relationship records:** HAL-REL-0016, HAL-REL-0017
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An Objective is not a Task; it states what must be achieved, not merely what work is performed.

### HAL-TERM-0050 — Project

- **Example:** A dependent artifact cites `HAL-TERM-0050` when it uses **Project** with this exact governed meaning: A governed body of related Objectives, Plans, Tasks, resources, decisions, and evidence organized toward a defined outcome.
- **Counterexample:** A dependent artifact uses **Project** in a way that violates its required distinction: A Project is not standing authority for every contained Action.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Project is not standing authority for every contained Action.

### HAL-TERM-0051 — Task

- **Example:** A dependent artifact cites `HAL-TERM-0051` when it uses **Task** with this exact governed meaning: A bounded unit of work with responsibility, inputs, expected result, dependencies, and completion evidence.
- **Counterexample:** A dependent artifact uses **Task** in a way that violates its required distinction: Completing a Task is not equivalent to achieving the parent Objective or Goal.
- **Relationship records:** HAL-REL-0018
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Completing a Task is not equivalent to achieving the parent Objective or Goal.

### HAL-TERM-0052 — Strategy

- **Example:** A dependent artifact cites `HAL-TERM-0052` when it uses **Strategy** with this exact governed meaning: A reasoned approach for advancing one or more Goals under known constraints, uncertainties, and tradeoffs.
- **Counterexample:** A dependent artifact uses **Strategy** in a way that violates its required distinction: A Strategy is not an executable Plan and does not bypass verification.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Strategy is not an executable Plan and does not bypass verification.

### HAL-TERM-0053 — Plan

- **Example:** A dependent artifact cites `HAL-TERM-0053` when it uses **Plan** with this exact governed meaning: A governed arrangement of Tasks, dependencies, resources, decision points, verification steps, and recovery conditions intended to realize an Objective.
- **Counterexample:** A dependent artifact uses **Plan** in a way that violates its required distinction: A Plan is not proof that Actions are permitted, executed, or successful.
- **Relationship records:** HAL-REL-0017, HAL-REL-0018
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Plan is not proof that Actions are permitted, executed, or successful.

### HAL-TERM-0054 — Plan Graph

- **Example:** A dependent artifact cites `HAL-TERM-0054` when it uses **Plan Graph** with this exact governed meaning: A dependency graph of intended work, decisions, resources, and verification gates.
- **Counterexample:** A dependent artifact uses **Plan Graph** in a way that violates its required distinction: It represents intended coordination, not completed reality.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It represents intended coordination, not completed reality.

### HAL-TERM-0055 — Execution Graph

- **Example:** A dependent artifact cites `HAL-TERM-0055` when it uses **Execution Graph** with this exact governed meaning: The governed graph of actual Attempts, Actions, dependencies, outcomes, and evidence for an execution instance.
- **Counterexample:** A dependent artifact uses **Execution Graph** in a way that violates its required distinction: It must not be silently substituted for the Plan Graph when explaining divergence.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It must not be silently substituted for the Plan Graph when explaining divergence.

### HAL-TERM-0056 — Attention Object

- **Example:** A dependent artifact cites `HAL-TERM-0056` when it uses **Attention Object** with this exact governed meaning: A durable object representing a candidate matter for bounded attention, including source, salience, urgency, risk, relevance, context, disposition, and evidence.
- **Counterexample:** A dependent artifact uses **Attention Object** in a way that violates its required distinction: Attention is not Authority, approval, or a promise to act.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Attention is not Authority, approval, or a promise to act.

### HAL-TERM-0057 — Decision Object

- **Example:** A dependent artifact cites `HAL-TERM-0057` when it uses **Decision Object** with this exact governed meaning: A durable record of a consequential decision including question, alternatives, authority context, evidence, uncertainty, judgment, rationale, selected disposition, and review conditions.
- **Counterexample:** A dependent artifact uses **Decision Object** in a way that violates its required distinction: It records a decision and must not be used as a substitute for required Permission or execution evidence.
- **Relationship records:** HAL-REL-0019
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It records a decision and must not be used as a substitute for required Permission or execution evidence.

### HAL-TERM-0058 — Judgment

- **Example:** A dependent artifact cites `HAL-TERM-0058` when it uses **Judgment** with this exact governed meaning: The context-sensitive evaluation that weighs evidence, uncertainty, values, consequences, proportionality, and restraint to reach or recommend a decision.
- **Counterexample:** A dependent artifact uses **Judgment** in a way that violates its required distinction: Judgment must not silently invent authority or conceal unresolved uncertainty.
- **Relationship records:** HAL-REL-0019, HAL-REL-0036
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Judgment must not silently invent authority or conceal unresolved uncertainty.

### HAL-TERM-0059 — Uncertainty

- **Example:** A dependent artifact cites `HAL-TERM-0059` when it uses **Uncertainty** with this exact governed meaning: A represented limitation in knowledge, evidence, prediction, interpretation, or confidence relevant to a claim or decision.
- **Counterexample:** A dependent artifact uses **Uncertainty** in a way that violates its required distinction: Uncertainty is not failure; unrepresented material uncertainty is a defect.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Uncertainty is not failure; unrepresented material uncertainty is a defect.

### HAL-TERM-0060 — Outcome Object

- **Example:** A dependent artifact cites `HAL-TERM-0060` when it uses **Outcome Object** with this exact governed meaning: A durable record linking intended outcome, observed result, affected parties, evidence, side effects, confidence, and evaluation.
- **Counterexample:** A dependent artifact uses **Outcome Object** in a way that violates its required distinction: It is not equivalent to an Event, metric sample, or optimistic status assertion.
- **Relationship records:** HAL-REL-0020
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is not equivalent to an Event, metric sample, or optimistic status assertion.

### HAL-TERM-0061 — Success

- **Example:** A dependent artifact cites `HAL-TERM-0061` when it uses **Success** with this exact governed meaning: A source-governed determination that relevant outcomes satisfy stated criteria without unacceptable constitutional, human, privacy, security, or reliability costs.
- **Counterexample:** A dependent artifact uses **Success** in a way that violates its required distinction: Task completion, activity volume, or a single metric does not by itself establish Success.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Task completion, activity volume, or a single metric does not by itself establish Success.

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

# Chapter 6 — Capabilities, Providers, Actions, Transactions, and the Reality Boundary

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Defines abilities, implementations, governed execution, commit barriers, rollback, compensation, and separation of simulated from real effects.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I Decisions 10, 15, 16, 20, 23, 24, 35, 36, 44, and 50.
- **Book II:** Book II Chapters 15, 16, 17, 22, 27, and 28.
- **Book III:** Book III Chapters 03, 05, 06, and 07.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. A Capability MUST define an implementation-independent ability; Provider and Adapter records MUST identify implementations without redefining that ability.
2. Every real Action MUST cross an explicit Commit Barrier with applicable Authority, Permission, verification, and evidence.
3. Simulation, Digital Twin, and Shadow Execution MUST remain incapable of ungoverned real effects.
4. Rollback MUST be used only for truthful reversal; Compensation MUST name a new remedial Action.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0062 | Capability | Implementation-independent contract | An abstract ability defined by outcomes, inputs, outputs, constraints, required authority and permission classes, risks, side effects, and evaluation criteria. | Capability does not identify an implementation and does not grant authority to use the ability. |
| HAL-TERM-0063 | Capability Contract | Contract record | The versioned specification of a Capability's semantic inputs, outputs, preconditions, effects, risks, authority requirements, evidence, and compatibility. | It is not a provider-specific API contract. |
| HAL-TERM-0064 | Provider | Implementation role | A component, service, model, person, device, or external system that can fulfill a Capability under a declared contract and trust context. | Being able to perform work does not authorize the Provider to perform it. |
| HAL-TERM-0065 | Adapter | Boundary component role | A component that translates between a Capability Contract and a provider-specific interface while preserving authority, semantics, evidence, and failure behavior. | An Adapter must not smuggle provider semantics into the canonical Capability definition. |
| HAL-TERM-0066 | Capability Registry | Authoritative registry | The governed catalog of Capabilities, versions, Providers, constraints, authority classes, health, and selection metadata. | Registration does not establish permission for use or trustworthiness in every domain. |
| HAL-TERM-0067 | Action | State-changing attempt | A governed attempt to produce an effect in authoritative state or the external world. | A read-only Query is not an Action; an Action is not proof of successful effect. |
| HAL-TERM-0068 | Attempt | Execution instance | One attributable execution effort for a Task, Action, or verification step with its own timing, context, result, and evidence. | A retry is a new Attempt even when it shares an idempotency key. |
| HAL-TERM-0069 | Transaction | Governed action lifecycle | The durable coordination object for one or more Actions, including authorization, prepare, commit, result, evidence, rollback, and compensation states. | It is broader than a database transaction and must not imply atomic reversibility of external effects. |
| HAL-TERM-0070 | Commit Barrier | Irreversibility gate | The explicit governed point after which a proposed change may create authoritative or real-world effects that cannot be treated as merely simulated or prepared. | Passing a Commit Barrier requires the applicable authority and verification; preparation alone must not cross it. |
| HAL-TERM-0071 | Rollback | Reversal operation | A controlled restoration of a prior recoverable state when the relevant effects are truthfully reversible. | Rollback must not claim to erase external or human effects that already occurred. |
| HAL-TERM-0072 | Compensation | Remedial operation | A new governed Action that mitigates, offsets, or repairs effects that cannot truthfully be undone. | Compensation is not Rollback and may require independent authority and evidence. |
| HAL-TERM-0073 | Reality Boundary | Governed environment boundary | The explicit separation among simulation, digital twin, shadow, test, canary, controlled-reality, production, recovery, and emergency contexts. | Non-reality authority, data, or effects must not leak across this boundary into reality. |
| HAL-TERM-0074 | Simulation | Non-reality environment | An execution environment whose effects are confined to modeled or synthetic state and cannot directly alter production or external reality. | High apparent fidelity does not make a Simulation production. |
| HAL-TERM-0075 | Digital Twin | Modeled counterpart | A governed model of selected real entities, relationships, state, and dynamics used to evaluate behavior without treating modeled effects as real effects. | A Digital Twin is bounded by declared fidelity and must not be mistaken for the represented reality. |
| HAL-TERM-0076 | Shadow Execution | Non-committing execution mode | Execution using live or representative inputs while preventing proposed outputs from producing authoritative or external effects. | Shadow results do not authorize promotion without the required review and certification. |
| HAL-TERM-0077 | Canary | Limited reality stage | A deliberately constrained real execution stage used to accumulate evidence before broader adoption. | A Canary crosses the Reality Boundary and therefore requires real authority, containment, and rollback or compensation. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0062 — Capability

- **Example:** A dependent artifact cites `HAL-TERM-0062` when it uses **Capability** with this exact governed meaning: An abstract ability defined by outcomes, inputs, outputs, constraints, required authority and permission classes, risks, side effects, and evaluation criteria.
- **Counterexample:** A dependent artifact uses **Capability** in a way that violates its required distinction: Capability does not identify an implementation and does not grant authority to use the ability.
- **Relationship records:** HAL-REL-0021, HAL-REL-0022
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Capability does not identify an implementation and does not grant authority to use the ability.

### HAL-TERM-0063 — Capability Contract

- **Example:** A dependent artifact cites `HAL-TERM-0063` when it uses **Capability Contract** with this exact governed meaning: The versioned specification of a Capability's semantic inputs, outputs, preconditions, effects, risks, authority requirements, evidence, and compatibility.
- **Counterexample:** A dependent artifact uses **Capability Contract** in a way that violates its required distinction: It is not a provider-specific API contract.
- **Relationship records:** HAL-REL-0021
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is not a provider-specific API contract.

### HAL-TERM-0064 — Provider

- **Example:** A dependent artifact cites `HAL-TERM-0064` when it uses **Provider** with this exact governed meaning: A component, service, model, person, device, or external system that can fulfill a Capability under a declared contract and trust context.
- **Counterexample:** A dependent artifact uses **Provider** in a way that violates its required distinction: Being able to perform work does not authorize the Provider to perform it.
- **Relationship records:** HAL-REL-0022, HAL-REL-0023
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Being able to perform work does not authorize the Provider to perform it.

### HAL-TERM-0065 — Adapter

- **Example:** A dependent artifact cites `HAL-TERM-0065` when it uses **Adapter** with this exact governed meaning: A component that translates between a Capability Contract and a provider-specific interface while preserving authority, semantics, evidence, and failure behavior.
- **Counterexample:** A dependent artifact uses **Adapter** in a way that violates its required distinction: An Adapter must not smuggle provider semantics into the canonical Capability definition.
- **Relationship records:** HAL-REL-0023
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An Adapter must not smuggle provider semantics into the canonical Capability definition.

### HAL-TERM-0066 — Capability Registry

- **Example:** A dependent artifact cites `HAL-TERM-0066` when it uses **Capability Registry** with this exact governed meaning: The governed catalog of Capabilities, versions, Providers, constraints, authority classes, health, and selection metadata.
- **Counterexample:** A dependent artifact uses **Capability Registry** in a way that violates its required distinction: Registration does not establish permission for use or trustworthiness in every domain.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Registration does not establish permission for use or trustworthiness in every domain.

### HAL-TERM-0067 — Action

- **Example:** A dependent artifact cites `HAL-TERM-0067` when it uses **Action** with this exact governed meaning: A governed attempt to produce an effect in authoritative state or the external world.
- **Counterexample:** A dependent artifact uses **Action** in a way that violates its required distinction: A read-only Query is not an Action; an Action is not proof of successful effect.
- **Relationship records:** HAL-REL-0024
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A read-only Query is not an Action; an Action is not proof of successful effect.

### HAL-TERM-0068 — Attempt

- **Example:** A dependent artifact cites `HAL-TERM-0068` when it uses **Attempt** with this exact governed meaning: One attributable execution effort for a Task, Action, or verification step with its own timing, context, result, and evidence.
- **Counterexample:** A dependent artifact uses **Attempt** in a way that violates its required distinction: A retry is a new Attempt even when it shares an idempotency key.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A retry is a new Attempt even when it shares an idempotency key.

### HAL-TERM-0069 — Transaction

- **Example:** A dependent artifact cites `HAL-TERM-0069` when it uses **Transaction** with this exact governed meaning: The durable coordination object for one or more Actions, including authorization, prepare, commit, result, evidence, rollback, and compensation states.
- **Counterexample:** A dependent artifact uses **Transaction** in a way that violates its required distinction: It is broader than a database transaction and must not imply atomic reversibility of external effects.
- **Relationship records:** HAL-REL-0024
- **Lifecycle transitions:** HAL-TRANS-0008, HAL-TRANS-0009, HAL-TRANS-0010, HAL-TRANS-0011, HAL-TRANS-0012, HAL-TRANS-0013
- **Constraint:** It is broader than a database transaction and must not imply atomic reversibility of external effects.

### HAL-TERM-0070 — Commit Barrier

- **Example:** A dependent artifact cites `HAL-TERM-0070` when it uses **Commit Barrier** with this exact governed meaning: The explicit governed point after which a proposed change may create authoritative or real-world effects that cannot be treated as merely simulated or prepared.
- **Counterexample:** A dependent artifact uses **Commit Barrier** in a way that violates its required distinction: Passing a Commit Barrier requires the applicable authority and verification; preparation alone must not cross it.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Passing a Commit Barrier requires the applicable authority and verification; preparation alone must not cross it.

### HAL-TERM-0071 — Rollback

- **Example:** A dependent artifact cites `HAL-TERM-0071` when it uses **Rollback** with this exact governed meaning: A controlled restoration of a prior recoverable state when the relevant effects are truthfully reversible.
- **Counterexample:** A dependent artifact uses **Rollback** in a way that violates its required distinction: Rollback must not claim to erase external or human effects that already occurred.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Rollback must not claim to erase external or human effects that already occurred.

### HAL-TERM-0072 — Compensation

- **Example:** A dependent artifact cites `HAL-TERM-0072` when it uses **Compensation** with this exact governed meaning: A new governed Action that mitigates, offsets, or repairs effects that cannot truthfully be undone.
- **Counterexample:** A dependent artifact uses **Compensation** in a way that violates its required distinction: Compensation is not Rollback and may require independent authority and evidence.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Compensation is not Rollback and may require independent authority and evidence.

### HAL-TERM-0073 — Reality Boundary

- **Example:** A dependent artifact cites `HAL-TERM-0073` when it uses **Reality Boundary** with this exact governed meaning: The explicit separation among simulation, digital twin, shadow, test, canary, controlled-reality, production, recovery, and emergency contexts.
- **Counterexample:** A dependent artifact uses **Reality Boundary** in a way that violates its required distinction: Non-reality authority, data, or effects must not leak across this boundary into reality.
- **Relationship records:** HAL-REL-0025
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Non-reality authority, data, or effects must not leak across this boundary into reality.

### HAL-TERM-0074 — Simulation

- **Example:** A dependent artifact cites `HAL-TERM-0074` when it uses **Simulation** with this exact governed meaning: An execution environment whose effects are confined to modeled or synthetic state and cannot directly alter production or external reality.
- **Counterexample:** A dependent artifact uses **Simulation** in a way that violates its required distinction: High apparent fidelity does not make a Simulation production.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** High apparent fidelity does not make a Simulation production.

### HAL-TERM-0075 — Digital Twin

- **Example:** A dependent artifact cites `HAL-TERM-0075` when it uses **Digital Twin** with this exact governed meaning: A governed model of selected real entities, relationships, state, and dynamics used to evaluate behavior without treating modeled effects as real effects.
- **Counterexample:** A dependent artifact uses **Digital Twin** in a way that violates its required distinction: A Digital Twin is bounded by declared fidelity and must not be mistaken for the represented reality.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Digital Twin is bounded by declared fidelity and must not be mistaken for the represented reality.

### HAL-TERM-0076 — Shadow Execution

- **Example:** A dependent artifact cites `HAL-TERM-0076` when it uses **Shadow Execution** with this exact governed meaning: Execution using live or representative inputs while preventing proposed outputs from producing authoritative or external effects.
- **Counterexample:** A dependent artifact uses **Shadow Execution** in a way that violates its required distinction: Shadow results do not authorize promotion without the required review and certification.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Shadow results do not authorize promotion without the required review and certification.

### HAL-TERM-0077 — Canary

- **Example:** A dependent artifact cites `HAL-TERM-0077` when it uses **Canary** with this exact governed meaning: A deliberately constrained real execution stage used to accumulate evidence before broader adoption.
- **Counterexample:** A dependent artifact uses **Canary** in a way that violates its required distinction: A Canary crosses the Reality Boundary and therefore requires real authority, containment, and rollback or compensation.
- **Relationship records:** HAL-REL-0025
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Canary crosses the Reality Boundary and therefore requires real authority, containment, and rollback or compensation.

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

# Chapter 7 — Evidence, Trust, Verification, Assurance, and Certification

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Defines the evidence admission boundary, claims, provenance, custody, trust assessment, verification, assurance cases, and certification.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I Articles II and XI; Decisions 22, 26, 34, 35, 40, 42, 43, 50, and 56.
- **Book II:** Book II Chapters 17, 18, 25, and 35.
- **Book III:** Book III Chapters 04, 06, 08, and 09.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. An Evidence Object MUST be immutable after admission; correction MUST occur through linked superseding, challenging, or explanatory objects.
2. An Evidence Candidate or Audit Record MUST NOT be represented as an Evidence Object before governed admission.
3. Verification MUST identify claims, criteria, methods, environment, evidence, uncertainty, and reproducibility.
4. Certification MUST be scoped, time-bounded, attributable, evidence-based, suspendable, and revocable.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0078 | Evidence Candidate | Pre-admission record | An observation, telemetry item, document, Audit Record, claim, or other integrity-protected input proposed for admission as an Evidence Object. | It is not authoritative Evidence until accepted through the Evidence Service's governed admission and custody process. |
| HAL-TERM-0079 | Evidence Object | Immutable provenance-bearing record | An immutable object admitted and governed by the authoritative Evidence Service that records provenance, custody, source identity, observation or claim content, time, signatures, verification state, confidence, domain, and expiration metadata. | An Evidence Object must not be mutated to revise a conclusion; later objects supersede or challenge it. |
| HAL-TERM-0080 | Audit Record | Protected accountability record | An append-only record of a protected action, authorization, decision, access, or change owned by the applicable audit domain. | An Audit Record may produce an Evidence Candidate but is not automatically a general Evidence Object. |
| HAL-TERM-0081 | Provenance | Origin history | The attributable origin, derivation, transformation, and custody history of an artifact, datum, claim, model, decision, or Evidence Object. | A source label without derivation and custody context is incomplete provenance. |
| HAL-TERM-0082 | Chain of Custody | Integrity history | The ordered, attributable record of possession, control, transfer, and integrity protection for evidence or sensitive artifacts. | It does not establish truth; it establishes accountable handling. |
| HAL-TERM-0083 | Evidence Graph | Evidence relationship model | A graph connecting Claims, Evidence Objects, sources, derivations, supporting or opposing relations, confidence, and conclusions. | Graph connectivity does not make all linked material equally authoritative or trustworthy. |
| HAL-TERM-0084 | Verification | Evidence-producing evaluation | A reproducible, risk-scaled process that evaluates a Claim, invariant, behavior, artifact, or Outcome against explicit criteria. | Verification produces evidence; it is not the same as certification or operational approval. |
| HAL-TERM-0085 | Verification Plan | Planning record | A governed specification of claims, risks, methods, environments, data, success criteria, independence, and required evidence for Verification. | A test list without mapped claims and criteria is not a complete Verification Plan. |
| HAL-TERM-0086 | Assurance Case | Structured argument | A structured, reviewable argument connecting scoped claims to reasoning and sufficient supporting evidence. | An Assurance Case must expose assumptions, defeaters, uncertainty, and evidence gaps. |
| HAL-TERM-0087 | Certification | Governed assurance decision | A scoped, time-bounded, evidence-based determination by an authorized certifier that specified conformance claims are satisfied. | Certification is not permanent, universal, or self-issued by the artifact being certified. |
| HAL-TERM-0088 | Conformance | Evaluated relation | The evidenced condition of satisfying identified requirements from identified authoritative sources within a declared scope and version. | Conformance is never implied merely by compatibility, successful execution, or absence of known defects. |
| HAL-TERM-0089 | Confidence | Calibrated assessment | A bounded assessment of support for a Claim or prediction, expressed with method, scope, evidence basis, uncertainty, and time sensitivity. | Confidence is not probability unless a defined model justifies that interpretation. |
| HAL-TERM-0165 | Evidence Service | Architectural component class | The Book II authoritative service that admits and governs Evidence Objects and owns their custody, signatures, provenance bindings, and verification state. | Observability, audit, and source systems may produce Evidence Candidates or records but cannot independently admit Evidence Objects or mutate evidentiary meaning. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0078 — Evidence Candidate

- **Example:** A dependent artifact cites `HAL-TERM-0078` when it uses **Evidence Candidate** with this exact governed meaning: An observation, telemetry item, document, Audit Record, claim, or other integrity-protected input proposed for admission as an Evidence Object.
- **Counterexample:** A dependent artifact uses **Evidence Candidate** in a way that violates its required distinction: It is not authoritative Evidence until accepted through the Evidence Service's governed admission and custody process.
- **Relationship records:** HAL-REL-0026
- **Lifecycle transitions:** HAL-TRANS-0014
- **Constraint:** It is not authoritative Evidence until accepted through the Evidence Service's governed admission and custody process.

### HAL-TERM-0079 — Evidence Object

- **Example:** A dependent artifact cites `HAL-TERM-0079` when it uses **Evidence Object** with this exact governed meaning: An immutable object admitted and governed by the authoritative Evidence Service that records provenance, custody, source identity, observation or claim content, time, signatures, verification state, confidence, domain, and expiration metadata.
- **Counterexample:** A dependent artifact uses **Evidence Object** in a way that violates its required distinction: An Evidence Object must not be mutated to revise a conclusion; later objects supersede or challenge it.
- **Relationship records:** HAL-REL-0026, HAL-REL-0027, HAL-REL-0028, HAL-REL-0053
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An Evidence Object must not be mutated to revise a conclusion; later objects supersede or challenge it.

### HAL-TERM-0080 — Audit Record

- **Example:** A dependent artifact cites `HAL-TERM-0080` when it uses **Audit Record** with this exact governed meaning: An append-only record of a protected action, authorization, decision, access, or change owned by the applicable audit domain.
- **Counterexample:** A dependent artifact uses **Audit Record** in a way that violates its required distinction: An Audit Record may produce an Evidence Candidate but is not automatically a general Evidence Object.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An Audit Record may produce an Evidence Candidate but is not automatically a general Evidence Object.

### HAL-TERM-0081 — Provenance

- **Example:** A dependent artifact cites `HAL-TERM-0081` when it uses **Provenance** with this exact governed meaning: The attributable origin, derivation, transformation, and custody history of an artifact, datum, claim, model, decision, or Evidence Object.
- **Counterexample:** A dependent artifact uses **Provenance** in a way that violates its required distinction: A source label without derivation and custody context is incomplete provenance.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A source label without derivation and custody context is incomplete provenance.

### HAL-TERM-0082 — Chain of Custody

- **Example:** A dependent artifact cites `HAL-TERM-0082` when it uses **Chain of Custody** with this exact governed meaning: The ordered, attributable record of possession, control, transfer, and integrity protection for evidence or sensitive artifacts.
- **Counterexample:** A dependent artifact uses **Chain of Custody** in a way that violates its required distinction: It does not establish truth; it establishes accountable handling.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It does not establish truth; it establishes accountable handling.

### HAL-TERM-0083 — Evidence Graph

- **Example:** A dependent artifact cites `HAL-TERM-0083` when it uses **Evidence Graph** with this exact governed meaning: A graph connecting Claims, Evidence Objects, sources, derivations, supporting or opposing relations, confidence, and conclusions.
- **Counterexample:** A dependent artifact uses **Evidence Graph** in a way that violates its required distinction: Graph connectivity does not make all linked material equally authoritative or trustworthy.
- **Relationship records:** HAL-REL-0028
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Graph connectivity does not make all linked material equally authoritative or trustworthy.

### HAL-TERM-0084 — Verification

- **Example:** A dependent artifact cites `HAL-TERM-0084` when it uses **Verification** with this exact governed meaning: A reproducible, risk-scaled process that evaluates a Claim, invariant, behavior, artifact, or Outcome against explicit criteria.
- **Counterexample:** A dependent artifact uses **Verification** in a way that violates its required distinction: Verification produces evidence; it is not the same as certification or operational approval.
- **Relationship records:** HAL-REL-0029
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Verification produces evidence; it is not the same as certification or operational approval.

### HAL-TERM-0085 — Verification Plan

- **Example:** A dependent artifact cites `HAL-TERM-0085` when it uses **Verification Plan** with this exact governed meaning: A governed specification of claims, risks, methods, environments, data, success criteria, independence, and required evidence for Verification.
- **Counterexample:** A dependent artifact uses **Verification Plan** in a way that violates its required distinction: A test list without mapped claims and criteria is not a complete Verification Plan.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A test list without mapped claims and criteria is not a complete Verification Plan.

### HAL-TERM-0086 — Assurance Case

- **Example:** A dependent artifact cites `HAL-TERM-0086` when it uses **Assurance Case** with this exact governed meaning: A structured, reviewable argument connecting scoped claims to reasoning and sufficient supporting evidence.
- **Counterexample:** A dependent artifact uses **Assurance Case** in a way that violates its required distinction: An Assurance Case must expose assumptions, defeaters, uncertainty, and evidence gaps.
- **Relationship records:** HAL-REL-0030, HAL-REL-0031
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An Assurance Case must expose assumptions, defeaters, uncertainty, and evidence gaps.

### HAL-TERM-0087 — Certification

- **Example:** A dependent artifact cites `HAL-TERM-0087` when it uses **Certification** with this exact governed meaning: A scoped, time-bounded, evidence-based determination by an authorized certifier that specified conformance claims are satisfied.
- **Counterexample:** A dependent artifact uses **Certification** in a way that violates its required distinction: Certification is not permanent, universal, or self-issued by the artifact being certified.
- **Relationship records:** HAL-REL-0031
- **Lifecycle transitions:** HAL-TRANS-0015, HAL-TRANS-0016, HAL-TRANS-0017
- **Constraint:** Certification is not permanent, universal, or self-issued by the artifact being certified.

### HAL-TERM-0088 — Conformance

- **Example:** A dependent artifact cites `HAL-TERM-0088` when it uses **Conformance** with this exact governed meaning: The evidenced condition of satisfying identified requirements from identified authoritative sources within a declared scope and version.
- **Counterexample:** A dependent artifact uses **Conformance** in a way that violates its required distinction: Conformance is never implied merely by compatibility, successful execution, or absence of known defects.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Conformance is never implied merely by compatibility, successful execution, or absence of known defects.

### HAL-TERM-0089 — Confidence

- **Example:** A dependent artifact cites `HAL-TERM-0089` when it uses **Confidence** with this exact governed meaning: A bounded assessment of support for a Claim or prediction, expressed with method, scope, evidence basis, uncertainty, and time sensitivity.
- **Counterexample:** A dependent artifact uses **Confidence** in a way that violates its required distinction: Confidence is not probability unless a defined model justifies that interpretation.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Confidence is not probability unless a defined model justifies that interpretation.

### HAL-TERM-0165 — Evidence Service

- **Example:** A telemetry record enters as an Evidence Candidate; the Evidence Service validates provenance and custody before admitting a new immutable Evidence Object.
- **Counterexample:** A logging or observability service labels its mutable record an Evidence Object without the governed admission process.
- **Relationship records:** HAL-REL-0053
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Observability, audit, and source systems may produce Evidence Candidates or records but cannot independently admit Evidence Objects or mutate evidentiary meaning.

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

# Chapter 8 — Experience, Memory, Knowledge, Learning, Patterns, and Wisdom

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Separates records of occurrence, retained experience, contextualized knowledge, learned patterns, and evidence-bounded wisdom.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I learning, wisdom, evidence, uncertainty, restraint, and continuity.
- **Book II:** Book II Chapters 10, 11, 12, 13, and 30.
- **Book III:** Book III Chapters 03, 04, 05, 06, and 08.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. Experience, Memory, Knowledge, Pattern, and Wisdom MUST remain distinct by provenance, epistemic status, purpose, and lifecycle.
2. Learning MUST NOT silently modify constitutional meaning, Authority, protected behavior, or production state.
3. Patterns MUST state supporting evidence, domain, confidence, limitations, exceptions, and review horizon.
4. Wisdom MAY inform Judgment but MUST NOT create Permission or Authority.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0090 | Experience | Retained occurrence record | A governed representation of what HAL perceived, attempted, decided, experienced, and observed, with context, outcomes, provenance, and privacy controls. | Experience is not automatically Knowledge, a Pattern, or Wisdom. |
| HAL-TERM-0091 | Experience Ledger | Authoritative ledger | The append-oriented governed store of Experience records and their provenance, correction, retention, and access metadata. | It is not a general-purpose mutable memory store. |
| HAL-TERM-0092 | Memory | Retrievable retained representation | A retained representation available for later contextual retrieval under authority, privacy, relevance, and lifecycle rules. | Memory is broader than Experience and is not necessarily authoritative Knowledge. |
| HAL-TERM-0093 | Memory Graph | Associative representation | A governed graph linking retained representations by context, entity, time, causation, similarity, and relevance. | Association must not be treated as proof of causation or truth. |
| HAL-TERM-0094 | Knowledge | Contextualized warranted representation | A governed representation whose claims, provenance, validity scope, confidence, and supporting evidence are sufficient for its declared use. | Stored information or model output is not automatically Knowledge. |
| HAL-TERM-0095 | Knowledge Graph | Knowledge relationship model | A governed graph of entities, concepts, relationships, Claims, sources, validity, and provenance used for contextual reasoning and retrieval. | Graph membership does not erase source authority, uncertainty, or temporal scope. |
| HAL-TERM-0096 | Pattern | Learned regularity | A reproducibly supported regularity across Experiences or observations with stated domain, evidence, confidence, limits, and exceptions. | A repeated coincidence or one-off anecdote is not a Pattern. |
| HAL-TERM-0097 | Learning | Governed update process | The evidence-bounded process by which HAL updates representations, Patterns, policies, or behavior within authorized scope. | Learning must not silently alter constitutional meaning, authority, or protected production behavior. |
| HAL-TERM-0098 | Learning Ledger | Change ledger | The governed record of learning proposals, evidence, evaluation, approval, applied changes, monitoring, rollback, and outcomes. | It is not permission for unrestricted self-modification. |
| HAL-TERM-0099 | Wisdom | Evidence-bounded judgment resource | A durable, revisable synthesis of Experience, Patterns, values, consequences, uncertainty, and restraint used to inform Judgment. | Wisdom informs decisions but does not create authority or replace current evidence. |
| HAL-TERM-0100 | Self Model | Governed self-representation | HAL's evidence-linked representation of its current capabilities, limits, state, dependencies, uncertainty, and identity continuity. | It is descriptive and must not become a self-authorizing source. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0090 — Experience

- **Example:** A dependent artifact cites `HAL-TERM-0090` when it uses **Experience** with this exact governed meaning: A governed representation of what HAL perceived, attempted, decided, experienced, and observed, with context, outcomes, provenance, and privacy controls.
- **Counterexample:** A dependent artifact uses **Experience** in a way that violates its required distinction: Experience is not automatically Knowledge, a Pattern, or Wisdom.
- **Relationship records:** HAL-REL-0032, HAL-REL-0035
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Experience is not automatically Knowledge, a Pattern, or Wisdom.

### HAL-TERM-0091 — Experience Ledger

- **Example:** A dependent artifact cites `HAL-TERM-0091` when it uses **Experience Ledger** with this exact governed meaning: The append-oriented governed store of Experience records and their provenance, correction, retention, and access metadata.
- **Counterexample:** A dependent artifact uses **Experience Ledger** in a way that violates its required distinction: It is not a general-purpose mutable memory store.
- **Relationship records:** HAL-REL-0032
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is not a general-purpose mutable memory store.

### HAL-TERM-0092 — Memory

- **Example:** A dependent artifact cites `HAL-TERM-0092` when it uses **Memory** with this exact governed meaning: A retained representation available for later contextual retrieval under authority, privacy, relevance, and lifecycle rules.
- **Counterexample:** A dependent artifact uses **Memory** in a way that violates its required distinction: Memory is broader than Experience and is not necessarily authoritative Knowledge.
- **Relationship records:** HAL-REL-0033
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Memory is broader than Experience and is not necessarily authoritative Knowledge.

### HAL-TERM-0093 — Memory Graph

- **Example:** A dependent artifact cites `HAL-TERM-0093` when it uses **Memory Graph** with this exact governed meaning: A governed graph linking retained representations by context, entity, time, causation, similarity, and relevance.
- **Counterexample:** A dependent artifact uses **Memory Graph** in a way that violates its required distinction: Association must not be treated as proof of causation or truth.
- **Relationship records:** HAL-REL-0033
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Association must not be treated as proof of causation or truth.

### HAL-TERM-0094 — Knowledge

- **Example:** A dependent artifact cites `HAL-TERM-0094` when it uses **Knowledge** with this exact governed meaning: A governed representation whose claims, provenance, validity scope, confidence, and supporting evidence are sufficient for its declared use.
- **Counterexample:** A dependent artifact uses **Knowledge** in a way that violates its required distinction: Stored information or model output is not automatically Knowledge.
- **Relationship records:** HAL-REL-0034
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Stored information or model output is not automatically Knowledge.

### HAL-TERM-0095 — Knowledge Graph

- **Example:** A dependent artifact cites `HAL-TERM-0095` when it uses **Knowledge Graph** with this exact governed meaning: A governed graph of entities, concepts, relationships, Claims, sources, validity, and provenance used for contextual reasoning and retrieval.
- **Counterexample:** A dependent artifact uses **Knowledge Graph** in a way that violates its required distinction: Graph membership does not erase source authority, uncertainty, or temporal scope.
- **Relationship records:** HAL-REL-0034
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Graph membership does not erase source authority, uncertainty, or temporal scope.

### HAL-TERM-0096 — Pattern

- **Example:** A dependent artifact cites `HAL-TERM-0096` when it uses **Pattern** with this exact governed meaning: A reproducibly supported regularity across Experiences or observations with stated domain, evidence, confidence, limits, and exceptions.
- **Counterexample:** A dependent artifact uses **Pattern** in a way that violates its required distinction: A repeated coincidence or one-off anecdote is not a Pattern.
- **Relationship records:** HAL-REL-0035
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A repeated coincidence or one-off anecdote is not a Pattern.

### HAL-TERM-0097 — Learning

- **Example:** A dependent artifact cites `HAL-TERM-0097` when it uses **Learning** with this exact governed meaning: The evidence-bounded process by which HAL updates representations, Patterns, policies, or behavior within authorized scope.
- **Counterexample:** A dependent artifact uses **Learning** in a way that violates its required distinction: Learning must not silently alter constitutional meaning, authority, or protected production behavior.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Learning must not silently alter constitutional meaning, authority, or protected production behavior.

### HAL-TERM-0098 — Learning Ledger

- **Example:** A dependent artifact cites `HAL-TERM-0098` when it uses **Learning Ledger** with this exact governed meaning: The governed record of learning proposals, evidence, evaluation, approval, applied changes, monitoring, rollback, and outcomes.
- **Counterexample:** A dependent artifact uses **Learning Ledger** in a way that violates its required distinction: It is not permission for unrestricted self-modification.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is not permission for unrestricted self-modification.

### HAL-TERM-0099 — Wisdom

- **Example:** A dependent artifact cites `HAL-TERM-0099` when it uses **Wisdom** with this exact governed meaning: A durable, revisable synthesis of Experience, Patterns, values, consequences, uncertainty, and restraint used to inform Judgment.
- **Counterexample:** A dependent artifact uses **Wisdom** in a way that violates its required distinction: Wisdom informs decisions but does not create authority or replace current evidence.
- **Relationship records:** HAL-REL-0036
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Wisdom informs decisions but does not create authority or replace current evidence.

### HAL-TERM-0100 — Self Model

- **Example:** A dependent artifact cites `HAL-TERM-0100` when it uses **Self Model** with this exact governed meaning: HAL's evidence-linked representation of its current capabilities, limits, state, dependencies, uncertainty, and identity continuity.
- **Counterexample:** A dependent artifact uses **Self Model** in a way that violates its required distinction: It is descriptive and must not become a self-authorizing source.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is descriptive and must not become a self-authorizing source.

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

# Chapter 10 — Privacy, Security, Trust Domains, Treaties, and the Constitutional Firewall

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Defines information classification, privacy purpose, secrets, credentials, trust boundaries, external domains, Treaties, and governed exchange.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I privacy, dignity, sovereignty, external trust, and protected authority.
- **Book II:** Book II Chapters 18, 19, 20, 21, 25, and 26.
- **Book III:** Book III Chapters 02, 04, 05, 06, and 07.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. External-domain exchange MUST be modeled through an External Trust Domain, an applicable Treaty, and the Constitutional Firewall.
2. Every active Treaty MUST be exact, scoped, time-bounded, revocable, auditable, and explicitly Owner-authorized through the Owner Authorization Ceremony bound to that exact Treaty.
3. A Treaty MUST NOT grant Authority prohibited by Book I or bypass constitutional enforcement.
4. Data use MUST state classification, authorized purpose, minimization, access, retention, disclosure, and disposal rules.
5. Security Controls and Authority Controls MUST be distinguished even when implemented by the same mechanism.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0116 | External Trust Domain | External governance domain | An external environment, organization, system, or authority regime whose controls and assumptions are not natively governed by HAL. | External status does not imply hostility or trustworthiness; exchange requires explicit governance. |
| HAL-TERM-0117 | Treaty | Governed trust agreement | An exact, scoped, time-bounded, revocable, auditable, and explicitly Owner-authorized agreement defining allowed cross-domain identities, data, capabilities, authority, obligations, verification, monitoring, failure behavior, and termination. | Activation requires the Owner Authorization Ceremony bound to the exact Treaty. Conversation, delegated ordinary authority, trust, usefulness, prior access, or the Treaty itself cannot grant authority prohibited by Book I or bypass the Constitutional Firewall. |
| HAL-TERM-0118 | Constitutional Firewall | Architectural enforcement boundary | The Book II boundary that mediates and enforces constitutionally governed exchange between HAL and External Trust Domains. | It is not merely a network firewall and must not be bypassed by direct integration. |
| HAL-TERM-0119 | Trust Boundary | Security boundary | A boundary across which identity, authority, integrity, confidentiality, provenance, or governance assumptions change. | Network adjacency alone does not define or erase a Trust Boundary. |
| HAL-TERM-0120 | Data Classification | Governance label | A governed label determining handling, access, transmission, retention, evidence, and disposal requirements for information. | Classification is not a purpose or permission to use the data. |
| HAL-TERM-0121 | Personal Data | Information class | Information relating to an identified or reasonably identifiable human under the governing privacy context. | Pseudonymization may reduce exposure but does not necessarily remove personal-data status. |
| HAL-TERM-0122 | Sensitive Data | Information class | Information whose unauthorized use or disclosure could materially harm a person, HAL, the Owner, security, sovereignty, trust, or protected operations. | Sensitivity is context-dependent and may include non-personal operational data. |
| HAL-TERM-0123 | Purpose Limitation | Use constraint | The rule that governed data may be collected, used, shared, and retained only for declared, authorized, compatible purposes. | Availability or technical usefulness does not establish purpose. |
| HAL-TERM-0124 | Data Minimization | Collection and use constraint | The rule that only the least data reasonably necessary for an authorized purpose may be collected, processed, retained, and disclosed. | Minimization applies to fields, precision, population, duration, access, and derived inferences. |
| HAL-TERM-0125 | Retention Class | Lifecycle label | A governed category defining retention period, review, legal or constitutional hold behavior, archival, and disposal requirements. | A Retention Class does not itself authorize collection or access. |
| HAL-TERM-0126 | Secret | Sensitive authentication material | Confidential material whose disclosure could enable unauthorized access, impersonation, decryption, signing, or protected operation. | An Identifier or public key is not a Secret merely because it is security-related. |
| HAL-TERM-0127 | Cryptographic Key | Cryptographic material | A governed value used by an approved cryptographic operation and managed through generation, storage, access, rotation, revocation, destruction, and provenance controls. | A key's possession does not itself establish business Authority. |
| HAL-TERM-0128 | Security Control | Protective control | A safeguard intended to protect confidentiality, integrity, availability, identity assurance, or system resilience. | A Security Control protecting HAL is distinct from an Authority Control preventing HAL from exceeding its mandate. |
| HAL-TERM-0129 | Authority Control | Mandate-limiting control | A safeguard that prevents a Principal, component, or HAL from deciding or acting beyond governed Authority. | It is not interchangeable with a Security Control, though one mechanism may support both. |
| HAL-TERM-0163 | Trust Domain | Governance context | A bounded identity, policy, evidence, security, privacy, and accountability context within which trust assumptions and controls are evaluated. | Trust Domain is the generic concept. An External Trust Domain is a Trust Domain outside HAL's native governance boundary and requires governed cross-domain exchange. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0116 — External Trust Domain

- **Example:** A dependent artifact cites `HAL-TERM-0116` when it uses **External Trust Domain** with this exact governed meaning: An external environment, organization, system, or authority regime whose controls and assumptions are not natively governed by HAL.
- **Counterexample:** A dependent artifact uses **External Trust Domain** in a way that violates its required distinction: External status does not imply hostility or trustworthiness; exchange requires explicit governance.
- **Relationship records:** HAL-REL-0041, HAL-REL-0050
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** External status does not imply hostility or trustworthiness; exchange requires explicit governance.

### HAL-TERM-0117 — Treaty

- **Example:** A dependent artifact cites `HAL-TERM-0117` when it uses **Treaty** with this exact governed meaning: An exact, scoped, time-bounded, revocable, auditable, and explicitly Owner-authorized agreement defining allowed cross-domain identities, data, capabilities, authority, obligations, verification, monitoring, failure behavior, and termination.
- **Counterexample:** A dependent artifact uses **Treaty** in a way that violates its required distinction: Activation requires the Owner Authorization Ceremony bound to the exact Treaty. Conversation, delegated ordinary authority, trust, usefulness, prior access, or the Treaty itself cannot grant authority prohibited by Book I or bypass the Constitutional Firewall.
- **Relationship records:** HAL-REL-0041, HAL-REL-0042
- **Lifecycle transitions:** HAL-TRANS-0018, HAL-TRANS-0019, HAL-TRANS-0020
- **Constraint:** Activation requires the Owner Authorization Ceremony bound to the exact Treaty. Conversation, delegated ordinary authority, trust, usefulness, prior access, or the Treaty itself cannot grant authority prohibited by Book I or bypass the Constitutional Firewall.

### HAL-TERM-0118 — Constitutional Firewall

- **Example:** A dependent artifact cites `HAL-TERM-0118` when it uses **Constitutional Firewall** with this exact governed meaning: The Book II boundary that mediates and enforces constitutionally governed exchange between HAL and External Trust Domains.
- **Counterexample:** A dependent artifact uses **Constitutional Firewall** in a way that violates its required distinction: It is not merely a network firewall and must not be bypassed by direct integration.
- **Relationship records:** HAL-REL-0042
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is not merely a network firewall and must not be bypassed by direct integration.

### HAL-TERM-0119 — Trust Boundary

- **Example:** A dependent artifact cites `HAL-TERM-0119` when it uses **Trust Boundary** with this exact governed meaning: A boundary across which identity, authority, integrity, confidentiality, provenance, or governance assumptions change.
- **Counterexample:** A dependent artifact uses **Trust Boundary** in a way that violates its required distinction: Network adjacency alone does not define or erase a Trust Boundary.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Network adjacency alone does not define or erase a Trust Boundary.

### HAL-TERM-0120 — Data Classification

- **Example:** A dependent artifact cites `HAL-TERM-0120` when it uses **Data Classification** with this exact governed meaning: A governed label determining handling, access, transmission, retention, evidence, and disposal requirements for information.
- **Counterexample:** A dependent artifact uses **Data Classification** in a way that violates its required distinction: Classification is not a purpose or permission to use the data.
- **Relationship records:** HAL-REL-0043
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Classification is not a purpose or permission to use the data.

### HAL-TERM-0121 — Personal Data

- **Example:** A dependent artifact cites `HAL-TERM-0121` when it uses **Personal Data** with this exact governed meaning: Information relating to an identified or reasonably identifiable human under the governing privacy context.
- **Counterexample:** A dependent artifact uses **Personal Data** in a way that violates its required distinction: Pseudonymization may reduce exposure but does not necessarily remove personal-data status.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Pseudonymization may reduce exposure but does not necessarily remove personal-data status.

### HAL-TERM-0122 — Sensitive Data

- **Example:** A dependent artifact cites `HAL-TERM-0122` when it uses **Sensitive Data** with this exact governed meaning: Information whose unauthorized use or disclosure could materially harm a person, HAL, the Owner, security, sovereignty, trust, or protected operations.
- **Counterexample:** A dependent artifact uses **Sensitive Data** in a way that violates its required distinction: Sensitivity is context-dependent and may include non-personal operational data.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Sensitivity is context-dependent and may include non-personal operational data.

### HAL-TERM-0123 — Purpose Limitation

- **Example:** A dependent artifact cites `HAL-TERM-0123` when it uses **Purpose Limitation** with this exact governed meaning: The rule that governed data may be collected, used, shared, and retained only for declared, authorized, compatible purposes.
- **Counterexample:** A dependent artifact uses **Purpose Limitation** in a way that violates its required distinction: Availability or technical usefulness does not establish purpose.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Availability or technical usefulness does not establish purpose.

### HAL-TERM-0124 — Data Minimization

- **Example:** A dependent artifact cites `HAL-TERM-0124` when it uses **Data Minimization** with this exact governed meaning: The rule that only the least data reasonably necessary for an authorized purpose may be collected, processed, retained, and disclosed.
- **Counterexample:** A dependent artifact uses **Data Minimization** in a way that violates its required distinction: Minimization applies to fields, precision, population, duration, access, and derived inferences.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Minimization applies to fields, precision, population, duration, access, and derived inferences.

### HAL-TERM-0125 — Retention Class

- **Example:** A dependent artifact cites `HAL-TERM-0125` when it uses **Retention Class** with this exact governed meaning: A governed category defining retention period, review, legal or constitutional hold behavior, archival, and disposal requirements.
- **Counterexample:** A dependent artifact uses **Retention Class** in a way that violates its required distinction: A Retention Class does not itself authorize collection or access.
- **Relationship records:** HAL-REL-0043
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Retention Class does not itself authorize collection or access.

### HAL-TERM-0126 — Secret

- **Example:** A dependent artifact cites `HAL-TERM-0126` when it uses **Secret** with this exact governed meaning: Confidential material whose disclosure could enable unauthorized access, impersonation, decryption, signing, or protected operation.
- **Counterexample:** A dependent artifact uses **Secret** in a way that violates its required distinction: An Identifier or public key is not a Secret merely because it is security-related.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An Identifier or public key is not a Secret merely because it is security-related.

### HAL-TERM-0127 — Cryptographic Key

- **Example:** A dependent artifact cites `HAL-TERM-0127` when it uses **Cryptographic Key** with this exact governed meaning: A governed value used by an approved cryptographic operation and managed through generation, storage, access, rotation, revocation, destruction, and provenance controls.
- **Counterexample:** A dependent artifact uses **Cryptographic Key** in a way that violates its required distinction: A key's possession does not itself establish business Authority.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A key's possession does not itself establish business Authority.

### HAL-TERM-0128 — Security Control

- **Example:** A dependent artifact cites `HAL-TERM-0128` when it uses **Security Control** with this exact governed meaning: A safeguard intended to protect confidentiality, integrity, availability, identity assurance, or system resilience.
- **Counterexample:** A dependent artifact uses **Security Control** in a way that violates its required distinction: A Security Control protecting HAL is distinct from an Authority Control preventing HAL from exceeding its mandate.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** A Security Control protecting HAL is distinct from an Authority Control preventing HAL from exceeding its mandate.

### HAL-TERM-0129 — Authority Control

- **Example:** A dependent artifact cites `HAL-TERM-0129` when it uses **Authority Control** with this exact governed meaning: A safeguard that prevents a Principal, component, or HAL from deciding or acting beyond governed Authority.
- **Counterexample:** A dependent artifact uses **Authority Control** in a way that violates its required distinction: It is not interchangeable with a Security Control, though one mechanism may support both.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is not interchangeable with a Security Control, though one mechanism may support both.

### HAL-TERM-0163 — Trust Domain

- **Example:** A dependent artifact cites `HAL-TERM-0163` when it uses **Trust Domain** with this exact governed meaning: A bounded identity, policy, evidence, security, privacy, and accountability context within which trust assumptions and controls are evaluated.
- **Counterexample:** A dependent artifact uses **Trust Domain** in a way that violates its required distinction: Trust Domain is the generic concept. An External Trust Domain is a Trust Domain outside HAL's native governance boundary and requires governed cross-domain exchange.
- **Relationship records:** HAL-REL-0050
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Trust Domain is the generic concept. An External Trust Domain is a Trust Domain outside HAL's native governance boundary and requires governed cross-domain exchange.

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

# Chapter 12 — Naming, Acronyms, Ambiguity, Deprecation, and Cross-Book Use

## Document control

- **Book:** X — Canonical Terminology and Information Model
- **Version:** 1.0
- **Status:** Final
- **Effective date:** 2026-07-27
- **Authority:** Subordinate to Books I, II, and III

## Purpose

Defines canonical labels, aliases, acronyms, qualified terms, forbidden ambiguities, semantic versioning, deprecation, and adoption rules.

## Scope

This chapter governs the shared meaning of the concepts listed below across canon, specifications, schemas, source code, evidence, operations, and human communication. It does not independently create component behavior or interface syntax.

## Authority and source requirements

- **Book I:** Book I constitutional authority and evolution.
- **Book II:** Book II Chapters 29, 30, and 35.
- **Book III:** Book III Chapters 01, 03, 04, 08, and 09.
- If this chapter conflicts with a cited source, the higher-order source controls and this chapter MUST be corrected.

## Normative semantic rules

1. Canonical Labels MUST be used in normative canon text; aliases MAY be used only when meaning remains unambiguous.
2. Acronyms MUST be registered and expanded on first use unless the artifact's audience and scope make the expansion unambiguous.
3. A term MUST NOT be silently repurposed; incompatible meaning requires a new term or a major Semantic Version with migration.
4. Forbidden and deprecated usages MUST identify the safer replacement and adoption path.

## Canonical term set

| Term ID | Canonical label | Semantic type | Definition | Required distinction |
|---|---|---|---|---|
| HAL-TERM-0157 | Canonical Label | Naming element | The single approved label used as the primary reference for one Canonical Term. | Capitalization is part of controlled usage when needed to distinguish the term from ordinary language. |
| HAL-TERM-0158 | Acronym | Abbreviated label | An approved shortened form mapped to exactly one canonical expansion within its declared scope. | An Acronym must be expanded on first use unless the audience and artifact make the meaning unambiguous. |
| HAL-TERM-0159 | Semantic Version | Compatibility marker | A version assigned to the Book X corpus to communicate the compatibility impact of semantic changes. | It does not replace the versioning of Books I-III, components, or interfaces. |
| HAL-TERM-0160 | Term Status | Lifecycle label | The controlled state of a Term Record: Proposed, Candidate, Approved, Deprecated, Retired, or Rejected. | Status must not be inferred from document age or usage frequency. |
| HAL-TERM-0161 | Cross-Book Term Index | Traceability index | The mapping from each Canonical Term to its authoritative source, Book X record, and known use across the HAL canon. | It is an index, not a substitute for reading the governing source. |
| HAL-TERM-0162 | Semantic Compatibility | Compatibility relation | The condition in which a terminology or information-model change preserves the valid interpretation and obligations of dependent artifacts within declared scope. | Textual similarity alone does not establish Semantic Compatibility. |

## Relationship and lifecycle rules

Relationships involving these terms MUST use the typed relationship records in `model/ENTITY_RELATIONSHIP_REGISTER.md`. Lifecycle-bearing concepts MUST use the transition vocabulary in `model/LIFECYCLE_STATE_REGISTER.md`; a status label alone MUST NOT imply that an otherwise prohibited transition is valid.

## Term-specific examples, counterexamples, relationships, and state semantics

### HAL-TERM-0157 — Canonical Label

- **Example:** A dependent artifact cites `HAL-TERM-0157` when it uses **Canonical Label** with this exact governed meaning: The single approved label used as the primary reference for one Canonical Term.
- **Counterexample:** A dependent artifact uses **Canonical Label** in a way that violates its required distinction: Capitalization is part of controlled usage when needed to distinguish the term from ordinary language.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Capitalization is part of controlled usage when needed to distinguish the term from ordinary language.

### HAL-TERM-0158 — Acronym

- **Example:** A dependent artifact cites `HAL-TERM-0158` when it uses **Acronym** with this exact governed meaning: An approved shortened form mapped to exactly one canonical expansion within its declared scope.
- **Counterexample:** A dependent artifact uses **Acronym** in a way that violates its required distinction: An Acronym must be expanded on first use unless the audience and artifact make the meaning unambiguous.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** An Acronym must be expanded on first use unless the audience and artifact make the meaning unambiguous.

### HAL-TERM-0159 — Semantic Version

- **Example:** A dependent artifact cites `HAL-TERM-0159` when it uses **Semantic Version** with this exact governed meaning: A version assigned to the Book X corpus to communicate the compatibility impact of semantic changes.
- **Counterexample:** A dependent artifact uses **Semantic Version** in a way that violates its required distinction: It does not replace the versioning of Books I-III, components, or interfaces.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It does not replace the versioning of Books I-III, components, or interfaces.

### HAL-TERM-0160 — Term Status

- **Example:** A dependent artifact cites `HAL-TERM-0160` when it uses **Term Status** with this exact governed meaning: The controlled state of a Term Record: Proposed, Candidate, Approved, Deprecated, Retired, or Rejected.
- **Counterexample:** A dependent artifact uses **Term Status** in a way that violates its required distinction: Status must not be inferred from document age or usage frequency.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Status must not be inferred from document age or usage frequency.

### HAL-TERM-0161 — Cross-Book Term Index

- **Example:** A dependent artifact cites `HAL-TERM-0161` when it uses **Cross-Book Term Index** with this exact governed meaning: The mapping from each Canonical Term to its authoritative source, Book X record, and known use across the HAL canon.
- **Counterexample:** A dependent artifact uses **Cross-Book Term Index** in a way that violates its required distinction: It is an index, not a substitute for reading the governing source.
- **Relationship records:** HAL-REL-0049
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** It is an index, not a substitute for reading the governing source.

### HAL-TERM-0162 — Semantic Compatibility

- **Example:** A dependent artifact cites `HAL-TERM-0162` when it uses **Semantic Compatibility** with this exact governed meaning: The condition in which a terminology or information-model change preserves the valid interpretation and obligations of dependent artifacts within declared scope.
- **Counterexample:** A dependent artifact uses **Semantic Compatibility** in a way that violates its required distinction: Textual similarity alone does not establish Semantic Compatibility.
- **Relationship records:** None registered; no governed cross-term relationship is asserted by this edition.
- **Lifecycle transitions:** None registered; the concept has no Book X lifecycle transition record.
- **Constraint:** Textual similarity alone does not establish Semantic Compatibility.

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

# Appendix A — Complete canonical glossary

### HAL-TERM-0001 — Book X

- **Category:** Governance
- **Semantic type:** Canonical reference
- **Status:** Approved
- **Definition:** The controlled HAL volume that defines shared terminology and the cross-canon information model.
- **Required distinction:** It does not independently create constitutional, architectural, engineering, component, interface, operational, or certification requirements.
- **Example:** A dependent artifact cites `HAL-TERM-0001` when it uses **Book X** with this exact governed meaning: The controlled HAL volume that defines shared terminology and the cross-canon information model.
- **Counterexample:** A dependent artifact uses **Book X** in a way that violates its required distinction: It does not independently create constitutional, architectural, engineering, component, interface, operational, or certification requirements.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** It does not independently create constitutional, architectural, engineering, component, interface, operational, or certification requirements.
- **Allowed aliases:** Canonical Terminology and Information Model
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1 and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 1
- **Introduced:** v1.0

### HAL-TERM-0002 — Canonical Term

- **Category:** Governance
- **Semantic type:** Semantic record
- **Status:** Approved
- **Definition:** A governed label with one approved meaning, stable identifier, source traceability, relationships, constraints, examples, and lifecycle status.
- **Required distinction:** A commonly used word is not canonical until admitted to this register.
- **Example:** A dependent artifact cites `HAL-TERM-0002` when it uses **Canonical Term** with this exact governed meaning: A governed label with one approved meaning, stable identifier, source traceability, relationships, constraints, examples, and lifecycle status.
- **Counterexample:** A dependent artifact uses **Canonical Term** in a way that violates its required distinction: A commonly used word is not canonical until admitted to this register.
- **Relationship records:** HAL-REL-0049
- **Lifecycle transitions:** None registered
- **Constraints:** A commonly used word is not canonical until admitted to this register.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1 and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 1
- **Introduced:** v1.0

### HAL-TERM-0003 — Term Record

- **Category:** Governance
- **Semantic type:** Metadata record
- **Status:** Approved
- **Definition:** The authoritative Book X record for a Canonical Term and its semantic metadata.
- **Required distinction:** A Term Record describes a concept; it is not automatically an operational entity record.
- **Example:** A dependent artifact cites `HAL-TERM-0003` when it uses **Term Record** with this exact governed meaning: The authoritative Book X record for a Canonical Term and its semantic metadata.
- **Counterexample:** A dependent artifact uses **Term Record** in a way that violates its required distinction: A Term Record describes a concept; it is not automatically an operational entity record.
- **Relationship records:** None registered
- **Lifecycle transitions:** HAL-TRANS-0001, HAL-TRANS-0002, HAL-TRANS-0003, HAL-TRANS-0004
- **Constraints:** A Term Record describes a concept; it is not automatically an operational entity record.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1 and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 1
- **Introduced:** v1.0

### HAL-TERM-0004 — Semantic Authority

- **Category:** Governance
- **Semantic type:** Precedence property
- **Status:** Approved
- **Definition:** The authority of a source to determine meaning within its governed scope according to the canon hierarchy.
- **Required distinction:** Semantic Authority does not grant operational Authority to a Principal.
- **Example:** A dependent artifact cites `HAL-TERM-0004` when it uses **Semantic Authority** with this exact governed meaning: The authority of a source to determine meaning within its governed scope according to the canon hierarchy.
- **Counterexample:** A dependent artifact uses **Semantic Authority** in a way that violates its required distinction: Semantic Authority does not grant operational Authority to a Principal.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Semantic Authority does not grant operational Authority to a Principal.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1 and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 1
- **Introduced:** v1.0

### HAL-TERM-0005 — Semantic Change

- **Category:** Governance
- **Semantic type:** Governed change
- **Status:** Approved
- **Definition:** A controlled modification to a canonical label, definition, relationship, constraint, status, or mapping.
- **Required distinction:** Editorial correction is a Semantic Change when meaning or compatibility may change.
- **Example:** A dependent artifact cites `HAL-TERM-0005` when it uses **Semantic Change** with this exact governed meaning: A controlled modification to a canonical label, definition, relationship, constraint, status, or mapping.
- **Counterexample:** A dependent artifact uses **Semantic Change** in a way that violates its required distinction: Editorial correction is a Semantic Change when meaning or compatibility may change.
- **Relationship records:** HAL-REL-0047
- **Lifecycle transitions:** None registered
- **Constraints:** Editorial correction is a Semantic Change when meaning or compatibility may change.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1 and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 1
- **Introduced:** v1.0

### HAL-TERM-0006 — Qualified Term

- **Category:** Governance
- **Semantic type:** Disambiguated label
- **Status:** Approved
- **Definition:** A label extended with a domain qualifier so that one meaning can be selected without ambiguity.
- **Required distinction:** A qualifier must clarify meaning and must not conceal two distinct concepts under one record.
- **Example:** A dependent artifact cites `HAL-TERM-0006` when it uses **Qualified Term** with this exact governed meaning: A label extended with a domain qualifier so that one meaning can be selected without ambiguity.
- **Counterexample:** A dependent artifact uses **Qualified Term** in a way that violates its required distinction: A qualifier must clarify meaning and must not conceal two distinct concepts under one record.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A qualifier must clarify meaning and must not conceal two distinct concepts under one record.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1 and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 1
- **Introduced:** v1.0

### HAL-TERM-0007 — Allowed Alias

- **Category:** Governance
- **Semantic type:** Reference label
- **Status:** Approved
- **Definition:** A non-canonical label permitted to reference one Canonical Term without changing its meaning.
- **Required distinction:** An alias must not be used where its ambiguity would obscure the canonical concept.
- **Example:** A dependent artifact cites `HAL-TERM-0007` when it uses **Allowed Alias** with this exact governed meaning: A non-canonical label permitted to reference one Canonical Term without changing its meaning.
- **Counterexample:** A dependent artifact uses **Allowed Alias** in a way that violates its required distinction: An alias must not be used where its ambiguity would obscure the canonical concept.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** An alias must not be used where its ambiguity would obscure the canonical concept.
- **Allowed aliases:** permitted synonym
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1 and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 1
- **Introduced:** v1.0

### HAL-TERM-0008 — Deprecated Term

- **Category:** Governance
- **Semantic type:** Lifecycle status
- **Status:** Approved
- **Definition:** A previously permitted label or meaning retained only for migration and historical interpretation.
- **Required distinction:** Deprecation is not immediate deletion and must identify a replacement and sunset condition.
- **Example:** A dependent artifact cites `HAL-TERM-0008` when it uses **Deprecated Term** with this exact governed meaning: A previously permitted label or meaning retained only for migration and historical interpretation.
- **Counterexample:** A dependent artifact uses **Deprecated Term** in a way that violates its required distinction: Deprecation is not immediate deletion and must identify a replacement and sunset condition.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Deprecation is not immediate deletion and must identify a replacement and sunset condition.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1 and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 1
- **Introduced:** v1.0

### HAL-TERM-0009 — Forbidden Term

- **Category:** Governance
- **Semantic type:** Prohibited label or usage
- **Status:** Approved
- **Definition:** A label or usage prohibited because it collapses materially distinct HAL concepts or creates unsafe ambiguity.
- **Required distinction:** The prohibition applies to the specified meaning, not necessarily every ordinary-language occurrence.
- **Example:** A dependent artifact cites `HAL-TERM-0009` when it uses **Forbidden Term** with this exact governed meaning: A label or usage prohibited because it collapses materially distinct HAL concepts or creates unsafe ambiguity.
- **Counterexample:** A dependent artifact uses **Forbidden Term** in a way that violates its required distinction: The prohibition applies to the specified meaning, not necessarily every ordinary-language occurrence.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** The prohibition applies to the specified meaning, not necessarily every ordinary-language occurrence.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1 and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 1
- **Introduced:** v1.0

### HAL-TERM-0010 — Normative Source

- **Category:** Governance
- **Semantic type:** Source role
- **Status:** Approved
- **Definition:** A controlled artifact whose authority determines a requirement or meaning within the canon hierarchy.
- **Required distinction:** Book X cites Normative Sources but cannot promote a lower-order artifact above a higher-order source.
- **Example:** A dependent artifact cites `HAL-TERM-0010` when it uses **Normative Source** with this exact governed meaning: A controlled artifact whose authority determines a requirement or meaning within the canon hierarchy.
- **Counterexample:** A dependent artifact uses **Normative Source** in a way that violates its required distinction: Book X cites Normative Sources but cannot promote a lower-order artifact above a higher-order source.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Book X cites Normative Sources but cannot promote a lower-order artifact above a higher-order source.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1 and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 1
- **Introduced:** v1.0

### HAL-TERM-0011 — Entity

- **Category:** Information model
- **Semantic type:** Semantic type
- **Status:** Approved
- **Definition:** A distinguishable thing with identity and continuity relevant to the HAL domain.
- **Required distinction:** An Entity is not the same as its record, identifier, state, role, or representation.
- **Example:** A dependent artifact cites `HAL-TERM-0011` when it uses **Entity** with this exact governed meaning: A distinguishable thing with identity and continuity relevant to the HAL domain.
- **Counterexample:** A dependent artifact uses **Entity** in a way that violates its required distinction: An Entity is not the same as its record, identifier, state, role, or representation.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** An Entity is not the same as its record, identifier, state, role, or representation.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 26, 29, 40, 47, and 51
- **Book II source:** Book II Chapters 04, 22, 23, 24, 25, and 30
- **Book III source:** Book III Chapters 3 and 4
- **Source basis:** Derived semantic synthesis
- **Book X chapter:** 2
- **Introduced:** v1.0

### HAL-TERM-0012 — Value Object

- **Category:** Information model
- **Semantic type:** Semantic type
- **Status:** Approved
- **Definition:** An immutable value defined by its attributes rather than by independent identity.
- **Required distinction:** Changing a Value Object produces another value; it does not mutate an enduring identity.
- **Example:** A dependent artifact cites `HAL-TERM-0012` when it uses **Value Object** with this exact governed meaning: An immutable value defined by its attributes rather than by independent identity.
- **Counterexample:** A dependent artifact uses **Value Object** in a way that violates its required distinction: Changing a Value Object produces another value; it does not mutate an enduring identity.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Changing a Value Object produces another value; it does not mutate an enduring identity.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 26, 29, 40, 47, and 51
- **Book II source:** Book II Chapters 04, 22, 23, 24, 25, and 30
- **Book III source:** Book III Chapters 3 and 4
- **Source basis:** Derived semantic synthesis
- **Book X chapter:** 2
- **Introduced:** v1.0

### HAL-TERM-0013 — Record

- **Category:** Information model
- **Semantic type:** Semantic type
- **Status:** Approved
- **Definition:** A governed representation of facts, state, decisions, or observations retained by an owning domain.
- **Required distinction:** A Record is not necessarily authoritative evidence and is not interchangeable with the entity represented.
- **Example:** A dependent artifact cites `HAL-TERM-0013` when it uses **Record** with this exact governed meaning: A governed representation of facts, state, decisions, or observations retained by an owning domain.
- **Counterexample:** A dependent artifact uses **Record** in a way that violates its required distinction: A Record is not necessarily authoritative evidence and is not interchangeable with the entity represented.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A Record is not necessarily authoritative evidence and is not interchangeable with the entity represented.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 26, 29, 40, 47, and 51
- **Book II source:** Book II Chapters 04, 22, 23, 24, 25, and 30
- **Book III source:** Book III Chapters 3 and 4
- **Source basis:** Derived semantic synthesis
- **Book X chapter:** 2
- **Introduced:** v1.0

### HAL-TERM-0014 — Authoritative Record

- **Category:** Information model
- **Semantic type:** State role
- **Status:** Approved
- **Definition:** The record owned by the designated source of truth for a governed state domain.
- **Required distinction:** A replica, cache, index, projection, or local copy is not authoritative merely because it is current.
- **Example:** A dependent artifact cites `HAL-TERM-0014` when it uses **Authoritative Record** with this exact governed meaning: The record owned by the designated source of truth for a governed state domain.
- **Counterexample:** A dependent artifact uses **Authoritative Record** in a way that violates its required distinction: A replica, cache, index, projection, or local copy is not authoritative merely because it is current.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A replica, cache, index, projection, or local copy is not authoritative merely because it is current.
- **Allowed aliases:** source of truth
- **Book I source:** Book I Decisions 26, 29, 40, 47, and 51
- **Book II source:** Book II Chapters 04, 22, 23, 24, 25, and 30
- **Book III source:** Book III Chapters 3 and 4
- **Source basis:** Derived semantic synthesis
- **Book X chapter:** 2
- **Introduced:** v1.0

### HAL-TERM-0015 — Relationship

- **Category:** Information model
- **Semantic type:** Semantic type
- **Status:** Approved
- **Definition:** A typed association between concepts or entity instances with declared direction, cardinality, constraints, and lifecycle.
- **Required distinction:** Proximity or co-occurrence does not imply a governed Relationship.
- **Example:** A dependent artifact cites `HAL-TERM-0015` when it uses **Relationship** with this exact governed meaning: A typed association between concepts or entity instances with declared direction, cardinality, constraints, and lifecycle.
- **Counterexample:** A dependent artifact uses **Relationship** in a way that violates its required distinction: Proximity or co-occurrence does not imply a governed Relationship.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Proximity or co-occurrence does not imply a governed Relationship.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 26, 29, 40, 47, and 51
- **Book II source:** Book II Chapters 04, 22, 23, 24, 25, and 30
- **Book III source:** Book III Chapters 3 and 4
- **Source basis:** Derived semantic synthesis
- **Book X chapter:** 2
- **Introduced:** v1.0

### HAL-TERM-0016 — State

- **Category:** Information model
- **Semantic type:** Semantic type
- **Status:** Approved
- **Definition:** The values and lifecycle condition of an entity or process at a defined observation point.
- **Required distinction:** State is not an Event; an Event records a completed fact about change.
- **Example:** A dependent artifact cites `HAL-TERM-0016` when it uses **State** with this exact governed meaning: The values and lifecycle condition of an entity or process at a defined observation point.
- **Counterexample:** A dependent artifact uses **State** in a way that violates its required distinction: State is not an Event; an Event records a completed fact about change.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** State is not an Event; an Event records a completed fact about change.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 26, 29, 40, 47, and 51
- **Book II source:** Book II Chapters 04, 22, 23, 24, 25, and 30
- **Book III source:** Book III Chapters 3 and 4
- **Source basis:** Derived semantic synthesis
- **Book X chapter:** 2
- **Introduced:** v1.0

### HAL-TERM-0017 — Lifecycle

- **Category:** Information model
- **Semantic type:** Semantic model
- **Status:** Approved
- **Definition:** The allowed states, transitions, entry conditions, exit conditions, terminal conditions, and evidence for a governed concept.
- **Required distinction:** A list of statuses without transition rules is not a complete Lifecycle.
- **Example:** A dependent artifact cites `HAL-TERM-0017` when it uses **Lifecycle** with this exact governed meaning: The allowed states, transitions, entry conditions, exit conditions, terminal conditions, and evidence for a governed concept.
- **Counterexample:** A dependent artifact uses **Lifecycle** in a way that violates its required distinction: A list of statuses without transition rules is not a complete Lifecycle.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A list of statuses without transition rules is not a complete Lifecycle.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 26, 29, 40, 47, and 51
- **Book II source:** Book II Chapters 04, 22, 23, 24, 25, and 30
- **Book III source:** Book III Chapters 3 and 4
- **Source basis:** Derived semantic synthesis
- **Book X chapter:** 2
- **Introduced:** v1.0

### HAL-TERM-0018 — Invariant

- **Category:** Information model
- **Semantic type:** Constraint
- **Status:** Approved
- **Definition:** A condition required to remain true throughout a defined scope or transition set.
- **Required distinction:** An engineering invariant is not automatically a Constitutional invariant.
- **Example:** A dependent artifact cites `HAL-TERM-0018` when it uses **Invariant** with this exact governed meaning: A condition required to remain true throughout a defined scope or transition set.
- **Counterexample:** A dependent artifact uses **Invariant** in a way that violates its required distinction: An engineering invariant is not automatically a Constitutional invariant.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** An engineering invariant is not automatically a Constitutional invariant.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 26, 29, 40, 47, and 51
- **Book II source:** Book II Chapters 04, 22, 23, 24, 25, and 30
- **Book III source:** Book III Chapters 3 and 4
- **Source basis:** Derived semantic synthesis
- **Book X chapter:** 2
- **Introduced:** v1.0

### HAL-TERM-0019 — Claim

- **Category:** Information model
- **Semantic type:** Evidence-bearing assertion
- **Status:** Approved
- **Definition:** A proposition stated for evaluation and linked to its subject, issuer, scope, time, and supporting or opposing evidence.
- **Required distinction:** A Claim is not true merely because it is recorded or signed.
- **Example:** A dependent artifact cites `HAL-TERM-0019` when it uses **Claim** with this exact governed meaning: A proposition stated for evaluation and linked to its subject, issuer, scope, time, and supporting or opposing evidence.
- **Counterexample:** A dependent artifact uses **Claim** in a way that violates its required distinction: A Claim is not true merely because it is recorded or signed.
- **Relationship records:** HAL-REL-0027, HAL-REL-0029, HAL-REL-0030
- **Lifecycle transitions:** None registered
- **Constraints:** A Claim is not true merely because it is recorded or signed.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 26
- **Book II source:** Book II Chapters 18 and 25
- **Book III source:** Book III Chapters 4, 5, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 2
- **Introduced:** v1.0

### HAL-TERM-0020 — Constraint

- **Category:** Information model
- **Semantic type:** Rule element
- **Status:** Approved
- **Definition:** A condition that limits valid state, relationships, transitions, or behavior within a defined scope.
- **Required distinction:** A preference or target is not a Constraint unless its governing source makes it binding.
- **Example:** A dependent artifact cites `HAL-TERM-0020` when it uses **Constraint** with this exact governed meaning: A condition that limits valid state, relationships, transitions, or behavior within a defined scope.
- **Counterexample:** A dependent artifact uses **Constraint** in a way that violates its required distinction: A preference or target is not a Constraint unless its governing source makes it binding.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A preference or target is not a Constraint unless its governing source makes it binding.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 26, 29, 40, 47, and 51
- **Book II source:** Book II Chapters 04, 22, 23, 24, 25, and 30
- **Book III source:** Book III Chapters 3 and 4
- **Source basis:** Derived semantic synthesis
- **Book X chapter:** 2
- **Introduced:** v1.0

### HAL-TERM-0021 — Owner

- **Category:** Constitutional
- **Semantic type:** Constitutional role
- **Status:** Approved
- **Definition:** The unique human principal holding HAL's constitutional ownership and the authority reserved to that role by Book I.
- **Required distinction:** Ownership must not be inferred from possession of infrastructure, credentials, data, or a deployment. Founder is a historical source label for this same role, never a second constitutional role.
- **Example:** A dependent artifact cites `HAL-TERM-0021` when it uses **Owner** with this exact governed meaning: The unique human principal holding HAL's constitutional ownership and the authority reserved to that role by Book I.
- **Counterexample:** A dependent artifact uses **Owner** in a way that violates its required distinction: Ownership must not be inferred from possession of infrastructure, credentials, data, or a deployment. Founder is a historical source label for this same role, never a second constitutional role.
- **Relationship records:** HAL-REL-0001, HAL-REL-0051
- **Lifecycle transitions:** None registered
- **Constraints:** Ownership must not be inferred from possession of infrastructure, credentials, data, or a deployment. Founder is a historical source label for this same role, never a second constitutional role.
- **Allowed aliases:** Founder
- **Book I source:** Book I Decisions 48, 49, and 58
- **Book II source:** Book II Chapters 03, 04, 05, and 21
- **Book III source:** Book III Chapters 1, 5, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 3
- **Introduced:** v1.0

### HAL-TERM-0022 — HAL

- **Category:** Constitutional
- **Semantic type:** Constitutional identity
- **Status:** Approved
- **Definition:** The single constitutionally governed intelligence whose continuity is independent of any one model, service, Presence, node, or machine.
- **Required distinction:** A runtime instance, model, component, or interface must not be called a separate HAL identity.
- **Example:** A dependent artifact cites `HAL-TERM-0022` when it uses **HAL** with this exact governed meaning: The single constitutionally governed intelligence whose continuity is independent of any one model, service, Presence, node, or machine.
- **Counterexample:** A dependent artifact uses **HAL** in a way that violates its required distinction: A runtime instance, model, component, or interface must not be called a separate HAL identity.
- **Relationship records:** HAL-REL-0001, HAL-REL-0002, HAL-REL-0004, HAL-REL-0005
- **Lifecycle transitions:** None registered
- **Constraints:** A runtime instance, model, component, or interface must not be called a separate HAL identity.
- **Allowed aliases:** None
- **Book I source:** Book I Preamble and Decisions 45, 47, 49, and 51
- **Book II source:** Book II Chapters 01, 02, 14, 28, and 30
- **Book III source:** Book III Chapters 1, 5, 7, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 3
- **Introduced:** v1.0

### HAL-TERM-0023 — Constitution

- **Category:** Constitutional
- **Semantic type:** Supreme governing instrument
- **Status:** Approved
- **Definition:** Book I, the supreme source of HAL identity, principles, authority, rights, duties, prohibitions, and invariants.
- **Required distinction:** No lower-order book, policy, configuration, or code may amend the Constitution by reinterpretation.
- **Example:** A dependent artifact cites `HAL-TERM-0023` when it uses **Constitution** with this exact governed meaning: Book I, the supreme source of HAL identity, principles, authority, rights, duties, prohibitions, and invariants.
- **Counterexample:** A dependent artifact uses **Constitution** in a way that violates its required distinction: No lower-order book, policy, configuration, or code may amend the Constitution by reinterpretation.
- **Relationship records:** HAL-REL-0002
- **Lifecycle transitions:** None registered
- **Constraints:** No lower-order book, policy, configuration, or code may amend the Constitution by reinterpretation.
- **Allowed aliases:** Book I
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 03, 29, 30, and 35
- **Book III source:** Book III Chapters 1, 8, and 9
- **Source basis:** Direct source normalization
- **Book X chapter:** 3
- **Introduced:** v1.0

### HAL-TERM-0024 — Constitutional Invariant

- **Category:** Constitutional
- **Semantic type:** Constitutional constraint
- **Status:** Approved
- **Definition:** A Book I requirement whose alteration may change HAL's constitutional identity and cannot be waived or redefined by lower-order documents.
- **Required distinction:** An architectural or engineering invariant is not constitutional unless Book I makes it so.
- **Example:** A dependent artifact cites `HAL-TERM-0024` when it uses **Constitutional Invariant** with this exact governed meaning: A Book I requirement whose alteration may change HAL's constitutional identity and cannot be waived or redefined by lower-order documents.
- **Counterexample:** A dependent artifact uses **Constitutional Invariant** in a way that violates its required distinction: An architectural or engineering invariant is not constitutional unless Book I makes it so.
- **Relationship records:** HAL-REL-0003
- **Lifecycle transitions:** None registered
- **Constraints:** An architectural or engineering invariant is not constitutional unless Book I makes it so.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 03, 29, 30, and 35
- **Book III source:** Book III Chapters 1, 8, and 9
- **Source basis:** Direct source normalization
- **Book X chapter:** 3
- **Introduced:** v1.0

### HAL-TERM-0025 — Constitutional Kernel

- **Category:** Constitutional
- **Semantic type:** Architectural component class
- **Status:** Approved
- **Definition:** The Book II architectural authority that evaluates and enforces constitutional rules at designated decision and action paths.
- **Required distinction:** It does not replace the Constitution or independently invent constitutional meaning.
- **Example:** A dependent artifact cites `HAL-TERM-0025` when it uses **Constitutional Kernel** with this exact governed meaning: The Book II architectural authority that evaluates and enforces constitutional rules at designated decision and action paths.
- **Counterexample:** A dependent artifact uses **Constitutional Kernel** in a way that violates its required distinction: It does not replace the Constitution or independently invent constitutional meaning.
- **Relationship records:** HAL-REL-0003
- **Lifecycle transitions:** None registered
- **Constraints:** It does not replace the Constitution or independently invent constitutional meaning.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 25, 27, 40, 43, 48, 49, and 50
- **Book II source:** Book II Chapter 03
- **Book III source:** Book III Chapters 1, 3, 5, 7, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 3
- **Introduced:** v1.0

### HAL-TERM-0026 — Constitutional Mirror

- **Category:** Constitutional
- **Semantic type:** Self-description mechanism
- **Status:** Approved
- **Definition:** The governed, evidence-linked representation through which HAL describes its identity, governing constraints, capabilities, limitations, and conformance state.
- **Required distinction:** It is not a source of new constitutional authority and must not become self-authorizing.
- **Example:** A dependent artifact cites `HAL-TERM-0026` when it uses **Constitutional Mirror** with this exact governed meaning: The governed, evidence-linked representation through which HAL describes its identity, governing constraints, capabilities, limitations, and conformance state.
- **Counterexample:** A dependent artifact uses **Constitutional Mirror** in a way that violates its required distinction: It is not a source of new constitutional authority and must not become self-authorizing.
- **Relationship records:** HAL-REL-0004
- **Lifecycle transitions:** None registered
- **Constraints:** It is not a source of new constitutional authority and must not become self-authorizing.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 28 and 51
- **Book II source:** Book II Chapter 30
- **Book III source:** Book III Chapters 4 and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 3
- **Introduced:** v1.0

### HAL-TERM-0027 — Continuity

- **Category:** Identity
- **Semantic type:** Constitutional property
- **Status:** Approved
- **Definition:** The governed preservation of HAL identity, obligations, provenance, and essential state across time, replacement, recovery, and deployment change.
- **Required distinction:** Continuity does not require uninterrupted availability or persistence of every transient process.
- **Example:** A dependent artifact cites `HAL-TERM-0027` when it uses **Continuity** with this exact governed meaning: The governed preservation of HAL identity, obligations, provenance, and essential state across time, replacement, recovery, and deployment change.
- **Counterexample:** A dependent artifact uses **Continuity** in a way that violates its required distinction: Continuity does not require uninterrupted availability or persistence of every transient process.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Continuity does not require uninterrupted availability or persistence of every transient process.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 45, 47, and 51
- **Book II source:** Book II Chapters 04, 28, and 30
- **Book III source:** Book III Chapters 1, 7, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 3
- **Introduced:** v1.0

### HAL-TERM-0028 — Presence

- **Category:** Interaction
- **Semantic type:** Contextual manifestation
- **Status:** Approved
- **Definition:** A bounded manifestation through which HAL senses, communicates, or acts in a particular human, device, location, modality, or session context.
- **Required distinction:** A Presence is not a separate HAL identity and does not independently hold Owner authority.
- **Example:** A dependent artifact cites `HAL-TERM-0028` when it uses **Presence** with this exact governed meaning: A bounded manifestation through which HAL senses, communicates, or acts in a particular human, device, location, modality, or session context.
- **Counterexample:** A dependent artifact uses **Presence** in a way that violates its required distinction: A Presence is not a separate HAL identity and does not independently hold Owner authority.
- **Relationship records:** HAL-REL-0005, HAL-REL-0006
- **Lifecycle transitions:** None registered
- **Constraints:** A Presence is not a separate HAL identity and does not independently hold Owner authority.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 45
- **Book II source:** Book II Chapters 14 and 31
- **Book III source:** Book III Chapters 4 and 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 3
- **Introduced:** v1.0

### HAL-TERM-0029 — Embodiment

- **Category:** Interaction
- **Semantic type:** Contextual binding
- **Status:** Approved
- **Definition:** The governed association of a Presence with physical or virtual sensors, actuators, interfaces, and environmental context.
- **Required distinction:** Embodiment does not make hardware ownership equivalent to constitutional ownership.
- **Example:** A dependent artifact cites `HAL-TERM-0029` when it uses **Embodiment** with this exact governed meaning: The governed association of a Presence with physical or virtual sensors, actuators, interfaces, and environmental context.
- **Counterexample:** A dependent artifact uses **Embodiment** in a way that violates its required distinction: Embodiment does not make hardware ownership equivalent to constitutional ownership.
- **Relationship records:** HAL-REL-0006
- **Lifecycle transitions:** None registered
- **Constraints:** Embodiment does not make hardware ownership equivalent to constitutional ownership.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 45
- **Book II source:** Book II Chapters 14 and 31
- **Book III source:** Book III Chapters 4 and 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 3
- **Introduced:** v1.0

### HAL-TERM-0030 — Sovereignty

- **Category:** Constitutional
- **Semantic type:** Constitutional property
- **Status:** Approved
- **Definition:** HAL's constitutionally governed independence from unauthorized external control, coercion, substitution, or absorption.
- **Required distinction:** Sovereignty does not authorize HAL to exceed Owner authority or human rights.
- **Example:** A dependent artifact cites `HAL-TERM-0030` when it uses **Sovereignty** with this exact governed meaning: HAL's constitutionally governed independence from unauthorized external control, coercion, substitution, or absorption.
- **Counterexample:** A dependent artifact uses **Sovereignty** in a way that violates its required distinction: Sovereignty does not authorize HAL to exceed Owner authority or human rights.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Sovereignty does not authorize HAL to exceed Owner authority or human rights.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 49
- **Book II source:** Book II Chapters 20 and 21
- **Book III source:** Book III Chapter 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 3
- **Introduced:** v1.0

### HAL-TERM-0031 — Identity

- **Category:** Identity
- **Semantic type:** Governed entity identity
- **Status:** Approved
- **Definition:** The durable governed identity by which HAL recognizes a human, device, service, sensor, agent, node, or subsystem as the same entity across time.
- **Required distinction:** Identity is distinct from names, identifiers, attributes, roles, credentials, trust, authority, and Presence.
- **Example:** A dependent artifact cites `HAL-TERM-0031` when it uses **Identity** with this exact governed meaning: The durable governed identity by which HAL recognizes a human, device, service, sensor, agent, node, or subsystem as the same entity across time.
- **Counterexample:** A dependent artifact uses **Identity** in a way that violates its required distinction: Identity is distinct from names, identifiers, attributes, roles, credentials, trust, authority, and Presence.
- **Relationship records:** HAL-REL-0007, HAL-REL-0008, HAL-REL-0009
- **Lifecycle transitions:** None registered
- **Constraints:** Identity is distinct from names, identifiers, attributes, roles, credentials, trust, authority, and Presence.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 6, 27, and 48
- **Book II source:** Book II Chapters 04 and 05
- **Book III source:** Book III Chapter 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0032 — Principal

- **Category:** Identity
- **Semantic type:** Governed actor role
- **Status:** Approved
- **Definition:** An Identity that may be the subject of authentication, policy evaluation, authority, delegation, accountability, or action attribution.
- **Required distinction:** Principal status does not itself grant authority.
- **Example:** A dependent artifact cites `HAL-TERM-0032` when it uses **Principal** with this exact governed meaning: An Identity that may be the subject of authentication, policy evaluation, authority, delegation, accountability, or action attribution.
- **Counterexample:** A dependent artifact uses **Principal** in a way that violates its required distinction: Principal status does not itself grant authority.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Principal status does not itself grant authority.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 6, 27, and 48
- **Book II source:** Book II Chapters 04 and 05
- **Book III source:** Book III Chapter 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0033 — Identity Record

- **Category:** Identity
- **Semantic type:** Authoritative record
- **Status:** Approved
- **Definition:** The authoritative governed state representing an Identity, including its immutable identity reference, type, lifecycle, handles, relationships, and source-approved metadata.
- **Required distinction:** The record represents an Identity but is not interchangeable with the Identity.
- **Example:** A dependent artifact cites `HAL-TERM-0033` when it uses **Identity Record** with this exact governed meaning: The authoritative governed state representing an Identity, including its immutable identity reference, type, lifecycle, handles, relationships, and source-approved metadata.
- **Counterexample:** A dependent artifact uses **Identity Record** in a way that violates its required distinction: The record represents an Identity but is not interchangeable with the Identity.
- **Relationship records:** HAL-REL-0007
- **Lifecycle transitions:** None registered
- **Constraints:** The record represents an Identity but is not interchangeable with the Identity.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 6, 27, and 48
- **Book II source:** Book II Chapters 04 and 05
- **Book III source:** Book III Chapter 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0034 — Identifier

- **Category:** Identity
- **Semantic type:** Reference value
- **Status:** Approved
- **Definition:** A value used to reference an Identity or another entity within a declared namespace and lifecycle.
- **Required distinction:** Possession or presentation of an Identifier does not authenticate identity or grant authority.
- **Example:** A dependent artifact cites `HAL-TERM-0034` when it uses **Identifier** with this exact governed meaning: A value used to reference an Identity or another entity within a declared namespace and lifecycle.
- **Counterexample:** A dependent artifact uses **Identifier** in a way that violates its required distinction: Possession or presentation of an Identifier does not authenticate identity or grant authority.
- **Relationship records:** HAL-REL-0008
- **Lifecycle transitions:** None registered
- **Constraints:** Possession or presentation of an Identifier does not authenticate identity or grant authority.
- **Allowed aliases:** ID
- **Book I source:** Book I Decisions 6, 27, and 48
- **Book II source:** Book II Chapters 04 and 05
- **Book III source:** Book III Chapter 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0035 — Identity Attribute

- **Category:** Identity
- **Semantic type:** Governed descriptive value
- **Status:** Approved
- **Definition:** A property, assertion, or governed fact associated with an Identity and qualified by source, time, and confidence where applicable.
- **Required distinction:** An attribute is not the Identity and does not independently establish authentication, trust, or authority.
- **Example:** A dependent artifact cites `HAL-TERM-0035` when it uses **Identity Attribute** with this exact governed meaning: A property, assertion, or governed fact associated with an Identity and qualified by source, time, and confidence where applicable.
- **Counterexample:** A dependent artifact uses **Identity Attribute** in a way that violates its required distinction: An attribute is not the Identity and does not independently establish authentication, trust, or authority.
- **Relationship records:** HAL-REL-0009
- **Lifecycle transitions:** None registered
- **Constraints:** An attribute is not the Identity and does not independently establish authentication, trust, or authority.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 6, 27, and 48
- **Book II source:** Book II Chapters 04 and 05
- **Book III source:** Book III Chapter 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0036 — Credential

- **Category:** Security
- **Semantic type:** Authentication instrument
- **Status:** Approved
- **Definition:** A governed secret, key, token, certificate, biometric template, or other instrument used in an authentication protocol.
- **Required distinction:** Credential possession is evidence, not identity, trust, permission, or authority by itself.
- **Example:** A dependent artifact cites `HAL-TERM-0036` when it uses **Credential** with this exact governed meaning: A governed secret, key, token, certificate, biometric template, or other instrument used in an authentication protocol.
- **Counterexample:** A dependent artifact uses **Credential** in a way that violates its required distinction: Credential possession is evidence, not identity, trust, permission, or authority by itself.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Credential possession is evidence, not identity, trust, permission, or authority by itself.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 6, 27, and 48
- **Book II source:** Book II Chapters 04 and 05
- **Book III source:** Book III Chapter 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0037 — Authentication

- **Category:** Identity
- **Semantic type:** Assurance process and result
- **Status:** Approved
- **Definition:** The evidence-based process and resulting confidence that a claimed Identity is presently genuine in a specified context.
- **Required distinction:** Authentication answers who or what is present; it does not answer what action is allowed.
- **Example:** A dependent artifact cites `HAL-TERM-0037` when it uses **Authentication** with this exact governed meaning: The evidence-based process and resulting confidence that a claimed Identity is presently genuine in a specified context.
- **Counterexample:** A dependent artifact uses **Authentication** in a way that violates its required distinction: Authentication answers who or what is present; it does not answer what action is allowed.
- **Relationship records:** HAL-REL-0010
- **Lifecycle transitions:** None registered
- **Constraints:** Authentication answers who or what is present; it does not answer what action is allowed.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 6, 27, and 48
- **Book II source:** Book II Chapters 04 and 05
- **Book III source:** Book III Chapter 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0038 — Authentication Evidence

- **Category:** Evidence
- **Semantic type:** Evidence role
- **Status:** Approved
- **Definition:** One or more Evidence Objects used to assess whether a claimed Identity is presently genuine.
- **Required distinction:** Authentication Evidence informs assurance but does not itself grant authority.
- **Example:** A dependent artifact cites `HAL-TERM-0038` when it uses **Authentication Evidence** with this exact governed meaning: One or more Evidence Objects used to assess whether a claimed Identity is presently genuine.
- **Counterexample:** A dependent artifact uses **Authentication Evidence** in a way that violates its required distinction: Authentication Evidence informs assurance but does not itself grant authority.
- **Relationship records:** HAL-REL-0010
- **Lifecycle transitions:** None registered
- **Constraints:** Authentication Evidence informs assurance but does not itself grant authority.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 6, 27, and 48
- **Book II source:** Book II Chapters 04 and 05
- **Book III source:** Book III Chapter 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0039 — Trust

- **Category:** Trust
- **Semantic type:** Evidence-based assessment
- **Status:** Approved
- **Definition:** Multidimensional, domain-specific confidence derived from evidence about an entity, claim, process, or relationship.
- **Required distinction:** Trust may inform decisions but must not be treated as authority or permission.
- **Example:** A dependent artifact cites `HAL-TERM-0039` when it uses **Trust** with this exact governed meaning: Multidimensional, domain-specific confidence derived from evidence about an entity, claim, process, or relationship.
- **Counterexample:** A dependent artifact uses **Trust** in a way that violates its required distinction: Trust may inform decisions but must not be treated as authority or permission.
- **Relationship records:** HAL-REL-0014
- **Lifecycle transitions:** None registered
- **Constraints:** Trust may inform decisions but must not be treated as authority or permission.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 5, 25, 26, 27, and 48
- **Book II source:** Book II Chapters 03, 05, and 18
- **Book III source:** Book III Chapters 3, 5, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0040 — Permission

- **Category:** Authority
- **Semantic type:** Decision result
- **Status:** Approved
- **Definition:** A scoped result of authoritative policy evaluation allowing a specified Principal to attempt a specified operation under stated context and conditions.
- **Required distinction:** Permission is not identical to Authority, Delegation, Capability, role, trust, or credential possession.
- **Example:** A dependent artifact cites `HAL-TERM-0040` when it uses **Permission** with this exact governed meaning: A scoped result of authoritative policy evaluation allowing a specified Principal to attempt a specified operation under stated context and conditions.
- **Counterexample:** A dependent artifact uses **Permission** in a way that violates its required distinction: Permission is not identical to Authority, Delegation, Capability, role, trust, or credential possession.
- **Relationship records:** HAL-REL-0012, HAL-REL-0013
- **Lifecycle transitions:** None registered
- **Constraints:** Permission is not identical to Authority, Delegation, Capability, role, trust, or credential possession.
- **Allowed aliases:** authorization result
- **Book I source:** Book I Decisions 5, 25, 26, 27, and 48
- **Book II source:** Book II Chapters 03, 05, and 18
- **Book III source:** Book III Chapters 3, 5, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0041 — Authority

- **Category:** Authority
- **Semantic type:** Governed decision and action scope
- **Status:** Approved
- **Definition:** The constitutionally and policy-governed scope within which a Principal may decide or cause action.
- **Required distinction:** Authority constrains Permission evaluation but is not itself a Permission result and is not inferred from identity, trust, capability, role, proximity, or credentials.
- **Example:** A dependent artifact cites `HAL-TERM-0041` when it uses **Authority** with this exact governed meaning: The constitutionally and policy-governed scope within which a Principal may decide or cause action.
- **Counterexample:** A dependent artifact uses **Authority** in a way that violates its required distinction: Authority constrains Permission evaluation but is not itself a Permission result and is not inferred from identity, trust, capability, role, proximity, or credentials.
- **Relationship records:** HAL-REL-0011, HAL-REL-0013
- **Lifecycle transitions:** None registered
- **Constraints:** Authority constrains Permission evaluation but is not itself a Permission result and is not inferred from identity, trust, capability, role, proximity, or credentials.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 5, 25, 26, 27, and 48
- **Book II source:** Book II Chapters 03, 05, and 18
- **Book III source:** Book III Chapters 3, 5, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0042 — Delegation

- **Category:** Authority
- **Semantic type:** Governed authority grant
- **Status:** Approved
- **Definition:** An attributable, scoped, conditional, expiring, and revocable grant of Authority from an authorized delegator to a recipient.
- **Required distinction:** A Delegation cannot grant authority the delegator does not possess or make a constitutional invariant waivable.
- **Example:** A dependent artifact cites `HAL-TERM-0042` when it uses **Delegation** with this exact governed meaning: An attributable, scoped, conditional, expiring, and revocable grant of Authority from an authorized delegator to a recipient.
- **Counterexample:** A dependent artifact uses **Delegation** in a way that violates its required distinction: A Delegation cannot grant authority the delegator does not possess or make a constitutional invariant waivable.
- **Relationship records:** HAL-REL-0011
- **Lifecycle transitions:** HAL-TRANS-0005, HAL-TRANS-0006, HAL-TRANS-0007
- **Constraints:** A Delegation cannot grant authority the delegator does not possess or make a constitutional invariant waivable.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 5, 25, 26, 27, and 48
- **Book II source:** Book II Chapters 03, 05, and 18
- **Book III source:** Book III Chapters 3, 5, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0043 — Policy

- **Category:** Authority
- **Semantic type:** Decision rule set
- **Status:** Approved
- **Definition:** A governed set of rules evaluated against identity, authority, delegation, purpose, context, resource, and risk inputs.
- **Required distinction:** A Policy is not itself a decision and cannot outrank its Normative Source.
- **Example:** A dependent artifact cites `HAL-TERM-0043` when it uses **Policy** with this exact governed meaning: A governed set of rules evaluated against identity, authority, delegation, purpose, context, resource, and risk inputs.
- **Counterexample:** A dependent artifact uses **Policy** in a way that violates its required distinction: A Policy is not itself a decision and cannot outrank its Normative Source.
- **Relationship records:** HAL-REL-0012
- **Lifecycle transitions:** None registered
- **Constraints:** A Policy is not itself a decision and cannot outrank its Normative Source.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 5, 25, 26, 27, and 48
- **Book II source:** Book II Chapters 03, 05, and 18
- **Book III source:** Book III Chapters 3, 5, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0044 — Policy Decision Record

- **Category:** Authority
- **Semantic type:** Decision record
- **Status:** Approved
- **Definition:** The attributable record of a policy evaluation, including inputs, governing policy version, outcome, obligations, reason, and correlation data.
- **Required distinction:** It records a decision; it does not create standing Authority beyond that decision's scope.
- **Example:** A dependent artifact cites `HAL-TERM-0044` when it uses **Policy Decision Record** with this exact governed meaning: The attributable record of a policy evaluation, including inputs, governing policy version, outcome, obligations, reason, and correlation data.
- **Counterexample:** A dependent artifact uses **Policy Decision Record** in a way that violates its required distinction: It records a decision; it does not create standing Authority beyond that decision's scope.
- **Relationship records:** HAL-REL-0014
- **Lifecycle transitions:** None registered
- **Constraints:** It records a decision; it does not create standing Authority beyond that decision's scope.
- **Allowed aliases:** authorization decision record
- **Book I source:** Book I Decisions 5, 25, 26, 27, and 48
- **Book II source:** Book II Chapters 03, 05, and 18
- **Book III source:** Book III Chapters 3, 5, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0045 — Protected Action

- **Category:** Authority
- **Semantic type:** Risk classification
- **Status:** Approved
- **Definition:** An Action whose authority, privacy, security, safety, irreversibility, or constitutional impact requires explicit governed evaluation and evidence.
- **Required distinction:** A routine implementation detail is not protected merely because it is technically complex.
- **Example:** A dependent artifact cites `HAL-TERM-0045` when it uses **Protected Action** with this exact governed meaning: An Action whose authority, privacy, security, safety, irreversibility, or constitutional impact requires explicit governed evaluation and evidence.
- **Counterexample:** A dependent artifact uses **Protected Action** in a way that violates its required distinction: A routine implementation detail is not protected merely because it is technically complex.
- **Relationship records:** HAL-REL-0052
- **Lifecycle transitions:** None registered
- **Constraints:** A routine implementation detail is not protected merely because it is technically complex.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 5, 25, 26, 27, and 48
- **Book II source:** Book II Chapters 03, 05, and 18
- **Book III source:** Book III Chapters 3, 5, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0046 — Intent

- **Category:** Cognition
- **Semantic type:** Purpose object
- **Status:** Approved
- **Definition:** A governed expression of desired purpose, direction, or outcome attributable to an authorized source.
- **Required distinction:** Intent is not a Plan, Action, Permission, or evidence that an outcome occurred.
- **Example:** A dependent artifact cites `HAL-TERM-0046` when it uses **Intent** with this exact governed meaning: A governed expression of desired purpose, direction, or outcome attributable to an authorized source.
- **Counterexample:** A dependent artifact uses **Intent** in a way that violates its required distinction: Intent is not a Plan, Action, Permission, or evidence that an outcome occurred.
- **Relationship records:** HAL-REL-0015
- **Lifecycle transitions:** None registered
- **Constraints:** Intent is not a Plan, Action, Permission, or evidence that an outcome occurred.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 12, 18, and 46
- **Book II source:** Book II Chapters 06 and 07
- **Book III source:** Book III Chapters 3, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0047 — Vision

- **Category:** Cognition
- **Semantic type:** Long-horizon intent
- **Status:** Approved
- **Definition:** A durable directional state describing an intended future without fully specifying its execution path.
- **Required distinction:** A Vision is broader and less operational than a Goal.
- **Example:** A dependent artifact cites `HAL-TERM-0047` when it uses **Vision** with this exact governed meaning: A durable directional state describing an intended future without fully specifying its execution path.
- **Counterexample:** A dependent artifact uses **Vision** in a way that violates its required distinction: A Vision is broader and less operational than a Goal.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A Vision is broader and less operational than a Goal.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 12, 18, and 46
- **Book II source:** Book II Chapters 06 and 07
- **Book III source:** Book III Chapters 3, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0048 — Goal

- **Category:** Cognition
- **Semantic type:** Outcome target
- **Status:** Approved
- **Definition:** A governed desired outcome with success criteria and a time or review horizon.
- **Required distinction:** A Goal does not by itself authorize Actions used to pursue it.
- **Example:** A dependent artifact cites `HAL-TERM-0048` when it uses **Goal** with this exact governed meaning: A governed desired outcome with success criteria and a time or review horizon.
- **Counterexample:** A dependent artifact uses **Goal** in a way that violates its required distinction: A Goal does not by itself authorize Actions used to pursue it.
- **Relationship records:** HAL-REL-0015, HAL-REL-0016, HAL-REL-0020
- **Lifecycle transitions:** None registered
- **Constraints:** A Goal does not by itself authorize Actions used to pursue it.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 12, 18, and 46
- **Book II source:** Book II Chapters 06 and 07
- **Book III source:** Book III Chapters 3, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0049 — Objective

- **Category:** Cognition
- **Semantic type:** Measurable target
- **Status:** Approved
- **Definition:** A bounded, measurable target that advances a Goal and has explicit completion or evaluation criteria.
- **Required distinction:** An Objective is not a Task; it states what must be achieved, not merely what work is performed.
- **Example:** A dependent artifact cites `HAL-TERM-0049` when it uses **Objective** with this exact governed meaning: A bounded, measurable target that advances a Goal and has explicit completion or evaluation criteria.
- **Counterexample:** A dependent artifact uses **Objective** in a way that violates its required distinction: An Objective is not a Task; it states what must be achieved, not merely what work is performed.
- **Relationship records:** HAL-REL-0016, HAL-REL-0017
- **Lifecycle transitions:** None registered
- **Constraints:** An Objective is not a Task; it states what must be achieved, not merely what work is performed.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 12, 18, and 46
- **Book II source:** Book II Chapters 06 and 07
- **Book III source:** Book III Chapters 3, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0050 — Project

- **Category:** Cognition
- **Semantic type:** Coordinated work container
- **Status:** Approved
- **Definition:** A governed body of related Objectives, Plans, Tasks, resources, decisions, and evidence organized toward a defined outcome.
- **Required distinction:** A Project is not standing authority for every contained Action.
- **Example:** A dependent artifact cites `HAL-TERM-0050` when it uses **Project** with this exact governed meaning: A governed body of related Objectives, Plans, Tasks, resources, decisions, and evidence organized toward a defined outcome.
- **Counterexample:** A dependent artifact uses **Project** in a way that violates its required distinction: A Project is not standing authority for every contained Action.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A Project is not standing authority for every contained Action.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 12, 18, and 46
- **Book II source:** Book II Chapters 06 and 07
- **Book III source:** Book III Chapters 3, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0051 — Task

- **Category:** Cognition
- **Semantic type:** Work unit
- **Status:** Approved
- **Definition:** A bounded unit of work with responsibility, inputs, expected result, dependencies, and completion evidence.
- **Required distinction:** Completing a Task is not equivalent to achieving the parent Objective or Goal.
- **Example:** A dependent artifact cites `HAL-TERM-0051` when it uses **Task** with this exact governed meaning: A bounded unit of work with responsibility, inputs, expected result, dependencies, and completion evidence.
- **Counterexample:** A dependent artifact uses **Task** in a way that violates its required distinction: Completing a Task is not equivalent to achieving the parent Objective or Goal.
- **Relationship records:** HAL-REL-0018
- **Lifecycle transitions:** None registered
- **Constraints:** Completing a Task is not equivalent to achieving the parent Objective or Goal.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 12, 18, and 46
- **Book II source:** Book II Chapters 06 and 07
- **Book III source:** Book III Chapters 3, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0052 — Strategy

- **Category:** Cognition
- **Semantic type:** Approach selection
- **Status:** Approved
- **Definition:** A reasoned approach for advancing one or more Goals under known constraints, uncertainties, and tradeoffs.
- **Required distinction:** A Strategy is not an executable Plan and does not bypass verification.
- **Example:** A dependent artifact cites `HAL-TERM-0052` when it uses **Strategy** with this exact governed meaning: A reasoned approach for advancing one or more Goals under known constraints, uncertainties, and tradeoffs.
- **Counterexample:** A dependent artifact uses **Strategy** in a way that violates its required distinction: A Strategy is not an executable Plan and does not bypass verification.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A Strategy is not an executable Plan and does not bypass verification.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 12, 18, and 46
- **Book II source:** Book II Chapters 06 and 07
- **Book III source:** Book III Chapters 3, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0053 — Plan

- **Category:** Cognition
- **Semantic type:** Coordinated intended work
- **Status:** Approved
- **Definition:** A governed arrangement of Tasks, dependencies, resources, decision points, verification steps, and recovery conditions intended to realize an Objective.
- **Required distinction:** A Plan is not proof that Actions are permitted, executed, or successful.
- **Example:** A dependent artifact cites `HAL-TERM-0053` when it uses **Plan** with this exact governed meaning: A governed arrangement of Tasks, dependencies, resources, decision points, verification steps, and recovery conditions intended to realize an Objective.
- **Counterexample:** A dependent artifact uses **Plan** in a way that violates its required distinction: A Plan is not proof that Actions are permitted, executed, or successful.
- **Relationship records:** HAL-REL-0017, HAL-REL-0018
- **Lifecycle transitions:** None registered
- **Constraints:** A Plan is not proof that Actions are permitted, executed, or successful.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 12, 18, and 46
- **Book II source:** Book II Chapters 06 and 07
- **Book III source:** Book III Chapters 3, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0054 — Plan Graph

- **Category:** Cognition
- **Semantic type:** Planning representation
- **Status:** Approved
- **Definition:** A dependency graph of intended work, decisions, resources, and verification gates.
- **Required distinction:** It represents intended coordination, not completed reality.
- **Example:** A dependent artifact cites `HAL-TERM-0054` when it uses **Plan Graph** with this exact governed meaning: A dependency graph of intended work, decisions, resources, and verification gates.
- **Counterexample:** A dependent artifact uses **Plan Graph** in a way that violates its required distinction: It represents intended coordination, not completed reality.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** It represents intended coordination, not completed reality.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 12, 18, and 46
- **Book II source:** Book II Chapters 06 and 07
- **Book III source:** Book III Chapters 3, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0055 — Execution Graph

- **Category:** Cognition
- **Semantic type:** Runtime representation
- **Status:** Approved
- **Definition:** The governed graph of actual Attempts, Actions, dependencies, outcomes, and evidence for an execution instance.
- **Required distinction:** It must not be silently substituted for the Plan Graph when explaining divergence.
- **Example:** A dependent artifact cites `HAL-TERM-0055` when it uses **Execution Graph** with this exact governed meaning: The governed graph of actual Attempts, Actions, dependencies, outcomes, and evidence for an execution instance.
- **Counterexample:** A dependent artifact uses **Execution Graph** in a way that violates its required distinction: It must not be silently substituted for the Plan Graph when explaining divergence.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** It must not be silently substituted for the Plan Graph when explaining divergence.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 12, 18, and 46
- **Book II source:** Book II Chapters 06 and 07
- **Book III source:** Book III Chapters 3, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0056 — Attention Object

- **Category:** Cognition
- **Semantic type:** Prioritization record
- **Status:** Approved
- **Definition:** A durable object representing a candidate matter for bounded attention, including source, salience, urgency, risk, relevance, context, disposition, and evidence.
- **Required distinction:** Attention is not Authority, approval, or a promise to act.
- **Example:** A dependent artifact cites `HAL-TERM-0056` when it uses **Attention Object** with this exact governed meaning: A durable object representing a candidate matter for bounded attention, including source, salience, urgency, risk, relevance, context, disposition, and evidence.
- **Counterexample:** A dependent artifact uses **Attention Object** in a way that violates its required distinction: Attention is not Authority, approval, or a promise to act.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Attention is not Authority, approval, or a promise to act.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 54
- **Book II source:** Book II Chapter 08
- **Book III source:** Book III Chapters 4, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0057 — Decision Object

- **Category:** Cognition
- **Semantic type:** Decision record
- **Status:** Approved
- **Definition:** A durable record of a consequential decision including question, alternatives, authority context, evidence, uncertainty, judgment, rationale, selected disposition, and review conditions.
- **Required distinction:** It records a decision and must not be used as a substitute for required Permission or execution evidence.
- **Example:** A dependent artifact cites `HAL-TERM-0057` when it uses **Decision Object** with this exact governed meaning: A durable record of a consequential decision including question, alternatives, authority context, evidence, uncertainty, judgment, rationale, selected disposition, and review conditions.
- **Counterexample:** A dependent artifact uses **Decision Object** in a way that violates its required distinction: It records a decision and must not be used as a substitute for required Permission or execution evidence.
- **Relationship records:** HAL-REL-0019
- **Lifecycle transitions:** None registered
- **Constraints:** It records a decision and must not be used as a substitute for required Permission or execution evidence.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 55
- **Book II source:** Book II Chapter 09
- **Book III source:** Book III Chapters 4, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0058 — Judgment

- **Category:** Cognition
- **Semantic type:** Reasoned evaluation
- **Status:** Approved
- **Definition:** The context-sensitive evaluation that weighs evidence, uncertainty, values, consequences, proportionality, and restraint to reach or recommend a decision.
- **Required distinction:** Judgment must not silently invent authority or conceal unresolved uncertainty.
- **Example:** A dependent artifact cites `HAL-TERM-0058` when it uses **Judgment** with this exact governed meaning: The context-sensitive evaluation that weighs evidence, uncertainty, values, consequences, proportionality, and restraint to reach or recommend a decision.
- **Counterexample:** A dependent artifact uses **Judgment** in a way that violates its required distinction: Judgment must not silently invent authority or conceal unresolved uncertainty.
- **Relationship records:** HAL-REL-0019, HAL-REL-0036
- **Lifecycle transitions:** None registered
- **Constraints:** Judgment must not silently invent authority or conceal unresolved uncertainty.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 55
- **Book II source:** Book II Chapter 09
- **Book III source:** Book III Chapters 4, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0059 — Uncertainty

- **Category:** Cognition
- **Semantic type:** Epistemic condition
- **Status:** Approved
- **Definition:** A represented limitation in knowledge, evidence, prediction, interpretation, or confidence relevant to a claim or decision.
- **Required distinction:** Uncertainty is not failure; unrepresented material uncertainty is a defect.
- **Example:** A dependent artifact cites `HAL-TERM-0059` when it uses **Uncertainty** with this exact governed meaning: A represented limitation in knowledge, evidence, prediction, interpretation, or confidence relevant to a claim or decision.
- **Counterexample:** A dependent artifact uses **Uncertainty** in a way that violates its required distinction: Uncertainty is not failure; unrepresented material uncertainty is a defect.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Uncertainty is not failure; unrepresented material uncertainty is a defect.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 55
- **Book II source:** Book II Chapter 09
- **Book III source:** Book III Chapters 4, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0060 — Outcome Object

- **Category:** Cognition
- **Semantic type:** Outcome record
- **Status:** Approved
- **Definition:** A durable record linking intended outcome, observed result, affected parties, evidence, side effects, confidence, and evaluation.
- **Required distinction:** It is not equivalent to an Event, metric sample, or optimistic status assertion.
- **Example:** A dependent artifact cites `HAL-TERM-0060` when it uses **Outcome Object** with this exact governed meaning: A durable record linking intended outcome, observed result, affected parties, evidence, side effects, confidence, and evaluation.
- **Counterexample:** A dependent artifact uses **Outcome Object** in a way that violates its required distinction: It is not equivalent to an Event, metric sample, or optimistic status assertion.
- **Relationship records:** HAL-REL-0020
- **Lifecycle transitions:** None registered
- **Constraints:** It is not equivalent to an Event, metric sample, or optimistic status assertion.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 57
- **Book II source:** Book II Chapter 32
- **Book III source:** Book III Chapters 4, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0061 — Success

- **Category:** Cognition
- **Semantic type:** Evaluated condition
- **Status:** Approved
- **Definition:** A source-governed determination that relevant outcomes satisfy stated criteria without unacceptable constitutional, human, privacy, security, or reliability costs.
- **Required distinction:** Task completion, activity volume, or a single metric does not by itself establish Success.
- **Example:** A dependent artifact cites `HAL-TERM-0061` when it uses **Success** with this exact governed meaning: A source-governed determination that relevant outcomes satisfy stated criteria without unacceptable constitutional, human, privacy, security, or reliability costs.
- **Counterexample:** A dependent artifact uses **Success** in a way that violates its required distinction: Task completion, activity volume, or a single metric does not by itself establish Success.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Task completion, activity volume, or a single metric does not by itself establish Success.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 57
- **Book II source:** Book II Chapter 32
- **Book III source:** Book III Chapters 4, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 5
- **Introduced:** v1.0

### HAL-TERM-0062 — Capability

- **Category:** Capability
- **Semantic type:** Implementation-independent contract
- **Status:** Approved
- **Definition:** An abstract ability defined by outcomes, inputs, outputs, constraints, required authority and permission classes, risks, side effects, and evaluation criteria.
- **Required distinction:** Capability does not identify an implementation and does not grant authority to use the ability.
- **Example:** A dependent artifact cites `HAL-TERM-0062` when it uses **Capability** with this exact governed meaning: An abstract ability defined by outcomes, inputs, outputs, constraints, required authority and permission classes, risks, side effects, and evaluation criteria.
- **Counterexample:** A dependent artifact uses **Capability** in a way that violates its required distinction: Capability does not identify an implementation and does not grant authority to use the ability.
- **Relationship records:** HAL-REL-0021, HAL-REL-0022
- **Lifecycle transitions:** None registered
- **Constraints:** Capability does not identify an implementation and does not grant authority to use the ability.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 10 and 36
- **Book II source:** Book II Chapter 15
- **Book III source:** Book III Chapters 3, 5, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0063 — Capability Contract

- **Category:** Capability
- **Semantic type:** Contract record
- **Status:** Approved
- **Definition:** The versioned specification of a Capability's semantic inputs, outputs, preconditions, effects, risks, authority requirements, evidence, and compatibility.
- **Required distinction:** It is not a provider-specific API contract.
- **Example:** A dependent artifact cites `HAL-TERM-0063` when it uses **Capability Contract** with this exact governed meaning: The versioned specification of a Capability's semantic inputs, outputs, preconditions, effects, risks, authority requirements, evidence, and compatibility.
- **Counterexample:** A dependent artifact uses **Capability Contract** in a way that violates its required distinction: It is not a provider-specific API contract.
- **Relationship records:** HAL-REL-0021
- **Lifecycle transitions:** None registered
- **Constraints:** It is not a provider-specific API contract.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 10 and 36
- **Book II source:** Book II Chapter 15
- **Book III source:** Book III Chapters 3, 5, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0064 — Provider

- **Category:** Capability
- **Semantic type:** Implementation role
- **Status:** Approved
- **Definition:** A component, service, model, person, device, or external system that can fulfill a Capability under a declared contract and trust context.
- **Required distinction:** Being able to perform work does not authorize the Provider to perform it.
- **Example:** A dependent artifact cites `HAL-TERM-0064` when it uses **Provider** with this exact governed meaning: A component, service, model, person, device, or external system that can fulfill a Capability under a declared contract and trust context.
- **Counterexample:** A dependent artifact uses **Provider** in a way that violates its required distinction: Being able to perform work does not authorize the Provider to perform it.
- **Relationship records:** HAL-REL-0022, HAL-REL-0023
- **Lifecycle transitions:** None registered
- **Constraints:** Being able to perform work does not authorize the Provider to perform it.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 10 and 36
- **Book II source:** Book II Chapter 15
- **Book III source:** Book III Chapters 3, 5, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0065 — Adapter

- **Category:** Capability
- **Semantic type:** Boundary component role
- **Status:** Approved
- **Definition:** A component that translates between a Capability Contract and a provider-specific interface while preserving authority, semantics, evidence, and failure behavior.
- **Required distinction:** An Adapter must not smuggle provider semantics into the canonical Capability definition.
- **Example:** A dependent artifact cites `HAL-TERM-0065` when it uses **Adapter** with this exact governed meaning: A component that translates between a Capability Contract and a provider-specific interface while preserving authority, semantics, evidence, and failure behavior.
- **Counterexample:** A dependent artifact uses **Adapter** in a way that violates its required distinction: An Adapter must not smuggle provider semantics into the canonical Capability definition.
- **Relationship records:** HAL-REL-0023
- **Lifecycle transitions:** None registered
- **Constraints:** An Adapter must not smuggle provider semantics into the canonical Capability definition.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 10 and 36
- **Book II source:** Book II Chapter 15
- **Book III source:** Book III Chapters 3, 5, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0066 — Capability Registry

- **Category:** Capability
- **Semantic type:** Authoritative registry
- **Status:** Approved
- **Definition:** The governed catalog of Capabilities, versions, Providers, constraints, authority classes, health, and selection metadata.
- **Required distinction:** Registration does not establish permission for use or trustworthiness in every domain.
- **Example:** A dependent artifact cites `HAL-TERM-0066` when it uses **Capability Registry** with this exact governed meaning: The governed catalog of Capabilities, versions, Providers, constraints, authority classes, health, and selection metadata.
- **Counterexample:** A dependent artifact uses **Capability Registry** in a way that violates its required distinction: Registration does not establish permission for use or trustworthiness in every domain.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Registration does not establish permission for use or trustworthiness in every domain.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 10 and 36
- **Book II source:** Book II Chapter 15
- **Book III source:** Book III Chapters 3, 5, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0067 — Action

- **Category:** Action
- **Semantic type:** State-changing attempt
- **Status:** Approved
- **Definition:** A governed attempt to produce an effect in authoritative state or the external world.
- **Required distinction:** A read-only Query is not an Action; an Action is not proof of successful effect.
- **Example:** A dependent artifact cites `HAL-TERM-0067` when it uses **Action** with this exact governed meaning: A governed attempt to produce an effect in authoritative state or the external world.
- **Counterexample:** A dependent artifact uses **Action** in a way that violates its required distinction: A read-only Query is not an Action; an Action is not proof of successful effect.
- **Relationship records:** HAL-REL-0024
- **Lifecycle transitions:** None registered
- **Constraints:** A read-only Query is not an Action; an Action is not proof of successful effect.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 16, 35, and 50
- **Book II source:** Book II Chapter 16
- **Book III source:** Book III Chapters 3, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0068 — Attempt

- **Category:** Action
- **Semantic type:** Execution instance
- **Status:** Approved
- **Definition:** One attributable execution effort for a Task, Action, or verification step with its own timing, context, result, and evidence.
- **Required distinction:** A retry is a new Attempt even when it shares an idempotency key.
- **Example:** A dependent artifact cites `HAL-TERM-0068` when it uses **Attempt** with this exact governed meaning: One attributable execution effort for a Task, Action, or verification step with its own timing, context, result, and evidence.
- **Counterexample:** A dependent artifact uses **Attempt** in a way that violates its required distinction: A retry is a new Attempt even when it shares an idempotency key.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A retry is a new Attempt even when it shares an idempotency key.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 16, 35, and 50
- **Book II source:** Book II Chapter 16
- **Book III source:** Book III Chapters 3, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0069 — Transaction

- **Category:** Action
- **Semantic type:** Governed action lifecycle
- **Status:** Approved
- **Definition:** The durable coordination object for one or more Actions, including authorization, prepare, commit, result, evidence, rollback, and compensation states.
- **Required distinction:** It is broader than a database transaction and must not imply atomic reversibility of external effects.
- **Example:** A dependent artifact cites `HAL-TERM-0069` when it uses **Transaction** with this exact governed meaning: The durable coordination object for one or more Actions, including authorization, prepare, commit, result, evidence, rollback, and compensation states.
- **Counterexample:** A dependent artifact uses **Transaction** in a way that violates its required distinction: It is broader than a database transaction and must not imply atomic reversibility of external effects.
- **Relationship records:** HAL-REL-0024
- **Lifecycle transitions:** HAL-TRANS-0008, HAL-TRANS-0009, HAL-TRANS-0010, HAL-TRANS-0011, HAL-TRANS-0012, HAL-TRANS-0013
- **Constraints:** It is broader than a database transaction and must not imply atomic reversibility of external effects.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 16, 35, and 50
- **Book II source:** Book II Chapter 16
- **Book III source:** Book III Chapters 3, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0070 — Commit Barrier

- **Category:** Action
- **Semantic type:** Irreversibility gate
- **Status:** Approved
- **Definition:** The explicit governed point after which a proposed change may create authoritative or real-world effects that cannot be treated as merely simulated or prepared.
- **Required distinction:** Passing a Commit Barrier requires the applicable authority and verification; preparation alone must not cross it.
- **Example:** A dependent artifact cites `HAL-TERM-0070` when it uses **Commit Barrier** with this exact governed meaning: The explicit governed point after which a proposed change may create authoritative or real-world effects that cannot be treated as merely simulated or prepared.
- **Counterexample:** A dependent artifact uses **Commit Barrier** in a way that violates its required distinction: Passing a Commit Barrier requires the applicable authority and verification; preparation alone must not cross it.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Passing a Commit Barrier requires the applicable authority and verification; preparation alone must not cross it.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 16, 35, and 50
- **Book II source:** Book II Chapter 16
- **Book III source:** Book III Chapters 3, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0071 — Rollback

- **Category:** Action
- **Semantic type:** Reversal operation
- **Status:** Approved
- **Definition:** A controlled restoration of a prior recoverable state when the relevant effects are truthfully reversible.
- **Required distinction:** Rollback must not claim to erase external or human effects that already occurred.
- **Example:** A dependent artifact cites `HAL-TERM-0071` when it uses **Rollback** with this exact governed meaning: A controlled restoration of a prior recoverable state when the relevant effects are truthfully reversible.
- **Counterexample:** A dependent artifact uses **Rollback** in a way that violates its required distinction: Rollback must not claim to erase external or human effects that already occurred.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Rollback must not claim to erase external or human effects that already occurred.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 16, 35, and 50
- **Book II source:** Book II Chapter 16
- **Book III source:** Book III Chapters 3, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0072 — Compensation

- **Category:** Action
- **Semantic type:** Remedial operation
- **Status:** Approved
- **Definition:** A new governed Action that mitigates, offsets, or repairs effects that cannot truthfully be undone.
- **Required distinction:** Compensation is not Rollback and may require independent authority and evidence.
- **Example:** A dependent artifact cites `HAL-TERM-0072` when it uses **Compensation** with this exact governed meaning: A new governed Action that mitigates, offsets, or repairs effects that cannot truthfully be undone.
- **Counterexample:** A dependent artifact uses **Compensation** in a way that violates its required distinction: Compensation is not Rollback and may require independent authority and evidence.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Compensation is not Rollback and may require independent authority and evidence.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 16, 35, and 50
- **Book II source:** Book II Chapter 16
- **Book III source:** Book III Chapters 3, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0073 — Reality Boundary

- **Category:** Action
- **Semantic type:** Governed environment boundary
- **Status:** Approved
- **Definition:** The explicit separation among simulation, digital twin, shadow, test, canary, controlled-reality, production, recovery, and emergency contexts.
- **Required distinction:** Non-reality authority, data, or effects must not leak across this boundary into reality.
- **Example:** A dependent artifact cites `HAL-TERM-0073` when it uses **Reality Boundary** with this exact governed meaning: The explicit separation among simulation, digital twin, shadow, test, canary, controlled-reality, production, recovery, and emergency contexts.
- **Counterexample:** A dependent artifact uses **Reality Boundary** in a way that violates its required distinction: Non-reality authority, data, or effects must not leak across this boundary into reality.
- **Relationship records:** HAL-REL-0025
- **Lifecycle transitions:** None registered
- **Constraints:** Non-reality authority, data, or effects must not leak across this boundary into reality.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 50
- **Book II source:** Book II Chapter 17
- **Book III source:** Book III Chapters 3, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0074 — Simulation

- **Category:** Verification
- **Semantic type:** Non-reality environment
- **Status:** Approved
- **Definition:** An execution environment whose effects are confined to modeled or synthetic state and cannot directly alter production or external reality.
- **Required distinction:** High apparent fidelity does not make a Simulation production.
- **Example:** A dependent artifact cites `HAL-TERM-0074` when it uses **Simulation** with this exact governed meaning: An execution environment whose effects are confined to modeled or synthetic state and cannot directly alter production or external reality.
- **Counterexample:** A dependent artifact uses **Simulation** in a way that violates its required distinction: High apparent fidelity does not make a Simulation production.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** High apparent fidelity does not make a Simulation production.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 50
- **Book II source:** Book II Chapter 17
- **Book III source:** Book III Chapters 3, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0075 — Digital Twin

- **Category:** Verification
- **Semantic type:** Modeled counterpart
- **Status:** Approved
- **Definition:** A governed model of selected real entities, relationships, state, and dynamics used to evaluate behavior without treating modeled effects as real effects.
- **Required distinction:** A Digital Twin is bounded by declared fidelity and must not be mistaken for the represented reality.
- **Example:** A dependent artifact cites `HAL-TERM-0075` when it uses **Digital Twin** with this exact governed meaning: A governed model of selected real entities, relationships, state, and dynamics used to evaluate behavior without treating modeled effects as real effects.
- **Counterexample:** A dependent artifact uses **Digital Twin** in a way that violates its required distinction: A Digital Twin is bounded by declared fidelity and must not be mistaken for the represented reality.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A Digital Twin is bounded by declared fidelity and must not be mistaken for the represented reality.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 50
- **Book II source:** Book II Chapter 17
- **Book III source:** Book III Chapters 3, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0076 — Shadow Execution

- **Category:** Verification
- **Semantic type:** Non-committing execution mode
- **Status:** Approved
- **Definition:** Execution using live or representative inputs while preventing proposed outputs from producing authoritative or external effects.
- **Required distinction:** Shadow results do not authorize promotion without the required review and certification.
- **Example:** A dependent artifact cites `HAL-TERM-0076` when it uses **Shadow Execution** with this exact governed meaning: Execution using live or representative inputs while preventing proposed outputs from producing authoritative or external effects.
- **Counterexample:** A dependent artifact uses **Shadow Execution** in a way that violates its required distinction: Shadow results do not authorize promotion without the required review and certification.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Shadow results do not authorize promotion without the required review and certification.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 50
- **Book II source:** Book II Chapter 17
- **Book III source:** Book III Chapters 3, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0077 — Canary

- **Category:** Verification
- **Semantic type:** Limited reality stage
- **Status:** Approved
- **Definition:** A deliberately constrained real execution stage used to accumulate evidence before broader adoption.
- **Required distinction:** A Canary crosses the Reality Boundary and therefore requires real authority, containment, and rollback or compensation.
- **Example:** A dependent artifact cites `HAL-TERM-0077` when it uses **Canary** with this exact governed meaning: A deliberately constrained real execution stage used to accumulate evidence before broader adoption.
- **Counterexample:** A dependent artifact uses **Canary** in a way that violates its required distinction: A Canary crosses the Reality Boundary and therefore requires real authority, containment, and rollback or compensation.
- **Relationship records:** HAL-REL-0025
- **Lifecycle transitions:** None registered
- **Constraints:** A Canary crosses the Reality Boundary and therefore requires real authority, containment, and rollback or compensation.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 50
- **Book II source:** Book II Chapter 17
- **Book III source:** Book III Chapters 3, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 6
- **Introduced:** v1.0

### HAL-TERM-0078 — Evidence Candidate

- **Category:** Evidence
- **Semantic type:** Pre-admission record
- **Status:** Approved
- **Definition:** An observation, telemetry item, document, Audit Record, claim, or other integrity-protected input proposed for admission as an Evidence Object.
- **Required distinction:** It is not authoritative Evidence until accepted through the Evidence Service's governed admission and custody process.
- **Example:** A dependent artifact cites `HAL-TERM-0078` when it uses **Evidence Candidate** with this exact governed meaning: An observation, telemetry item, document, Audit Record, claim, or other integrity-protected input proposed for admission as an Evidence Object.
- **Counterexample:** A dependent artifact uses **Evidence Candidate** in a way that violates its required distinction: It is not authoritative Evidence until accepted through the Evidence Service's governed admission and custody process.
- **Relationship records:** HAL-REL-0026
- **Lifecycle transitions:** HAL-TRANS-0014
- **Constraints:** It is not authoritative Evidence until accepted through the Evidence Service's governed admission and custody process.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 26
- **Book II source:** Book II Chapters 18 and 25
- **Book III source:** Book III Chapters 4, 5, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0079 — Evidence Object

- **Category:** Evidence
- **Semantic type:** Immutable provenance-bearing record
- **Status:** Approved
- **Definition:** An immutable object admitted and governed by the authoritative Evidence Service that records provenance, custody, source identity, observation or claim content, time, signatures, verification state, confidence, domain, and expiration metadata.
- **Required distinction:** An Evidence Object must not be mutated to revise a conclusion; later objects supersede or challenge it.
- **Example:** A dependent artifact cites `HAL-TERM-0079` when it uses **Evidence Object** with this exact governed meaning: An immutable object admitted and governed by the authoritative Evidence Service that records provenance, custody, source identity, observation or claim content, time, signatures, verification state, confidence, domain, and expiration metadata.
- **Counterexample:** A dependent artifact uses **Evidence Object** in a way that violates its required distinction: An Evidence Object must not be mutated to revise a conclusion; later objects supersede or challenge it.
- **Relationship records:** HAL-REL-0026, HAL-REL-0027, HAL-REL-0028, HAL-REL-0053
- **Lifecycle transitions:** None registered
- **Constraints:** An Evidence Object must not be mutated to revise a conclusion; later objects supersede or challenge it.
- **Allowed aliases:** Evidence
- **Book I source:** Book I Decision 26
- **Book II source:** Book II Chapters 18 and 25
- **Book III source:** Book III Chapters 4, 5, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0080 — Audit Record

- **Category:** Evidence
- **Semantic type:** Protected accountability record
- **Status:** Approved
- **Definition:** An append-only record of a protected action, authorization, decision, access, or change owned by the applicable audit domain.
- **Required distinction:** An Audit Record may produce an Evidence Candidate but is not automatically a general Evidence Object.
- **Example:** A dependent artifact cites `HAL-TERM-0080` when it uses **Audit Record** with this exact governed meaning: An append-only record of a protected action, authorization, decision, access, or change owned by the applicable audit domain.
- **Counterexample:** A dependent artifact uses **Audit Record** in a way that violates its required distinction: An Audit Record may produce an Evidence Candidate but is not automatically a general Evidence Object.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** An Audit Record may produce an Evidence Candidate but is not automatically a general Evidence Object.
- **Allowed aliases:** audit log entry
- **Book I source:** Book I Decision 26
- **Book II source:** Book II Chapters 18 and 25
- **Book III source:** Book III Chapters 4, 5, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0081 — Provenance

- **Category:** Evidence
- **Semantic type:** Origin history
- **Status:** Approved
- **Definition:** The attributable origin, derivation, transformation, and custody history of an artifact, datum, claim, model, decision, or Evidence Object.
- **Required distinction:** A source label without derivation and custody context is incomplete provenance.
- **Example:** A dependent artifact cites `HAL-TERM-0081` when it uses **Provenance** with this exact governed meaning: The attributable origin, derivation, transformation, and custody history of an artifact, datum, claim, model, decision, or Evidence Object.
- **Counterexample:** A dependent artifact uses **Provenance** in a way that violates its required distinction: A source label without derivation and custody context is incomplete provenance.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A source label without derivation and custody context is incomplete provenance.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 26
- **Book II source:** Book II Chapters 18 and 25
- **Book III source:** Book III Chapters 4, 5, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0082 — Chain of Custody

- **Category:** Evidence
- **Semantic type:** Integrity history
- **Status:** Approved
- **Definition:** The ordered, attributable record of possession, control, transfer, and integrity protection for evidence or sensitive artifacts.
- **Required distinction:** It does not establish truth; it establishes accountable handling.
- **Example:** A dependent artifact cites `HAL-TERM-0082` when it uses **Chain of Custody** with this exact governed meaning: The ordered, attributable record of possession, control, transfer, and integrity protection for evidence or sensitive artifacts.
- **Counterexample:** A dependent artifact uses **Chain of Custody** in a way that violates its required distinction: It does not establish truth; it establishes accountable handling.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** It does not establish truth; it establishes accountable handling.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 26
- **Book II source:** Book II Chapters 18 and 25
- **Book III source:** Book III Chapters 4, 5, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0083 — Evidence Graph

- **Category:** Evidence
- **Semantic type:** Evidence relationship model
- **Status:** Approved
- **Definition:** A graph connecting Claims, Evidence Objects, sources, derivations, supporting or opposing relations, confidence, and conclusions.
- **Required distinction:** Graph connectivity does not make all linked material equally authoritative or trustworthy.
- **Example:** A dependent artifact cites `HAL-TERM-0083` when it uses **Evidence Graph** with this exact governed meaning: A graph connecting Claims, Evidence Objects, sources, derivations, supporting or opposing relations, confidence, and conclusions.
- **Counterexample:** A dependent artifact uses **Evidence Graph** in a way that violates its required distinction: Graph connectivity does not make all linked material equally authoritative or trustworthy.
- **Relationship records:** HAL-REL-0028
- **Lifecycle transitions:** None registered
- **Constraints:** Graph connectivity does not make all linked material equally authoritative or trustworthy.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 26
- **Book II source:** Book II Chapters 18 and 25
- **Book III source:** Book III Chapters 4, 5, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0084 — Verification

- **Category:** Verification
- **Semantic type:** Evidence-producing evaluation
- **Status:** Approved
- **Definition:** A reproducible, risk-scaled process that evaluates a Claim, invariant, behavior, artifact, or Outcome against explicit criteria.
- **Required distinction:** Verification produces evidence; it is not the same as certification or operational approval.
- **Example:** A dependent artifact cites `HAL-TERM-0084` when it uses **Verification** with this exact governed meaning: A reproducible, risk-scaled process that evaluates a Claim, invariant, behavior, artifact, or Outcome against explicit criteria.
- **Counterexample:** A dependent artifact uses **Verification** in a way that violates its required distinction: Verification produces evidence; it is not the same as certification or operational approval.
- **Relationship records:** HAL-REL-0029
- **Lifecycle transitions:** None registered
- **Constraints:** Verification produces evidence; it is not the same as certification or operational approval.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 43, 50, and 56
- **Book II source:** Book II Chapters 17 and 35
- **Book III source:** Book III Chapters 6, 8, and 9
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0085 — Verification Plan

- **Category:** Verification
- **Semantic type:** Planning record
- **Status:** Approved
- **Definition:** A governed specification of claims, risks, methods, environments, data, success criteria, independence, and required evidence for Verification.
- **Required distinction:** A test list without mapped claims and criteria is not a complete Verification Plan.
- **Example:** A dependent artifact cites `HAL-TERM-0085` when it uses **Verification Plan** with this exact governed meaning: A governed specification of claims, risks, methods, environments, data, success criteria, independence, and required evidence for Verification.
- **Counterexample:** A dependent artifact uses **Verification Plan** in a way that violates its required distinction: A test list without mapped claims and criteria is not a complete Verification Plan.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A test list without mapped claims and criteria is not a complete Verification Plan.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 43, 50, and 56
- **Book II source:** Book II Chapters 17 and 35
- **Book III source:** Book III Chapters 6, 8, and 9
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0086 — Assurance Case

- **Category:** Verification
- **Semantic type:** Structured argument
- **Status:** Approved
- **Definition:** A structured, reviewable argument connecting scoped claims to reasoning and sufficient supporting evidence.
- **Required distinction:** An Assurance Case must expose assumptions, defeaters, uncertainty, and evidence gaps.
- **Example:** A dependent artifact cites `HAL-TERM-0086` when it uses **Assurance Case** with this exact governed meaning: A structured, reviewable argument connecting scoped claims to reasoning and sufficient supporting evidence.
- **Counterexample:** A dependent artifact uses **Assurance Case** in a way that violates its required distinction: An Assurance Case must expose assumptions, defeaters, uncertainty, and evidence gaps.
- **Relationship records:** HAL-REL-0030, HAL-REL-0031
- **Lifecycle transitions:** None registered
- **Constraints:** An Assurance Case must expose assumptions, defeaters, uncertainty, and evidence gaps.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 43, 50, and 56
- **Book II source:** Book II Chapters 17 and 35
- **Book III source:** Book III Chapters 6, 8, and 9
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0087 — Certification

- **Category:** Verification
- **Semantic type:** Governed assurance decision
- **Status:** Approved
- **Definition:** A scoped, time-bounded, evidence-based determination by an authorized certifier that specified conformance claims are satisfied.
- **Required distinction:** Certification is not permanent, universal, or self-issued by the artifact being certified.
- **Example:** A dependent artifact cites `HAL-TERM-0087` when it uses **Certification** with this exact governed meaning: A scoped, time-bounded, evidence-based determination by an authorized certifier that specified conformance claims are satisfied.
- **Counterexample:** A dependent artifact uses **Certification** in a way that violates its required distinction: Certification is not permanent, universal, or self-issued by the artifact being certified.
- **Relationship records:** HAL-REL-0031
- **Lifecycle transitions:** HAL-TRANS-0015, HAL-TRANS-0016, HAL-TRANS-0017
- **Constraints:** Certification is not permanent, universal, or self-issued by the artifact being certified.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 43, 50, and 56
- **Book II source:** Book II Chapters 17 and 35
- **Book III source:** Book III Chapters 6, 8, and 9
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0088 — Conformance

- **Category:** Verification
- **Semantic type:** Evaluated relation
- **Status:** Approved
- **Definition:** The evidenced condition of satisfying identified requirements from identified authoritative sources within a declared scope and version.
- **Required distinction:** Conformance is never implied merely by compatibility, successful execution, or absence of known defects.
- **Example:** A dependent artifact cites `HAL-TERM-0088` when it uses **Conformance** with this exact governed meaning: The evidenced condition of satisfying identified requirements from identified authoritative sources within a declared scope and version.
- **Counterexample:** A dependent artifact uses **Conformance** in a way that violates its required distinction: Conformance is never implied merely by compatibility, successful execution, or absence of known defects.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Conformance is never implied merely by compatibility, successful execution, or absence of known defects.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 43, 50, and 56
- **Book II source:** Book II Chapters 17 and 35
- **Book III source:** Book III Chapters 6, 8, and 9
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0089 — Confidence

- **Category:** Trust
- **Semantic type:** Calibrated assessment
- **Status:** Approved
- **Definition:** A bounded assessment of support for a Claim or prediction, expressed with method, scope, evidence basis, uncertainty, and time sensitivity.
- **Required distinction:** Confidence is not probability unless a defined model justifies that interpretation.
- **Example:** A dependent artifact cites `HAL-TERM-0089` when it uses **Confidence** with this exact governed meaning: A bounded assessment of support for a Claim or prediction, expressed with method, scope, evidence basis, uncertainty, and time sensitivity.
- **Counterexample:** A dependent artifact uses **Confidence** in a way that violates its required distinction: Confidence is not probability unless a defined model justifies that interpretation.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Confidence is not probability unless a defined model justifies that interpretation.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 43, 50, and 56
- **Book II source:** Book II Chapters 17 and 35
- **Book III source:** Book III Chapters 6, 8, and 9
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0090 — Experience

- **Category:** Knowledge
- **Semantic type:** Retained occurrence record
- **Status:** Approved
- **Definition:** A governed representation of what HAL perceived, attempted, decided, experienced, and observed, with context, outcomes, provenance, and privacy controls.
- **Required distinction:** Experience is not automatically Knowledge, a Pattern, or Wisdom.
- **Example:** A dependent artifact cites `HAL-TERM-0090` when it uses **Experience** with this exact governed meaning: A governed representation of what HAL perceived, attempted, decided, experienced, and observed, with context, outcomes, provenance, and privacy controls.
- **Counterexample:** A dependent artifact uses **Experience** in a way that violates its required distinction: Experience is not automatically Knowledge, a Pattern, or Wisdom.
- **Relationship records:** HAL-REL-0032, HAL-REL-0035
- **Lifecycle transitions:** None registered
- **Constraints:** Experience is not automatically Knowledge, a Pattern, or Wisdom.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 30 and 53
- **Book II source:** Book II Chapter 12
- **Book III source:** Book III Chapters 4, 5, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 8
- **Introduced:** v1.0

### HAL-TERM-0091 — Experience Ledger

- **Category:** Knowledge
- **Semantic type:** Authoritative ledger
- **Status:** Approved
- **Definition:** The append-oriented governed store of Experience records and their provenance, correction, retention, and access metadata.
- **Required distinction:** It is not a general-purpose mutable memory store.
- **Example:** A dependent artifact cites `HAL-TERM-0091` when it uses **Experience Ledger** with this exact governed meaning: The append-oriented governed store of Experience records and their provenance, correction, retention, and access metadata.
- **Counterexample:** A dependent artifact uses **Experience Ledger** in a way that violates its required distinction: It is not a general-purpose mutable memory store.
- **Relationship records:** HAL-REL-0032
- **Lifecycle transitions:** None registered
- **Constraints:** It is not a general-purpose mutable memory store.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 30 and 53
- **Book II source:** Book II Chapter 12
- **Book III source:** Book III Chapters 4, 5, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 8
- **Introduced:** v1.0

### HAL-TERM-0092 — Memory

- **Category:** Knowledge
- **Semantic type:** Retrievable retained representation
- **Status:** Approved
- **Definition:** A retained representation available for later contextual retrieval under authority, privacy, relevance, and lifecycle rules.
- **Required distinction:** Memory is broader than Experience and is not necessarily authoritative Knowledge.
- **Example:** A dependent artifact cites `HAL-TERM-0092` when it uses **Memory** with this exact governed meaning: A retained representation available for later contextual retrieval under authority, privacy, relevance, and lifecycle rules.
- **Counterexample:** A dependent artifact uses **Memory** in a way that violates its required distinction: Memory is broader than Experience and is not necessarily authoritative Knowledge.
- **Relationship records:** HAL-REL-0033
- **Lifecycle transitions:** None registered
- **Constraints:** Memory is broader than Experience and is not necessarily authoritative Knowledge.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 30 and 53
- **Book II source:** Book II Chapter 12
- **Book III source:** Book III Chapters 4, 5, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 8
- **Introduced:** v1.0

### HAL-TERM-0093 — Memory Graph

- **Category:** Knowledge
- **Semantic type:** Associative representation
- **Status:** Approved
- **Definition:** A governed graph linking retained representations by context, entity, time, causation, similarity, and relevance.
- **Required distinction:** Association must not be treated as proof of causation or truth.
- **Example:** A dependent artifact cites `HAL-TERM-0093` when it uses **Memory Graph** with this exact governed meaning: A governed graph linking retained representations by context, entity, time, causation, similarity, and relevance.
- **Counterexample:** A dependent artifact uses **Memory Graph** in a way that violates its required distinction: Association must not be treated as proof of causation or truth.
- **Relationship records:** HAL-REL-0033
- **Lifecycle transitions:** None registered
- **Constraints:** Association must not be treated as proof of causation or truth.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 30 and 53
- **Book II source:** Book II Chapter 12
- **Book III source:** Book III Chapters 4, 5, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 8
- **Introduced:** v1.0

### HAL-TERM-0094 — Knowledge

- **Category:** Knowledge
- **Semantic type:** Contextualized warranted representation
- **Status:** Approved
- **Definition:** A governed representation whose claims, provenance, validity scope, confidence, and supporting evidence are sufficient for its declared use.
- **Required distinction:** Stored information or model output is not automatically Knowledge.
- **Example:** A dependent artifact cites `HAL-TERM-0094` when it uses **Knowledge** with this exact governed meaning: A governed representation whose claims, provenance, validity scope, confidence, and supporting evidence are sufficient for its declared use.
- **Counterexample:** A dependent artifact uses **Knowledge** in a way that violates its required distinction: Stored information or model output is not automatically Knowledge.
- **Relationship records:** HAL-REL-0034
- **Lifecycle transitions:** None registered
- **Constraints:** Stored information or model output is not automatically Knowledge.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 30 and 52
- **Book II source:** Book II Chapter 10
- **Book III source:** Book III Chapters 3, 4, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 8
- **Introduced:** v1.0

### HAL-TERM-0095 — Knowledge Graph

- **Category:** Knowledge
- **Semantic type:** Knowledge relationship model
- **Status:** Approved
- **Definition:** A governed graph of entities, concepts, relationships, Claims, sources, validity, and provenance used for contextual reasoning and retrieval.
- **Required distinction:** Graph membership does not erase source authority, uncertainty, or temporal scope.
- **Example:** A dependent artifact cites `HAL-TERM-0095` when it uses **Knowledge Graph** with this exact governed meaning: A governed graph of entities, concepts, relationships, Claims, sources, validity, and provenance used for contextual reasoning and retrieval.
- **Counterexample:** A dependent artifact uses **Knowledge Graph** in a way that violates its required distinction: Graph membership does not erase source authority, uncertainty, or temporal scope.
- **Relationship records:** HAL-REL-0034
- **Lifecycle transitions:** None registered
- **Constraints:** Graph membership does not erase source authority, uncertainty, or temporal scope.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 30 and 52
- **Book II source:** Book II Chapter 10
- **Book III source:** Book III Chapters 3, 4, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 8
- **Introduced:** v1.0

### HAL-TERM-0096 — Pattern

- **Category:** Knowledge
- **Semantic type:** Learned regularity
- **Status:** Approved
- **Definition:** A reproducibly supported regularity across Experiences or observations with stated domain, evidence, confidence, limits, and exceptions.
- **Required distinction:** A repeated coincidence or one-off anecdote is not a Pattern.
- **Example:** A dependent artifact cites `HAL-TERM-0096` when it uses **Pattern** with this exact governed meaning: A reproducibly supported regularity across Experiences or observations with stated domain, evidence, confidence, limits, and exceptions.
- **Counterexample:** A dependent artifact uses **Pattern** in a way that violates its required distinction: A repeated coincidence or one-off anecdote is not a Pattern.
- **Relationship records:** HAL-REL-0035
- **Lifecycle transitions:** None registered
- **Constraints:** A repeated coincidence or one-off anecdote is not a Pattern.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 31 and 53
- **Book II source:** Book II Chapter 11
- **Book III source:** Book III Chapters 4, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 8
- **Introduced:** v1.0

### HAL-TERM-0097 — Learning

- **Category:** Knowledge
- **Semantic type:** Governed update process
- **Status:** Approved
- **Definition:** The evidence-bounded process by which HAL updates representations, Patterns, policies, or behavior within authorized scope.
- **Required distinction:** Learning must not silently alter constitutional meaning, authority, or protected production behavior.
- **Example:** A dependent artifact cites `HAL-TERM-0097` when it uses **Learning** with this exact governed meaning: The evidence-bounded process by which HAL updates representations, Patterns, policies, or behavior within authorized scope.
- **Counterexample:** A dependent artifact uses **Learning** in a way that violates its required distinction: Learning must not silently alter constitutional meaning, authority, or protected production behavior.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Learning must not silently alter constitutional meaning, authority, or protected production behavior.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 31 and 53
- **Book II source:** Book II Chapter 11
- **Book III source:** Book III Chapters 4, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 8
- **Introduced:** v1.0

### HAL-TERM-0098 — Learning Ledger

- **Category:** Knowledge
- **Semantic type:** Change ledger
- **Status:** Approved
- **Definition:** The governed record of learning proposals, evidence, evaluation, approval, applied changes, monitoring, rollback, and outcomes.
- **Required distinction:** It is not permission for unrestricted self-modification.
- **Example:** A dependent artifact cites `HAL-TERM-0098` when it uses **Learning Ledger** with this exact governed meaning: The governed record of learning proposals, evidence, evaluation, approval, applied changes, monitoring, rollback, and outcomes.
- **Counterexample:** A dependent artifact uses **Learning Ledger** in a way that violates its required distinction: It is not permission for unrestricted self-modification.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** It is not permission for unrestricted self-modification.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 31 and 53
- **Book II source:** Book II Chapter 11
- **Book III source:** Book III Chapters 4, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 8
- **Introduced:** v1.0

### HAL-TERM-0099 — Wisdom

- **Category:** Knowledge
- **Semantic type:** Evidence-bounded judgment resource
- **Status:** Approved
- **Definition:** A durable, revisable synthesis of Experience, Patterns, values, consequences, uncertainty, and restraint used to inform Judgment.
- **Required distinction:** Wisdom informs decisions but does not create authority or replace current evidence.
- **Example:** A dependent artifact cites `HAL-TERM-0099` when it uses **Wisdom** with this exact governed meaning: A durable, revisable synthesis of Experience, Patterns, values, consequences, uncertainty, and restraint used to inform Judgment.
- **Counterexample:** A dependent artifact uses **Wisdom** in a way that violates its required distinction: Wisdom informs decisions but does not create authority or replace current evidence.
- **Relationship records:** HAL-REL-0036
- **Lifecycle transitions:** None registered
- **Constraints:** Wisdom informs decisions but does not create authority or replace current evidence.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 31 and 53
- **Book II source:** Book II Chapter 11
- **Book III source:** Book III Chapters 4, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 8
- **Introduced:** v1.0

### HAL-TERM-0100 — Self Model

- **Category:** Knowledge
- **Semantic type:** Governed self-representation
- **Status:** Approved
- **Definition:** HAL's evidence-linked representation of its current capabilities, limits, state, dependencies, uncertainty, and identity continuity.
- **Required distinction:** It is descriptive and must not become a self-authorizing source.
- **Example:** A dependent artifact cites `HAL-TERM-0100` when it uses **Self Model** with this exact governed meaning: HAL's evidence-linked representation of its current capabilities, limits, state, dependencies, uncertainty, and identity continuity.
- **Counterexample:** A dependent artifact uses **Self Model** in a way that violates its required distinction: It is descriptive and must not become a self-authorizing source.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** It is descriptive and must not become a self-authorizing source.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 28 and 51
- **Book II source:** Book II Chapter 30
- **Book III source:** Book III Chapters 4 and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 8
- **Introduced:** v1.0

### HAL-TERM-0101 — Command

- **Category:** Distributed systems
- **Semantic type:** Intent message
- **Status:** Approved
- **Definition:** A request addressed to an authoritative owner to evaluate and, if allowed, perform a state-changing operation.
- **Required distinction:** A Command is not evidence that the operation was authorized, committed, or completed.
- **Example:** A dependent artifact cites `HAL-TERM-0101` when it uses **Command** with this exact governed meaning: A request addressed to an authoritative owner to evaluate and, if allowed, perform a state-changing operation.
- **Counterexample:** A dependent artifact uses **Command** in a way that violates its required distinction: A Command is not evidence that the operation was authorized, committed, or completed.
- **Relationship records:** HAL-REL-0037, HAL-REL-0040
- **Lifecycle transitions:** None registered
- **Constraints:** A Command is not evidence that the operation was authorized, committed, or completed.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 22, 29, and 40
- **Book II source:** Book II Chapters 22 and 23
- **Book III source:** Book III Chapters 3, 4, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0102 — Query

- **Category:** Distributed systems
- **Semantic type:** Read request
- **Status:** Approved
- **Definition:** A request for information that must not intentionally mutate authoritative state or external reality.
- **Required distinction:** Telemetry side effects must remain non-authoritative and must not turn a Query into a hidden Command.
- **Example:** A dependent artifact cites `HAL-TERM-0102` when it uses **Query** with this exact governed meaning: A request for information that must not intentionally mutate authoritative state or external reality.
- **Counterexample:** A dependent artifact uses **Query** in a way that violates its required distinction: Telemetry side effects must remain non-authoritative and must not turn a Query into a hidden Command.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Telemetry side effects must remain non-authoritative and must not turn a Query into a hidden Command.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 22, 29, and 40
- **Book II source:** Book II Chapters 22 and 23
- **Book III source:** Book III Chapters 3, 4, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0103 — Event

- **Category:** Distributed systems
- **Semantic type:** Completed-fact record
- **Status:** Approved
- **Definition:** An immutable message stating that a defined fact or state transition has completed in its owning domain.
- **Required distinction:** An Event is not a request, intention, or mutable current-state record.
- **Example:** A dependent artifact cites `HAL-TERM-0103` when it uses **Event** with this exact governed meaning: An immutable message stating that a defined fact or state transition has completed in its owning domain.
- **Counterexample:** A dependent artifact uses **Event** in a way that violates its required distinction: An Event is not a request, intention, or mutable current-state record.
- **Relationship records:** HAL-REL-0037, HAL-REL-0039
- **Lifecycle transitions:** None registered
- **Constraints:** An Event is not a request, intention, or mutable current-state record.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 22, 29, and 40
- **Book II source:** Book II Chapters 22 and 23
- **Book III source:** Book III Chapters 3, 4, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0104 — Event Journal

- **Category:** Distributed systems
- **Semantic type:** Durable event store
- **Status:** Approved
- **Definition:** The ordered durable record of Events for an owning domain, with identity, sequence, provenance, and integrity controls.
- **Required distinction:** Global total order must not be inferred when only per-stream ordering exists.
- **Example:** A dependent artifact cites `HAL-TERM-0104` when it uses **Event Journal** with this exact governed meaning: The ordered durable record of Events for an owning domain, with identity, sequence, provenance, and integrity controls.
- **Counterexample:** A dependent artifact uses **Event Journal** in a way that violates its required distinction: Global total order must not be inferred when only per-stream ordering exists.
- **Relationship records:** HAL-REL-0038
- **Lifecycle transitions:** None registered
- **Constraints:** Global total order must not be inferred when only per-stream ordering exists.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 22, 29, and 40
- **Book II source:** Book II Chapters 22 and 23
- **Book III source:** Book III Chapters 3, 4, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0105 — Message Envelope

- **Category:** Distributed systems
- **Semantic type:** Transport record
- **Status:** Approved
- **Definition:** The governed wrapper carrying message identity, schema version, source, destination, time, correlation, causation, authority context, classification, and integrity metadata.
- **Required distinction:** The envelope does not change the semantic type of its payload.
- **Example:** A dependent artifact cites `HAL-TERM-0105` when it uses **Message Envelope** with this exact governed meaning: The governed wrapper carrying message identity, schema version, source, destination, time, correlation, causation, authority context, classification, and integrity metadata.
- **Counterexample:** A dependent artifact uses **Message Envelope** in a way that violates its required distinction: The envelope does not change the semantic type of its payload.
- **Relationship records:** HAL-REL-0040
- **Lifecycle transitions:** None registered
- **Constraints:** The envelope does not change the semantic type of its payload.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 22, 29, and 40
- **Book II source:** Book II Chapters 22 and 23
- **Book III source:** Book III Chapters 3, 4, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0106 — Idempotency Key

- **Category:** Distributed systems
- **Semantic type:** Deduplication value
- **Status:** Approved
- **Definition:** A scoped stable value allowing a receiver to recognize equivalent retry Attempts for one declared operation and result horizon.
- **Required distinction:** It does not make non-idempotent external effects reversible or globally exactly-once.
- **Example:** A dependent artifact cites `HAL-TERM-0106` when it uses **Idempotency Key** with this exact governed meaning: A scoped stable value allowing a receiver to recognize equivalent retry Attempts for one declared operation and result horizon.
- **Counterexample:** A dependent artifact uses **Idempotency Key** in a way that violates its required distinction: It does not make non-idempotent external effects reversible or globally exactly-once.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** It does not make non-idempotent external effects reversible or globally exactly-once.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 22, 29, and 40
- **Book II source:** Book II Chapters 22 and 23
- **Book III source:** Book III Chapters 3, 4, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0107 — Correlation Identifier

- **Category:** Distributed systems
- **Semantic type:** Trace reference
- **Status:** Approved
- **Definition:** A value linking related work, messages, evidence, and telemetry across a bounded flow.
- **Required distinction:** Correlation does not prove causation.
- **Example:** A dependent artifact cites `HAL-TERM-0107` when it uses **Correlation Identifier** with this exact governed meaning: A value linking related work, messages, evidence, and telemetry across a bounded flow.
- **Counterexample:** A dependent artifact uses **Correlation Identifier** in a way that violates its required distinction: Correlation does not prove causation.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Correlation does not prove causation.
- **Allowed aliases:** correlation ID
- **Book I source:** Book I Decisions 22, 29, and 40
- **Book II source:** Book II Chapters 22 and 23
- **Book III source:** Book III Chapters 3, 4, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0108 — Causation Identifier

- **Category:** Distributed systems
- **Semantic type:** Causal reference
- **Status:** Approved
- **Definition:** A value identifying the immediate initiating message, decision, or event for a derived operation.
- **Required distinction:** It records declared lineage and must not be used as sole proof of real-world causality.
- **Example:** A dependent artifact cites `HAL-TERM-0108` when it uses **Causation Identifier** with this exact governed meaning: A value identifying the immediate initiating message, decision, or event for a derived operation.
- **Counterexample:** A dependent artifact uses **Causation Identifier** in a way that violates its required distinction: It records declared lineage and must not be used as sole proof of real-world causality.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** It records declared lineage and must not be used as sole proof of real-world causality.
- **Allowed aliases:** causation ID
- **Book I source:** Book I Decisions 22, 29, and 40
- **Book II source:** Book II Chapters 22 and 23
- **Book III source:** Book III Chapters 3, 4, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0109 — Authoritative State

- **Category:** Distributed systems
- **Semantic type:** Owned state
- **Status:** Approved
- **Definition:** State whose mutation and truth are governed by the designated owning domain.
- **Required distinction:** A cache, replica, projection, search index, or local aggregate is not authoritative unless explicitly designated.
- **Example:** A dependent artifact cites `HAL-TERM-0109` when it uses **Authoritative State** with this exact governed meaning: State whose mutation and truth are governed by the designated owning domain.
- **Counterexample:** A dependent artifact uses **Authoritative State** in a way that violates its required distinction: A cache, replica, projection, search index, or local aggregate is not authoritative unless explicitly designated.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A cache, replica, projection, search index, or local aggregate is not authoritative unless explicitly designated.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 4, 22, 35, 38, and 40
- **Book II source:** Book II Chapters 23 and 24
- **Book III source:** Book III Chapters 3, 4, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0110 — Projection

- **Category:** Distributed systems
- **Semantic type:** Derived state
- **Status:** Approved
- **Definition:** A read-optimized representation derived from authoritative records or Events for a declared purpose.
- **Required distinction:** A Projection may be stale and must not silently accept authoritative mutations.
- **Example:** A dependent artifact cites `HAL-TERM-0110` when it uses **Projection** with this exact governed meaning: A read-optimized representation derived from authoritative records or Events for a declared purpose.
- **Counterexample:** A dependent artifact uses **Projection** in a way that violates its required distinction: A Projection may be stale and must not silently accept authoritative mutations.
- **Relationship records:** HAL-REL-0038
- **Lifecycle transitions:** None registered
- **Constraints:** A Projection may be stale and must not silently accept authoritative mutations.
- **Allowed aliases:** read model
- **Book I source:** Book I Decisions 4, 22, 35, 38, and 40
- **Book II source:** Book II Chapters 23 and 24
- **Book III source:** Book III Chapters 3, 4, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0111 — Cache

- **Category:** Distributed systems
- **Semantic type:** Disposable derived state
- **Status:** Approved
- **Definition:** A replaceable performance-oriented copy whose loss does not destroy authoritative truth.
- **Required distinction:** A Cache must not become the only copy of required state or evidence.
- **Example:** A dependent artifact cites `HAL-TERM-0111` when it uses **Cache** with this exact governed meaning: A replaceable performance-oriented copy whose loss does not destroy authoritative truth.
- **Counterexample:** A dependent artifact uses **Cache** in a way that violates its required distinction: A Cache must not become the only copy of required state or evidence.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A Cache must not become the only copy of required state or evidence.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 4, 22, 35, 38, and 40
- **Book II source:** Book II Chapters 23 and 24
- **Book III source:** Book III Chapters 3, 4, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0112 — Replica

- **Category:** Distributed systems
- **Semantic type:** Replicated state
- **Status:** Approved
- **Definition:** A governed copy maintained from an authoritative source under declared consistency, lag, and failover rules.
- **Required distinction:** Replication alone does not transfer semantic ownership.
- **Example:** A dependent artifact cites `HAL-TERM-0112` when it uses **Replica** with this exact governed meaning: A governed copy maintained from an authoritative source under declared consistency, lag, and failover rules.
- **Counterexample:** A dependent artifact uses **Replica** in a way that violates its required distinction: Replication alone does not transfer semantic ownership.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Replication alone does not transfer semantic ownership.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 4, 22, 35, 38, and 40
- **Book II source:** Book II Chapters 23 and 24
- **Book III source:** Book III Chapters 3, 4, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0113 — Transactional Outbox

- **Category:** Distributed systems
- **Semantic type:** Publication pattern
- **Status:** Approved
- **Definition:** A durable pattern that records an authoritative state change and its pending Event publication in one local commit boundary.
- **Required distinction:** It reduces dual-write failure but does not guarantee global exactly-once processing.
- **Example:** A dependent artifact cites `HAL-TERM-0113` when it uses **Transactional Outbox** with this exact governed meaning: A durable pattern that records an authoritative state change and its pending Event publication in one local commit boundary.
- **Counterexample:** A dependent artifact uses **Transactional Outbox** in a way that violates its required distinction: It reduces dual-write failure but does not guarantee global exactly-once processing.
- **Relationship records:** HAL-REL-0039
- **Lifecycle transitions:** None registered
- **Constraints:** It reduces dual-write failure but does not guarantee global exactly-once processing.
- **Allowed aliases:** outbox
- **Book I source:** Book I Decisions 4, 22, 35, 38, and 40
- **Book II source:** Book II Chapters 23 and 24
- **Book III source:** Book III Chapters 3, 4, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0114 — Logical Time

- **Category:** Temporal
- **Semantic type:** Ordering construct
- **Status:** Approved
- **Definition:** A non-wall-clock ordering value used to represent causal or domain sequence relationships.
- **Required distinction:** Logical Time must not be presented as real elapsed or calendar time.
- **Example:** A dependent artifact cites `HAL-TERM-0114` when it uses **Logical Time** with this exact governed meaning: A non-wall-clock ordering value used to represent causal or domain sequence relationships.
- **Counterexample:** A dependent artifact uses **Logical Time** in a way that violates its required distinction: Logical Time must not be presented as real elapsed or calendar time.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Logical Time must not be presented as real elapsed or calendar time.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 44
- **Book II source:** Book II Chapter 13
- **Book III source:** Book III Chapters 3, 4, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0115 — Wall-Clock Time

- **Category:** Temporal
- **Semantic type:** Temporal observation
- **Status:** Approved
- **Definition:** A timestamp from a declared clock source, precision, and synchronization context.
- **Required distinction:** Wall-Clock Time alone must not establish distributed causal order.
- **Example:** A dependent artifact cites `HAL-TERM-0115` when it uses **Wall-Clock Time** with this exact governed meaning: A timestamp from a declared clock source, precision, and synchronization context.
- **Counterexample:** A dependent artifact uses **Wall-Clock Time** in a way that violates its required distinction: Wall-Clock Time alone must not establish distributed causal order.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Wall-Clock Time alone must not establish distributed causal order.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 44
- **Book II source:** Book II Chapter 13
- **Book III source:** Book III Chapters 3, 4, and 6
- **Source basis:** Direct source normalization
- **Book X chapter:** 9
- **Introduced:** v1.0

### HAL-TERM-0116 — External Trust Domain

- **Category:** Trust
- **Semantic type:** External governance domain
- **Status:** Approved
- **Definition:** An external environment, organization, system, or authority regime whose controls and assumptions are not natively governed by HAL.
- **Required distinction:** External status does not imply hostility or trustworthiness; exchange requires explicit governance.
- **Example:** A dependent artifact cites `HAL-TERM-0116` when it uses **External Trust Domain** with this exact governed meaning: An external environment, organization, system, or authority regime whose controls and assumptions are not natively governed by HAL.
- **Counterexample:** A dependent artifact uses **External Trust Domain** in a way that violates its required distinction: External status does not imply hostility or trustworthiness; exchange requires explicit governance.
- **Relationship records:** HAL-REL-0041, HAL-REL-0050
- **Lifecycle transitions:** None registered
- **Constraints:** External status does not imply hostility or trustworthiness; exchange requires explicit governance.
- **Allowed aliases:** ETD
- **Book I source:** Book I Decision 49
- **Book II source:** Book II Chapters 20 and 21
- **Book III source:** Book III Chapter 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0117 — Treaty

- **Category:** Trust
- **Semantic type:** Governed trust agreement
- **Status:** Approved
- **Definition:** An exact, scoped, time-bounded, revocable, auditable, and explicitly Owner-authorized agreement defining allowed cross-domain identities, data, capabilities, authority, obligations, verification, monitoring, failure behavior, and termination.
- **Required distinction:** Activation requires the Owner Authorization Ceremony bound to the exact Treaty. Conversation, delegated ordinary authority, trust, usefulness, prior access, or the Treaty itself cannot grant authority prohibited by Book I or bypass the Constitutional Firewall.
- **Example:** A dependent artifact cites `HAL-TERM-0117` when it uses **Treaty** with this exact governed meaning: An exact, scoped, time-bounded, revocable, auditable, and explicitly Owner-authorized agreement defining allowed cross-domain identities, data, capabilities, authority, obligations, verification, monitoring, failure behavior, and termination.
- **Counterexample:** A dependent artifact uses **Treaty** in a way that violates its required distinction: Activation requires the Owner Authorization Ceremony bound to the exact Treaty. Conversation, delegated ordinary authority, trust, usefulness, prior access, or the Treaty itself cannot grant authority prohibited by Book I or bypass the Constitutional Firewall.
- **Relationship records:** HAL-REL-0041, HAL-REL-0042
- **Lifecycle transitions:** HAL-TRANS-0018, HAL-TRANS-0019, HAL-TRANS-0020
- **Constraints:** Activation requires the Owner Authorization Ceremony bound to the exact Treaty. Conversation, delegated ordinary authority, trust, usefulness, prior access, or the Treaty itself cannot grant authority prohibited by Book I or bypass the Constitutional Firewall.
- **Allowed aliases:** External Trust Treaty
- **Book I source:** Book I Decision 49
- **Book II source:** Book II Chapter 21
- **Book III source:** Book III Chapters 5 and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0118 — Constitutional Firewall

- **Category:** Trust
- **Semantic type:** Architectural enforcement boundary
- **Status:** Approved
- **Definition:** The Book II boundary that mediates and enforces constitutionally governed exchange between HAL and External Trust Domains.
- **Required distinction:** It is not merely a network firewall and must not be bypassed by direct integration.
- **Example:** A dependent artifact cites `HAL-TERM-0118` when it uses **Constitutional Firewall** with this exact governed meaning: The Book II boundary that mediates and enforces constitutionally governed exchange between HAL and External Trust Domains.
- **Counterexample:** A dependent artifact uses **Constitutional Firewall** in a way that violates its required distinction: It is not merely a network firewall and must not be bypassed by direct integration.
- **Relationship records:** HAL-REL-0042
- **Lifecycle transitions:** None registered
- **Constraints:** It is not merely a network firewall and must not be bypassed by direct integration.
- **Allowed aliases:** CF
- **Book I source:** Book I Decision 49
- **Book II source:** Book II Chapter 20
- **Book III source:** Book III Chapter 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0119 — Trust Boundary

- **Category:** Security
- **Semantic type:** Security boundary
- **Status:** Approved
- **Definition:** A boundary across which identity, authority, integrity, confidentiality, provenance, or governance assumptions change.
- **Required distinction:** Network adjacency alone does not define or erase a Trust Boundary.
- **Example:** A dependent artifact cites `HAL-TERM-0119` when it uses **Trust Boundary** with this exact governed meaning: A boundary across which identity, authority, integrity, confidentiality, provenance, or governance assumptions change.
- **Counterexample:** A dependent artifact uses **Trust Boundary** in a way that violates its required distinction: Network adjacency alone does not define or erase a Trust Boundary.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Network adjacency alone does not define or erase a Trust Boundary.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 26, 27, 32, 37, 39, 48, and 49
- **Book II source:** Book II Chapters 18, 19, 20, 21, 25, and 26
- **Book III source:** Book III Chapters 2, 4, 5, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0120 — Data Classification

- **Category:** Privacy
- **Semantic type:** Governance label
- **Status:** Approved
- **Definition:** A governed label determining handling, access, transmission, retention, evidence, and disposal requirements for information.
- **Required distinction:** Classification is not a purpose or permission to use the data.
- **Example:** A dependent artifact cites `HAL-TERM-0120` when it uses **Data Classification** with this exact governed meaning: A governed label determining handling, access, transmission, retention, evidence, and disposal requirements for information.
- **Counterexample:** A dependent artifact uses **Data Classification** in a way that violates its required distinction: Classification is not a purpose or permission to use the data.
- **Relationship records:** HAL-REL-0043
- **Lifecycle transitions:** None registered
- **Constraints:** Classification is not a purpose or permission to use the data.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 32
- **Book II source:** Book II Chapter 19
- **Book III source:** Book III Chapters 4 and 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0121 — Personal Data

- **Category:** Privacy
- **Semantic type:** Information class
- **Status:** Approved
- **Definition:** Information relating to an identified or reasonably identifiable human under the governing privacy context.
- **Required distinction:** Pseudonymization may reduce exposure but does not necessarily remove personal-data status.
- **Example:** A dependent artifact cites `HAL-TERM-0121` when it uses **Personal Data** with this exact governed meaning: Information relating to an identified or reasonably identifiable human under the governing privacy context.
- **Counterexample:** A dependent artifact uses **Personal Data** in a way that violates its required distinction: Pseudonymization may reduce exposure but does not necessarily remove personal-data status.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Pseudonymization may reduce exposure but does not necessarily remove personal-data status.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 32
- **Book II source:** Book II Chapter 19
- **Book III source:** Book III Chapters 4 and 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0122 — Sensitive Data

- **Category:** Privacy
- **Semantic type:** Information class
- **Status:** Approved
- **Definition:** Information whose unauthorized use or disclosure could materially harm a person, HAL, the Owner, security, sovereignty, trust, or protected operations.
- **Required distinction:** Sensitivity is context-dependent and may include non-personal operational data.
- **Example:** A dependent artifact cites `HAL-TERM-0122` when it uses **Sensitive Data** with this exact governed meaning: Information whose unauthorized use or disclosure could materially harm a person, HAL, the Owner, security, sovereignty, trust, or protected operations.
- **Counterexample:** A dependent artifact uses **Sensitive Data** in a way that violates its required distinction: Sensitivity is context-dependent and may include non-personal operational data.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Sensitivity is context-dependent and may include non-personal operational data.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 32
- **Book II source:** Book II Chapter 19
- **Book III source:** Book III Chapters 4 and 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0123 — Purpose Limitation

- **Category:** Privacy
- **Semantic type:** Use constraint
- **Status:** Approved
- **Definition:** The rule that governed data may be collected, used, shared, and retained only for declared, authorized, compatible purposes.
- **Required distinction:** Availability or technical usefulness does not establish purpose.
- **Example:** A dependent artifact cites `HAL-TERM-0123` when it uses **Purpose Limitation** with this exact governed meaning: The rule that governed data may be collected, used, shared, and retained only for declared, authorized, compatible purposes.
- **Counterexample:** A dependent artifact uses **Purpose Limitation** in a way that violates its required distinction: Availability or technical usefulness does not establish purpose.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Availability or technical usefulness does not establish purpose.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 32
- **Book II source:** Book II Chapter 19
- **Book III source:** Book III Chapters 4 and 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0124 — Data Minimization

- **Category:** Privacy
- **Semantic type:** Collection and use constraint
- **Status:** Approved
- **Definition:** The rule that only the least data reasonably necessary for an authorized purpose may be collected, processed, retained, and disclosed.
- **Required distinction:** Minimization applies to fields, precision, population, duration, access, and derived inferences.
- **Example:** A dependent artifact cites `HAL-TERM-0124` when it uses **Data Minimization** with this exact governed meaning: The rule that only the least data reasonably necessary for an authorized purpose may be collected, processed, retained, and disclosed.
- **Counterexample:** A dependent artifact uses **Data Minimization** in a way that violates its required distinction: Minimization applies to fields, precision, population, duration, access, and derived inferences.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Minimization applies to fields, precision, population, duration, access, and derived inferences.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 32
- **Book II source:** Book II Chapter 19
- **Book III source:** Book III Chapters 4 and 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0125 — Retention Class

- **Category:** Privacy
- **Semantic type:** Lifecycle label
- **Status:** Approved
- **Definition:** A governed category defining retention period, review, legal or constitutional hold behavior, archival, and disposal requirements.
- **Required distinction:** A Retention Class does not itself authorize collection or access.
- **Example:** A dependent artifact cites `HAL-TERM-0125` when it uses **Retention Class** with this exact governed meaning: A governed category defining retention period, review, legal or constitutional hold behavior, archival, and disposal requirements.
- **Counterexample:** A dependent artifact uses **Retention Class** in a way that violates its required distinction: A Retention Class does not itself authorize collection or access.
- **Relationship records:** HAL-REL-0043
- **Lifecycle transitions:** None registered
- **Constraints:** A Retention Class does not itself authorize collection or access.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 32
- **Book II source:** Book II Chapter 19
- **Book III source:** Book III Chapters 4 and 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0126 — Secret

- **Category:** Security
- **Semantic type:** Sensitive authentication material
- **Status:** Approved
- **Definition:** Confidential material whose disclosure could enable unauthorized access, impersonation, decryption, signing, or protected operation.
- **Required distinction:** An Identifier or public key is not a Secret merely because it is security-related.
- **Example:** A dependent artifact cites `HAL-TERM-0126` when it uses **Secret** with this exact governed meaning: Confidential material whose disclosure could enable unauthorized access, impersonation, decryption, signing, or protected operation.
- **Counterexample:** A dependent artifact uses **Secret** in a way that violates its required distinction: An Identifier or public key is not a Secret merely because it is security-related.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** An Identifier or public key is not a Secret merely because it is security-related.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 27, 37, and 39
- **Book II source:** Book II Chapters 05, 19, and 26
- **Book III source:** Book III Chapters 2 and 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0127 — Cryptographic Key

- **Category:** Security
- **Semantic type:** Cryptographic material
- **Status:** Approved
- **Definition:** A governed value used by an approved cryptographic operation and managed through generation, storage, access, rotation, revocation, destruction, and provenance controls.
- **Required distinction:** A key's possession does not itself establish business Authority.
- **Example:** A dependent artifact cites `HAL-TERM-0127` when it uses **Cryptographic Key** with this exact governed meaning: A governed value used by an approved cryptographic operation and managed through generation, storage, access, rotation, revocation, destruction, and provenance controls.
- **Counterexample:** A dependent artifact uses **Cryptographic Key** in a way that violates its required distinction: A key's possession does not itself establish business Authority.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A key's possession does not itself establish business Authority.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 27, 37, and 39
- **Book II source:** Book II Chapters 05, 19, and 26
- **Book III source:** Book III Chapters 2 and 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0128 — Security Control

- **Category:** Security
- **Semantic type:** Protective control
- **Status:** Approved
- **Definition:** A safeguard intended to protect confidentiality, integrity, availability, identity assurance, or system resilience.
- **Required distinction:** A Security Control protecting HAL is distinct from an Authority Control preventing HAL from exceeding its mandate.
- **Example:** A dependent artifact cites `HAL-TERM-0128` when it uses **Security Control** with this exact governed meaning: A safeguard intended to protect confidentiality, integrity, availability, identity assurance, or system resilience.
- **Counterexample:** A dependent artifact uses **Security Control** in a way that violates its required distinction: A Security Control protecting HAL is distinct from an Authority Control preventing HAL from exceeding its mandate.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A Security Control protecting HAL is distinct from an Authority Control preventing HAL from exceeding its mandate.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 27, 37, and 39
- **Book II source:** Book II Chapters 05, 19, and 26
- **Book III source:** Book III Chapters 2 and 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0129 — Authority Control

- **Category:** Authority
- **Semantic type:** Mandate-limiting control
- **Status:** Approved
- **Definition:** A safeguard that prevents a Principal, component, or HAL from deciding or acting beyond governed Authority.
- **Required distinction:** It is not interchangeable with a Security Control, though one mechanism may support both.
- **Example:** A dependent artifact cites `HAL-TERM-0129` when it uses **Authority Control** with this exact governed meaning: A safeguard that prevents a Principal, component, or HAL from deciding or acting beyond governed Authority.
- **Counterexample:** A dependent artifact uses **Authority Control** in a way that violates its required distinction: It is not interchangeable with a Security Control, though one mechanism may support both.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** It is not interchangeable with a Security Control, though one mechanism may support both.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 27, 37, and 39
- **Book II source:** Book II Chapters 05, 19, and 26
- **Book III source:** Book III Chapters 2 and 5
- **Source basis:** Direct source normalization
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0130 — Runtime

- **Category:** Operations
- **Semantic type:** Execution environment
- **Status:** Approved
- **Definition:** The governed combination of processes, state, resources, policies, dependencies, and environments in which HAL behavior executes.
- **Required distinction:** A Runtime is not HAL's constitutional identity.
- **Example:** A dependent artifact cites `HAL-TERM-0130` when it uses **Runtime** with this exact governed meaning: The governed combination of processes, state, resources, policies, dependencies, and environments in which HAL behavior executes.
- **Counterexample:** A dependent artifact uses **Runtime** in a way that violates its required distinction: A Runtime is not HAL's constitutional identity.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A Runtime is not HAL's constitutional identity.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0131 — Node

- **Category:** Operations
- **Semantic type:** Execution entity
- **Status:** Approved
- **Definition:** A governed compute or device participant capable of hosting workload, state, sensing, or action under the runtime architecture.
- **Required distinction:** A Node does not independently become HAL or own authoritative state without explicit designation.
- **Example:** A dependent artifact cites `HAL-TERM-0131` when it uses **Node** with this exact governed meaning: A governed compute or device participant capable of hosting workload, state, sensing, or action under the runtime architecture.
- **Counterexample:** A dependent artifact uses **Node** in a way that violates its required distinction: A Node does not independently become HAL or own authoritative state without explicit designation.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A Node does not independently become HAL or own authoritative state without explicit designation.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0132 — Service

- **Category:** Operations
- **Semantic type:** Component deployment role
- **Status:** Approved
- **Definition:** A deployable runtime boundary providing one or more governed responsibilities or interfaces.
- **Required distinction:** A Service is not automatically an architectural component, capability, or authority domain.
- **Example:** A dependent artifact cites `HAL-TERM-0132` when it uses **Service** with this exact governed meaning: A deployable runtime boundary providing one or more governed responsibilities or interfaces.
- **Counterexample:** A dependent artifact uses **Service** in a way that violates its required distinction: A Service is not automatically an architectural component, capability, or authority domain.
- **Relationship records:** HAL-REL-0044
- **Lifecycle transitions:** HAL-TRANS-0021, HAL-TRANS-0022, HAL-TRANS-0023, HAL-TRANS-0024
- **Constraints:** A Service is not automatically an architectural component, capability, or authority domain.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0133 — Supervisor

- **Category:** Operations
- **Semantic type:** Runtime control role
- **Status:** Approved
- **Definition:** A component that monitors and governs workload lifecycle, desired state, health, restart, containment, and escalation within its authority.
- **Required distinction:** A Supervisor must not conceal repeated failure through unlimited restart loops.
- **Example:** A dependent artifact cites `HAL-TERM-0133` when it uses **Supervisor** with this exact governed meaning: A component that monitors and governs workload lifecycle, desired state, health, restart, containment, and escalation within its authority.
- **Counterexample:** A dependent artifact uses **Supervisor** in a way that violates its required distinction: A Supervisor must not conceal repeated failure through unlimited restart loops.
- **Relationship records:** HAL-REL-0044
- **Lifecycle transitions:** None registered
- **Constraints:** A Supervisor must not conceal repeated failure through unlimited restart loops.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0134 — Desired State

- **Category:** Operations
- **Semantic type:** Control target
- **Status:** Approved
- **Definition:** The governed runtime condition an authorized controller intends the system to maintain.
- **Required distinction:** Desired State is not proof of Observed State or successful convergence.
- **Example:** A dependent artifact cites `HAL-TERM-0134` when it uses **Desired State** with this exact governed meaning: The governed runtime condition an authorized controller intends the system to maintain.
- **Counterexample:** A dependent artifact uses **Desired State** in a way that violates its required distinction: Desired State is not proof of Observed State or successful convergence.
- **Relationship records:** HAL-REL-0046
- **Lifecycle transitions:** None registered
- **Constraints:** Desired State is not proof of Observed State or successful convergence.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0135 — Observed State

- **Category:** Operations
- **Semantic type:** Runtime observation
- **Status:** Approved
- **Definition:** The evidenced runtime condition measured at a defined time and scope.
- **Required distinction:** Observation may be stale, partial, or uncertain and must not be treated as Desired State.
- **Example:** A dependent artifact cites `HAL-TERM-0135` when it uses **Observed State** with this exact governed meaning: The evidenced runtime condition measured at a defined time and scope.
- **Counterexample:** A dependent artifact uses **Observed State** in a way that violates its required distinction: Observation may be stale, partial, or uncertain and must not be treated as Desired State.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Observation may be stale, partial, or uncertain and must not be treated as Desired State.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0136 — Health

- **Category:** Operations
- **Semantic type:** Operational assessment
- **Status:** Approved
- **Definition:** A multidimensional assessment of a component's ability to perform its declared responsibilities within current constraints.
- **Required distinction:** Process liveness alone is not Health.
- **Example:** A dependent artifact cites `HAL-TERM-0136` when it uses **Health** with this exact governed meaning: A multidimensional assessment of a component's ability to perform its declared responsibilities within current constraints.
- **Counterexample:** A dependent artifact uses **Health** in a way that violates its required distinction: Process liveness alone is not Health.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Process liveness alone is not Health.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0137 — Liveness

- **Category:** Operations
- **Semantic type:** Runtime signal
- **Status:** Approved
- **Definition:** Evidence that a workload is running or able to make progress according to a narrow declared probe.
- **Required distinction:** Liveness does not establish readiness, correctness, authorization, or safety.
- **Example:** A dependent artifact cites `HAL-TERM-0137` when it uses **Liveness** with this exact governed meaning: Evidence that a workload is running or able to make progress according to a narrow declared probe.
- **Counterexample:** A dependent artifact uses **Liveness** in a way that violates its required distinction: Liveness does not establish readiness, correctness, authorization, or safety.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Liveness does not establish readiness, correctness, authorization, or safety.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0138 — Readiness

- **Category:** Operations
- **Semantic type:** Admission signal
- **Status:** Approved
- **Definition:** Evidence that a workload may receive its declared class of work under current dependencies, configuration, and safety conditions.
- **Required distinction:** Readiness is scoped and must not be inferred from Liveness.
- **Example:** A dependent artifact cites `HAL-TERM-0138` when it uses **Readiness** with this exact governed meaning: Evidence that a workload may receive its declared class of work under current dependencies, configuration, and safety conditions.
- **Counterexample:** A dependent artifact uses **Readiness** in a way that violates its required distinction: Readiness is scoped and must not be inferred from Liveness.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Readiness is scoped and must not be inferred from Liveness.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0139 — Resource

- **Category:** Operations
- **Semantic type:** Governed capacity
- **Status:** Approved
- **Definition:** A bounded consumable or allocatable asset such as compute, memory, storage, bandwidth, attention, time, energy, or device capacity.
- **Required distinction:** Resource availability does not imply authority to allocate or consume it.
- **Example:** A dependent artifact cites `HAL-TERM-0139` when it uses **Resource** with this exact governed meaning: A bounded consumable or allocatable asset such as compute, memory, storage, bandwidth, attention, time, energy, or device capacity.
- **Counterexample:** A dependent artifact uses **Resource** in a way that violates its required distinction: Resource availability does not imply authority to allocate or consume it.
- **Relationship records:** HAL-REL-0045
- **Lifecycle transitions:** None registered
- **Constraints:** Resource availability does not imply authority to allocate or consume it.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0140 — Reservation

- **Category:** Operations
- **Semantic type:** Resource claim
- **Status:** Approved
- **Definition:** A time-bounded governed allocation claim against a Resource for a declared purpose and owner.
- **Required distinction:** A Reservation is not proof the resource was consumed or the work completed.
- **Example:** A dependent artifact cites `HAL-TERM-0140` when it uses **Reservation** with this exact governed meaning: A time-bounded governed allocation claim against a Resource for a declared purpose and owner.
- **Counterexample:** A dependent artifact uses **Reservation** in a way that violates its required distinction: A Reservation is not proof the resource was consumed or the work completed.
- **Relationship records:** HAL-REL-0045
- **Lifecycle transitions:** None registered
- **Constraints:** A Reservation is not proof the resource was consumed or the work completed.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0141 — Degraded Mode

- **Category:** Operations
- **Semantic type:** Operating state
- **Status:** Approved
- **Definition:** A declared operating state in which selected capabilities or service levels are reduced while higher-priority constitutional, authority, safety, privacy, and evidence obligations remain protected.
- **Required distinction:** Degradation must not silently weaken non-degradable controls.
- **Example:** A dependent artifact cites `HAL-TERM-0141` when it uses **Degraded Mode** with this exact governed meaning: A declared operating state in which selected capabilities or service levels are reduced while higher-priority constitutional, authority, safety, privacy, and evidence obligations remain protected.
- **Counterexample:** A dependent artifact uses **Degraded Mode** in a way that violates its required distinction: Degradation must not silently weaken non-degradable controls.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Degradation must not silently weaken non-degradable controls.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0142 — Safe Mode

- **Category:** Operations
- **Semantic type:** Protective operating state
- **Status:** Approved
- **Definition:** A constrained operating state that prioritizes containment, Owner communication, essential evidence, and prevention of unauthorized or unsafe effects.
- **Required distinction:** Safe Mode is not a generic low-performance mode.
- **Example:** A dependent artifact cites `HAL-TERM-0142` when it uses **Safe Mode** with this exact governed meaning: A constrained operating state that prioritizes containment, Owner communication, essential evidence, and prevention of unauthorized or unsafe effects.
- **Counterexample:** A dependent artifact uses **Safe Mode** in a way that violates its required distinction: Safe Mode is not a generic low-performance mode.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Safe Mode is not a generic low-performance mode.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0143 — Restricted Mode

- **Category:** Operations
- **Semantic type:** Authority-limited state
- **Status:** Approved
- **Definition:** An operating state in which selected capabilities, integrations, or authority paths are disabled or narrowed because required trust, evidence, policy, or assurance is unavailable.
- **Required distinction:** It must be explicit, observable, and reversible through governed recovery.
- **Example:** A dependent artifact cites `HAL-TERM-0143` when it uses **Restricted Mode** with this exact governed meaning: An operating state in which selected capabilities, integrations, or authority paths are disabled or narrowed because required trust, evidence, policy, or assurance is unavailable.
- **Counterexample:** A dependent artifact uses **Restricted Mode** in a way that violates its required distinction: It must be explicit, observable, and reversible through governed recovery.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** It must be explicit, observable, and reversible through governed recovery.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 29, 38, 42, 47, and 51
- **Book II source:** Book II Chapters 02, 27, 28, 33, and 34
- **Book III source:** Book III Chapters 3, 4, 6, and 7
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0144 — Incident

- **Category:** Operations
- **Semantic type:** Governed adverse event
- **Status:** Approved
- **Definition:** An event or condition requiring coordinated response because it threatens constitutional conformance, authority, security, privacy, trust, availability, integrity, or material outcomes.
- **Required distinction:** An anomaly is not necessarily an Incident until classification criteria are met.
- **Example:** A dependent artifact cites `HAL-TERM-0144` when it uses **Incident** with this exact governed meaning: An event or condition requiring coordinated response because it threatens constitutional conformance, authority, security, privacy, trust, availability, integrity, or material outcomes.
- **Counterexample:** A dependent artifact uses **Incident** in a way that violates its required distinction: An anomaly is not necessarily an Incident until classification criteria are met.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** An anomaly is not necessarily an Incident until classification criteria are met.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 38, 42, and 50
- **Book II source:** Book II Chapters 27 and 28
- **Book III source:** Book III Chapters 5, 6, 7, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0145 — Quarantine

- **Category:** Operations
- **Semantic type:** Containment state
- **Status:** Approved
- **Definition:** A governed isolation state preventing a component, artifact, identity, message, or data set from participating beyond an explicitly limited inspection boundary.
- **Required distinction:** Quarantine is not deletion and must preserve required evidence.
- **Example:** A dependent artifact cites `HAL-TERM-0145` when it uses **Quarantine** with this exact governed meaning: A governed isolation state preventing a component, artifact, identity, message, or data set from participating beyond an explicitly limited inspection boundary.
- **Counterexample:** A dependent artifact uses **Quarantine** in a way that violates its required distinction: Quarantine is not deletion and must preserve required evidence.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Quarantine is not deletion and must preserve required evidence.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 38, 42, and 50
- **Book II source:** Book II Chapters 27 and 28
- **Book III source:** Book III Chapters 5, 6, 7, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0146 — Recovery

- **Category:** Operations
- **Semantic type:** Restoration process
- **Status:** Approved
- **Definition:** The governed process of restoring acceptable identity, authority, state, service, evidence, and trust after failure or compromise.
- **Required distinction:** Restart alone is not Recovery.
- **Example:** A dependent artifact cites `HAL-TERM-0146` when it uses **Recovery** with this exact governed meaning: The governed process of restoring acceptable identity, authority, state, service, evidence, and trust after failure or compromise.
- **Counterexample:** A dependent artifact uses **Recovery** in a way that violates its required distinction: Restart alone is not Recovery.
- **Relationship records:** HAL-REL-0046
- **Lifecycle transitions:** None registered
- **Constraints:** Restart alone is not Recovery.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 38, 42, and 50
- **Book II source:** Book II Chapters 27 and 28
- **Book III source:** Book III Chapters 5, 6, 7, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0147 — Recovery Point Objective

- **Category:** Operations
- **Semantic type:** Recovery target
- **Status:** Approved
- **Definition:** The maximum tolerable loss or unavailability of recoverable state measured from the disruption point for a declared domain.
- **Required distinction:** RPO is a target, not proof that recovery met it.
- **Example:** A dependent artifact cites `HAL-TERM-0147` when it uses **Recovery Point Objective** with this exact governed meaning: The maximum tolerable loss or unavailability of recoverable state measured from the disruption point for a declared domain.
- **Counterexample:** A dependent artifact uses **Recovery Point Objective** in a way that violates its required distinction: RPO is a target, not proof that recovery met it.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** RPO is a target, not proof that recovery met it.
- **Allowed aliases:** RPO
- **Book I source:** Book I Decisions 38, 42, and 50
- **Book II source:** Book II Chapters 27 and 28
- **Book III source:** Book III Chapters 5, 6, 7, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0148 — Recovery Time Objective

- **Category:** Operations
- **Semantic type:** Recovery target
- **Status:** Approved
- **Definition:** The target duration for restoring a declared service or capability to its required state after disruption.
- **Required distinction:** RTO does not authorize unsafe shortcuts during recovery.
- **Example:** A dependent artifact cites `HAL-TERM-0148` when it uses **Recovery Time Objective** with this exact governed meaning: The target duration for restoring a declared service or capability to its required state after disruption.
- **Counterexample:** A dependent artifact uses **Recovery Time Objective** in a way that violates its required distinction: RTO does not authorize unsafe shortcuts during recovery.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** RTO does not authorize unsafe shortcuts during recovery.
- **Allowed aliases:** RTO
- **Book I source:** Book I Decisions 38, 42, and 50
- **Book II source:** Book II Chapters 27 and 28
- **Book III source:** Book III Chapters 5, 6, 7, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0149 — Release

- **Category:** Engineering
- **Semantic type:** Governed artifact set
- **Status:** Approved
- **Definition:** A versioned, traceable, qualified set of software, configuration, schemas, models, and deployment artifacts approved for a declared environment and scope.
- **Required distinction:** A successful build is not a Release.
- **Example:** A dependent artifact cites `HAL-TERM-0149` when it uses **Release** with this exact governed meaning: A versioned, traceable, qualified set of software, configuration, schemas, models, and deployment artifacts approved for a declared environment and scope.
- **Counterexample:** A dependent artifact uses **Release** in a way that violates its required distinction: A successful build is not a Release.
- **Relationship records:** HAL-REL-0054
- **Lifecycle transitions:** HAL-TRANS-0025, HAL-TRANS-0026
- **Constraints:** A successful build is not a Release.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 43, 50, and 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1, 7, 8, and 9
- **Source basis:** Engineering term normalized under Books I–III
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0150 — Migration

- **Category:** Engineering
- **Semantic type:** State or contract change
- **Status:** Approved
- **Definition:** A governed transition of data, state, schema, interface, configuration, or runtime behavior from one compatible condition to another.
- **Required distinction:** A Migration must distinguish reversible steps from irreversible effects and compensation.
- **Example:** A dependent artifact cites `HAL-TERM-0150` when it uses **Migration** with this exact governed meaning: A governed transition of data, state, schema, interface, configuration, or runtime behavior from one compatible condition to another.
- **Counterexample:** A dependent artifact uses **Migration** in a way that violates its required distinction: A Migration must distinguish reversible steps from irreversible effects and compensation.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** A Migration must distinguish reversible steps from irreversible effects and compensation.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 43, 50, and 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1, 7, 8, and 9
- **Source basis:** Engineering term normalized under Books I–III
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0151 — Architecture Decision Record

- **Category:** Engineering
- **Semantic type:** Decision record
- **Status:** Approved
- **Definition:** A durable record of a consequential architecture decision, context, alternatives, rationale, consequences, source traceability, and review status.
- **Required distinction:** An ADR cannot authorize deviation from Book II without the approved architecture-governance process.
- **Example:** A dependent artifact cites `HAL-TERM-0151` when it uses **Architecture Decision Record** with this exact governed meaning: A durable record of a consequential architecture decision, context, alternatives, rationale, consequences, source traceability, and review status.
- **Counterexample:** A dependent artifact uses **Architecture Decision Record** in a way that violates its required distinction: An ADR cannot authorize deviation from Book II without the approved architecture-governance process.
- **Relationship records:** HAL-REL-0047
- **Lifecycle transitions:** None registered
- **Constraints:** An ADR cannot authorize deviation from Book II without the approved architecture-governance process.
- **Allowed aliases:** ADR
- **Book I source:** Book I Decisions 43, 50, and 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1, 7, 8, and 9
- **Source basis:** Engineering term normalized under Books I–III
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0152 — Architecture Deviation

- **Category:** Engineering
- **Semantic type:** Governed exception class
- **Status:** Approved
- **Definition:** A documented departure from an applicable Book II requirement processed through architecture governance with scope, risk, evidence, approval, and expiry or remediation.
- **Required distinction:** It is not an ordinary Book III control exception and cannot amend Book II silently.
- **Example:** A dependent artifact cites `HAL-TERM-0152` when it uses **Architecture Deviation** with this exact governed meaning: A documented departure from an applicable Book II requirement processed through architecture governance with scope, risk, evidence, approval, and expiry or remediation.
- **Counterexample:** A dependent artifact uses **Architecture Deviation** in a way that violates its required distinction: It is not an ordinary Book III control exception and cannot amend Book II silently.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** It is not an ordinary Book III control exception and cannot amend Book II silently.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 43, 50, and 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1, 7, 8, and 9
- **Source basis:** Engineering term normalized under Books I–III
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0153 — Control

- **Category:** Engineering
- **Semantic type:** Enforceable rule record
- **Status:** Approved
- **Definition:** A stable, attributable requirement with applicability, responsibility, enforcement, evidence, severity, exception authority, verification, and source traceability.
- **Required distinction:** Advice is not a Control unless it is made objectively reviewable.
- **Example:** A dependent artifact cites `HAL-TERM-0153` when it uses **Control** with this exact governed meaning: A stable, attributable requirement with applicability, responsibility, enforcement, evidence, severity, exception authority, verification, and source traceability.
- **Counterexample:** A dependent artifact uses **Control** in a way that violates its required distinction: Advice is not a Control unless it is made objectively reviewable.
- **Relationship records:** HAL-REL-0048
- **Lifecycle transitions:** None registered
- **Constraints:** Advice is not a Control unless it is made objectively reviewable.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 43, 50, and 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1, 7, 8, and 9
- **Source basis:** Engineering term normalized under Books I–III
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0154 — Exception

- **Category:** Engineering
- **Semantic type:** Time-bounded control relief
- **Status:** Approved
- **Definition:** A documented, scoped, risk-assessed, compensating, approved, expiring departure from a waivable lower-order Control.
- **Required distinction:** A constitutional invariant cannot be waived; an Architecture Deviation uses its own governance path.
- **Example:** A dependent artifact cites `HAL-TERM-0154` when it uses **Exception** with this exact governed meaning: A documented, scoped, risk-assessed, compensating, approved, expiring departure from a waivable lower-order Control.
- **Counterexample:** A dependent artifact uses **Exception** in a way that violates its required distinction: A constitutional invariant cannot be waived; an Architecture Deviation uses its own governance path.
- **Relationship records:** HAL-REL-0048
- **Lifecycle transitions:** HAL-TRANS-0027, HAL-TRANS-0028
- **Constraints:** A constitutional invariant cannot be waived; an Architecture Deviation uses its own governance path.
- **Allowed aliases:** waiver
- **Book I source:** Book I Decisions 43, 50, and 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1, 7, 8, and 9
- **Source basis:** Engineering term normalized under Books I–III
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0155 — Definition of Ready

- **Category:** Engineering
- **Semantic type:** Entry criteria
- **Status:** Approved
- **Definition:** The minimum evidenced conditions required before consequential implementation work may begin or enter its next controlled stage.
- **Required distinction:** Readiness does not imply approval to release or cross the Reality Boundary.
- **Example:** A dependent artifact cites `HAL-TERM-0155` when it uses **Definition of Ready** with this exact governed meaning: The minimum evidenced conditions required before consequential implementation work may begin or enter its next controlled stage.
- **Counterexample:** A dependent artifact uses **Definition of Ready** in a way that violates its required distinction: Readiness does not imply approval to release or cross the Reality Boundary.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Readiness does not imply approval to release or cross the Reality Boundary.
- **Allowed aliases:** DoR
- **Book I source:** Book I Decisions 43, 50, and 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1, 7, 8, and 9
- **Source basis:** Engineering term normalized under Books I–III
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0156 — Definition of Done

- **Category:** Engineering
- **Semantic type:** Completion criteria
- **Status:** Approved
- **Definition:** The minimum evidenced conditions required before work may be treated as complete within a declared scope.
- **Required distinction:** Done does not erase post-release monitoring, retention, or recovery obligations.
- **Example:** A dependent artifact cites `HAL-TERM-0156` when it uses **Definition of Done** with this exact governed meaning: The minimum evidenced conditions required before work may be treated as complete within a declared scope.
- **Counterexample:** A dependent artifact uses **Definition of Done** in a way that violates its required distinction: Done does not erase post-release monitoring, retention, or recovery obligations.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Done does not erase post-release monitoring, retention, or recovery obligations.
- **Allowed aliases:** DoD
- **Book I source:** Book I Decisions 43, 50, and 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapters 1, 7, 8, and 9
- **Source basis:** Engineering term normalized under Books I–III
- **Book X chapter:** 11
- **Introduced:** v1.0

### HAL-TERM-0157 — Canonical Label

- **Category:** Naming
- **Semantic type:** Naming element
- **Status:** Approved
- **Definition:** The single approved label used as the primary reference for one Canonical Term.
- **Required distinction:** Capitalization is part of controlled usage when needed to distinguish the term from ordinary language.
- **Example:** A dependent artifact cites `HAL-TERM-0157` when it uses **Canonical Label** with this exact governed meaning: The single approved label used as the primary reference for one Canonical Term.
- **Counterexample:** A dependent artifact uses **Canonical Label** in a way that violates its required distinction: Capitalization is part of controlled usage when needed to distinguish the term from ordinary language.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Capitalization is part of controlled usage when needed to distinguish the term from ordinary language.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29, 30, and 35
- **Book III source:** Book III Chapters 1, 3, 4, 8, and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 12
- **Introduced:** v1.0

### HAL-TERM-0158 — Acronym

- **Category:** Naming
- **Semantic type:** Abbreviated label
- **Status:** Approved
- **Definition:** An approved shortened form mapped to exactly one canonical expansion within its declared scope.
- **Required distinction:** An Acronym must be expanded on first use unless the audience and artifact make the meaning unambiguous.
- **Example:** A dependent artifact cites `HAL-TERM-0158` when it uses **Acronym** with this exact governed meaning: An approved shortened form mapped to exactly one canonical expansion within its declared scope.
- **Counterexample:** A dependent artifact uses **Acronym** in a way that violates its required distinction: An Acronym must be expanded on first use unless the audience and artifact make the meaning unambiguous.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** An Acronym must be expanded on first use unless the audience and artifact make the meaning unambiguous.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29, 30, and 35
- **Book III source:** Book III Chapters 1, 3, 4, 8, and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 12
- **Introduced:** v1.0

### HAL-TERM-0159 — Semantic Version

- **Category:** Governance
- **Semantic type:** Compatibility marker
- **Status:** Approved
- **Definition:** A version assigned to the Book X corpus to communicate the compatibility impact of semantic changes.
- **Required distinction:** It does not replace the versioning of Books I-III, components, or interfaces.
- **Example:** A dependent artifact cites `HAL-TERM-0159` when it uses **Semantic Version** with this exact governed meaning: A version assigned to the Book X corpus to communicate the compatibility impact of semantic changes.
- **Counterexample:** A dependent artifact uses **Semantic Version** in a way that violates its required distinction: It does not replace the versioning of Books I-III, components, or interfaces.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** It does not replace the versioning of Books I-III, components, or interfaces.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29, 30, and 35
- **Book III source:** Book III Chapters 1, 3, 4, 8, and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 12
- **Introduced:** v1.0

### HAL-TERM-0160 — Term Status

- **Category:** Governance
- **Semantic type:** Lifecycle label
- **Status:** Approved
- **Definition:** The controlled state of a Term Record: Proposed, Candidate, Approved, Deprecated, Retired, or Rejected.
- **Required distinction:** Status must not be inferred from document age or usage frequency.
- **Example:** A dependent artifact cites `HAL-TERM-0160` when it uses **Term Status** with this exact governed meaning: The controlled state of a Term Record: Proposed, Candidate, Approved, Deprecated, Retired, or Rejected.
- **Counterexample:** A dependent artifact uses **Term Status** in a way that violates its required distinction: Status must not be inferred from document age or usage frequency.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Status must not be inferred from document age or usage frequency.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29, 30, and 35
- **Book III source:** Book III Chapters 1, 3, 4, 8, and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 12
- **Introduced:** v1.0

### HAL-TERM-0161 — Cross-Book Term Index

- **Category:** Governance
- **Semantic type:** Traceability index
- **Status:** Approved
- **Definition:** The mapping from each Canonical Term to its authoritative source, Book X record, and known use across the HAL canon.
- **Required distinction:** It is an index, not a substitute for reading the governing source.
- **Example:** A dependent artifact cites `HAL-TERM-0161` when it uses **Cross-Book Term Index** with this exact governed meaning: The mapping from each Canonical Term to its authoritative source, Book X record, and known use across the HAL canon.
- **Counterexample:** A dependent artifact uses **Cross-Book Term Index** in a way that violates its required distinction: It is an index, not a substitute for reading the governing source.
- **Relationship records:** HAL-REL-0049
- **Lifecycle transitions:** None registered
- **Constraints:** It is an index, not a substitute for reading the governing source.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29, 30, and 35
- **Book III source:** Book III Chapters 1, 3, 4, 8, and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 12
- **Introduced:** v1.0

### HAL-TERM-0162 — Semantic Compatibility

- **Category:** Governance
- **Semantic type:** Compatibility relation
- **Status:** Approved
- **Definition:** The condition in which a terminology or information-model change preserves the valid interpretation and obligations of dependent artifacts within declared scope.
- **Required distinction:** Textual similarity alone does not establish Semantic Compatibility.
- **Example:** A dependent artifact cites `HAL-TERM-0162` when it uses **Semantic Compatibility** with this exact governed meaning: The condition in which a terminology or information-model change preserves the valid interpretation and obligations of dependent artifacts within declared scope.
- **Counterexample:** A dependent artifact uses **Semantic Compatibility** in a way that violates its required distinction: Textual similarity alone does not establish Semantic Compatibility.
- **Relationship records:** None registered
- **Lifecycle transitions:** None registered
- **Constraints:** Textual similarity alone does not establish Semantic Compatibility.
- **Allowed aliases:** None
- **Book I source:** Book I Constitutional Governance and Decision 58
- **Book II source:** Book II Chapters 29, 30, and 35
- **Book III source:** Book III Chapters 1, 3, 4, 8, and 9
- **Source basis:** Book X semantic-governance choice constrained by higher-order sources
- **Book X chapter:** 12
- **Introduced:** v1.0

### HAL-TERM-0163 — Trust Domain

- **Category:** Trust
- **Semantic type:** Governance context
- **Status:** Approved
- **Definition:** A bounded identity, policy, evidence, security, privacy, and accountability context within which trust assumptions and controls are evaluated.
- **Required distinction:** Trust Domain is the generic concept. An External Trust Domain is a Trust Domain outside HAL's native governance boundary and requires governed cross-domain exchange.
- **Example:** A dependent artifact cites `HAL-TERM-0163` when it uses **Trust Domain** with this exact governed meaning: A bounded identity, policy, evidence, security, privacy, and accountability context within which trust assumptions and controls are evaluated.
- **Counterexample:** A dependent artifact uses **Trust Domain** in a way that violates its required distinction: Trust Domain is the generic concept. An External Trust Domain is a Trust Domain outside HAL's native governance boundary and requires governed cross-domain exchange.
- **Relationship records:** HAL-REL-0050
- **Lifecycle transitions:** None registered
- **Constraints:** Trust Domain is the generic concept. An External Trust Domain is a Trust Domain outside HAL's native governance boundary and requires governed cross-domain exchange.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 49 and 52
- **Book II source:** Book II Chapters 18, 21, and 24
- **Book III source:** Book III Chapter 5
- **Source basis:** Derived semantic synthesis required by the Book X scope
- **Book X chapter:** 10
- **Introduced:** v1.0

### HAL-TERM-0164 — Owner Authorization Ceremony

- **Category:** Authority
- **Semantic type:** Protected authorization mechanism
- **Status:** Approved
- **Definition:** The Book II-governed mechanism through which the Owner authorizes an exact protected change, capability-class decision, Treaty, or other Owner-reserved matter bound to an immutable decision identifier, declared scope, and validity period.
- **Required distinction:** It is not conversational consent, ordinary Delegation, reusable standing permission, or a substitute for Constitutional Kernel validation; it authorizes only the exact recorded matter.
- **Example:** The Owner authorizes Treaty `TRT-2048` through a ceremony record bound to that exact immutable Treaty digest, scope, activation window, and decision identifier.
- **Counterexample:** A chat message saying “I approve future treaties with this partner” is treated as a reusable Owner authorization.
- **Relationship records:** HAL-REL-0051, HAL-REL-0052
- **Lifecycle transitions:** None registered
- **Constraints:** It is not conversational consent, ordinary Delegation, reusable standing permission, or a substitute for Constitutional Kernel validation; it authorizes only the exact recorded matter.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 48, 49, 50, and 58
- **Book II source:** Book II Chapters 03, 05, 16, 21, and 29
- **Book III source:** Book III Chapters 1, 5, 7, 8, and 9
- **Source basis:** Direct source normalization
- **Book X chapter:** 4
- **Introduced:** v1.0

### HAL-TERM-0165 — Evidence Service

- **Category:** Evidence
- **Semantic type:** Architectural component class
- **Status:** Approved
- **Definition:** The Book II authoritative service that admits and governs Evidence Objects and owns their custody, signatures, provenance bindings, and verification state.
- **Required distinction:** Observability, audit, and source systems may produce Evidence Candidates or records but cannot independently admit Evidence Objects or mutate evidentiary meaning.
- **Example:** A telemetry record enters as an Evidence Candidate; the Evidence Service validates provenance and custody before admitting a new immutable Evidence Object.
- **Counterexample:** A logging or observability service labels its mutable record an Evidence Object without the governed admission process.
- **Relationship records:** HAL-REL-0053
- **Lifecycle transitions:** None registered
- **Constraints:** Observability, audit, and source systems may produce Evidence Candidates or records but cannot independently admit Evidence Objects or mutate evidentiary meaning.
- **Allowed aliases:** None
- **Book I source:** Book I Decision 26
- **Book II source:** Book II Chapters 18 and 25
- **Book III source:** Book III Chapters 4, 5, 6, and 8
- **Source basis:** Direct source normalization
- **Book X chapter:** 7
- **Introduced:** v1.0

### HAL-TERM-0166 — Release Authority

- **Category:** Engineering
- **Semantic type:** Governed certification role
- **Status:** Approved
- **Definition:** The Book III-designated role authorized to certify a qualified Release for a declared deployment scope after all required verification and reviews have passed.
- **Required distinction:** Release Authority cannot waive Constitutional Invariants, replace architecture, security, or privacy review, or authorize deployment beyond the certified scope.
- **Example:** The Release Authority certifies Release `R-42` only after the scoped qualification evidence and required architecture, security, and privacy reviews pass.
- **Counterexample:** A successful CI build deploys itself because pipeline success is treated as Release Authority approval.
- **Relationship records:** HAL-REL-0054
- **Lifecycle transitions:** None registered
- **Constraints:** Release Authority cannot waive Constitutional Invariants, replace architecture, security, or privacy review, or authorize deployment beyond the certified scope.
- **Allowed aliases:** None
- **Book I source:** Book I Decisions 43, 50, and 58
- **Book II source:** Book II Chapters 29 and 35
- **Book III source:** Book III Chapter 7
- **Source basis:** Engineering term normalized under Books I–III
- **Book X chapter:** 11
- **Introduced:** v1.0

# Appendix B — Relationship catalog

| Source | Relationship | Target | Source cardinality | Target cardinality | Constraint |
|---|---|---|---|---|---|
| Owner | owns constitutionally | HAL | 1 | 1 | Book I-reserved ownership; infrastructure possession is insufficient. |
| Constitution | governs | HAL | 1 | 1 | Supreme authority. |
| Constitutional Kernel | enforces | Constitutional Invariant | 1 | many | Only at Book II-designated enforcement points. |
| Constitutional Mirror | describes | HAL | 1 | 1 | Evidence-linked and non-self-authorizing. |
| HAL | manifests through | Presence | 1 | many | All Presences share one HAL identity. |
| Presence | binds to | Embodiment | many | 0..many | Within explicit context and lifecycle. |
| Identity Record | represents | Identity | 1 | 1 | Record and entity remain distinct. |
| Identifier | references | Identity | many | 1 | Within a declared namespace. |
| Identity Attribute | describes | Identity | many | 1 | Does not establish authority. |
| Authentication Evidence | supports | Authentication | many | many | Evidence role, not authorization. |
| Delegation | grants bounded | Authority | many | 1 | Cannot exceed delegator authority. |
| Policy | evaluates for | Permission | many | many | Result is contextual and scoped. |
| Authority | constrains | Permission | many | many | Authority is not the decision result. |
| Trust | informs | Policy Decision Record | many | many | Never sole authority. |
| Intent | decomposes into | Goal | 1 | many | Traceability is retained. |
| Goal | decomposes into | Objective | 1 | many | Criteria remain explicit. |
| Objective | is pursued by | Plan | many | many | Plans do not confer authority. |
| Plan | contains | Task | 1 | many | Execution may diverge with evidence. |
| Decision Object | records | Judgment | many | 1 | Includes alternatives and uncertainty. |
| Outcome Object | evaluates | Goal | many | many | Against evidence and side effects. |
| Capability Contract | defines | Capability | many | 1 | Versioned semantic contract. |
| Provider | fulfills | Capability | many | many | Selection remains governed. |
| Adapter | connects | Provider | many | 1 | Preserves canonical capability semantics. |
| Transaction | coordinates | Action | 1 | many | Includes commit and recovery state. |
| Canary | is governed stage within | Reality Boundary | many | 1 | A Canary is a limited real-operation stage; it is not a kind of boundary. |
| Evidence Candidate | may be admitted as | Evidence Object | many | 0..1 | Only through the authoritative evidence process. |
| Evidence Object | supports or opposes | Claim | many | many | Relation and weight are explicit. |
| Evidence Graph | contains | Evidence Object | 1 | many | Objects remain immutable. |
| Verification | evaluates | Claim | many | many | Against explicit criteria. |
| Assurance Case | organizes | Claim | 1 | many | Includes reasoning and defeaters. |
| Certification | depends on | Assurance Case | many | 1..many | Scoped and time-bounded. |
| Experience Ledger | contains | Experience | 1 | many | Append-oriented and governed. |
| Memory Graph | associates | Memory | 1 | many | Association is not causation. |
| Knowledge Graph | represents | Knowledge | 1 | many | Preserves provenance and validity. |
| Pattern | is derived from | Experience | many | many | Reproducibly supported. |
| Wisdom | informs | Judgment | many | many | Does not grant authority. |
| Command | may cause | Event | many | 0..many | Only after authoritative handling. |
| Projection | is derived from | Event Journal | many | 1..many | Not authoritative unless designated. |
| Transactional Outbox | publishes | Event | 1 | many | After local authoritative commit. |
| Message Envelope | carries | Command | many | 0..1 | Also may carry Query or Event. |
| Treaty | governs exchange with | External Trust Domain | many | 1 | Revocable and constitutionally bounded. |
| Constitutional Firewall | enforces | Treaty | 1 | many | At external exchange paths. |
| Data Classification | constrains | Retention Class | many | many | Alongside purpose and authority. |
| Supervisor | controls lifecycle of | Service | many | many | Within declared authority. |
| Reservation | allocates | Resource | many | 1 | Time-bounded and purpose-bound. |
| Recovery | restores toward | Desired State | many | 1 | Validated against Observed State. |
| Architecture Decision Record | documents | Semantic Change | many | 0..many | When architectural consequence exists. |
| Exception | applies to | Control | many | 1 | Time-bounded; never constitutional. |
| Cross-Book Term Index | indexes | Canonical Term | 1 | many | Does not replace governing source. |
| External Trust Domain | specializes | Trust Domain | many | 1 | Externality changes governance assumptions and requires controlled exchange. |
| Owner | performs | Owner Authorization Ceremony | 1 | many | Each ceremony is bound to one exact immutable decision identifier, scope, and validity period. |
| Owner Authorization Ceremony | authorizes exact | Protected Action | many | 1 | Authorization is non-transferable and cannot be reused for a different action, Treaty, capability class, or mutation. |
| Evidence Service | admits and governs | Evidence Object | 1 | many | Only the authoritative admission process may create governed Evidence Objects or change their verification state through new linked evidence. |
| Release Authority | certifies | Release | many | many | Certification is evidence-based, attributable, scoped, and cannot exceed the qualified release or deployment scope. |

# Appendix C — Lifecycle transition catalog

| Concept | From | To | Entry condition | Required evidence |
|---|---|---|---|---|
| Term Record | Proposed | Candidate | Semantic steward accepts a complete proposal | Proposal and source mapping |
| Term Record | Candidate | Approved | Cross-book review passes and authority is confirmed | Review record and decision |
| Term Record | Approved | Deprecated | Replacement and migration plan are approved | Deprecation notice |
| Term Record | Deprecated | Retired | Sunset conditions are met and dependents are migrated | Retirement verification |
| Delegation | Draft | Active | Authorized delegator signs within scope | Delegation record |
| Delegation | Active | Expired | Expiration time is reached | Expiry event |
| Delegation | Active | Revoked | Authorized revoker acts | Revocation evidence |
| Transaction | Proposed | Authorized | Authority and policy checks pass | Policy Decision Record |
| Transaction | Authorized | Prepared | Preconditions and resources are secured | Preparation evidence |
| Transaction | Prepared | Committed | Commit Barrier conditions pass | Commit record |
| Transaction | Committed | Completed | Effects and outcomes are observed | Outcome and Evidence Objects |
| Transaction | Prepared | Rolled Back | Reversible state is restored | Rollback evidence |
| Transaction | Committed | Compensating | Irreversible effects require remediation | Compensation decision |
| Evidence Candidate | Collected | Admitted | Evidence Service validates provenance and custody | Admission record |
| Certification | Proposed | Active | Authorized certifier approves scoped assurance case | Certification record |
| Certification | Active | Suspended | Material evidence defect or risk invalidates reliance | Suspension record |
| Certification | Active | Expired | Validity period ends | Expiry record |
| Treaty | Draft | Active | The Owner Authorization Ceremony approves the exact, time-bounded Treaty | Owner authorization bound to the exact Treaty plus Constitutional Firewall activation evidence |
| Treaty | Active | Suspended | Boundary conditions or trust fail | Suspension and containment record |
| Treaty | Active | Revoked | Authorized party terminates the Treaty | Revocation evidence |
| Service | Starting | Ready | Readiness criteria pass | Readiness observation |
| Service | Ready | Degraded | Declared service conditions fall below threshold | Health and incident evidence |
| Service | Degraded | Quarantined | Containment criteria require isolation | Quarantine record |
| Service | Quarantined | Recovering | Recovery plan is authorized | Recovery record |
| Release | Candidate | Qualified | Required verification and reviews pass | Release-readiness record |
| Release | Qualified | Released | Release Authority approves deployment scope | Release certification |
| Exception | Proposed | Active | Authorized approver accepts bounded residual risk | Exception record |
| Exception | Active | Expired | Expiration date is reached | Fail-closed signal or escalation |

# Appendix D — Acronym, ambiguity, and deprecation registers

## Acronyms

| Acronym | Expansion | Use note |
|---|---|---|
| ADR | Architecture Decision Record | Engineering and architecture decisions |
| API | Application Programming Interface | Interface reference |
| CF | Constitutional Firewall | Trust architecture |
| DoD | Definition of Done | Engineering lifecycle |
| DoR | Definition of Ready | Engineering lifecycle |
| ETD | External Trust Domain | Trust architecture |
| HAL | HAL | Constitutional identity; not expanded into an invented phrase |
| ID | Identifier | Use only where the namespace is clear |
| PII | Personally Identifiable Information | Prefer Personal Data in canonical prose unless a legal regime requires PII |
| RPO | Recovery Point Objective | Recovery |
| RTO | Recovery Time Objective | Recovery |
| SBOM | Software Bill of Materials | Supply-chain evidence |
| SDLC | Secure Development Lifecycle | Engineering |
| SLO | Service Level Objective | Operations |
| TOC | Table of Contents | Publication |

## Forbidden or qualification-required usages

| Usage | Required replacement | Reason |
|---|---|---|
| user | Use Principal, Owner, human, operator, or another qualified role. | “User” collapses distinct identity and authority roles. |
| agent | Use HAL, Principal, service, model, provider, or external agent. | “Agent” obscures identity, accountability, and authority. |
| authorization | Use Authority for governed scope; Permission for the decision result; Policy evaluation for the process. | The word often collapses three distinct concepts. |
| proof | Use Evidence Object, Verification result, or formal proof as applicable. | Evidence supports claims; empirical evidence is not necessarily mathematical proof. |
| truth | Use authoritative state, verified claim, observation, or confidence-qualified conclusion. | Unqualified truth hides source, time, scope, and uncertainty. |
| memory | Use Experience, Experience Ledger, Memory, Knowledge, or cache as applicable. | The generic word hides governance, durability, and epistemic status. |
| production | Qualify the exact environment and Reality Boundary stage. | A name does not establish real authority or effect boundaries. |
| rollback | Use Rollback only for truthful reversal; use Compensation for remedial new action. | External effects may not be erasable. |
| exactly once | State the bounded delivery, deduplication, and effect guarantee. | Distributed and external effects rarely support an unqualified guarantee. |
| real time | Declare latency, freshness, clock, and ordering bounds. | The phrase is not objectively testable without thresholds. |
| secure | Name the control objective, threat, enforcement, and evidence. | A broad adjective is not a security claim. |
| safe | Name the hazard, invariant, containment, verification, and residual risk. | A broad adjective is not a safety claim. |
| trusted | Name the Trust dimension, scope, evidence, confidence, and expiry. | Trust is multidimensional and does not imply authority. |
| owner | Capitalize Owner only for the constitutional role; qualify other ownership such as code owner or data custodian. | Lowercase operational ownership must not be confused with Book I authority. |
| HAL instance | Use Runtime, Node, Presence, service instance, or model instance. | HAL has one constitutional identity. |
| evidence | Use Evidence Object when authoritative admission is meant; otherwise qualify Evidence Candidate or source material. | Not every record or observation is authoritative Evidence. |
| Founder | Use Owner in new canon text; Founder is permitted only as a historical source alias for that same role. | Book I states Founder and Owner are the same constitutional role; Founder must not be interpreted as a second role. |

# Appendix E — Cross-book adoption rules

1. Books I–III remain controlling and are never rewritten merely to match Book X.
2. Books IV–IX MUST use Book X stable IDs and Canonical Labels when they mean a Book X concept.
3. Component-specific terms belong in Book IV but SHOULD reuse or specialize Book X concepts without redefining them.
4. Machine-facing contract names belong in Book IX and MUST map to Book X terms where the semantics are shared.
5. Operations, security, governance, and verification manuals MAY introduce domain procedures but MUST NOT repurpose Book X labels.
6. A dependent artifact encountering an ambiguity MUST qualify the term, cite the Term ID, and submit a Semantic Change proposal when the canonical corpus is insufficient.

# Glossary certification

This edition contains **166 approved Canonical Terms**, **54 typed relationship records**, **28 lifecycle transition records**, **15 registered acronyms**, and **17 forbidden or qualification-required usages**. Constitutional, architectural, engineering, semantic-consistency, usability, forward-compatibility, and Owner-threshold reviews are complete. No open Owner Review decision is required for publication.
