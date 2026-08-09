# Chapter 10 — Treaty Lifecycle and Third-Party Trust Governance

## 1. Document control

- Identifier: HAL-BVI-10
- Version: 1.0
- Status: Final
- Effective date: 2026-07-27

## 2. Purpose

Govern Treaty proposal, due diligence, Owner approval dependency, activation, monitoring, suspension, revocation, renewal, third-party risk, and exchange obligations.

## 3. Scope

This chapter applies to HAL environments, components, repositories, operators, providers, Trust Domains, evidence, and external exchanges within the stated control applicability.

## 4. Authority and source requirements

- Book I: Decisions 26, 47, 48, 54
- Book II: Chapters 17, 20, 26, 33, 35
- Book III: Chapters 5, 7-9
- Book IV: CMP-17, CMP-20-21
- Book X: Chapters 7-8
- Book VIII governs verification and certification decisions; Book IX governs exact machine contracts.

## 5. Definitions and accountable roles

Book X terms retain their canonical meaning. Chapter roles: Treaty Steward, Owner, Third-Party Risk Owner, Constitutional Firewall Owner, Privacy Steward, Incident Commander.

## 6. Normative controls

### VI-TRT-10-001 — Perform Treaty due diligence

Before activation, the Treaty package MUST assess counterparty identity, ownership, purposes, data, capabilities, directions, controls, incidents, evidence, retention, deletion, jurisdiction, subcontractors, suspension, revocation, and exit.

- Applicability: proposed Treaties
- Responsible role: Treaty Steward
- Enforcement: due diligence gate
- Required evidence: Treaty assessment package
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-TRT-10-002 — Preserve Owner approval

No certification, security review, counterparty assurance, contract signature, credential, or technical connectivity MAY substitute for the constitutionally required Owner approval of a Treaty or new Treaty class.

- Applicability: Treaties
- Responsible role: Treaty Steward
- Enforcement: Owner-approval reference gate
- Required evidence: Owner Authorization Ceremony Record
- Severity: Critical
- Exception authority: Owner
- Protection objective: Constrain HAL

### VI-TRT-10-003 — Activate exact approved versions

Activation MUST bind the exact signed Treaty version, parties, domains, purposes, data classes, capabilities, directions, constraints, effective time, expiry, and Firewall policy; drift MUST block activation.

- Applicability: Treaty activation
- Responsible role: Constitutional Firewall Owner
- Enforcement: Book IX contract and policy gate
- Required evidence: activation record
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-TRT-10-004 — Monitor Treaty obligations

Active Treaties MUST be monitored for expiry, permitted-use compliance, volume, recipients, incidents, assurance validity, retention, deletion, downstream sharing, and counterparty change.

- Applicability: active Treaties
- Responsible role: Treaty Steward
- Enforcement: continuous monitoring
- Required evidence: Treaty monitoring evidence
- Severity: High
- Exception authority: Security and Trust Executive
- Protection objective: Both

### VI-TRT-10-005 — Suspend on material uncertainty

Material incident, assurance loss, identity doubt, policy drift, contract mismatch, noncompliance, or revocation unreachability MUST suspend affected exchange pending review.

- Applicability: active Treaties
- Responsible role: Incident Commander
- Enforcement: automatic and manual suspension
- Required evidence: suspension record and receipts
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-TRT-10-006 — Revoke comprehensively

Revocation MUST stop new exchange, handle in-flight actions, invalidate cached permissions, quarantine affected data, notify authorized parties, preserve evidence, and evaluate dependent capabilities and certifications.

- Applicability: revoked Treaties
- Responsible role: Treaty Steward
- Enforcement: Book IX revocation workflow
- Required evidence: revocation manifest
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-TRT-10-007 — Control subcontractors and fourth parties

A third party MUST NOT extend access, data, capability, or processing to another domain unless the Treaty explicitly permits it and equivalent identity, security, privacy, evidence, and revocation controls are verified.

- Applicability: third-party chains
- Responsible role: Third-Party Risk Owner
- Enforcement: relationship and exchange review
- Required evidence: downstream party register
- Severity: Critical
- Exception authority: Owner if Treaty scope changes
- Protection objective: Both

### VI-TRT-10-008 — Exit safely

Treaty expiry or termination MUST define return or deletion, retained evidence, credential and endpoint revocation, data quarantine, unresolved transactions, continuity, disputes, and post-exit verification.

- Applicability: Treaty exit
- Responsible role: Treaty Steward
- Enforcement: exit checklist and receipts
- Required evidence: exit evidence package
- Severity: High
- Exception authority: Security and Trust Executive
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

- Book I: Decisions 26, 47, 48, 54
- Book II: Chapters 17, 20, 26, 33, 35
- Book III: Chapters 5, 7-9
- Book IV: CMP-17, CMP-20-21
- Book X: Chapters 7-8

## 16. Examples and anti-patterns

**Conforming example:** the responsible role records a scoped decision, machine enforcement, minimized evidence, independent verification, expiry, and a tested failure path.

**Anti-pattern:** a team treats a credential with favorable Trust evidence, passing scan, active certificate, or urgent incident as Permission to bypass Authority or expand Treaty scope.

## 17. Review findings, Owner Review, and completion

Constitutional, architecture, enforceability, security, privacy, trust, reliability, usability, automation, duplication, and burden reviews found no unresolved material defect. No Owner Review item is required. Status: Complete.

