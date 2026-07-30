# M5 Evidence Register

**Status:** Working register for M5 assurance package  
**Scope:** HAL v0.1 M0-M4 local-only, synthetic-data-only, non-live-effect  
**Authority note:** This register is evidence bookkeeping only; it does not certify readiness or grant authority.

## 1) Evidence status scale

- `implementation-produced`: produced by implementation workflow, not independent certification
- `independently-verified`: produced and signed by independent reviewer
- `pending`: required but not yet captured or not yet independently reviewed
- `not-applicable`: intentionally out of scope for this local-only slice

## 2) Evidence fields

Each evidence item includes:

- `evidence_id`
- `claim_or_subclaim`
- `source_artifact`
- `version_or_commit_ref` (placeholder until package freeze)
- `classification`
- `retention_location`
- `verification_method`
- `reviewer_and_disposition`
- `freshness_or_review_date`
- `status`

## 3) Evidence inventory (M0-M4 + package checks)

| evidence_id  | claim_or_subclaim                               | source_artifact                                                                     | version_or_commit_ref | classification       | retention_location                | verification_method                       | reviewer_and_disposition         | freshness_or_review_date              | status                  |
| ------------ | ----------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------- | -------------------- | --------------------------------- | ----------------------------------------- | -------------------------------- | ------------------------------------- | ----------------------- |
| EV-M0-001    | C1 boundary baseline                            | `implementation/hal-core/docs/M0_EXIT_DECISION.md`                                  | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/docs/`   | record inspection                         | `Implementation team / recorded` | `2026-07-29 (record date)`            | implementation-produced |
| EV-M0-002    | C2 source traceability                          | `implementation/hal-core/docs/SOURCE_CONTROL_MANIFEST.md`                           | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/docs/`   | hash/manifest verification                | `Pending independent reviewer`   | `TBD`                                 | pending                 |
| EV-M1-001    | C1 Safe Mode/admission                          | `implementation/hal-core/docs/M1_IMPLEMENTATION_RECORD.md`                          | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/docs/`   | record inspection + test cross-check      | `Implementation team / recorded` | `TBD`                                 | implementation-produced |
| EV-M1-002    | C2 no-network boundary                          | `implementation/hal-core/test/no-network-imports.test.ts`                           | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/test/`   | automated test run                        | `Pending independent reviewer`   | `latest pre-M5 and post-M5 check run` | implementation-produced |
| EV-M1-003    | C1 deterministic admission behavior             | `implementation/hal-core/test/m1-demo.test.ts`                                      | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/test/`   | automated test run                        | `Pending independent reviewer`   | `latest check run`                    | implementation-produced |
| EV-M2-001    | C2 durable event integrity                      | `implementation/hal-core/docs/M2_IMPLEMENTATION_RECORD.md`                          | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/docs/`   | record-to-test traceability check         | `Implementation team / recorded` | `TBD`                                 | implementation-produced |
| EV-M2-002    | C2 journal implementation                       | `implementation/hal-core/src/m2/journal.ts`                                         | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/src/m2/` | code inspection + replay tests            | `Pending independent reviewer`   | `TBD`                                 | implementation-produced |
| EV-M2-003    | C2 replay/idempotency/tamper                    | `implementation/hal-core/test/m2-durable-intent.test.ts`                            | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/test/`   | automated test run                        | `Pending independent reviewer`   | `latest check run`                    | implementation-produced |
| EV-M3-001    | C1 bounded capability scope                     | `implementation/hal-core/docs/M3_IMPLEMENTATION_RECORD.md`                          | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/docs/`   | record inspection                         | `Implementation team / recorded` | `TBD`                                 | implementation-produced |
| EV-M3-002    | C2 rejected-admission durability                | `implementation/hal-core/src/m3/executionCoordinator.ts`                            | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/src/m3/` | code inspection + tests                   | `Pending independent reviewer`   | `TBD`                                 | implementation-produced |
| EV-M3-003    | C2 artifact and verification checks             | `implementation/hal-core/test/m3-bounded-capability.test.ts`                        | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/test/`   | automated test run                        | `Pending independent reviewer`   | `latest check run`                    | implementation-produced |
| EV-M4-001    | C2 final outcome attestation rules              | `implementation/hal-core/docs/M4_IMPLEMENTATION_RECORD.md`                          | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/docs/`   | record inspection                         | `Implementation team / recorded` | `TBD`                                 | implementation-produced |
| EV-M4-002    | C2 design traceability for outcome proof        | `implementation/hal-core/docs/M4_VERIFIED_OUTCOME_DESIGN.md`                        | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/docs/`   | design-to-implementation cross-check      | `Pending independent reviewer`   | `TBD`                                 | implementation-produced |
| EV-M4-003    | C2 recovery/reconstruction fail-closed behavior | `implementation/hal-core/test/m4-verified-outcome.test.ts`                          | `TBD_COMMIT_SHA`      | internal_assurance   | `implementation/hal-core/test/`   | automated test run                        | `Pending independent reviewer`   | `latest check run`                    | implementation-produced |
| EV-CHECK-001 | C3/C4 baseline formatting gate                  | `npm run format:check` output log                                                   | `TBD_RUN_ID`          | operational_evidence | `TBD_M5_EVIDENCE_DIR/checks/`     | command transcript retention              | `Pending independent reviewer`   | `2026-07-30 run`                      | implementation-produced |
| EV-CHECK-002 | C3/C4 lint gate                                 | `npm run lint` output log                                                           | `TBD_RUN_ID`          | operational_evidence | `TBD_M5_EVIDENCE_DIR/checks/`     | command transcript retention              | `Pending independent reviewer`   | `2026-07-30 run`                      | implementation-produced |
| EV-CHECK-003 | C3/C4 typecheck gate                            | `npm run typecheck` output log                                                      | `TBD_RUN_ID`          | operational_evidence | `TBD_M5_EVIDENCE_DIR/checks/`     | command transcript retention              | `Pending independent reviewer`   | `2026-07-30 run`                      | implementation-produced |
| EV-CHECK-004 | C3/C4 deterministic test baseline               | `npm run test` output log (50 tests)                                                | `TBD_RUN_ID`          | operational_evidence | `TBD_M5_EVIDENCE_DIR/checks/`     | command transcript retention              | `Pending independent reviewer`   | `2026-07-30 run`                      | implementation-produced |
| EV-CHECK-005 | C4 dependency security baseline                 | `npm run security:scan` output log (`0 vulnerabilities`)                            | `TBD_RUN_ID`          | security_evidence    | `TBD_M5_EVIDENCE_DIR/checks/`     | command transcript retention              | `Pending independent reviewer`   | `2026-07-30 run`                      | implementation-produced |
| EV-M5-001    | C5 Owner decision trace                         | `implementation/hal-core/docs/M5_OWNER_READINESS_DECISION.md`                       | `TBD_COMMIT_SHA`      | governance_evidence  | `implementation/hal-core/docs/`   | decision record inspection                | `Owner / pending signature`      | `decision date in record`             | implementation-produced |
| EV-M5-002    | C3 runbook readiness                            | `implementation/hal-core/docs/M5_LOCAL_OPERATIONS_AND_RECOVERY_RUNBOOK.md`          | `TBD_COMMIT_SHA`      | operational_evidence | `implementation/hal-core/docs/`   | procedural completeness review            | `Pending independent reviewer`   | `TBD`                                 | implementation-produced |
| EV-M5-003    | C2/C5 independent verification protocol         | `implementation/hal-core/docs/M5_INDEPENDENT_VERIFICATION_PROTOCOL.md`              | `TBD_COMMIT_SHA`      | assurance_evidence   | `implementation/hal-core/docs/`   | protocol completeness review              | `Pending independent reviewer`   | `TBD`                                 | implementation-produced |
| EV-M5-004    | C3 reproducibility evidence (Owner-run)         | `implementation/hal-core/docs/M5_OWNER_RUN_REPRODUCIBILITY_RECORD.md`               | `TBD_COMMIT_SHA`      | operational_evidence | `implementation/hal-core/docs/`   | reproducibility record inspection         | `Owner-run / observed evidence`  | `2026-07-30`                          | implementation-produced |
| EV-M5-005    | C2/C3 local backup/restore implementation       | `implementation/hal-core/docs/M5_LOCAL_BACKUP_AND_RESTORE_IMPLEMENTATION_RECORD.md` | `TBD_COMMIT_SHA`      | operational_evidence | `implementation/hal-core/docs/`   | implementation-to-test traceability check | `Pending independent reviewer`   | `2026-07-30`                          | implementation-produced |

## 4) Required runtime artifact evidence (capture plan)

These items are required evidence inputs for M5 but are expected to be captured by execution of the verification protocol:

| evidence_id | required artifact                                                         | capture location                                               | verification method                 | status                  |
| ----------- | ------------------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------- | ----------------------- |
| EV-ART-001  | M2 journal snapshot (`m2-event-journal.jsonl`)                            | `implementation/hal-core/test/m5-local-backup-restore.test.ts` | hash + integrity-chain verification | implementation-produced |
| EV-ART-002  | M3 journal snapshot (`m3-event-journal.jsonl`)                            | `implementation/hal-core/test/m5-local-backup-restore.test.ts` | hash + integrity-chain verification | implementation-produced |
| EV-ART-003  | M4 journal snapshot (`m4-event-journal.jsonl`)                            | `implementation/hal-core/test/m5-local-backup-restore.test.ts` | hash + integrity-chain verification | implementation-produced |
| EV-ART-004  | M3 artifact hash inventory                                                | `implementation/hal-core/test/m5-local-backup-restore.test.ts` | recompute hash and compare          | implementation-produced |
| EV-ART-005  | reconstruction output bundle (M2/M3/M4)                                   | `implementation/hal-core/test/m5-local-backup-restore.test.ts` | correlation/linkage review          | implementation-produced |
| EV-ART-006  | tamper and mismatch negative-path outputs                                 | `implementation/hal-core/test/m5-local-backup-restore.test.ts` | expected fail-closed assertions     | implementation-produced |
| EV-ART-007  | M4 positive correlation evidence (`dc142aaa-4647-4483-b216-d30eb2f2e856`) | `TBD_M5_EVIDENCE_DIR/reconstruction/`                          | verify correlation linkage to M4    | implementation-produced |
| EV-ART-008  | local Owner-run reproducibility evidence bundle                           | `TBD_M5_EVIDENCE_DIR/`                                         | confirm journals/artifacts/hash set | implementation-produced |

## 5) Independent evidence and not-applicable declarations

### 5.1 Independent evidence required but missing

Until independent review is completed, no item in this register may be claimed as `independently-verified`.

### 5.2 Not applicable (current slice)

| evidence_id | description                                  | reason                                        | status         |
| ----------- | -------------------------------------------- | --------------------------------------------- | -------------- |
| EV-NA-001   | live-effect certification evidence           | current scope is non-live-effect local-only   | not-applicable |
| EV-NA-002   | external-domain/Treaty runtime evidence      | no active external integration in M0-M4 slice | not-applicable |
| EV-NA-003   | production authentication authority evidence | real auth is out of current scope             | not-applicable |

## 6) Evidence handling notes

- This register is append-by-supersession; do not silently rewrite prior dispositions.
- Any stale evidence must be marked `pending` or `inconclusive` until refreshed.
- If any evidence integrity check fails, dependent claims must be downgraded and decision posture must fail closed.
- M5 decision state remains `not_ready`; independent review and tested backup/restore remain open closure conditions.
