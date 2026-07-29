# M3 — Bounded Local Capability Design

**Status:** Proposed; required before M3 implementation  
**Scope:** One local, synthetic-data-only, non-live-effect capability  
**Authority:** Book I controls. This design adds no authority, external integration, model, Provider class, Treaty, or live-effect capability.

## 1. M3 objective

M3 proves that HAL can execute exactly one capability inside the M2 governed path. The capability may inspect only a declared synthetic local corpus and produce a deterministic, verifiable summary artifact. It may not affect any external or durable-world system.

## 2. Capability contract

| Field | M3 contract |
| --- | --- |
| Capability ID | `inspect_synthetic_corpus_summary` |
| Purpose | Summarize approved synthetic corpus metadata/content under declared limits. |
| Inputs | Capability request ID, M2 transaction ID, allow Decision reference, correlation ID, corpus reference, maximum item count. |
| Outputs | Summary artifact ID, item count, deterministic summary, input manifest hash, provider identity, verification evidence. |
| Allowed data | Only synthetic, non-sensitive fixture corpus held below the explicit local fixture root. |
| Prohibited data | Personal data, credentials, arbitrary host files, network resources, user-specified paths, and external accounts. |
| Side effects | Creates only a controlled local result artifact/evidence record inside the explicit M3 state directory. |
| Authority | Requires an M2 `allow` Decision and a `completed_without_effect`-eligible Transaction. |
| Failure posture | Fail closed; preserve evidence; claim no effect; do not retry outside an explicit bounded policy. |

## 3. Provider and execution boundary

M3 has one local Provider: `LocalSyntheticCorpusInspector`.

- It is identified, versioned, and registered by a local Capability Registry.
- Registration is a local configuration fact, not a new capability class or autonomous authority.
- The Provider receives a narrow execution envelope and cannot access broad process state, arbitrary paths, network APIs, credentials, or M2 owner stores.
- The Execution Coordinator alone opens and finalizes an Attempt. The Provider only returns an observation/result.
- Provider success never itself proves authorization, verification, or outcome success.

## 4. Execution records and state

| Record | Sole owner | Required fields |
| --- | --- | --- |
| Capability Registration | Capability Registry | capability ID, provider ID/version, input/output constraints, risk/effect classification, enabled status, evidence. |
| Capability Request | Execution Coordinator | request ID, transaction/decision/intent references, correlation, input manifest, limits, authorization reference. |
| Execution Attempt | Execution Coordinator | attempt ID, request ID, provider reference, status, timestamps, cancellation/deadline, result/evidence references. |
| Result Artifact | Artifact Service | artifact ID, content, manifest hash, provenance, classification, integrity hash, retention scope. |
| Verification Record | Verification Service | verification ID, artifact/attempt references, deterministic checks, disposition, evidence. |

Attempt states: `created → running → succeeded | failed | cancelled | timed_out`. Only a verified `succeeded` attempt may support a M3 local result. A failure, cancellation, timeout, or uncertain state produces no claimed effect.

## 5. Mandatory admission checks

Before an attempt starts, the Execution Coordinator must verify:

1. The capability ID is exactly the registered M3 capability.
2. The Provider is enabled and exactly matches the registration/version.
3. The M2 Decision is `allow`, linked to the same Intent/Plan/Transaction, and has the same correlation ID.
4. The M2 Transaction is eligible for local non-effectful execution and has not already finalized a conflicting attempt.
5. The corpus reference resolves only below the declared fixture root and has a synthetic classification.
6. The request limits are bounded and valid.
7. The execution envelope has a deadline, cancellation token, idempotency key, provenance, and evidence destination.

Any failure denies admission, records evidence, and performs no Provider invocation.

## 6. Result and verification

The Provider produces a deterministic JSON summary of the approved fixture corpus. The Verification Service must independently confirm:

- result schema and declared item count;
- all consumed files were within the fixture root;
- input manifest hash matches the exact approved inputs;
- output integrity hash matches stored artifact content;
- no disallowed path, secret-like value, or network/API behavior is present;
- the result is linked to the correct attempt, request, transaction, decision, and correlation ID.

Only then may the M2 flow record a local `completed_without_effect` outcome. The claimed effect remains `inspection_only` and never represents an external action.

## 7. Idempotency, cancellation, and recovery

- Duplicate identical capability-request IDs return the original attempt/result disposition.
- Conflicting reuse is denied and audited without replacing the original command/request index.
- Cancellation before completion yields `cancelled` with no artifact accepted as success.
- Timeout yields `timed_out`, evidence preserved, and no automatic unbounded retry.
- Restart/replay reconstructs request, attempt, artifact, verification, and outcome from authoritative M3 records/events.
- Recovery never reruns an attempt unless the explicit idempotency and retry policy permits it.

## 8. M3 acceptance evidence

- [ ] An allowed M2 path produces one verified summary artifact from the declared synthetic fixture corpus.
- [ ] Denied/approval-required M2 decisions cannot invoke the Provider.
- [ ] Path traversal, arbitrary paths, external URLs, secret-like corpus entries, and invalid limits are rejected before invocation.
- [ ] Duplicate and conflicting request IDs behave correctly.
- [ ] Timeout and cancellation produce no accepted success artifact or claimed effect.
- [ ] Artifact and input manifest integrity tampering fail verification.
- [ ] Full trace from correlation ID reconstructs Intent through verified artifact and Outcome.
- [ ] No network, model, external provider, real authentication, database, or live effect is introduced.
- [ ] Format, lint, typecheck, tests, and dependency-security scan pass.

