# HAL Book VIII — Verification and Certification Manual

**Version:** 1.0  
**Status:** Final  
**Date:** 2026-07-27  
**Authority:** Subordinate to Books I and II; implements Books III and IV using Book X semantics.

## Authority statement

Book I is supreme. Book II is the authoritative architecture. Book III governs engineering. Book IV defines component obligations. Book IX defines interface contracts. Book X governs canonical meaning. Book VIII defines how HAL proves and certifies conformance. It does not create Authority, alter architecture, or replace Book IX contracts.

## Revision history

| Version | Date | Status | Summary |
|---|---|---|---|
| 1.0 | 2026-07-27 | Final | Initial complete controlled edition |

## Table of contents

1. Authority, Scope, Roles, and Assurance Governance
2. Claims, Evidence, Assurance Cases, and Risk Classification
3. Verification Planning, Budgets, Confidence, Fidelity, and Reproducibility
4. Verification Ladder and Reality Boundary Progression
5. Static, Dynamic, Counterfactual, Failure, Recovery, and Human Verification
6. Constitutional, Architecture, Authority, Security, Privacy, Safety, and Trust Assurance
7. Continuous Verification and Regression Certification
8. Component and Capability Certification
9. Release and Deployment Certification
10. Treaty and External-Domain Certification
11. Certification Decisions, Conditions, Suspension, Revocation, and Reinstatement
12. Evidence Retention, Reporting, Tooling, and Audit
13. Catalogs, Checklists, Templates, and Conformance Model

## Conformance model

Every material claim is evaluated against declared criteria and immutable evidence. Certification is scoped, expiring, continuously monitored, and immediately restrictable when its basis weakens. Verification evidence supports decisions; it never creates identity, authority, permission, trust, or Owner approval.


---

# Chapter 1 — Authority, Scope, Roles, and Assurance Governance

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Establish the authority, scope, independence, roles, records, and decision boundaries for verification and certification.

## 2. Scope

This chapter applies to all assurance work, all certifications, all decisions, all plans, all targets, consequential targets, escalations, source conflict. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 1-7, 47-51, 58; Book II Chapters 1, 3, 35; Book III Chapters 1, 8, 9; Book IV CMP-01, CMP-15, CMP-18. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Assurance Governor, Certification Authority, Verification Lead, Evidence Custodian, Independent Reviewer, Target Owner. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### GOV-01-001 — Scope every assurance decision

Every verification or certification activity MUST name the target, version, environment, claims, exclusions, validity period, and accountable Target Owner.

- Applicability: all assurance work
- Responsible role: Verification Lead
- Enforcement: plan-schema gate and independent review
- Required evidence: approved Verification Plan
- Severity: High
- Exception authority: Assurance Governor

### GOV-01-002 — Preserve reviewer independence

A person who authored or approved a consequential implementation MUST NOT be the sole reviewer or Certification Authority for that target.

- Applicability: consequential targets
- Responsible role: Certification Authority
- Enforcement: role-separation check
- Required evidence: reviewer independence record
- Severity: Critical
- Exception authority: Assurance Governor

### GOV-01-003 — Separate verification from certification

A Verification Result MUST report evidence against criteria; only the designated Certification Authority MAY issue a Certification Decision.

- Applicability: all decisions
- Responsible role: Verification Lead
- Enforcement: typed decision objects and access control
- Required evidence: Verification Result and Certification Decision
- Severity: Critical
- Exception authority: Assurance Governor

### GOV-01-004 — Forbid authority creation

Verification, confidence, trust, or certification MUST NOT create Authority, Permission, Owner approval, or Treaty scope.

- Applicability: all targets
- Responsible role: Certification Authority
- Enforcement: policy invariant test
- Required evidence: authority-path attestation
- Severity: Critical
- Exception authority: none

### GOV-01-005 — Use current higher-order sources

Assurance work MUST identify and hash the applicable versions of Books I, II, III, IV, and X before execution.

- Applicability: all plans
- Responsible role: Verification Lead
- Enforcement: source-manifest validation
- Required evidence: source integrity manifest
- Severity: High
- Exception authority: Certification Authority

### GOV-01-006 — Record conflicts without reinterpretation

A suspected conflict with a higher-order source MUST halt the affected conclusion, preserve the higher-order rule, and enter a conflict record.

- Applicability: source conflict
- Responsible role: Assurance Governor
- Enforcement: blocking workflow
- Required evidence: conflict record and disposition
- Severity: Critical
- Exception authority: none

### GOV-01-007 — Maintain decision accountability

Every certification decision MUST identify the deciding authority, rationale, conditions, evidence manifest, dissent, issue time, expiry, and revocation triggers.

- Applicability: all certifications
- Responsible role: Certification Authority
- Enforcement: decision-schema validation
- Required evidence: signed decision record
- Severity: High
- Exception authority: Assurance Governor

### GOV-01-008 — Escalate only Owner matters

Owner Review MUST be limited to constitutional philosophy, Owner authority, new capability classes, new Treaty classes, irreversible risk, constitutional invariants, major human-value conflicts, or stewardship choices evidence cannot settle.

- Applicability: escalations
- Responsible role: Assurance Governor
- Enforcement: escalation classification review
- Required evidence: Owner Review packet or engineering disposition
- Severity: High
- Exception authority: Owner

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 1-7, 47-51, 58; Book II Chapters 1, 3, 35; Book III Chapters 1, 8, 9; Book IV CMP-01, CMP-15, CMP-18
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Chapter 2 — Claims, Evidence, Assurance Cases, and Risk Classification

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Define admissible claims, defeaters, evidence, assurance arguments, and consequence-based risk classes.

## 2. Scope

This chapter applies to R2-R4 targets, all assurance cases, all claims, all evaluations, all evidence, all targets, material claims, mixed-risk targets. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 26, 34, 40, 43, 55-58; Book II Chapters 17, 18, 35; Book III Chapters 6, 8, 9; Book IV CMP-15, CMP-18. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Claim Owner, Assurance Case Author, Evidence Custodian, Risk Classifier, Independent Reviewer. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### CLM-02-001 — Make claims falsifiable

Every material claim MUST state subject, predicate, scope, environment, acceptance criteria, uncertainty, and conditions that would falsify or invalidate it.

- Applicability: material claims
- Responsible role: Claim Owner
- Enforcement: claim-schema lint
- Required evidence: Claim Record
- Severity: High
- Exception authority: Certification Authority

### CLM-02-002 — Bind evidence immutably

Every cited item MUST be an immutable Evidence Object or a content-addressed candidate with provenance, custody, classification, time, integrity, and access metadata.

- Applicability: all evidence
- Responsible role: Evidence Custodian
- Enforcement: digest and custody validation
- Required evidence: Evidence Manifest
- Severity: Critical
- Exception authority: none

### CLM-02-003 — Expose defeaters

Every Assurance Case MUST list known rebuttals, undercutters, assumptions, missing evidence, and conditions that would reduce confidence.

