# Controlled Local Inference Proxy — Design

> **Status:** Host-side synthetic-proxy prototype only under DR 0017 and DR 0018. It has no container mount, listener exposed to Hermes, container network, or Hermes-to-Ollama connection. It is not an activated runtime route.

## Boundary

The proxy is a single-purpose local mediator, not a network gateway. Its upstream is only `127.0.0.1:11434` on GX10-1. Its downstream is only the explicitly admitted synthetic Hermes evaluation instance. It must reject all other destinations and traffic.

## Enforcement Requirements

- Bind to a private, non-public interface/namespace only; never `0.0.0.0` or a LAN address.
- Authenticate/bind each request to one admitted runtime/agent/task/correlation context supplied by HAL-owned mediation, not runtime assertion alone.
- Permit `qwen3:8b` only; reject model override, embeddings, tool calls, streaming, unknown parameters, external URLs, and unbounded context.
- Enforce synthetic classification, request/response size, context, one-request concurrency, timeout, cancellation, and explicit `keep_alive: 0`.
- Send only to local Ollama loopback. It must not resolve or connect to DNS, registry, internet, LAN, host services, Docker socket, files, or other local ports.
- Produce non-canonical, attributable audit evidence and support immediate teardown.

## Current Prototype Limits

`scripts/hal_ollama_unix_proxy.py` accepts only the exact, fixed synthetic request for `qwen3:8b`. It fixes the endpoint to Ollama loopback, disables streaming, immediately unloads the model, limits context to 512 and generation to 16 tokens, permits one in-flight request, and bounds both request and response bytes. It refuses to replace a pre-existing socket and requires a provisioned owner-only socket directory.

The prototype deliberately has no runtime identity/correlation verifier, HAL evidence sink, or container access configuration. Therefore it MUST NOT be mounted into a container or regarded as an authorized Hermes route. Those missing controls remain activation preconditions, not implementation gaps to bypass.

DR 0018 now establishes the required implementation-neutral semantics in [LOCAL_INFERENCE_MEDIATION_CONTRACT.md](LOCAL_INFERENCE_MEDIATION_CONTRACT.md), with a [control matrix](LOCAL_INFERENCE_MEDIATION_CONTROL_MATRIX.md) and [verification plan](LOCAL_INFERENCE_MEDIATION_VERIFICATION_PLAN.md). This prototype may evolve only to satisfy that contract; it must not define it.

## Network Preconditions

The current rootless Docker bridge is not proven deny-by-default. Before activation, an administrator must verify and enforce that the evaluation namespace can reach only the proxy and that the proxy can reach only Ollama loopback. Host/bridge/LAN/internet egress and all other host listeners must be negatively tested and denied.

## Removal

Teardown stops the proxy process and verifies its Unix socket is absent, restoring the current state: Hermes `--network none`; Ollama `127.0.0.1:11434`; no evaluation connection. The proxy refuses to unlink a socket it did not create at startup.
