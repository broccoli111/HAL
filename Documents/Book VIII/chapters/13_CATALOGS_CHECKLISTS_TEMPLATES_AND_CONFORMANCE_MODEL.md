# Chapter 13 — Catalogs, Checklists, Templates, and Conformance Model

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Define the mandatory artifact set and machine-enforceable conformance model.

## 2. Scope

This chapter applies to all assurance work, all controls, all packages, assurance platform, certification decisions, exceptions, program reporting. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 40, 43, 47-51, 56, 58; Book II Chapter 35; Book III Chapters 1, 8, 9; Book IV conformance model and all components. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Assurance Governor, Catalog Custodian, Certification Authority, Verification Lead, Audit Lead. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### REF-13-001 — Use stable control identifiers

Every consequential Book VIII control MUST have a unique stable identifier and catalog record containing requirement, applicability, role, method, evidence, severity, authority, sources, chapter, and automation status.

- Applicability: all controls
- Responsible role: Catalog Custodian
- Enforcement: catalog-schema validation
- Required evidence: Verification and Certification Catalog
- Severity: High
- Exception authority: none

### REF-13-002 — Use controlled templates

Verification Plans, Assurance Cases, Evidence Manifests, Certification Decisions, exceptions, and reports MUST use controlled versioned templates or demonstrably equivalent schemas.

- Applicability: all assurance work
- Responsible role: Verification Lead
- Enforcement: artifact-schema gate
- Required evidence: completed controlled artifact
- Severity: High
- Exception authority: Certification Authority

### REF-13-003 — Complete certification checklists

Certification Authorities MUST complete the applicable component, capability, release, Treaty, Reality Boundary, and suspension checklists before decision.

- Applicability: certification decisions
- Responsible role: Certification Authority
- Enforcement: workflow gate
- Required evidence: signed checklist
- Severity: High
- Exception authority: none

### REF-13-004 — Maintain bidirectional traceability

Books I-IV and X sources MUST map to Book VIII claims and controls, and every Book VIII control MUST map back to its governing source or declared implementation flexibility.

- Applicability: all controls
- Responsible role: Catalog Custodian
- Enforcement: matrix validation
- Required evidence: bidirectional traceability matrices
- Severity: Critical
- Exception authority: none

### REF-13-005 — Test the assurance system

The verification and certification process itself MUST undergo failure, access-control, evidence-tampering, stale-status, propagation, and recovery tests.

- Applicability: assurance platform
- Responsible role: Audit Lead
- Enforcement: meta-assurance suite
- Required evidence: Assurance-System Test Report
- Severity: Critical
- Exception authority: none

### REF-13-006 — Govern deviations

A deviation from architecture MUST follow Book III architecture governance; an assurance exception MUST be time-bounded, risk-assessed, compensated, approved, monitored, and unable to waive constitutional invariants.

- Applicability: exceptions
- Responsible role: Assurance Governor
- Enforcement: exception workflow
- Required evidence: Exception Record
- Severity: Critical
- Exception authority: Assurance Governor

### REF-13-007 — Measure meaningful performance

Program metrics MUST cover claim coverage, evidence freshness, reproduction success, escaped defects, calibration, invalidation latency, suspension propagation, waiver age, and verification burden—not pass counts alone.

- Applicability: program reporting
- Responsible role: Assurance Governor
- Enforcement: metric-quality review
- Required evidence: Assurance Dashboard Evidence
- Severity: High
- Exception authority: none

### REF-13-008 — Certify only complete packages

A certification package MUST NOT be marked complete while a mandatory artifact, critical claim, review, traceability link, Book IX reconciliation item applicable to implemented protocols, or known limitation is absent.

- Applicability: all packages
- Responsible role: Certification Authority
- Enforcement: completion gate
- Required evidence: Certification Package Manifest
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

- Book I/II/III/IV: Book I Decisions 40, 43, 47-51, 56, 58; Book II Chapter 35; Book III Chapters 1, 8, 9; Book IV conformance model and all components
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.
