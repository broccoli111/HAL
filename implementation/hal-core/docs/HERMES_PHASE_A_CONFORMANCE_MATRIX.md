# Hermes DR 0012 Phase A — Design-to-Test Conformance Matrix

> **Status:** Phase A evidence record. No Hermes process, transport, provider, credential, capability, or governed resource is used.

## Scope

This matrix maps the DR 0012 Phase A design package to current HAL-side code and deterministic checks. A mapped test demonstrates only the stated test-only boundary property; it is not evidence of Hermes compatibility or Phase B activation readiness.

| Design requirement                                         | HAL-side implementation/evidence                                           | Verification                                                              |
| ---------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| HAL Core depends only on the semantic Contract             | `src/runtime/agentRuntime.ts`, `HermesAdapter`, static dependency boundary | `test/runtime-dependency-boundary.test.ts`                                |
| HAL owns lifecycle admission and control                   | `RuntimeHost` admitted-execution custody                                   | `test/runtime-adapter-boundary.test.ts` lifecycle positive/negative cases |
| Runtime claims must bind to runtime/agent/task/correlation | `RuntimeHost` callback custody; line-driver test seam                      | Runtime adapter boundary negative claim cases                             |
| Control-plane and post-terminal frames cannot carry claims | `HermesLineDriver` test-only edge                                          | Runtime adapter boundary malformed/control/post-terminal cases            |
| Capability remains HAL-owned                               | `LocalSyntheticCapabilityGateway` and callback custody                     | Runtime boundary permit/deny tests; Contract ARTC-003 through ARTC-006    |
| Runtime claims are non-canonical                           | `RuntimeSubmissionRecorder` and integrity-chained `RuntimeJournal`         | Runtime boundary journal-custody tests; Contract ARTC-007/008             |
| Runtime replacement and memory loss preserve HAL state     | `TestRuntimeAdapter` plus fresh bounded context                            | Runtime boundary replacement/memory test; Contract ARTC-012/013           |
| Subagent request has no implied authority                  | callback custody and non-canonical journal record                          | Runtime boundary subagent custody test; Contract ARTC-009                 |
| No ambient external-resource path exists in HAL Core       | no-network and dependency-boundary tests                                   | `test/no-network-imports.test.ts`; dependency boundary test               |

## Phase A Acceptance Evidence

- `scripts/run_runtime_boundary_checks.sh` passes: deterministic Contract suite, HAL Core format/lint/typecheck/test gate, and diff-integrity check.
- The HAL Core gate currently passes 22 test files and 167 tests.
- The Contract suite currently passes 14 deterministic cases.
- Current HAL-side code has no Hermes package import, external transport, process spawn, resource provider, secret, credential, or network client.

## Remaining Phase A Boundary

The existing `HermesLineDriver` is a test-only injected transport seam, not a production transport. It must not be promoted by renaming or configuration. Before Phase B, a separately recorded adapter-private transport proposal must define the exact connection/protocol, identity binding, ordering, error, replay, cancellation, containment, and removal behavior while preserving the approved semantic Contract.
