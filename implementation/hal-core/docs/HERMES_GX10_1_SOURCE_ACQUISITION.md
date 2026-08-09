# GX10-1 Hermes Source Acquisition Record

## Status

**Completed source-only acquisition; not installed or executable.** This operational record is subordinate to [DR 0004](../../../decisions/0004-hermes-latest-evaluation-source-pin.md), [DR 0006](../../../decisions/0006-container-runtime-hermes-evaluation-environment.md), and the [container-runtime specification](HERMES_CONTAINER_RUNTIME_SPECIFICATION.md).

## Authorized scope

On 2026-08-09, the Owner authorized one source-only fetch by the non-privileged `hal_eval` identity on GX10-1. The permitted upstream input was the official `https://github.com/NousResearch/hermes-agent.git` tag `v2026.8.3`, resolved by DR 0004 to commit `3c27eb6234bf91b8ceee9e9071591b31e9b148cb`.

The acquisition command used a shallow, blob-filtered Git clone with `--no-checkout` into `/home/hal_eval/hermes-acquisition/source`. It did not build, install, import, execute, or materialize a Hermes working tree. It did not pull a Docker image or create a container.

## Verification evidence

- Resolved `HEAD^{commit}`: `3c27eb6234bf91b8ceee9e9071591b31e9b148cb` (matches DR 0004).
- Remote URL: `https://github.com/NousResearch/hermes-agent.git`.
- `git fsck --no-dangling` completed without findings.
- Non-`.git` worktree entry count: `0`.
- Git object-store size after fetch: `404 KiB`.
- Rootless Docker inventory after fetch: zero images and zero containers.

## Explicit limits

- No Hermes code has been checked out, installed, imported, or executed.
- No Python, Node, package-manager, model-provider, credential, tool, MCP, browser, shell, scheduler, or external-runtime surface was activated.
- The fetch was a bounded host-side provenance operation, not permitted runtime network access.
- Any Docker image pull, source checkout, build, dependency resolution, container creation, or Hermes execution requires separate authorization and containment evidence.
