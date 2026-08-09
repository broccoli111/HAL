# Chapter 8 — Component and Capability Certification

**Document control:** HAL Book VIII v1.0; Final; 2026-07-27; owner: Assurance Governor; review cadence: annual and upon higher-order change.

## 1. Purpose

Certify Book IV components and capability classes without transferring authority or concealing dependencies.

## 2. Scope

This chapter applies to capabilities, component releases, components, composed targets, dependency changes, new capability classes. It governs assurance without creating implementation architecture or wire contracts.

## 3. Authority and source requirements

Book I Decisions 35, 38-43, 47-51, 56, 58; Book II Chapters 15-17, 29, 35; Book III Chapters 3, 6-9; Book IV all components. Book I prevails over every lower-order artifact. Book IX v1.0 is the authoritative contract reference; Book VIII governs assurance semantics and MUST NOT create alternative wire contracts.

## 4. Definitions

Accountable roles: Component Owner, Capability Owner, Certification Authority, Architecture Reviewer, Security Assessor. **Verification** evaluates a scoped claim. **Certification** is a time- and scope-bounded decision by the designated Certification Authority that permits reliance on stated verified claims; it does not create operational Authority or Permission.

## 5. Normative standards

### OBJ-08-001 — Certify every component obligation

Component certification MUST cover every Book IV responsibility, non-responsibility, invariant, state transition, logical interface, failure mode, recovery path, and prohibited shortcut.

- Applicability: components
- Responsible role: Component Owner
- Enforcement: Book IV coverage gate
- Required evidence: Component Assurance Case
- Severity: Critical
- Exception authority: none

### OBJ-08-002 — Identify exact build and deployment

A component certificate MUST bind source, build, artifact provenance, configuration, policy, schema, dependency, environment class, and deployment topology.

- Applicability: component releases
- Responsible role: Component Owner
- Enforcement: manifest equality check
- Required evidence: Component Certificate Manifest
- Severity: Critical
- Exception authority: none

### OBJ-08-003 — Test integration assumptions

Component certification MUST verify declared dependencies, degraded behavior, version compatibility, event ordering, idempotency, time assumptions, and authority-context preservation.

- Applicability: components
- Responsible role: Architecture Reviewer
- Enforcement: integration suite
- Required evidence: Dependency Verification Report
- Severity: High
- Exception authority: Certification Authority

### OBJ-08-004 — Separate provider qualification

A qualified provider or adapter MUST NOT be treated as a certified Capability or as Permission to invoke it.

- Applicability: capabilities
- Responsible role: Capability Owner
- Enforcement: registry invariant test
- Required evidence: Provider Qualification Record
- Severity: Critical
- Exception authority: none

### OBJ-08-005 — Certify capability semantics

Capability certification MUST prove contract semantics, provider equivalence bounds, authority requirements, input/output constraints, resource limits, failure behavior, evidence, and rollback.

- Applicability: capabilities
- Responsible role: Capability Owner
- Enforcement: capability conformance suite
- Required evidence: Capability Assurance Case
- Severity: Critical
- Exception authority: none

### OBJ-08-006 — Require Owner approval for new classes

Certification MUST NOT activate a new capability class without the Owner approval required by the canon; certification evidence supports but does not replace approval.

- Applicability: new capability classes
- Responsible role: Certification Authority
- Enforcement: approval gate
- Required evidence: Owner approval reference
- Severity: Critical
- Exception authority: Owner

### OBJ-08-007 — Limit certificate inheritance

A dependent target MUST reuse current evidence only when provenance, scope, environment, version, assumptions, and independence are demonstrably applicable; otherwise it MUST produce new evidence.

- Applicability: composed targets
- Responsible role: Certification Authority
- Enforcement: evidence applicability review
- Required evidence: Evidence Reuse Record
- Severity: High
- Exception authority: Certification Authority

### OBJ-08-008 — Propagate invalidation

Suspension or revocation of a component, provider, adapter, or dependency certificate MUST evaluate and propagate impact to every relying capability and release.

- Applicability: dependency changes
- Responsible role: Certification Authority
- Enforcement: dependency graph traversal
- Required evidence: Impact and Propagation Record
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

- Book I/II/III/IV: Book I Decisions 35, 38-43, 47-51, 56, 58; Book II Chapters 15-17, 29, 35; Book III Chapters 3, 6-9; Book IV all components
- Book X: Assurance Case, Certification, Claim, Confidence, Evidence Object, Reality Boundary, Verification, and related canonical terms.
- Book IX: final contract mappings and the single governed certification-status extension are recorded in `planning/BOOK_IX_RECONCILIATION_REGISTER.md`.

## 16. Examples and anti-patterns

**Example:** A release certificate cites exact build digests, claim results, reproduction, current authority-path tests, rollback rehearsal, and a bounded observation window.

**Anti-pattern:** A dashboard is labeled “green,” so a reviewer signs an indefinite certificate without examining data lineage, minority failures, stale inputs, authority paths, or revocation triggers.

## 17. Review findings, Owner Review, and completion

Constitutional fidelity: PASS. Architecture fidelity: PASS. Enforceability and testability: PASS. No Owner Review item. Chapter status: Final.
