# Proposed Change Request — Hermes Synthetic Isolated Execution

## Status

**Blocked — containment profile validation failed.** This request does not authorize Hermes installation, execution, or connection.

## Decision Requested

Authorize one disposable, network-denied, synthetic-only Hermes evaluation using the source pinned in [DR 0004](../../../decisions/0004-hermes-latest-evaluation-source-pin.md), with the exact containment conditions below.

## Local Isolation Finding

The current macOS host exposes `/usr/bin/sandbox-exec`; Docker, Podman, and `uv` are not present. The recommended initial option is therefore an explicit `sandbox-exec` profile run from a temporary directory—not the HAL repository or the user home. The profile must deny network and default-deny filesystem access except an evaluation root, required system runtime paths, and a write-only isolated `HERMES_HOME` below the evaluation root.

This host capability observation is not a statement that `sandbox-exec` alone proves complete containment. Before execution, the profile must be validated with negative tests for network, user-home access, repository access, and unintended state locations.

## Proposed Scope

- Source: `NousResearch/hermes-agent` tag `v2026.8.3`, commit `3c27eb6234bf91b8ceee9e9071591b31e9b148cb`.
- Environment: newly created disposable directory under `/private/tmp`; destroyed after evidence capture.
- Runtime state: explicit isolated `HERMES_HOME` inside that directory; no fallback to `~/.hermes`.
- Inputs: one synthetic static task only; no HAL canonical knowledge, secrets, credentials, user files, or live data.
- Network: denied at the isolation layer; no model provider/API configuration.
- Tool surfaces: terminal, shell, browser, filesystem, MCP, scheduler, messaging, Home Assistant, computer-use, remote environments, skills installation, and secret sources denied or absent.
- HAL interaction: only through a future adapter-edge test harness; no direct resources, canonical knowledge admission, authority grant, or live effect.

## Exact Prohibited Actions

- No install script, package-manager invocation, global/system install, or system-package change.
- No writes in the HAL repository, home directory, default Hermes directory, NAS, or external volume by Hermes.
- No network sockets, model calls, update checks, downloads, messaging, or external communication.
- No credentials, tokens, `.env` secrets, Keychain access, or secret-provider invocation.
- No runtime tool may invoke a shell, terminal, browser, MCP server, scheduler, device, or remote executor.

## Required Evidence and Stop Conditions

1. Record the exact source commit, isolation profile hash, environment variables, command, and timestamps in a HAL-side journal.
2. Prove negative controls before Hermes launch: network denied; normal home/repository/default-Hermes paths denied; isolated state root writable only as intended.
3. Stop immediately and preserve evidence on a containment failure, unexpected process launch, attempted network operation, path escape, unexpected write, secret request, or any HAL boundary bypass.
4. Destroy the disposable environment after capture unless a separately authorized retention decision is recorded.

## Implemented Pre-Launch Control

`scripts/hermes-synthetic.sb` is the proposed macOS profile template. `scripts/hermes-synthetic-containment-check.sh` exercises its positive isolated-root write/read control and negative network, normal-home, and HAL-repository access controls. Hermes itself is not launched by these checks.

On 2026-08-09, the profile was invoked only with the system Python containment probe. macOS `sandbox-exec` aborted the Python process before the allowed-root control completed, both before and after adding narrowly scoped process-bootstrap allowances. This is a containment validation failure, not a reason to relax the profile. No Hermes process was launched.

## Alternatives

- **Containerized evaluation:** preferred if a separately provisioned and assessed container runtime becomes available; not currently available and not authorized to install.
- **Dedicated disposable VM or separately managed sandbox:** requires a new Owner-approved environment selection and isolation validation plan.
- **No executable evaluation:** retain only static preflight; safest but does not validate actual adapter behavior.

## Authority and Review

This request is constrained by Book II Chapters 2, 15, 29, and 35; Book III Chapters 1, 3, 5, 6, 7, and 9; DR 0001, DR 0002, and DR 0004. It requires explicit Owner approval because it would activate an external runtime process and trust boundary. Independent Book II reviewer evidence remains separately required for a formal recertification claim.
