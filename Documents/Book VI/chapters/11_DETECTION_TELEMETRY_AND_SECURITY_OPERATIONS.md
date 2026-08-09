# Chapter 11 — Detection, Telemetry, and Security Operations

## 1. Document control

- Identifier: HAL-BVI-11
- Version: 1.0
- Status: Final
- Effective date: 2026-07-27

## 2. Purpose

Define privacy-minimized, incident-relevant telemetry; detection engineering; triage; alert quality; and protected evidence pipelines.

## 3. Scope

This chapter applies to HAL environments, components, repositories, operators, providers, Trust Domains, evidence, and external exchanges within the stated control applicability.

## 4. Authority and source requirements

- Book I: Decisions 26, 28, 40-42
- Book II: Chapters 28, 31-33
- Book III: Chapters 4-6, 8
- Book IV: CMP-18, CMP-24-26
- Book X: Chapters 7-9
- Book VIII governs verification and certification decisions; Book IX governs exact machine contracts.

## 5. Definitions and accountable roles

Book X terms retain their canonical meaning. Chapter roles: Detection Engineering Owner, Security Operations, Observability Owner, Privacy Steward, Control Owner, Evidence Custodian.

## 6. Normative controls

### VI-DET-11-001 — Emit incident-relevant events

Identity, Authority, policy, privilege, secret, key, build, vulnerability, Firewall, Treaty, data, configuration, integrity, evidence, and recovery controls MUST emit structured success, denial, anomaly, and failure events.

- Applicability: critical controls
- Responsible role: Observability Owner
- Enforcement: Book IX event conformance
- Required evidence: event records
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-DET-11-002 — Use canonical telemetry context

Events MUST carry the applicable Book IX identity, correlation, causation, time, provenance, classification, integrity, contract/schema version, and optional Authority and Treaty context; missing critical context MUST reduce trust.

- Applicability: all security telemetry
- Responsible role: Observability Owner
- Enforcement: schema validation
- Required evidence: validated event stream
- Severity: High
- Exception authority: None
- Protection objective: Both

### VI-DET-11-003 — Minimize and protect telemetry

Telemetry MUST exclude secrets and unnecessary sensitive content, apply field protection and access controls, use declared retention, and preserve sufficient evidence to reconstruct protected actions.

- Applicability: all telemetry
- Responsible role: Privacy Steward
- Enforcement: logging policy and scans
- Required evidence: telemetry data inventory
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-DET-11-004 — Detect authority violations separately

Detection content MUST identify attempted or actual excess Authority, stale delegation, bypassed Kernel or Firewall, foreign state mutation, and unauthorized Reality Boundary effects separately from compromise indicators.

- Applicability: authority paths
- Responsible role: Detection Engineering Owner
- Enforcement: authority-focused rules and tests
- Required evidence: authority incident alert
- Severity: Critical
- Exception authority: None
- Protection objective: Constrain HAL

### VI-DET-11-005 — Validate detection quality

Critical detections MUST have test cases, required sources, expected latency, false-negative and false-positive review, owner, runbook, evidence links, and behavior for missing telemetry.

- Applicability: critical detections
- Responsible role: Detection Engineering Owner
- Enforcement: detection CI and exercises
- Required evidence: detection validation record
- Severity: High
- Exception authority: Security and Trust Executive
- Protection objective: Both

### VI-DET-11-006 — Triage by consequence

Triage MUST assess constitutional impact, Authority, protected state, privacy, Trust Domain, Treaty, blast radius, persistence, evidence integrity, and recovery—not just technical severity.

- Applicability: all alerts
- Responsible role: Security Operations
- Enforcement: triage workflow
- Required evidence: triage record
- Severity: Critical
- Exception authority: None
- Protection objective: Both

### VI-DET-11-007 — Protect evidence pipelines

Critical event collection MUST be tamper-evident, access-controlled, time-aware, resilient, independently monitored, and incapable of being silently disabled by the observed component.

- Applicability: critical telemetry
- Responsible role: Evidence Custodian
- Enforcement: pipeline integrity monitoring
- Required evidence: pipeline attestation
- Severity: Critical
- Exception authority: None
- Protection objective: Protect HAL

### VI-DET-11-008 — Measure coverage honestly

Coverage metrics MUST identify unmonitored assets, stale rules, missing fields, collection gaps, delayed events, untested scenarios, and blind spots; aggregate alert volume MUST NOT serve as assurance.

- Applicability: detection program
- Responsible role: Detection Engineering Owner
- Enforcement: coverage reconciliation
- Required evidence: detection coverage report
- Severity: High
- Exception authority: Risk Steward
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

- Book I: Decisions 26, 28, 40-42
- Book II: Chapters 28, 31-33
- Book III: Chapters 4-6, 8
- Book IV: CMP-18, CMP-24-26
- Book X: Chapters 7-9

## 16. Examples and anti-patterns

**Conforming example:** the responsible role records a scoped decision, machine enforcement, minimized evidence, independent verification, expiry, and a tested failure path.

**Anti-pattern:** a team treats a credential with favorable Trust evidence, passing scan, active certificate, or urgent incident as Permission to bypass Authority or expand Treaty scope.

## 17. Review findings, Owner Review, and completion

Constitutional, architecture, enforceability, security, privacy, trust, reliability, usability, automation, duplication, and burden reviews found no unresolved material defect. No Owner Review item is required. Status: Complete.

