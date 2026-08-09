# HAL Book III - Engineering Standards

**Version:** 1.0  
**Status:** Final  
**Authority:** Book I - The Constitution is supreme. Book II - Architecture Specification is authoritative. Book III is subordinate to both and defines common engineering law; detailed subsystem requirements belong in Book IV.

## Revision history

| Version | Date | Status | Change |
|---|---|---|---|
| 1.0 | 2026-07-27 | Final | Initial consolidated engineering standards; constitutional and Owner-decision audit complete |

## Table of contents

1. Foundations, Authority, and Lifecycle
2. Repository, Source, and Configuration Management
3. Software Design and Contract Engineering
4. Implementation Quality and Observability
5. Security, Privacy, and Trust-Boundary Engineering
6. Testing, Verification, and Simulation
7. Delivery, Change, and Release Governance
8. Review, Assurance, and Technical Debt
9. Control Operations, Exceptions, and Certification

## Authority statement

Book III MUST NOT alter, weaken, reinterpret, or contradict Book I or Book II. When a conflict is found, stop applying the conflicting Book III rule, preserve the higher-order requirement, record the conflict, and recommend a Book III correction.

# Chapter 1 - Foundations, Authority, and Lifecycle

## 1. Document control

Status: Final. Control families: GOV-001 GOV-002 GOV-003 GOV-004 GOV-005. Version: 1.0. Source authority: Book I then Book II.

## 2. Purpose

This chapter defines enforceable common engineering standards for purpose, normative language, roles, lifecycle, conformance, exceptions, adrs, documentation, evidence.

## 3. Scope

Applies to every HAL contributor, change, component, provider adapter, interface, environment, and release within this subject area.

## 4. Authority and source requirements

Book I Articles I-XII; Decisions 5, 25, 37, 43, 49, 58. Book II 01, 03, 05, 29, 35. If this chapter conflicts with either source, the higher-order requirement governs; record the conflict and correct Book III.

## 5. Definitions

Conformance evidence is a durable, reviewable record. A consequential change affects authority, identity, protected state, trust, privacy, a Reality Boundary, availability, or a material outcome. A control exception is a time-bounded approval, never a silent permission.

## 6. Normative standards

Every consequential change MUST identify its Book I and Book II source, responsible role, risk class, verification method, durable evidence location, and active exception status before merge. A lower-order artifact MUST NOT weaken a higher-order source.

## 7. Required engineering practices

Teams MUST perform design, security, privacy, reliability, and verification work in proportion to risk. Teams MUST retain evidence in the change or release record and MUST update traceability when requirements, interfaces, controls, or evidence change.

## 8. Prohibited practices

A change that lacks authority traceability, a review record, or required evidence MUST NOT merge or release.

## 9. Required evidence

Source-linked change record, ADR, test result, review approval, exception record where applicable.

## 10. Automated enforcement

Protected-path metadata checks; required PR fields; release gate.

## 11. Human review requirements

Principal Engineer and designated reviewers verify authority mapping; Architecture Authority reviews deviations.

## 12. Exceptions and waiver authority

An exception MUST identify affected control, justification, scope, risk, compensating controls, approver, effective date, expiration date, review date, evidence, and revocation conditions. Constitutional invariants cannot be waived. Architecture deviations follow the architecture-governance process. Expiration MUST fail closed or trigger explicit escalation.

## 13. Failure consequences

A violated MUST control is a finding. Critical or high findings block merge or release until corrected, contained, or covered by an active approved exception. A detected authority, privacy, or trust-boundary failure MUST be contained and investigated.

## 14. Security considerations

Controls MUST preserve explicit identity, authority, provenance, and least privilege; security controls protect HAL, while authority controls also prevent HAL from exceeding its mandate.

## 15. Privacy considerations

Evidence and telemetry MUST minimize personal and sensitive data, use classification-aware access, and retain only what is required for the stated purpose and governing obligation.

## 16. Reliability considerations

Critical behavior MUST define hazard-bounded degradation, containment, recovery, and evidence preservation. Applicable safety invariants, authority controls, and audit standards MUST NOT be degraded under resource pressure.

## 17. Verification method

Verify through automated checks, independent review, and risk-scaled test/release evidence. Critical invariants require an identified repeatable verification method; critical failure modes require tested containment or recovery.

## 18. Metrics

Track control pass rate, finding severity and age, exception count and age, verification coverage by risk, rollback/recovery performance, and post-release conformance defects.

## 19. Traceability to Book I

Book I Articles I-XII; Decisions 5, 25, 37, 43, 49, 58.

## 20. Traceability to Book II

Book II 01, 03, 05, 29, 35.

## 21. Examples

Example: the change record links the control IDs, source locators, test result, and approval before a protected action is released.

## 22. Anti-patterns

Anti-pattern: a technically successful change is released without authority-path verification because it appears operationally routine.

## 23. Review findings

Initial constitutional, architecture, enforceability, testability, security, privacy, reliability, usability, automation, exception-safety, duplication, and contradiction review: no unresolved internally resolvable issue. Reassess when implementation evidence is available.

## 24. Owner Review items

