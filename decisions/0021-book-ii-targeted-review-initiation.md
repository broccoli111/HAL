# Decision Record 0021 — Book II Targeted Review Initiation

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | Initiation of the existing targeted independent review for the Book II runtime-sovereignty clarification |
| Owner Review | Explicit Owner approval |

## Decision

Initiate the targeted Book II runtime-sovereignty review using the existing recertification handoff and reviewer disposition template. The review must assess the stated Book I/II/III compatibility and test-only evidence scope.

## Boundary

This authorization initiates review; it is not the independent review itself, a reviewer attestation, Book II recertification, a constitutional amendment, or production authorization. The reviewer must independently supply identity, role, scope, evidence reviewed, findings, disposition, review/expiry date, and durable attestation in the repository record.

## Authority and Evidence

- [Engineering Exception 0010](0010-owner-authorized-independent-review-control-exception.md)
- [Book II Runtime-Sovereignty Recertification Handoff](../tests/agent_runtime_contract/RECERTIFICATION_HANDOFF.md)
- [Reviewer Disposition Template](../tests/agent_runtime_contract/RECERTIFICATION_DISPOSITION_TEMPLATE.md)

## Consequences

Until the completed independent disposition is stored, the Book II working edition remains explicitly unrecertified. Engineering Exception 0010 expires on 2026-08-16 and then fails closed at the independent-review gate.
