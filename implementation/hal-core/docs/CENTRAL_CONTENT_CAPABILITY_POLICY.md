# Central Content Capability Policy

**Authority:** [DR 0037](../../../decisions/0037-central-content-policy-and-mixed-folder-recommendation.md)  
**Status:** Implemented for metadata-only model recommendation; no media extraction or inference

HAL deliberately separates two questions:

1. **Where may HAL inspect?** An Owner-registered exact folder answers this
   resource-governance question. It remains required, evidence-backed, and
   revocable.
2. **What kinds of content may HAL handle there?** HAL's central
   `local_mixed_media_v1` policy answers this capability-policy question for
   every registered folder.

The policy recognizes direct `.md`, `.txt`, `.pdf`, `.png`, `.jpg`, and
`.jpeg` regular files. It rejects hidden, path-like, unsupported, and symlink
sources. This policy never grants an Agent Runtime filesystem access: HAL alone
performs each permitted inspection and a runtime can receive only separately
admitted bounded derived context.

## Local recommendation test

Put a test image directly in the already registered `hal_ref_2` folder, then
run from `implementation/hal-core`:

```bash
npm run hal:owner-folder:model-recommend -- --file-name my-image.png
```

The command resolves only the registered folder ID (default
`hal_ref_2_persistent_v1`), validates that the requested name is a direct
regular non-symlink file, and inspects metadata only. It prints a deterministic
recommendation. It does not read the image, send it anywhere, invoke a model,
start Hermes, contact GX10-1, or activate a knowledge pack.

For an image or PDF it will currently return `qwen3-vl:8b` with
`owner_acquisition_required`. That is the expected proof that HAL can select a
need while still refusing to self-acquire or self-enable the model.

Text-pack refresh continues to derive context from `.md` and `.txt` only.
Recognized PDFs and images are skipped, not parsed. Actual media extraction and
semantic questions remain blocked pending a specific local extractor and the
separate Owner approval/acquisition of a visual model.