None. Routine implementation choices are resolved through engineering judgment. Escalate only matters reserved by Book I.

## 25. Completion status

Complete; chapter review record retained in `reviews/chapter-reviews/`.


# Chapter 2 - Repository, Source, and Configuration Management

## 1. Document control

Status: Final. Control families: SRC-001 SRC-002 SRC-003 SRC-004 SRC-005 SRC-006. Version: 1.0. Source authority: Book I then Book II.

## 2. Purpose

This chapter defines enforceable common engineering standards for repository structure, source control, integration, commits, ownership, dependencies, generated artifacts, configuration, secrets.

## 3. Scope

Applies to every HAL contributor, change, component, provider adapter, interface, environment, and release within this subject area.

## 4. Authority and source requirements

Book I Decisions 37, 39, 40, 43. Book II 03, 25, 26, 29. If this chapter conflicts with either source, the higher-order requirement governs; record the conflict and correct Book III.

## 5. Definitions

Conformance evidence is a durable, reviewable record. A consequential change affects authority, identity, protected state, trust, privacy, a Reality Boundary, availability, or a material outcome. A control exception is a time-bounded approval, never a silent permission.

## 6. Normative standards

Repositories MUST separate source, generated artifacts, configuration schemas, interfaces, tests, evidence, and deployment manifests. Secrets MUST NOT enter source control, logs, fixtures, images, or build outputs. Each dependency MUST have an owner, version constraint, provenance record, and vulnerability disposition.

## 7. Required engineering practices

Teams MUST perform design, security, privacy, reliability, and verification work in proportion to risk. Teams MUST retain evidence in the change or release record and MUST update traceability when requirements, interfaces, controls, or evidence change.

## 8. Prohibited practices

Direct protected-branch changes, unreviewed generated output, floating dependencies admitted to a declared live-effect environment, and ambient secrets are prohibited.

## 9. Required evidence

PR, SBOM, dependency attestation, generated-artifact provenance, configuration validation result.

## 10. Automated enforcement

Secret scanning, signed-commit/provenance checks, dependency SBOM and vulnerability policy.

## 11. Human review requirements

Code owners review protected paths; security reviews secret and dependency exceptions.

## 12. Exceptions and waiver authority

An exception MUST identify affected control, justification, scope, risk, compensating controls, approver, effective date, expiration date, review date, evidence, and revocation conditions. Constitutional invariants cannot be waived. Architecture deviations follow the architecture-governance process. Expiration MUST fail closed or trigger explicit escalation.

## 13. Failure consequences

A violated MUST control is a finding. Critical or high findings block merge or release until corrected, contained, or covered by an active approved exception. A detected authority, privacy, or trust-boundary failure MUST be contained and investigated.

## 14. Security considerations

Controls MUST preserve explicit identity, authority, provenance, and least privilege; security controls protect HAL, while authority controls also prevent HAL from exceeding its mandate.

## 15. Privacy considerations

Evidence and telemetry MUST minimize personal and sensitive data, use classification-aware access, and retain only what is required for the stated purpose and governing obligation.

## 16. Reliability considerations

Critical behavior MUST define hazard-bounded degradation, containment, recovery, and evidence preservation. Applicable safety invariants, authority controls, and audit standards MUST NOT be degraded under resource pressure.

## 17. Verification method

Verify through automated checks, independent review, and risk-scaled test/release evidence. Critical invariants require an identified repeatable verification method; critical failure modes require tested containment or recovery.

## 18. Metrics

Track control pass rate, finding severity and age, exception count and age, verification coverage by risk, rollback/recovery performance, and post-release conformance defects.

## 19. Traceability to Book I

Book I Decisions 37, 39, 40, 43.

## 20. Traceability to Book II

Book II 03, 25, 26, 29.

## 21. Examples

Example: the change record links the control IDs, source locators, test result, and approval before a protected action is released.

## 22. Anti-patterns

Anti-pattern: a technically successful change is released without authority-path verification because it appears operationally routine.

## 23. Review findings

Initial constitutional, architecture, enforceability, testability, security, privacy, reliability, usability, automation, exception-safety, duplication, and contradiction review: no unresolved internally resolvable issue. Reassess when implementation evidence is available.

## 24. Owner Review items

None. Routine implementation choices are resolved through engineering judgment. Escalate only matters reserved by Book I.

## 25. Completion status

Complete; chapter review record retained in `reviews/chapter-reviews/`.


# Chapter 3 - Software Design and Contract Engineering

## 1. Document control

Status: Final. Control families: DES-001 DES-002 DES-003 DES-004 DES-005 DES-006. Version: 1.0. Source authority: Book I then Book II.

## 2. Purpose

This chapter defines enforceable common engineering standards for modularity, component boundaries, interfaces, compatibility, state, events, concurrency, idempotency, time, errors, resources, degradation, rollback, reality boundary.

## 3. Scope

Applies to every HAL contributor, change, component, provider adapter, interface, environment, and release within this subject area.

## 4. Authority and source requirements

