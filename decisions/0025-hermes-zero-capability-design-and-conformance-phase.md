# Decision Record 0025 — Hermes Zero-Capability Design and Conformance Phase

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | Local-only design and conformance work on GX10-1 |
| Owner Review | Explicit Owner authorization |

## Decision

Authorize a Hermes integration design-and-conformance phase only: define and test a HAL-owned mediation component and a zero-capability Hermes adapter path using local-only Qwen3 on GX10-1.

## Boundaries

No governed resources, secrets, filesystem, shell, network egress, external providers, production deployment, or production scheduling are authorized. HAL remains the owner of identity, authority, policy, evidence, lifecycle, recovery, resource access, and work admission/placement. Hermes may request no capability and may not grant itself authority.

## Authoritative Sources

Book I remains supreme. Book II runtime-sovereignty architecture, Book III assurance controls, DR 0001, DR 0013–0020, and the Book II targeted review record govern this phase.

## Consequences

The phase may create synthetic, disposable, zero-capability conformance evidence only. It must fail closed on any route toward a governed resource, credential, external provider, network egress, or production use. A real mediation activation, resource capability, or production Hermes path requires a separate Owner decision and applicable review.
