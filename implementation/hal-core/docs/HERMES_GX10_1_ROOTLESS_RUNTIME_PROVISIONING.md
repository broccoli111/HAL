# GX10-1 Rootless Runtime Provisioning Record

## Status

**Pre-container provisioned; not approved for Hermes execution.** This is operational evidence, not architectural authority. The governing requirements remain [DR 0006](../../../decisions/0006-container-runtime-hermes-evaluation-environment.md) and the [container-runtime specification](HERMES_CONTAINER_RUNTIME_SPECIFICATION.md).

## Scope and custody

- Host: Owner-designated `gx10-01` (GX10-1), Ubuntu 24.04.4 LTS.
- Evaluation identity: `hal_eval`, a dedicated non-sudo account not in the host `docker` group.
- Runtime: Docker Engine 29.2.1 rootless service, installed in the `hal_eval` user scope.
- Control socket: `/run/user/1001/docker.sock`, owned by the evaluation identity; no host Docker socket is exposed to this account.
- Local client identity: the distinct `HAL-GX10-1-hermes-eval` SSH key. It is separate from the administrative `broccoli_01` access key.

## Provisioning evidence

The 2026-08-09 pre-container verification observed:

- `hal_eval` has UID/GID 1001, no `sudo` membership, and no host `docker`-group membership.
- Dedicated subordinate UID/GID ranges were allocated for rootless user namespaces.
- User linger is enabled, and the account-local `docker.service` is active and enabled.
- Docker reports `seccomp`, `rootless`, and `cgroupns` security options with the `overlayfs` storage driver.
- Rootless networking uses `slirp4netns` with host loopback disabled, as recorded by the service startup output.
- The rootless runtime has zero images, zero containers, and zero published ports.
- Read-only capacity observation: 20 logical CPUs, 121 GiB memory, and 824 GiB free beneath `/home/hal_eval`. No GPU/device access was enabled or allocated to the evaluation identity.
- Owner-approved initial disposable-evaluation cap profile: 4 logical CPUs, 16 GiB memory, 256 processes, 30 GiB writable storage, 100 MiB logs, 15-minute maximum runtime, no GPU/device access, and no network access.

## Limits and unresolved containment work

This record is deliberately not a pass/fail containment certification.

- No Hermes artifact has been acquired or executed.
- No container has been created.
- No egress-denial mechanism has been configured or tested; the current specification requires one before evaluation.
- No resource-limit values have been selected, configured, or tested. Rootless Docker reported that I/O `io.max` throttling is unavailable on this host.
- The rootless runtime did not report an AppArmor profile in its Docker security-options output. The host module is loaded, but profile enforcement and suitability remain unverified.
- The rootful host Docker daemon configuration and host firewall remain uninspected because administrator authentication was not supplied to the automation path.
- No image-acquisition policy, image digest, container command, mount policy evidence, negative isolation tests, evidence-transfer route, or destruction test has been established.

## Required next work

1. Define and validate default-deny evaluation egress and ingress behavior without changing HAL authority boundaries.
2. Set and verify explicit CPU, memory, process-count, duration, disk, and log limits for the disposable evaluation container.
3. Inspect the applicable host firewall and Docker daemon controls with approved administrator access.
4. Produce the required negative isolation tests and HAL-side evidence-custody route.
5. Obtain separate authorization for the bounded image-acquisition phase before pulling any Hermes artifact.
