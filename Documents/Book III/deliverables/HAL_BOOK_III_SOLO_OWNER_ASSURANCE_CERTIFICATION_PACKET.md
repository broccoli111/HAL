# Book III Solo-Owner Assurance Amendment — Certification Packet

> **Status:** Prepared for independent high-risk review. This packet is not a certification or release decision.

## Scope

This packet covers the Owner-authorized Book III working amendment recorded in [DR 0023](../../../decisions/0023-solo-owner-assurance-profile.md): the risk-scaled Solo-Owner Assurance Profile in Book III Chapter 8 §11.1–§11.2 and its consistent verification-method references across Chapters 1–9.

The change does not amend Book I or Book II. It permits documented Owner assurance only for eligible routine, reversible, non-production work; it retains independent review for production release and defined high-risk milestones.

## Reviewer Inputs Required

| Field | Required entry |
| --- | --- |
| Reviewer identity / role |  |
| Review date |  |
| Independence statement |  |
| Sources and evidence reviewed |  |
| Findings / limitations |  |
| Disposition | Pass / Pass with limitations / Nonconformance |
| Review or expiry date |  |
| Durable attestation reference |  |

## Required Checks

1. Confirm Book I remains supreme and Owner authority is unchanged.
2. Confirm the profile does not equate Owner assurance with independent review or certification.
3. Confirm the profile is limited to routine, reversible, non-production work.
4. Confirm independent review remains required for production and the stated high-risk threshold.
5. Confirm the reusable template requires risk, source, evidence, findings, and rollback/containment records.
6. Confirm the Chapter 8 source, combined Markdown working edition, and generation script are consistent.
7. Confirm the change is clearly labeled as a working amendment and does not misrepresent the existing formatted Book III editions as updated/certified.

## Local Verification Instructions

From the repository root, run:

```sh
sh scripts/verify_book_iii_solo_owner_assurance.sh
```

Expected outcome: `PASS: Book III Solo-Owner Assurance working-amendment verification completed.` The runner performs only local validation: static source consistency checks, Python compilation of the Book III generator, existing test gates, and whitespace/diff integrity checks. It opens no network connection, invokes no Hermes process, and changes no GX10 state.

## Certification Boundary

Do not mark the amendment certified solely because this runner passes. A qualified independent reviewer must complete the inputs above and attest the defined scope. Only then may a controlled follow-up regenerate Book III formatted editions and update the certified baseline.

## Current Limitations

- Existing Book III DOCX/PDF editions remain the prior certified baseline.
- The Book III generator is not to be run as part of this packet; regeneration requires its own controlled release step because it writes formatted artifacts.
- The Solo-Owner Assurance Profile cannot be used to self-certify this high-risk assurance-process amendment.
