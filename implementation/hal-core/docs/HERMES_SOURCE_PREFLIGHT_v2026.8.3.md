# Hermes Source Preflight — v2026.8.3

## Scope and Result

| Field           | Value                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------- |
| Source          | `https://github.com/NousResearch/hermes-agent.git`                                          |
| Approved tag    | `v2026.8.3` / Hermes Agent v0.20.0                                                          |
| Resolved commit | `3c27eb6234bf91b8ceee9e9071591b31e9b148cb`                                                  |
| Tag object      | `7de39e700d2c329e15d32eb0b96e2f7cdd9fbdb2`                                                  |
| Method          | Read-only shallow clone into a temporary directory; no install, build, import, or execution |
| Result          | **Not eligible for execution yet**                                                          |

This is a static source preflight, not a security certification or production approval. It is governed by [DR 0004](../../../decisions/0004-hermes-latest-evaluation-source-pin.md).

## Material Observations

- The pinned `pyproject.toml` declares core network/model-provider and server libraries including `openai`, `httpx`, `requests`, `websockets`, `fastapi`, and `uvicorn`, plus the built-in `croniter` scheduler.
- Optional dependency groups expose messaging, MCP, Home Assistant, computer-use, cloud-memory, browser-adjacent, and remote-environment surfaces.
- Runtime source defaults `HERMES_HOME` to `~/.hermes` unless explicitly set and uses persistent local state including `state.db`.
- Static inspection identifies local subprocess use in code-execution, terminal, browser, MCP, checkpoint, environment, secret-source, and related tool paths.

## Required Containment for Any Future Execution

1. Use a dedicated disposable evaluation environment, not the HAL repository, normal user home, or any NAS-backed path.
2. Set an explicit isolated `HERMES_HOME`; never permit fallback to `~/.hermes`.
3. Provide no HAL secrets, provider API keys, owner credentials, production accounts, or governed-resource handles.
4. Deny all network, messaging, MCP, browser, terminal, code-execution, scheduler, computer-use, Home Assistant, and remote-environment surfaces.
5. Permit only a synthetic task and only through HAL-owned `RuntimeHost`, `LocalSyntheticCapabilityGateway`, `RuntimeJournal`, and `RuntimeSubmissionRecorder` controls.
6. Define process, filesystem, environment-variable, state-erasure, recovery, and rollback evidence before launch.
7. Do not connect a runtime report or Hermes state to HAL canonical knowledge, authority, policy, Evidence Graph acceptance, or lifecycle disposition by implication.

## Blocking Preconditions

- The independent targeted Book II review disposition must be stored before any formal recertification statement or authoritative Book II publication-status update.
- A separate execution authorization must specify the environment, containment implementation, permitted command, resource limits, evidence, stop conditions, and removal procedure. DR 0004 authorizes only this source preflight.
