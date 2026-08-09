# Decision Record 0007 — GX10-1 Synthetic Runtime Test Phase

| Field | Value |
| --- | --- |
| Status | Accepted |
| Date | 2026-08-09 |
| Scope | Bounded, non-production GX10-1 runtime-containment testing |
| Owner Review | Explicitly approved by the Owner on 2026-08-09 |

## Decision

The Owner authorizes the steps required to complete the bounded GX10-1 synthetic runtime testing phase under the constraints below. This is not production integration, canonical-state admission, resource delegation, or a grant of authority to Hermes or any runtime.

Phase 1 authorizes acquisition of one immutable base image into the `hal_eval` rootless Docker runtime and containment testing with synthetic commands only:

- Source: Docker Official Image `docker.io/library/python` Linux/ARM64 manifest `sha256:8c5de2243cba89f49a93e05cacb78e27058bcaa69c148baac127005da03af39e` (`python:3.13-slim` resolved on 2026-08-09).
- Runtime identity: the GX10-1 `hal_eval` rootless Docker service only.
- Test profile: no network, no published ports, no host mounts or sockets, read-only root filesystem, no privilege escalation or devices, the approved resource caps in DR 0006, and disposable state.
- Permitted workload: synthetic containment probes only; no Hermes checkout, install, import, build, process launch, provider/model configuration, credentials, secrets, HAL data, governed resources, or external communications.

Subsequent phases must retain the same authority and containment constraints and record their exact immutable inputs, effective command, evidence, stop conditions, and cleanup before activation.

Phase 2 authorizes a materialized working tree from the already acquired DR 0004-pinned Git object under the isolated `hal_eval` acquisition path, plus one minimal static-validation image that copies that tree onto the Phase 1 base image with no `RUN` instruction and with build networking disabled. Its only permitted workload is non-importing syntax compilation inside the proven Phase 1 profile. It does not authorize dependency installation, package build, Hermes import, agent-loop launch, model/provider configuration, or tool enablement.

Phase 3 authorizes one minimal dependency-bearing smoke-test image using the pinned source's `uv.lock` and its upstream digest-pinned `ghcr.io/astral-sh/uv:0.11.6-python3.13-trixie@sha256:b3c543b6c4f23a5f2df22866bd7857e5d304b67a564f4feab6ac22044dde719b` build utility. Build-time package acquisition is limited to the lockfile resolution with no credentials. The sole permitted Hermes process is a bounded CLI help invocation with `HERMES_HOME` beneath the container's isolated temporary state path and runtime network disabled. No model/provider, tools, adapter transport, HAL data, secrets, governed resource, or external communication is authorized.

## Context

DR 0004 pins the external runtime source. DR 0006 establishes GX10-1 and its rootless evaluation identity. The base image satisfies the pinned source's Python `>=3.11,<3.14` constraint without adopting the upstream Dockerfile, which exposes broad tool and network surfaces unsuitable for the first containment probe.

## Consequences

- Base-image acquisition is allowed only by digest, not mutable tag.
- The base image is not a Hermes installation and cannot imply approval of Hermes execution.
- Container/network/host-boundary evidence must be captured before any later runtime-specific step.
- Failure or an unexpected boundary effect requires immediate stop, evidence preservation, and containment; it must not be bypassed by relaxing controls.

## Authoritative Sources

Book I; Book II Chapters 1, 2, 15, 29, 34, and 35; Book III Chapters 5 and 6; DR 0001, DR 0002, DR 0004, and DR 0006.
