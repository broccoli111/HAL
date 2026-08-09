# HAL Book VII — Governance and Stewardship Manual

**Version:** 1.0  
**Status:** Certified Final  
**Date:** 2026-07-27

## Authority statement

Book I is supreme and the source of Owner authority. Book II defines architecture governance. Book III governs engineering policy and exceptions. Book IV defines component obligations. Book VIII governs assurance and certification. Book IX governs contracts. Book X governs meaning. Book VII governs human institutional procedure and creates no new constitutional or technical authority.

Books V and VI are final and their authority mappings are closed. Book VII governs accountability, decision procedure, separation of duties, review, appeal, and stewardship while preserving the execution authorities defined by those manuals.

Every consequential procedure applies separation of duties among proposer, reviewer, approver, recorder, executor, auditor, and appeal authority, with documented conflict-of-interest controls.

## Revision history

| Version | Date | Status | Summary |
|---|---|---|---|
| 0.9 | 2026-07-27 | Publication Candidate | Complete governance manual awaiting Books V and VI reconciliation |
| 1.0 | 2026-07-27 | Certified Final | Closed Books V and VI reconciliation; refreshed full-book and publication reviews |

## Contents

1. Authority, Scope, Principles, and Governance Roles
2. Decision Classes, Authority Matrix, and Records
3. Governance Bodies, Meetings, Deliberation, and Conflicts
4. Constitutional Amendment and Stewardship Review
5. Architecture, Engineering-Policy, and Component Governance
6. Capability-Class and Treaty Governance
7. Exceptions, Waivers, Deviations, Risk Acceptance, and Sunset
8. Certification, Assurance, Suspension, Revocation, and Appeals
9. Operational, Security, Privacy, Incident, and Emergency Governance
10. Audit, Evidence, Publication, Confidentiality, and Retention
11. Succession, Continuity, Emergency Authority, and Institutional Recovery
12. Appeals, Conflict Resolution, Accountability, and Conformance

---

# Chapter 1 — Authority, Scope, Principles, and Governance Roles

**Document control:** HAL Book VII v1.0; Certified Final; 2026-07-27; owner: Governance Steward.

## 1. Purpose

Define institutional governance without expanding constitutional authority.

## 2. Scope

This chapter governs all decisions, all governance, all roles, consequential decisions. It defines institutional procedure and does not create constitutional, technical, operational, or security authority.

## 3. Authority and source requirements

Book I Articles I-XII, Constitutional Governance, Decisions 47-49 and 58; Books II-III; Book X. Book I prevails. Final Books V and VI retain their operational and security/privacy/trust execution authorities; Book VII supplies institutional governance only.

## 4. Definitions and roles

Primary accountable roles: Governance Recorder, Constitutional Steward, Governance Chair, Governance Secretary, Decision Sponsor. Authority means explicit bounded permission to decide; expertise and administrative access do not create it.

## 5. Normative controls

### GOV-01-001 — Preserve the hierarchy

Every governance decision MUST identify the controlling source and MUST yield to Book I, then Book II, and the applicable subordinate canon.

- Applicability: all governance
- Responsible role: Governance Recorder
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Decision Record
- Severity: Critical
- Exception authority: none

### GOV-01-002 — Keep Owner authority unique

A governance body, steward, administrator, certificate, vote, emergency role, or delegated role MUST NOT become or dilute the single constitutional Owner.

- Applicability: all governance
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Authority Review
- Severity: Critical
- Exception authority: none

### GOV-01-003 — Govern systems, not people

Governance MUST regulate HAL institutions, artifacts, roles, risks, and actions and MUST NOT claim general authority over people.

- Applicability: all governance
- Responsible role: Governance Chair
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Scope Assessment
- Severity: Critical
- Exception authority: none

### GOV-01-004 — Define bounded roles

Every governance role MUST have purpose, powers, prohibitions, appointment source, competence, term, conflicts, delegation limits, removal, succession, and records.

- Applicability: all roles
- Responsible role: Governance Secretary
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Role Charter
- Severity: High
- Exception authority: Owner or appointing authority

### GOV-01-005 — Separate recommendation and decision

Advisors and technical reviewers MUST distinguish recommendations from binding decisions and MUST identify the actual decision authority.

