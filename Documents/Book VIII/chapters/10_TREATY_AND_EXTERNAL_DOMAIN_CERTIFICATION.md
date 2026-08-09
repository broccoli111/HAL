# Chapter 10 — Treaty and External-Domain Certification

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Verify Treaties and external-domain exchanges while preserving Owner approval and Firewall authority.

## 2. Scope

This chapter applies to Treaties, Treaty changes, Treaty interfaces, cross-domain evidence, external domains, external evidence. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 24-29, 38-43, 47-50, 56, 58; Book II Chapters 18, 20, 21, 35; Book III Chapters 5-9; Book IV CMP-17-21. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Treaty Steward, Owner, Trust Assessor, Privacy Assessor, Certification Authority, Firewall Owner. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### TRT-10-001 — Certify the exact Treaty

Treaty certification MUST bind the signed Treaty version, parties, identities, purposes, data classes, capabilities, directions, constraints, duration, audit, incident, suspension, and revocation terms.

- Applicability: Treaties
- Responsible role: Treaty Steward
- Enforcement: Treaty completeness gate
- Required evidence: Treaty Assurance Case
- Severity: Critical
- Exception authority: none

### TRT-10-002 — Preserve Owner approval

A Treaty certificate MUST NOT activate, extend, renew, or reinterpret a Treaty without the Owner approval required by Book I.

- Applicability: Treaties
- Responsible role: Certification Authority
- Enforcement: Owner-approval gate
- Required evidence: approval ceremony evidence
- Severity: Critical
- Exception authority: Owner

### TRT-10-003 — Verify counterpart identity and controls

External assurance MUST verify counterpart identity, authorized endpoints, provenance, security controls, privacy duties, evidence quality, and revocation reachability.

- Applicability: external domains
- Responsible role: Trust Assessor
- Enforcement: external assessment
- Required evidence: External Assurance Report
- Severity: Critical
- Exception authority: none

### TRT-10-004 — Test Firewall enforcement

Certification MUST prove the Constitutional Firewall denies exchanges that are unsigned, expired, suspended, revoked, replayed, directionally wrong, over-purpose, over-data, or over-capability.

- Applicability: Treaty interfaces
- Responsible role: Firewall Owner
- Enforcement: negative gateway suite
- Required evidence: Firewall Conformance Report
- Severity: Critical
- Exception authority: none

### TRT-10-005 — Minimize cross-domain evidence

Evidence exchange MUST disclose only Treaty-authorized, purpose-bound, minimized material and MUST preserve classification, provenance, custody, retention, and deletion duties.

- Applicability: cross-domain evidence
- Responsible role: Privacy Assessor
- Enforcement: data-flow review
- Required evidence: Cross-Domain Evidence Manifest
- Severity: Critical
- Exception authority: none

### TRT-10-006 — Exercise suspension and revocation

Treaty certification MUST test propagation, cached-state invalidation, in-flight handling, data quarantine, notification, audit, and recovery after suspension or revocation.

- Applicability: Treaties
- Responsible role: Treaty Steward
- Enforcement: revocation drill
- Required evidence: Treaty Revocation Exercise
- Severity: Critical
- Exception authority: none

### TRT-10-007 — Bound external assurance reliance

Third-party attestations MAY support claims but MUST state scope, method, competence, independence, validity, and untested assumptions; they MUST NOT replace HAL verification where effects enter HAL.

- Applicability: external evidence
- Responsible role: Certification Authority
- Enforcement: attestation review
- Required evidence: Reliance Assessment
- Severity: High
- Exception authority: Certification Authority

### TRT-10-008 — Recertify on material Treaty change

Party, identity, purpose, data class, capability, direction, control, duration, jurisdiction, or risk changes MUST trigger Treaty reapproval and recertification as applicable.

- Applicability: Treaty changes
- Responsible role: Treaty Steward
- Enforcement: change detector
- Required evidence: Treaty Recertification Record
- Severity: Critical
- Exception authority: Owner

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

- Book I/II/III/IV: Book I Decisions 24-29, 38-43, 47-50, 56, 58; Book II Chapters 18, 20, 21, 35; Book III Chapters 5-9; Book IV CMP-17-21
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.
