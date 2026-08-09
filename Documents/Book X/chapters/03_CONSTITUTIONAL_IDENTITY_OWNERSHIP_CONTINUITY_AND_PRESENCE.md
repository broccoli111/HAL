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