- Applicability: all decisions
- Responsible role: Decision Sponsor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Decision Record
- Severity: High
- Exception authority: Governance Chair

### GOV-01-006 — Prohibit authority inference

Relationship, expertise, tenure, access, credential, trust, urgency, or operational control MUST NOT imply governance Authority.

- Applicability: all roles
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Authority-Path Test
- Severity: Critical
- Exception authority: none

### GOV-01-007 — Record affected parties

Consequential governance MUST identify affected people, components, domains, rights, duties, notice, participation, and remedy.

- Applicability: consequential decisions
- Responsible role: Decision Sponsor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Stakeholder Record
- Severity: High
- Exception authority: Governance Chair

### GOV-01-008 — Apply proportional governance

Process burden MUST scale with consequence, irreversibility, uncertainty, trust boundary, privacy, safety, continuity, and constitutional significance.

- Applicability: all decisions
- Responsible role: Governance Chair
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Proportionality Assessment
- Severity: High
- Exception authority: Governance Chair

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

- Source basis: Book I Articles I-XII, Constitutional Governance, Decisions 47-49 and 58; Books II-III; Book X.
- Book V reconciliation: `planning/BOOK_V_RECONCILIATION_REGISTER.md`.
- Book VI reconciliation: `planning/BOOK_VI_RECONCILIATION_REGISTER.md`.

**Example:** a committee recommends a risk response, but the record names the authorized Risk Owner as approver, preserves dissent, sets expiry, and triggers certification impact review.

**Anti-pattern:** an urgent meeting labels a policy “temporary,” grants indefinite power to its chair, omits conflicts, and treats silence as Owner approval.

Chapter review: PASS. Owner Review items: none created by this chapter. Completion status: CERTIFIED FINAL.


---

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


---

# Chapter 3 — Governance Bodies, Meetings, Deliberation, and Conflicts

**Document control:** HAL Book VII v1.0; Certified Final; 2026-07-27; owner: Governance Steward.

## 1. Purpose

Make collective governance competent, fair, attributable, and resistant to capture.

## 2. Scope

This chapter governs all consequential deliberation, all deliberation, all participants, binding meetings, conflicted decisions, consequential meetings, governance bodies, standing bodies. It defines institutional procedure and does not create constitutional, technical, operational, or security authority.

## 3. Authority and source requirements

Book I Articles VI, XI, XII and Decision 58; Book III review controls; Book VIII independence controls. Book I prevails. Final Books V and VI retain their operational and security/privacy/trust execution authorities; Book VII supplies institutional governance only.

## 4. Definitions and roles

Primary accountable roles: Body Chair, Governance Secretary, Decision Sponsor, Governance Recorder, Participant, Governance Chair, Governance Auditor. Authority means explicit bounded permission to decide; expertise and administrative access do not create it.

## 5. Normative controls

### BDY-03-001 — Charter every body

Each governance body MUST have a written charter defining remit, authority source, membership, quorum, voting or decision rule, records, confidentiality, conflicts, appeal, and sunset.

- Applicability: governance bodies
- Responsible role: Body Chair
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Body Charter
- Severity: High
- Exception authority: Appointing Authority

### BDY-03-002 — Verify quorum and authority

A meeting MUST NOT issue a binding decision without verified quorum and the required decision authority present or validly delegated.

- Applicability: binding meetings
- Responsible role: Governance Secretary
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Attendance and Authority Record
- Severity: Critical
- Exception authority: none

### BDY-03-003 — Publish an evidence packet

Consequential agenda items MUST provide sources, proposal, alternatives, risks, evidence, affected parties, conflicts, and requested decision before deliberation.

- Applicability: consequential meetings
- Responsible role: Decision Sponsor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Deliberation Packet
- Severity: High
- Exception authority: Body Chair

### BDY-03-004 — Preserve dissent

Material dissent, uncertainty, minority impact, abstention, and unresolved evidence conflict MUST be recorded without retaliation or erasure.

- Applicability: all consequential deliberation
- Responsible role: Governance Recorder
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Dissent Record
- Severity: High
- Exception authority: none

### BDY-03-005 — Disclose conflicts

Participants MUST disclose financial, relational, authorship, operational, reputational, and other material conflicts before access to restricted deliberation or decision.

