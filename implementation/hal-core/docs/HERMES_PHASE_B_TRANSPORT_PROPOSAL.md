# Hermes DR 0012 Phase B — Adapter-Private Transport Proposal

> **Status:** Accepted implementation detail for DR 0012 Phase B. Explicit Owner approval recorded 2026-08-09. Scope remains bounded exactly as stated.

## Recommendation

Use one outbound, short-lived, HAL-harness-owned SSH stdio session from the evaluation controller to the existing GX10-1 `hal_eval` identity. Within that session, an adapter-private, versioned line-framed wrapper may mediate one bounded Hermes invocation. HAL Core remains unaware of SSH, process control, framing, and Hermes internals.

This is an adapter-edge implementation choice constrained by DR 0008, DR 0009, DR 0012, and the GX10 rootless containment evidence. It is not part of the semantic Agent Runtime Contract and cannot become a general remote-execution channel.

## Exact Scope

- One outbound SSH stdio connection; no inbound listener or port publication.
- One authenticated evaluation identity: `hal_eval` on GX10-1.
- One disposable rootless container under the existing no-network, no-device, no-host-mount, non-root, read-only-root, bounded-resource profile.
- One explicit isolated runtime-state directory; no fallback to default Hermes home.
- One synthetic, no-provider, zero-capability task; no user/HAL data, credentials, provider, tools, or resource effect.
- One bounded command lifecycle with correlation-bound progress/result/failure claims and explicit cancellation/destruction.

## Required Wrapper Properties

The wrapper must be adapter-private, use only the selected immutable Hermes input, and expose no raw shell, filesystem, network, credential, or resource operation to HAL Core or Hermes. It must fail closed on malformed, duplicate, replayed, mislinked, control-plane, post-terminal, or timeout frames. It must enforce the existing cancellation deadline and destroy the disposable container/state on completion or stop condition.

## Evidence Before Use

1. Exact wrapper source, container invocation, SSH host identity, runtime identity, and immutable source/artifact hashes.
2. Negative containment results for network, host mount, default home, credentials, provider configuration, and tool surfaces.
3. HAL-side static proof of adapter confinement and callback custody.
4. End-to-end synthetic progress/result/failure, cancellation, destruction, and removal verification.

## Rejection Conditions

Do not use this proposal if Hermes requires a provider, network, secret, unsupported tool surface, unbounded state, a host mount, an inbound service, or any unmediated resource path to complete the synthetic task. Such a finding is an evidence result, not a reason to weaken containment.
