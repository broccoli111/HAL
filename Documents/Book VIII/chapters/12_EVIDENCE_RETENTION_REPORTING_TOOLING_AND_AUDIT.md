# Chapter 12 — Evidence Retention, Reporting, Tooling, and Audit

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Govern durable, minimized, accessible assurance evidence and trustworthy automation.

## 2. Scope

This chapter applies to all certificates, all evidence, audits, automated assurance, certification evidence, critical tools, expired evidence. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 26, 40, 43, 47-50, 55-58; Book II Chapters 18, 25, 35; Book III Chapters 1, 4-6, 8-9; Book IV CMP-18, CMP-19, CMP-24. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Evidence Custodian, Tool Owner, Privacy Assessor, Audit Lead, Certification Authority. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### EVD-12-001 — Retain decision evidence

Evidence MUST be retained for the certificate lifetime plus the applicable audit, incident, legal, recovery, and supersession horizon; deletion holds MUST be explicit and authorized.

- Applicability: certification evidence
- Responsible role: Evidence Custodian
- Enforcement: retention-policy gate
- Required evidence: Retention Schedule
- Severity: High
- Exception authority: Certification Authority

### EVD-12-002 — Minimize retained content

Evidence stores MUST retain the least content sufficient to prove claims and MUST prefer digests, references, redaction, segmentation, and access decisions over unnecessary sensitive payloads.

- Applicability: all evidence
- Responsible role: Privacy Assessor
- Enforcement: data-minimization review
- Required evidence: Evidence Data Inventory
- Severity: Critical
- Exception authority: none

### EVD-12-003 — Protect integrity and custody

Evidence MUST use content identity, source identity, time context, custody events, access records, verification state, classification, and supersession links.

- Applicability: all evidence
- Responsible role: Evidence Custodian
- Enforcement: integrity validation
- Required evidence: Chain-of-Custody Record
- Severity: Critical
- Exception authority: none

### EVD-12-004 — Make reports reconstructable

Certification reports MUST allow a qualified reviewer to reconstruct scope, methods, environments, evidence, reasoning, findings, dissent, conditions, decision, and validity.

- Applicability: all certificates
- Responsible role: Certification Authority
- Enforcement: report completeness gate
- Required evidence: Certification Report
- Severity: High
- Exception authority: none

### EVD-12-005 — Qualify assurance tools

Tools that generate, transform, select, score, summarize, or gate critical evidence MUST be versioned, access-controlled, validated for intended use, monitored, and independently checked.

- Applicability: critical tools
- Responsible role: Tool Owner
- Enforcement: tool qualification
- Required evidence: Tool Qualification Record
- Severity: Critical
- Exception authority: none

### EVD-12-006 — Control automated decisions

Automation MAY execute rules and recommend dispositions but MUST expose inputs, versions, logic, failures, and overrides; it MUST NOT silently waive a failed critical control.

- Applicability: automated assurance
- Responsible role: Tool Owner
- Enforcement: decision-log validation
- Required evidence: Automation Decision Record
- Severity: Critical
- Exception authority: none

### EVD-12-007 — Provide authorized audit access

Auditors MUST receive sufficient, classification-aware, read-only access to verify claims without obtaining unrelated personal data, secrets, or operational authority.

- Applicability: audits
- Responsible role: Audit Lead
- Enforcement: access review
- Required evidence: Audit Access Record
- Severity: High
- Exception authority: Certification Authority

### EVD-12-008 — Dispose verifiably

Evidence disposal MUST be authorized, logged, propagated to replicas and backups according to policy, and verified without destroying records still required for constitutional, incident, or certificate accountability.

- Applicability: expired evidence
- Responsible role: Evidence Custodian
- Enforcement: disposal verification
- Required evidence: Disposal Certificate
- Severity: High
- Exception authority: Certification Authority

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

- Book I/II/III/IV: Book I Decisions 26, 40, 43, 47-50, 55-58; Book II Chapters 18, 25, 35; Book III Chapters 1, 4-6, 8-9; Book IV CMP-18, CMP-19, CMP-24
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.
