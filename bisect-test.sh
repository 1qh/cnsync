#!/bin/bash
# Usage: ./bisect-test.sh <from_line> <to_line>
# Comments out lines from_line to to_line in showcase.tsx, builds, and tests
set -e
FILE="/Users/o/z/cnsync/next/src/app/showcase.tsx"
cp /Users/o/z/cnsync/next/src/app/showcase_full.tsx "$FILE"

if [ "$1" != "" ] && [ "$2" != "" ]; then
  # Replace lines from_line to to_line with empty lines
  sed -i '' "${1},${2}s/.*//" "$FILE"
fi

kill $(lsof -ti:3377) 2>/dev/null || true
sleep 1
rm -rf /Users/o/z/cnsync/next/.next
sleep 2
cd /Users/o/z/cnsync/next && bunx next build . 2>&1 | tail -3
cd /Users/o/z/cnsync && bunx next start next -p 3377 &>/dev/null &
sleep 5
bun /Users/o/z/cnsync/check-error3.ts 2>&1
kill $(lsof -ti:3377) 2>/dev/null || true
