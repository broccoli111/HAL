# Decision Record 0015 — Qwen3 8B Initial Local Model Catalog Entry

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | First local-only model acquisition and synthetic Ollama pilot candidate on GX10-1 |
| Owner Review | Explicit Owner selection: Qwen3 8B |

## Decision

`qwen3:8b` is the first approved local model catalog candidate for the GX10-1 Ollama pilot. It may be acquired once from the approved Ollama registry path only after the runtime artifact and model manifest/digest are recorded as immutable acquisition evidence.

The model is limited to synthetic, non-sensitive, text-only pilot prompts through a restricted local Ollama endpoint. It receives no tool, filesystem, secret, shell, browser, MCP, scheduler, device, network, or governed-resource authority. Its response remains a non-canonical runtime claim until HAL separately accepts it through governed processes.

## One-Time Acquisition Boundary

The only permitted external connection is the minimum official artifact/registry access required to acquire the selected Ollama runtime and `qwen3:8b` model. It must be time-bounded, logged, provenance/integrity checked, and disabled afterward. This is acquisition only, not external inference; no prompt, context, task, credential, or HAL data may leave the local environment.

## Pilot Limits

- One model: `qwen3:8b` only; exact acquired manifest/digest recorded before use.
- One local-only Ollama endpoint with cloud features disabled.
- Synthetic text prompts only, one request at a time, bounded context and timeout.
- No tools/capabilities and no real resource effect.
- Explicit unload, shutdown, container/service removal verification, and evidence capture after the pilot.

## Fail-Closed Conditions

Unexpected egress after acquisition, a cloud/provider mode, model/artifact provenance failure, public endpoint, unapproved model pull, resource/tool access, model-service identity failure, or policy bypass stops the pilot and returns GX10-1 to no-model-service state.

## Pilot Disposition

The bounded local model-only pilot passed on 2026-08-09. The Qwen3 8B artifact ID was `500a1f067a9f`; it served one synthetic local loopback request, loaded 100% on the GB10, and was explicitly unloaded. Evidence: [GX10-1 Ollama Qwen3 8B Local Model Pilot](../implementation/hal-core/docs/GX10_1_OLLAMA_QWEN3_8B_LOCAL_MODEL_PILOT.md). All prohibitions remain in force.
