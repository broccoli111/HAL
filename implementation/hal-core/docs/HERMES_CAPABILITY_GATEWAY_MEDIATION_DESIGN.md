# Hermes Reference Runtime v1 — Capability Gateway Mediation Design

> **Status:** Design-phase requirement. It creates no capability class, API, resource provider, credential, or authorization path.

## 1. Purpose

This design applies Book II Chapter 15’s Capability Gateway boundary to a future Hermes adapter. It describes the mandatory mediation properties without selecting capability names, a request schema, transport, target type, or resource implementation.

## 2. Boundary Rule

Hermes may request a capability; HAL decides its disposition. The runtime and adapter receive neither an ambient resource handle nor authority inferred from a tool, skill, environment, connection, or credential.

```text
Runtime request
  -> HAL callback custody and admitted-execution linkage validation
    -> Capability Gateway evaluation
      -> permit / deny / authorization required / narrower disposition
        -> HAL-owned governed-resource provider and evidence path
```

Only a separately approved HAL capability/provider implementation may perform a real effect after a permitted disposition. The future Hermes adapter must not perform the effect itself.

## 3. Required Evaluation Context

The Gateway evaluation must receive, or fail closed without, the following context:

- actor and runtime/provider identity;
- HAL agent, task, correlation, and transaction context;
- delegated authority and current policy version;
- requested capability and target/resource classification;
- purpose, scope, time, risk, Treaty/privacy, and authorization requirements; and
- required evidence, verification, idempotency, and recovery/compensation context.

The runtime may provide claims about some inputs, but HAL validates or supplies authoritative values. A runtime claim cannot create a capability, delegation, policy, target permission, or authorization requirement.

## 4. Disposition Rules

| Disposition                                | Runtime-visible meaning                                                         | Required HAL behavior                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Permitted                                  | A bounded request may proceed only through the selected HAL-owned provider path | Record evidence/audit context and retain transaction/recovery controls |
| Denied                                     | No authority exists for the request                                             | Return no handle or workaround; preserve decision evidence as required |
| Authorization required                     | The request is paused pending required authorization                            | Prevent retry-around, speculative execution, or inferred approval      |
| Narrowed / unavailable / failed validation | The request is not executable as proposed                                       | Return the bounded disposition; no fallback to ambient access          |

Transport success, a runtime’s claimed prior success, or a local tool’s availability must not change a disposition.

## 5. Adapter Requirements

- Forward a runtime capability claim only after HAL callback custody verifies admitted runtime, agent, task, and correlation linkage.
- Treat any missing, malformed, replayed, stale, broadened, or mislinked request as denied/failed validation before a resource provider is reached.
- Accept only a HAL-issued bounded disposition; do not cache, broaden, synthesize, or reinterpret it.
- Never translate a permitted disposition into a raw host path, secret, shell, network socket, process handle, or direct runtime credential.
- Preserve correlation between request, Gateway decision, provider invocation, verification, failure, and recovery evidence.

## 6. Required Negative and Recovery Tests Before Activation

- unknown, absent, malformed, and unsupported capability requests;
- identity/task/correlation mismatch, duplicate, replayed, stale, and scope-expanded requests;
- deny and authorization-required dispositions with proof of no resource effect;
- provider unavailability, timeout, partial/ambiguous result, cancellation, and recovery paths;
- attempts to treat a manifest, tool definition, prior permit, or runtime memory as continuing authority; and
- proof that runtime reports remain non-canonical even after a permitted request.

## 7. Deferred Decisions

Capability taxonomy, request schema, target representation, policy language, authorization UX, provider implementation, credential model, effect model, and evidence storage details remain governed by their respective HAL Canon processes. They are not selected by this design.
