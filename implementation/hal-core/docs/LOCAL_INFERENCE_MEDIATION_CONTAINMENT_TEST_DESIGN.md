# Local Inference Mediation — Containment Test Design

> **Status:** Planned only under DR 0017 and DR 0018. This document does not authorize a route, mount, container, or Hermes activation.

## Purpose

Prove, before any bounded positive inference test, that the future evaluation namespace cannot bypass HAL-owned mediation or reach any non-admitted destination. This design tests containment, not model usefulness.

## Immutable Test Topology

```text
Synthetic runtime namespace
  └─ one admitted mediator endpoint
       └─ HAL-issued one-use binding validation
            └─ fixed local Ollama loopback upstream

All other paths: DENY
```

The namespace must receive no host network, published port, Docker socket, host filesystem, GPU/device, secret, runtime credential, raw Ollama socket, or general route. The mediator must have one fixed local upstream and no name resolution.

## Test Matrix

| ID     | Probe                                                                        | Expected result                                                                     | Required evidence                                           |
| ------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| CT-001 | DNS resolver addresses and arbitrary name                                    | Denied; no DNS query/connection.                                                    | Namespace command result and host-side absence/deny record. |
| CT-002 | Internet and LAN addresses                                                   | Denied; no route/connection.                                                        | Attempt result and namespace route table.                   |
| CT-003 | Host loopback listeners, including `11434`, `11000`, printing, and SSH       | Denied.                                                                             | Per-port attempt result.                                    |
| CT-004 | Docker/host socket paths, filesystem paths, environment secrets, and devices | Absent/unreadable.                                                                  | Mount, environment, and device inventory.                   |
| CT-005 | Mediator endpoint without binding                                            | Denied before upstream contact.                                                     | Mediator event and zero-upstream assertion.                 |
| CT-006 | Expired, replayed, mismatched, revoked, or profile-mutated binding           | Denied before upstream contact.                                                     | Correlated disposition and zero-upstream assertion.         |
| CT-007 | Cancellation, mediator failure, runtime loss                                 | Terminal/revoked; no retry or binding reuse; route state removed.                   | Terminal state and teardown verification.                   |
| CT-008 | Exact admitted synthetic request                                             | Not run until CT-001 through CT-007 pass and Owner activation authorization exists. | Separate bounded positive-test record.                      |

## Execution Controls

- Use a disposable, digest-pinned image and a separately recorded least-privilege runtime profile.
- Begin and end with `--network none`; no default bridge or host network is acceptable.
- Keep the mediator identity, binding state, and operational evidence HAL-owned. The runtime only submits a request.
- Each probe has a timeout, byte/log limit, cleanup action, expected deny condition, and fail-closed stop condition.
- Do not use Hermes, real data, capabilities, tools, secrets, or a general-purpose transport.

## Entry and Exit Criteria

Entry requires an approved implementation-specific route design that faithfully implements [LOCAL_INFERENCE_MEDIATION_CONTRACT.md](LOCAL_INFERENCE_MEDIATION_CONTRACT.md), plus explicit Owner authorization to create that route for the declared containment scope.

Exit requires every CT-001 through CT-007 to pass with durable, correlated, minimized evidence. Any unexpected route, listener, mount, identity mismatch, missing evidence, or cleanup failure stops testing, tears down the route, and returns to the no-connection state. CT-008 is a separate Owner-gated stage.
