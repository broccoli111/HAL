# Hermes Integration Readiness Plan

## Status

Planning only. Owner-approved production-integration design and conformance planning is recorded in [DR 0011](../../../decisions/0011-production-runtime-integration-design-phase.md) and [the design package](HERMES_PRODUCTION_INTEGRATION_DESIGN.md). Neither document authorizes installation, execution, network access, model-provider configuration, tool enablement, credential use, a production adapter, or activation.

## Candidate Upstream

- Candidate project: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- Candidate documentation: [Hermes Agent documentation](https://hermes-agent.nousresearch.com/docs/)
- Owner-approved evaluation source: `v2026.8.3`, peeled commit `3c27eb6234bf91b8ceee9e9071591b31e9b148cb`; see [DR 0004](../../../decisions/0004-hermes-latest-evaluation-source-pin.md).

The upstream project is treated as an untrusted replaceable provider until HAL’s adapter, identity, policy, Capability Gateway, evidence, lifecycle, recovery, and change-governance checks have been completed. Current static preflight findings are recorded in [HERMES_SOURCE_PREFLIGHT_v2026.8.3.md](HERMES_SOURCE_PREFLIGHT_v2026.8.3.md); the v0.18.2 preflight is historical.

## Preconditions Before Any Connection

1. Store the independent targeted Book II review disposition; do not claim certification from Owner approval alone.
2. The immutable upstream release/commit is selected in DR 0003. Maintain the permitted scope as read-only source preflight until separately authorized for installation/execution.
3. Complete the selected upstream release’s provenance, license, dependency inventory, security posture, default tool behavior, local state locations, network/model-provider behavior, and recovery/removal review. Static-source findings are complete; executable evaluation remains blocked.
4. Define a least-privilege evaluation environment with no HAL secrets, governed-resource handles, ambient filesystem authority, NAS access, unrestricted shell, external messaging, or home-automation access.
5. Define the Hermes driver edge entirely inside `HermesAdapter`; HAL Core remains dependent on only the Agent Runtime Contract.
6. Exercise only synthetic, deterministic Runtime Contract cases through HAL-owned `RuntimeHost`, `LocalSyntheticCapabilityGateway`, and `RuntimeJournal` controls.
7. Produce evidence for startup, bounded context, capability denial, permitted synthetic request, report custody, cancellation, failure containment, replacement, memory loss, recovery, and shutdown.
8. Define containment, uninstall, state-removal, and rollback procedures before any activation.

## Explicit Non-Goals

- Do not install Hermes or any model/provider SDK.
- Do not create a process, network, MCP, shell, browser, filesystem, secret, or scheduler bridge.
- Do not import Hermes into HAL Core.
- Do not permit runtime-local state to become HAL canonical knowledge.
- Do not grant runtime authority based on tool availability or technical reachability.

## Acceptance Gate

An actual Hermes evaluation may begin only when a separately scoped Owner decision identifies the immutable upstream input, evaluation environment, allowed operations, authority limits, evidence requirements, review/rollback conditions, and the identity of the HAL-side accountable component. This plan is subordinate to Book I, Book II, Book III, DR 0001, and DR 0002.
