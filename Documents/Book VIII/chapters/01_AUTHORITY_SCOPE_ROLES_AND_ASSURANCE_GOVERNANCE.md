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