Book I Decisions 2-5, 15-16, 20, 23-24, 35, 44, 50. Book II 01, 02, 15, 16, 22, 23, 24. If this chapter conflicts with either source, the higher-order requirement governs; record the conflict and correct Book III.

## 5. Definitions

Conformance evidence is a durable, reviewable record. A consequential change affects authority, identity, protected state, trust, privacy, a Reality Boundary, availability, or a material outcome. A control exception is a time-bounded approval, never a silent permission.

## 6. Normative standards

Each durable state domain MUST have one mutation owner. Commands MUST request authoritative state change, queries MUST NOT mutate, and events MUST represent completed facts. Public contracts MUST declare versioning, Authority scope, Permission-decision context, idempotency, ordering scope, time semantics, error model, and compatibility policy.

## 7. Required engineering practices

Teams MUST perform design, security, privacy, reliability, and verification work in proportion to risk. Teams MUST retain evidence in the change or release record and MUST update traceability when requirements, interfaces, controls, or evidence change.

## 8. Prohibited practices

Last-write-wins on authoritative state without an approved invariant-preservation Verification result, unscoped retries, and reality-affecting work without an explicit commit barrier are prohibited.

## 9. Required evidence

Contract definitions, state-transition diagrams, ADR, compatibility report, test evidence, recovery plan.

## 10. Automated enforcement

Schema/contract compatibility, state-machine, idempotency, ordering, failure-injection, and rollback tests.

## 11. Human review requirements

Architecture review is required for state ownership, cross-domain contracts, and Reality Boundary changes.

## 12. Exceptions and waiver authority

An exception MUST identify affected control, justification, scope, risk, compensating controls, approver, effective date, expiration date, review date, evidence, and revocation conditions. Constitutional invariants cannot be waived. Architecture deviations follow the architecture-governance process. Expiration MUST fail closed or trigger explicit escalation.

## 13. Failure consequences

A violated MUST control is a finding. Critical or high findings block merge or release until corrected, contained, or covered by an active approved exception. A detected authority, privacy, or trust-boundary failure MUST be contained and investigated.

## 14. Security considerations

Controls MUST preserve explicit identity, authority, provenance, and least privilege; security controls protect HAL, while authority controls also prevent HAL from exceeding its mandate.

## 15. Privacy considerations

Evidence and telemetry MUST minimize personal and sensitive data, use classification-aware access, and retain only what is required for the stated purpose and governing obligation.

## 16. Reliability considerations

Critical behavior MUST define hazard-bounded degradation, containment, recovery, and evidence preservation. Applicable safety invariants, authority controls, and audit standards MUST NOT be degraded under resource pressure.

## 17. Verification method

Verify through automated checks, independent review, and risk-scaled test/release evidence. Critical invariants require an identified repeatable verification method; critical failure modes require tested containment or recovery.

## 18. Metrics

Track control pass rate, finding severity and age, exception count and age, verification coverage by risk, rollback/recovery performance, and post-release conformance defects.

## 19. Traceability to Book I

Book I Decisions 2-5, 15-16, 20, 23-24, 35, 44, 50.

## 20. Traceability to Book II

Book II 01, 02, 15, 16, 22, 23, 24.

## 21. Examples

Example: the change record links the control IDs, source locators, test result, and approval before a protected action is released.

## 22. Anti-patterns

Anti-pattern: a technically successful change is released without authority-path verification because it appears operationally routine.

## 23. Review findings

Initial constitutional, architecture, enforceability, testability, security, privacy, reliability, usability, automation, exception-safety, duplication, and contradiction review: no unresolved internally resolvable issue. Reassess when implementation evidence is available.

## 24. Owner Review items

None. Routine implementation choices are resolved through engineering judgment. Escalate only matters reserved by Book I.

## 25. Completion status

Complete; chapter review record retained in `reviews/chapter-reviews/`.


# Chapter 4 - Implementation Quality and Observability

## 1. Document control

Status: Final. Control families: OBS-001 OBS-002 OBS-003 OBS-004 DOC-001. Version: 1.0. Source authority: Book I then Book II.

## 2. Purpose

This chapter defines enforceable common engineering standards for language/runtime, readability, types, validation, error handling, logging, metrics/tracing, performance, accessibility, localization, deprecation.

## 3. Scope

Applies to every HAL contributor, change, component, provider adapter, interface, environment, and release within this subject area.

## 4. Authority and source requirements

Book I Articles II, VI, VII, XI, XII; Decisions 40, 43. Book II 25, 31, 32. If this chapter conflicts with either source, the higher-order requirement governs; record the conflict and correct Book III.

## 5. Definitions

Conformance evidence is a durable, reviewable record. A consequential change affects authority, identity, protected state, trust, privacy, a Reality Boundary, availability, or a material outcome. A control exception is a time-bounded approval, never a silent permission.

## 6. Normative standards

Implementation MUST validate untrusted input at the boundary, preserve typed error categories, emit structured correlation-aware evidence, and keep security, privacy, and authority context separate. Performance work MUST state workload, budget, measurement method, and regression threshold.

## 7. Required engineering practices

