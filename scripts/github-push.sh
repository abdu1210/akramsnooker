#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

export PATH="$HOME/.local/bin:$PATH"

if ! gh auth status >/dev/null 2>&1; then
  echo "Opening GitHub login — complete in your browser, then this script will push."
  gh auth login -h github.com -p https -w
  gh auth setup-git
fi

git push -u origin main
echo "Pushed to: https://github.com/abdu1210/akramsnooker"