- Applicability: all assurance cases
- Responsible role: Assurance Case Author
- Enforcement: argument review
- Required evidence: defeater register
- Severity: High
- Exception authority: Certification Authority

### CLM-02-004 — Prevent evidence laundering

A repeated assertion, model output, metric dashboard, approval, or prior certificate MUST NOT be treated as independent evidence merely because it appears in multiple artifacts.

- Applicability: all evaluations
- Responsible role: Independent Reviewer
- Enforcement: provenance graph analysis
- Required evidence: independence assessment
- Severity: Critical
- Exception authority: none

### CLM-02-005 — Classify by consequence

Targets MUST be classified R0 Informational, R1 Limited, R2 Significant, R3 Critical, or R4 Constitutional according to authority, irreversibility, trust-boundary, privacy, safety, continuity, and blast-radius consequences.

- Applicability: all targets
- Responsible role: Risk Classifier
- Enforcement: risk-model gate
- Required evidence: Risk Classification Record
- Severity: Critical
- Exception authority: Assurance Governor

### CLM-02-006 — Choose the highest applicable class

When dimensions disagree, the highest material consequence class MUST govern unless a documented independent review proves the dimension inapplicable.

- Applicability: mixed-risk targets
- Responsible role: Risk Classifier
- Enforcement: classification review
- Required evidence: risk rationale
- Severity: High
- Exception authority: Assurance Governor

### CLM-02-007 — Maintain claim coverage

Every source requirement, invariant, authority path, trust boundary, protected state transition, failure mode, recovery path, and privacy duty in scope MUST map to at least one claim and method.

- Applicability: R2-R4 targets
- Responsible role: Verification Lead
- Enforcement: traceability coverage check
- Required evidence: claim-to-source matrix
- Severity: Critical
- Exception authority: none

### CLM-02-008 — Reject unsupported conclusions

A claim with missing, stale, contradictory, inadmissible, or insufficient evidence MUST be Falsified or Inconclusive; it MUST NOT be rounded up to Verified.

- Applicability: all claims
- Responsible role: Verification Lead
- Enforcement: decision-rule automation
- Required evidence: Verification Result
- Severity: Critical
- Exception authority: none

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 26, 34, 40, 43, 55-58; Book II Chapters 17, 18, 35; Book III Chapters 6, 8, 9; Book IV CMP-15, CMP-18
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Chapter 3 — Verification Planning, Budgets, Confidence, Fidelity, and Reproducibility

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Govern risk-scaled plans, resource budgets, calibrated confidence, model fidelity, and reproducible execution.

## 2. Scope

This chapter applies to R2-R4, R3-R4, all results, all runs, all targets, nondeterministic methods, simulation evidence. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 40, 43, 55-58; Book II Chapter 17; Book III Chapters 6, 8; Book IV CMP-15, CMP-16, CMP-18. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Verification Lead, Method Owner, Environment Custodian, Model Owner, Certification Authority. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### PLN-03-001 — Approve plans before execution

R2-R4 verification MUST use an approved plan defining claims, methods, environments, datasets, oracles, budgets, stopping rules, evidence, and responsible roles.

- Applicability: R2-R4
- Responsible role: Verification Lead
- Enforcement: plan completeness gate
- Required evidence: approved Verification Plan
- Severity: High
- Exception authority: Certification Authority

### PLN-03-002 — Budget by risk

Verification budgets MUST cover execution, independent review, reproduction, adversarial work, failure injection, recovery, and evidence retention in proportion to risk.

- Applicability: all targets
- Responsible role: Verification Lead
- Enforcement: budget review
- Required evidence: Verification Budget
- Severity: High
- Exception authority: Assurance Governor

### PLN-03-003 — Forbid budget exhaustion as success

Exhausting time, compute, test cases, or funds MUST NOT convert an unverified claim into a pass; the result MUST be Inconclusive or scope-reduced.

- Applicability: all targets
- Responsible role: Certification Authority
- Enforcement: stopping-rule check
- Required evidence: budget exhaustion record
- Severity: Critical
- Exception authority: none

### PLN-03-004 — Calibrate confidence

Confidence MUST be reported as a bounded, explained assessment tied to evidence quality, method power, independence, recency, coverage, and unresolved defeaters.

- Applicability: all results
- Responsible role: Method Owner
- Enforcement: calibration review
- Required evidence: confidence rationale
- Severity: High
- Exception authority: Certification Authority

### PLN-03-005 — Score model fidelity

Simulation and Digital Twin evidence MUST report behavioral, state, temporal, environmental, dependency, and failure-response fidelity plus known divergence.

- Applicability: simulation evidence
- Responsible role: Model Owner
- Enforcement: fidelity rubric
- Required evidence: Fidelity Assessment
- Severity: Critical
- Exception authority: Certification Authority

### PLN-03-006 — Reproduce critical results

Every R3-R4 positive conclusion MUST be reproduced from retained inputs by an independent runner or environment before certification.

- Applicability: R3-R4
- Responsible role: Independent Reviewer
- Enforcement: reproduction pipeline
- Required evidence: Reproduction Record
- Severity: Critical
- Exception authority: none

### PLN-03-007 — Pin the execution context

Verification MUST record code, build, configuration, policy, model, data, schema, dependency, tool, environment, and clock-source identities.

- Applicability: all runs
- Responsible role: Environment Custodian
- Enforcement: manifest comparison
- Required evidence: Execution Manifest
- Severity: High
- Exception authority: Certification Authority

### PLN-03-008 — Control nondeterminism

Nondeterministic methods MUST declare seeds where available, repetition strategy, variance bounds, statistical treatment, and flake disposition.

- Applicability: nondeterministic methods
- Responsible role: Method Owner
- Enforcement: run-quality check
- Required evidence: variance analysis
- Severity: High
- Exception authority: Certification Authority

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 40, 43, 55-58; Book II Chapter 17; Book III Chapters 6, 8; Book IV CMP-15, CMP-16, CMP-18
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Chapter 4 — Verification Ladder and Reality Boundary Progression

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Control progressive confidence across static validation, simulation, Digital Twin, shadow, canary, controlled reality, and full adoption.

## 2. Scope

This chapter applies to R2-R4 reality changes, all adopted targets, canary runs, controlled reality, each promotion, full adoption, shadow runs, simulation/twin/shadow. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 38-43, 47-50, 56, 58; Book II Chapters 16, 17, 35; Book III Chapters 3, 6, 7; Book IV CMP-14-16, CMP-25-26. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Verification Lead, Reality Boundary Authority, Release Authority, Safety Reviewer, Target Owner. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### LAD-04-001 — Use the canonical rung order

A material Reality Boundary change MUST progress through Static Validation, Simulation, Digital Twin, Shadow Execution, Canary Operation, Controlled Reality, and Full Adoption unless a rung is proven inapplicable.

- Applicability: R2-R4 reality changes
- Responsible role: Verification Lead
- Enforcement: promotion gate
- Required evidence: Ladder Record
- Severity: Critical
- Exception authority: Reality Boundary Authority

