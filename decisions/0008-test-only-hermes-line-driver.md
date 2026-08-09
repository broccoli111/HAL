# Decision Record 0008 — Test-Only Hermes Line Driver

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-08-09 |
| Scope | Test-only HAL↔Hermes transport boundary |
| Owner Review | Explicitly approved by the Owner on 2026-08-09 |

## Decision

HAL will use an injected, line-framed command driver at the `HermesAdapter` edge for GX10-1 synthetic testing. HAL Core does not open SSH connections, import Hermes, own a Hermes process, or interpret Hermes internals. The injected transport may use the approved hardened GX10-1 SSH path outside HAL Core.

The driver carries bounded lifecycle inputs and remote progress/result/failure claims. Its initial capability manifest is empty. A future capability request is only forwarded to HAL-owned callbacks; it grants nothing itself. All remote reports remain non-canonical until separately accepted through HAL processes.

## Consequences

- No inbound listener, persistent service, secret, provider, model, governed resource, or direct HAL-state access is introduced.
- Cancellation is a bounded transport command/process termination operation, with HAL retaining lifecycle authority.
- The transport is test-only and replaceable; it does not amend the Agent Runtime Contract.

## Authoritative Sources

Book I; Book II Chapters 1, 2, 15, 29, 34, and 35; Book III Chapters 3, 5, and 6; DR 0001, DR 0002, DR 0006, and DR 0007.
