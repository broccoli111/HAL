# Decision Record 0023 — Solo-Owner Assurance Profile

| Field | Value |
| --- | --- |
| Status | Accepted Owner decision |
| Date | 2026-08-09 |
| Scope | Book III engineering assurance and certification process for a solo-owner HAL project |
| Owner Review | Explicit Owner authorization |

## Decision

Adopt a risk-scaled Solo-Owner Assurance Profile in Book III. Where HAL has no independent reviewer, the Owner may perform and attest a documented assurance review for routine, reversible, non-production work. The record must declare the lack of independence and retain reproducible automated checks, risk assessment, source mappings, findings, evidence, and rollback/containment status.

Independent review remains required before production release or a high-risk milestone involving constitutional interpretation/change, Owner authority, a trust/security boundary, canonical knowledge semantics, evidence/recovery guarantees, a major architecture contract, a new capability/Treaty class, substantial irreversible migration/risk, or other Book I-reserved matter.

## Authority

Book I retains sole Owner authority and constitutional invariants. Book II retains risk-scaled architecture conformance and safety boundaries. This decision changes only the Book III engineering assurance process; it neither amends Book I nor weakens Book II controls.

## Consequences

- A Solo-Owner Assurance record is not an independent review or independent certification.
- It removes the need for repeated temporary exceptions for eligible provisional/test-only work.
- Existing exceptions remain effective only according to their recorded scope and dates.
- Book III formatted editions require regeneration and appropriate certification disposition before they can be represented as the new certified baseline.
