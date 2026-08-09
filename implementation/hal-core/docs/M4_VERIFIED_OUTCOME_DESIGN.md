# M4 — Verified Outcome and Recovery Proof Design

**Status:** Proposed; required before M4 implementation  
**Scope:** Final local outcome attestation for the single M3 synthetic inspection capability  
**Authority:** Book I controls. M4 adds no new capability, Provider, model, external integration, database, real authentication, or live-effect authority.

## 1. M4 objective

M4 makes HAL’s outcome claim depend on verified evidence rather than a decision or attempted execution alone. A final local success may be recorded only when the linked M3 artifact and Verification Record are present, integrity-valid, mutually consistent, and verified.

M2 outcomes remain provisional process dispositions. M4 creates the final Outcome Attestation for the end-to-end local path.

## 2. Outcome attestation rule

```text
M2 Intent → Plan → Decision → Transaction
  → M3 Capability Request → Attempt → Artifact → Verification
  → M4 Outcome Attestation
```

- A final `achieved_without_effect` attestation requires M3 `VerificationRecord.verified === true` and a successful attempt linked to the same correlation, request, transaction, decision, intent, and plan.
- `allow` alone is never success.
- An artifact alone is never success.
- Provider-reported success alone is never success.
- A final `blocked`, `failed_no_effect`, `cancelled_no_effect`, `timed_out_no_effect`, or `verification_rejected_no_effect` attestation must truthfully represent the terminal evidence and claim no external effect.
- An uncertain, missing, corrupted, or contradictory input fails closed and produces `verification_rejected_no_effect` or `incomplete_evidence_no_effect`.

## 3. Authoritative M4 records

| Domain              | Sole mutation owner         | Required contents                                                                                                                             |
| ------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Outcome Attestation | Outcome Attestation Service | attestation ID, correlation, all upstream IDs, terminal status, claimed effect, evidence references, uncertainty, integrity hash, timestamps. |
| Recovery Case       | Recovery Coordinator        | case ID, affected correlation, failure category, preserved evidence, restriction state, recovery disposition.                                 |
| Explanation         | Explanation Service         | explanation ID, audience-safe summary, authority/decision/evidence links, limitations, uncertainty, integrity hash.                           |

M4 records are append-only. Their derived views and CLI output never become authoritative.

## 4. Terminal outcome states

| State                             | Required evidence                                                                                                | Claimed effect    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------- |
| `achieved_without_effect`         | Valid M3 attempt succeeded, artifact and verification are integrity-valid, verification passed, all links match. | `inspection_only` |
| `blocked`                         | M2 Decision is deny/approval-required, or M3 admission was denied.                                               | `none`            |
| `failed_no_effect`                | M3 attempt failed before verified completion.                                                                    | `none`            |
| `cancelled_no_effect`             | M3 attempt cancelled and no verified result accepted.                                                            | `none`            |
| `timed_out_no_effect`             | M3 attempt timed out and no verified result accepted.                                                            | `none`            |
| `verification_rejected_no_effect` | Artifact/verification failed, is tampered, or evidence conflicts.                                                | `none`            |
| `incomplete_evidence_no_effect`   | Required trace record is absent or unreadable.                                                                   | `none`            |

## 5. Reconstruction and recovery requirements

1. M4 must reconstruct the complete trace by correlation ID from M2 and M3 journals without relying on in-memory state.
2. It must verify every journal integrity chain before accepting evidence.
3. It must cross-check all ID links and correlation IDs across M2/M3/M4 records.
4. It must verify M3 artifact and verification integrity before outcome attestation.
5. A corrupt or incomplete journal, malformed record, artifact tamper, provider failure, cancellation, timeout, duplicate request, or conflicting request must preserve evidence and create a restricted Recovery Case.
6. Recovery may reconstruct and explain. It must not silently rerun a capability or alter history.

## 6. Explanation contract

For each attestation, the local CLI must produce a concise, human-readable explanation containing:

- what was requested and what capability was considered;
- exact final outcome and claimed effect;
- whether an M3 attempt ran;
- relevant decision and verification result;
- evidence and artifact references;
- explicit statement that no external effect occurred;
- uncertainty, limitation, or recovery restriction where applicable.

It must never expose fixture contents, secrets, raw file paths, or unnecessary internal payloads.

## 7. M4 acceptance evidence

- [ ] Verified M3 success produces exactly one `achieved_without_effect` Outcome Attestation.
- [ ] Denied/approval-required M2 paths produce `blocked` and do not claim success.
- [ ] Failed, cancelled, and timed-out attempts produce the corresponding truthful no-effect state.
- [ ] Artifact/journal tampering and missing evidence fail closed and create a Recovery Case.
- [ ] Duplicate requests do not create duplicate final success attestations.
- [ ] Full cross-journal reconstruction works after a fresh process view.
- [ ] Explanation is accurate, bounded, and redacted.
- [ ] No new capability, external network, model, database, real authentication, or live-effect behavior is introduced.
- [ ] Format, lint, typecheck, tests, and dependency-security scan pass.
