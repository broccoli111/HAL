# M7 Implementation Record - Local Inquiry Session (Terminal-Only)

## Scope and boundaries

M7 implements a local interactive terminal session constrained to:

- terminal-only interface (no GUI/browser);
- local-only state directory and execution;
- synthetic-only, deterministic, non-live-effect inquiry outcomes;
- mandatory delegation of each inquiry to existing M6 governed path;
- no model/provider/network/tool/database/auth/authority expansion.

## Delivered implementation surface

Implemented modules:

- `src/m7/session.ts`
  - state-directory validation and fail-closed admission;
  - exact command grammar parser (`help`, `status`, `ask`, `exit`);
  - request-ID generation for plain asks with `m7-session-request-` prefix;
  - explicit replay path parsing (`ask --request-id <id> --replay-intent <question>`);
  - M6 delegation and output rendering;
  - success-path reconstruction trust check using M6 and M4 reconstruction;
  - fail-closed blocked rendering for malformed command, interruption, M6 failure, and integrity-unavailable outcomes.
- `src/m7/index.ts`
  - M7 runtime exports.
- `src/cli/m7SessionCli.ts`
  - interactive terminal entrypoint using Node.js built-ins only.

Package script added:

- `npm run m7:session` -> `npm run build && node ./dist/src/cli/m7SessionCli.js`

## Command contract implemented

Admitted commands only:

- `help`
- `status`
- `ask <question>`
- `ask --request-id <id> --replay-intent <question>`
- `exit`

No additional commands are accepted. Malformed or unknown command grammar is rejected before M6 invocation.

## State-directory safety controls implemented

Before session start, M7 requires explicit `--state-dir` and applies:

1. reject URL-like values;
2. resolve to absolute path;
3. ensure local directory exists;
4. reject symlink root;
5. reject symlink-resolved ambiguity (`realpath` mismatch);
6. require read/write/execute access;
7. run read/write probe and remove probe file.

Any failure blocks startup (fail closed).

## Inquiry delegation and session-state model

- Every `ask` invocation calls `runM6Inquiry()` with `stateDirectory`, `questionText`, and request ID.
- Plain `ask <question>` generates a fresh local request ID and prints it as `generatedRequestId`.
- Explicit request-ID reuse occurs only via the replay form.
- M7 session state is process-local memory only:
  - start time;
  - inquiry count;
  - last request ID / correlation ID / result / disposition summary.
- M7 does not persist session transcripts, raw question history, rendered answers, or excerpts.

## Result fidelity and integrity trust check

M7 prints M6 result fields:

- `requestId`
- `correlationId`
- `result`
- `disposition`
- `replayed`
- `attestationStatus`
- `attestationClaimedEffect`
- `inputClassification`
- `response` (bounded M6 rendered response)

Before displaying successful (`completed_without_effect`) results, M7 reconstructs and validates trust from:

- `reconstructM6Trace(stateDirectory, correlationId)`
- `reconstructM4Trace(stateDirectory, correlationId)`

Required trust conditions:

- M6 evidence exists and latest M6 disposition is `completed_without_effect`;
- M4 integrity flags are valid;
- M4 cross-journal linkage is valid;
- M4 attestation status/effect are available and consistent with M6 result.

If trust is unavailable, M7 fails closed and emits:

- `result: integrity_unavailable`
- `disposition: blocked`
- `replayed: false`

## Failure and containment behavior

M7 blocks without synthesizing success on:

- interrupted input stream;
- malformed command grammar;
- M6 invocation failure;
- untrusted or unavailable reconstruction/integrity outcome.

## M5 compatibility posture

M7 does not implement backup/restore logic. M5 remains the sole backup/verify/restore authority for durable inquiry evidence. M7 usage remains compatible with M5 backup/restore and M6 reconstruction of restored state.

## Test coverage added

`test/m7-local-inquiry-session.test.ts` covers:

- startup and required state-dir validation;
- generated request IDs;
- exact replay syntax and conflict behavior;
- command grammar rejection;
- M6 result fidelity for matched, no-match, denied, and blocked;
- no cross-question context;
- non-persistence of raw question/answer/excerpt/session transcript;
- status metadata minimization;
- interrupted-session safety;
- symlink/unsafe state-dir rejection;
- integrity-unavailable fail-closed handling;
- no-network/no-external-effect posture through result evidence;
- M5 backup/restore and restored M6 reconstruction compatibility.

## Non-goals reaffirmed

- No general chat memory.
- No hidden prompt/context state.
- No admission override exposure from M6 test paths.
- No runtime authority expansion.
