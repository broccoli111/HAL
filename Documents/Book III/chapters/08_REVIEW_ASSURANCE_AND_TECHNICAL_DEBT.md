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
