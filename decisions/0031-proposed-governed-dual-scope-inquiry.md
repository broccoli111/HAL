# Decision Record 0031 — Governed Dual-Scope Inquiry

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | A bounded read-only inquiry over exactly two separately approved local knowledge packs |
| Owner Review | Explicit Owner approval: Option 2 |

## Decision

The Owner authorizes one narrowly bounded M9/M6 inquiry
profile that can retrieve from both of the following already-approved,
independently validated packs for one Owner-requested question:

- `hal_canon_v1` under DR 0028; and
- `personal_document_folder_pilot_v1` under DR 0030.

The profile preserves the one-active-pack-per-state-directory rule. It does
would not create a combined pack, alter either approved source set, scan a
filesystem, permit runtime source selection, or give the runtime a source path,
handle, tool, or capability. HAL alone would validate and render bounded,
pack-labeled excerpts; each excerpt would retain its originating pack tuple and
source label. The runtime would receive only that bounded rendered context.

## Context

The current local assistant gives the Owner an explicit choice between a Canon
session and a controlled local-document session. That maintains clear source
scope, but prevents a single question from relating a personal approved fact to
HAL's governing documentation. M9 intentionally defines one active pack at a
time in a state directory and prohibits autonomous switching. A cross-scope
inquiry therefore requires an explicit Owner decision before implementation.

## Authoritative Sources

- Book I: Owner authority, governed knowledge, evidence/provenance, immutable
  history, recovery, and constitutional supremacy.
- Book II Chapter 2 (runtime sovereignty), Chapter 10 (knowledge and runtime
  memory sovereignty), Chapter 12 (bounded runtime context), Chapter 15
  (Capability Gateway), Chapter 25 (evidence), and Chapter 35 (conformance).
- Book III: applicable local-only, testing, evidence, and change-control
  standards.
- Book X: canonical terminology and information-model requirements.
- [DR 0001](0001-agent-runtime-sovereignty-and-replaceability.md), [DR
  0027](0027-proposed-hal-to-gx10-runtime-transport.md), [DR
  0028](0028-proposed-controlled-hal-canon-knowledge-pilot.md), and [DR
  0030](0030-owner-authorized-local-document-folder-pilot.md).

Higher-order authority prevails over this record.

## Alternatives Considered

1. **Keep explicit separate sessions.** Current accepted posture; lowest
   complexity but less useful for cross-scope questions.
2. **Bounded governed dual-scope inquiry (recommended).** Reuses only the two
   existing approved packs, requires both independent validations, and retains
   per-excerpt provenance without creating a general source merger.
3. **Create a combined derived pack.** Rejected for this proposal because it
   would blur independent source-scope provenance and create a new pack class.
4. **Let the runtime choose/read sources.** Rejected: directly contradicts
   runtime sovereignty and governed-resource access requirements.

## Consequences

The accepted profile makes the local assistant more useful while
retaining fixed local-only sources, zero runtime capabilities, non-canonical
context, and per-source evidence. Both pack tuples would be required to be
valid at each inquiry; if either is unavailable, altered, missing, or invalid,
the entire dual-scope inquiry must fail closed without dispatching a runtime
request.

Removal would consist of disabling the profile. It would not alter either
source document, Constitution, Owner identity, Agent Runtime Contract,
Capability Gateway semantics, evidence meaning, or existing single-pack paths.

## Implementation Implications

The accepted implementation is limited to a narrowly named profile and
deterministic conformance tests for:

- exact two-pack allowlist and no third pack/source;
- independent tuple/hash/source validation before retrieval;
- bounded, pack-labeled rendered excerpts and provenance in inquiry evidence;
- fail-closed behavior for unavailable, stale, mismatched, or replayed pack
  state;
- no runtime filesystem path, handle, tool, capability, canonical write, or
  source-selection input; and
- no change to the existing single-pack launchers or their behavior.

It would not authorize additional folders, file types, subdirectories, NAS,
external data, external providers, model acquisition, secrets, shell access,
production use, autonomous scope selection, capability grants, or canonical
knowledge promotion.

## Owner Review Assessment

Owner Review is required. Although the source sets are already individually
approved, combining their retrieval context changes the governed knowledge
inquiry boundary and the meaning of one inquiry's provenance/evidence record.

### Owner disposition

The Owner approved Alternative 2 on 2026-08-09.

### Recommendation

Alternative 2: bounded governed dual-scope inquiry.

### Tradeoffs

It adds a small explicit profile and more conformance obligations. In return,
it keeps scope/provenance visible and avoids a general filesystem or runtime
resource route.

### Architectural impact

Bounded M9/M6 inquiry composition only; no Agent Runtime Contract, HAL Core ↔
Hermes dependency, or Capability Gateway change.

### Constitutional impact

None proposed. Book I remains controlling.

### Security impact

The runtime remains zero-capability and receives only bounded HAL-rendered
context. The additional control is that both independent pack validations must
succeed before any dispatch.

### Reversibility

Disable the profile and retain its evidence; existing pack and runtime paths
remain unchanged.

## Continuity Notes

The profile is now accepted. Maintain its exact two-pack allowlist,
independent validation, source labeling, bounded context, no-runtime-resource
rule, and fail-closed behavior. Any additional pack, source, data class,
automatic source selection, combined derived pack, canonical promotion, or
runtime resource access requires a new Owner Decision.
