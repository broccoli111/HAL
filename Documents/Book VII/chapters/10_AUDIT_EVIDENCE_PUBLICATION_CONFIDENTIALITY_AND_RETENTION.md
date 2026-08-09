# Chapter 10 — Audit, Evidence, Publication, Confidentiality, and Retention

**Document control:** HAL Book VII v1.0; Certified Final; 2026-07-27; owner: Governance Steward.

## 1. Purpose

Make governance reconstructable while protecting sensitive information and legitimate deliberation.

## 2. Scope

This chapter governs all records, audits, consequential decisions, consequential governance, effective records, published artifacts. It defines institutional procedure and does not create constitutional, technical, operational, or security authority.

## 3. Authority and source requirements

Book I Articles VI, XI, XII and Decision 40; Book II evidence architecture; Books III, VIII, IX. Book I prevails. Final Books V and VI retain their operational and security/privacy/trust execution authorities; Book VII supplies institutional governance only.

## 4. Definitions and roles

Primary accountable roles: Governance Recorder, Evidence Custodian, Privacy Authority, Publication Authority, Audit Authority, Records Authority. Authority means explicit bounded permission to decide; expertise and administrative access do not create it.

## 5. Normative controls

### EVD-10-001 — Maintain an append-only register

Every consequential proposal, decision, condition, exception, appeal, suspension, revocation, and supersession MUST enter a durable attributable governance register.

- Applicability: consequential governance
- Responsible role: Governance Recorder
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Governance Register
- Severity: Critical
- Exception authority: none

### EVD-10-002 — Bind evidence and decision

Decision records MUST reference immutable or content-addressed evidence, source versions, authority attestations, deliberation, dissent, and execution receipts.

- Applicability: consequential decisions
- Responsible role: Evidence Custodian
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Evidence Manifest
- Severity: Critical
- Exception authority: none

### EVD-10-003 — Minimize governance data

Governance evidence MUST retain the least personal, secret, or sensitive content sufficient for accountability and MUST use references, redaction, segmentation, and access decisions.

- Applicability: all records
- Responsible role: Privacy Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Governance Data Inventory
- Severity: Critical
- Exception authority: none

### EVD-10-004 — Classify publication

Each record MUST be classified public, canon-internal, restricted, confidential, or sealed with rationale, access authority, review date, and release condition.

- Applicability: all records
- Responsible role: Governance Recorder
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Publication Classification
- Severity: High
- Exception authority: Publication Authority

### EVD-10-005 — Publish authoritative status

Published governance artifacts MUST state authority, version, status, effective date, supersession, scope, and canonical location so drafts cannot masquerade as authority.

- Applicability: published artifacts
- Responsible role: Publication Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Publication Manifest
- Severity: Critical
- Exception authority: none

### EVD-10-006 — Protect audit independence

Auditors MUST have sufficient read-only access and independence to verify decisions without receiving operational authority or unrelated sensitive content.

- Applicability: audits
- Responsible role: Audit Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Audit Access Record
- Severity: High
- Exception authority: Audit Authority

### EVD-10-007 — Apply retention schedules

Retention MUST cover decision validity, appeals, incidents, legal or constitutional holds, certification dependencies, historical accountability, and verified disposal.

- Applicability: all records
- Responsible role: Records Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Retention Schedule
- Severity: High
- Exception authority: Records Authority

### EVD-10-008 — Correct by supersession

A governance record MUST NOT be silently edited after effectiveness; correction MUST use a linked attributable superseding record while preserving history.

- Applicability: effective records
- Responsible role: Governance Recorder
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Supersession Record
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

- Source basis: Book I Articles VI, XI, XII and Decision 40; Book II evidence architecture; Books III, VIII, IX.
- Book V reconciliation: `planning/BOOK_V_RECONCILIATION_REGISTER.md`.
- Book VI reconciliation: `planning/BOOK_VI_RECONCILIATION_REGISTER.md`.

**Example:** a committee recommends a risk response, but the record names the authorized Risk Owner as approver, preserves dissent, sets expiry, and triggers certification impact review.

**Anti-pattern:** an urgent meeting labels a policy “temporary,” grants indefinite power to its chair, omits conflicts, and treats silence as Owner approval.

Chapter review: PASS. Owner Review items: none created by this chapter. Completion status: CERTIFIED FINAL.
