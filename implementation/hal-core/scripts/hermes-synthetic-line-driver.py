#!/usr/bin/env python3
"""GX10 test-only line driver: no model, tools, capabilities, or HAL access."""
import json
import sys


def main() -> int:
    for raw_line in sys.stdin:
        command = json.loads(raw_line)
        kind = command.get("type")
        if kind == "execute_task":
            common = {key: command[key] for key in ("correlationId", "runtimeId", "agentId", "taskId")}
            print(json.dumps({"type": "progress", **common, "summary": "synthetic runtime accepted bounded task"}), flush=True)
            if command.get("context") == "await_cancel":
                cancel = json.loads(next(sys.stdin))
                if cancel.get("type") != "cancel" or cancel.get("agentId") != common["agentId"]:
                    raise ValueError("synthetic cancellation frame is invalid")
                print(json.dumps({"type": "failure", **common, "summary": "synthetic runtime cancelled by HAL"}), flush=True)
                continue
            print(json.dumps({"type": "result", **common, "summary": "synthetic runtime completed without capabilities"}), flush=True)
        elif kind not in {"start", "create_agent", "checkpoint", "cancel", "destroy"}:
            raise ValueError("unsupported synthetic line-driver command")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
