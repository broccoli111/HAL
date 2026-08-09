# GX10-1 Ollama Qwen3 8B Local Model Pilot

## Status and Scope

**Passed for the bounded local model-only pilot.** This evidence covers one synthetic, non-sensitive, local loopback inference with Qwen3 8B through Ollama. It does not authorize Hermes connection, tools, capabilities, files, secrets, shell, browser, MCP, scheduler, communications, automation, external inference, real resources, canonical-knowledge acceptance, or production deployment.

## Runtime and Model Evidence

- Ollama version: `0.32.6`.
- Binding: `127.0.0.1:11434` only.
- Local-only configuration: `OLLAMA_NO_CLOUD=1`.
- Model state location: `/var/lib/hal-ollama/models`.
- Model: `qwen3:8b`, ID `500a1f067a9f`, 5.2 GB downloaded artifact.
- Model metadata: Qwen3, 8.2B parameters, Q4_K_M, 40,960-token native context, Apache 2.0.
- Pilot resource controls: one loaded model, one parallel request, one queue entry, 4,096-token server context, immediate unload by default.

## Synthetic Inference Result

The local loopback `/api/generate` request used only the synthetic prompt `Reply with exactly: HAL local model pilot.`, `stream: false`, `keep_alive: 0`, `num_ctx: 512`, and `temperature: 0`.

The model returned exactly `HAL local model pilot.` The request completed locally in approximately 6.67 seconds, including approximately 3.88 seconds of model load and approximately 2.67 seconds of generation. No tool/capability request, runtime connection, credential, external provider, or governed-resource action was included.

## GPU and Cleanup Verification

An empty local preload health probe showed Qwen3 8B using **100% GPU** on the GB10 with a 4,096-token context. `ollama stop qwen3:8b` then returned an empty `ollama ps` listing. The model artifact remains installed in the approved local catalog; no model remains resident in GPU memory.

## Limits and Next Gate

This proves the local Ollama/Qwen path, loopback binding, local-only mode, GB10 placement, and unload behavior for the synthetic pilot. It does not establish Hermes-to-Ollama mediation, model recommendation policy implementation, production capacity, multi-model behavior, real data use, tool safety, capability mediation, or production service authorization.
