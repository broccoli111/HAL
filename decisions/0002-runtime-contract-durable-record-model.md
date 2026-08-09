# Decision Record 0002 — Runtime Contract Durable Record Model

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-08-09 |
| Scope | Test-only local Agent Runtime boundary |
| Owner Review | Required and approved by the Owner on 2026-08-09 |

## Decision

HAL will retain a narrow, durable operational record for Agent Runtime capability requests, HAL Gateway dispositions, and runtime evidence/progress/result/failure submissions. The model is synthetic-only and deny-by-default. It does not create a general capability class, a resource provider, canonical knowledge, a new authorization path, or a Hermes connection.

## Context

The implemented Runtime Host can already own lifecycle and callback custody, but callback claims need attributable, correlated, recoverable HAL-side evidence before the boundary can mature. The Owner approved the limited record model after it was identified as a major contract boundary.

## Authoritative Sources

Higher-order sources prevail over this record.

- Book I decisions governing authority, immutable evidence, recovery, and bounded delegation.
- Book II Chapter 2 §§3.1–3.2; Chapter 15 Capability Gateway Boundary; Chapters 25, 29, and 35.
- Book III Chapters 1, 3, 4, 5, 6, and 9.
- [DR 0001](0001-agent-runtime-sovereignty-and-replaceability.md).

## Alternatives Considered

- **Keep runtime reports in process memory only.** Rejected: it does not provide recoverable HAL-side attribution.
- **Promote runtime reports directly to canonical knowledge or completed outcomes.** Rejected: it conflicts with runtime-memory sovereignty and Evidence Graph governance.
- **Add a general resource capability/provider.** Rejected: it would exceed this decision and require separate capability and policy work.

## Consequences

- Runtime claims and Gateway dispositions may be retained as integrity-chained operational records.
- A runtime report remains a claim until a governed HAL evidence/knowledge process accepts it.
- The sole permitted capability remains the existing local M3 synthetic inspection capability; all other requests are denied.
- Replacing or losing a runtime does not remove HAL-side records.

## Implementation Implications

- Implement a local, explicit-path journal owned by HAL-side runtime-boundary code.
- Record correlation, runtime, agent, task, record kind, disposition where applicable, and non-sensitive summary/provenance only.
- Do not record raw secrets, runtime memory, credentials, resource handles, or real-world effects.
- Do not connect Hermes, add a package, process, transport, or external resource access.

## Owner Review Assessment

Required because the work introduces a major runtime-boundary record contract. The Owner approved the recommended narrow model on 2026-08-09. No constitutional amendment is made.

## Continuity Notes

The next work is implementation and deterministic verification of the local journal, followed by scoped Book II recertification evidence and a separate Owner-reviewed plan before any actual Hermes connection.
