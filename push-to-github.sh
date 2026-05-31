#!/usr/bin/env bash
# One-time helper: push this project to a new GitHub repo.
# Usage:  bash push-to-github.sh https://github.com/YOURNAME/prime-digital-mall.git
set -e

REMOTE="$1"
if [ -z "$REMOTE" ]; then
  echo "Usage: bash push-to-github.sh <git-remote-url>"
  echo "First create an EMPTY repo at github.com/new (no README), then copy its URL."
  exit 1
fi

git init
git add -A
git commit -m "Prime Digital Mall — Pakistan's everything platform"
git branch -M main
git remote add origin "$REMOTE" 2>/dev/null || git remote set-url origin "$REMOTE"
git push -u origin main
echo ""
echo "Done. Now: Cloudflare dashboard → Pages → Connect to Git → pick this repo."
echo "Build command: npm run build   |   Output dir: out"