Teams MUST perform design, security, privacy, reliability, and verification work in proportion to risk. Teams MUST retain evidence in the change or release record and MUST update traceability when requirements, interfaces, controls, or evidence change.

## 8. Prohibited practices

Sensitive data in unrestricted logs; swallowed errors; unbounded retries; breaking removal without deprecation path; inaccessible primary interaction paths are prohibited.

## 9. Required evidence

Lint/type results, log schema, trace sample, benchmark, accessibility report, deprecation notice.

## 10. Automated enforcement

Static analysis, type checks, log-schema checks, performance regression tests, accessibility tests.

## 11. Human review requirements

Peer reviewer checks readability and errors; observability and accessibility owners review high-risk changes.

## 12. Exceptions and waiver authority

An exception MUST identify affected control, justification, scope, risk, compensating controls, approver, effective date, expiration date, review date, evidence, and revocation conditions. Constitutional invariants cannot be waived. Architecture deviations follow the architecture-governance process. Expiration MUST fail closed or trigger explicit escalation.

## 13. Failure consequences

A violated MUST control is a finding. Critical or high findings block merge or release until corrected, contained, or covered by an active approved exception. A detected authority, privacy, or trust-boundary failure MUST be contained and investigated.

## 14. Security considerations

Controls MUST preserve explicit identity, authority, provenance, and least privilege; security controls protect HAL, while authority controls also prevent HAL from exceeding its mandate.

## 15. Privacy considerations

Evidence and telemetry MUST minimize personal and sensitive data, use classification-aware access, and retain only what is required for the stated purpose and governing obligation.

## 16. Reliability considerations

Critical behavior MUST define hazard-bounded degradation, containment, recovery, and evidence preservation. Applicable safety invariants, authority controls, and audit standards MUST NOT be degraded under resource pressure.

## 17. Verification method

Verify through automated checks, independent review, and risk-scaled test/release evidence. Critical invariants require an identified repeatable verification method; critical failure modes require tested containment or recovery.

## 18. Metrics

Track control pass rate, finding severity and age, exception count and age, verification coverage by risk, rollback/recovery performance, and post-release conformance defects.

## 19. Traceability to Book I

Book I Articles II, VI, VII, XI, XII; Decisions 40, 43.

## 20. Traceability to Book II

Book II 25, 31, 32.

## 21. Examples

Example: the change record links the control IDs, source locators, test result, and approval before a protected action is released.

## 22. Anti-patterns

Anti-pattern: a technically successful change is released without authority-path verification because it appears operationally routine.

## 23. Review findings

Initial constitutional, architecture, enforceability, testability, security, privacy, reliability, usability, automation, exception-safety, duplication, and contradiction review: no unresolved internally resolvable issue. Reassess when implementation evidence is available.

## 24. Owner Review items

None. Routine implementation choices are resolved through engineering judgment. Escalate only matters reserved by Book I.

## 25. Completion status

Complete; chapter review record retained in `reviews/chapter-reviews/`.


# Chapter 5 - Security, Privacy, and Trust-Boundary Engineering

## 1. Document control

Status: Final. Control families: SEC-001 SEC-002 SEC-003 SEC-004 SEC-005 SEC-006 PRV-001 PRV-002. Version: 1.0. Source authority: Book I then Book II.

## 2. Purpose

This chapter defines enforceable common engineering standards for sdl, threat models, identity, authentication, authority, permission, least privilege, firewall, crypto, classification, privacy, treaties, supply chain, vulnerabilities.

## 3. Scope

Applies to every HAL contributor, change, component, provider adapter, interface, environment, and release within this subject area.

## 4. Authority and source requirements

Book I Articles I, II, V, VI, VIII, XI, XII; Decisions 26-27, 32, 36-37, 39, 48-49. Book II 04, 05, 18, 19, 20, 21, 26. If this chapter conflicts with either source, the higher-order requirement governs; record the conflict and correct Book III.

## 5. Definitions

Conformance evidence is a durable, reviewable record. A consequential change affects authority, identity, protected state, trust, privacy, a Reality Boundary, availability, or a material outcome. A control exception is a time-bounded approval, never a silent permission.

## 6. Normative standards

Every request crossing a trust boundary MUST carry authenticated identity, bounded Authority, purpose, provenance, and correlation context. Permission MUST be evaluated by the authoritative policy path within current Authority, not inferred from network, role label, secret possession, or provider usefulness. Data collection and disclosure MUST follow a classification, purpose, minimization, retention, and deletion/archival rule.

## 7. Required engineering practices

Teams MUST perform design, security, privacy, reliability, and verification work in proportion to risk. Teams MUST retain evidence in the change or release record and MUST update traceability when requirements, interfaces, controls, or evidence change.

## 8. Prohibited practices

Treating trust as authority; cross-domain exchange outside the Constitutional Firewall; long-lived ambient credentials; unapproved Treaty or new capability class; plaintext sensitive data in transit or at rest are prohibited.

## 9. Required evidence

Threat model, data inventory, access decision log, Treaty record, key-management record, SBOM, vulnerability disposition.

## 10. Automated enforcement

Threat-model, negative Authority and Permission, firewall, privacy, cryptographic, dependency-provenance, and penetration tests.

