# Decision Record 0029 — Owner-Authorized Local Document Pilot

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | One exact, read-only local text document in the Owner-created `HAL_doc_ref` folder |
| Owner Review | Explicit Owner approval |

## Decision

The Owner authorizes a non-canonical, local-only retrieval pilot for exactly
`/Users/rosslauda/Desktop/HAL_doc_ref/HAL_reference.txt`. HAL may read only
that direct, regular, non-symlink `.txt` file; construct a bounded immutable
derived retrieval pack; record the source's path label, hash, and byte size;
and send only bounded M6-rendered excerpts to the existing zero-capability
local runtime route.

The runtime receives neither the source path nor a filesystem handle. A model
answer remains a non-canonical runtime claim. This decision does not admit
subdirectories, other Desktop files, arbitrary local files, NAS data, network
sources, secrets, canonical-knowledge promotion, runtime filesystem access,
or production use.

## Authoritative Sources

- Book I decisions on Owner authority, provenance, immutable experience, and
  governed knowledge evolution.
- Book II runtime sovereignty, memory sovereignty, Capability Gateway,
  Evidence Graph, recovery, and conformance sections.
- Book III local-only, testing, evidence, and change-control standards.
- [DR 0001](0001-agent-runtime-sovereignty-and-replaceability.md), [DR
  0026](0026-real-hermes-local-only-reference-runtime-pilot.md), [DR
  0027](0027-proposed-hal-to-gx10-runtime-transport.md), and [DR
  0028](0028-proposed-controlled-hal-canon-knowledge-pilot.md).

Higher-order sources prevail over this record.

## Consequences

The generated pack is explicitly classified as an Owner-approved local
document pilot and as non-canonical retrieval context. It is bounded to one
source of at most 8 KiB, 32 non-empty lines, and 2 KiB per line. The derived
pack refuses overwrite; source changes require a fresh pack generation and
Owner-confirmed activation. Deactivation/removal of the derived pack is
reversible and does not mutate the source document.

This is not a general filesystem capability or a new runtime capability. HAL
alone performs source admission; the runtime has no means to select, add,
read, alter, or promote the source.

## Owner Review Assessment

Owner Review was required because this expands the governed knowledge source
class from repository documentation to a user document. The Owner approved the
exact path and limits stated above. No constitutional amendment is proposed;
the existing authority, evidence, provenance, recovery, and runtime-memory
boundaries remain controlling.
