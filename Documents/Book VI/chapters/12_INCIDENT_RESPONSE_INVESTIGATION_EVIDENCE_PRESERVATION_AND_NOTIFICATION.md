# Chapter 12 — Incident Response, Investigation, Evidence Preservation, and Notification

## 1. Document control

- Identifier: HAL-BVI-12
- Version: 1.0
- Status: Final
- Effective date: 2026-07-27

## 2. Purpose

Govern incident declaration, command, containment, investigation, chain of custody, communication, notification, and cross-domain coordination.

## 3. Scope

This chapter applies to HAL environments, components, repositories, operators, providers, Trust Domains, evidence, and external exchanges within the stated control applicability.

## 4. Authority and source requirements

- Book I: Decisions 22, 26, 28, 40, 42-43, 47
- Book II: Chapters 2, 18, 20, 28, 31-33
- Book III: Chapters 5-9
- Book IV: CMP-18-21, CMP-24-26
- Book X: Chapters 7-9
- Book VIII governs verification and certification decisions; Book IX governs exact machine contracts.

## 5. Definitions and accountable roles

Book X terms retain their canonical meaning. Chapter roles: Incident Commander, Security Operations, Privacy Steward, Trust Steward, Evidence Custodian, Service Owner.

## 6. Normative controls

### VI-INC-12-001 — Declare incidents by consequence

Events MUST be declared incidents when credible impact involves constitutional invariants, Authority, identity, protected state, sensitive data, Trust Domains, Treaties, evidence, or continuity, even if technical certainty is incomplete.

- Applicability: suspected incidents
- Responsible role: Incident Commander
- Enforcement: incident criteria and escalation
- Required evidence: incident declaration
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-INC-12-002 — Establish one incident command

Each incident MUST have one accountable Incident Commander, scope, objectives, decision log, roles, communication channels, evidence custodian, status cadence, and transfer procedure.

- Applicability: all incidents
- Responsible role: Incident Commander
- Enforcement: incident management workflow
- Required evidence: incident record
- Severity: High
- Exception authority: Security and Trust Executive
- Protection objective: Both

### VI-INC-12-003 — Contain proportionately

Containment MUST prioritize human safety, constitutional invariants, Owner access, Authority restriction, privacy, evidence, and blast-radius reduction; it MUST document intended and collateral effects.

- Applicability: all incidents
- Responsible role: Incident Commander
- Enforcement: containment approval and monitoring
- Required evidence: containment decision record
- Severity: Critical
- Exception authority: Incident Commander
- Protection objective: Both

### VI-INC-12-004 — Preserve chain of custody

Investigation evidence MUST record identity, source, time and confidence, collection method, digest, classification, custody, access, transformations, analysis, and disposition; originals MUST be preserved where feasible.

- Applicability: all investigations
- Responsible role: Evidence Custodian
- Enforcement: evidence tooling and review
- Required evidence: chain-of-custody record
- Severity: Critical
- Exception authority: None
- Protection objective: Protect HAL

### VI-INC-12-005 — Separate facts from hypotheses

Investigations MUST distinguish observed facts, reported claims, analytical hypotheses, confidence, contradictions, unknowns, and decisions; later findings MUST supersede rather than rewrite history.

- Applicability: all investigations
- Responsible role: Security Operations
- Enforcement: case record schema
- Required evidence: investigation timeline
- Severity: High
- Exception authority: None
- Protection objective: Both

### VI-INC-12-006 — Coordinate privacy and trust response

Incidents involving personal data or external domains MUST engage Privacy and Trust Stewards, enforce Treaty duties, minimize shared evidence, and coordinate suspension, notification, and remediation.

- Applicability: privacy/trust incidents
- Responsible role: Incident Commander
- Enforcement: stakeholder and Treaty gate
- Required evidence: coordination record
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-INC-12-007 — Notify with verified scope

Notifications MUST be timely, authorized, accurate about known and unknown facts, purpose-limited, privacy-minimized, updateable, and linked to applicable Treaty, legal, operational, and governance duties.

- Applicability: notifiable incidents
- Responsible role: Incident Commander
- Enforcement: notification review
- Required evidence: notification record
- Severity: High
- Exception authority: Security and Trust Executive
- Protection objective: Both

### VI-INC-12-008 — Prevent incident authority expansion

Emergency status MUST NOT grant undeclared strategic authority, alter constitutional invariants, create Treaties or capabilities, or permit unrestricted access; emergency powers MUST be explicit and expire.

- Applicability: emergencies
- Responsible role: Incident Commander
- Enforcement: emergency authority checks
- Required evidence: emergency authority record
- Severity: Critical
- Exception authority: Owner for constitutional matters
- Protection objective: Constrain HAL

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

- Book I: Decisions 22, 26, 28, 40, 42-43, 47
- Book II: Chapters 2, 18, 20, 28, 31-33
- Book III: Chapters 5-9
- Book IV: CMP-18-21, CMP-24-26
- Book X: Chapters 7-9

## 16. Examples and anti-patterns

**Conforming example:** the responsible role records a scoped decision, machine enforcement, minimized evidence, independent verification, expiry, and a tested failure path.

**Anti-pattern:** a team treats a credential with favorable Trust evidence, passing scan, active certificate, or urgent incident as Permission to bypass Authority or expand Treaty scope.

## 17. Review findings, Owner Review, and completion

Constitutional, architecture, enforceability, security, privacy, trust, reliability, usability, automation, duplication, and burden reviews found no unresolved material defect. No Owner Review item is required. Status: Complete.