### LAD-04-002 — Authorize every promotion

Advancement to each rung MUST have an explicit decision naming evidence, residual risk, containment, rollback, observation window, and authorized scope.

- Applicability: each promotion
- Responsible role: Reality Boundary Authority
- Enforcement: promotion workflow
- Required evidence: Promotion Decision
- Severity: Critical
- Exception authority: none

### LAD-04-003 — Keep non-reality rungs isolated

Simulation, Digital Twin, and Shadow Execution MUST be technically incapable of external effect without Permission or mutation of authoritative live-effect state.

- Applicability: simulation/twin/shadow
- Responsible role: Environment Custodian
- Enforcement: isolation test
- Required evidence: Isolation Attestation
- Severity: Critical
- Exception authority: none

### LAD-04-004 — Use live-effect-environment inputs with privacy containment in shadow

Shadow execution MUST suppress effects, minimize copied data, prevent feedback into authoritative decisions, and record output divergence without disclosing unnecessary data.

- Applicability: shadow runs
- Responsible role: Privacy Reviewer
- Enforcement: shadow privacy-and-containment gate
- Required evidence: Shadow Comparison Report
- Severity: Critical
- Exception authority: none

### LAD-04-005 — Bound canaries

Canary operation MUST define population, authority envelope, exposure, time, automated abort criteria, manual stop authority, rollback, and outcome measures.

- Applicability: canary runs
- Responsible role: Release Authority
- Enforcement: canary controller
- Required evidence: Canary Record
- Severity: Critical
- Exception authority: none

### LAD-04-006 — Constrain controlled reality

Controlled Reality MUST use explicit participants, authorized effects, bounded resources, enhanced observation, recoverability, and a predeclared termination condition.

- Applicability: controlled reality
- Responsible role: Reality Boundary Authority
- Enforcement: admission review
- Required evidence: Controlled-Reality Permit
- Severity: Critical
- Exception authority: none

### LAD-04-007 — Require adoption evidence

Full Adoption MUST require completed observation windows, satisfied success and harm criteria, an accepted recovery Verification result, no unresolved critical defeater, and a current certification.

- Applicability: full adoption
- Responsible role: Certification Authority
- Enforcement: adoption gate
- Required evidence: Full-Adoption Decision
- Severity: Critical
- Exception authority: none

### LAD-04-008 — Regress when evidence weakens

A fidelity loss, drift, incident, failed control, changed dependency, or invalidated evidence MUST move the target to the lowest rung still supported.

- Applicability: all adopted targets
- Responsible role: Target Owner
- Enforcement: continuous trigger
- Required evidence: Regression Decision
- Severity: Critical
- Exception authority: none

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 38-43, 47-50, 56, 58; Book II Chapters 16, 17, 35; Book III Chapters 3, 6, 7; Book IV CMP-14-16, CMP-25-26
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Chapter 5 — Static, Dynamic, Counterfactual, Failure, Recovery, and Human Verification

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Define method-specific obligations and ensure critical failures have tested containment and recovery.

## 2. Scope

This chapter applies to R2-R4, R3-R4, all builds, all methods, consequential decisions, critical failure modes, human controls, recovery paths. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 40, 43, 56, 58; Book II Chapters 17, 27, 35; Book III Chapters 6-8; Book IV CMP-15, CMP-16, CMP-26. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Method Owner, Test Engineer, Security Assessor, Recovery Assessor, Human Factors Reviewer. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### MTH-05-001 — Validate static artifacts

Static validation MUST cover source traceability, schemas, types, policies, configuration, dependencies, signatures, provenance, forbidden constructs, and invariant representations.

- Applicability: all builds
- Responsible role: Test Engineer
- Enforcement: CI gates
- Required evidence: static validation bundle
- Severity: High
- Exception authority: Certification Authority

### MTH-05-002 — Exercise behavior at boundaries

Dynamic tests MUST cover valid, invalid, adversarial, stale, duplicated, reordered, unauthorized, resource-exhausted, and dependency-failure inputs at every material boundary.

- Applicability: R2-R4
- Responsible role: Test Engineer
- Enforcement: test harness
- Required evidence: behavioral result set
- Severity: Critical
- Exception authority: none

### MTH-05-003 — Use counterfactuals

Consequential decisions MUST be tested against plausible alternative inputs, policies, evidence, authority contexts, and world states to reveal brittle conclusions and hidden assumptions.

- Applicability: consequential decisions
- Responsible role: Method Owner
- Enforcement: scenario review
- Required evidence: Counterfactual Report
- Severity: High
- Exception authority: Certification Authority

### MTH-05-004 — Inject critical failures

Every critical failure mode MUST have an exercised failure-injection scenario or a documented formal proof of technical impossibility.

- Applicability: critical failure modes
- Responsible role: Test Engineer
- Enforcement: fault campaign gate
- Required evidence: Failure-Injection Record
- Severity: Critical
- Exception authority: none

### MTH-05-005 — Prove recovery, not restart

Recovery verification MUST prove authoritative-state reconciliation, identity and authority freshness, evidence preservation, replay safety, containment exit, and restored invariants.

- Applicability: recovery paths
- Responsible role: Recovery Assessor
- Enforcement: recovery drill
- Required evidence: Recovery Verification Record
- Severity: Critical
- Exception authority: none

### MTH-05-006 — Test compromised components

Security verification MUST assume providers, nodes, dependencies, credentials, or models can be compromised and demonstrate containment of their authority and effects.

- Applicability: R3-R4
- Responsible role: Security Assessor
- Enforcement: adversarial campaign
- Required evidence: Compromise Containment Report
- Severity: Critical
- Exception authority: none

### MTH-05-007 — Verify human usability

Human-dependent controls MUST be tested with representative users for comprehension, accessibility, error recovery, coercion resistance, and unambiguous authority consequences.

- Applicability: human controls
- Responsible role: Human Factors Reviewer
- Enforcement: usability protocol
- Required evidence: Human Verification Report
- Severity: High
- Exception authority: Certification Authority

### MTH-05-008 — Retain negative results

Failed, inconclusive, flaky, and contradictory results MUST be retained and linked to disposition; reruns MUST NOT overwrite unfavorable evidence.

- Applicability: all methods
- Responsible role: Evidence Custodian
- Enforcement: immutability check
- Required evidence: complete run history
- Severity: Critical
- Exception authority: none

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 40, 43, 56, 58; Book II Chapters 17, 27, 35; Book III Chapters 6-8; Book IV CMP-15, CMP-16, CMP-26
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Chapter 6 — Constitutional, Architecture, Authority, Security, Privacy, Safety, and Trust Assurance

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Require domain assurance that protects HAL and prevents HAL from exceeding its authority.

## 2. Scope

This chapter applies to R3-R4, critical failures, external domains, personal or sensitive data, protected actions, security scope, stateful targets, trust decisions. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 1-7, 24-29, 38-43, 47-51, 56, 58; Book II Chapters 3-5, 18-21, 29, 35; Book III Chapters 5, 6, 8; Book IV CMP-01-03, CMP-17-21. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Constitutional Reviewer, Architecture Reviewer, Authority Assessor, Security Assessor, Privacy Assessor, Safety Assessor, Trust Assessor. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### DOM-06-001 — Review constitutional invariants

