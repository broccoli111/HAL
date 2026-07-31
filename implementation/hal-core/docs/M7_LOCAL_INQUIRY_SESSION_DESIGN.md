# M7 Local Inquiry Session Design

**Status:** Proposed design only (not implemented)  
**Scope posture:** Proposed scope expansion beyond current approved capability  
**Current authority posture:** `ready_to_remain_local_only` does **not** authorize M7 implementation by itself

## 1) Purpose and hard boundary

M7 proposes a future local terminal session interface that improves operator ergonomics for M6 deterministic inquiry by generating default request IDs locally, while preserving existing M6 governance semantics and constraints.

Hard boundary:

- M7 is proposed and non-authorizing design only.
- M7 remains local-only, synthetic-only, deterministic, and non-live-effect.
- M7 delegates every inquiry to the existing M6 governed path.
- M7 adds no model/provider, no network behavior, no external tool authority, no private-file authority expansion, no database, no real authentication, no autonomous workflow, and no authority expansion.
- M7 must not reinterpret, bypass, or weaken M6 input policy, M2 decisions, M3 execution, M4 attestation, M5 evidence and backup/restore, or M6 idempotency and conflict controls.
- M7 is not general chat and must not claim conversational intelligence.

## 2) Governing-source alignment

This design is constrained by the currently approved local posture and governing canon:

- Book I constitutional restraint, evidence, and non-expanding authority principles.
- Book II and Book IV authority boundaries and fail-closed mutation and evidence expectations.
- Book V operational stop-work and evidence-preserving fail-closed execution.
- Book VI identity/authority separation and non-creation of authority by trust, credentials, or convenience.
- Book VIII verification/certification separation and fail-closed assurance when required evidence is unavailable.
- Book IX contract semantics for idempotency, denial terminality, correlation/causation preservation, and fail-closed behavior.
- Book X terminology discipline (no semantic authority laundering).

M7 introduces interface ergonomics only. It does not introduce new constitutional, operational, or component authority.

## 3) Proposed interface overview

### 3.1 Session start (future)

Proposed future command:

```bash
npm --prefix "implementation/hal-core" run m7:session -- --state-dir "<local-state-dir>"
```

Proposed startup output (example shape):

```text
HAL M7 local inquiry session (proposed contract)
mode=local_only synthetic_only deterministic non_live_effect
m6_delegate=required
stateDir=<resolved-path>
commands=help,status,ask,exit
```

### 3.2 Supported interactive commands

- `help`  
  Prints command syntax and explicit boundary reminders.
- `status`  
  Prints current session metadata only (state-dir path, process start timestamp, inquiry count, last request ID, last correlation ID, last disposition/result summary).
- `ask <question>`  
  Runs one independent inquiry by delegating to M6 with a generated default request ID.
- `ask --request-id <id> --replay-intent <question>`  
  Explicit request-ID reuse path, intentionally labeled for replay/conflict-controlled use.
- `exit`  
  Ends session without writing any session transcript.

No other commands are admitted.

## 4) Exact inquiry semantics

### 4.1 One `ask` equals one independent M6 inquiry

Every `ask` invocation is treated as an independent inquiry:

- no conversational carryover;
- no hidden prompt state;
- no follow-up interpretation;
- no cross-question memory injection;
- no override of M6 normalization/rejection/ranking/disposition behavior.

M7 may keep minimal in-memory counters and last-result metadata for display only during process lifetime.

### 4.2 Default request ID generation

For `ask <question>` without explicit request ID, M7 generates a local request ID and passes it to M6.

Proposed format:

- prefix: `m7-session-request-`
- suffix: ULID or equivalent monotonic high-entropy local identifier.
- example: `m7-session-request-01K1X8W95S7W7N9KM5P5S9QX3N`

Requirements:

- generated ID must be displayed to operator;
- generated ID must be immutable for that invocation;
- generation must not require network or external dependency;
- generation does not bypass M6 conflict controls.

### 4.3 Explicit replay path only

Request-ID reuse is admitted only via intentional syntax:

- `ask --request-id <id> --replay-intent <question>`

Behavior rules:

- if same request ID + same governed fingerprint, replay may succeed with M6 `replayed: true`;
- if same request ID + materially different governed fingerprint, M6 conflict block must remain authoritative;
- plain `ask <question>` never reuses prior IDs automatically.

## 5) Session state, storage, and evidence model

### 5.1 Transient-only M7 session memory

M7 keeps in-memory process-lifetime display state only:

- session start timestamp;
- total inquiry count;
- last displayed request/correlation/result summary.

M7 must not persist:

- raw question history;
- conversation transcript;
- rendered answer text;
- transient excerpts;
- replay of terminal lines as durable record.

### 5.2 Sole durable inquiry record remains M6 evidence

M6 durable minimized evidence journals remain the only durable inquiry record:

- `m6-event-journal.jsonl` (plus linked M2/M3/M4 records);
- bounded, minimized, hash-chained, fail-closed semantics remain unchanged.

M7 must not create parallel durable chat/session evidence that could conflict with or dilute M6/M2/M3/M4/M5 evidence lineage.

### 5.3 State-directory safety rules

M7 must require explicit `--state-dir` and apply strict local path safety before invoking M6:

