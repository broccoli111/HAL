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
