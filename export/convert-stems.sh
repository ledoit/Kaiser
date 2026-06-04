#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./export/convert-stems.sh <project-id>
# Example:
#   ./export/convert-stems.sh matrix-maze

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ $# -lt 1 ]]; then
  echo "Error: missing project id."
  echo "Usage: ./export/convert-stems.sh <project-id>"
  exit 1
fi

node "${ROOT_DIR}/scripts/convert-stems.js" --project "$1"
