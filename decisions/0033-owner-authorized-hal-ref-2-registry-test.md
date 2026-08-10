# Decision Record 0033 — Owner-Authorized `hal_ref_2` Registry Test

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | Exact disposable local folder `/Users/rosslauda/Desktop/hal_ref_2` |
| Owner Review | Explicit Owner authorization |

## Decision

The Owner authorizes the exact folder `/Users/rosslauda/Desktop/hal_ref_2` as
a disposable test registration under DR 0032’s Owner-controlled local-folder
registry. HAL alone may inspect direct regular `.txt` and `.md` files under
the registry’s fixed limits after a separate pack-generation test. No
subdirectories, other paths, runtime filesystem access, source selection,
canonical promotion, or production use is authorized.

## Context

The Owner selected a harmless, empty Desktop folder to prove that explicit
folder authorization is recorded before any real data source is admitted.
The registration event is recorded in disposable HAL local registry state as
`hal_ref_2_test_v1`.

DR 0034 supersedes this record's disposable-only limitation for this exact
folder. This record remains the evidence of the initial bounded registry test.

## Authoritative Sources

- Book I Owner authority and evidence/provenance requirements.
- Book II runtime sovereignty, knowledge sovereignty, Capability Gateway, and
  resource-governance requirements.
- DR 0030, DR 0031, and DR 0032.

Higher-order authority prevails over this record.

## Consequences

The folder is a test source only. Its current empty state means no knowledge
pack exists and no content has been read or sent to an Agent Runtime. If
non-sensitive direct `.txt` or `.md` test files are later placed in the exact
folder, HAL may perform the DR 0032 pack-generation/validation test. Any other
folder or source requires separate explicit Owner authorization.

## Owner Review Assessment

This is an exact-path authorization under the already accepted DR 0032
registry model. It creates no new capability class and does not alter the
Agent Runtime Contract. Runtime access remains zero-capability and indirect
through bounded HAL-rendered context only.