## 11. Human review requirements

Security Authority reviews threats and exceptions; Privacy Authority reviews data use; Owner authority is required only where Book I reserves it.

## 12. Exceptions and waiver authority

An exception MUST identify affected control, justification, scope, risk, compensating controls, approver, effective date, expiration date, review date, evidence, and revocation conditions. Constitutional invariants cannot be waived. Architecture deviations follow the architecture-governance process. Expiration MUST fail closed or trigger explicit escalation.

## 13. Failure consequences

A violated MUST control is a finding. Critical or high findings block merge or release until corrected, contained, or covered by an active approved exception. A detected authority, privacy, or trust-boundary failure MUST be contained and investigated.

## 14. Security considerations

Controls MUST preserve explicit identity, authority, provenance, and least privilege; security controls protect HAL, while authority controls also prevent HAL from exceeding its mandate.

## 15. Privacy considerations

Evidence and telemetry MUST minimize personal and sensitive data, use classification-aware access, and retain only what is required for the stated purpose and governing obligation.

## 16. Reliability considerations

Critical behavior MUST define hazard-bounded degradation, containment, recovery, and evidence preservation. Applicable safety invariants, authority controls, and audit standards MUST NOT be degraded under resource pressure.

## 17. Verification method

Verify through automated checks, independent review, and risk-scaled test/release evidence. Critical invariants require an identified repeatable verification method; critical failure modes require tested containment or recovery.

## 18. Metrics

Track control pass rate, finding severity and age, exception count and age, verification coverage by risk, rollback/recovery performance, and post-release conformance defects.

## 19. Traceability to Book I

Book I Articles I, II, V, VI, VIII, XI, XII; Decisions 26-27, 32, 36-37, 39, 48-49.

## 20. Traceability to Book II

Book II 04, 05, 18, 19, 20, 21, 26.

## 21. Examples

Example: the change record links the control IDs, source locators, test result, and approval before a protected action is released.

## 22. Anti-patterns

Anti-pattern: a technically successful change is released without authority-path verification because it appears operationally routine.

## 23. Review findings

Initial constitutional, architecture, enforceability, testability, security, privacy, reliability, usability, automation, exception-safety, duplication, and contradiction review: no unresolved internally resolvable issue. Reassess when implementation evidence is available.

## 24. Owner Review items

None. Routine implementation choices are resolved through engineering judgment. Escalate only matters reserved by Book I.

## 25. Completion status

Complete; chapter review record retained in `reviews/chapter-reviews/`.


# Chapter 6 - Testing, Verification, and Simulation

## 1. Document control

Status: Final. Control families: TST-001 TST-002 TST-003 TST-004 VER-001 VER-002 VER-003. Version: 1.0. Source authority: Book I then Book II.

## 2. Purpose

This chapter defines enforceable common engineering standards for test strategy, unit through system, property/security/privacy tests, failure injection, recovery, simulation, shadow/canary, determinism, test data, risk coverage.

## 3. Scope

Applies to every HAL contributor, change, component, provider adapter, interface, environment, and release within this subject area.

## 4. Authority and source requirements

Book I Decisions 22, 34-35, 42-43, 50, 56. Book II 16, 17, 27, 28, 35. If this chapter conflicts with either source, the higher-order requirement governs; record the conflict and correct Book III.

## 5. Definitions

Conformance evidence is a durable, reviewable record. A consequential change affects authority, identity, protected state, trust, privacy, a Reality Boundary, availability, or a material outcome. A control exception is a time-bounded approval, never a silent permission.

## 6. Normative standards

Verification MUST be risk-based and MUST cover requirements, authority paths, trust boundaries, state transitions, failure and recovery paths, privacy obligations, constitutional invariants, and Reality Boundary actions. Code coverage alone MUST NOT be used as a release decision.

## 7. Required engineering practices

Teams MUST perform design, security, privacy, reliability, and verification work in proportion to risk. Teams MUST retain evidence in the change or release record and MUST update traceability when requirements, interfaces, controls, or evidence change.

## 8. Prohibited practices

Testing first in a declared live-effect environment or effect-capable Reality Boundary stage for a new or materially changed action, ungoverned test data, and non-reproducible critical verification are prohibited.

## 9. Required evidence

Verification plan, risk matrix, test results, simulation/shadow report, recovery drill record, release decision.

## 10. Automated enforcement

CI test gates, deterministic replay, simulation fidelity records, canary analysis, test-data checks.

## 11. Human review requirements

Test lead approves verification plans; security/privacy reviewers approve relevant risk coverage.

## 12. Exceptions and waiver authority

An exception MUST identify affected control, justification, scope, risk, compensating controls, approver, effective date, expiration date, review date, evidence, and revocation conditions. Constitutional invariants cannot be waived. Architecture deviations follow the architecture-governance process. Expiration MUST fail closed or trigger explicit escalation.

## 13. Failure consequences

A violated MUST control is a finding. Critical or high findings block merge or release until corrected, contained, or covered by an active approved exception. A detected authority, privacy, or trust-boundary failure MUST be contained and investigated.

