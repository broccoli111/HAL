# Decision Record 0037 — Central Content Policy and Mixed-Folder Recommendation

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-10 |
| Scope | HAL-owned local content classification and metadata-only model recommendation |
| Owner Review | Explicit Owner direction |

## Context

The Owner requires a simple mixed-document experience: after a folder has been
admitted, HAL should apply centrally governed support for text and imagery
without the Owner granting a separate image/PDF capability for each folder.
The Owner also wants to locally test a recommendation by placing an image in
an already approved folder.

DR 0032 and DR 0034 correctly retain exact-folder admission, provenance,
revocation, and runtime isolation. Their implementation-era fixed text file
list must not be interpreted as a separate capability grant per folder.

## Decision

HAL defines the central `local_mixed_media_v1` content-capability policy.
It recognizes direct regular `.md`, `.txt`, `.pdf`, `.png`, `.jpg`, and
`.jpeg` source names. Folder registration admits only an exact resource
location and its bounds, evidence, and lifecycle; it does not select content
capabilities.

For the immediate local test, HAL may inspect only direct-file metadata in an
already registered, non-revoked folder and deterministically recommend a
catalog model based on the centrally classified content class. The command
does not open source content, activate a pack, contact GX10-1, invoke Ollama,
contact Hermes, or create a capability for a runtime.

Text remains the only locally implemented knowledge-pack extractor. Recognized
PDF and image files are safely skipped by text-pack refresh and cannot become
runtime context, canonical knowledge, or semantic answers until an extractor
and the separately Owner-gated visual-model pilot are implemented and
validated. Unsupported, hidden, path-like, special, or symlink sources fail
closed.

## Authority and Compatibility

This record clarifies DR 0032 and DR 0034: centrally defined content policy
replaces their per-registration extension-list implementation detail. It does
not supersede exact-folder admission, immutable evidence, activation,
revocation, source-drift handling, or the ban on runtime filesystem access.

It implements the bounded planning and direct-media design space authorized by
[DR 0036](0036-governed-local-model-recommendation-and-vision-pilot.md). It
does not approve `qwen3-vl:8b` acquisition, an image/PDF parser, visual
inference, new folder admission, recursion, NAS/cloud sources, network egress,
or canonical promotion.

## Consequences

- The Owner authorizes a folder location once; HAL centrally governs supported
  content classes for every registered folder.
- A recommendation is not model availability or execution authority. Image and
  PDF recommendations currently return the researched `qwen3-vl:8b` candidate
  with `owner_acquisition_required`.
- `hal_ref_2_persistent_v1` may be used for the metadata-only self-test because
  it is already registered. It remains a text-only persistent query source
  until a future bounded extractor decision is completed.
- The runtime receives neither a path, file, handle, model-selection power, nor
  a governed-resource capability from this flow.

## Authoritative Sources

- Book I: Owner authority, policy, capability, evidence, and knowledge
  invariants.
- Book II: Capability Gateway, runtime sovereignty, resource governance, and
  canonical/non-canonical knowledge boundaries.
- Book III: controlled, testable, reversible implementation practice.
- DR 0013, DR 0032, DR 0034, and DR 0036.

Higher-order authority prevails over this record.
