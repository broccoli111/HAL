#!/usr/bin/env python3
"""HAL-owned read-only shell pilot for the repository workspace only."""
from __future__ import annotations
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[3]
ALLOWED = {
    ("pwd",): ("pwd",),
    ("git", "status", "--short"): ("git", "status", "--short"),
    ("git", "log", "--oneline", "-n", "20"): ("git", "log", "--oneline", "-n", "20"),
}
MAX_BYTES = 16_384

def main() -> None:
    try:
        request = json.loads(sys.stdin.buffer.read(MAX_BYTES + 1))
    except (UnicodeDecodeError, json.JSONDecodeError):
        raise SystemExit("invalid request")
    argv = request.get("argv") if isinstance(request, dict) else None
    if not isinstance(argv, list) or not all(isinstance(x, str) for x in argv):
        raise SystemExit("request requires argv string list")
    command = tuple(argv)
    if command not in ALLOWED:
        raise SystemExit("command is not allow-listed")
    result = subprocess.run(ALLOWED[command], cwd=ROOT, shell=False, capture_output=True, text=True, timeout=15)
    output = (result.stdout + result.stderr)[:MAX_BYTES]
    print(json.dumps({"status": "completed", "command": list(command), "exitCode": result.returncode, "output": output}, separators=(",", ":")))

if __name__ == "__main__":
    main()