- Applicability: all participants
- Responsible role: Participant
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Conflict Disclosure
- Severity: Critical
- Exception authority: Body Chair

### BDY-03-006 — Recuse conflicted decision-makers

A materially conflicted person MUST NOT be the sole reviewer or approver and MUST recuse when impartial participation cannot be protected.

- Applicability: conflicted decisions
- Responsible role: Body Chair
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Recusal Record
- Severity: Critical
- Exception authority: Independent Ethics Reviewer

### BDY-03-007 — Protect deliberative integrity

Governance MUST prevent coercion, retaliation, fabricated urgency, hidden evidence, off-record binding decisions, and selective minutes.

- Applicability: all deliberation
- Responsible role: Governance Chair
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Integrity Review
- Severity: Critical
- Exception authority: none

### BDY-03-008 — Review body effectiveness

Each standing body MUST undergo periodic review of necessity, burden, decisions, calibration, diversity of evidence, conflicts, appeals, and sunset.

- Applicability: standing bodies
- Responsible role: Governance Auditor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Body Effectiveness Review
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

- Source basis: Book I Articles VI, XI, XII and Decision 58; Book III review controls; Book VIII independence controls.
- Book V reconciliation: `planning/BOOK_V_RECONCILIATION_REGISTER.md`.
- Book VI reconciliation: `planning/BOOK_VI_RECONCILIATION_REGISTER.md`.

**Example:** a committee recommends a risk response, but the record names the authorized Risk Owner as approver, preserves dissent, sets expiry, and triggers certification impact review.

**Anti-pattern:** an urgent meeting labels a policy “temporary,” grants indefinite power to its chair, omits conflicts, and treats silence as Owner approval.

Chapter review: PASS. Owner Review items: none created by this chapter. Completion status: CERTIFIED FINAL.


---

# Chapter 4 — Constitutional Amendment and Stewardship Review

**Document control:** HAL Book VII v1.0; Certified Final; 2026-07-27; owner: Governance Steward.

## 1. Purpose

Govern rare constitutional change while preserving identity, continuity, and the Owner Authorization Ceremony.

## 2. Scope

This chapter governs all amendments, all publications, authorized amendments, constitutional amendments, constitutional proposals, constitutional stewardship, invariant changes. It defines institutional procedure and does not create constitutional, technical, operational, or security authority.

## 3. Authority and source requirements

Book I Constitutional Governance and Decision 58; Book II Constitutional Kernel; Book VIII verification ladder. Book I prevails. Final Books V and VI retain their operational and security/privacy/trust execution authorities; Book VII supplies institutional governance only.

## 4. Definitions and roles

Primary accountable roles: Constitutional Steward, Proposal Sponsor, Amendment Program Lead, Constitutional Archivist. Authority means explicit bounded permission to decide; expertise and administrative access do not create it.

## 5. Normative controls

### CST-04-001 — Use Constitutional Change Objects

Every proposed amendment MUST record motivation, insufficiency of current principles, alternatives, benefits, risks, compatibility, affected decisions, verification, migration, rollback, Owner Authorization Ceremony status, and disposition.

- Applicability: constitutional proposals
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Constitutional Change Object
- Severity: Critical
- Exception authority: none

### CST-04-002 — Apply the twenty-year test

A proposal MUST explain whether the change should remain true in twenty years and why ordinary policy, architecture, or engineering change is insufficient.

- Applicability: constitutional proposals
- Responsible role: Proposal Sponsor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Stewardship Analysis
- Severity: Critical
- Exception authority: none

### CST-04-003 — Protect the Owner Authorization Ceremony

Only the Owner, or Authority explicitly delegated through the constitutional process where Book I permits delegation, MAY approve constitutional change through the Owner Authorization Ceremony.

- Applicability: constitutional amendments
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Owner Authorization Ceremony Record
- Severity: Critical
- Exception authority: Owner

### CST-04-004 — Recognize invariant changes

A proposal affecting a constitutional invariant MUST explicitly state that it may create a fundamentally different constitutional system and MUST use extraordinary recognition.

- Applicability: invariant changes
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Invariant Impact Finding
- Severity: Critical
- Exception authority: Owner

### CST-04-005 — Verify before incorporation

