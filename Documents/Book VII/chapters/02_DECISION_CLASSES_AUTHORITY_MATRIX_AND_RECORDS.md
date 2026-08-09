# Chapter 2 — Decision Classes, Authority Matrix, and Records

**Document control:** HAL Book VII v1.0; Certified Final; 2026-07-27; owner: Governance Steward.

## 1. Purpose

Classify decisions and make their authority, evidence, validity, and consequences reconstructable.

## 2. Scope

This chapter governs all binding decisions, all classes, all collective deliberation, all decisions, all proposals, binding decisions, consequential decisions. It defines institutional procedure and does not create constitutional, technical, operational, or security authority.

## 3. Authority and source requirements

Book I Decisions 34, 40, 48, 58; Books II-III; Book VIII Chapters 1-2 and 11. Book I prevails. Final Books V and VI retain their operational and security/privacy/trust execution authorities; Book VII supplies institutional governance only.

## 4. Definitions and roles

Primary accountable roles: Governance Secretary, Decision Sponsor, Decision Recorder, Governance Chair, Governance Recorder, Constitutional Steward. Authority means explicit bounded permission to decide; expertise and administrative access do not create it.

## 5. Normative controls

### DEC-02-001 — Classify before deliberation

Each proposal MUST be classified as administrative, operational, engineering-policy, architecture, security/privacy/trust, certification, capability-class, Treaty, risk acceptance, emergency, or constitutional before approval.

- Applicability: all proposals
- Responsible role: Governance Secretary
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Decision Classification
- Severity: High
- Exception authority: Governance Chair

### DEC-02-002 — Use controlling authority

The authority matrix MUST name proposer, reviewers, approver, recorder, executor, affected parties, appeal route, and nondelegable authority for every decision class.

- Applicability: all classes
- Responsible role: Governance Secretary
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Authority Matrix
- Severity: Critical
- Exception authority: none

### DEC-02-003 — Create a Decision Object

Every consequential decision MUST record question, alternatives, evidence, assumptions, risks, dissent, authority, conditions, effective date, review, sunset, revocation, appeal, and disposition.

- Applicability: consequential decisions
- Responsible role: Decision Sponsor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Governance Decision Object
- Severity: Critical
- Exception authority: none

### DEC-02-004 — Verify authority at decision time

Approval MUST use current identity, delegation, scope, liveness, conflicts, and required ceremonies; historical or inferred authority is insufficient.

- Applicability: binding decisions
- Responsible role: Decision Recorder
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Authority Attestation
- Severity: Critical
- Exception authority: none

### DEC-02-005 — Forbid vote laundering

A majority, consensus, committee recommendation, or popularity signal MUST NOT substitute for the authority required by the controlling source.

- Applicability: all collective deliberation
- Responsible role: Governance Chair
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Decision Authority Review
- Severity: Critical
- Exception authority: none

### DEC-02-006 — Bind exact scope

A decision MUST identify the exact artifact, version, environment, capability, Treaty, duration, population, and conditions it governs.

- Applicability: all binding decisions
- Responsible role: Decision Recorder
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Decision Scope Manifest
- Severity: High
- Exception authority: Decision Authority

### DEC-02-007 — Control effective state

Approved, effective, suspended, revoked, expired, and superseded MUST be distinct states with attributable transitions and propagation receipts.

- Applicability: all decisions
- Responsible role: Governance Recorder
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Decision Lifecycle Record
- Severity: High
- Exception authority: none

### DEC-02-008 — Prevent silent precedent

A decision MUST state whether it is case-specific or precedential; precedent MUST NOT silently amend higher-order policy.

- Applicability: all decisions
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Precedent Review
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

- Source basis: Book I Decisions 34, 40, 48, 58; Books II-III; Book VIII Chapters 1-2 and 11.
- Book V reconciliation: `planning/BOOK_V_RECONCILIATION_REGISTER.md`.
- Book VI reconciliation: `planning/BOOK_VI_RECONCILIATION_REGISTER.md`.

**Example:** a committee recommends a risk response, but the record names the authorized Risk Owner as approver, preserves dissent, sets expiry, and triggers certification impact review.

**Anti-pattern:** an urgent meeting labels a policy “temporary,” grants indefinite power to its chair, omits conflicts, and treats silence as Owner approval.

Chapter review: PASS. Owner Review items: none created by this chapter. Completion status: CERTIFIED FINAL.
