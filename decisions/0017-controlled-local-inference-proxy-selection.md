# Decision Record 0017 — Controlled Local Inference Proxy Selection

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | Hermes-to-local-Ollama mediation for a synthetic-only pilot |
| Owner Review | Explicit Owner selection: Option A |

## Decision

Use a dedicated least-privilege controlled local inference proxy as the only contemplated mediation path between a future Hermes evaluation namespace and the local GX10-1 Ollama/Qwen3 8B service.

The proxy must expose one allow-listed, synthetic-only inference route and deny all other destinations, methods, models, data classes, tools, capabilities, files, secrets, Docker/host sockets, LAN access, internet access, and resource paths. It must preserve HAL admission/correlation custody and be removable back to the current no-connection state.

## Preconditions

- Read-only network/firewall/rootless-runtime assessment.
- Proxy identity, execution identity, binding, request validation, timeout, concurrency, logging/evidence, rate/size limits, and teardown design.
- Negative tests proving no container-to-LAN/internet/host-service reachability and no proxy bypass.
- Explicit synthetic request binding with no credentials or general-purpose access path exposed to Hermes.

## Limits

This decision does not authorize a general network, host networking, widened Ollama binding, shared Docker socket, public listener, tool use, real data, real capabilities, or production deployment. The proxy may not become a general model gateway.

## Fail-Closed Conditions

Any route beyond the exact local Ollama allow-list, failed identity/binding validation, unexpected egress, public binding, bypass attempt, proxy compromise indicator, or inability to prove denial stops activation and restores the prior no-connection configuration.
