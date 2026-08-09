# Decision Record 0014 — Ollama Local Model Runtime Selection

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | Local model runtime for the initial GX10-1 model-only pilot |
| Owner Review | Explicit Owner selection: Ollama |

## Decision

Ollama is the selected local model runtime for the initial GX10-1 model-only pilot under DR 0013. It must be installed and operated as a governed local provider, not as a HAL authority, runtime-resource bypass, or public service.

No model is selected, downloaded, installed, exposed, or enabled by this decision. Model acquisition requires a separately recorded immutable model input and Owner-approved catalog entry. External model providers and inference egress remain prohibited.

## Model Recommendation Policy

HAL may recommend an approved local model using evidence about task type, expected quality, latency, token/context needs, GPU/CPU/memory capacity, power/thermal limits, license/provenance, data classification, availability, and observed provider fitness. HAL selects only from the Owner-approved local catalog within policy and resource limits; it may not autonomously acquire, replace, or enable a model.

## Provisioning Requirements

- Acquire Ollama only from an identified official immutable release artifact with recorded version, integrity/provenance, license, and vulnerability disposition.
- Run under a dedicated least-privilege local service identity or otherwise documented containment profile.
- Bind only to an approved local-only endpoint; no public listener or external inference egress.
- Maintain a model directory and service state location outside HAL canonical state, with explicit ownership, retention, removal, backup, and recovery rules.
- Initially expose no Hermes tool, file, secret, shell, browser, MCP, scheduler, or governed-resource access.
- Record node resource limits, health/readiness checks, shutdown/removal procedure, and evidence before the model-only pilot.

## Revocation and Fail-Closed Conditions

Any public exposure, external inference/provider use, unapproved model acquisition, credential path, resource bypass, or failed provenance/containment check stops provisioning and returns the node to a no-model-service state.