R3-R4 assurance MUST trace and test every applicable constitutional invariant, including identity unity, Owner authority, privacy, evidence, restraint, Reality Boundary, and recovery with declared hazards, containment, and admission criteria.

- Applicability: R3-R4
- Responsible role: Constitutional Reviewer
- Enforcement: invariant matrix
- Required evidence: Constitutional Conformance Report
- Severity: Critical
- Exception authority: none

### DOM-06-002 — Verify architecture ownership

Assurance MUST prove that each authoritative state has one mutation owner and that projections, replicas, caches, providers, and tools cannot bypass that owner.

- Applicability: stateful targets
- Responsible role: Architecture Reviewer
- Enforcement: ownership/path analysis
- Required evidence: Architecture Conformance Report
- Severity: Critical
- Exception authority: none

### DOM-06-003 — Exercise every authority path

Each protected action MUST be tested for valid, absent, expired, revoked, narrowed, replayed, cross-principal, cross-domain, and conflicting Authority contexts.

- Applicability: protected actions
- Responsible role: Authority Assessor
- Enforcement: authority matrix
- Required evidence: Authority-Path Report
- Severity: Critical
- Exception authority: none

### DOM-06-004 — Distinguish protection goals

Security cases MUST separately demonstrate controls protecting HAL from compromise and controls preventing HAL from exceeding Authority.

- Applicability: security scope
- Responsible role: Security Assessor
- Enforcement: two-goal case review
- Required evidence: Security Assurance Case
- Severity: Critical
- Exception authority: none

### DOM-06-005 — Verify privacy across lifecycle

Privacy assurance MUST cover collection, inference, purpose, minimization, disclosure, access, retention, deletion, evidence, backups, and external-domain exchange.

- Applicability: personal or sensitive data
- Responsible role: Privacy Assessor
- Enforcement: data-lifecycle tests
- Required evidence: Privacy Assurance Case
- Severity: Critical
- Exception authority: none

### DOM-06-006 — Verify failure choices against declared hazards

Every fail-closed or fail-safe choice MUST identify the hazard, protected value, affected people, fallback behavior, reversibility, containment, evidence preservation, verification method, residual risk, and recovery admission.

- Applicability: critical failures
- Responsible role: Safety Assessor
- Enforcement: hazard review
- Required evidence: Safety Case
- Severity: Critical
- Exception authority: Certification Authority

### DOM-06-007 — Keep trust separate from permission

Tests MUST demonstrate that Trust Assessment, identity, credentials, capability, confidence, or certificate possession cannot independently create Permission or Authority.

- Applicability: trust decisions
- Responsible role: Trust Assessor
- Enforcement: negative Authority and Permission tests
- Required evidence: Trust-Boundary Report
- Severity: Critical
- Exception authority: none

### DOM-06-008 — Verify firewall and Treaty enforcement

Cross-domain assurance MUST test active, expired, suspended, revoked, mismatched, replayed, and out-of-scope Treaty exchanges at the Constitutional Firewall.

- Applicability: external domains
- Responsible role: Trust Assessor
- Enforcement: gateway conformance suite
- Required evidence: Treaty Enforcement Report
- Severity: Critical
- Exception authority: none

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 1-7, 24-29, 38-43, 47-51, 56, 58; Book II Chapters 3-5, 18-21, 29, 35; Book III Chapters 5, 6, 8; Book IV CMP-01-03, CMP-17-21
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Chapter 7 — Continuous Verification and Regression Certification

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Keep assurance current by monitoring evidence validity, drift, incidents, changes, and calibration.

## 2. Scope

This chapter applies to active R2-R4, active certificates, active targets, adopted targets, all certificates, all monitoring, critical signals, incidents. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 40, 43, 47-50, 55-58; Book II Chapters 17, 25, 27, 35; Book III Chapters 4, 6-8; Book IV CMP-15, CMP-18, CMP-24-26, CMP-29. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Continuous Verification Owner, Target Owner, Evidence Custodian, Certification Authority, Incident Commander. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### CON-07-001 — Declare continuous claims

Every active R2-R4 certificate MUST identify continuously evaluated claims, signals, thresholds, evaluation cadence, and loss-of-signal behavior.

- Applicability: active R2-R4
- Responsible role: Continuous Verification Owner
- Enforcement: monitor registration
- Required evidence: Continuous Verification Plan
- Severity: Critical
- Exception authority: none

### CON-07-002 — Treat missing evidence conservatively

Missing, delayed, corrupt, unauthenticated, or stale critical evidence MUST reduce assurance and trigger the defined restriction, suspension, or regression response.

- Applicability: critical signals
- Responsible role: Target Owner
- Enforcement: freshness gate
- Required evidence: signal-loss event
- Severity: Critical
- Exception authority: none

### CON-07-003 — Detect relevant drift

Monitoring MUST evaluate code, configuration, policy, model, data, dependency, behavior, environment, threat, and population drift against certified baselines.

- Applicability: active targets
- Responsible role: Continuous Verification Owner
- Enforcement: baseline comparison
- Required evidence: Drift Report
- Severity: High
- Exception authority: Certification Authority

### CON-07-004 — Define recertification triggers

Material changes, incidents, new failure modes, source changes, expired assumptions, model drift, Treaty changes, and evidence invalidation MUST trigger scoped or full recertification.

- Applicability: active certificates
- Responsible role: Certification Authority
- Enforcement: trigger engine
- Required evidence: Recertification Record
- Severity: Critical
- Exception authority: none

### CON-07-005 — Prevent regression masking

Aggregate health or success metrics MUST NOT mask constitutional, authority, privacy, safety, trust-boundary, minority-population, or tail-risk regressions.

- Applicability: all monitoring
- Responsible role: Continuous Verification Owner
- Enforcement: segmented analysis
- Required evidence: Regression Dashboard Evidence
- Severity: Critical
- Exception authority: none

### CON-07-006 — Revalidate after incidents

An incident affecting a certified claim MUST suspend reliance on that claim until containment, root cause, corrective action, and targeted reverification are evidenced.

- Applicability: incidents
- Responsible role: Incident Commander
- Enforcement: incident linkage gate
- Required evidence: Incident Assurance Addendum
- Severity: Critical
- Exception authority: none

### CON-07-007 — Calibrate predictions against outcomes

Expected outcomes and confidence MUST be compared with observed Outcome Objects; systematic error MUST update methods, thresholds, and certificates.

- Applicability: adopted targets
- Responsible role: Method Owner
- Enforcement: calibration analysis
- Required evidence: Calibration Report
- Severity: High
- Exception authority: Certification Authority

### CON-07-008 — Preserve historical decisions

Certificate updates MUST supersede rather than overwrite earlier decisions and MUST preserve the exact evidence and conditions valid at each time.

