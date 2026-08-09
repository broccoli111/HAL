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
