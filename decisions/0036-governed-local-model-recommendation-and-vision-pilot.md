# Decision Record 0036 — Governed Local Model Recommendation and Vision Pilot

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-10 |
| Scope | HAL-owned model research, recommendation, local-catalog selection, and visual-source conformance pilot |
| Owner Review | Explicit Owner approval: “Scope approved as written” |

## Decision

HAL may implement a governed local-model recommendation function and a
conformance-only visual-source ingestion pilot. The objective is to let HAL
recommend an appropriate **local** model for an approved task and automatically
select from a pre-approved local catalog, without giving an Agent Runtime model
selection, acquisition, filesystem, or internet authority.

HAL may use a HAL-owned, read-only web research boundary to retrieve official
model-publisher, official registry, license, specification, and security-advisory
information. This exception is limited to model planning and evidence. It does
not authorize external inference, runtime internet access, user-data egress,
automatic model acquisition, or general-purpose browsing.

The visual-source pilot may design and test deterministic processing for direct
regular `.pdf`, `.png`, `.jpg`, and `.jpeg` files in an already Owner-approved
folder. Runtime access remains limited to bounded HAL-rendered derived context;
the runtime receives no file path, directory handle, image artifact, tool,
capability, or canonical-knowledge write authority.

## Existing Authority and Narrow Conflict Resolution

[DR 0013](0013-local-only-model-provider-policy-and-pilot.md) remains in force
for local-only inference, Owner-approved local catalogs, and the prohibition on
automatic model download, installation, replacement, exposure, or retirement.

This record narrowly supersedes DR 0013 only to permit HAL-owned, read-only,
evidence-producing outbound retrieval of the defined public model-planning
information. It does **not** permit external model-provider inference or
runtime/Hermes egress. All other DR 0013 constraints remain unchanged.

## Required Constraints

- HAL Core—not Hermes or another runtime—owns research admission, destination
  allowlisting, request shaping, evidence/provenance, and failure handling.
- Research sends no question text, personal document content, local file data,
  secrets, credentials, model prompts, task context, or runtime state.
- Recommendations distinguish observation, inference, uncertainty, source,
  date, license/provenance, expected resource use, and suitability rationale.
- HAL may automatically select only a model already present in the
  Owner-approved local catalog and only within policy, data-classification,
  node/resource, lifecycle, and task-modality limits.
- A missing or unsuitable model produces a recommendation and Owner approval
  request; HAL may not autonomously acquire, install, replace, expose, or
  retire a model.
- Every acquisition requires a later, separately recorded immutable artifact,
  provenance/integrity, license, resource, rollback, and containment decision.
- The initial visual pilot is local-only, direct-file, non-recursive,
  hash/provenance-recorded, size-bounded, and revocable. It does not admit NAS,
  cloud storage, arbitrary folders, or automatic source expansion.
- PDF text extraction, OCR, metadata, and visual interpretation remain derived
  non-canonical context. A scanned PDF/image with no supported extractor must
  fail closed with a clear limitation.
- A local vision-language model is not acquired or enabled by this record. HAL
  may research and recommend one; the Owner must approve its specific catalog
  entry and acquisition before any image-content inference.
- External inference, public listeners, runtime networking, direct runtime
  filesystem access, tools, secrets, shell access, canonical promotion, and
  production deployment remain prohibited.

## Consequences

This establishes a HAL-owned planning and selection boundary, not a runtime
privilege. It adds model-planning evidence and deterministic recommendation
logic, but preserves the Agent Runtime Contract, Capability Gateway semantics,
Owner authority, canonical-knowledge rules, recovery requirements, and local
inference containment.

## Implementation Sequence

1. Define and test a versioned model-catalog, task-requirement, recommendation,
   and research-evidence contract with no network call.
2. Define strict official-source allowlisting, egress minimization, response
   bounds, provenance capture, and fail-closed research behavior.
3. Implement deterministic selection from pre-approved local catalog entries.
4. Define PDF/image derived-context ingestion contracts and conformance tests;
   do not register a new folder or enable a new parser/model without its scoped
   implementation evidence.
5. Research and present one local vision-model recommendation to the Owner,
   including artifact source, license, resource estimate, security posture,
   and rollback plan.

## Owner Review Assessment

This decision changes the model-planning and local-source trust boundaries and
therefore requires Owner Review. The Owner explicitly authorized the bounded
scope above. No constitutional amendment is made.

## Revocation and Fail-Closed Conditions

Any destination outside the research allowlist; attempted prompt/private-data
egress; external inference; runtime-originated research; automatic acquisition;
unapproved catalog selection; provenance/integrity failure; parser escape;
unsupported/encrypted media; or containment failure stops the affected flow,
preserves permitted evidence, and leaves the prior local-only route unchanged.
