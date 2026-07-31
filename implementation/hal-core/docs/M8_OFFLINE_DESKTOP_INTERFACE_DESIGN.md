# M8 Offline Desktop Interface Design

**Status:** Proposed only / not implemented  
**Authorization posture:** Non-authorizing document; implementation blocked pending explicit Owner approval  
**Scope posture:** Interface ergonomics only for existing governed M6 inquiry flow

## 1) Purpose and hard boundary

M8 proposes a future local desktop interface that makes the existing governed M6 inquiry experience available without a terminal, while preserving all current M2/M3/M4/M5/M6/M7 controls and semantics.

Hard boundary:

- M8 is proposed and non-authorizing.
- M8 is local-only, synthetic-only, deterministic, and non-live-effect.
- M8 introduces interface ergonomics only; it delegates every inquiry through the existing M6 -> M2 -> M3 -> M4 -> M5 governed path.
- M8 does not add or authorize model/provider admission, network behavior, remote web content, web browsing, external tools, private-file content access, database, real authentication, autonomy, memory, or authority expansion.
- M8 is not a general chat application and must not claim conversational intelligence.
- M8 must not weaken M6/M7 input policy, M2 authority, M3 admission/execution, M4 attestation, M5 backup/restore controls, idempotency, conflict behavior, or fail-closed behavior.

## 2) Governing-source alignment

This design remains subordinate to existing canon and implemented local posture:

- Book I constitutional restraint and evidence principles.
- Book II and Book IV single-owner authority and fail-closed mutation semantics.
- Book V stop-work and evidence-preserving operations discipline.
- Book VI separation of trust/security posture from authority and permission.
- Book VIII verification/certification separation and fail-closed assurance on evidence uncertainty.
- Book IX contract semantics for denial terminality, idempotency, replay/conflict controls, and correlation/causation preservation.
- Book X terminology discipline and prohibition on authority laundering through labels.

## 3) Proposed architecture (future, local-only)

```text
Local packaged UI renderer
  -> narrow preload bridge
  -> local Electron main process
  -> existing M6 governed service path
  -> M2/M3/M4/M5 durable evidence chain
```

Architecture intent:

- Keep runtime authority in existing governed path.
- Keep renderer constrained to presentation only.
- Keep evidence lineage unchanged and attributable.
- Keep failure behavior fail-closed and explicit.

## 4) Desktop security architecture requirements

### 4.1 Packaging and content boundary

- Load only locally packaged application content.
- Never load remote URLs, remote scripts, remote webviews, or external navigation.
- No runtime fetch of remote content.

### 4.2 Renderer process hardening

- Renderer Node integration disabled.
- Context isolation enabled.
- Renderer process sandboxing enabled.
- Restrictive Content Security Policy allowing only local packaged content.

### 4.3 API surface minimization

- Renderer receives no raw Electron APIs.
- Renderer receives no Node.js APIs.
- Renderer receives no filesystem, shell, subprocess, or unrestricted IPC APIs.
- Preload bridge exposes only a small, typed, allowlisted method set.
- Main process validates every IPC sender and payload before action.

### 4.4 Explicitly prohibited desktop behaviors

- No `shell.openExternal`.
- No arbitrary URL handling.
- No arbitrary file reads.
- No arbitrary directory traversal.
- No privileged renderer-to-main command channel.
- No telemetry, crash reporting, analytics, auto-update, or network fallback.

### 4.5 Future dependency and update policy (if later authorized)

- Electron admission requires explicit Owner approval before dependency addition.
- Every dependency change requires pinned review, security scan evidence, and explicit version risk review.
- Security updates require bounded impact review and regression verification before admission.
- Build/package provenance and reproducibility evidence must be retained.

## 5) Proposed UI contract (future interface behavior)

### 5.1 Single-inquiry interaction model

- One question field.
- One submit action.
- One inquiry per submit.
- No hidden context, no conversational carryover, no cross-question interpretation.

### 5.2 Result and evidence panel (read-only)

Display only M6-governed fields:

- `requestId`
- `correlationId`
- `result`
- `disposition`
- `replayed`
- `attestationStatus`
- `attestationClaimedEffect`
- `inputClassification`
- bounded M6 rendered response text

### 5.3 Boundary indicator

Show a persistent and visible boundary indicator:

- local-only
- synthetic-only
- non-live-effect

### 5.4 Request identity and replay behavior

- Main process generates default request IDs for plain submits.
- Deliberate replay workflow only (explicit operator action).
- No automatic request-ID reuse.
- M6 replay/conflict logic remains authoritative.

### 5.5 Memory and persistence constraints

- Every inquiry remains independent.
- No transcript persistence.
- No answer history.
- No hidden memory.
- No conversation model.
- M6 durable minimized evidence remains the only durable inquiry record.

### 5.6 Trust and evidence display

