# Decision Record 0020 — Bounded Positive Local Inference Mediation Test

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | CT-008: one disposable, synthetic-only Qwen3 request through a HAL-issued test binding |
| Owner Review | Explicit Owner approval |

## Decision

Authorize one bounded positive local-inference mediation test after DR 0019 passed. A disposable synthetic client may make exactly one request through a private Unix-socket mediator using a HAL-issued, one-use binding. The mediator must validate the exact runtime, adapter, agent, task, correlation, binding nonce, profile, and synthetic prompt before it contacts the fixed local Ollama loopback service.

## Fixed Scope

- Existing approved local model only: `qwen3:8b` through loopback-bound Ollama on GX10-1.
- One synthetic prompt and one bounded non-streaming response; immediate model unload.
- No Hermes process, real data, external provider, LAN/internet/DNS, tool, capability, secret, filesystem/resource access, host networking, GPU/device passthrough, public listener, or production route.
- Binding and route are one-use and must be removed on completion, denial, failure, cancellation, or timeout.
- Model output is a non-canonical runtime claim, never canonical knowledge or authority.

## Preconditions and Stop Conditions

DR 0019 evidence must remain valid. A binding mismatch, replay, expiry, unexpected profile/prompt, missing correlated evidence, non-local upstream, external route, cleanup failure, or any result beyond the fixed scope fails closed and terminates the test. The no-connection state must be restored and verified.

## Consequences

This decision is a single synthetic test authorization, not model-provider activation, runtime integration, Hermes authorization, capability approval, or production readiness. Any further positive request requires a new Owner decision.

## Evidence

CT-008 passed once with a 663-byte bounded response and verified teardown. The mediator retained only `binding_accepted` and `completed_noncanonical_claim`; see the [GX10-1 CT-008 record](../implementation/hal-core/docs/GX10_1_LOCAL_INFERENCE_MEDIATION_POSITIVE_TEST.md).
