# Hermes Disposable VM Specification

## Status

Provider-neutral requirement specification. No local VM provisioner is currently available, and no VM is created by this document.

## Purpose

Define the minimum isolation properties for the Owner-selected disposable VM before any synthetic Hermes execution is considered.

## Required Properties

- Dedicated, newly provisioned VM; no shared user workload or prior personal data.
- Architecture compatible with the selected Hermes source and its Python requirements.
- Disposable disk and state; destruction is the default completion action.
- No shared folders, host-home mounts, HAL-repository mounts, NAS mounts, clipboard sharing, USB/device passthrough, Keychain access, or host credential forwarding.
- No inbound listener, public address, messaging integration, cloud identity, or external account access.
- Egress denied by default. A one-time, separately authorized dependency-acquisition phase is required before any package retrieval; that phase is not authorized by this specification.
- Explicit `HERMES_HOME` under the VM evaluation root; no use of the default user-home location.
- No secrets, provider API keys, tokens, `.env` files, owner credentials, canonical HAL data, or governed-resource handles.
- No terminal, shell, browser, MCP, scheduler, computer-use, Home Assistant, messaging, remote-environment, or secret-source capability enabled for the synthetic task.

## Pre-Launch Validation

1. Capture VM image/version, architecture, provisioning manifest, disk lifecycle, and isolation settings.
2. Prove no host/HAL/NAS/shared-folder access.
3. Prove network egress and inbound access are denied for the evaluation phase.
4. Prove the isolated evaluation root and explicit `HERMES_HOME` are the only writable runtime locations.
5. Prove denial of environment variables and files carrying secrets.
6. Record all evidence in HAL-side test artifacts before the external runtime starts.

## Stop Conditions

Stop and destroy the VM if validation finds an unexpected mount, network path, credential source, runtime state outside the evaluation root, capability enablement, or evidence-custody bypass.

## Provisioning Decision Still Required

The Owner must select or provide one mechanism: an existing dedicated VM, an approved local hypervisor installation, or an approved cloud/hosted VM provider. That decision must include the provider/technology, image, lifecycle, egress policy, and how the VM will be accessed without granting Hermes host or HAL authority.
