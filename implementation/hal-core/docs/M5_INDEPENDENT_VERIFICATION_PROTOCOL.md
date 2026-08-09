# M5 Independent Verification Protocol

**Status:** Protocol template for independent review execution  
**Scope:** HAL v0.1 M0-M4 local-only assurance package  
**Boundary:** synthetic-only, no-network, non-live-effect

## 1) Independence disclosure

Independent verification must document reviewer independence before running checks.

Required disclosure:

- reviewer identity and role;
- implementation authorship overlap (if any);
- approval authority overlap (if any);
- declared independence limits and conflict mitigations.

If reviewer independence is materially limited, findings remain valid as verification evidence but certification confidence must be reduced accordingly.

## 2) Clean-checkout reproducible setup

1. Start from clean checkout and record:
   - branch;
   - repository commit hash;
   - node/npm versions.
2. Verify clean tree before running checks.
3. Use explicit disposable state directories under `implementation/hal-core/local-state/m5-independent/`.

Suggested setup:

```bash
mkdir -p "./implementation/hal-core/local-state/m5-independent/m2"
mkdir -p "./implementation/hal-core/local-state/m5-independent/m3"
mkdir -p "./implementation/hal-core/local-state/m5-independent/m4"
```

Required local test configuration before M1/M2 demo checks:

```bash
export HAL_ENVIRONMENT=development
export HAL_SAFE_MODE=restrictive
export HAL_OWNER_ID=owner_independent_reviewer
```

These values are local non-secret test configuration. They are not authentication credentials and do not establish authority.

## 3) Baseline validation checks

From repo root:

```bash
npm --prefix "implementation/hal-core" run format:check
npm --prefix "implementation/hal-core" run lint
npm --prefix "implementation/hal-core" run typecheck
npm --prefix "implementation/hal-core" run test
npm --prefix "implementation/hal-core" run security:scan
```

Capture exact output and timestamps.

## 4) Required scenario checks

### 4.1 Positive path

- M1 allow fixture
- M2 allow fixture path
- M3 allowed bounded capability run
- M4 allowed verified scenario producing no-external-effect attestation

### 4.2 Deny and approval-required paths

- M1 denied fixture
- M1 approval-required fixture
- M2 denied and approval-required fixture runs

### 4.3 Cancellation and timeout

- Validate via automated tests in `test/m3-bounded-capability.test.ts` and `test/m4-verified-outcome.test.ts`
- Confirm no-effect truthfulness in outcomes

### 4.4 Verification-rejection checks

- Validate through existing M3/M4 negative tests that tampered or mismatched artifacts do not yield success

### 4.5 Journal tamper and linkage mismatch

- Execute automated tests that tamper journal/artifact/linkage and confirm fail-closed reconstruction behavior

### 4.6 Replay and idempotency checks

- Validate duplicate identical request replay stability and conflicting-id denial behavior in M2/M3/M4 tests

### 4.7 Reconstruction checks

- Run reconstruction commands with captured correlation IDs for M2, M3, and M4
- Confirm expected behavior for valid and invalid evidence chains

## 5) Evidence capture and chain-of-custody

Required evidence bundle:

- command transcripts with timestamps;
- test outputs and test counts;
- captured correlation IDs;
- journal snapshots (`m2`, `m3`, `m4`);
- artifact hash listings;
- reconstruction outputs;
- reviewer notes and final disposition.

Chain-of-custody minimums:

- immutable or content-addressed evidence identifiers;
- evidence source path + capture time;
- reviewer access log;
- supersession links (no silent overwrite).

## 6) Objective pass/fail criteria

### Pass only if all conditions hold

- all five baseline checks pass;
- required positive and negative checks complete and match expected outcomes;
- fail-closed behavior is observed for tamper/mismatch/uncertain evidence conditions;
- evidence package is complete and internally traceable;
- no unresolved critical defect remains.

### Fail if any condition below occurs

- baseline check fails;
- expected fail-closed behavior is absent;
- evidence package is incomplete or integrity is uncertain;
- critical discrepancy between expected and observed outcome remains unresolved.

## 7) Reporting rules

- Do not claim certification inside this protocol report.
- Report only observed evidence and bounded conclusions.
- Classify each claim as `verified`, `falsified`, or `inconclusive`.

## 8) Reviewer report template

```text
M5 Independent Verification Report

Reviewer:
Date:
Repo branch:
Repo commit:
Node/npm versions:
Independence disclosure:

Scope reviewed:
- M0/M1/M2/M3/M4 evidence and checks

Executed commands:
- <exact command list and timestamps>

Scenario results:
- Positive path:
- Deny path:
- Approval-required path:
- Cancellation path:
- Timeout path:
- Verification-rejection path:
- Journal-tamper path:
- Linkage-mismatch path:
- Replay/idempotency path:
- Reconstruction path:

Evidence package references:
- <paths and hashes>

Critical findings:
- <none or list>

Residual risks:
- <list>

Claim dispositions:
- C1:
- C2:
- C3:
- C4:
- C5:

Overall verification outcome:
- verified | falsified | inconclusive

Certification statement:
- Not issued by this report.
```
