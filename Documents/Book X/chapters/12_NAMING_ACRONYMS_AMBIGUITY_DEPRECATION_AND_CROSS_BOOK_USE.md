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
