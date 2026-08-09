# Decision Record 0026 — Real Hermes Local-Only Reference Runtime Pilot

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | GX10-1 disposable local-only Reference Runtime pilot |
| Owner Review | Explicit Owner authorization |

## Decision

Advance from DR 0025 design/conformance into a minimal real Hermes integration
pilot. The pilot may run the already installed Hermes runtime in its existing
isolated container against the already installed local Ollama `qwen3:8b`
model, only through a HAL-owned, binding-gated Unix-socket mediator.

## Boundaries

- HAL retains work admission, identity, authority, policy, evidence custody,
  lifecycle, recovery, and resource governance.
- Hermes receives zero HAL capabilities. It receives no governed filesystem,
  shell, secret, node, NAS, home-automation, external-provider, or network
  egress access.
- The Hermes container remains network-none, read-only, capability-dropped,
  no-new-privileges, and disposable. It may reach only the adapter-private
  loopback relay that forwards to the HAL-owned Unix socket.
- The mediator fixes the model profile to local `qwen3:8b`, accepts only
  bounded text chat requests bearing an exact, expiring HAL binding, and has a
  four-request inference budget. It is not a general model proxy.
- Runtime outputs remain non-canonical runtime claims. This pilot does not
  accept canonical knowledge, authorize actions, or enable production use.

## Consequences

DR 0025 remains the governing design/conformance record. This decision
supersedes only its prohibition on the specifically bounded real Hermes and
local-model execution described here. It does not authorize a resource
capability, a general mediation service, production deployment, or a direct
Hermes dependency in HAL Core.

## Evidence and Exit Criteria

The pilot must record containment settings, mediated request count, local
model outcome, teardown, and any compatibility limitation without retaining
runtime memory as HAL knowledge. Before a usable assistant or any broader
integration, HAL must separately establish adapter result/evidence custody and
resolve Hermes/provider compatibility under the same containment posture.

## Authoritative Sources

Book I remains supreme. Book II runtime sovereignty and Capability Gateway
sections, Book III standards, DR 0017–0020, DR 0025, and the Book II targeted
review record apply.
