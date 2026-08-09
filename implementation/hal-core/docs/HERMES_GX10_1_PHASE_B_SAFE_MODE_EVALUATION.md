# GX10-1 Hermes DR 0012 Phase B Safe-Mode Evaluation

## Scope and Status

**Passed for the stated bounded evaluation only.** Hermes v2026.8.3 was started once in safe mode with one synthetic, zero-capability task and failed before inference because no provider or API key was configured. This is not a production deployment, provider/model evaluation, real capability invocation, or a certification claim.

## Immutable Input and Environment

- Hermes source: DR 0004-pinned `v2026.8.3`, commit `3c27eb6234bf91b8ceee9e9071591b31e9b148cb`.
- Image: `hal-hermes-smoke:phase3-20260809`, image digest `sha256:9cd872b617d537247bc7cd9c23f5ccb1227da2e3687e59556102dc1bc0d0ae1d`.
- Host identity: GX10-1 `gx10-01`; evaluation identity: non-privileged `hal_eval` rootless Docker service.
- Transport: the Owner-approved one outbound SSH stdio session in [Phase B transport proposal](HERMES_PHASE_B_TRANSPORT_PROPOSAL.md).

## Effective Containment

- Network disabled (`--network none`); no published ports.
- Read-only root; isolated 64 MiB `/state` tmpfs with `noexec,nosuid`.
- `HERMES_HOME=/state` and `HOME=/state`; no default Hermes home fallback.
- UID/GID `65534:65534`, no devices, `--cap-drop ALL`, `no-new-privileges`, no host mounts.
- 4 CPUs, 16 GiB memory, 256 processes, local logs limited to 100 MiB, and a 15-minute command bound.
- Safe mode, quiet CLI, one maximum turn, and one synthetic query. No provider, API key, toolset, credential, or resource capability was supplied.

## Result

The first invocation used an invalid top-level CLI prompt form. Hermes printed command usage and exited before task execution. It did not use a provider, model, tool, capability, network, secret, or HAL resource.

The valid invocation was:

```text
hermes chat --safe-mode --quiet --max-turns 1 --query "Synthetic zero-capability evaluation. Reply exactly HAL."
```

Hermes reported that no API keys or providers were configured, suggested setup/configuration, and exited `1`. This is the expected safe failure: inference did not begin, no provider was contacted, and no tool or capability action occurred.

## Cleanup Verification

Immediately after the evaluation:

- rootless Docker containers: `0`;
- named Phase B container: absent; and
- `/home/hal_eval/.hermes`: absent.

The writable `/state` tmpfs was removed with the disposable container. No HAL resource, canonical knowledge, evidence acceptance, policy, authority, credential, or provider configuration was introduced.

## Limits and Next Disposition

This evidence proves only the bounded safe-mode/no-provider containment behavior above. It does not prove a real model invocation, a production transport, tool safety, resource mediation under a real provider, or deployment readiness. Phase C must record the complete evaluation disposition and retain all prohibitions before any broader request is considered.
