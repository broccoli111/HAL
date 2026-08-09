# Hermes Zero-Capability Mediation Design

## Status

Design and conformance artifact authorized by DR 0025. It is not a production integration, activation plan, or resource-access grant.

## Objective

Define a HAL-owned mediation component for one bounded local Qwen3 inference request issued by a zero-capability Hermes adapter path on GX10-1.

## Required Boundary

`Hermes adapter -> HAL-issued binding -> HAL-owned mediator -> fixed local-model profile -> non-canonical result claim`

The adapter may request execution but receives no filesystem, shell, network, secret, node, capability, credential, or model-runtime handle. HAL alone issues, binds, revokes, expires, records, and classifies the request.

## Binding Requirements

Each binding MUST be one-use, time-bounded, and bind runtime, adapter, agent, task, correlation, approved fixed profile, evidence reference, request limits, and cancellation state. A mismatch, replay, expiry, malformed request, or attempt to request a capability MUST fail before any upstream contact.

## Fixed Pilot Profile

- Model: local `qwen3:8b` only.
- Data: synthetic text only.
- Capabilities: none.
- Network: no egress and no runtime listener.
- Input/output: fixed bounded synthetic prompt and response limits.
- Result: an integrity-linked `unaccepted_runtime_claim`, never canonical knowledge, evidence acceptance, authority, permission, or outcome.

## Conformance Evidence Required Before Any GX10 Execution

1. HAL-only issue/revoke/expiry/replay tests.
2. Adapter cannot forge a binding or alter its profile.
3. Every request without the exact binding fails closed before upstream contact.
4. Any capability-like request fails closed.
5. Result/failure/cancellation claims remain HAL-custodied and non-canonical.
6. Static checks prove no Hermes, model, filesystem, shell, secret, network, or resource handle enters HAL Core outside the adapter-private test seam.
7. A separately approved GX10 run, if later authorized, uses the existing rootless, network-none posture and verifies teardown.

## Explicit Non-Goals

No real mediation activation, raw Ollama access, general prompt support, production Hermes process, external provider, governed resource, or production deployment is authorized by this design.