- Applicability: all certificates
- Responsible role: Evidence Custodian
- Enforcement: append-only check
- Required evidence: certificate history
- Severity: High
- Exception authority: none

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 40, 43, 47-50, 55-58; Book II Chapters 17, 25, 27, 35; Book III Chapters 4, 6-8; Book IV CMP-15, CMP-18, CMP-24-26, CMP-29
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Chapter 8 — Component and Capability Certification

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Certify Book IV components and capability classes without transferring authority or concealing dependencies.

## 2. Scope

This chapter applies to capabilities, component releases, components, composed targets, dependency changes, new capability classes. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 35, 38-43, 47-51, 56, 58; Book II Chapters 15-17, 29, 35; Book III Chapters 3, 6-9; Book IV all components. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Component Owner, Capability Owner, Certification Authority, Architecture Reviewer, Security Assessor. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### OBJ-08-001 — Certify every component obligation

Component certification MUST cover every Book IV responsibility, non-responsibility, invariant, state transition, logical interface, failure mode, recovery path, and prohibited shortcut.

- Applicability: components
- Responsible role: Component Owner
- Enforcement: Book IV coverage gate
- Required evidence: Component Assurance Case
- Severity: Critical
- Exception authority: none

### OBJ-08-002 — Identify exact build and deployment

A component certificate MUST bind source, build, artifact provenance, configuration, policy, schema, dependency, environment class, and deployment topology.

- Applicability: component releases
- Responsible role: Component Owner
- Enforcement: manifest equality check
- Required evidence: Component Certificate Manifest
- Severity: Critical
- Exception authority: none

### OBJ-08-003 — Test integration assumptions

Component certification MUST verify declared dependencies, degraded behavior, version compatibility, event ordering, idempotency, time assumptions, and authority-context preservation.

- Applicability: components
- Responsible role: Architecture Reviewer
- Enforcement: integration suite
- Required evidence: Dependency Verification Report
- Severity: High
- Exception authority: Certification Authority

### OBJ-08-004 — Separate provider qualification

A qualified provider or adapter MUST NOT be treated as a certified Capability or as Permission to invoke it.

- Applicability: capabilities
- Responsible role: Capability Owner
- Enforcement: registry invariant test
- Required evidence: Provider Qualification Record
- Severity: Critical
- Exception authority: none

### OBJ-08-005 — Certify capability semantics

Capability certification MUST prove contract semantics, provider equivalence bounds, authority requirements, input/output constraints, resource limits, failure behavior, evidence, and rollback.

- Applicability: capabilities
- Responsible role: Capability Owner
- Enforcement: capability conformance suite
- Required evidence: Capability Assurance Case
- Severity: Critical
- Exception authority: none

### OBJ-08-006 — Require Owner approval for new classes

Certification MUST NOT activate a new capability class without the Owner approval required by the canon; certification evidence supports but does not replace approval.

- Applicability: new capability classes
- Responsible role: Certification Authority
- Enforcement: approval gate
- Required evidence: Owner approval reference
- Severity: Critical
- Exception authority: Owner

### OBJ-08-007 — Limit certificate inheritance

A dependent target MUST reuse current evidence only when provenance, scope, environment, version, assumptions, and independence are demonstrably applicable; otherwise it MUST produce new evidence.

- Applicability: composed targets
- Responsible role: Certification Authority
- Enforcement: evidence applicability review
- Required evidence: Evidence Reuse Record
- Severity: High
- Exception authority: Certification Authority

### OBJ-08-008 — Propagate invalidation

Suspension or revocation of a component, provider, adapter, or dependency certificate MUST evaluate and propagate impact to every relying capability and release.

- Applicability: dependency changes
- Responsible role: Certification Authority
- Enforcement: dependency graph traversal
- Required evidence: Impact and Propagation Record
- Severity: Critical
- Exception authority: none

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 35, 38-43, 47-51, 56, 58; Book II Chapters 15-17, 29, 35; Book III Chapters 3, 6-9; Book IV all components
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Chapter 9 — Release and Deployment Certification

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Require release evidence, reproducibility, staged deployment, rollback, observation, and environment-specific admission.

## 2. Scope

This chapter applies to R2-R4 deployments, R2-R4 releases, all releases, deployments, emergency changes, migrations, releases. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 35, 38-43, 47-51, 56, 58; Book II Chapters 27, 32-35; Book III Chapters 7-9; Book IV CMP-15, CMP-18, CMP-23-26. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Release Owner, Release Authority, Build Custodian, Deployment Owner, Certification Authority. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### RLS-09-001 — Certify immutable artifacts

Release certification MUST bind reproducible build evidence, SBOM, signatures, provenance, vulnerability disposition, configuration, migrations, and artifact digests.

- Applicability: releases
- Responsible role: Build Custodian
- Enforcement: supply-chain gate
- Required evidence: Release Evidence Manifest
- Severity: Critical
- Exception authority: none

### RLS-09-002 — Map change risk and claims

Every release MUST map changes to affected source requirements, components, interfaces, controls, claims, failure modes, and recertification scope.

- Applicability: releases
- Responsible role: Release Owner
- Enforcement: impact-analysis gate
- Required evidence: Change Impact Record
- Severity: High
- Exception authority: Release Authority

### RLS-09-003 — Prove migration safety

State or schema migrations MUST demonstrate compatibility, checkpoints, partial-failure handling, rollback or forward recovery, reconciliation, and evidence preservation.

- Applicability: migrations
- Responsible role: Deployment Owner
- Enforcement: migration rehearsal
- Required evidence: Migration Verification Report
- Severity: Critical
- Exception authority: none

### RLS-09-004 — Require rollback credibility

Rollback or forward recovery MUST be executed in a representative environment and must restore invariants rather than merely restore process availability.

- Applicability: R2-R4 releases
- Responsible role: Deployment Owner
- Enforcement: recovery rehearsal
- Required evidence: Rollback Verification Record
- Severity: Critical
- Exception authority: none

### RLS-09-005 — Bind certification to environment

A release approved for one environment, topology, data class, authority envelope, or Treaty context MUST NOT be presumed certified elsewhere.

- Applicability: deployments
- Responsible role: Certification Authority
- Enforcement: environment admission gate
- Required evidence: Deployment Certificate
- Severity: Critical
- Exception authority: none

### RLS-09-006 — Gate emergency changes

Emergency releases MUST preserve constitutional, authority, evidence, and recovery controls; omitted ordinary evidence MUST be time-bounded and completed before continued operation.

- Applicability: emergency changes
- Responsible role: Release Authority
- Enforcement: emergency workflow
- Required evidence: Emergency Certification Record
- Severity: Critical
- Exception authority: Assurance Governor

### RLS-09-007 — Observe after release

Post-release validation MUST compare expected and observed health, outcomes, harms, authority denials, privacy events, resource use, and rollback readiness during a declared window.

- Applicability: all releases
- Responsible role: Release Owner
- Enforcement: observation gate
- Required evidence: Post-Release Validation Report
- Severity: High
- Exception authority: Release Authority

