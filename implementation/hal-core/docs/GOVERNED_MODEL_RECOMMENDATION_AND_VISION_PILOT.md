# Governed Model Recommendation and Vision Pilot

**Authority:** [DR 0036](../../../decisions/0036-governed-local-model-recommendation-and-vision-pilot.md)  
**Status:** Owner-authorized design and conformance implementation; no vision-model acquisition or visual-source activation

## Purpose

HAL may recommend a suitable local model for an admitted task and automatically
select only from the Owner-approved local catalog. A candidate model is not an
available provider merely because it is known, researched, or technically
compatible.

## Selection boundary

`ModelTaskRequirement -> HAL catalog validation -> HAL recommendation ->`
`approved-local selection OR Owner acquisition request`

- The selected path can use only `approved_local` entries.
- A researched candidate returns `owner_acquisition_required` and cannot be
  dispatched, downloaded, installed, or exposed.
- Recommendations preserve task modality, artifact-budget limit, rationale,
  and official-source evidence references.
- Agent runtimes neither choose models nor access the catalog. They receive
  only a HAL-admitted inference profile after a later mediation decision.

## Initial researched recommendation

For the future direct PDF/image visual-understanding pilot, HAL currently
recommends **`qwen3-vl:8b` through Ollama** as a candidate—not an enabled
model. Official Ollama material describes it as a Text/Image model of about
6.1 GB and states that Qwen3-VL requires Ollama 0.12.7. The existing
GX10-1 Ollama version must be re-observed before an acquisition decision.

The candidate is a practical first pilot because it is close in scale to the
existing `qwen3:8b` text model while adding image input. This is a planning
inference from the official published capability/size data, not a performance,
license, safety, or host-capacity certification. The Owner must approve a
specific immutable artifact/catalog entry before any download or use.

Official sources:

- [Ollama Qwen3-VL library page](https://ollama.com/library/qwen3-vl)
- [Ollama Qwen3-VL tags](https://ollama.com/library/qwen3-vl/tags)
- [Ollama vision capability documentation](https://docs.ollama.com/capabilities/vision)

## Web research boundary

Future live model research is HAL-owned and may contact only explicit official
allowlisted HTTPS destinations. It must use bounded request/response sizes,
no redirects outside the allowlist, no user/task/source content, no secrets,
and evidence containing source URL, retrieval time, response digest, byte
count, and extracted planning facts. It is not an inference route and cannot
be invoked by Hermes.

`npm run hal:model:research` is the bounded operator-visible probe. It contacts
only the three fixed official pages, writes no local research cache, and prints
only minimised evidence. It does not accept a user query, source content,
runtime input, or destination argument.

`npm run hal:model:recommend -- <text|image>` is the corresponding local
selection demonstration. It invokes no model and returns either an
`selected_approved_local` entry or `owner_acquisition_required` candidate.

## Visual-source boundary

The pilot may only derive bounded, non-canonical context from direct regular
`.pdf`, `.png`, `.jpg`, and `.jpeg` files in a separately approved registered
folder. HAL must hash and record provenance before extraction; reject symlinks,
recursion, hidden source expansion, encrypted/unsupported media, parser errors,
and over-limit files; and retain no runtime source path or handle.

Text PDFs, scanned PDFs, and images require distinct local extractor evidence.
No parser is enabled by this design, and no source class is activated until its
implementation conformance and exact folder authorization are complete.
