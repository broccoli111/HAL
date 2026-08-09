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
