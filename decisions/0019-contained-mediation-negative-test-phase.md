# Decision Record 0019 — Contained Mediation Negative-Test Phase

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | CT-001 through CT-007 from the DR 0018 containment test design |
| Owner Review | Explicit Owner approval |

## Decision

Authorize a disposable, synthetic-only containment simulation that implements and executes CT-001 through CT-007. The purpose is to prove denial of non-admitted network, host-resource, and mediation-bypass paths before any positive local-model request is considered.

The authorized scope excludes Hermes, any model request (including Qwen3), CT-008, real data, tools, capabilities, governed resources, credentials, secrets, GPU/device access, host networking, published ports, general networking, and production deployment.

## Authority

Book I Decisions 5, 22, 27, 35–36, and 50; Book II Chapter 2 §3.1–§3.2 and Chapter 15; Book III Chapters 5–6; DR 0013, DR 0016, DR 0017, and DR 0018.

## Constraints

- Use the dedicated `hal_eval` rootless Docker identity and a separately recorded disposable profile.
- Begin and end with the no-connection state. No default bridge, host network, raw Ollama endpoint, or public listener is permitted.
- Require explicit, minimized evidence for each probe and teardown.
- Stop immediately on unexpected reachability, listener, mount, identity failure, proxy bypass indicator, evidence failure, or cleanup failure.
- CT-008 remains a separate Owner-gated decision even if this phase passes.

## Consequences

This approval authorizes containment verification only. It creates no durable runtime authority, model/provider authorization, capability, or production route. Any deviation from the fixed scope fails closed and requires a new Owner decision.

## Evidence

CT-001 through CT-007 passed with cleanup verification; see the [GX10-1 negative containment test record](../implementation/hal-core/docs/GX10_1_LOCAL_INFERENCE_CONTAINMENT_NEGATIVE_TEST.md). CT-008 remains outside this decision.
