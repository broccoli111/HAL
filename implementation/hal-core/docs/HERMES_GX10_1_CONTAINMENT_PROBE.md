# GX10-1 Synthetic Container Containment Probe

## Status

**Phase 1 passed for the synthetic base-image probe only.** This is not Hermes installation, execution, integration, or a general container-security certification. Governing scope: [DR 0007](../../../decisions/0007-gx10-1-synthetic-runtime-test-phase.md).

## Immutable input

- Base image: Docker Official Image `python` Linux/ARM64 manifest `sha256:8c5de2243cba89f49a93e05cacb78e27058bcaa69c148baac127005da03af39e`.
- Pulled repository digest: `docker.io/library/python@sha256:8c5de2243cba89f49a93e05cacb78e27058bcaa69c148baac127005da03af39e`.
- Observed platform and size: `linux/arm64`, 43,244,556 bytes.

## Effective probe profile

- Rootless `hal_eval` Docker service only.
- `--network none`; no published ports.
- `--read-only` root filesystem.
- `/state` as a 64 MiB `rw,noexec,nosuid` temporary filesystem; no host bind mount or socket.
- UID/GID `65534:65534`; `--cap-drop ALL`; `no-new-privileges`; no devices.
- 4 CPUs, 16 GiB memory, 256-process limit, local logs capped at 100 MiB.

Docker inspection confirmed: network mode `none`, read-only root, unprivileged user, 4,000,000,000 NanoCPUs, 17,179,869,184-byte memory limit, 256 process limit, `Privileged=false`, zero host mounts, `CapDrop=["ALL"]`, `SecurityOpt=["no-new-privileges"]`, no devices, and local `max-size=100m` logs.

## Probe result

The synthetic Python probe wrote a marker under `/state` and attempted to connect to `1.1.1.1:443`. The connection failed with errno `101` (`ENETUNREACH`), and the probe exited `0` after asserting that denial.

This establishes that the configured container had an isolated writable temporary state path and no external network route under `--network none`. It does not establish host-firewall policy, broader host compromise resistance, or Hermes behavior.

## Cleanup and deviations

- The successful probe container was destroyed after effective-config and log capture; rootless Docker has zero remaining containers.
- The immutable base image remains retained as the authorized Phase 1 input; it is not Hermes.
- Two earlier disposable probe attempts were removed immediately: one lacked an explicit Python entrypoint and started no process; the second reached only a Python syntax error caused by escaped probe text. Neither ran Hermes or reached a network operation.
- The test used a 64 MiB temporary state path, a stricter effective writable-state bound than the 30 GiB approved maximum. The 30 GiB upper bound has not yet been validated as a storage-quota control.

## Remaining limits

- No Hermes source has been checked out, installed, imported, built, or executed.
- No `HERMES_HOME`, runtime adapter transport, HAL callback, governed capability, canonical knowledge, secret, model provider, or external tool was introduced.
- Duration enforcement, 30 GiB writable-storage enforcement, and broader negative filesystem/host-boundary probes remain to be demonstrated for a later runtime-specific phase.
