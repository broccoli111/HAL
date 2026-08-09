# Decision Record 0016 — GX10-1 GPU-Enabled Local Ollama Service

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | Dedicated least-privilege GPU-enabled local Ollama service for the DR 0015 Qwen3 8B pilot |
| Owner Review | Explicit Owner selection: GPU-enabled service recommendation |

## Decision

Provision a dedicated local Ollama service on GX10-1 with an explicitly reviewed GPU path. The service is separate from the rootless Hermes evaluation container and must not expose GPU devices to that container.

The service binds only to an approved local/private endpoint, has cloud features disabled, uses a dedicated least-privilege service identity and model/state location, and serves only the Owner-approved `qwen3:8b` pilot model. It has no public listener, external inference/provider path, tools, governed resources, or authority over HAL.

## Required Controls

- Immutable/provenance-recorded Ollama runtime artifact and Qwen3 model manifest.
- Dedicated service identity, explicit model/state directory, least privilege, and removal procedure.
- GPU access only through the service’s declared runtime configuration; no ad hoc device passthrough to Hermes containers.
- Loopback/private allow-listed binding only; cloud features disabled and external egress disabled after one-time acquisition.
- Resource, concurrency, context, token/time, health, shutdown, evidence, and rollback limits.
- Synthetic prompts only during the first pilot; output remains a non-canonical HAL claim.

## Prohibited

External inference, public endpoint exposure, model auto-download/replacement, model catalog expansion, Hermes direct access to the service, direct resource capability, credentials, tools, secrets, files, NAS, shell, browser, MCP, scheduler, communications, or home automation.

## Fail-Closed Conditions

Any GPU-path ambiguity, service-identity failure, public binding, cloud/provider mode, external egress after acquisition, unexpected model, direct runtime access, resource bypass, or failed containment/provenance check stops the service and removes or disables the pilot state pending review.