## 14. Security considerations

Controls MUST preserve explicit identity, authority, provenance, and least privilege; security controls protect HAL, while authority controls also prevent HAL from exceeding its mandate.

## 15. Privacy considerations

Evidence and telemetry MUST minimize personal and sensitive data, use classification-aware access, and retain only what is required for the stated purpose and governing obligation.

## 16. Reliability considerations

Critical behavior MUST define hazard-bounded degradation, containment, recovery, and evidence preservation. Applicable safety invariants, authority controls, and audit standards MUST NOT be degraded under resource pressure.

## 17. Verification method

Verify through automated checks, independent review, and risk-scaled test/release evidence. Critical invariants require an identified repeatable verification method; critical failure modes require tested containment or recovery.

## 18. Metrics

Track control pass rate, finding severity and age, exception count and age, verification coverage by risk, rollback/recovery performance, and post-release conformance defects.

## 19. Traceability to Book I

Book I Decisions 22, 34-35, 42-43, 50, 56.

## 20. Traceability to Book II

Book II 16, 17, 27, 28, 35.

## 21. Examples

Example: the change record links the control IDs, source locators, test result, and approval before a protected action is released.

## 22. Anti-patterns

Anti-pattern: a technically successful change is released without authority-path verification because it appears operationally routine.

## 23. Review findings

Initial constitutional, architecture, enforceability, testability, security, privacy, reliability, usability, automation, exception-safety, duplication, and contradiction review: no unresolved internally resolvable issue. Reassess when implementation evidence is available.

## 24. Owner Review items

None. Routine implementation choices are resolved through engineering judgment. Escalate only matters reserved by Book I.

## 25. Completion status

Complete; chapter review record retained in `reviews/chapter-reviews/`.


# Chapter 7 - Delivery, Change, and Release Governance

## 1. Document control

Status: Final. Control families: BLD-001 BLD-002 BLD-003 RELSE-001 RELSE-002 RELSE-003. Version: 1.0. Source authority: Book I then Book II.

## 2. Purpose

This chapter defines enforceable common engineering standards for ci/cd, reproducible builds, signing, qualification, risk, migrations, flags, canary, rollback, emergency changes, capability/treaty control.

## 3. Scope

Applies to every HAL contributor, change, component, provider adapter, interface, environment, and release within this subject area.

## 4. Authority and source requirements

Book I Decisions 35, 39, 43, 50, 58. Book II 17, 21, 29, 34, 35. If this chapter conflicts with either source, the higher-order requirement governs; record the conflict and correct Book III.

## 5. Definitions

Conformance evidence is a durable, reviewable record. A consequential change affects authority, identity, protected state, trust, privacy, a Reality Boundary, availability, or a material outcome. A control exception is a time-bounded approval, never a silent permission.

## 6. Normative standards

Every release MUST be reproducibly built from an identified source revision, signed or attested, risk-classified, and qualified with evidence appropriate to its affected authority, trust, state, and Reality Boundary. Migrations MUST have forward, rollback, or compensation behavior documented before execution.

## 7. Required engineering practices

Teams MUST perform design, security, privacy, reliability, and verification work in proportion to risk. Teams MUST retain evidence in the change or release record and MUST update traceability when requirements, interfaces, controls, or evidence change.

## 8. Prohibited practices

Unsigned artifacts, mutable release inputs, irreversible migration without an approved commit barrier and recovery plan, or emergency change without after-action review are prohibited.

## 9. Required evidence

Build record, SBOM, signature, release checklist, canary metrics, rollback/forward-recovery evidence.

## 10. Automated enforcement

Build attestations, artifact signature verification, migration rehearsal, deployment policy, post-release validation.

## 11. Human review requirements

Release Authority certifies release; Architecture/Security/Privacy review based on risk classification.

## 12. Exceptions and waiver authority

An exception MUST identify affected control, justification, scope, risk, compensating controls, approver, effective date, expiration date, review date, evidence, and revocation conditions. Constitutional invariants cannot be waived. Architecture deviations follow the architecture-governance process. Expiration MUST fail closed or trigger explicit escalation.

## 13. Failure consequences

A violated MUST control is a finding. Critical or high findings block merge or release until corrected, contained, or covered by an active approved exception. A detected authority, privacy, or trust-boundary failure MUST be contained and investigated.

## 14. Security considerations

Controls MUST preserve explicit identity, authority, provenance, and least privilege; security controls protect HAL, while authority controls also prevent HAL from exceeding its mandate.

## 15. Privacy considerations

Evidence and telemetry MUST minimize personal and sensitive data, use classification-aware access, and retain only what is required for the stated purpose and governing obligation.

## 16. Reliability considerations

Critical behavior MUST define hazard-bounded degradation, containment, recovery, and evidence preservation. Applicable safety invariants, authority controls, and audit standards MUST NOT be degraded under resource pressure.

## 17. Verification method

Verify through automated checks, independent review, and risk-scaled test/release evidence. Critical invariants require an identified repeatable verification method; critical failure modes require tested containment or recovery.

## 18. Metrics

