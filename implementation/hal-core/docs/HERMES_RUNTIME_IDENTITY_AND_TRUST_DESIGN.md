# Hermes Reference Runtime v1 — Runtime Identity and Trust Design

> **Status:** Design-phase requirement. It does not select an authentication technology or authorize a connection.

## 1. Purpose

This design specifies what HAL must establish before it admits a future Hermes Reference Runtime v1 execution. It preserves the Book II rule that runtime availability, network location, tool reachability, or secret possession never constitute trust or authority.

## 2. Identity Objects

| Object                        | HAL-owned meaning                                                                  | Runtime role                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Runtime provider identity     | The configured provider/adapter identity and its approved provenance               | Claimed identity subject to HAL verification                 |
| Runtime instance identity     | One bounded execution instance associated with a provider identity and environment | Presents verifiable instance identity                        |
| Adapter identity              | HAL-owned HermesAdapter version and compatibility declaration                      | Mediates adapter-private mechanics only                      |
| Agent identity                | HAL-admitted agent identity                                                        | Must be echoed, never created as HAL identity by the runtime |
| Task and correlation identity | HAL-owned binding of admitted work, authority, policy, and evidence                | Must accompany every runtime claim                           |

No runtime identity object is Owner identity, constitutional identity, canonical knowledge, delegated authority, or permission.

## 3. Admission Requirements

Before a runtime instance receives context or a capability manifest, HAL must have attributable evidence that:

1. the selected provider/artifact matches the Owner-approved immutable input and its approved provenance;
2. the adapter version is compatible with the semantic Agent Runtime Contract;
3. the runtime instance is bound to the expected provider/environment identity with declared freshness and revocation behavior;
4. the HAL-side accountable component has created the agent, task, correlation, policy, and delegated-authority context; and
5. the instance has no ambient governed-resource, secret, or credential authority outside HAL mediation.

Failure or uncertainty at any point leaves the runtime unadmitted or quarantined. HAL may collect limited diagnostic evidence without granting protected work.

## 4. Claim Binding and Verification

Every runtime-originated claim must be attributable to the admitted provider/runtime instance and carry the HAL-issued agent, task, and correlation linkage. HAL validates that binding before forwarding a capability request or recording a claim.

Identity verification must define the following implementation-specific properties before activation:

- proof material and its source of trust;
- freshness/expiry and replay prevention;
- rotation, revocation, replacement, and quarantine behavior;
- compatibility/version binding for the adapter-private interface;
- evidence retention, classification, and integrity rules; and
- behavior under unavailable, conflicting, malformed, or partially verified identity evidence.

The technology, protocol, key format, and attestation mechanism are deliberately deferred.

## 5. Trust Failure Matrix

| Condition                                              | HAL disposition                        | Runtime authority                                 |
| ------------------------------------------------------ | -------------------------------------- | ------------------------------------------------- |
| Identity absent, malformed, expired, or mismatched     | Do not admit; record a bounded failure | None                                              |
| Identity revoked or compromise suspected               | Quarantine and stop protected work     | None beyond diagnostic evidence allowed by policy |
| Linkage mismatch on a claim                            | Reject before Gateway/evidence handler | None                                              |
| Transport or identity freshness uncertain              | Pause/contain; do not infer continuity | No new effect or retry                            |
| Runtime process remains reachable but identity invalid | Treat as untrusted/unadmitted          | None                                              |

## 6. Evidence and Verification Before Activation

- positive identity admission and rotation cases;
- negative absent, forged, stale, replayed, revoked, mismatched, and split-identity cases;
- quarantine/recovery/replacement behavior with no policy, authority, or canonical-state change;
- static proof that HAL Core does not consume Hermes implementation identity data; and
- an evidence record linking runtime/provider identity to the approved immutable artifact and environment declaration.

## 7. Deferred Decisions

Credential technology, key custody, secure hardware use, attestation provider, network topology, runtime process/container identity, rotation intervals, and retention periods require a later scoped proposal. None is selected here.