Amendments MUST progress through analysis, simulation, compatibility review, Owner Authorization Ceremony, staged adoption, observation, and incorporation.

- Applicability: authorized amendments
- Responsible role: Amendment Program Lead
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Verification Ladder Evidence
- Severity: Critical
- Exception authority: none

### CST-04-006 — Preserve immutable history

The signed Constitution, amendment proposal, Owner Authorization Ceremony Record, prior versions, commentary, Evidence Objects, and disposition MUST remain immutable and publicly distinguishable by status.

- Applicability: all amendments
- Responsible role: Constitutional Archivist
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Version and Custody Manifest
- Severity: Critical
- Exception authority: none

### CST-04-007 — Separate authority from commentary

Commentary, principles, rules, and operational policies MUST NOT be presented as constitutional text or silently gain constitutional force.

- Applicability: all publications
- Responsible role: Constitutional Archivist
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Publication Classification Review
- Severity: Critical
- Exception authority: none

### CST-04-008 — Conduct stewardship review

Periodic stewardship review MUST assess continuity, legitimacy, outdated assumptions, unresolved harms, amendment pressure, and whether lower-order artifacts have drifted from Book I.

- Applicability: constitutional stewardship
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Stewardship Review Report
- Severity: High
- Exception authority: Owner

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

- Source basis: Book I Constitutional Governance and Decision 58; Book II Constitutional Kernel; Book VIII verification ladder.
- Book V reconciliation: `planning/BOOK_V_RECONCILIATION_REGISTER.md`.
- Book VI reconciliation: `planning/BOOK_VI_RECONCILIATION_REGISTER.md`.

**Example:** a committee recommends a risk response, but the record names the authorized Risk Owner as approver, preserves dissent, sets expiry, and triggers certification impact review.

**Anti-pattern:** an urgent meeting labels a policy “temporary,” grants indefinite power to its chair, omits conflicts, and treats silence as Owner approval.

Chapter review: PASS. Owner Review items: none created by this chapter. Completion status: CERTIFIED FINAL.


---

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


---

# Chapter 6 — Capability-Class and Treaty Governance

**Document control:** HAL Book VII v1.0; Certified Final; 2026-07-27; owner: Governance Steward.

## 1. Purpose

Preserve Owner-reserved approvals and sovereign, bounded external cooperation.

## 2. Scope

This chapter governs Treaties, active Treaties, capability proposals, external assurance, new capability classes, providers. It defines institutional procedure and does not create constitutional, technical, operational, or security authority.

## 3. Authority and source requirements

Book I Decisions 48-50; Book II Trust/Firewall/Treaty architecture; Books IV, VIII, IX. Book I prevails. Final Books V and VI retain their operational and security/privacy/trust execution authorities; Book VII supplies institutional governance only.

## 4. Definitions and roles

Primary accountable roles: Capability Steward, Owner, Treaty Steward, Constitutional Steward, Trust Assessor. Authority means explicit bounded permission to decide; expertise and administrative access do not create it.

## 5. Normative controls

### TRT-06-001 — Identify new capability classes

A proposal MUST determine whether it creates a new capability class rather than merely a new provider, adapter, version, or implementation.

- Applicability: capability proposals
- Responsible role: Capability Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Capability Classification Record
- Severity: Critical
- Exception authority: Owner

### TRT-06-002 — Reserve capability-class approval

A new capability class MUST NOT activate without explicit Owner approval supported by risk, authority, verification, containment, reversibility, and retirement evidence.

- Applicability: new capability classes
- Responsible role: Owner
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Owner Approval Record
- Severity: Critical
- Exception authority: Owner

### TRT-06-003 — Qualify providers separately

Provider qualification, procurement, trust, certification, credentials, or availability MUST NOT substitute for capability-class approval or action Authority.

- Applicability: providers
- Responsible role: Capability Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Separation Test
- Severity: Critical
- Exception authority: none

### TRT-06-004 — Require Treaty approval

Each Treaty and material renewal or scope change MUST receive explicit Owner approval after identity, purpose, capability, data, privacy, security, duration, revocation, audit, and Firewall review.

- Applicability: Treaties
- Responsible role: Treaty Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Treaty Decision Record
- Severity: Critical
- Exception authority: Owner

