# Decision Record 0028 — Proposed Controlled HAL Canon Knowledge Pilot

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | A bounded, local-only, non-synthetic knowledge pilot for named HAL repository documentation |
| Owner Review | Explicit Owner approval: Option A |

## Decision

Authorize a controlled local-knowledge pilot that admits a
fixed, allow-listed set of HAL governance and project-continuity documents into
a HAL-owned, manifest-hashed retrieval pack. The retrieved representation is
non-canonical context. The source documents remain the sole authorities under
the hierarchy in `agents.md`.

This decision authorizes only the source-confined local pilot described here.
It does not authorize a general filesystem capability, a runtime source path
or handle, private/user-document ingestion, external sources, canonical
knowledge promotion, or production use.

## Context

The existing bounded local assistant can answer general text questions through
the restricted, zero-capability DR 0027 transport. Its only M9 knowledge pack
is synthetic. M9 deliberately prohibits user-document ingestion, cloud or
network sources, and arbitrary filesystem pack admission. A useful HAL-aware
assistant needs source-scoped context while preserving the Canon, provenance,
and the rule that runtime-held context is not HAL truth.

The proposed initial source set is restricted to repository-controlled:

- Book I — Book IV and Book X;
- accepted Decision Records;
- repository-root `agents.md`; and
- `CURRENT_STATE.md`.

The proposal excludes private/user documents, home directories, NAS content,
arbitrary workspace files, secrets, credentials, external/network sources,
and runtime-selected paths.

## Authoritative Sources

- Book I, including evidence/provenance, resource governance, Owner authority,
  recovery, and constitutional-supremacy requirements.
- Book II Chapter 2 §§3.1–3.2 (runtime sovereignty and anti-coupling), Chapter
  10 (knowledge and runtime-memory sovereignty), Chapter 12 (bounded runtime
  context), Chapter 15 (Capability Gateway), Chapter 25 (evidence), and
  Chapter 35 (conformance).
- Book III, including the applicable local-only, evidence, testing, and change
  controls.
- Book X for canonical terminology and information-model meanings.
- [DR 0013](0013-local-only-model-provider-policy-and-pilot.md), [DR
  0015](0015-qwen3-8b-initial-local-model-catalog-entry.md), [DR
  0026](0026-real-hermes-local-only-reference-runtime-pilot.md), and [DR
  0027](0027-proposed-hal-to-gx10-runtime-transport.md).
- [M9 Implementation Record](../implementation/hal-core/docs/M9_IMPLEMENTATION_RECORD.md),
  which explicitly limits M9 to synthetic-only packs today.

Higher-order sources prevail over this record.

## Alternatives Considered

1. **Fixed HAL Canon pilot (recommended).** A source allowlist, immutable
   manifest, hashes, provenance, and bounded text retrieval keep the first
   real-context pilot reviewable and reversible.
2. **Broader repository/workspace retrieval.** Rejected for the initial pilot:
   it would weaken source scope and requires further resource, classification,
   and review decisions.
3. **Synthetic packs only.** Retains the present safety posture but prevents
   the assistant from answering from real HAL documentation.

## Consequences

If accepted, HAL may construct and activate only a named, locally stored pack
from the fixed source set after validation, manifest/hash recording, and the
Owner-confirmed activation process. Queries may receive bounded rendered
context derived from that pack. The runtime receives neither a source path nor
a filesystem handle and has no authority to select, add, alter, or promote a
source.

The pack is a non-canonical retrieval representation. It may point back to
authoritative source references, but it must not override the source hierarchy
or make a model answer canonical knowledge. Removal/deactivation of the pack
must be possible without changing the source documents, Constitution, Owner
identity, Evidence Graph semantics, or runtime contract.

## Implementation Implications

An accepted decision would enable a separately tested extension of M9's fixed
pack admission model for this exact allow-listed repository source set. It
would require explicit classification/provenance metadata, content and size
bounds, deterministic manifest generation and verification, source-path
confinement, no-symlink/no-traversal checks, activation/deactivation evidence,
and M6 retrieval citations to the source identity/version.

It would not authorize direct runtime filesystem access, a general filesystem
capability, runtime-generated source selection, private/user-document access,
network access, external providers, canonical knowledge promotion, source
mutation, secrets, shell access, production deployment, or a change to the
Agent Runtime Contract.

## Owner Review Assessment

Owner Review was required. The current M9 boundary expressly excluded the
new class of non-synthetic source. Selecting the source scope and its
classification/provenance treatment affects governed knowledge semantics and
the narrow resource boundary through which HAL—not the runtime—would read
repository material.

**Owner disposition:** Option A is approved. The stated source list is the
complete approved source scope for this pilot.

**Recommendation:** Alternative 1. It is the smallest useful route to an
informed local HAL assistant, retains direct-source authority, prevents runtime
filesystem access, and is reversible through deactivation.

**Tradeoffs:** It adds a controlled pack-construction and verification path and
requires maintenance when sources change. It intentionally does not make HAL
informed about arbitrary personal files or external information.

**Architectural impact:** bounded M9/M6 implementation work only; no new
runtime capability, Provider interface, or Agent Runtime Contract.

**Constitutional impact:** none proposed; Book I supremacy and existing
knowledge/evidence safeguards remain controlling.

**Security impact:** a tightly defined HAL-side read path is introduced for
the named repository sources only. The runtime remains zero-capability and
receives only bounded rendered context.

**Reversibility:** deactivate/delete the derived local pack state and its
non-canonical index; retain required activation/evidence records. No source or
constitutional mutation is required.

## Continuity Notes

Define exact source selection and immutable-manifest procedures, implement the narrow M9 extension
with deterministic negative tests, activate only the verified pack, run an
end-to-end bounded inquiry through the existing DR 0027 route, and update
`CURRENT_STATE.md` with evidence and remaining limitations.
