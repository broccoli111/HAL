# Decision Record 0013 — Local-Only Model Provider Policy and Model-Only Pilot

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | HAL model-provider policy and first bounded local-model Hermes pilot |
| Owner Review | Explicit Owner direction: no external providers; local-model-only pilot approved |

## Decision

HAL will not use external model providers. Model inference for HAL-governed work must use local models on Owner-governed local compute nodes, initially GX10 nodes.

HAL may select an appropriate model for a task only from an Owner-approved local model catalog and only within current authority, policy, classification, resource, and lifecycle limits. HAL may recommend a model or request its acquisition/installation, but it may not autonomously download, install, replace, expose, or retire a model unless separately authorized by the governing model/node/resource process.

The first Hermes pilot is limited to local-model inference only: synthetic prompts, one approved local endpoint, no tools, no capability grant, no files, no secrets, no shell, no browser, no external network/egress, no communication, no automation, and no canonical-knowledge acceptance by runtime response alone.

## Consequences

- External API credentials, external inference endpoints, and model-provider egress are prohibited for HAL.
- The future local model provider is a governed capability/node, not Hermes authority or a bypass around HAL policy.
- A model endpoint must be bound to an approved local node identity and a restricted evaluation network path; it cannot be public or ambient.
- Model selection is HAL-governed policy execution, not unrestricted runtime choice.
- Model acquisition, endpoint provisioning, model catalog definition, resource allocation, and network path configuration remain separately scoped implementation decisions.

## Pilot Preconditions

1. Read-only inventory identifies the available GX10 local-model runtime, installed models, node identity, GPU/resource posture, and local endpoint options.
2. An Owner-approved bounded model/node selection and local-only connectivity design are recorded.
3. The model endpoint is reachable only through a least-privilege, allow-listed local path from the isolated Hermes evaluation environment; all external egress remains denied.
4. The pilot uses synthetic non-sensitive input and returns only a non-canonical HAL claim.
5. Resource, time, concurrency, token, evidence, shutdown, and removal limits are declared and verified.

## Explicitly Prohibited

- Any external provider, API key, cloud inference, or internet egress for inference.
- Direct Hermes access to local model host administration, model files, secrets, files, NAS, tools, shell, browser, MCP, scheduler, communications, or home automation.
- Automatic model download, installation, replacement, or exposure by HAL or Hermes.
- Treating model output, runtime memory, or provider availability as HAL authority or canonical knowledge.

## Revocation and Fail-Closed Conditions

Any attempted external egress, provider credential use, unapproved model acquisition, public endpoint exposure, direct resource path, policy bypass, or containment failure stops the pilot and returns the runtime to the prior no-provider state pending review.
