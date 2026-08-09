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
