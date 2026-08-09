#!/usr/bin/env python3
"""Forced-command GX10 entrypoint for HAL's zero-capability Hermes pilot.

This script receives exactly one bounded JSON request on standard input and
returns exactly one bounded JSON result on standard output. It is intended to
be the sole command authorized for the dedicated HAL runtime SSH key.
"""

from __future__ import annotations

import json
import os
from pathlib import Path
import secrets
import shutil
import stat
import subprocess
import sys
import tempfile
import time


BASE = Path(__file__).resolve().parent
MEDIATOR = BASE / "hal_hermes_local_mediation.py"
RELAY = BASE / "hal_uds_loopback_relay.py"
RUNNER = BASE / "hal_hermes_stateless_runner.py"
IMAGE = "hal-hermes-smoke:phase3-20260809"
MAX_REQUEST_BYTES = 16_384
MAX_PROMPT_CHARS = 8_192
MAX_RESULT_CHARS = 1_024


def emit(payload: dict[str, object]) -> None:
    sys.stdout.write(json.dumps(payload, separators=(",", ":")) + "\n")
    sys.stdout.flush()


def fail(correlation_id: str, reason: str) -> None:
    emit({"ok": False, "correlationId": correlation_id, "failure": reason})
    raise SystemExit(1)


def read_request() -> tuple[str, str]:
    if os.environ.get("SSH_ORIGINAL_COMMAND", ""):
        fail("", "runtime transport accepts no SSH command")
    raw = sys.stdin.buffer.read(MAX_REQUEST_BYTES + 1)
    if len(raw) > MAX_REQUEST_BYTES:
        fail("", "runtime request exceeds bound")
    try:
        request = json.loads(raw)
    except (UnicodeDecodeError, json.JSONDecodeError):
        fail("", "runtime request is not valid JSON")
    if not isinstance(request, dict) or set(request) != {"correlationId", "prompt"}:
        fail("", "runtime request shape is not permitted")
    correlation_id = request.get("correlationId")
    prompt = request.get("prompt")
    if not isinstance(correlation_id, str) or not correlation_id:
        fail("", "runtime correlation is invalid")
    if not isinstance(prompt, str) or not prompt.strip() or len(prompt) > MAX_PROMPT_CHARS:
        fail(correlation_id, "runtime prompt is invalid or exceeds bound")
    return correlation_id, prompt


def wait_for_socket(socket_path: Path, process: subprocess.Popen[bytes]) -> None:
    for _ in range(30):
        if socket_path.is_socket():
            return
        if process.poll() is not None:
            raise RuntimeError("HAL mediator did not start")
        time.sleep(0.1)
    raise RuntimeError("HAL mediator socket startup timed out")


def main() -> None:
    correlation_id, prompt = read_request()
    if not all(path.is_file() for path in (MEDIATOR, RELAY, RUNNER)):
        fail(correlation_id, "runtime entrypoint is incomplete")
    runtime_dir = Path(tempfile.mkdtemp(prefix="hal-runtime-", dir=str(BASE)))
    runtime_dir.chmod(0o700)
    socket_path = runtime_dir / "hal.sock"
    binding = secrets.token_urlsafe(32)
    mediator_env = {
        **os.environ,
        "HAL_HERMES_SOCKET": str(socket_path),
        "HAL_HERMES_BINDING": binding,
        "HAL_HERMES_EXPIRES_AT": str(time.time() + 300),
    }
    mediator = subprocess.Popen(
        [sys.executable, str(MEDIATOR)],
        env=mediator_env,
        stdin=subprocess.DEVNULL,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    try:
        wait_for_socket(socket_path, mediator)
        container_env = {
            **os.environ,
            "HAL_HERMES_SOCKET": "/run/hal/hal.sock",
            "HAL_HERMES_BINDING": binding,
            "HAL_HERMES_PROMPT": prompt,
        }
        command = [
            "docker", "run", "--rm", "--network", "none", "--read-only",
            "--cap-drop", "ALL", "--security-opt", "no-new-privileges",
            "--pids-limit", "256", "--memory", "16g", "--cpus", "4",
            "--tmpfs", "/tmp:rw,noexec,nosuid,size=64m",
            "--tmpfs", "/root/.hermes:rw,noexec,nosuid,size=64m",
            "-e", "HAL_HERMES_SOCKET", "-e", "HAL_HERMES_BINDING", "-e", "HAL_HERMES_PROMPT",
            "-v", f"{runtime_dir}:/run/hal:ro",
            "-v", f"{RELAY}:/opt/hal/relay.py:ro",
            "-v", f"{RUNNER}:/opt/hal/stateless.py:ro",
            "--entrypoint", "sh", IMAGE,
            "-c", "python3 /opt/hal/relay.py >/dev/null 2>&1 & relay=$!; trap 'kill $relay 2>/dev/null || true; wait $relay 2>/dev/null || true' EXIT; python3 /opt/hal/stateless.py",
        ]
        completed = subprocess.run(command, env=container_env, capture_output=True, text=True, timeout=240)
        if completed.returncode != 0:
            fail(correlation_id, "isolated Hermes runtime failed")
        result = completed.stdout.strip()
        if not result or len(result) > MAX_RESULT_CHARS:
            fail(correlation_id, "runtime result is invalid or exceeds bound")
        emit({"ok": True, "correlationId": correlation_id, "result": result})
    except subprocess.TimeoutExpired:
        fail(correlation_id, "isolated Hermes runtime timed out")
    except RuntimeError as error:
        fail(correlation_id, str(error))
    finally:
        mediator.terminate()
        try:
            mediator.wait(timeout=5)
        except subprocess.TimeoutExpired:
            mediator.kill()
            mediator.wait()
        shutil.rmtree(runtime_dir, ignore_errors=True)


if __name__ == "__main__":
    main()