1. resolve to absolute path;
2. verify path is local filesystem path (no URL-like forms);
3. reject symlink root for the state directory target;
4. ensure readable/writable directory semantics for local process use;
5. fail closed on ambiguity, permission mismatch, or integrity uncertainty.

If state-directory safety check fails, M7 does not invoke M6 and returns a terminal blocked result for that command.

### 5.4 M5 backup/restore responsibility

M5 remains responsible for backup/verify/restore of underlying durable M6 records in state directories.

M7 does not:

- define backup format;
- capture transcript backups;
- become a backup authority.

M7 only points operators to existing M5 controls for preserving M6 evidence records.

## 6) Result fidelity and required output mapping

M7 must present M6 outputs faithfully and with explicit request/correlation identifiers.

For each `ask`, M7 displays:

- `requestId`
- `correlationId`
- `result`
- `disposition`
- `replayed`
- `attestationStatus`
- `attestationClaimedEffect`
- `inputClassification`
- bounded rendered response text from M6 (if available)

### 6.1 Expected displayed outcomes

#### A) Matched

```text
result=matched
disposition=completed_without_effect
replayed=false
```

#### B) No-match

```text
result=no_match
disposition=completed_without_effect
replayed=false
```

#### C) Denied (input policy rejection)

```text
result=denied
disposition=blocked
inputClassification=<REJ_*>
```

#### D) Blocked (M2 admission or other governed block)

```text
result=blocked
disposition=blocked
reason includes m2_approval_required | m2_deny | request_id_conflict (as surfaced by M6)
```

#### E) Replay (intentional ID reuse with same fingerprint)

```text
result=<matched|no_match>
disposition=completed_without_effect
replayed=true
```

#### F) Conflict (intentional ID reuse with different fingerprint)

```text
result=blocked
disposition=blocked
replayed=false
reason=request_id_conflict
```

#### G) Integrity-unavailable / untrusted reconstruction context

If M6 invocation fails, M6 durable evidence cannot be trusted, or required reconstructed evidence is untrusted/unavailable, M7 must fail closed and display:

```text
result=integrity_unavailable
disposition=blocked
replayed=false
```

M7 must not synthesize success in this condition.

## 7) Failure and containment posture

M7 fail-closed requirements:

- if M6 delegate invocation fails: block, preserve error classification, no synthetic success;
- if state directory safety check fails: block before invocation;
- if integrity or trust of required reconstructed evidence is unavailable: block;
- if output mapping cannot preserve required M6 fields: block rather than omit critical fields silently.

M7 must never convert a governed denial/block to success by interface behavior.

## 8) Accessibility and usability expectations (terminal-only)

M7 usability requirements without adding GUI/browser interface:

- plain-text, predictable command grammar;
- concise help text with examples and boundary reminders;
- deterministic output field ordering for readability;
- explicit error messages with actionable corrective guidance;
- no color-only signaling required for meaning;
- keyboard-only operation with standard terminal interaction.

M7 remains terminal-only and does not introduce graphical or browser presence.

## 9) Proposed acceptance and test plan (future implementation gate)

Before any M7 readiness claim, tests must pass for:

1. **Generated IDs**
   - default `ask` generates unique local request IDs and displays them;
   - generated IDs are passed to M6 and appear in evidence linkage.
2. **Intentional replay/conflict**
   - explicit replay command produces `replayed: true` when fingerprint matches;
   - explicit replay with materially different question produces deterministic conflict block.
3. **No cross-question context**
   - sequential `ask` commands do not alter interpretation from prior questions.
4. **Raw-transcript non-persistence**
   - session does not persist raw question history, transcript, answer text, or excerpts.
5. **M6 result fidelity**
   - displayed M7 fields exactly preserve M6 result/disposition/attestation semantics.
6. **Denied/blocked handling**
   - M6 denied/blocked outcomes are surfaced faithfully without success remapping.
7. **Interrupted-session safety**
   - abrupt process termination does not create partial session transcript artifacts;
   - durable evidence integrity remains governed by M6/M2/M3/M4 records only.
8. **State-directory safety**
   - symlink/unsafe/unwritable/ambiguous state directory paths fail closed before invocation.
9. **No-network/no-external-effect proof**
   - static/runtime checks show no outbound network or external-effect behavior added by M7.
10. **M5 backup/restore and reconstruction compatibility**

- M5 backup/verify/restore of state directories containing M6 records remains valid;
- M6 reconstruction behavior remains unchanged under M7 usage patterns.

## 10) Non-goals

- Not a general chat interface.
- Not conversational memory.
- Not autonomous multi-step workflow orchestration.
- Not an authority expansion mechanism.
- Not a replacement for existing M6 governance/evidence controls.

## 11) Required future Owner authorization before implementation

M7 implementation is blocked until explicit Owner authorization confirms:

- admission of M7 as a scope expansion beyond current M0-M6 implementation posture;
- acceptance of M7 as terminal ergonomics only, with no authority expansion;
- unchanged dependence on M6 governed path for every inquiry;
- unchanged M2/M3/M4/M5 evidence and fail-closed guarantees;
- updated verification and evidence plans for M7-specific behaviors listed above.

Until such authorization is recorded, this design is proposed only and non-authorizing.
