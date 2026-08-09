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