### RLS-09-008 — Deny uncertified execution

R2-R4 artifacts without a current applicable certificate MUST NOT receive protected work or cross the Reality Boundary.

- Applicability: R2-R4 deployments
- Responsible role: Runtime Supervisor owner
- Enforcement: admission enforcement
- Required evidence: runtime admission log
- Severity: Critical
- Exception authority: none

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 35, 38-43, 47-51, 56, 58; Book II Chapters 27, 32-35; Book III Chapters 7-9; Book IV CMP-15, CMP-18, CMP-23-26
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Chapter 10 — Treaty and External-Domain Certification

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Verify Treaties and external-domain exchanges while preserving Owner approval and Firewall authority.

## 2. Scope

This chapter applies to Treaties, Treaty changes, Treaty interfaces, cross-domain evidence, external domains, external evidence. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 24-29, 38-43, 47-50, 56, 58; Book II Chapters 18, 20, 21, 35; Book III Chapters 5-9; Book IV CMP-17-21. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Treaty Steward, Owner, Trust Assessor, Privacy Assessor, Certification Authority, Firewall Owner. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### TRT-10-001 — Certify the exact Treaty

Treaty certification MUST bind the signed Treaty version, parties, identities, purposes, data classes, capabilities, directions, constraints, duration, audit, incident, suspension, and revocation terms.

- Applicability: Treaties
- Responsible role: Treaty Steward
- Enforcement: Treaty completeness gate
- Required evidence: Treaty Assurance Case
- Severity: Critical
- Exception authority: none

### TRT-10-002 — Preserve Owner approval

A Treaty certificate MUST NOT activate, extend, renew, or reinterpret a Treaty without the Owner approval required by Book I.

- Applicability: Treaties
- Responsible role: Certification Authority
- Enforcement: Owner-approval gate
- Required evidence: approval ceremony evidence
- Severity: Critical
- Exception authority: Owner

### TRT-10-003 — Verify counterpart identity and controls

External assurance MUST verify counterpart identity, authorized endpoints, provenance, security controls, privacy duties, evidence quality, and revocation reachability.

- Applicability: external domains
- Responsible role: Trust Assessor
- Enforcement: external assessment
- Required evidence: External Assurance Report
- Severity: Critical
- Exception authority: none

### TRT-10-004 — Test Firewall enforcement

Certification MUST prove the Constitutional Firewall denies exchanges that are unsigned, expired, suspended, revoked, replayed, directionally wrong, over-purpose, over-data, or over-capability.

- Applicability: Treaty interfaces
- Responsible role: Firewall Owner
- Enforcement: negative gateway suite
- Required evidence: Firewall Conformance Report
- Severity: Critical
- Exception authority: none

### TRT-10-005 — Minimize cross-domain evidence

Evidence exchange MUST disclose only Treaty-authorized, purpose-bound, minimized material and MUST preserve classification, provenance, custody, retention, and deletion duties.

- Applicability: cross-domain evidence
- Responsible role: Privacy Assessor
- Enforcement: data-flow review
- Required evidence: Cross-Domain Evidence Manifest
- Severity: Critical
- Exception authority: none

### TRT-10-006 — Exercise suspension and revocation

Treaty certification MUST test propagation, cached-state invalidation, in-flight handling, data quarantine, notification, audit, and recovery after suspension or revocation.

- Applicability: Treaties
- Responsible role: Treaty Steward
- Enforcement: revocation drill
- Required evidence: Treaty Revocation Exercise
- Severity: Critical
- Exception authority: none

### TRT-10-007 — Bound external assurance reliance

Third-party attestations MAY support claims but MUST state scope, method, competence, independence, validity, and untested assumptions; they MUST NOT replace HAL verification where effects enter HAL.

- Applicability: external evidence
- Responsible role: Certification Authority
- Enforcement: attestation review
- Required evidence: Reliance Assessment
- Severity: High
- Exception authority: Certification Authority

### TRT-10-008 — Recertify on material Treaty change

Party, identity, purpose, data class, capability, direction, control, duration, jurisdiction, or risk changes MUST trigger Treaty reapproval and recertification as applicable.

- Applicability: Treaty changes
- Responsible role: Treaty Steward
- Enforcement: change detector
- Required evidence: Treaty Recertification Record
- Severity: Critical
- Exception authority: Owner

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 24-29, 38-43, 47-50, 56, 58; Book II Chapters 18, 20, 21, 35; Book III Chapters 5-9; Book IV CMP-17-21
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Chapter 11 — Certification Decisions, Conditions, Suspension, Revocation, and Reinstatement

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Define decision states and rapid restriction when assurance is lost.

## 2. Scope

This chapter applies to active certificates, all certificates, all decisions, conditional certificates, protected work, status changes, suspended targets. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 40, 43, 47-50, 56, 58; Book II Chapters 17, 27, 35; Book III Chapters 1, 7-9; Book IV CMP-01, CMP-15, CMP-25-26. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Certification Authority, Assurance Governor, Target Owner, Incident Commander, Evidence Custodian. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### DEC-11-001 — Use canonical decision states

Certification Decisions MUST use Candidate, Under Review, Certified, Certified with Conditions, Suspended, Revoked, Expired, or Superseded.

- Applicability: all certificates
- Responsible role: Certification Authority
- Enforcement: state-machine enforcement
- Required evidence: Certification Decision
- Severity: High
- Exception authority: none

### DEC-11-002 — Forbid partial ambiguity

A decision MUST state exactly which claims passed, failed, or remain inconclusive; a target-level label MUST NOT conceal failed critical claims.

- Applicability: all decisions
- Responsible role: Certification Authority
- Enforcement: decision consistency check
- Required evidence: claim disposition table
- Severity: Critical
- Exception authority: none

### DEC-11-003 — Time-bound conditions

Conditions MUST identify requirement, compensating control, accountable owner, evidence, review date, expiry, and automatic consequence; constitutional invariants are never conditional.

- Applicability: conditional certificates
- Responsible role: Assurance Governor
- Enforcement: condition monitor
- Required evidence: Certification Condition Record
- Severity: Critical
- Exception authority: Assurance Governor

### DEC-11-004 — Suspend promptly

Loss of critical evidence, incident impact, material drift, expired condition, failed continuous control, or uncertain applicability MUST suspend affected certification pending review.

- Applicability: active certificates
- Responsible role: Certification Authority
- Enforcement: automatic suspension triggers
- Required evidence: Suspension Record
- Severity: Critical
- Exception authority: none

### DEC-11-005 — Revoke when basis is invalid

Fraud, evidence tampering, fundamental claim falsification, prohibited authority expansion, irreparable scope mismatch, or uncorrected critical breach MUST revoke the certificate.

- Applicability: active certificates
- Responsible role: Certification Authority
- Enforcement: revocation review
- Required evidence: Revocation Decision
- Severity: Critical
- Exception authority: Assurance Governor

### DEC-11-006 — Propagate status

