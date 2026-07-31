# M8 Local Test Runbook (Owner-Run, Local-Only)

**Status:** Local runbook for Owner-run M8 verification evidence capture only  
**Boundary:** local-only, synthetic-only, deterministic, non-live-effect  
**Evidence type:** operational runbook, not independent verification or certification

## 1) Scope and boundary reminders

This runbook covers local execution checks for the M8 desktop interface that delegates to governed M6 behavior.

- No model/provider authority expansion.
- No outbound network behavior.
- No external tools, external databases, or live-effect operations.
- No private-file traversal beyond approved local state usage.
- No transcript, UI journal, session log, or answer history persistence by M8.
- M8 relies only on the existing M6/M2/M3/M4/M5 governed evidence chain.

## 2) Preflight baseline checks (required)

Run from repository root:

```bash
npm --prefix "implementation/hal-core" run format:check
npm --prefix "implementation/hal-core" run lint
npm --prefix "implementation/hal-core" run typecheck
npm --prefix "implementation/hal-core" run test
npm --prefix "implementation/hal-core" run security:scan
```

Expected bounded outcomes:

- all commands exit successfully;
- test suite passes;
- dependency security scan reports no high-or-above vulnerabilities.

## 3) Desktop launch and state directory selection

Launch:

```bash
npm --prefix "implementation/hal-core" run m8:desktop
```

Required local-only interaction:

- use the M8 directory picker flow to choose an existing local state directory;
- confirm the selected state directory is accepted before inquiry submission;
- do not create or switch to any non-local or remote location.

## 4) Required M8 scenario matrix

Execute each scenario through the desktop interface while preserving bounded fields only.

### 4.1 Matched inquiry

- Submit one approved synthetic inquiry that produces a governed match.
- Capture bounded outputs only (result class, disposition, replay status, IDs if retained, and `externalEffect`).

Expected bounded outcome class:

- `matched`
- no external effect (`externalEffect=none`)

### 4.2 No-match inquiry

- Submit one synthetic inquiry expected to produce a no-match outcome.
- Capture bounded outputs only.

Expected bounded outcome class:

- `no_match`
- `completed_without_effect`
- `replayed=false`
- `achieved_without_effect`
- `externalEffect=none`

### 4.3 Unsafe-input denial

- Submit one unsafe synthetic input to trigger deterministic denial.
- Do not retain raw unsafe text.

Expected bounded outcome class:

- `denied`
- `blocked`
- deterministic rejection classification (for example `REJ_INJECTION_LIKE`)
- `externalEffect=none`

### 4.4 Deliberate replay of matched or no-match inquiry

- Reuse a prior request ID with materially identical replay intent for a previously completed governed inquiry.
- Confirm replay behavior is explicit/deliberate and never automatic.

Expected bounded outcome class:

- replay result preserves prior governed class;
- `replayed=true` on replay invocation;
- original correlation identity remains preserved for replayed result.

### 4.5 Deliberate replay of denied unsafe-input inquiry

- Reuse the denied request ID with deliberate replay intent.
- Do not retain raw unsafe text.

Expected bounded outcome class:

- remains `denied` and `blocked`;
- `replayed=true`;
- original correlation identity preserved;
- same deterministic rejection classification;
- `externalEffect=none`.

### 4.6 Same request ID with materially different input conflict

- Reuse an existing request ID with materially different input.

Expected bounded outcome class:

- conflict is blocked fail-closed;
- replay is not admitted for materially different input.

### 4.7 Close and relaunch M8 with continued governed local state

- Close the desktop window.
- Relaunch M8 and reselect the same existing governed local state directory.
- Confirm continued operation uses existing local governed evidence behavior without creating a separate M8 durable record system.

## 5) No-network and no-external-effect confirmation

For all executed scenarios, confirm bounded evidence remains within:

- local-only operation;
- synthetic-only content;
- deterministic governed outcomes;
- `externalEffect=none`;
- no network, no remote service interaction, and no real-world side effects.

## 6) Evidence capture rules

Retain only bounded fields:

- request ID (if retained);
- correlation ID (if retained);
- result class;
- disposition;
- replay status;
- input classification (when denied);
- attestation/effect boundary fields.

Never retain:

- raw unsafe input text;
- raw question or answer text;
- full local filesystem paths;
- raw exception payloads;
- raw terminal diagnostics beyond bounded command outcomes.

## 7) Assurance limitation reminder

This runbook supports Owner-run local evidence capture only. It is not independent verification, not certification, and does not grant readiness, authority, or scope uplift beyond local-only, synthetic-only, deterministic, non-live-effect operation.
