#!/usr/bin/env python3
"""Disposable full-Hermes CLI compatibility probe with no runtime tools.

This is evaluation-only infrastructure for DR 0026.  It is intentionally not
the restricted transport entrypoint and cannot accept a caller-selected prompt
or capability manifest.  Its fixed probe checks whether Hermes's full CLI can
complete one local-model turn when the configuration explicitly enables no
toolsets.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
import secrets
import shutil
import subprocess
import sys
import tempfile
import time


BASE = Path(__file__).resolve().parent
MEDIATOR = BASE / "hal_hermes_local_mediation.py"
RELAY = BASE / "hal_uds_loopback_relay.py"
IMAGE = "hal-hermes-smoke:phase3-20260809"
PROMPT = "Reply with exactly: HAL_LOCAL_OK"
MAX_DIAGNOSTIC_CHARS = 8_192


def bounded(value: str) -> str:
    return value[:MAX_DIAGNOSTIC_CHARS]


def config_text() -> str:
    """Return the sole, no-tools Hermes configuration for this probe."""
    return "\n".join(
        (
            "model:",
            "  default: qwen3:8b",
            "  provider: custom:hal_local",
            "  base_url: ''",
            "  api_mode: chat_completions",
            "custom_providers:",
            "  - name: hal_local",
            "    base_url: http://127.0.0.1:11434/v1",
            "    model: qwen3:8b",
            "    api_key: not-used",
            "    discover_models: false",
            "platform_toolsets:",
            "  cli: []",
            "agent:",
            "  disabled_toolsets: []",
            "",
        )
    )


def main() -> None:
    if not all(path.is_file() for path in (MEDIATOR, RELAY)):
        raise SystemExit("probe scripts are incomplete")
    run_dir = Path(tempfile.mkdtemp(prefix="hal-cli-probe-", dir=str(BASE)))
    run_dir.chmod(0o700)
    socket_path = run_dir / "hal.sock"
    binding = secrets.token_urlsafe(32)
    config_path = run_dir / "config.yaml"
    config_path.write_text(config_text(), encoding="utf-8")
    mediator = subprocess.Popen(
        [sys.executable, str(MEDIATOR)],
        env={
            **os.environ,
            "HAL_HERMES_SOCKET": str(socket_path),
            "HAL_HERMES_BINDING": binding,
            "HAL_HERMES_EXPIRES_AT": str(time.time() + 300),
        },
        stdin=subprocess.DEVNULL,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    try:
        for _ in range(30):
            if socket_path.is_socket():
                break
            if mediator.poll() is not None:
                raise RuntimeError("HAL mediator did not start")
            time.sleep(0.1)
        else:
            raise RuntimeError("HAL mediator socket startup timed out")

        command = [
            "docker", "run", "--rm", "--network", "none", "--read-only",
            "--cap-drop", "ALL", "--security-opt", "no-new-privileges",
            "--pids-limit", "256", "--memory", "16g", "--cpus", "4",
            "--tmpfs", "/tmp:rw,noexec,nosuid,size=64m",
            "--tmpfs", "/root/.hermes:rw,noexec,nosuid,size=64m",
            "-e", "HAL_HERMES_SOCKET=/run/hal/hal.sock", "-e", "HAL_HERMES_BINDING",
            "-v", f"{run_dir}:/run/hal:ro",
            "-v", f"{RELAY}:/opt/hal/relay.py:ro",
            "-v", f"{config_path}:/root/.hermes/config.yaml:ro",
            "--entrypoint", "sh", IMAGE,
            "-c",
            "python3 /opt/hal/relay.py >/tmp/relay.log 2>&1 & relay=$!; "
            "trap 'kill $relay 2>/dev/null || true; wait $relay 2>/dev/null || true' EXIT; "
            f"hermes chat --ignore-rules --max-turns 1 --quiet --query '{PROMPT}'",
        ]
        completed = subprocess.run(
            command,
            env={**os.environ, "HAL_HERMES_BINDING": binding},
            capture_output=True,
            text=True,
            timeout=240,
        )
        print(
            json.dumps(
                {
                    "returnCode": completed.returncode,
                    "stdout": bounded(completed.stdout),
                    "stderr": bounded(completed.stderr),
                    "toolsets": [],
                    "network": "none",
                },
                separators=(",", ":"),
            )
        )
    finally:
        mediator.terminate()
        try:
            mediator.wait(timeout=5)
        except subprocess.TimeoutExpired:
            mediator.kill()
            mediator.wait()
        mediator_output = mediator.stdout.read() if mediator.stdout is not None else ""
        print(json.dumps({"mediator": bounded(mediator_output)}, separators=(",", ":")))
        shutil.rmtree(run_dir, ignore_errors=True)


if __name__ == "__main__":
    main()
