# Runtime Adapter Boundary Implementation Record

## Scope

This record covers the first local TypeScript implementation seam for the Book II Agent Runtime Contract. It is a deterministic, no-effect test boundary only.

## Implemented Boundary

- `src/runtime/agentRuntime.ts` defines semantic lifecycle calls and Runtime-to-HAL callback shapes.
- `TestRuntimeAdapter` supplies a deterministic replaceable test driver.
- `HermesAdapter` is an injected-driver seam only. It imports no Hermes package and starts no Hermes process.
- `RuntimeHost` is HAL-owned and controls lifecycle sequencing, bounded context and capability-manifest delivery, and lifecycle operations for its admitted agents only. Its callback custody rejects claims unless their runtime, agent, task, and correlation match an admitted HAL execution.
- `LocalSyntheticCapabilityGateway` evaluates the existing M3 synthetic-inspection capability through the existing restrictive local policy. It is not a general resource Gateway.
- `RuntimeJournal` and `RuntimeSubmissionRecorder` give HAL durable, integrity-chained custody of synthetic runtime claims and Gateway dispositions.

## Safety and Authority Posture

- The adapter has no filesystem, shell, network, secret, node, or resource-provider handle.
- Capability requests are represented as requests to HAL-owned callbacks; a runtime cannot return or manufacture a permission decision.
- The initial host test callback denies unknown capability requests. The sole permit case is the existing M3 synthetic inspection capability and does not create a general capability policy or resource provider.
- Evidence, progress, result, failure, and subagent reports are submissions to HAL, not canonical state changes.
- The journal records those submissions as `unaccepted_runtime_claim`; no record is canonical knowledge, an accepted outcome, permission, or delegated authority.
- Test-runtime operational context is held only in process memory. Replacing the runtime loses it; HAL may provide bounded context again during a new admitted execution.
- This implementation neither connects to Hermes nor implements production resource access, scheduling, credential use, or runtime memory persistence.

## Verification

`test/runtime-adapter-boundary.test.ts` verifies contract-only delegation, HAL-owned lifecycle/linkage checks, existing-policy Gateway permit and denial paths, durable claim/disposition recovery, report submission, and disposable runtime-memory reconstruction. The test-only line driver accepts claims only during task dispatch, rejects control-plane reply injection, and closes its active task linkage after a terminal claim. `test/runtime-dependency-boundary.test.ts` verifies that HAL Core outside the runtime adapter boundary has no Hermes reference and that the adapter imports no Hermes implementation. The repository-wide no-network-import test continues to cover all TypeScript source.

## Authoritative Sources

This record is subordinate to the HAL Canon. See Book II Chapter 2 §§3.1–3.2, Chapter 15, Chapter 29, and Chapter 35, plus Decision Record 0001.
