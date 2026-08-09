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
