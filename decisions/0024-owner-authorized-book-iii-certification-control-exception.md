# Engineering Exception 0024 — Owner-Authorized Book III Certification-Control Exception

| Field | Value |
| --- | --- |
| Status | Active, time-bounded exception |
| Date | 2026-08-09 |
| Affected controls | Book III Chapter 8 §11.2; Book III Chapter 9 §12; DR 0023 independent-review requirement |
| Scope | The Book III Solo-Owner Assurance working amendment at revision `add12ce` only |
| Approving authority | Owner, explicit authorization to implement Option C on 2026-08-09 |
| Effective date | 2026-08-09 |
| Review date | 2026-08-15 |
| Expiration date | 2026-08-16 |

## Decision

The Owner authorizes a one-time exception to the independent-review certification control for the exact Book III Solo-Owner Assurance working-amendment revision `add12ce`.

The exception clears the certification-control gate for that exact amendment on the basis of its recorded Owner technical review, advisory technical re-review, reproducible assurance-runner result, and resolved metadata finding. The resulting disposition is **Owner-authorized exception-based technical certification**, not independent certification.

## Scope and Boundaries

This exception:

- applies only to the Book III Solo-Owner Assurance amendment at revision `add12ce`;
- does not represent Ross, the Owner, or any AI reviewer as independent;
- does not amend Book I, Book II, DR 0023, or Book III's standing independent-review requirement;
- does not certify or recertify Book II;
- does not authorize production release, Hermes integration, a real capability, governed-resource access, provider/credential use, or a production transport; and
- does not make the existing Book III DOCX/PDF editions the new certified baseline. Regeneration and release of formatted editions remain a separately controlled action.

## Justification

The Owner is the sole available reviewer. The amendment is a documented assurance-process change with complete local technical validation, a durable Owner review, an advisory AI technical review, a re-review that resolved the identified P1 metadata defect, and no unresolved technical nonconformance. The Owner explicitly chose a time-bounded exception rather than changing the permanent independence rule.

## Risk and Compensating Controls

The exception removes independent separation only for the exact certification-control gate in scope. Compensating controls are:

- immutable Git revisions `add12ce`, `ecb00ff`, and `73fd367` preserve the reviewed source and review records;
- the read-only assurance runner must pass before relying on this exception;
- the exception-based disposition must always retain its non-independent label;
- all Book I invariants, Book II boundaries, and out-of-scope restrictions remain binding;
- any subsequent production or high-risk implementation milestone remains subject to its own review and authorization requirements; and
- the exception expires and fails closed unless explicitly renewed through a new Owner decision.

## Evidence

- [Owner technical review](../Documents/Book%20III/reviews/BOOK_III_SOLO_OWNER_ASSURANCE_OWNER_REVIEW_2026-08-09.md)
- [Independent technical review cycle](../Documents/Book%20III/reviews/BOOK_III_SOLO_OWNER_ASSURANCE_INDEPENDENT_TECHNICAL_REVIEW_2026-08-09.md)
- [Certification packet](../Documents/Book%20III/deliverables/HAL_BOOK_III_SOLO_OWNER_ASSURANCE_CERTIFICATION_PACKET.md)
- [DR 0023](0023-solo-owner-assurance-profile.md)
- [Book III Chapter 8](../Documents/Book%20III/chapters/08_REVIEW_ASSURANCE_AND_TECHNICAL_DEBT.md)
- [Book III Chapter 9](../Documents/Book%20III/chapters/09_CONTROL_OPERATIONS_EXCEPTIONS_AND_CERTIFICATION.md)

## Revocation and Fail-Closed Conditions

This exception is revoked immediately if any constitutional conflict, material security or authority-boundary finding, evidence-integrity defect, or unresolved high-severity technical finding is discovered. It expires on 2026-08-16. At expiry, it cannot be relied on for further certification, release, or scope expansion; it does not affect historical evidence or substitute for any other required control.

## Consequences

The Book III Solo-Owner Assurance amendment's certification-control gate is cleared by this explicit Owner exception only. The permanent rule remains that high-risk milestones and production release require independent review. This exception is not a constitutional amendment, architectural change, or permanent policy change.
