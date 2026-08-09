# Local Inference Mediation — Verification Plan

> **Status:** Planned. Tests are synthetic, deterministic where practical, and must not activate a runtime-facing route until explicitly authorized.

## Conformance Stages

1. **Pure contract tests:** validate profile immutability; binding mismatch, expiry, replay, revocation, terminal-state, and output-non-canonical rules without a network or model.
2. **Mediator simulation:** use an in-memory fake upstream to prove exact forwarding, size/time/concurrency limits, cancellation, and denial-before-upstream behavior. It must not open a socket or listener.
3. **Containment simulation:** prove a synthetic evaluation namespace cannot reach LAN, internet, DNS, registry, host listeners, Docker socket, files, secrets, GPU, or raw Ollama; it may reach only an admitted test mediator endpoint.
4. **Bounded positive synthetic test:** one admitted Qwen3 request with correlation/evidence/teardown checks and no capability/tool/resource use.
5. **Failure and recovery:** force mediator/runtime loss, revoke/cancel, verify no binding reuse, remove route state, and reconstruct only HAL-approved context.
6. **Runtime replacement:** repeat contract tests with `TestRuntimeAdapter` and a non-Hermes fixture, confirming no Canon/Core/Gateway/canonical-knowledge change.

The planned containment probes are specified in [LOCAL_INFERENCE_MEDIATION_CONTAINMENT_TEST_DESIGN.md](LOCAL_INFERENCE_MEDIATION_CONTAINMENT_TEST_DESIGN.md). They remain separately Owner-gated because they require a container-facing route.

## Entry Gates

- DR 0018 design reviewed against Book II/III and DR 0013–0017.
- Synthetic-only data set and exact profile approved.
- No active route exists before the relevant stage begins.
- Each stage has a teardown command, expected denial evidence, and a stop condition.

## Exit Gates

All controls in [LOCAL_INFERENCE_MEDIATION_CONTROL_MATRIX.md](LOCAL_INFERENCE_MEDIATION_CONTROL_MATRIX.md) must have reproducible evidence. Any new transport, mount, network exception, route class, data class, model, provider, or capability is outside this plan and requires new Owner Review. Passing this plan alone does not authorize production or Hermes activation.