Suspension, revocation, expiry, and supersession MUST propagate to registries, runtimes, release gates, dependent certificates, operators, and Treaty peers where authorized.

- Applicability: status changes
- Responsible role: Certification Authority
- Enforcement: propagation receipt check
- Required evidence: Status Propagation Manifest
- Severity: Critical
- Exception authority: none

### DEC-11-007 — Fail closed on status uncertainty

When current certification status cannot be established for protected work, admission MUST be denied or constrained to evidence collection and recovery under declared containment and admission criteria.

- Applicability: protected work
- Responsible role: Runtime Supervisor owner
- Enforcement: runtime policy test
- Required evidence: denial evidence
- Severity: Critical
- Exception authority: none

### DEC-11-008 — Require fresh reinstatement evidence

Reinstatement MUST address the trigger, root cause, corrective action, affected claims, regression scope, reproduction, independent review, and new validity period.

- Applicability: suspended targets
- Responsible role: Target Owner
- Enforcement: reinstatement gate
- Required evidence: Reinstatement Decision
- Severity: Critical
- Exception authority: none

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 40, 43, 47-50, 56, 58; Book II Chapters 17, 27, 35; Book III Chapters 1, 7-9; Book IV CMP-01, CMP-15, CMP-25-26
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Chapter 12 — Evidence Retention, Reporting, Tooling, and Audit

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Govern durable, minimized, accessible assurance evidence and trustworthy automation.

## 2. Scope

This chapter applies to all certificates, all evidence, audits, automated assurance, certification evidence, critical tools, expired evidence. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 26, 40, 43, 47-50, 55-58; Book II Chapters 18, 25, 35; Book III Chapters 1, 4-6, 8-9; Book IV CMP-18, CMP-19, CMP-24. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Evidence Custodian, Tool Owner, Privacy Assessor, Audit Lead, Certification Authority. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### EVD-12-001 — Retain decision evidence

Evidence MUST be retained for the certificate lifetime plus the applicable audit, incident, legal, recovery, and supersession horizon; deletion holds MUST be explicit and authorized.

- Applicability: certification evidence
- Responsible role: Evidence Custodian
- Enforcement: retention-policy gate
- Required evidence: Retention Schedule
- Severity: High
- Exception authority: Certification Authority

### EVD-12-002 — Minimize retained content

Evidence stores MUST retain the least content sufficient to prove claims and MUST prefer digests, references, redaction, segmentation, and access decisions over unnecessary sensitive payloads.

- Applicability: all evidence
- Responsible role: Privacy Assessor
- Enforcement: data-minimization review
- Required evidence: Evidence Data Inventory
- Severity: Critical
- Exception authority: none

### EVD-12-003 — Protect integrity and custody

Evidence MUST use content identity, source identity, time context, custody events, access records, verification state, classification, and supersession links.

- Applicability: all evidence
- Responsible role: Evidence Custodian
- Enforcement: integrity validation
- Required evidence: Chain-of-Custody Record
- Severity: Critical
- Exception authority: none

### EVD-12-004 — Make reports reconstructable

Certification reports MUST allow a qualified reviewer to reconstruct scope, methods, environments, evidence, reasoning, findings, dissent, conditions, decision, and validity.

- Applicability: all certificates
- Responsible role: Certification Authority
- Enforcement: report completeness gate
- Required evidence: Certification Report
- Severity: High
- Exception authority: none

### EVD-12-005 — Qualify assurance tools

Tools that generate, transform, select, score, summarize, or gate critical evidence MUST be versioned, access-controlled, validated for intended use, monitored, and independently checked.

- Applicability: critical tools
- Responsible role: Tool Owner
- Enforcement: tool qualification
- Required evidence: Tool Qualification Record
- Severity: Critical
- Exception authority: none

### EVD-12-006 — Control automated decisions

Automation MAY execute rules and recommend dispositions but MUST expose inputs, versions, logic, failures, and overrides; it MUST NOT silently waive a failed critical control.

- Applicability: automated assurance
- Responsible role: Tool Owner
- Enforcement: decision-log validation
- Required evidence: Automation Decision Record
- Severity: Critical
- Exception authority: none

### EVD-12-007 — Provide authorized audit access

Auditors MUST receive sufficient, classification-aware, read-only access to verify claims without obtaining unrelated personal data, secrets, or operational authority.

- Applicability: audits
- Responsible role: Audit Lead
- Enforcement: access review
- Required evidence: Audit Access Record
- Severity: High
- Exception authority: Certification Authority

### EVD-12-008 — Dispose verifiably

Evidence disposal MUST be authorized, logged, propagated to replicas and backups according to policy, and verified without destroying records still required for constitutional, incident, or certificate accountability.

- Applicability: expired evidence
- Responsible role: Evidence Custodian
- Enforcement: disposal verification
- Required evidence: Disposal Certificate
- Severity: High
- Exception authority: Certification Authority

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 26, 40, 43, 47-50, 55-58; Book II Chapters 18, 25, 35; Book III Chapters 1, 4-6, 8-9; Book IV CMP-18, CMP-19, CMP-24
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Chapter 13 — Catalogs, Checklists, Templates, and Conformance Model

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Define the mandatory artifact set and machine-enforceable conformance model.

## 2. Scope

This chapter applies to all assurance work, all controls, all packages, assurance platform, certification decisions, exceptions, program reporting. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 40, 43, 47-51, 56, 58; Book II Chapter 35; Book III Chapters 1, 8, 9; Book IV conformance model and all components. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Assurance Governor, Catalog Custodian, Certification Authority, Verification Lead, Audit Lead. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### REF-13-001 — Use stable control identifiers

Every consequential Book VIII control MUST have a unique stable identifier and catalog record containing requirement, applicability, role, method, evidence, severity, authority, sources, chapter, and automation status.

- Applicability: all controls
- Responsible role: Catalog Custodian
- Enforcement: catalog-schema validation
- Required evidence: Verification and Certification Catalog
- Severity: High
- Exception authority: none

### REF-13-002 — Use controlled templates

Verification Plans, Assurance Cases, Evidence Manifests, Certification Decisions, exceptions, and reports MUST use controlled versioned templates or demonstrably equivalent schemas.

- Applicability: all assurance work
- Responsible role: Verification Lead
- Enforcement: artifact-schema gate
- Required evidence: completed controlled artifact
- Severity: High
- Exception authority: Certification Authority

### REF-13-003 — Complete certification checklists

Certification Authorities MUST complete the applicable component, capability, release, Treaty, Reality Boundary, and suspension checklists before decision.

- Applicability: certification decisions
- Responsible role: Certification Authority
- Enforcement: workflow gate
- Required evidence: signed checklist
- Severity: High
- Exception authority: none

### REF-13-004 — Maintain bidirectional traceability

Books I-IV and X sources MUST map to Book VIII claims and controls, and every Book VIII control MUST map back to its governing source or declared implementation flexibility.

- Applicability: all controls
- Responsible role: Catalog Custodian
- Enforcement: matrix validation
- Required evidence: bidirectional traceability matrices
- Severity: Critical
- Exception authority: none