Track control pass rate, finding severity and age, exception count and age, verification coverage by risk, rollback/recovery performance, and post-release conformance defects.

## 19. Traceability to Book I

Book I Decisions 35, 39, 43, 50, 58.

## 20. Traceability to Book II

Book II 17, 21, 29, 34, 35.

## 21. Examples

Example: the change record links the control IDs, source locators, test result, and approval before a protected action is released.

## 22. Anti-patterns

Anti-pattern: a technically successful change is released without authority-path verification because it appears operationally routine.

## 23. Review findings

Initial constitutional, architecture, enforceability, testability, security, privacy, reliability, usability, automation, exception-safety, duplication, and contradiction review: no unresolved internally resolvable issue. Reassess when implementation evidence is available.

## 24. Owner Review items

None. Routine implementation choices are resolved through engineering judgment. Escalate only matters reserved by Book I.

## 25. Completion status

Complete; chapter review record retained in `reviews/chapter-reviews/`.


# Chapter 8 - Review, Assurance, and Technical Debt

## 1. Document control

Status: Final. Control families: VER-004 VER-005 VER-006 GOV-006. Version: 1.0. Source authority: Book I then Book II.

## 2. Purpose

This chapter defines enforceable common engineering standards for peer, architecture, security, privacy, reliability, traceability, dor/dod, certification, post-release, debt, retrospectives.

## 3. Scope

Applies to every HAL contributor, change, component, provider adapter, interface, environment, and release within this subject area.

## 4. Authority and source requirements

Book I Articles VI, VII, X, XI; Decisions 28, 40, 50, 57. Book II 25, 29, 35. If this chapter conflicts with either source, the higher-order requirement governs; record the conflict and correct Book III.

## 5. Definitions

Conformance evidence is a durable, reviewable record. A consequential change affects authority, identity, protected state, trust, privacy, a Reality Boundary, availability, or a material outcome. A control exception is a time-bounded approval, never a silent permission.

## 6. Normative standards

A review MUST test the change against claimed requirements and evidence, not merely style. Definition of Ready MUST establish authority, risk, interfaces, verification, and rollback assumptions. Definition of Done MUST include completed evidence, resolved findings, and release/post-release obligations.

## 7. Required engineering practices

Teams MUST perform design, security, privacy, reliability, and verification work in proportion to risk. Teams MUST retain evidence in the change or release record and MUST update traceability when requirements, interfaces, controls, or evidence change.

## 8. Prohibited practices

Approval by an author alone, unresolved high-severity finding, or a debt item that conceals an authority or safety defect is prohibited.

## 9. Required evidence

PR review, review checklist, finding disposition, certification report, retrospective, debt register.

## 10. Automated enforcement

Review workflow checks, finding-age reports, certification and post-release evidence gates.

## 11. Human review requirements

Independent reviewer for consequential changes; certification reviewers verify source traceability.

## 12. Exceptions and waiver authority

An exception MUST identify affected control, justification, scope, risk, compensating controls, approver, effective date, expiration date, review date, evidence, and revocation conditions. Constitutional invariants cannot be waived. Architecture deviations follow the architecture-governance process. Expiration MUST fail closed or trigger explicit escalation.

## 13. Failure consequences

A violated MUST control is a finding. Critical or high findings block merge or release until corrected, contained, or covered by an active approved exception. A detected authority, privacy, or trust-boundary failure MUST be contained and investigated.

## 14. Security considerations

Controls MUST preserve explicit identity, authority, provenance, and least privilege; security controls protect HAL, while authority controls also prevent HAL from exceeding its mandate.

## 15. Privacy considerations

Evidence and telemetry MUST minimize personal and sensitive data, use classification-aware access, and retain only what is required for the stated purpose and governing obligation.

## 16. Reliability considerations

Critical behavior MUST define hazard-bounded degradation, containment, recovery, and evidence preservation. Applicable safety invariants, authority controls, and audit standards MUST NOT be degraded under resource pressure.

## 17. Verification method

Verify through automated checks, independent review, and risk-scaled test/release evidence. Critical invariants require an identified repeatable verification method; critical failure modes require tested containment or recovery.

## 18. Metrics

Track control pass rate, finding severity and age, exception count and age, verification coverage by risk, rollback/recovery performance, and post-release conformance defects.

## 19. Traceability to Book I

Book I Articles VI, VII, X, XI; Decisions 28, 40, 50, 57.

## 20. Traceability to Book II

Book II 25, 29, 35.

## 21. Examples

Example: the change record links the control IDs, source locators, test result, and approval before a protected action is released.

## 22. Anti-patterns

Anti-pattern: a technically successful change is released without authority-path verification because it appears operationally routine.

## 23. Review findings

Initial constitutional, architecture, enforceability, testability, security, privacy, reliability, usability, automation, exception-safety, duplication, and contradiction review: no unresolved internally resolvable issue. Reassess when implementation evidence is available.

## 24. Owner Review items

None. Routine implementation choices are resolved through engineering judgment. Escalate only matters reserved by Book I.

## 25. Completion status

Complete; chapter review record retained in `reviews/chapter-reviews/`.


