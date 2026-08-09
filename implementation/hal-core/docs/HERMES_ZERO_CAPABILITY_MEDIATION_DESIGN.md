# Hermes Zero-Capability Mediation Design

## Status

Design and conformance artifact authorized by DR 0025 and the bounded real
pilot authorized by DR 0026. It is not a production integration, activation
plan, or resource-access grant.

## Objective

Define a HAL-owned mediation component for a small, fixed number of bounded
local Qwen3 inference requests issued by a zero-capability Hermes adapter path
on GX10-1.

## Required Boundary

`Hermes adapter -> HAL-issued binding -> HAL-owned mediator -> fixed local-model profile -> non-canonical result claim`

The adapter may request execution but receives no filesystem, shell, network, secret, node, capability, credential, or model-runtime handle. HAL alone issues, binds, revokes, expires, records, and classifies the request.

## Binding Requirements

Each binding MUST be time-bounded and bind runtime, adapter, agent, task,
correlation, approved fixed profile, evidence reference, request limits, and
cancellation state. The pilot permits only a small fixed inference-turn budget
because a runtime may need more than one internal reasoning turn. A mismatch,
budget exhaustion, expiry, malformed request, or attempt to request a
capability MUST fail before any upstream contact.

## Fixed Pilot Profile

- Model: local `qwen3:8b` only.
- Data: synthetic text only.
- Capabilities: none.
- Network: no egress and no runtime listener.
- Input/output: fixed bounded synthetic prompt and response limits.
- Result: an integrity-linked `unaccepted_runtime_claim`, never canonical knowledge, evidence acceptance, authority, permission, or outcome.

## Verified Stateless Execution Slice

The adapter-private `hal_hermes_stateless_runner.py` invokes Hermes's built-in
stateless inference component only. In the DR 0026 containment profile it
returned the fixed synthetic `HAL_LOCAL_OK` result through the HAL-issued
binding, the HAL-owned mediator, and local Ollama `qwen3:8b`. The associated
`HermesStatelessDriver` accepts only an empty capability manifest and reports
its output through HAL callback custody. This is not evidence that the full
Hermes CLI agent loop is compatible with this provider, and it does not make
the runtime output canonical knowledge.

## Conformance Evidence Required Before or During the DR 0026 GX10 Pilot

1. HAL-only issue/revoke/expiry/replay tests.
2. Adapter cannot forge a binding or alter its profile.
3. Every request without the exact binding fails closed before upstream contact.
4. Any capability-like request fails closed.
5. Result/failure/cancellation claims remain HAL-custodied and non-canonical.
6. Static checks prove no Hermes, model, filesystem, shell, secret, network, or resource handle enters HAL Core outside the adapter-private test seam.
7. The DR 0026 GX10 run uses the existing rootless, network-none posture and verifies teardown.

## Explicit Non-Goals

No general direct model proxy or unbounded prompt service, raw runtime access
to Ollama, external provider, governed resource, or production deployment is
authorized by this design. Under DR 0026's Owner clarification, bounded
text-only local questions are permitted only through the DR 0027 restricted
transport and its fixed containment profile; this does not authorize the full
Hermes CLI loop or any runtime capability.