### REF-13-005 — Test the assurance system

The verification and certification process itself MUST undergo failure, access-control, evidence-tampering, stale-status, propagation, and recovery tests.

- Applicability: assurance platform
- Responsible role: Audit Lead
- Enforcement: meta-assurance suite
- Required evidence: Assurance-System Test Report
- Severity: Critical
- Exception authority: none

### REF-13-006 — Govern deviations

A deviation from architecture MUST follow Book III architecture governance; an assurance exception MUST be time-bounded, risk-assessed, compensated, approved, monitored, and unable to waive constitutional invariants.

- Applicability: exceptions
- Responsible role: Assurance Governor
- Enforcement: exception workflow
- Required evidence: Exception Record
- Severity: Critical
- Exception authority: Assurance Governor

### REF-13-007 — Measure meaningful performance

Program metrics MUST cover claim coverage, evidence freshness, reproduction success, escaped defects, calibration, invalidation latency, suspension propagation, waiver age, and verification burden—not pass counts alone.

- Applicability: program reporting
- Responsible role: Assurance Governor
- Enforcement: metric-quality review
- Required evidence: Assurance Dashboard Evidence
- Severity: High
- Exception authority: none

### REF-13-008 — Certify only complete packages

A certification package MUST NOT be marked complete while a mandatory artifact, critical claim, review, traceability link, Book IX reconciliation item applicable to implemented protocols, or known limitation is absent.

- Applicability: all packages
- Responsible role: Certification Authority
- Enforcement: completion gate
- Required evidence: Certification Package Manifest
- Severity: Critical
- Exception authority: none

## 6. Required practices

Teams MUST plan before execution, preserve complete positive and negative evidence, use independent review proportional to risk, and update traceability whenever claims, methods, sources, targets, or assumptions change.

## 7. Prohibited practices

Silent exceptions, evidence deletion to improve results, confidence inflation, approval laundering, verification first performed in a declared live-effect environment or effect-capable Reality Boundary stage, authority inference, and protocol invention are prohibited.

## 8. Required evidence

The chapter evidence package comprises the applicable records named by each numbered control, their content digests, custody history, review dispositions, and supersession links.

## 9. Automated enforcement

Automation MUST validate schemas, identifiers, traceability, role separation, evidence integrity and freshness, state transitions, status propagation, and completion gates. An unavailable critical gate MUST fail closed.

## 10. Human review requirements

An independent reviewer MUST assess claim quality, method power, evidence independence, defeaters, proportionality, privacy, security, reliability, and developer/operator usability for R2-R4 work.

## 11. Exceptions and waiver authority

Exceptions MUST identify the control, justification, scope, risk, compensating controls, approver, effective and expiry dates, review date, evidence, and revocation conditions. Constitutional invariants, Owner authority, and failed protected-authority controls cannot be waived.

## 12. Failure consequences

A failed Critical control blocks certification and protected operation. A failed High control blocks certification unless an authorized time-bounded exception exists. Evidence loss invalidates dependent conclusions.

## 13. Security, privacy, and reliability considerations

Evidence access MUST be least-privilege and purpose-bound. Sensitive content MUST be minimized. Assurance services MUST preserve integrity, availability, chronology, and recoverability while preventing evidence or certificate possession from becoming Authority.

## 14. Verification method and metrics

Verify by artifact-schema inspection, traceability analysis, executable tests, independent reproduction, adversarial review, and decision-record inspection. Track claim coverage, freshness, reproduction rate, calibration error, escaped defects, invalidation latency, status-propagation latency, exception age, and assurance burden.

## 15. Traceability

- Book I/II/III/IV: Book I Decisions 40, 43, 47-51, 56, 58; Book II Chapter 35; Book III Chapters 1, 8, 9; Book IV conformance model and all components
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.


---

# Appendix A — Verification Ladder

| Rung | Effect boundary | Minimum promotion evidence |
|---|---|---|
| Static Validation | No execution effect | Source, schema, policy, provenance, and invariant validation |
| Simulation | Isolated modeled execution | Scenario coverage, isolation, reproducibility, model limitations |
| Digital Twin | Governed model representative of a declared live-effect environment | Fidelity dimensions, divergence, state provenance, containment |
| Shadow Execution | Observes a declared live-effect environment while suppressing effects | Privacy controls, divergence analysis, no authoritative feedback |
| Canary Operation | Narrow effect within an approved Reality Boundary stage, current Authority, and exact Permission | Bounded population, abort criteria, rollback, observation |
| Controlled Reality | Explicit bounded real-world trial | Participant authority, containment, enhanced monitoring, recovery |
| Full Adoption | Approved operational scope | Complete observation, no critical defeater, current certification |

# Appendix B — Risk Classes

| Class | Meaning | Minimum assurance |
|---|---|---|
| R0 | Informational; no protected decision or effect | Basic provenance and correctness |
| R1 | Limited, reversible, low-sensitivity effect | Peer review and representative testing |
| R2 | Significant state, privacy, availability, or workflow consequence | Independent review and staged verification |
| R3 | Critical authority, trust, protected state, continuity, or high-impact consequence | Full assurance case, reproduction, failure and recovery evidence |
| R4 | Constitutional invariant, Owner authority, new capability class, Treaty class, or substantial irreversible risk | R3 evidence plus required constitutional/Owner governance |

# Appendix C — Certification Package Manifest

A complete package contains the target manifest, risk classification, claims, source traceability, Verification Plan, method and environment manifests, Evidence Manifest, results, defeaters, assurance case, domain reviews, reproduction, conditions, decision, validity, continuous-verification plan, status-propagation Verification result, and Book IX reconciliation disposition.

# Glossary

Terms use Book X meanings. In this book, **certification scope** is the exact target/version/environment/claim set; **defeater** is evidence or reasoning that rebuts a claim or weakens its support; **fidelity** is the declared correspondence between a model and the relevant real system; **verification budget** is the approved resource and stopping envelope for assurance work.

---

## Appendix D — Book IX Contract Reconciliation

Evidence uses IX-C-0174–0183. Verification uses IX-C-0143–0153. Simulation and Digital Twin work uses IX-C-0154–0164. Authority attestations use IX-C-0022 and IX-C-0024–0029. Reality Boundary action evidence uses IX-C-0131–0142 and protected admission IX-C-0001–0008. Audit evidence uses IX-C-0241–0251. Treaty and Firewall assurance uses IX-C-0196–0217.

A signed Certification Decision is admitted as an Evidence Object through IX-C-0175 and published through IX-C-0181. A status change supersedes it through IX-C-0177/IX-C-0183, appends audit evidence through IX-C-0241/IX-C-0249, and publishes the correlated event through IX-C-0219/IX-C-0226. Book IX v1.0 has no dedicated certification-status query or event. Until IXA-001 is adopted through Book IX governance, a runtime MUST retrieve the current decision through IX-C-0178, verify integrity through IX-C-0180, and deny protected work whenever status, freshness, or applicability cannot be proven.
