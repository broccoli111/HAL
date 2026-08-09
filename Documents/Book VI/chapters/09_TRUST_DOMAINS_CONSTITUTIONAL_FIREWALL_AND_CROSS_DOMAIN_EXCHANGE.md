# Chapter 9 — Trust Domains, Constitutional Firewall, and Cross-Domain Exchange

## 1. Document control

- Identifier: HAL-BVI-09
- Version: 1.0
- Status: Final
- Effective date: 2026-07-27

## 2. Purpose

Govern domain classification, authenticated boundaries, Constitutional Firewall decisions, exchange minimization, provenance, failure posture, and trust evidence.

## 3. Scope

This chapter applies to HAL environments, components, repositories, operators, providers, Trust Domains, evidence, and external exchanges within the stated control applicability.

## 4. Authority and source requirements

- Book I: Decisions 23, 26-27, 32, 35, 47, 54
- Book II: Chapters 16-17, 19-20, 26, 33
- Book III: Chapters 3, 5-6
- Book IV: CMP-17-21, CMP-24
- Book X: Chapters 7-8
- Book VIII governs verification and certification decisions; Book IX governs exact machine contracts.

## 5. Definitions and accountable roles

Book X terms retain their canonical meaning. Chapter roles: Trust Steward, Constitutional Firewall Owner, Domain Owner, Privacy Steward, Security Operations, Evidence Custodian.

## 6. Normative controls

### VI-TRU-09-001 — Classify every Trust Domain

Every internal or external domain MUST have stable identity, owner, boundary, permitted purposes, data and capability scope, security and privacy assumptions, evidence, review cadence, and failure behavior.

- Applicability: all domains
- Responsible role: Trust Steward
- Enforcement: domain registry gate
- Required evidence: Trust Domain record
- Severity: Critical
- Exception authority: Security and Trust Executive
- Protection objective: Both

### VI-TRU-09-002 — Keep trust distinct

Trust Assessment MAY inform decisions but MUST NOT create Identity, Permission, Authority, capability, Treaty scope, or authoritative state; current Permission remains independently required.

- Applicability: all trust use
- Responsible role: Trust Steward
- Enforcement: negative authority tests
- Required evidence: Trust Assessment and Permission Decision Record
- Severity: Critical
- Exception authority: None
- Protection objective: Constrain HAL

### VI-TRU-09-003 — Route cross-domain exchange through the Firewall

Every cross-domain ingress and egress MUST traverse the Constitutional Firewall with authenticated domain identity, active applicable Treaty where required, current Authority, purpose, classification, minimization, provenance, and integrity checks.

- Applicability: cross-domain exchange
- Responsible role: Constitutional Firewall Owner
- Enforcement: Book IX gateway enforcement
- Required evidence: Firewall decision and receipt
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-TRU-09-004 — Fail closed on missing boundary facts

Absent, stale, ambiguous, unverifiable, expired, revoked, suspended, drifted, or incompatible domain, Treaty, Authority, schema, provenance, or integrity evidence MUST deny or quarantine the exchange.

- Applicability: uncertain exchanges
- Responsible role: Constitutional Firewall Owner
- Enforcement: denial policy and adversarial tests
- Required evidence: denial or quarantine event
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-TRU-09-005 — Constrain returned data and effects

Firewall egress and ingress MUST enforce permitted direction, purpose, fields, classification, volume, frequency, recipients, actions, retention, and downstream propagation.

- Applicability: all exchanges
- Responsible role: Constitutional Firewall Owner
- Enforcement: content and policy enforcement
- Required evidence: exchange manifest
- Severity: Critical
- Exception authority: None
- Protection objective: Constrain HAL

### VI-TRU-09-006 — Preserve cross-domain provenance

Accepted exchanges MUST retain source domain, identities, Treaty and Authority context, schema and contract versions, integrity, time confidence, transformations, and custody.

- Applicability: accepted exchanges
- Responsible role: Evidence Custodian
- Enforcement: Book IX envelope validation
- Required evidence: provenance chain
- Severity: High
- Exception authority: None
- Protection objective: Both

### VI-TRU-09-007 — Monitor domain drift

Control, ownership, identity, endpoint, jurisdiction, purpose, behavior, assurance, incident, or threat changes MUST trigger Trust Assessment and Treaty applicability review.

- Applicability: active domains
- Responsible role: Domain Owner
- Enforcement: drift monitoring
- Required evidence: domain reassessment
- Severity: High
- Exception authority: Trust Steward
- Protection objective: Both

### VI-TRU-09-008 — Exercise boundary failure

The program MUST test replay, substitution, downgrade, schema confusion, revoked Treaty, stale Authority, over-purpose, over-data, exfiltration, unavailable Firewall, and compromised counterparty scenarios.

- Applicability: external boundaries
- Responsible role: Security Operations
- Enforcement: adversarial gateway exercises
- Required evidence: boundary exercise report
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

- Book I: Decisions 23, 26-27, 32, 35, 47, 54
- Book II: Chapters 16-17, 19-20, 26, 33
- Book III: Chapters 3, 5-6
- Book IV: CMP-17-21, CMP-24
- Book X: Chapters 7-8

## 16. Examples and anti-patterns

**Conforming example:** the responsible role records a scoped decision, machine enforcement, minimized evidence, independent verification, expiry, and a tested failure path.

**Anti-pattern:** a team treats a credential with favorable Trust evidence, passing scan, active certificate, or urgent incident as Permission to bypass Authority or expand Treaty scope.

## 17. Review findings, Owner Review, and completion

Constitutional, architecture, enforceability, security, privacy, trust, reliability, usability, automation, duplication, and burden reviews found no unresolved material defect. No Owner Review item is required. Status: Complete.

