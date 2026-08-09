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
