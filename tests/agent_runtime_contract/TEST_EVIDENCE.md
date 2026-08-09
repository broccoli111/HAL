# Agent Runtime Contract Test Evidence

> **Evidence scope:** Test-only, deterministic in-memory conformance harness. This record is not Book II recertification and does not authorize production runtime integration.

| Field | Value |
| --- | --- |
| Date | 2026-08-09 |
| Suite | [Agent Runtime Contract — Test-Only Conformance Suite](CONFORMANCE_SUITE.md) |
| Command | `python3 -m unittest -v tests.agent_runtime_contract.test_conformance` |
| Result | PASS — 14 tests passed |
| Environment | Local Python standard library; synthetic, in-memory fixtures only |
| External resources | None used |

## Local Inference Mediation Contract Evidence

| Field | Value |
| --- | --- |
| Date | 2026-08-09 |
| Scope | DR 0018 pure semantic mediation contract harness |
| Command | `python3 -m unittest -v tests.agent_runtime_contract.test_local_inference_mediation_contract` |
| Result | PASS — 9 tests passed |
| Environment | Local Python standard library; deterministic in-memory fixtures only |
| External resources | None used; no socket, route, model, container, or runtime process |

The suite proves HAL-issued one-use binding semantics; identity/correlation/profile mismatch denial before execution; expiry/replay denial; cancellation/revocation; fixed synthetic profile forwarding to an in-memory fake upstream; upstream failure and oversized-output containment; and retention of an inference result only as a non-canonical runtime claim. It is not a mediator implementation or activation test.

## CT-008 One-Use Binding Validation Evidence

| Field | Value |
| --- | --- |
| Date | 2026-08-09 |
| Scope | Test-only validation logic for the DR 0020 one-use mediator |
| Command | `python3 -m unittest -v tests.agent_runtime_contract.test_positive_mediation_validation` |
| Result | PASS — 3 tests passed |
| External resources | None used; no socket, route, model, container, or runtime process |

The checks prove that only the exact issued binding/request shape is admitted and that mutation, malformed input, replay, expiry, and invalid lifetimes are denied before any upstream contact.

## Mediation Script Static Boundary Evidence

| Field | Value |
| --- | --- |
| Date | 2026-08-09 |
| Scope | Static safety checks for DR 0019/DR 0020 test-only scripts |
| Command | `python3 -m unittest -v tests.agent_runtime_contract.test_mediation_script_boundaries` |
| Result | PASS — 3 tests passed |
| External resources | None used |

The checks require networkless, read-only, capability-dropped, Hermes-free container harnesses; prove the negative mediator has no model/upstream path; and limit the positive mediator to the fixed local Ollama loopback endpoint and approved model.

## TypeScript Adapter-Boundary Evidence

| Field | Value |
| --- | --- |
| Date | 2026-08-09 |
| Scope | Local TypeScript implementation seam in `implementation/hal-core/src/runtime/` |
| Command | `npm run check` from `implementation/hal-core` |
| Result | PASS — 22 test files and 167 tests passed; focused adapter/dependency boundary tests: 18/18 passed |
| Environment | Lockfile-pinned local development dependencies; synthetic, local-only fixtures |
| External resources | None used by source or tests |

The repeatable combined local command is `scripts/run_runtime_boundary_checks.sh`. It runs the deterministic Agent Runtime, proxy-contract, mediation-contract, CT-008 binding-validation, and mediation-script-boundary suites, the HAL Core format/lint/typecheck/test gate, and `git diff --check`; it opens no network connection and invokes no Hermes process.

The adapter-boundary tests verify HAL-owned lifecycle sequencing and linkage checks, including rejection of lifecycle controls for agents not admitted through the HAL-owned host and centralized rejection of any callback claim whose runtime, agent, task, or correlation does not match an admitted HAL execution. They cover every Runtime-to-HAL operation: capability request, evidence submission, progress, result, failure, and subagent request. They also verify injected-driver isolation in `HermesAdapter`, existing-policy synthetic Gateway permit/denial behavior, integrity-chained HAL custody of unaccepted runtime claims and dispositions, runtime replacement, and disposable runtime-memory reconstruction. The test-only line-driver boundary rejects malformed, capability-like, mislinked, control-plane, and post-terminal remote frames before callback delivery; terminal task claims also close the active-task linkage. A static anti-coupling test verifies that HAL Core outside the adapter boundary has no Hermes reference and that the boundary imports no Hermes implementation. The repository-wide TypeScript test continues to reject network/external-client imports.

## Covered Cases

ARTC-001 through ARTC-014 passed, covering lifecycle admission, bounded dispatch, permitted/denied/held capability requests, scope-expansion denial, evidence and report claim handling, subagent delegation bounds, checkpoint/cancellation/destruction, failure containment, runtime replacement, runtime-memory loss/reconstruction, and anti-coupling.

## Fixed Read-Only Repository-Status Composition Evidence

| Field | Value |
| --- | --- |
| Date | 2026-08-09 |
| Scope | HAL-local, fixed-composition status context for the zero-capability text-only assistant slice |
| Command | `python3 -m unittest -v tests.agent_runtime_contract.test_readonly_shell_pilot` |
| Result | PASS — 3 tests passed |
| External resources | None used; the test suite never starts the GX10 transport, Hermes, Ollama, or a network service |

The checks execute only the exact HAL-owned `pwd`, `git status --short`, and `git log --oneline -n 20` argument arrays in the repository workspace and bound returned output to 16 KiB. They prove rejection of arbitrary commands, shell-like argument injection, and malformed request shapes before execution. Static assertions require the fixed repository-status and repository-history assistants to obtain their context only through that probe and to provide it as text context with an explicit no-tools instruction; they forbid a direct Git subprocess or shell-enabled composition path. This evidence does not grant a runtime a shell capability, a general command interface, governed-resource access, or canonical-knowledge write authority.

## Bounded Stateless Terminal Assistant Evidence

| Field | Value |
| --- | --- |
| Date | 2026-08-09 |
| Scope | Existing DR 0027 restricted local text-only transport presented through a local terminal UI |
| Static command | `python3 -m unittest -v tests.agent_runtime_contract.test_stateless_chat_interface` |
| Live smoke command | `printf '%s\\n%s\\n' 'What is 2 + 2? Reply with only the number.' '/exit' | npm run runtime:chat` with the existing required GX10 environment variables |
| Result | PASS — static boundary test passed; live request returned `4` and the session ended cleanly |

The UI limits a process to 20 independent turns and each question to 8,192 characters, matching the existing forced runtime request bound. It persists neither transcript nor runtime memory and starts no listener. Each turn delegates only to the existing `runtime:ask` composition, which retains HAL result/evidence custody and grants the runtime no capabilities. EOF is handled as a clean local session termination. This is a convenience UI over the approved bounded local text-only slice, not a new runtime contract, capability, authority, or production service.

## Limitations and Follow-up

The harness verifies the defined semantic boundary only. It does not verify a production implementation, Hermes, a general Capability Gateway, real resources, secrets, external connectivity, deployment, or formatted Book II recertification. The existing local synthetic Gateway has exactly one permitted M3 inspection capability and returns no resource, credential, or execution handle to a runtime. Under [DR 0002](../../decisions/0002-runtime-contract-durable-record-model.md), the runtime journal retains only integrity-chained, non-canonical runtime claims and Gateway dispositions. The separate, test-only GX10 synthetic cancellation probe passed with a 15-minute harness limit; it is not a production transport. The next required activity is to store the independent reviewer’s scoped Book II conformance disposition, then regenerate authoritative formatted Book II editions.
