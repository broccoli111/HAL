# Local Inference Mediation Contract

> **Status:** Owner-authorized design and conformance plan under DR 0018. This is not an active route or transport specification.

## Purpose and Scope

This contract defines the implementation-neutral security boundary between HAL and a replaceable agent runtime for one synthetic local-inference request. It exists to preserve HAL authority when runtime execution needs model output. It does not create a general model gateway, a capability class, a standing credential, or an inference permission.

The initial profile is deliberately fixed: GX10-1, local Ollama loopback service, `qwen3:8b`, synthetic text only, no tools, no external provider, no streaming, no runtime-accessible host resource, and no canonical knowledge promotion.

## Roles and Ownership

| Role                  | Owns                                                                                                       | Must not own                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| HAL admission service | Work admission, placement, binding issuance/revocation, policy disposition, evidence custody, cancellation | Runtime reasoning or model output truth                                     |
| Mediation service     | Contract validation, fixed-route enforcement, bounded relay, teardown signal                               | Authority issuance, policy interpretation, canonical knowledge              |
| Runtime adapter       | Delivers HAL-admitted request and returns a non-canonical result claim                                     | Binding issuance, policy decision, direct resource access                   |
| Agent runtime         | Requests inference within an admitted task                                                                 | Authority, model selection beyond the admitted profile, host/network access |
| Ollama service        | Executes the fixed local model request                                                                     | HAL identity, policy, evidence, lifecycle, resource authority               |

## Semantic Operations

| Operation              | Caller                       | HAL-controlled result                                                                           |
| ---------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `admitInference`       | HAL lifecycle/admission path | Creates one-use binding or refuses.                                                             |
| `requestInference`     | Runtime through adapter      | Mediator validates the binding and executes only the fixed profile or denies.                   |
| `cancelInference`      | HAL                          | Terminates the exact admitted request; no result claim is accepted after terminal cancellation. |
| `reportInferenceClaim` | Adapter                      | Retains a correlated, non-canonical operational claim.                                          |
| `revokeInference`      | HAL recovery/quarantine path | Invalidates unused binding and tears down route state.                                          |

Exact APIs, serializations, transports, and cryptographic formats are intentionally deferred. A later implementation must preserve these semantics and pass the declared conformance suite.

## Required Binding Semantics

HAL alone issues a binding with, at minimum, these conceptual attributes:

- mediator contract version and immutable profile identifier;
- HAL-issued binding identifier, nonce, issuance/expiry, one-use state, and revocation state;
- authenticated runtime instance and adapter identity;
- HAL agent, task, and correlation identifiers;
- approved model identity, synthetic data classification, purpose, context/token/byte/time/concurrency limits; and
- required operational evidence identifier.

The binding is valid only for the exact values HAL issued. It is not Authority, Delegation, Permission, a bearer capability, or a general-purpose secret. The mediator must reject missing, altered, expired, replayed, revoked, mismatched, or terminal bindings without upstream contact.

## State and Failure Model

`issued → presented → executing → terminal` is the only forward path. Terminal states are `completed`, `denied`, `cancelled`, `failed`, `expired`, and `revoked`. No terminal state may become executing. A crash, timeout, lost runtime memory, evidence failure, or uncertainty about binding state becomes `failed` or `revoked`; it never permits retry under the same binding.

On every denial or terminal event, HAL retains only minimized operational evidence. Model output is a runtime result claim and is not canonical knowledge, accepted evidence, authority, or completion merely because transport succeeded.

## Non-Negotiable Boundary Rules

- The mediator has one fixed local upstream and cannot resolve names, use external providers, or select an upstream from runtime input.
- The runtime receives no filesystem, shell, Docker socket, GPU device, secret, LAN, internet, host-network, or raw Ollama endpoint access.
- The mediator exposes no public/LAN listener and no reusable route after binding expiry or teardown.
- HAL may cancel, quarantine, revoke, and reconstruct runtime work independently of mediator/runtime state.
- Replacing Hermes with another runtime changes only an adapter implementation, never these semantics.

## Evolution

New models, data classes, route classes, providers, or permissions are out of scope. They require separate Owner Review and a new versioned profile/Decision Record; a configuration edit must not broaden this contract.
