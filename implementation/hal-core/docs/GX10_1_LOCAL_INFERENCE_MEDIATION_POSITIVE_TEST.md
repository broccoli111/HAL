# GX10-1 Local Inference Mediation — CT-008 Positive Test

> **Status:** DR 0020 evidence, completed 2026-08-09. This is one bounded synthetic test, not Hermes integration, provider activation, capability authorization, or production readiness.

## Scope and Controls

- One existing, Owner-approved local `qwen3:8b` request through the loopback-only Ollama service.
- One host-generated, one-use binding matching fixed runtime, adapter, agent, task, correlation, profile, and synthetic prompt attributes.
- A disposable rootless container with `--network none`, read-only root, dropped capabilities, `no-new-privileges`, 32-process, 128 MiB, and 1 CPU limits.
- The container received only the temporary owner-only Unix socket and its exact one-use binding. It had no Hermes process, host network, raw Ollama endpoint, GPU/device, filesystem/resource mount, tool, capability, secret, or external route.
- The mediator had one fixed `127.0.0.1:11434` upstream, a fixed non-streaming request, 512-token context, 16-token generation limit, 16,384-byte response limit, and `keep_alive: 0`.

## Result

The single exact request passed. The container received a bounded **663-byte** HTTP response. The mediator retained only two minimized events:

1. `binding_accepted`
2. `completed_noncanonical_claim`

No model text was retained in the evidence record. The output is an operational runtime claim only; it was not admitted as canonical knowledge, evidence, authority, permission, capability, or completed HAL work.

## Cleanup Verification

Post-test read-only verification found no mediator process, no mediator socket, no remaining test containers, and no loaded Ollama model. The test did not start Hermes, widen Ollama binding, create a public listener, alter Docker networking, or use an external provider.

## Limits

This result proves only the exact DR 0020 synthetic path. It does not prove Hermes interoperability, durable HAL-issued binding implementation, runtime identity mapping, real-data safety, capabilities, tools, scheduling, model selection, multi-request behavior, provider expansion, or production readiness. Any further positive mediation request or runtime integration requires a new Owner decision.

Post-test local hardening added a 60-second binding-expiry requirement with deterministic validation for expired and malformed lifetimes. That change was not exercised by a second GX10 inference request.
