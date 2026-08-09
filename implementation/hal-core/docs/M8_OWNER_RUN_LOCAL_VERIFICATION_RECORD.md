# M8 Owner-Run Local Verification Record

**Status:** Owner-run local verification evidence record (bounded, local-only)  
**Scope:** HAL current M0-M8 local-only implementation slice  
**Evidence type:** Owner-run local verification evidence only (not independent verification, not certification)

## 1) Purpose and explicit limitations

This record captures directly observed bounded outcomes from Owner-run local M8 verification activity.

- This record is Owner-run local verification evidence only.
- This record is not independent verification.
- This record is not certification.
- This record does not grant readiness uplift, authority expansion, or scope expansion.
- This record is limited to local-only, synthetic-only, deterministic, non-live-effect operation.

## 2) Execution context (bounded)

- Branch: `feature/m8-owner-run-local-verification`
- Baseline branch source: `main` (confirmed equal to `origin/main`)
- M8 reliability merge commit on `main`: `103788fe896bb438d5c09b9f8d12da6bf9291127`
- Required replay integrity fix presence: `b1f757a` present on `main`
- M8 desktop implementation presence: confirmed on `main`
- M8 directory-picker reliability and renderer-asset packaging fixes: confirmed on `main`
- Runtime environment details beyond this bounded context: `not retained`

## 3) Baseline command outcomes (directly observed)

| command                                                    | observed outcome                                              |
| ---------------------------------------------------------- | ------------------------------------------------------------- |
| `npm --prefix "implementation/hal-core" run format:check`  | exited successfully; formatting check passed                  |
| `npm --prefix "implementation/hal-core" run lint`          | exited successfully                                           |
| `npm --prefix "implementation/hal-core" run typecheck`     | exited successfully                                           |
| `npm --prefix "implementation/hal-core" run test`          | exited successfully; 17 test files passed; 131 tests passed   |
| `npm --prefix "implementation/hal-core" run security:scan` | exited successfully; `npm audit` reported `0 vulnerabilities` |

## 4) M8 scenario observations (bounded fields only)

No raw question text, raw answer text, or raw unsafe input is retained in this record.

| scenario                                      | request ID                                     | correlation ID                         | observed outcome                                                                                                  |
| --------------------------------------------- | ---------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| no-match inquiry                              | `m8-desktop-request-00ms973wfb0006f0ede2d090f` | `0eb06d80-440f-471a-905c-b9440b28d2b2` | `no_match`; `completed_without_effect`; `replayed=false`; `achieved_without_effect`; `externalEffect=none`        |
| unsafe-input denial, original governed record | `m8-desktop-request-00ms974u7x00084ae7eefbe99` | `7e7bce4d-8113-40ae-ae05-bc01ac133dbf` | `denied`; `blocked`; `REJ_INJECTION_LIKE`; `externalEffect=none`                                                  |
| deliberate replay of the unsafe-input denial  | `m8-desktop-request-00ms974u7x00084ae7eefbe99` | `7e7bce4d-8113-40ae-ae05-bc01ac133dbf` | `denied`; `blocked`; `replayed=true`; original correlation preserved; `REJ_INJECTION_LIKE`; `externalEffect=none` |
| state-directory picker                        | `not_applicable`                               | `not_applicable`                       | desktop picker successfully opened and an existing local state directory was selected                             |
| matched inquiry                               | `not retained in supplied observation`         | `not retained in supplied observation` | `matched`; local synthetic evidence only; `externalEffect=none`                                                   |

## 5) Additional required scenario statuses

The following required scenarios are tracked as part of M8 local verification scope but have no additional bounded observations retained in this record beyond scenario-class acknowledgement:

- deliberate replay of a matched/no-match inquiry: `TBD`
- same request ID with materially different input conflict: `TBD`
- M8 close/relaunch and continued use of existing governed local state: `TBD`
- no-network/no-external-effect confirmation across full scenario set: `TBD` (partial bounded observations above show `externalEffect=none`)

## 6) Data minimization and retention constraints

Retained in this record:

- bounded IDs;
- result classes;
- disposition;
- replay status;
- classification (`REJ_INJECTION_LIKE`) where observed;
- boundary effect statements (`externalEffect=none`);
- local-only scope statements.

Not retained in this record:

- raw unsafe input;
- raw questions or answers;
- full local filesystem paths;
- exception details;
- raw terminal diagnostics;
- screenshots;
- evidence bundle hash inventories.

## 7) Assurance boundary statement

This record does not alter the existing `ready_to_remain_local_only` posture and does not change review-expiry or authority statements. It remains an implementation-produced, Owner-run local evidence artifact within the existing M6/M2/M3/M4/M5 governed evidence chain.