### TRT-06-005 — Preserve sovereignty

A Treaty MUST NOT merge constitutional identity, transfer Owner authority, bypass the Constitutional Firewall, or make trust equivalent to permission.

- Applicability: Treaties
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Sovereignty Review
- Severity: Critical
- Exception authority: none

### TRT-06-006 — Separate Treaty roles

Treaty proposer, trust assessor, privacy/security reviewers, Owner approver, Firewall operator, and evidence custodian MUST be distinct or use documented compensating separation.

- Applicability: Treaties
- Responsible role: Treaty Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Treaty RACI
- Severity: High
- Exception authority: Owner

### TRT-06-007 — Govern suspension and revocation

Treaty suspension or revocation MUST define trigger, authority, effective time, propagation, in-flight handling, data quarantine, notification, evidence, appeal if permitted, and reinstatement.

- Applicability: active Treaties
- Responsible role: Treaty Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Treaty Lifecycle Record
- Severity: Critical
- Exception authority: Owner where scope changes

### TRT-06-008 — Review external assurance

External attestations MUST be scoped, dated, independently evaluated, and unable to replace HAL verification, Owner approval, or Firewall enforcement.

- Applicability: external assurance
- Responsible role: Trust Assessor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Reliance Assessment
- Severity: High
- Exception authority: Treaty Steward

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

- Source basis: Book I Decisions 48-50; Book II Trust/Firewall/Treaty architecture; Books IV, VIII, IX.
- Book V reconciliation: `planning/BOOK_V_RECONCILIATION_REGISTER.md`.
- Book VI reconciliation: `planning/BOOK_VI_RECONCILIATION_REGISTER.md`.

**Example:** a committee recommends a risk response, but the record names the authorized Risk Owner as approver, preserves dissent, sets expiry, and triggers certification impact review.

**Anti-pattern:** an urgent meeting labels a policy “temporary,” grants indefinite power to its chair, omits conflicts, and treats silence as Owner approval.

Chapter review: PASS. Owner Review items: none created by this chapter. Completion status: CERTIFIED FINAL.


---

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


---

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


---

# Chapter 9 — Operational, Security, Privacy, Incident, and Emergency Governance

**Document control:** HAL Book VII v1.0; Certified Final; 2026-07-27; owner: Governance Steward.

## 1. Purpose

Define institutional oversight while deferring execution details to Books V and VI.

## 2. Scope

This chapter governs break-glass, cross-domain incidents, data decisions, emergencies, incidents, material incidents, operations and incidents. It defines institutional procedure and does not create constitutional, technical, operational, or security authority.

## 3. Authority and source requirements

Book I Decisions 35, 38-43, 47-51; Books II-IV; Book V operational authority; Book VI security, privacy, and trust authority. Book I prevails. Final Books V and VI retain their operational and security/privacy/trust execution authorities; Book VII supplies institutional governance only.

## 4. Definitions and roles

Primary accountable roles: Governance Chair, Emergency Authority, Constitutional Steward, Security Authority, Incident Commander, Privacy Authority, Treaty Steward, Governance Auditor. Authority means explicit bounded permission to decide; expertise and administrative access do not create it.

## 5. Normative controls

### OPS-09-001 — Preserve operational command

Governance MUST define policy and accountability without usurping the incident commander, recovery coordinator, security responder, or operator acting within authorized Book V/VI scope.

- Applicability: operations and incidents
- Responsible role: Governance Chair
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Authority Boundary Review
- Severity: Critical
- Exception authority: none

### OPS-09-002 — Classify emergencies

Emergency authority MUST require a declared event, bounded objective, authorized role, least necessary power, evidence, start/expiry, termination, and retrospective review.

- Applicability: emergencies
- Responsible role: Emergency Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Emergency Declaration
- Severity: Critical
- Exception authority: none

### OPS-09-003 — Forbid emergency constitutional change

Urgency MUST NOT authorize constitutional amendment, permanent authority expansion, new capability-class activation, Treaty approval, or waiver of invariants outside the required process.

- Applicability: emergencies
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Emergency Boundary Check
- Severity: Critical
- Exception authority: none

### OPS-09-004 — Use break-glass controls

