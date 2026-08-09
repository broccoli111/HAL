#!/usr/bin/env python3
"""Adapter-private Hermes stateless runner for the bounded local pilot.

The runner deliberately exposes no tool, filesystem, secret, or capability
handle.  Its only output is a non-canonical runtime result claim consumed by
the external adapter harness.
"""

from __future__ import annotations

import os
import sys

from agent.auxiliary_client import call_llm


def main() -> None:
    prompt = os.environ.get("HAL_HERMES_PROMPT", "")
    if not prompt.strip():
        raise SystemExit("HAL_HERMES_PROMPT is required")
    response = call_llm(
        provider="custom",
        model="qwen3:8b",
        base_url="http://127.0.0.1:11434/v1",
        api_key="not-used",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=512,
        temperature=0,
        timeout=60,
    )
    content = response.choices[0].message.content
    if not isinstance(content, str) or not content.strip():
        raise SystemExit("Hermes returned no text result")
    sys.stdout.write(content.strip() + "\n")


if __name__ == "__main__":
    main()
