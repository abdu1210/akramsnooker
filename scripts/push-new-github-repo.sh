#!/usr/bin/env bash
# Creates a NEW GitHub repo and pushes this project (run after: gh auth login)
set -euo pipefail

REPO_NAME="${1:-akram-snooker-hub}"
GH_BIN="${GH_BIN:-gh}"

if ! command -v "$GH_BIN" >/dev/null 2>&1; then
  echo "Install GitHub CLI: https://cli.github.com/"
  exit 1
fi

"$GH_BIN" auth status >/dev/null || {
  echo "Run first: gh auth login"
  exit 1
}

cd "$(dirname "$0")/.."

if [ ! -d .git ]; then
  echo "No .git folder — run git init and commit first."
  exit 1
fi

"$GH_BIN" repo create "$REPO_NAME" --public --source=. --remote=origin --push

echo "Done: $("$GH_BIN" repo view --json url -q .url)"