Break-glass access MUST be identity-bound, purpose-limited, least-privilege, time-limited, dual-controlled where feasible, monitored, automatically revoked, and retrospectively reviewed.

- Applicability: break-glass
- Responsible role: Security Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Break-Glass Record
- Severity: Critical
- Exception authority: Security Authority

### OPS-09-005 — Protect incident evidence

Incident action MUST preserve evidence, privacy, chain of custody, legal holds, affected-party rights, and independent review while limiting disclosure to need.

- Applicability: incidents
- Responsible role: Incident Commander
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Incident Evidence Manifest
- Severity: Critical
- Exception authority: none

### OPS-09-006 — Govern privacy impact

Governance decisions affecting personal or sensitive data MUST identify purpose, authority, minimization, inference, disclosure, retention, deletion, people affected, and remedy.

- Applicability: data decisions
- Responsible role: Privacy Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Privacy Decision Record
- Severity: Critical
- Exception authority: Privacy Authority

### OPS-09-007 — Coordinate cross-domain incidents

External-domain incidents MUST use Treaty and Firewall authority, preserve sovereignty, restrict exchange, notify authorized parties, and record suspension/revocation decisions.

- Applicability: cross-domain incidents
- Responsible role: Treaty Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Cross-Domain Incident Record
- Severity: Critical
- Exception authority: Owner where Treaty scope changes

### OPS-09-008 — Require retrospective review

Every material incident or emergency exercise of exceptional authority MUST receive independent, blame-aware review of decisions, evidence, harms, recovery, authority, controls, and corrective action.

- Applicability: material incidents
- Responsible role: Governance Auditor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Post-Incident Governance Review
- Severity: High
- Exception authority: Governance Chair

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

- Source basis: Book I Decisions 35, 38-43, 47-51; Books II-IV; Book V operational authority; Book VI security, privacy, and trust authority.
- Book V reconciliation: `planning/BOOK_V_RECONCILIATION_REGISTER.md`.
- Book VI reconciliation: `planning/BOOK_VI_RECONCILIATION_REGISTER.md`.

**Example:** a committee recommends a risk response, but the record names the authorized Risk Owner as approver, preserves dissent, sets expiry, and triggers certification impact review.

**Anti-pattern:** an urgent meeting labels a policy “temporary,” grants indefinite power to its chair, omits conflicts, and treats silence as Owner approval.

Chapter review: PASS. Owner Review items: none created by this chapter. Completion status: CERTIFIED FINAL.


---

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


---

# Chapter 11 — Succession, Continuity, Emergency Authority, and Institutional Recovery

**Document control:** HAL Book VII v1.0; Certified Final; 2026-07-27; owner: Governance Steward.

## 1. Purpose

Preserve lawful governance through absence, incapacity, disaster, compromise, and transition.

## 2. Scope

This chapter governs Owner succession, all transitions, compromise, continuity plans, critical roles, emergency vacancies, governance recovery, quarantine recovery. It defines institutional procedure and does not create constitutional, technical, operational, or security authority.

## 3. Authority and source requirements

Book I Decisions 47-48, 51, 58; Book II continuity/recovery architecture; Book VIII recovery assurance. Book I prevails. Final Books V and VI retain their operational and security/privacy/trust execution authorities; Book VII supplies institutional governance only.

## 4. Definitions and roles

Primary accountable roles: Constitutional Steward, Appointing Authority, Continuity Steward, Recovery Authority, Security Authority, Governance Archivist. Authority means explicit bounded permission to decide; expertise and administrative access do not create it.

## 5. Normative controls

### CNT-11-001 — Separate ownership succession

Owner transfer or succession MUST use the constitutional procedure and MUST NOT be inferred from custody, kinship, employment, access, incapacity, or emergency role.

- Applicability: Owner succession
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Constitutional Succession Record
- Severity: Critical
- Exception authority: Owner/constitutional process

### CNT-11-002 — Plan role succession

Every critical governance role MUST define deputies, activation criteria, authority limits, term, handback, records, and disqualification conditions.

- Applicability: critical roles
- Responsible role: Appointing Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Role Succession Plan
- Severity: High
- Exception authority: Appointing Authority

### CNT-11-003 — Test continuity

Governance continuity plans MUST be exercised for identity compromise, unavailable Owner, unavailable authority, lost records, split authority, communication failure, and facility loss.

