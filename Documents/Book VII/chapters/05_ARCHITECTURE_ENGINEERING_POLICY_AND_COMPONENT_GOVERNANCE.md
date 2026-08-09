# Chapter 5 — Architecture, Engineering-Policy, and Component Governance

**Document control:** HAL Book VII v1.0; Certified Final; 2026-07-27; owner: Governance Steward.

## 1. Purpose

Govern technical authority without redesigning architecture through administrative procedure.

## 2. Scope

This chapter governs all technical governance, approved changes, architecture changes, component decisions, consequential changes, engineering policy, technical debt, technical retirement. It defines institutional procedure and does not create constitutional, technical, operational, or security authority.

## 3. Authority and source requirements

Books II-IV and IX; Book III architecture, engineering-policy, exception, and review controls. Book I prevails. Final Books V and VI retain their operational and security/privacy/trust execution authorities; Book VII supplies institutional governance only.

## 4. Definitions and roles

Primary accountable roles: Architecture Authority, Constitutional Steward, Engineering Standards Authority, Architecture Reviewer, Engineering Authority, Component Owner, Decision Recorder. Authority means explicit bounded permission to decide; expertise and administrative access do not create it.

## 5. Normative controls

### ARC-05-001 — Use architecture governance

Material architecture changes MUST follow Book II governance and include affected invariants, state owners, trust boundaries, interfaces, failure behavior, migration, verification, and rollback.

- Applicability: architecture changes
- Responsible role: Architecture Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Architecture Decision Record
- Severity: Critical
- Exception authority: Architecture Authority

### ARC-05-002 — Forbid administrative redesign

A governance meeting, budget, incident, exception, or procurement decision MUST NOT silently redesign Book II or Book IV.

- Applicability: all technical governance
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Architecture Conformance Review
- Severity: Critical
- Exception authority: none

### ARC-05-003 — Govern engineering standards

Book III policy changes MUST state control impact, burden, enforceability, evidence, compatibility, rollout, exceptions, and review date.

- Applicability: engineering policy
- Responsible role: Engineering Standards Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Policy Change Record
- Severity: High
- Exception authority: Engineering Standards Authority

### ARC-05-004 — Preserve component ownership

Governance MUST NOT assign multiple mutation owners, transfer component responsibility by implication, or approve a shortcut prohibited by Book IV.

- Applicability: component decisions
- Responsible role: Architecture Reviewer
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Ownership Matrix Check
- Severity: Critical
- Exception authority: none

### ARC-05-005 — Control technical debt

Accepted debt MUST identify violated expectation, risk, owner, compensating controls, evidence, repayment or retirement date, and escalation trigger.

- Applicability: technical debt
- Responsible role: Engineering Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Technical Debt Record
- Severity: High
- Exception authority: Engineering Authority

### ARC-05-006 — Govern deprecation

Deprecation and removal MUST identify users, compatibility, notice, migration, evidence, rollback, effective date, and final authority.

- Applicability: technical retirement
- Responsible role: Component Owner
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Deprecation Decision
- Severity: High
- Exception authority: Architecture Authority

### ARC-05-007 — Require independent review

A consequential technical change MUST receive independent architecture and assurance review appropriate to affected authority, trust, privacy, safety, state, and Reality Boundary.

- Applicability: consequential changes
- Responsible role: Architecture Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Independent Review Record
- Severity: Critical
- Exception authority: none

### ARC-05-008 — Propagate technical decisions

Approved technical decisions MUST update affected Books III/IV/IX artifacts, traceability, certification scope, implementation gates, and operator guidance without changing higher-order sources.

- Applicability: approved changes
- Responsible role: Decision Recorder
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Propagation Manifest
- Severity: High
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

- Source basis: Books II-IV and IX; Book III architecture, engineering-policy, exception, and review controls.
- Book V reconciliation: `planning/BOOK_V_RECONCILIATION_REGISTER.md`.
- Book VI reconciliation: `planning/BOOK_VI_RECONCILIATION_REGISTER.md`.

**Example:** a committee recommends a risk response, but the record names the authorized Risk Owner as approver, preserves dissent, sets expiry, and triggers certification impact review.

**Anti-pattern:** an urgent meeting labels a policy “temporary,” grants indefinite power to its chair, omits conflicts, and treats silence as Owner approval.

Chapter review: PASS. Owner Review items: none created by this chapter. Completion status: CERTIFIED FINAL.
