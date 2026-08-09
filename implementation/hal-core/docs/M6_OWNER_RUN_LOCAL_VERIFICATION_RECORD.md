# M6 Owner-Run Local Verification Record

**Status:** Fillable Owner-run local evidence record template  
**Scope:** HAL current local-only implementation boundary with M6 deterministic inquiry behavior  
**Evidence type:** Owner-run local evidence only (not independent verification or certification)

## 1) Purpose and explicit limitations

This record is for documenting an Owner-run local verification execution using approved local commands and retained evidence artifacts.

- This record is not independent verification.
- This record is not certification.
- This record does not grant authority expansion, readiness uplift, or scope expansion.
- Any stronger assurance claim requires independent review.

## 2) Review metadata (fillable)

- Reviewed commit SHA/version: `TBD_COMMIT_OR_TAG`
- Verification date/time (UTC): `TBD_UTC_TIMESTAMP`
- Operator name/identifier: `TBD_OPERATOR_ID`
- Reviewer role statement: `Owner-run local operator`
- Evidence package root: `TBD_EVIDENCE_PACKAGE_PATH`
- Record version: `m6_owner_run_local_verification_record.v1`

## 3) Machine and runtime fingerprint (fillable)

- OS/platform: `TBD_OS_PLATFORM`
- Node.js version: `TBD_NODE_VERSION`
- npm version: `TBD_NPM_VERSION`
- Repository branch at execution time: `TBD_BRANCH_NAME`
- Clean working tree observed before run (`yes/no`): `TBD`

## 4) Required command execution log (fillable)

Use one row per required command in the runbook and attach transcript reference paths.

| command_id  | command (exact)                                                               | transcript reference | request ID (if applicable) | correlation ID observed | observed outcome (bounded) | attestation observed    | operator attestation |
| ----------- | ----------------------------------------------------------------------------- | -------------------- | -------------------------- | ----------------------- | -------------------------- | ----------------------- | -------------------- |
| CMD-BASE-01 | `npm --prefix "implementation/hal-core" run format:check`                     | `TBD`                | `not_applicable`           | `not_applicable`        | `TBD`                      | `not_applicable`        | `TBD`                |
| CMD-BASE-02 | `npm --prefix "implementation/hal-core" run lint`                             | `TBD`                | `not_applicable`           | `not_applicable`        | `TBD`                      | `not_applicable`        | `TBD`                |
| CMD-BASE-03 | `npm --prefix "implementation/hal-core" run typecheck`                        | `TBD`                | `not_applicable`           | `not_applicable`        | `TBD`                      | `not_applicable`        | `TBD`                |
| CMD-BASE-04 | `npm --prefix "implementation/hal-core" run test`                             | `TBD`                | `not_applicable`           | `not_applicable`        | `TBD`                      | `not_applicable`        | `TBD`                |
| CMD-BASE-05 | `npm --prefix "implementation/hal-core" run security:scan`                    | `TBD`                | `not_applicable`           | `not_applicable`        | `TBD`                      | `not_applicable`        | `TBD`                |
| CMD-M6-01   | fresh matched inquiry command                                                 | `TBD`                | `TBD`                      | `TBD`                   | `TBD`                      | `TBD`                   | `TBD`                |
| CMD-M6-02   | no-match inquiry command                                                      | `TBD`                | `TBD`                      | `TBD`                   | `TBD`                      | `TBD`                   | `TBD`                |
| CMD-M6-03   | unsafe-input rejection command                                                | `TBD`                | `TBD`                      | `TBD`                   | `TBD`                      | `TBD`                   | `TBD`                |
| CMD-M6-04   | M2 `approval_required` blocked inquiry command                                | `TBD`                | `TBD`                      | `TBD`                   | `TBD`                      | `TBD`                   | `TBD`                |
| CMD-M6-05A  | replay first invocation command                                               | `TBD`                | `TBD`                      | `TBD`                   | `TBD`                      | `TBD`                   | `TBD`                |
| CMD-M6-05B  | replay second invocation command (`replayed: true` expected)                  | `TBD`                | `TBD`                      | `TBD`                   | `TBD`                      | `TBD`                   | `TBD`                |
| CMD-M6-06A  | request-ID conflict baseline invocation command                               | `TBD`                | `TBD`                      | `TBD`                   | `TBD`                      | `TBD`                   | `TBD`                |
| CMD-M6-06B  | request-ID conflict second invocation command (materially different question) | `TBD`                | `TBD`                      | `TBD`                   | `TBD`                      | `TBD`                   | `TBD`                |
| CMD-M5-07   | M5 backup command                                                             | `TBD`                | `TBD_OR_NOT_APPLICABLE`    | `TBD`                   | `TBD`                      | `TBD_OR_NOT_APPLICABLE` | `TBD`                |
| CMD-M5-08   | M5 verify command                                                             | `TBD`                | `not_applicable`           | `TBD`                   | `TBD`                      | `not_applicable`        | `TBD`                |
| CMD-M5-09   | M5 restore command                                                            | `TBD`                | `not_applicable`           | `TBD`                   | `TBD`                      | `not_applicable`        | `TBD`                |
| CMD-M6-10   | reconstructed M6 evidence command (restored state)                            | `TBD`                | `not_applicable`           | `TBD`                   | `TBD`                      | `not_applicable`        | `TBD`                |

