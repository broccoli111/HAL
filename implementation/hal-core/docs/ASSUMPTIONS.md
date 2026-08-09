# Assumptions (Fail-Closed)

This document records restrictive assumptions chosen where requirements were ambiguous.

1. The requested Book path (`../../docs/governing-docs/books-1-10/`) differs from the repository path present in this workspace (`../../docs/governing documents/`). The manifest uses the repository path and records the mismatch.
2. The HAL root is not currently a local git repository, so "repository baseline" is recorded as not-yet-versioned rather than inventing a commit identifier.
3. Controlled configuration rejects unknown `HAL_` keys by default to avoid ambient configuration authority.
4. `SafeMode` defaults to `restrictive`; optional `inspection_only` is non-mutating and does not authorize external effects.
5. Audit storage is in-memory append-only for development/test only; no persistent store is admitted in M1 skeleton.
6. Any undecidable permission should return `approval_required` or `deny`; no inference from credentials, usernames, transport success, or model outputs is permitted.