- Applicability: continuity plans
- Responsible role: Continuity Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Governance Continuity Exercise
- Severity: Critical
- Exception authority: none

### CNT-11-004 — Restore authority before business

Institutional recovery MUST verify Owner identity, constitutional state, authority records, audit integrity, and decision-register continuity before ordinary governance resumes.

- Applicability: governance recovery
- Responsible role: Recovery Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Governance Recovery Admission
- Severity: Critical
- Exception authority: none

### CNT-11-005 — Quarantine compromised roles

A suspected compromised identity, credential, device, record system, or governance body MUST lose affected decision authority while evidence is preserved and independent recovery proceeds.

- Applicability: compromise
- Responsible role: Security Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Governance Quarantine Record
- Severity: Critical
- Exception authority: none

### CNT-11-006 — Prevent self-release

A quarantined person, role, body, or system MUST NOT approve its own restoration to authority.

- Applicability: quarantine recovery
- Responsible role: Recovery Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Independent Restoration Decision
- Severity: Critical
- Exception authority: none

### CNT-11-007 — Bound emergency succession

Emergency acting authority MUST be minimal, expiring, nontransferable unless expressly authorized, unable to make Owner-reserved decisions, and subject to rapid review.

- Applicability: emergency vacancies
- Responsible role: Appointing Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Acting Authority Record
- Severity: Critical
- Exception authority: none

### CNT-11-008 — Preserve institutional memory

Continuity records MUST retain charters, authorities, decisions, dissent, exceptions, appeals, certifications, Treaties, succession, and unresolved obligations across personnel and system changes.

- Applicability: all transitions
- Responsible role: Governance Archivist
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Continuity Manifest
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

- Source basis: Book I Decisions 47-48, 51, 58; Book II continuity/recovery architecture; Book VIII recovery assurance.
- Book V reconciliation: `planning/BOOK_V_RECONCILIATION_REGISTER.md`.
- Book VI reconciliation: `planning/BOOK_VI_RECONCILIATION_REGISTER.md`.

**Example:** a committee recommends a risk response, but the record names the authorized Risk Owner as approver, preserves dissent, sets expiry, and triggers certification impact review.

**Anti-pattern:** an urgent meeting labels a policy “temporary,” grants indefinite power to its chair, omits conflicts, and treats silence as Owner approval.

Chapter review: PASS. Owner Review items: none created by this chapter. Completion status: CERTIFIED FINAL.


---

# Chapter 12 — Appeals, Conflict Resolution, Accountability, and Conformance

**Document control:** HAL Book VII v1.0; Certified Final; 2026-07-27; owner: Governance Steward.

## 1. Purpose

Provide correction, review, remedy, admitted Evidence Objects, and Verification results showing that governance follows the canon.

## 2. Scope

This chapter governs Book VII publication, appealable decisions, appeals, critical appeals, governance program, program metrics, source conflicts, sustained appeals. It defines institutional procedure and does not create constitutional, technical, operational, or security authority.

## 3. Authority and source requirements

Book I dignity, transparency, evidence, stewardship, and Decision 58; Books III and VIII. Book I prevails. Final Books V and VI retain their operational and security/privacy/trust execution authorities; Book VII supplies institutional governance only.

## 4. Definitions and roles

Primary accountable roles: Decision Recorder, Appeal Authority, Constitutional Steward, Decision Authority, Governance Auditor, Governance Chair, Certification Authority. Authority means explicit bounded permission to decide; expertise and administrative access do not create it.

## 5. Normative controls

### APR-12-001 — Provide appeal notice

A consequential decision MUST identify who may appeal, grounds, forum, deadline, evidence, interim effect, possible remedies, and finality.

- Applicability: appealable decisions
- Responsible role: Decision Recorder
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Appeal Notice
- Severity: High
- Exception authority: Appeal Authority

### APR-12-002 — Use independent appeal authority

An appeal MUST be decided by an authority not materially responsible for or conflicted by the original decision.

- Applicability: appeals
- Responsible role: Appeal Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Independence Record
- Severity: Critical
- Exception authority: none

### APR-12-003 — Protect critical restrictions

Appeal MUST NOT automatically stay a suspension, revocation, quarantine, or fail-closed restriction protecting constitutional, authority, safety, privacy, or trust invariants.