## 5) Scenario evidence summary (fillable)

| scenario                                               | request ID | correlation ID | expected bounded outcome                                          | observed bounded outcome | completed (`yes/no`) |
| ------------------------------------------------------ | ---------- | -------------- | ----------------------------------------------------------------- | ------------------------ | -------------------- |
| fresh matched inquiry                                  | `TBD`      | `TBD`          | `matched; completed_without_effect; replayed=false`               | `TBD`                    | `TBD`                |
| no-match inquiry                                       | `TBD`      | `TBD`          | `no_match; completed_without_effect; replayed=false`              | `TBD`                    | `TBD`                |
| unsafe-input rejection                                 | `TBD`      | `TBD`          | `denied; blocked; deterministic reason code`                      | `TBD`                    | `TBD`                |
| M2 `approval_required` blocked inquiry                 | `TBD`      | `TBD`          | `blocked; reason=m2_approval_required`                            | `TBD`                    | `TBD`                |
| replay same request ID and identical question          | `TBD`      | `TBD`          | `second invocation replayed=true; governed result reuse`          | `TBD`                    | `TBD`                |
| request-ID conflict with materially different question | `TBD`      | `TBD`          | `second invocation blocked; reason=request_id_conflict`           | `TBD`                    | `TBD`                |
| M5 backup/verify/restore + reconstructed M6 evidence   | `TBD`      | `TBD`          | `backup/verify/restore ok=true; reconstruction shows M6 evidence` | `TBD`                    | `TBD`                |

## 6) Backup snapshot and manifest references (fillable)

- Backup snapshot directory: `TBD_SNAPSHOT_DIRECTORY`
- Backup snapshot ID: `TBD_SNAPSHOT_ID`
- Manifest path: `TBD_MANIFEST_PATH`
- Manifest integrity hash: `TBD_MANIFEST_INTEGRITY_HASH_SHA256`
- Backup operation record ID: `TBD_BACKUP_OPERATION_RECORD_ID`
- Verify operation record ID: `TBD_VERIFY_OPERATION_RECORD_ID`
- Restore operation record ID: `TBD_RESTORE_OPERATION_RECORD_ID`
- M5 operation journal path: `TBD_OPERATION_JOURNAL_PATH`

## 7) Evidence bundle and checksum references (fillable)

- Evidence bundle root: `TBD_BUNDLE_ROOT`
- Command transcript index: `TBD_TRANSCRIPT_INDEX_PATH`
- Checksum inventory file: `TBD_CHECKSUM_FILE_PATH`
- Checksum algorithm: `SHA-256`
- Additional retained artifacts: `TBD_ADDITIONAL_ARTIFACT_LIST`

## 8) Assurance boundary attestation (fillable)

Operator attests that this record remains within:

- local-only operation;
- synthetic-only data;
- deterministic bounded behavior;
- non-live-effect outcomes;
- no model, network, private-file, external-tool, or real-world authority expansion.

Operator attestation statement:

`TBD_OPERATOR_ATTESTATION_STATEMENT`

## 9) Owner confirmation/signature placeholder

- Owner name/identifier: `TBD_OWNER_IDENTIFIER`
- Owner confirmation/signature: `TBD_OWNER_SIGNATURE_OR_CONFIRMATION`
- Confirmation date/time (UTC): `TBD_OWNER_CONFIRMATION_TIMESTAMP`

---

No check in this template is pre-marked complete. Populate only from directly observed Owner-run evidence for the exact command and scenario executed.
