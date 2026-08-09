# HAL Book II — Project Register

**Version:** 0.9
**Date:** August 9, 2026
**Status:** Runtime-sovereignty clarification and non-canonical runtime-record clarification recorded; targeted conformance recertification pending under a time-bounded engineering-control exception

## Authoritative Editions

| Chapters | Version | Markdown | DOCX | PDF |
|---|---:|:---:|:---:|:---:|
| 1–5 | v0.2 | Yes | Yes | Yes |
| 6–20 | v0.3 | Yes | Yes | Yes |
| 21–35 | v0.2 | Yes | Yes | Yes |

## Owner Review Register

| Item | Decision | Status |
|---|---|---|
| OR-01 | Experience Ledger deletion uses cryptographic payload erasure with a minimal non-sensitive tombstone; removal of event identity requires constitutional amendment. | Closed |
| OR-02 | Recovery constitutional leases are capped at 24 hours; every extension requires fresh Owner-specific exact-lease authorization. | Closed |
| OR-03 | Constitutional Invariant changes require two exact-change ceremonies, a 72-hour cooling-off period, mirror and recovery evidence, and continuity classification. | Closed |
| OR-04 | Retain a narrow, synthetic-only durable operational record for Runtime Contract submissions and Gateway dispositions; records remain non-canonical and create no new resource capability or authorization path. | Closed — Owner approved 2026-08-09; see DR 0002. |

**Open Owner Review items:** 0

## Runtime Sovereignty Clarification

The Book II Markdown working edition now records the Agent Runtime Contract, Capability Gateway boundary, runtime-memory sovereignty, runtime replaceability, and the anti-coupling guarantee. Hermes is documented solely as **Reference Agent Runtime v1** behind HermesAdapter. This is an architectural refinement under existing Decisions 1, 5, 10, 16, 25, 27, 30, 35–40, 43, 48–49, 51, and 58; it does not amend Book I or confer authority on Hermes.

The change requires targeted Book II conformance evidence before the revised architecture may be represented as recertified. The existing v0.6 certification remains evidence for the prior baseline only. The Owner has authorized [Engineering Exception 0010](../../../decisions/0010-owner-authorized-independent-review-control-exception.md) through 2026-08-16, permitting provisional test-only work and an explicitly unrecertified formatted working edition while the independent-review artifact remains pending. It does not waive the review requirement, authorize a certification claim, or authorize production integration.

The Markdown working edition additionally records that HAL, not a runtime, retains durable custody of Runtime Contract claims and Gateway dispositions. This is a clarification of the existing evidence and authority boundaries: a retained runtime record is not canonical knowledge, evidence acceptance, an outcome, authority, or permission by implication. Exact schemas remain implementation concerns. The Owner-approved bounded implementation direction is recorded in [DR 0002](../../../decisions/0002-runtime-contract-durable-record-model.md).

## Provisional Formatted Working Edition

Under [Engineering Exception 0010](../../../decisions/0010-owner-authorized-independent-review-control-exception.md), the runtime-sovereignty Markdown working edition was compiled as an explicitly non-recertified provisional edition on 2026-08-09. It is separate from, and does not replace, the July 27 certified baseline or the canonical final-publication manifest.

| Artifact | Location | SHA-256 |
|---|---|---|
| Markdown | [`HAL_BOOK_II_ARCHITECTURE_SPECIFICATION_PROVISIONAL_2026-08-09.md`](../../_FinalOutput/Markdown/HAL_BOOK_II_ARCHITECTURE_SPECIFICATION_PROVISIONAL_2026-08-09.md) | `c061e806fbb7dc5c1e4113bb3dfdb560a2fd4d869d826ddf0613134e19d09274` |
| DOCX | [`HAL_BOOK_II_ARCHITECTURE_SPECIFICATION_PROVISIONAL_2026-08-09.docx`](../../_FinalOutput/DOC/HAL_BOOK_II_ARCHITECTURE_SPECIFICATION_PROVISIONAL_2026-08-09.docx) | `d6db48f31a4e2918eba8008581ad289be9c4840c63bb245223ca16ee5c14bd86` |
| PDF | [`HAL_BOOK_II_ARCHITECTURE_SPECIFICATION_PROVISIONAL_2026-08-09.pdf`](../../_FinalOutput/PDF/HAL_BOOK_II_ARCHITECTURE_SPECIFICATION_PROVISIONAL_2026-08-09.pdf) | `6b6096f12132b95fab531c3bc156038eee1ba3158ddac746287fbd7928d700f9` |

The DOCX was rendered to 120 pages and visually checked. This production check verifies legibility only; it does not supply the absent independent-review disposition or Book II recertification.

## Final Audit

| Measure | Result |
|---|---:|
| Chapters complete | 35/35 |
| Constitutional decisions mapped | 58/58 |
| Material cross-chapter conflicts open | 0 |
| Constitutional contradictions identified in authoritative set | 0 |
| Visual PDF review | Passed |
| Architecture certification | Passed |

## Governing Certification

The authoritative record is:

`HAL_Book_II_Final_Constitutional_Certification_Audit_v1.0`

Certification applies to the Book II architecture specification. Future implementation and deployment artifacts require separate conformance evidence.

## Revision History

| Version | Date | Change |
|---|---|---|
| 0.6 | July 27, 2026 | Closed all Owner Review items, recorded revised authoritative editions, and linked final certification. |
| 0.7 | August 8, 2026 | Recorded the runtime-sovereignty architectural clarification in the Markdown working edition; targeted conformance recertification is pending. |
| 0.8 | August 9, 2026 | Recorded HAL custody of non-canonical Runtime Contract claims and Gateway dispositions; Owner-approved bounded implementation direction is DR 0002; targeted conformance recertification remains pending. |
| 0.9 | August 9, 2026 | Recorded Owner-authorized Engineering Exception 0010: a time-bounded, non-certifying exception to the independent-review control for provisional runtime-sovereignty documentation and test-only work only. |