- Applicability: critical appeals
- Responsible role: Appeal Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Interim Measures Decision
- Severity: Critical
- Exception authority: none

### APR-12-004 — Resolve source conflict upward

When artifacts conflict, governance MUST preserve the higher-order rule, halt the conflicting effect, record the conflict, correct the lower-order artifact, and avoid reinterpretation.

- Applicability: source conflicts
- Responsible role: Constitutional Steward
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Conflict Resolution Record
- Severity: Critical
- Exception authority: none

### APR-12-005 — Provide remedy

Confirmed error MUST produce proportionate correction, notification, record supersession, restored rights or status where possible, and prevention of recurrence.

- Applicability: sustained appeals
- Responsible role: Decision Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Remedy Record
- Severity: High
- Exception authority: Decision Authority

### APR-12-006 — Audit governance conformance

Periodic audit MUST test authority paths, role separation, conflicts, evidence, exceptions, sunsets, appeals, publication, retention, certification status, and dependency reconciliation.

- Applicability: governance program
- Responsible role: Governance Auditor
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Governance Conformance Report
- Severity: Critical
- Exception authority: Audit Authority

### APR-12-007 — Measure outcomes, not volume

Governance metrics MUST examine decision quality, reversals, calibration, escaped harms, exception age, conflict handling, burden, timeliness, participation, and remedy—not meeting or approval counts alone.

- Applicability: program metrics
- Responsible role: Governance Chair
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Governance Metrics Report
- Severity: High
- Exception authority: none

### APR-12-008 — Block final certification on dependencies

Book VII MUST NOT be certified while Books V or VI are nonfinal or while their authority reconciliation registers contain an unresolved material conflict.

- Applicability: Book VII publication
- Responsible role: Certification Authority
- Enforcement: workflow gate, register validation, and independent review
- Required evidence: Dependency Closure Report
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

- Source basis: Book I dignity, transparency, evidence, stewardship, and Decision 58; Books III and VIII.
- Book V reconciliation: `planning/BOOK_V_RECONCILIATION_REGISTER.md`.
- Book VI reconciliation: `planning/BOOK_VI_RECONCILIATION_REGISTER.md`.

**Example:** a committee recommends a risk response, but the record names the authorized Risk Owner as approver, preserves dissent, sets expiry, and triggers certification impact review.

**Anti-pattern:** an urgent meeting labels a policy “temporary,” grants indefinite power to its chair, omits conflicts, and treats silence as Owner approval.

Chapter review: PASS. Owner Review items: none created by this chapter. Completion status: CERTIFIED FINAL.


---

# Appendix A — Decision Class and Authority Summary

| Decision class | Controlling authority |
|---|---|
| Constitutional amendment or Owner succession | Owner or explicit constitutional process |
| New capability class | Owner |
| Treaty approval, material expansion, or renewal | Owner |
| Architecture | Architecture Authority under Book II |
| Engineering policy or exception | Book III designated authority |
| Certification, suspension, revocation, reinstatement | Book VIII Certification Authority |
| Operations and incidents | Book V designated operational authority |
| Security, privacy, and trust | Book VI designated authority |
| Administrative governance | Charter-designated authority bounded by the canon |

# Appendix B — Mandatory Governance Decision Record

Every consequential record contains identifier; class; question; exact scope; source authority; proposer; reviewers; approver; recorder; executor; affected parties; conflicts and recusals; evidence; alternatives; assumptions; risks; dissent; decision; conditions; effective date; review date; sunset; revocation; appeal; publication class; retention; propagation; and supersession.

# Appendix C — Publication Gate

Book VII certification requires final Books V and VI; closed reconciliation registers; refreshed constitutional, authority, incident, emergency, exception, Treaty, operational, risk, suspension, and revocation reviews; 100% control traceability; successful document/workbook validation; and no unresolved material defect. Every requirement is satisfied for version 1.0.

# Glossary

Book X terms control. **Governance Decision Object** is the durable record of a consequential institutional decision. **Decision authority** is the explicitly designated role permitted to decide a class of matter. **Stewardship review** evaluates long-term fidelity, legitimacy, continuity, and harm without itself amending the Constitution.
