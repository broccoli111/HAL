# Chapter 8 — Certification, Assurance, Suspension, Revocation, and Appeals

**Document control:** HAL Book VII v1.0; Certified Final; 2026-07-27; owner: Governance Steward.

## 1. Purpose

Govern certification institutions while preserving Book VIII evidence and decision boundaries.

## 2. Scope

This chapter governs active certificates, all certificates, all certifications, certification appeals, certification roles, conditional certificates, suspended targets. It defines institutional procedure and does not create constitutional, technical, operational, or security authority.

## 3. Authority and source requirements

Book I Decisions 40, 50, 58; Book II Chapter 35; Book VIII Chapters 1, 8-13. Book I prevails. Final Books V and VI retain their operational and security/privacy/trust execution authorities; Book VII supplies institutional governance only.

## 4. Definitions and roles

Primary accountable roles: Certification Authority, Assurance Governor, Appeal Authority. Authority means explicit bounded permission to decide; expertise and administrative access do not create it.

## 5. Normative controls

### CER-08-001 — Preserve verification/certification separation

Verification evaluates claims; only the designated Certification Authority MAY issue a scoped, expiring Certification Decision.

- Applicability: all certifications
- Responsible role: Certification Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Role-Separation Record
- Severity: Critical
- Exception authority: none

### CER-08-002 — Register certification authorities

Every Certification Authority MUST have defined scope, competence, appointment, independence, term, conflicts, delegation limits, removal, and appeal oversight.

- Applicability: certification roles
- Responsible role: Assurance Governor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Certification Authority Register
- Severity: Critical
- Exception authority: Appointing Authority

### CER-08-003 — Forbid certificate authority expansion

A certificate MUST NOT create Authority, Permission, Owner approval, capability class, Treaty scope, or broader operational eligibility than its exact claims support.

- Applicability: all certificates
- Responsible role: Certification Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Certification Boundary Review
- Severity: Critical
- Exception authority: none

### CER-08-004 — Govern conditions

Conditional certification MUST identify noncritical condition, compensating control, owner, evidence, review, expiry, and automatic consequence; critical failed claims cannot be conditioned away.

- Applicability: conditional certificates
- Responsible role: Assurance Governor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Condition Record
- Severity: Critical
- Exception authority: Assurance Governor

### CER-08-005 — Suspend on lost basis

Critical evidence loss, incident impact, drift, failed control, expired condition, or uncertain applicability MUST trigger prompt scoped suspension and dependent impact review.

- Applicability: active certificates
- Responsible role: Certification Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Suspension Record
- Severity: Critical
- Exception authority: none

### CER-08-006 — Revoke invalid certification

Fraud, evidence tampering, fundamental falsification, authority overreach, or uncorrected critical breach MUST trigger revocation and propagation.

- Applicability: active certificates
- Responsible role: Certification Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Revocation Decision
- Severity: Critical
- Exception authority: Assurance Governor

### CER-08-007 — Provide bounded appeal

An affected party MAY appeal procedural error, evidence interpretation, conflict, proportionality, or new evidence to an authority independent of the original decision; appeal MUST NOT stay critical restrictions by default.

- Applicability: certification appeals
- Responsible role: Appeal Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Appeal Record
- Severity: High
- Exception authority: Appeal Authority

### CER-08-008 — Reinstate with fresh evidence

Reinstatement MUST address trigger, root cause, corrective action, affected claims, regression scope, independent review, propagation, and a new validity period.

- Applicability: suspended targets
- Responsible role: Certification Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Reinstatement Decision
- Severity: Critical
- Exception authority: none

## 6. Required procedure

The proposer MUST submit the classified proposal and evidence. The recorder MUST verify authority and conflicts. Required independent reviewers MUST issue findings. The controlling authority MUST decide exact scope and conditions. The recorder MUST publish authoritative status, retain evidence, schedule review and sunset, propagate effects, and preserve appeal rights.

## 7. Prohibited practices

Off-record decisions, authority inference, self-approval, hidden conflicts, silent precedent, selective evidence, indefinite emergency power, permanent exceptions, and retroactive record alteration are prohibited.

## 8. Evidence, publication, and retention

The package MUST preserve proposal, sources, authority, conflicts, evidence, alternatives, affected parties, deliberation, dissent, decision, conditions, effective state, propagation, review, sunset, appeal, supersession, classification, access, and retention.

## 9. Exceptions, failure consequences, and appeals

A failed Critical control blocks the decision or suspends its effect. A High failure requires correction or a valid expiring exception. Appeals use Chapter 12. No exception can waive Book I or manufacture Owner authority.

## 10. Security, privacy, reliability, and continuity

Governance records MUST be integrity-protected, least-privilege, purpose-bound, minimized, available for authorized review, recoverable, and resistant to compromised identities or record systems.

## 11. Verification and metrics

Verify authority paths, role separation, record completeness, evidence integrity, propagation, expiry, appeal, and source traceability. Measure reversals, calibration, escaped harms, exception age, burden, remedy, and decision latency.

## 12. Traceability, examples, review, and status

- Source basis: Book I Decisions 40, 50, 58; Book II Chapter 35; Book VIII Chapters 1, 8-13.
- Book V reconciliation: `planning/BOOK_V_RECONCILIATION_REGISTER.md`.
- Book VI reconciliation: `planning/BOOK_VI_RECONCILIATION_REGISTER.md`.

**Example:** a committee recommends a risk response, but the record names the authorized Risk Owner as approver, preserves dissent, sets expiry, and triggers certification impact review.

**Anti-pattern:** an urgent meeting labels a policy “temporary,” grants indefinite power to its chair, omits conflicts, and treats silence as Owner approval.

Chapter review: PASS. Owner Review items: none created by this chapter. Completion status: CERTIFIED FINAL.
