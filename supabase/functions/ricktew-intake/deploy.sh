#!/bin/sh
# Deploy The Intake's endpoint to the tews-inc project. The question catalog
# is ONE file, aininja/start/intake-questions.js; this copies it in first so
# the endpoint and the page can never disagree about a field or an option.
set -e
DIR=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$DIR/../../.." && pwd)
cp "$ROOT/aininja/start/intake-questions.js" "$DIR/intake-questions.js"
cd "$ROOT" && supabase functions deploy ricktew-intake --project-ref qegfhbseccinnxnzfhxw --no-verify-jwt
