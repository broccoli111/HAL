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
