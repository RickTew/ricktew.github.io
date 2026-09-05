#!/bin/sh
# Transpile the real endpoint and run the hostile-submission check offline.
# tsc's "Cannot find name 'Deno'" errors are expected; it still emits the JS.
set -e
DIR=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$DIR/../../.." && pwd)
OUT=$(mktemp -d)
cp "$ROOT/aininja/start/intake-questions.js" "$DIR/intake-questions.js"
npx --yes -p typescript@5 tsc "$DIR/index.ts" --target esnext --module esnext --outDir "$OUT" --skipLibCheck 2>/dev/null || true
[ -f "$OUT/index.js" ] || { echo "transpile produced nothing"; exit 1; }
mv "$OUT/index.js" "$OUT/fn.mjs"
cp "$DIR/intake-questions.js" "$OUT/intake-questions.js"
cp "$DIR/escaping-test.mjs" "$OUT/harness.mjs"
cd "$OUT" && node harness.mjs
