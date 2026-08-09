# HAL Decision Records

Decision Records preserve the rationale and implementation implications of accepted project decisions. They are repository continuity artifacts, not constitutional or architectural authority.

## Authority

Decision Records are subordinate to the HAL Canon and follow the hierarchy in [../agents.md](../agents.md). In particular, Book I prevails over every record. A Decision Record MUST cite the authoritative sources it relies on and MUST NOT amend, reinterpret, or weaken the Canon.

## Scope

Use a root Decision Record for a repository-wide accepted clarification or implementation-direction decision that is not already governed by a more specific Book-scoped register. Existing Book-specific decision registers remain authoritative only within their stated documentation scope and are not replaced by this directory.

## Record Lifecycle

- **Proposed:** Documented for review; not adopted.
- **Accepted:** Adopted within the authority stated by its cited sources.
- **Superseded:** Replaced by a later record; retained for history.
- **Rejected:** Considered and declined; retained for rationale.

Records use zero-padded, sequential identifiers: `0001-short-title.md`.

## Required Content

Create records from [TEMPLATE.md](TEMPLATE.md). Each record must identify the decision, status, context, supporting authoritative sources, alternatives, consequences, implementation implications, and any Owner Review requirement. If a source conflict appears, preserve the higher-order source and explicitly record the conflict rather than resolving it by assertion.
