# Decision Record 0003 — Hermes Evaluation Source Pin

| Field | Value |
| --- | --- |
| Status | Superseded by DR 0004 |
| Date | 2026-08-09 |
| Scope | Read-only source preflight for a future synthetic Hermes evaluation |
| Owner Review | Required and approved by the Owner on 2026-08-09 |

## Decision

The future Hermes evaluation candidate is pinned to the official Nous Research repository `https://github.com/NousResearch/hermes-agent.git`, annotated tag `v2026.7.7.2` (Hermes Agent v0.18.2), peeled commit `9de9c25f620ff7f1ce0fd5457d596052d5159596`. The tag object is `b7751df34688835a108e0d630f3495fc11f3df79`.

This authorizes read-only source preflight only. It does not authorize installation, execution, process launch, model/provider configuration, network use by Hermes, tools, credentials, secrets, resource access, state adoption, or production integration.

## Context

Owner approval was required to select an immutable external runtime source and a bounded evaluation direction. The tag and commit were resolved through a read-only remote reference lookup. Independent Book II review evidence remains required before a formal certification claim; this decision does not waive it.

## Authoritative Sources

Higher-order sources prevail over this record.

- Book I supremacy and authority/evidence/recovery invariants.
- Book II Chapter 2 §§3.1–3.2; Chapter 15; Chapter 29; Chapter 35.
- Book III Chapters 1, 3, 5, 6, 7, and 9.
- [DR 0001](0001-agent-runtime-sovereignty-and-replaceability.md) and [DR 0002](0002-runtime-contract-durable-record-model.md).

## Consequences

- Review work is reproducible against a fixed upstream commit.
- The selected source remains an untrusted, replaceable provider and receives no HAL authority.
- Any actual evaluation still requires the readiness-plan gates, including a least-privilege environment and separate authorization for installation/execution.

## Implementation Implications

- A temporary, read-only clone may be inspected for provenance, dependency, default-tool, state-location, network, and removal risks.
- No code in HAL Core may import or depend on the cloned source.
- No Hermes artifact may be placed in the HAL repository, installed on the host, or run under this decision.

## Owner Review Assessment

Required because this selects a specific external runtime source. The Owner approved the recommended `v0.18.2` candidate on 2026-08-09. This is not a constitutional amendment.

## Continuity Notes

Superseded because the Owner authorized use of the latest release. Retained as the history of the prior v0.18.2 read-only preflight. See DR 0004 for the current source pin.
