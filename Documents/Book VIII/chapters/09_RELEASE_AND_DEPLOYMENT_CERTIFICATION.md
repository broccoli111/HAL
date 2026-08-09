# Chapter 9 — Release and Deployment Certification

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Require release evidence, reproducibility, staged deployment, rollback, observation, and environment-specific admission.

## 2. Scope

This chapter applies to R2-R4 deployments, R2-R4 releases, all releases, deployments, emergency changes, migrations, releases. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 35, 38-43, 47-51, 56, 58; Book II Chapters 27, 32-35; Book III Chapters 7-9; Book IV CMP-15, CMP-18, CMP-23-26. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Release Owner, Release Authority, Build Custodian, Deployment Owner, Certification Authority. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### RLS-09-001 — Certify immutable artifacts

Release certification MUST bind reproducible build evidence, SBOM, signatures, provenance, vulnerability disposition, configuration, migrations, and artifact digests.

- Applicability: releases
- Responsible role: Build Custodian
- Enforcement: supply-chain gate
- Required evidence: Release Evidence Manifest
- Severity: Critical
- Exception authority: none

### RLS-09-002 — Map change risk and claims

Every release MUST map changes to affected source requirements, components, interfaces, controls, claims, failure modes, and recertification scope.

- Applicability: releases
- Responsible role: Release Owner
- Enforcement: impact-analysis gate
- Required evidence: Change Impact Record
- Severity: High
- Exception authority: Release Authority

### RLS-09-003 — Prove migration safety

State or schema migrations MUST demonstrate compatibility, checkpoints, partial-failure handling, rollback or forward recovery, reconciliation, and evidence preservation.

- Applicability: migrations
- Responsible role: Deployment Owner
- Enforcement: migration rehearsal
- Required evidence: Migration Verification Report
- Severity: Critical
- Exception authority: none

### RLS-09-004 — Require rollback credibility

Rollback or forward recovery MUST be executed in a representative environment and must restore invariants rather than merely restore process availability.

- Applicability: R2-R4 releases
- Responsible role: Deployment Owner
- Enforcement: recovery rehearsal
- Required evidence: Rollback Verification Record
- Severity: Critical
- Exception authority: none

### RLS-09-005 — Bind certification to environment

A release approved for one environment, topology, data class, authority envelope, or Treaty context MUST NOT be presumed certified elsewhere.

- Applicability: deployments
- Responsible role: Certification Authority
- Enforcement: environment admission gate
- Required evidence: Deployment Certificate
- Severity: Critical
- Exception authority: none

### RLS-09-006 — Gate emergency changes

Emergency releases MUST preserve constitutional, authority, evidence, and recovery controls; omitted ordinary evidence MUST be time-bounded and completed before continued operation.

- Applicability: emergency changes
- Responsible role: Release Authority
- Enforcement: emergency workflow
- Required evidence: Emergency Certification Record
- Severity: Critical
- Exception authority: Assurance Governor

### RLS-09-007 — Observe after release

Post-release validation MUST compare expected and observed health, outcomes, harms, authority denials, privacy events, resource use, and rollback readiness during a declared window.

- Applicability: all releases
- Responsible role: Release Owner
- Enforcement: observation gate
- Required evidence: Post-Release Validation Report
- Severity: High
- Exception authority: Release Authority

### RLS-09-008 — Deny uncertified execution

R2-R4 artifacts without a current applicable certificate MUST NOT receive protected work or cross the Reality Boundary.

- Applicability: R2-R4 deployments
- Responsible role: Runtime Supervisor owner
- Enforcement: admission enforcement
- Required evidence: runtime admission log
- Severity: Critical
- Exception authority: none

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

- Book I/II/III/IV: Book I Decisions 35, 38-43, 47-51, 56, 58; Book II Chapters 27, 32-35; Book III Chapters 7-9; Book IV CMP-15, CMP-18, CMP-23-26
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.
