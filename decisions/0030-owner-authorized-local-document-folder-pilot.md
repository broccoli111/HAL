# Decision Record 0030 — Owner-Authorized Local Document Folder Pilot

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | Direct regular `.txt` and `.md` files only in the exact Owner-approved `HAL_doc_ref` folder |
| Owner Review | Explicit Owner approval |

## Decision

The Owner authorizes HAL to read direct regular `.txt` and `.md` files in
`/Users/rosslauda/Desktop/HAL_doc_ref`, with no recursion. HAL must hash and
provenance-record each admitted file, revalidate the complete source set at
registration/activation/inquiry, derive bounded non-canonical retrieval
context, and provide the zero-capability local runtime only M6-rendered
excerpts.

No subdirectories, other Desktop locations, NAS content, network source,
secret, runtime filesystem access, canonical-knowledge promotion, or
production use is authorized.

## Consequences

The pilot is bounded to 32 source files, 8 KiB per file, and 128 KiB in total.
Non-regular files and selected-path symlinks fail closed. Source additions,
removals, renames, or changes invalidate the immutable derived pack until HAL
generates a fresh pack and the Owner confirms activation. HAL—not the
runtime—performs every source read and selection step.

The derived pack is reversible and non-canonical. It is not a general
filesystem capability, does not alter the Agent Runtime Contract, and does not
turn model output into HAL truth.

## Authoritative Sources

- Book I Owner authority, provenance, immutable history, and governed
  knowledge-evolution requirements.
- Book II runtime sovereignty, memory sovereignty, Capability Gateway,
  Evidence Graph, recovery, and conformance requirements.
- Book III local-only, evidence, testing, and change-control standards.
- [DR 0001](0001-agent-runtime-sovereignty-and-replaceability.md), [DR
  0027](0027-proposed-hal-to-gx10-runtime-transport.md), [DR
  0028](0028-proposed-controlled-hal-canon-knowledge-pilot.md), and [DR
  0029](0029-owner-authorized-local-document-pilot.md).

Higher-order authority prevails over this record.
