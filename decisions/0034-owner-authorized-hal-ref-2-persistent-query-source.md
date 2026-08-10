# Decision Record 0034 — Owner-Authorized `hal_ref_2` Persistent Query Source

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | Exact persistent local source `/Users/rosslauda/Desktop/hal_ref_2` |
| Owner Review | Explicit Owner authorization |

## Decision

The Owner authorizes `/Users/rosslauda/Desktop/hal_ref_2` as a persistent,
queryable, non-canonical local knowledge source under DR 0032's HAL-owned
folder registry.

HAL alone may read direct regular `.txt` and `.md` files in this exact folder,
under the fixed registry limits. HAL must preserve registration, provenance,
immutable-pack, activation, revocation, and source-drift evidence. Hermes may
receive only bounded HAL-rendered excerpts after successful validation; it
receives no path, filesystem handle, tool, capability, or canonical-knowledge
write authority.

## Constraints

- No recursion, subdirectories, other paths, file types, NAS, network source,
  secret access, shell access, canonical promotion, or automatic source
  selection is authorized.
- Source changes fail closed until HAL regenerates and validates a fresh
  derived pack under the Owner-controlled registry process.
- The source may be deactivated or revoked while retaining evidence.

## Authoritative Sources

- Book I Owner authority, evidence/provenance, recovery, and supremacy.
- Book II runtime sovereignty, knowledge sovereignty, Capability Gateway, and
  resource-governance requirements.
- DR 0030, DR 0031, DR 0032, and DR 0033.

Higher-order authority prevails over this record.

## Consequences

This decision supersedes DR 0033's disposable-only limitation for this exact
folder. It does not authorize any additional folder or source class.
