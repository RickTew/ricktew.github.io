// Is this visit from Thailand? (20 Oct 2026.) Rick, 19 Oct, on tewtors.com:
// "a person OUTSIDE of thailand will have no idea why you are saying 'in
// thailand' ... it is a red flag. They also will not know what THB means."
// So the lines about paying from Thailand on ricktew.com (PromptPay, the bank
// note) start hidden, and /assets/th.js shows them only when this answers
// { th: true }. The same rule as tewtors.com's /api/geo, on our own stack.
//
// The country header does not reach a Supabase function (Cloudflare's
// cf-ipcountry is in the gateway's log, not in the request; probed 20 Oct), so
// the visitor's address (cf-connecting-ip) is looked up in Thailand's blocks
// from APNIC's registry, kept in th-ranges.ts (rebuild: th-ranges.py). No
// third-party geo service, nothing kept, nothing logged, never cached.
//
// Test, then deploy:
//   deno test supabase/functions/ricktew-geo/geo_test.ts
//   supabase functions deploy ricktew-geo --project-ref qegfhbseccinnxnzfhxw --no-verify-jwt
import { isThai } from './th.ts';

const ALLOWED_ORIGINS = [
  'https://ricktew.com',
  'https://www.ricktew.com',
  // the AI Ninja pages moved to tewbedo.com (Rick, 29 Oct 2026: TEWBEDO takes aininja)
  'https://tewbedo.com',
  'https://www.tewbedo.com',
  // the GNS page moved to NerdHostel still shows its Thailand lines (Rick's click, 23 Oct 2026)
  'https://www.nerdhostel.com',
  'https://nerdhostel.com',
  'http://localhost:8765',
  'http://127.0.0.1:8765',
];

Deno.serve((req) => {
  const origin = req.headers.get('origin');
  const headers = {
    'Access-Control-Allow-Origin': origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET',
    'Vary': 'Origin',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json',
  };
  if (req.method !== 'GET') return new Response('{"error":"GET only"}', { status: 405, headers });
  const ip = req.headers.get('cf-connecting-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0] ?? null;
  return new Response(JSON.stringify({ th: isThai(ip) }), { headers });
});
