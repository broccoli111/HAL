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