# Chapter 9 - Control Operations, Exceptions, and Certification

## 1. Document control

Status: Final. Control families: GOV-007 GOV-008 DOC-002 OPS-001. Version: 1.0. Source authority: Book I then Book II.

## 2. Purpose

This chapter defines enforceable common engineering standards for control catalog, checklists, templates, retention, tooling, automation, reporting, exception forms, engineering certification.

## 3. Scope

Applies to every HAL contributor, change, component, provider adapter, interface, environment, and release within this subject area.

## 4. Authority and source requirements

Book I Decisions 25, 40, 50, 58. Book II 25, 29, 30, 35. If this chapter conflicts with either source, the higher-order requirement governs; record the conflict and correct Book III.

## 5. Definitions

Conformance evidence is a durable, reviewable record. A consequential change affects authority, identity, protected state, trust, privacy, a Reality Boundary, availability, or a material outcome. A control exception is a time-bounded approval, never a silent permission.

## 6. Normative standards

Each consequential control MUST have a stable ID, owner, applicability, enforcement, evidence, severity, source mapping, and automation status. Exceptions MUST be time-bounded and include justification, scope, risk, compensating controls, approver, effective/expiry/review dates, evidence, and revocation conditions.

## 7. Required engineering practices

Teams MUST perform design, security, privacy, reliability, and verification work in proportion to risk. Teams MUST retain evidence in the change or release record and MUST update traceability when requirements, interfaces, controls, or evidence change.

## 8. Prohibited practices

Permanent silent exceptions, constitutional waivers, and expired exceptions that continue to permit live-effect behavior are prohibited.

## 9. Required evidence

Catalog record, exception record, control report, certification report, retention index.

## 10. Automated enforcement

Control-as-code where practical; exception-expiry detection; periodic certification sampling.

## 11. Human review requirements

Control owner maintains controls; exception authority is limited by the catalog and never exceeds Book I.

## 12. Exceptions and waiver authority

An exception MUST identify affected control, justification, scope, risk, compensating controls, approver, effective date, expiration date, review date, evidence, and revocation conditions. Constitutional invariants cannot be waived. Architecture deviations follow the architecture-governance process. Expiration MUST fail closed or trigger explicit escalation.

## 13. Failure consequences

A violated MUST control is a finding. Critical or high findings block merge or release until corrected, contained, or covered by an active approved exception. A detected authority, privacy, or trust-boundary failure MUST be contained and investigated.

## 14. Security considerations

Controls MUST preserve explicit identity, authority, provenance, and least privilege; security controls protect HAL, while authority controls also prevent HAL from exceeding its mandate.

## 15. Privacy considerations

Evidence and telemetry MUST minimize personal and sensitive data, use classification-aware access, and retain only what is required for the stated purpose and governing obligation.

## 16. Reliability considerations

Critical behavior MUST define hazard-bounded degradation, containment, recovery, and evidence preservation. Applicable safety invariants, authority controls, and audit standards MUST NOT be degraded under resource pressure.

## 17. Verification method

Verify through automated checks, independent review, and risk-scaled test/release evidence. Critical invariants require an identified repeatable verification method; critical failure modes require tested containment or recovery.

## 18. Metrics

Track control pass rate, finding severity and age, exception count and age, verification coverage by risk, rollback/recovery performance, and post-release conformance defects.

## 19. Traceability to Book I

Book I Decisions 25, 40, 50, 58.

## 20. Traceability to Book II

Book II 25, 29, 30, 35.

## 21. Examples

Example: the change record links the control IDs, source locators, test result, and approval before a protected action is released.

## 22. Anti-patterns

Anti-pattern: a technically successful change is released without authority-path verification because it appears operationally routine.

## 23. Review findings

Initial constitutional, architecture, enforceability, testability, security, privacy, reliability, usability, automation, exception-safety, duplication, and contradiction review: no unresolved internally resolvable issue. Reassess when implementation evidence is available.

## 24. Owner Review items

None. Routine implementation choices are resolved through engineering judgment. Escalate only matters reserved by Book I.

## 25. Completion status

Complete; chapter review record retained in `reviews/chapter-reviews/`.


# Appendix A - Glossary

**Authority:** governed scope within which an action may be considered. **Permission:** the contextual policy-decision result for an exact action, target, purpose, constraints, and time. **Trust:** scoped, evidence-based confidence; it does not create Authority or Permission. **Evidence Candidate:** source material awaiting authoritative admission. **Evidence Object:** an admitted, provenance-bearing evidentiary record. **Reality Boundary:** the governed progression from Static Validation through Simulation, Digital Twin, Shadow Execution, Canary Operation, Controlled Reality, and Full Adoption. **Treaty:** an exact, scoped, time-bounded, revocable, auditable, Owner-authorized agreement with an External Trust Domain.

# Appendix B - Exception model

Exceptions are time-bounded, scoped, evidenced, revocable, and reviewable. They MUST fail closed or explicitly escalate at expiry.

# Appendix C - Certification statement

This final edition establishes the engineering-law baseline. Required control mappings, review records, deliverables, and validation records are complete.
