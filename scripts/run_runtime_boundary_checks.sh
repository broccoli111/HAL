#!/usr/bin/env sh

# Test-only, local verification runner for the Agent Runtime boundary.
# It opens no network connection and invokes no Hermes process or resource.
set -eu

repo_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)

cd "$repo_root"
python3 -m unittest -q tests.agent_runtime_contract.test_conformance
python3 -m unittest -q tests.agent_runtime_contract.test_local_inference_proxy
python3 -m unittest -q tests.agent_runtime_contract.test_local_inference_mediation_contract
python3 -m unittest -q tests.agent_runtime_contract.test_positive_mediation_validation
python3 -m unittest -q tests.agent_runtime_contract.test_mediation_script_boundaries
python3 -m unittest -q tests.agent_runtime_contract.test_readonly_shell_pilot

cd "$repo_root/implementation/hal-core"
npm run check

cd "$repo_root"
git diff --check
