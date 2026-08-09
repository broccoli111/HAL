# Chapter 7 — Exceptions, Waivers, Deviations, Risk Acceptance, and Sunset

**Document control:** HAL Book VII v1.0; Certified Final; 2026-07-27; owner: Governance Steward.

## 1. Purpose

Ensure departures are explicit, temporary, reviewable, and unable to waive constitutional invariants.

## 2. Scope

This chapter governs all departures, all exceptions, architecture deviations, exception portfolio, exceptions, expiring exceptions, risk acceptance, temporary governance. It defines institutional procedure and does not create constitutional, technical, operational, or security authority.

## 3. Authority and source requirements

Book I Decisions 47-51 and 58; Book III exception model; Book VIII conditions and suspension. Book I prevails. Final Books V and VI retain their operational and security/privacy/trust execution authorities; Book VII supplies institutional governance only.

## 4. Definitions and roles

Primary accountable roles: Exception Sponsor, Governance Auditor, Constitutional Steward, Architecture Authority, Risk Owner, Control Owner, Risk Authority, Appointing Authority. Authority means explicit bounded permission to decide; expertise and administrative access do not create it.

## 5. Normative controls

### RSK-07-001 — Use a complete exception record

Every exception MUST name the control, justification, scope, risk, compensating controls, authority, effective/expiry/review dates, evidence, revocation conditions, and affected certifications.

- Applicability: exceptions
- Responsible role: Exception Sponsor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Exception Record
- Severity: Critical
- Exception authority: Control's designated authority

### RSK-07-002 — Prohibit permanent silence

Silent, undocumented, self-approved, automatically renewed, or permanent exceptions MUST NOT be permitted.

- Applicability: all exceptions
- Responsible role: Governance Auditor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Exception Register Check
- Severity: Critical
- Exception authority: none

### RSK-07-003 — Protect constitutional invariants

No exception, waiver, deviation, risk acceptance, emergency act, or certificate condition MAY waive a constitutional invariant or expand Owner authority.

- Applicability: all departures
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Constitutional Boundary Review
- Severity: Critical
- Exception authority: none

### RSK-07-004 — Route architecture deviations

Architecture deviations MUST follow Book III architecture governance and MUST NOT be disguised as engineering or operational exceptions.

- Applicability: architecture deviations
- Responsible role: Architecture Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Deviation Record
- Severity: Critical
- Exception authority: Architecture Authority

### RSK-07-005 — Require competent risk acceptance

Risk acceptance MUST identify the risk owner with actual authority over the affected value, affected people, duration, worst case, evidence, alternatives, and residual risk.

- Applicability: risk acceptance
- Responsible role: Risk Owner
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Risk Acceptance Record
- Severity: Critical
- Exception authority: Risk Authority

### RSK-07-006 — Fail closed at expiry

An expired exception MUST automatically remove the exceptional permission or restrict the affected operation unless a new approval is complete.

- Applicability: expiring exceptions
- Responsible role: Control Owner
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Expiry Enforcement Evidence
- Severity: Critical
- Exception authority: none

### RSK-07-007 — Review cumulative risk

Governance MUST evaluate interacting exceptions, repeated renewals, concentration by owner/component/vendor, and aggregate constitutional or operational risk.

- Applicability: exception portfolio
- Responsible role: Risk Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Portfolio Risk Review
- Severity: High
- Exception authority: Governance Chair

### RSK-07-008 — Sunset temporary governance

Temporary bodies, emergency rules, pilot authorities, and transitional policies MUST have explicit sunset, closure evidence, record disposition, and renewal prohibition absent fresh review.

- Applicability: temporary governance
- Responsible role: Appointing Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Sunset Record
- Severity: High
- Exception authority: Appointing Authority

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

- Source basis: Book I Decisions 47-51 and 58; Book III exception model; Book VIII conditions and suspension.
- Book V reconciliation: `planning/BOOK_V_RECONCILIATION_REGISTER.md`.
- Book VI reconciliation: `planning/BOOK_VI_RECONCILIATION_REGISTER.md`.

**Example:** a committee recommends a risk response, but the record names the authorized Risk Owner as approver, preserves dissent, sets expiry, and triggers certification impact review.

**Anti-pattern:** an urgent meeting labels a policy “temporary,” grants indefinite power to its chair, omits conflicts, and treats silence as Owner approval.

Chapter review: PASS. Owner Review items: none created by this chapter. Completion status: CERTIFIED FINAL.
