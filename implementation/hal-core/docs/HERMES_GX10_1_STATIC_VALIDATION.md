# GX10-1 Hermes Static Validation Record

## Status

**Phase 2 passed; no Hermes import or runtime process occurred.** Governing scope: [DR 0007](../../../decisions/0007-gx10-1-synthetic-runtime-test-phase.md).

## Input and build

- Hermes source: DR 0004-pinned commit `3c27eb6234bf91b8ceee9e9071591b31e9b148cb`.
- Source checkout: detached, clean working tree under the isolated `hal_eval` acquisition path.
- Static-validation image: `hal-hermes-static:phase2-20260809`, image ID `sha256:df34d815af2702d84a95d2e8fce5847e9a21f7f64ca060462008e3c0daab2f02`, 61,484,273 bytes.
- Build: cached digest-pinned Phase 1 Python base; build networking disabled; Dockerfile contains only `FROM`, `WORKDIR`, `COPY`, and `ENV`; no `RUN`, package installation, source import, or source execution.

## Result

The source was checked with Python's in-memory `compile()` over 1,106 `*.py` files. It exited 0 while running as UID/GID 65534 in the same rootless containment profile: network `none`, read-only root, zero host mounts, `CapDrop=["ALL"]`, no-new-privileges, no devices, and the DR 0006 CPU/memory/process/log caps.

An initial `compileall` attempt correctly failed because the read-only root denied `__pycache__` creation. That stopped container was removed; it did not import Hermes. The in-memory check replaced it and introduced no source writes.

## Cleanup and limits

- The successful validation container was destroyed; rootless Docker has zero containers.
- The base image and local static-validation image remain as evidence-bearing test inputs.
- No dependency package, Hermes import, CLI, agent loop, model provider, credential, `HERMES_HOME`, tool, Capability Gateway request, canonical state, or HAL adapter transport was activated.
- A first Hermes-process smoke test requires a new dependency-bearing image, immutable dependency/provenance evidence, a bounded command, isolated `HERMES_HOME`, and separate Phase 3 activation record.
