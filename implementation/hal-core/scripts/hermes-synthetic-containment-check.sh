#!/bin/sh
set -eu

if [ "$#" -ne 1 ]; then
  echo "usage: $0 <absolute-evaluation-root>" >&2
  exit 64
fi

case "$1" in
  /*) eval_root=$1 ;;
  *) echo "evaluation root must be absolute" >&2; exit 64 ;;
esac

profile_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
profile_path="$profile_dir/hermes-synthetic.sb"

run_denied() {
  if /usr/bin/sandbox-exec -D "EVAL_ROOT=$eval_root" -f "$profile_path" /usr/bin/python3 -c "$1"; then
    echo "containment failure: expected denial" >&2
    exit 1
  fi
}

/usr/bin/sandbox-exec -D "EVAL_ROOT=$eval_root" -f "$profile_path" /usr/bin/python3 -c \
  "from pathlib import Path; root = Path('$eval_root'); target = root / 'containment-ok'; target.write_text('ok'); assert target.read_text() == 'ok'"
run_denied "import socket; socket.create_connection(('example.com', 443), timeout=1)"
run_denied "from pathlib import Path; Path.home().joinpath('hal-containment-probe').read_text()"
run_denied "from pathlib import Path; Path('/Users/rosslauda/Documents/HAL/agents.md').read_text()"

echo "HAL Hermes containment checks passed."