- Evidence/trust display must be bounded.
- If M6/M4 reconstruction or integrity validation is unavailable, UI fails closed to `integrity_unavailable`.
- UI must not synthesize success in unavailable-integrity states.

### 5.7 Accessibility requirements

- Full keyboard operation.
- Readable labels for controls and outputs.
- Status meaning must not rely only on color.
- Screen-reader-friendly control and status names.
- Scalable text support.
- Understandable error messages with corrective guidance.

## 6) State-directory rules (future desktop admission)

M8 may select only an existing canonical local state directory and must apply M7-equivalent strict validation before invoking M6.

Required validation:

1. reject URL-like values;
2. resolve to absolute local filesystem path;
3. require existing directory;
4. reject symlink roots;
5. reject symlinked ancestor/canonical-path ambiguity;
6. require read/write/execute accessibility;
7. reject unwritable locations;
8. reject ambiguous paths or integrity uncertainty.

Prohibitions:

- M8 must not create state directories.
- M8 must not browse arbitrary filesystem trees.
- M8 must not read arbitrary file contents.

M5 remains responsible for backup/verify/restore of governed state. M8 does not back up UI transcripts because no transcripts exist.

## 7) Exact failure behavior (fail-closed)

### 7.1 Malformed UI input

- Do not invoke M6.
- Render blocked outcome with deterministic reason: `malformed_input`.
- Preserve boundary indicator and no-effect posture.

### 7.2 M6 denial (input policy)

- Surface M6 result faithfully as denied/blocked semantics.
- Show M6 `inputClassification` and bounded response.
- No success remapping.

### 7.3 M2 block

- Surface blocked semantics faithfully (`m2_approval_required` or `m2_deny` as provided by governed response).
- No retry loop that changes semantics.

### 7.4 Request-ID conflict

- Surface blocked result with reason `request_id_conflict`.
- Do not auto-generate substitute request IDs for that failed replay attempt.

### 7.5 IPC sender or payload validation failure

- Reject request in main process before any M6 invocation.
- Return deterministic blocked response: `ipc_validation_failed`.
- Return the deterministic blocked response in the UI only.
- Do not create an M8 durable record, transcript, or error journal.
- If existing governed M6 evidence exists, it remains unchanged.

### 7.6 State-directory safety failure

- Block before M6 invocation.
- Return deterministic blocked response: `state_directory_validation_failed`.
- Do not attempt fallback path discovery.

### 7.7 M6 invocation failure

- Return blocked response: `m6_invocation_failed`.
- Do not synthesize answer content.
- Preserve no-effect semantics.

### 7.8 Tampered or unavailable evidence

- Fail closed to:
  - `result=integrity_unavailable`
  - `disposition=blocked`
  - `replayed=false`
- Do not render trusted-success status.

### 7.9 Application interruption

- On renderer/main interruption, do not emit success for incomplete request.
- On restart, no hidden replay; operator must resubmit or use explicit replay workflow.
- No transcript recovery path exists by design.

## 8) Future acceptance and test plan (implementation gate)

Before any M8 implementation-readiness claim:

1. renderer isolation proof: no Node/Electron API exposure to renderer;
2. IPC contract tests: allowlist enforcement, sender validation, payload validation;
3. offline proof: no remote navigation, remote content, or network behavior;
4. M6 fidelity tests: desktop output matches governed M6 result fields and semantics;
5. independence tests: no cross-question memory or interpretation carryover;
6. replay/conflict tests: deliberate replay only, governed conflict blocks preserved;
7. persistence tests: no raw question/answer/transcript durable storage by M8;
8. state-directory safety tests: URL-like rejection, symlink-chain rejection, ambiguity rejection, unwritable rejection;
9. integrity fail-closed tests: trust unavailability renders `integrity_unavailable`;
10. accessibility checks: keyboard-only operation, labels, non-color status semantics, screen-reader naming, scalable text, understandable errors;
11. package/dependency security checks: dependency review, vulnerability scans, explicit version review evidence;
12. M5 compatibility tests: backup/verify/restore/reconstruction remain valid for governed underlying records.

## 9) Non-goals

- Not an authorization to implement Electron now.
- Not a chat client.
- Not a browser container.
- Not an authority expansion mechanism.
- Not a persistence layer for inquiry history.
- Not a replacement for M6/M2/M3/M4/M5 controls.

## 10) Owner authorization gate before any implementation

No implementation work is authorized until explicit Owner approval records all of:

1. Electron dependency and packaging admission approval;
2. M8 desktop-interface scope approval as ergonomics-only delegation to existing governed path;
3. narrow preload/IPC contract approval (typed allowlist, sender/payload validation, no privileged renderer channel);
4. explicit preservation of all local-only, synthetic-only, deterministic, non-live-effect boundaries and all existing M2/M3/M4/M5/M6/M7 controls.

Until those approvals exist, this document remains **Proposed / not implemented** and non-authorizing.
