# Chapter 14 — Metrics, Continuous Improvement, Reconciliation, and Program Conformance

## 1. Document control

- Identifier: HAL-BVI-14
- Version: 1.0
- Status: Final
- Effective date: 2026-07-27

## 2. Purpose

Maintain meaningful metrics, learning without evidence loss, Book VIII and IX alignment, program reporting, and final conformance.

## 3. Scope

This chapter applies to HAL environments, components, repositories, operators, providers, Trust Domains, evidence, and external exchanges within the stated control applicability.

## 4. Authority and source requirements

- Book I: Articles XI-XIV; Decisions 22, 26, 28, 40, 58
- Book II: Chapters 28, 31-35
- Book III: Chapters 4-9
- Book IV: CMP-15, CMP-18, CMP-24-29
- Book X: Chapters 7-10
- Book VIII governs verification and certification decisions; Book IX governs exact machine contracts.

## 5. Definitions and accountable roles

Book X terms retain their canonical meaning. Chapter roles: Security and Trust Executive, Metrics Owner, Control Owner, Book VIII Liaison, Book IX Liaison, Independent Assessor.

## 6. Normative controls

### VI-CON-14-001 — Measure outcomes and control health

Metrics MUST cover prevention, detection, containment, recovery, authority denials, privacy outcomes, trust-boundary enforcement, evidence quality, exceptions, remediation, and recurrence.

- Applicability: program metrics
- Responsible role: Metrics Owner
- Enforcement: metric definition review
- Required evidence: metrics catalog and reports
- Severity: High
- Exception authority: Security and Trust Executive
- Protection objective: Both

### VI-CON-14-002 — Prevent vanity metrics

Alert count, patch count, scan count, training completion, coverage percentage, or audit completion MUST NOT alone demonstrate effective risk reduction or constitutional conformance.

- Applicability: all reporting
- Responsible role: Metrics Owner
- Enforcement: report review
- Required evidence: metric interpretation record
- Severity: High
- Exception authority: Risk Steward
- Protection objective: Both

### VI-CON-14-003 — Track leading and lagging signals

Each critical risk MUST have outcome, control-effectiveness, exposure, evidence-freshness, and failure signals with owners, thresholds, cadence, and response.

- Applicability: critical risks
- Responsible role: Control Owner
- Enforcement: risk-to-metric mapping
- Required evidence: risk monitoring record
- Severity: High
- Exception authority: Security and Trust Executive
- Protection objective: Both

### VI-CON-14-004 — Learn without rewriting history

Improvements MUST preserve prior incidents, findings, decisions, exceptions, evidence, and dissent; updated understanding MUST be versioned and linked to outcomes.

- Applicability: all improvements
- Responsible role: Control Owner
- Enforcement: append-only records
- Required evidence: improvement decision
- Severity: High
- Exception authority: None
- Protection objective: Both

### VI-CON-14-005 — Reconcile Book IX contracts

Security events, Authority context, Treaty exchange, Firewall decisions, errors, schemas, and protocol behaviors MUST map to final Book IX identifiers and MUST NOT invent alternate wire contracts.

- Applicability: interface controls
- Responsible role: Book IX Liaison
- Enforcement: contract reconciliation check
- Required evidence: Book IX mapping register
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-CON-14-006 — Reconcile Book VIII assurance

Control tests, incidents, penetration results, privacy assessments, Treaty evidence, recovery, and continuous signals MUST map into Book VIII claims, evidence, certification status, and recertification triggers.

- Applicability: assurance inputs
- Responsible role: Book VIII Liaison
- Enforcement: assurance reconciliation check
- Required evidence: Book VIII mapping register
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-CON-14-007 — Review the program periodically

At least annually and after material incidents or canon changes, an independent review MUST assess source fidelity, control effectiveness, gaps, burden, exceptions, evidence, roles, metrics, and needed revisions.

- Applicability: program
- Responsible role: Independent Assessor
- Enforcement: review calendar and gate
- Required evidence: program review report
- Severity: High
- Exception authority: Security and Trust Executive
- Protection objective: Both

### VI-CON-14-008 — Certify Book VI conformance honestly

Book VI conformance MAY be declared only when mandatory controls are mapped, applicable evidence is current, critical failures are resolved or operation is constrained, reconciliations are current, and no contradiction remains.

- Applicability: Book VI conformance
- Responsible role: Security and Trust Executive
- Enforcement: certification checklist
- Required evidence: Book VI certification report
- Severity: Critical
- Exception authority: None
- Protection objective: Both

## 7. Required operating practices

Control Owners MUST maintain procedures, training, tools, dependencies, evidence paths, response actions, and succession coverage necessary to operate each applicable control.

## 8. Prohibited practices

- Treating trust, identity, credentials, compliance, or certification as Authority.
- Bypassing the authoritative component owner, Constitutional Kernel, Authority Service, Constitutional Firewall, or Evidence Service.
- Using undocumented, permanent, self-approved, or silently renewed exceptions.
- Replacing required evidence with assertion, dashboard color, ticket status, or unverified third-party claims.

## 9. Required evidence

Evidence MUST identify the control, target, version, environment, actor, time and confidence, source, method, outcome, exceptions, integrity, classification, retention, and linked incident or remediation.

## 10. Automated enforcement

Controls marked automated MUST deny, quarantine, expire, alert, or constrain according to the stated failure behavior. Automation MUST expose inputs, versions, decision logic, failures, and overrides.

## 11. Human review

A qualified reviewer MUST evaluate proportionality, constitutional restraint, privacy, trust assumptions, evidence sufficiency, conflicts of interest, and residual risk at the control's declared cadence and after material change.

## 12. Exceptions and failure consequences

Constitutional invariants are not waivable. Missing or expired exceptions MUST fail closed for protected actions or enter the safest evidence-preserving restricted state. Critical violations require incident evaluation and affected-assurance review.

## 13. Security, privacy, trust, and reliability considerations

Implementations MUST minimize sensitive evidence, preserve recoverability, constrain compromised components, keep trust separate from permission, and maintain auditable denial and recovery paths.

## 14. Verification method and metrics

Verify by catalog completeness checks, policy and configuration tests, adversarial negative cases, sampled evidence reconstruction, incident and recovery exercises, and independent review. Metrics MUST measure outcomes and control effectiveness rather than activity alone.

## 15. Traceability

- Book I: Articles XI-XIV; Decisions 22, 26, 28, 40, 58
- Book II: Chapters 28, 31-35
- Book III: Chapters 4-9
- Book IV: CMP-15, CMP-18, CMP-24-29
- Book X: Chapters 7-10

## 16. Examples and anti-patterns

**Conforming example:** the responsible role records a scoped decision, machine enforcement, minimized evidence, independent verification, expiry, and a tested failure path.

**Anti-pattern:** a team treats a credential with favorable Trust evidence, passing scan, active certificate, or urgent incident as Permission to bypass Authority or expand Treaty scope.

## 17. Review findings, Owner Review, and completion

Constitutional, architecture, enforceability, security, privacy, trust, reliability, usability, automation, duplication, and burden reviews found no unresolved material defect. No Owner Review item is required. Status: Complete.

