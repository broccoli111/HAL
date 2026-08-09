# Decision Record 0011 — Production Runtime Integration Design Phase

| Field | Value |
| --- | --- |
| Status | Accepted, design and conformance planning only |
| Date | 2026-08-09 |
| Scope | Future Hermes Reference Runtime v1 production-integration design; no activation or implementation |
| Owner Review | Explicit Owner approval: Option 2, 2026-08-09 |

## Decision

HAL may begin a bounded design and conformance-planning phase for a future production Hermes integration. This approval permits architecture-facing design artifacts, threat analysis, acceptance gates, and implementation sequencing only.

It does not authorize Hermes installation, activation, connection, execution, a real driver or transport, a model provider, a credential, a secret, a real capability, a governed resource, a network path, or a production deployment.

## Authoritative Basis

- Book I Decisions 1, 5, 10, 16, 25, 27, 30, 35–40, 43, 48–49, 51, and 58.
- Book II Chapter 2 §§3.1–3.2, Chapter 15, Chapter 16, Chapter 28, Chapter 29, and Chapter 35.
- Book III Chapters 3, 5, 6, and 9.
- [DR 0001](0001-agent-runtime-sovereignty-and-replaceability.md), [DR 0002](0002-runtime-contract-durable-record-model.md), [DR 0008](0008-test-only-hermes-line-driver.md), and [DR 0010](0010-owner-authorized-independent-review-control-exception.md).

## Consequences

- HAL Core remains dependent only on the Agent Runtime Contract; Hermes-specific design remains contained at the adapter edge.
- The existing `HermesLineDriver` and GX10 harness are test-only evidence and MUST NOT be promoted to production by this decision.
- The design package MUST preserve HAL ownership of admission, placement, identity, authority, policy, evidence, lifecycle, recovery, and governed-resource access.
- A later activation or implementation decision must identify the concrete boundary, trust assumptions, allowed operations, secrets/credential posture, resource scope, rollback plan, verification evidence, and accountable HAL component.

## Alternatives Considered

- **Remain in test-only verification until independent recertification.** Retains the smallest scope but defers preparation work.
- **Begin design and conformance planning without activation.** Selected; it advances readiness while preserving all current operational prohibitions.
- **Begin production Hermes implementation or activation.** Rejected; it would cross explicit current out-of-scope boundaries and require a separately scoped Owner decision.

## Revocation and Fail-Closed Conditions

This decision is limited to non-executing design work. Any attempt to install, execute, connect, grant, expose, or route a real runtime capability is outside scope and must fail closed pending a separate Owner decision. A discovered conflict with Book I or Book II immediately suspends design conclusions until resolved under the applicable governance process.
