# Decision Record 0004 — Hermes Latest Evaluation Source Pin

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-08-09 |
| Scope | Read-only source preflight for a future synthetic Hermes evaluation |
| Owner Review | Required and approved by the Owner on 2026-08-09 |

## Decision

The Owner supersedes DR 0003 and authorizes the latest official Hermes release current on 2026-08-09 as the evaluation candidate: Nous Research `hermes-agent` annotated tag `v2026.8.3`, peeled commit `3c27eb6234bf91b8ceee9e9071591b31e9b148cb`. The tag object is `7de39e700d2c329e15d32eb0b96e2f7cdd9fbdb2`.

This authorizes read-only source preflight only. It does not authorize installation, execution, process launch, model/provider configuration, network use by Hermes, tools, credentials, secrets, resource access, state adoption, or production integration.

On 2026-08-09, the Owner additionally authorized one bounded **source-acquisition** phase on the GX10-1 `hal_eval` identity: fetch only the exact pinned official Git tag/commit into an isolated acquisition directory, verify the resolved commit, and record provenance. The fetch must use no checkout, build, dependency installation, image pull, import, or execution. It is not authorization for network use by Hermes, a container image, a container, or runtime activation.

## Context

The Owner requested the latest official version after DR 0003 selected v0.18.2. “Latest” is resolved here to an immutable tag and commit at the time of approval, rather than treated as a mutable branch or standing update authorization.

## Authoritative Sources

Higher-order sources prevail over this record.

- Book I supremacy and authority/evidence/recovery invariants.
- Book II Chapter 2 §§3.1–3.2; Chapter 15; Chapter 29; Chapter 35.
- Book III Chapters 1, 3, 5, 6, 7, and 9.
- DR 0001 and DR 0002.

## Consequences

- The prior v0.18.2 evaluation pin and its source preflight are historical only.
- Review work is reproducible against the current fixed upstream commit.
- The source remains an untrusted, replaceable provider and receives no HAL authority.

## Implementation Implications

- A temporary, read-only clone may be inspected for source-preflight findings.
- No code in HAL Core may import or depend on the cloned source.
- No Hermes artifact may be placed in the HAL repository, installed on the host, or run under this decision.

## Owner Review Assessment

Required because this selects a specific external runtime source. The Owner approved the latest official version on 2026-08-09. This is not a constitutional amendment.

## Continuity Notes

Replace the prior preflight findings with findings for this pin before requesting authorization for any synthetic isolated execution environment.
