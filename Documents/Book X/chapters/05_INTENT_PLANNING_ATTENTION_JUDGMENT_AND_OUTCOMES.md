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
