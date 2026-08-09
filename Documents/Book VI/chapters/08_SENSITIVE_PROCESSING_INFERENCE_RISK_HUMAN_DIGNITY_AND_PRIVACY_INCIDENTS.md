# Chapter 8 — Sensitive Processing, Inference Risk, Human Dignity, and Privacy Incidents

## 1. Document control

- Identifier: HAL-BVI-08
- Version: 1.0
- Status: Final
- Effective date: 2026-07-27

## 2. Purpose

Control inference, sensitive processing, surveillance risk, human interaction, privacy testing, complaints, and privacy incident response.

## 3. Scope

This chapter applies to HAL environments, components, repositories, operators, providers, Trust Domains, evidence, and external exchanges within the stated control applicability.

## 4. Authority and source requirements

- Book I: Articles IX-XII; Decisions 26, 30, 33-35, 45, 48, 55-57
- Book II: Chapters 7, 12, 18, 27, 29, 34
- Book III: Chapters 4-6, 8
- Book IV: CMP-05-10, CMP-18-19, CMP-27-29
- Book X: Chapters 5, 7-8, 10
- Book VIII governs verification and certification decisions; Book IX governs exact machine contracts.

## 5. Definitions and accountable roles

Book X terms retain their canonical meaning. Chapter roles: Privacy Steward, Model Owner, Human Interaction Owner, Incident Commander, Data Owner, Independent Assessor.

## 6. Normative controls

### VI-PIN-08-001 — Assess inference risk

Systems that infer identity, traits, relationships, emotion, health, beliefs, vulnerability, location, or intent MUST document necessity, uncertainty, affected people, misuse paths, validation, disclosure, retention, and denial or appeal.

- Applicability: sensitive inference
- Responsible role: Privacy Steward
- Enforcement: privacy impact assessment
- Required evidence: inference risk assessment
- Severity: Critical
- Exception authority: Security and Trust Executive
- Protection objective: Both

### VI-PIN-08-002 — Do not promote inference to fact

Inferred personal information MUST remain labeled with provenance, method, confidence, time, and contradiction; it MUST NOT be represented as observed fact or used beyond authorized purpose.

- Applicability: all inferences
- Responsible role: Model Owner
- Enforcement: data-model and output checks
- Required evidence: inference record
- Severity: Critical
- Exception authority: None
- Protection objective: Constrain HAL

### VI-PIN-08-003 — Prohibit covert expansion

HAL MUST NOT increase observation, persistence, profiling, audience, or disclosure merely because a capability makes it possible; material expansion requires explicit authority and review.

- Applicability: sensitive processing changes
- Responsible role: Privacy Steward
- Enforcement: change impact gate
- Required evidence: privacy change decision
- Severity: Critical
- Exception authority: None
- Protection objective: Constrain HAL

### VI-PIN-08-004 — Preserve human dignity and agency

Interfaces MUST make consequential collection, inference, disclosure, recording, and automated effects understandable and provide meaningful consent, correction, refusal, or escalation where constitutionally applicable.

- Applicability: human interactions
- Responsible role: Human Interaction Owner
- Enforcement: human-factors and privacy review
- Required evidence: interaction assessment
- Severity: Critical
- Exception authority: Owner only for genuine value conflict
- Protection objective: Constrain HAL

### VI-PIN-08-005 — Test privacy failure paths

Privacy tests MUST cover wrong subject, overcollection, purpose drift, unauthorized audience, inference leakage, retention expiry, incomplete deletion, backup restore, cross-domain transfer, and evidence overexposure.

- Applicability: privacy-relevant systems
- Responsible role: Independent Assessor
- Enforcement: privacy test suite
- Required evidence: privacy verification report
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-PIN-08-006 — Detect privacy incidents

Unauthorized, excessive, inaccurate, misleading, purpose-incompatible, retained-too-long, or improperly disclosed processing MUST enter the incident process even when no conventional security breach occurred.

- Applicability: all processing
- Responsible role: Privacy Steward
- Enforcement: privacy event detection
- Required evidence: privacy incident record
- Severity: High
- Exception authority: None
- Protection objective: Both

### VI-PIN-08-007 — Contain without destroying accountability

Privacy incident containment MUST stop further harm, restrict access and exchange, preserve minimized evidence, identify affected data and people, and avoid deleting records needed for accountable investigation.

- Applicability: privacy incidents
- Responsible role: Incident Commander
- Enforcement: incident playbook
- Required evidence: containment record
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-PIN-08-008 — Remediate affected lifecycle paths

Privacy remediation MUST address authoritative and derived stores, models, caches, backups, recipients, Treaties, purpose rules, access paths, and recurrence controls, with Book VIII reverification where claims were affected.

- Applicability: privacy incidents
- Responsible role: Data Owner
- Enforcement: remediation tracking
- Required evidence: privacy recovery package
- Severity: Critical
- Exception authority: Privacy Steward
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

- Book I: Articles IX-XII; Decisions 26, 30, 33-35, 45, 48, 55-57
- Book II: Chapters 7, 12, 18, 27, 29, 34
- Book III: Chapters 4-6, 8
- Book IV: CMP-05-10, CMP-18-19, CMP-27-29
- Book X: Chapters 5, 7-8, 10

## 16. Examples and anti-patterns

**Conforming example:** the responsible role records a scoped decision, machine enforcement, minimized evidence, independent verification, expiry, and a tested failure path.

**Anti-pattern:** a team treats a credential with favorable Trust evidence, passing scan, active certificate, or urgent incident as Permission to bypass Authority or expand Treaty scope.

## 17. Review findings, Owner Review, and completion

Constitutional, architecture, enforceability, security, privacy, trust, reliability, usability, automation, duplication, and burden reviews found no unresolved material defect. No Owner Review item is required. Status: Complete.

