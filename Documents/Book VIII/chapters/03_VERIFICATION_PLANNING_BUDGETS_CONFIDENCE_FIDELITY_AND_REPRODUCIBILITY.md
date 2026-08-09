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
