# M8 Implementation Record - Offline Desktop Interface

## Scope and boundaries

M8 implements a local desktop launcher for governed M6 inquiry with the following fixed boundaries:

- local-only, synthetic-only, deterministic, non-live-effect operation;
- packaged local renderer content only;
- strict delegation to existing M6 -> M2 -> M3 -> M4 -> M5 governed chain;
- no model/provider admission changes, no network behavior, no telemetry/analytics/crash reporting/auto-update, and no authority expansion.

## Delivered implementation surface

Added modules:

- `src/inquiry/localInquiryService.ts`
  - shared state-directory validation, request-ID generation behavior, governed M6 invocation, and fail-closed trust assessment;
  - reused by M7 and M8 to avoid safety logic drift.
- `src/m8/main.ts`
  - Electron main process bootstrap, strict local protocol registration, hardened window creation, permission denial, navigation/window-open blocking, and typed IPC handler registration.
- `src/m8/preload.ts`
  - narrow allowlisted typed bridge (`halM8`) only.
- `src/m8/renderer.ts`
  - local UI behavior for state-directory selection, submit, deliberate replay, read-only result panel updates, approved-pack status display, and request-only pack activation/deactivation actions.
- `src/m8/presentationService.ts`
  - UI-facing result mapping preserving governed fields and deterministic blocked/fail-closed rendering.
- `src/m8/ipcContracts.ts`
  - channel allowlist plus sender and payload validation helpers, including typed M9 pack request payload validation.
- `src/m8/securityPolicy.ts`
  - protocol constants, asset allowlist, strict navigation controls, and hardened web preference policy.
- `src/m8/index.ts`
  - M8 exports.
- `src/cli/m8DesktopCli.ts`
  - desktop launcher entrypoint.
- `scripts/copy-m8-assets.mjs`
  - safe local renderer asset copy into `dist`.

Added renderer assets:

- `src/m8/renderer/index.html`
- `src/m8/renderer/styles.css`

## Security controls implemented

- Local packaged content loaded via strict local protocol (`hal-m8://app/...`) with explicit asset allowlist.
- No arbitrary `file:` loading path for renderer content.
- `nodeIntegration: false`
- `contextIsolation: true`
- `sandbox: true`
- `webSecurity: true`
- restrictive CSP in renderer HTML (`connect-src 'none'`, no remote script/style origins).
- window creation denied (`setWindowOpenHandler`).
- navigation blocked unless strict local protocol + allowlisted asset.
- permission requests denied.
- no `shell.openExternal` usage.
- typed preload bridge only; no raw `ipcRenderer` exposure.
- sender/frame origin validation on each IPC invocation.
- payload validation before any inquiry action.

## Shared M7/M8 governed behavior

M7 was refactored to use the shared local inquiry service so M7 and M8 now share:

- canonical local state-directory validation behavior;
- deterministic request-ID generation algorithm;
- explicit replay semantics;
- M6 invocation path;
- M6/M4 reconstruction trust checks;
- `integrity_unavailable` fail-closed behavior.
- terminal-result-complete replay reuse: materially identical deliberate replay preserves original governed terminal outcomes (`matched`, `no_match`, `denied`, policy-blocked, and conflict where applicable), including original correlation ID and replay signaling, without issuing new M2/M3/M4/M6 writes.
- replay lookup authority is first-record anchored in governed M6 evidence so legacy duplicate records do not redefine request identity; duplicate/conflict history remains durable but non-authoritative for replay identity.

## UI contract delivered

- persistent boundary indicator (`local_only`, `synthetic_only`, `deterministic`, `non_live_effect`);
- explicit state-directory selection flow through narrow directory-picker IPC;
- single-question submit flow (main-process generated default request IDs);
- deliberate replay flow requiring explicit request ID and question;
- read-only evidence panel constrained to governed fields:
  - request ID, correlation ID, result, disposition, replay status, attestation status/effect, input classification, bounded response;
- read-only M9 panel constrained to bounded fields:
  - approved pack IDs/versions/hashes;
  - current active tuple status;
  - request-only activation/deactivation actions through typed IPC (no direct state mutation);
- no conversation memory, no answer history, no hidden context;
- integrity fail-closed rendering (`integrity_unavailable`) when trust reconstruction is unavailable.

## Durability and evidence posture

- M8 creates no transcript, UI journal, session log, answer history, or parallel durable evidence.
- M6/M2/M3/M4/M5 remain the only durable evidence chain.
- M5 backup/restore compatibility with underlying governed evidence remains unchanged.

## Desktop reliability hardening updates

- Post-build asset packaging explicitly copies compiled `dist/src/m8/renderer.js` to `dist/src/m8/renderer/renderer.js` so the allowlisted local protocol path can load the renderer module deterministically.
- Picker IPC failure handling in renderer controls is fail-closed and non-silent, using minimized status codes only (`state_directory_picker_unavailable`, `question_submission_unavailable`, `replay_submission_unavailable`, `renderer_initialization_unavailable`).
- Native directory picker failures return bounded status only (`{ selected: false, error: "state_directory_picker_unavailable" }`) without leaking raw native dialog exception text.
- Cancellation remains distinct and bounded as `state_directory_not_selected`.
- Existing-directory, canonical-path, and symlink-safe validation remains enforced in main process.
- Untrusted sender/frame/origin IPC callers remain blocked before picker action and do not receive selected local paths.

## Build and command changes

- Added Electron as the only new dependency for M8.
- Added scripts:
  - `npm run m8:copy-assets`
  - `npm run m8:desktop`

## Test coverage added for M8 and shared service

- `test/local-inquiry-service.test.ts`
  - state-dir validation safety, request-ID generation behavior, replay conflict behavior, integrity fail-closed.
- `test/m8-ipc-contracts.test.ts`
  - IPC payload allowlist and sender/frame/origin validation, including M9 pack request payload constraints.
- `test/m8-security-policy.test.ts`
  - hardened renderer policy values, strict navigation rules, and protocol asset allowlisting.
- `test/m8-preload-renderer-boundary.test.ts`
  - preload boundary checks and renderer local-only/CSP/accessibility structure checks.
- `test/m8-presentation-service.test.ts`
  - result fidelity, independent submit behavior, deliberate replay conflict behavior, deterministic blocked responses, and M5 compatibility over underlying M6 evidence.

## Non-goals reaffirmed

- No installer or distribution pipeline.
- No updater/notarization/release automation.
- No remote service integration.
- No changes to governing canon, authority boundaries, or implementation-program records.
