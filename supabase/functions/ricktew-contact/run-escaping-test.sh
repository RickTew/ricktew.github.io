#!/bin/sh
# Transpile the real endpoint and run the hostile-submission escaping check.
# The tsc errors about "Cannot find name 'Deno'" are expected and harmless:
# tsc still emits the JS, and the harness supplies a Deno stub.
set -e
DIR=$(cd "$(dirname "$0")" && pwd)
OUT=$(mktemp -d)
npx --yes -p typescript@5 tsc "$DIR/index.ts" \
  --target esnext --module esnext --outDir "$OUT" --skipLibCheck 2>/dev/null || true
[ -f "$OUT/index.js" ] || { echo "transpile produced nothing"; exit 1; }
mv "$OUT/index.js" "$OUT/fn.mjs"
cp "$DIR/escaping-test.mjs" "$OUT/harness.mjs"
cd "$OUT" && node harness.mjs
