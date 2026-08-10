# DR 0036 Official Model Research Probe — 2026-08-10

**Status:** Passed bounded read-only research probe; not a model acquisition or approval  
**Authority:** [DR 0036](../../../decisions/0036-governed-local-model-recommendation-and-vision-pilot.md)

## Purpose

Verify that the HAL-owned model-planning research edge can retrieve only its
fixed official public destinations and retain only minimised provenance
evidence. No user question, personal/local source content, secret, credential,
runtime context, or model prompt was sent.

## Executed Boundary

Command: `npm run hal:model:research`

- method: fixed `GET` only;
- destinations: exact three DR 0036 allowlisted official HTTPS URLs;
- redirects: denied;
- timeout: 10 seconds per page;
- maximum response: 262,144 bytes per page;
- persistence: none; terminal output contained evidence only;
- runtime access: none; Hermes was not contacted.

## Evidence

| Official source                               | Retrieval UTC              | SHA-256                                                            |   Bytes |
| --------------------------------------------- | -------------------------- | ------------------------------------------------------------------ | ------: |
| `https://ollama.com/library/qwen3-vl`         | `2026-08-10T11:30:08.433Z` | `125a75cf752c1477c1efa5e23e1e3e4030f840596f4a39e2260bcb45a1c16c79` |  94,130 |
| `https://ollama.com/library/qwen3-vl/tags`    | `2026-08-10T11:30:08.529Z` | `190d8135c47c8f151319a61db190546aad1308c3aaf9cf6e5cd1b1f11f9c7b92` | 210,408 |
| `https://docs.ollama.com/capabilities/vision` | `2026-08-10T11:30:08.710Z` | `686042fdf88aec06caa9cd38db13680956829d40e8bdd937a3b1ea1ce43f9e3b` | 259,586 |

## Recommendation Result

The deterministic HAL catalog returns the already approved `qwen3:8b` for
text-only tasks. For a bounded image-understanding task within a 6.5 GB
artifact budget, it returns **`qwen3-vl:8b`** with disposition
`owner_acquisition_required`.

Official Ollama material describes the candidate as Text/Image capable, about
6.1 GB, and requiring Ollama 0.12.7 or later. This is adequate evidence for a
planning recommendation, not for model provenance, license acceptance,
hardware fitness, performance, safety, or acquisition. A specific Owner
decision remains required before model download, installation, activation, or
image-content inference.

## Containment Result

No external inference, runtime/Hermes egress, local model invocation, model
artifact acquisition, GPU work, filesystem source ingestion, source activation,
or canonical-knowledge mutation occurred.
