# M5 Owner-Run Backup and Restore Evidence Record

**Status:** implementation-produced Owner-run reproducibility evidence  
**Scope:** HAL v0.1 local-only M0-M4 slice with M5 local backup/restore controls  
**Run type:** pre-independent-verification evidence capture (not independent verification)

## 1) Purpose, boundary, and explicit limits

This record captures a local Owner-run reproducibility exercise for M1/M4 scenario behavior and M5 backup/verify/restore controls using disposable local state only.

- This record is **not** independent verification.
- This record is **not** certification.
- This record does **not** change authority or readiness posture.
- Independent review remains an explicit residual risk and is required for any stronger assurance claim or scope expansion.

## 2) Reviewed commit and environment fingerprint

- Reviewed commit SHA: `7eeff03880db5e418850311996f81e4dd7ac96e6`
- Node.js version: `v26.5.0`
- npm version: `12.0.1`
- Branch: `feature/m5-verification-evidence`
- Captured git status evidence: `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/preflight/00_environment_and_git_fingerprint.txt`

## 3) Baseline check execution (pre-documentation run)

Executed from `implementation/hal-core` via explicit `npm --prefix` commands:

- `npm run format:check` -> pass
- `npm run lint` -> pass
- `npm run typecheck` -> pass
- `npm run test` -> pass (`66` tests passed across `9` files)
- `npm run security:scan` -> pass (`found 0 vulnerabilities`)

Evidence:

- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/preflight/01_format_check.txt`
- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/preflight/02_lint.txt`
- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/preflight/03_typecheck.txt`
- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/preflight/04_test.txt`
- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/preflight/05_security_scan.txt`

Post-documentation re-run results also passed with identical test and security outcomes:

- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/postflight/01_format_check.txt`
- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/postflight/02_lint.txt`
- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/postflight/03_typecheck.txt`
- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/postflight/04_test.txt`
- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/postflight/05_security_scan.txt`

## 4) Required local configuration (M1/M2 precondition)

Captured configuration:

```bash
export HAL_ENVIRONMENT=development
export HAL_SAFE_MODE=restrictive
export HAL_OWNER_ID=owner_m5_verification
```

Evidence:

- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/scenarios/00_m1_m2_local_configuration.txt`

## 5) Scenario outcomes

### 5.1 M1 admission paths

| Path              | Correlation ID                         | Observed decision   | Claimed effect    | Evidence                                                                                                                            |
| ----------------- | -------------------------------------- | ------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| allowed           | `83f70c1b-7064-48bc-91df-6d0d4ad64356` | `allow`             | `inspection_only` | `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/scenarios/01_m1_allowed.txt`           |
| approval-required | `f571596c-846e-440c-8153-124a9453e672` | `approval_required` | `none`            | `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/scenarios/02_m1_approval_required.txt` |
| denied            | `4da3e66f-5dc2-47ae-b039-baa7afb0b842` | `deny`              | `none`            | `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/scenarios/03_m1_denied.txt`            |

### 5.2 M4 scenarios

| Scenario                    | Correlation ID                         | Observed outcome                  | Claimed effect    | Evidence                                                                                                                                    |
| --------------------------- | -------------------------------------- | --------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowed_verified`          | `a2278e97-7357-4c1e-9963-4c434e90cbd7` | `achieved_without_effect`         | `inspection_only` | `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/scenarios/11_m4_allowed_verified.txt`          |
| `blocked_approval_required` | `dd22d5b8-138b-41bd-be74-4df6e376abcb` | `blocked`                         | `none`            | `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/scenarios/12_m4_blocked_approval_required.txt` |
| `blocked_denied`            | `554a9ac8-7c16-4de2-bcda-e6ead43a8be0` | `blocked`                         | `none`            | `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/scenarios/13_m4_blocked_denied.txt`            |
| `cancelled`                 | `76308c08-d66b-4a01-9237-475b32369da8` | `cancelled_no_effect`             | `none`            | `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/scenarios/14_m4_cancelled.txt`                 |
| `timed_out`                 | `5561ed12-5f13-4c22-8a91-7ad5f66f98ac` | `timed_out_no_effect`             | `none`            | `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/scenarios/15_m4_timed_out.txt`                 |
| `verification_rejected`     | `c59eecbe-b0a2-4179-a97c-10562f71986f` | `verification_rejected_no_effect` | `none`            | `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/scenarios/16_m4_verification_rejected.txt`     |
| `incomplete_evidence`       | `0799ccad-d193-4341-88de-26834342af00` | `incomplete_evidence_no_effect`   | `none`            | `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/scenarios/17_m4_incomplete_evidence.txt`       |

Full parsed summary:

- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/ids/m1_outcomes.psv`
- `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/ids/m4_scenarios.psv`

## 6) M5 backup / verify / restore / reconstruction references

- Source M4 correlation ID (fresh `allowed_verified` source state): `7db73d83-ef0c-4618-9f20-7dff926906f5`
- Snapshot directory: `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/state/m5-backups/m5_snapshot_23e8970e-cc63-45db-92cf-641143c550c2`
- Snapshot ID: `m5_snapshot_23e8970e-cc63-45db-92cf-641143c550c2`
- Manifest path: `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/state/m5-backups/m5_snapshot_23e8970e-cc63-45db-92cf-641143c550c2/manifest.json`
- Manifest integrity hash: `679c351a407c093ce21434f654b88ca1adc71f12c3e46b19d9b0a2a66bad9eca`
- Backup operation record ID: `m5_operation_record_79c580ba-9654-40b4-978f-5975d62d10c4`
- Verify operation record ID: `m5_operation_record_6621a5da-fa5f-4f6d-9d99-17ad771ef7a2`
- Restore operation record ID: `m5_operation_record_9086e6dc-bf9a-4988-94d7-c0457cd8bb70`
- Operation journal: `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/state/m5-ops/m5-backup-restore-journal.jsonl`
- Restored target: `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/state/m5-restore/restored-allowed-verified`
- Restored-state reconstruction evidence: `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/commands/m5/05b_m4_reconstruct_restored_success.txt`

Reconstruction validation observed:

- `m2IntegrityValid=true`
- `m3IntegrityValid=true`
- `m4IntegrityValid=true`
- `finalOutcomeStatus=achieved_without_effect`
- `claimedEffect=inspection_only`
- `boundedSummary ... externalEffect=none`

## 7) Retained local evidence bundle and inventory

Repository-relative placeholder for retained bundle:

```text
implementation/hal-core/local-state/m5/evidence-package/<run-id>/
```

Run captured for this record:

```text
implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/
```

Bundle contents include:

- command transcripts (`commands/preflight`, `commands/scenarios`, `commands/m5`);
- correlation and identifier extracts (`ids/`);
- M2/M3/M4 journals (`state/...` plus `journals/`);
- M3 artifacts (`state/.../m3-artifacts` plus `artifacts/m3_source/`);
- M5 snapshot manifest and payload (`state/m5-backups/...` plus `artifacts/m5_snapshot/`);
- M5 operation journal (`state/m5-ops/m5-backup-restore-journal.jsonl`);
- restored-state reconstruction output (`reconstruction/restored_state_m4_reconstruction.txt`).

SHA-256 integrity inventory:

- file: `implementation/hal-core/local-state/m5/evidence-package/m5-pre-iv-20260730T190603Z/inventory/sha256sum.txt`
- entries captured: `81`

## 8) Assurance boundary statement

This is Owner-run reproducibility evidence only. It is not independent verification and not certification. Independent review remains an explicit residual risk and a prerequisite for any stronger assurance claim or scope expansion.
