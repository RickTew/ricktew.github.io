// ricktew.com contact form. The server half of the mailbox on
// /aininja/ (kata: ~/Dev/digitaldojo/packs/mailbox.md): the site shows a form, this
// holds the address.
//
// Why a server exists at all for a static GitHub Pages site: the whole
// point of the form is that the destination address appears NOWHERE the
// browser can read it. A click-to-mail link, or an address printed as text,
// is handed to every harvester that crawls the page. The destination lives
// in a function secret and only here.
//
// One action, one function:
//   POST {name, email, subject, message, website, elapsedMs, source, sku?} -> {ok:true}
//
// It ALWAYS answers {ok:true}. A dropped submission looks exactly like an
// accepted one, because telling a bot which check tripped is telling its
// operator how to fix it by morning. Every drop is written to the log
// instead, so a real person eaten by the spam heuristics is recoverable
// rather than invisible. Read the drops with:
//
//   select timestamp, event_message from function_logs
//   where event_message like '%ricktew-contact drop%'
//
// (Supabase dashboard -> Edge Functions -> ricktew-contact -> Logs.)
// Read it monthly for the first quarter.
//
// Secrets required. Set them with:
//   supabase secrets set --project-ref <ref> CONTACT_TO=... CONTACT_FROM=...
//
//   RESEND_API_KEY   the sending key, restricted to the site's own domain
//   CONTACT_TO       where mail lands: the Ninja Agent's mailbox
//   CONTACT_FROM     a verified no-reply sender on the site's own domain
//
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by the runtime;
// the send cap below uses them to count messages in the gate table.
//
// NONE of those three values is written down in this repo, which is PUBLIC
// and is served by GitHub Pages. Naming the destination in a comment here
// would hand it to exactly the harvesters this whole pattern exists to
// starve, and it would do it in a file anyone can fetch. If you need to know
// what they are set to, read them from the project, not from the source.
// With any of them unset the form STILL confirms to the visitor and the
// whole message is written to the log, because a contact form that shows a
// red error to a paying customer is worse than one that quietly queues.
//
// Where the mail goes: CONTACT_TO is the Ninja Agent's mailbox, which
// TEWBEDO's inbound webhook files as a ticket for that agent (support-agent,
// draft-first). TEWBEDO takes the ticket contact from Reply-To when the
// From is one of our own domains, which is exactly this case, so the
// agent's reply reaches the visitor and not this machine.

// The nonsense check is the kit's file, copied in verbatim from
// ~/Dev/digitaldojo/kits/mailbox/gauntlet.ts. Fix it THERE and re-copy;
// a local edit here is how this install drifted one point too shy in the
// first place and let four probe bots through in one night (12 Sep 2026).
import { gauntletScore } from './gauntlet.ts';

const ALLOWED_ORIGINS = [
  'https://ricktew.com',
  'https://www.ricktew.com',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
];

/** The subject list the form offers. Anything else is coerced to Other, so
 *  the mail subject line can never carry attacker-chosen text. */
const SUBJECTS: Record<string, string> = {
  hours: 'Hours back: the inbox, the bookings, the admin',
  build: 'Build me something',
  dojo: 'Your Dojo or R2 Hosting',
  slot: 'A mailbox or an answer box like this',
  hininja: 'The HI Ninja side',
  paid: 'Paid by PromptPay',
  other: 'Something else',
};

/** The PromptPay Paid press (17 Oct 2026, Rick: "I am allowing our promptpay
 *  option for those living in thailand to buy our services"; the Dojo's kit,
 *  kits/promptpay/). The card pages /aininja/shop/promptpay/ and
 *  /hininja/promptpay/ post subject "paid" with one of these SKUs, and the
 *  mail's subject reads "Paid PromptPay <SKU>: <name>" so it sorts as a
 *  payment to check at the bank, not a question. Fixed list, same reason as
 *  SUBJECTS: a "paid" with any other SKU is an ordinary "Something else".
 *  The SKUs and their baht prices live in /assets/promptpay.js; a new one
 *  goes in both. */
const PAID_SKUS = ['AIN-MAMAMIA', 'AIN-SPA-BOOKING', 'HIN-GNS-2W'];

/** Where the visitor came from, carried by ?src=<key> on the link they
 *  clicked (play zero, item 3: a source on the record a message creates,
 *  so conversations can be counted by channel from the mails alone). Fixed
 *  list, same reason as SUBJECTS; anything else is "direct". */
const SOURCES: Record<string, string> = {
  client: 'A client note',
  note: 'A personal note',
  gym: 'The gym floor',
  linkedin: 'LinkedIn',
  group: 'A Koh Samui group',
  referral: 'A referral',
  x: 'X',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  contra: 'Contra',
  gns: 'The GNS page',
  direct: 'Direct, no source on the link',
};

const MAX = { name: 100, email: 200, message: 5000 };

/** How soon after the form appears a submission is assumed to be a machine.
 *  Nobody reads four fields and types a message in under three seconds. */
const MIN_FILL_MS = 3000;

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

/** The visitor's text is a stranger's document going into a mail Rick opens.
 *  Raw, it lets anyone on the internet write markup, links and hidden text
 *  into a message that arrives looking like it came from the business.
 *  Every visitor-supplied character passes through here at the point of use. */
function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Mail headers are line-based, so a newline in a header value is an
 *  injection point. Nothing interpolated into From/Reply-To/Subject keeps
 *  its line breaks. */
function oneLine(s: string, limit: number) {
  return s.replace(/[\r\n]+/g, ' ').trim().slice(0, limit);
}

function looksLikeEmail(s: string) {
  return /^[^\s@,;:<>"']+@[^\s@,;:<>"']+\.[^\s@,;:<>"']{2,}$/.test(s);
}


/** One line per dropped or unsent message, holding the whole thing, so a
 *  real person the gauntlet ate can still be answered. */
function logDrop(reason: string, fields: Record<string, unknown>) {
  console.log('ricktew-contact drop', JSON.stringify({ reason, ...fields }));
}

// ---- The send cap (16 Oct 2026, Rick's click after the Dojo's security pass) ----
// Every accepted message draws the Ninja Agent's reply to the address typed,
// so a script that got past the gauntlet could aim our own mail at any inbox.
// One visitor gets five messages an hour, the whole site a hundred a day. The
// counts live in the Intake's gate table under door 'mailbox': one row per
// accepted message, a hashed visitor and the time. Never the raw IP: the hash
// is keyed with the service key, so the table cannot be turned back into
// addresses. The Intake's housekeeping deletes rows older than two days.
const GATE = 'aininja_intake_gate';
const CAP = { perVisitorHour: 5, perDay: 100 };

function sb() {
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) throw new Error('gate_not_configured');
  return { url: url.replace(/\/$/, ''), headers: { Authorization: `Bearer ${key}`, apikey: key } };
}
async function visitorHash(req: Request) {
  const ip = (req.headers.get('cf-connecting-ip') || req.headers.get('x-real-ip') ||
    (req.headers.get('x-forwarded-for') || '').split(',')[0] || '').trim() || 'unknown';
  const pepper = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || 'ricktew-contact';
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${pepper}|${ip}`));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}
async function gateCount(filter: string) {
  const s = sb();
  const res = await fetch(`${s.url}/rest/v1/${GATE}?select=id&door=eq.mailbox&${filter}&limit=1`, {
    headers: { ...s.headers, Prefer: 'count=exact' },
  });
  if (!res.ok) throw new Error(`gate count ${res.status}`);
  const n = Number((res.headers.get('content-range') || '').split('/')[1]);
  if (!Number.isFinite(n)) throw new Error('gate count unreadable');
  return n;
}
async function passCap(visitor: string): Promise<'ok' | 'visitor' | 'day'> {
  const now = Date.now();
  if (await gateCount(`ip_hash=eq.${visitor}&at=gt.${new Date(now - 3600e3).toISOString()}`) >= CAP.perVisitorHour) return 'visitor';
  if (await gateCount(`at=gt.${new Date(now - 86400e3).toISOString()}`) >= CAP.perDay) return 'day';
  const s = sb();
  const ins = await fetch(`${s.url}/rest/v1/${GATE}`, {
    method: 'POST', headers: { ...s.headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ door: 'mailbox', ip_hash: visitor, intake: '' }),
  });
  if (!ins.ok) throw new Error(`gate insert ${ins.status}`);
  return 'ok';
}

async function sendMail(f: {
  name: string; email: string; subjectLabel: string; message: string; sourceLabel: string; sku: string;
}) {
  const key = Deno.env.get('RESEND_API_KEY');
  const to = Deno.env.get('CONTACT_TO');
  const from = Deno.env.get('CONTACT_FROM');
  if (!key || !to || !from) throw new Error('mail_not_configured');

  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${label}</td>` +
    `<td style="padding:4px 0">${value}</td></tr>`;

  // esc() on every visitor-supplied value, at the point of use.
  //
  // Deliberately NO click-to-mail link on the visitor's address. The kata's
  // href wall exists because two installs markup-escaped the text copy and
  // left the href copy free to pre-fill the owner's compose window. Rick
  // answers from the TEWBEDO inbox, not from a mail client, so the link has
  // no job here and the whole class of bug is removed rather than handled.
  const html =
    `<table style="font-family:system-ui,sans-serif;font-size:14px">` +
    row('From', esc(f.name)) +
    row('Email', esc(f.email)) +
    row('About', esc(f.subjectLabel)) +
    row('Via', f.sku ? 'the PromptPay card on ricktew.com' : 'the mailbox on ricktew.com/aininja/') +
    row('Source', esc(f.sourceLabel)) +
    `</table>` +
    `<hr style="border:none;border-top:1px solid #ddd;margin:16px 0">` +
    `<div style="font-family:system-ui,sans-serif;font-size:15px;white-space:pre-wrap">` +
    esc(f.message) +
    `</div>`;

  const text =
    `From: ${f.name}\nEmail: ${f.email}\nAbout: ${f.subjectLabel}\n` +
    `Via: ${f.sku ? 'the PromptPay card on ricktew.com' : 'the mailbox on ricktew.com/aininja/'}\nSource: ${f.sourceLabel}\n\n${f.message}\n`;

  // The subject label comes from a fixed list, so it can never carry
  // attacker-chosen text. The NAME can, and the subject is the one place
  // visitor text is never escaped at a point of use: a header is not markup,
  // and whatever files this mail renders that string again somewhere else.
  // Strip anything markup-shaped from the subject copy only; the body keeps
  // the full name, escaped.
  const subjectName = f.name.replace(/[<>&"'`]/g, ' ').replace(/\s+/g, ' ').trim() || 'no name';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      // Reply-to is the visitor. TEWBEDO reads this to set the ticket
      // contact, so The Ninja Agent's reply reaches the person who wrote in.
      reply_to: oneLine(f.email, MAX.email),
      subject: oneLine(f.sku ? `Paid PromptPay ${f.sku}: ${subjectName}` : `AI Ninja ${f.subjectLabel}: ${subjectName}`, 180),
      html,
      text,
      // A Paid notice is for Rick to check at the bank, not for the Ninja
      // Agent to answer: Auto-Submitted is the standard "do not auto-reply"
      // mark (RFC 3834), the one the Intake's mail carries, which TEWBEDO's
      // auto-reply guard already treats as "do not answer"; the subject's
      // "Paid PromptPay" prefix is its second signal.
      ...(f.sku ? { headers: { 'Auto-Submitted': 'auto-generated', 'X-PromptPay-Sku': f.sku } } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin');
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(origin) });
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405, origin);
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return json({ error: 'forbidden_origin' }, 403, origin);
  }

  let p: Record<string, unknown>;
  try {
    p = await req.json();
  } catch {
    return json({ error: 'bad_request' }, 400, origin);
  }

  // No Origin header at all: not a browser. Every browser sends Origin on a
  // cross-site JSON POST, and the page (including its in-page agent tool) is
  // this endpoint's only legitimate caller. A script replaying the POST does
  // not send one unless its operator thought to. Found 12 Sep 2026: 221
  // POSTs in a day against 10 preflights, from a German residential proxy
  // pool rotating browsers from 2002 to 2012 in the user agent. Answered as
  // an acceptance and logged, like every other drop, so the day the operator
  // adds the header shows up in the log and nowhere else.
  if (!origin) {
    logDrop('no_origin', {
      name: typeof p.name === 'string' ? p.name : '',
      email: typeof p.email === 'string' ? p.email : '',
      message: typeof p.message === 'string' ? p.message : '',
    });
    return json({ ok: true }, 200, origin);
  }

  const str = (v: unknown) => (typeof v === 'string' ? v : '');
  const name = str(p.name).trim();
  const email = str(p.email).trim();
  const sku = PAID_SKUS.includes(str(p.sku)) ? str(p.sku) : '';
  const subjectKey = SUBJECTS[str(p.subject)] && (str(p.subject) !== 'paid' || sku) ? str(p.subject) : 'other';
  const subjectLabel = SUBJECTS[subjectKey];
  const paidSku = subjectKey === 'paid' ? sku : '';
  const sourceKey = SOURCES[str(p.source)] ? str(p.source) : 'direct';
  const sourceLabel = SOURCES[sourceKey];
  const message = str(p.message).trim();
  const trap = str(p.website).trim();
  const elapsedMs = typeof p.elapsedMs === 'number' ? p.elapsedMs : -1;

  const seen = { name, email, subject: subjectKey, source: sourceKey, message, ...(paidSku ? { sku: paidSku } : {}) };

  // Browser validation is a courtesy to humans; the endpoint is what is
  // actually exposed, so required is re-checked here.
  if (!name || !email || !message) {
    logDrop('missing_required', seen);
    return json({ ok: true }, 200, origin);
  }
  if (!looksLikeEmail(email)) {
    logDrop('bad_email', seen);
    return json({ ok: true }, 200, origin);
  }
  if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message) {
    logDrop('too_long', seen);
    return json({ ok: true }, 200, origin);
  }

  // The gauntlet, three cheap checks, no puzzle for a real visitor to solve.
  if (trap) {
    logDrop('trap_field', { ...seen, trap });
    return json({ ok: true }, 200, origin);
  }
  // elapsedMs is measured entirely in the visitor's browser (now minus when
  // the form appeared), so a wrong device clock cannot fail an honest
  // person. A missing or negative value means we simply do not know, and
  // "do not know" never drops anyone.
  if (elapsedMs >= 0 && elapsedMs < MIN_FILL_MS) {
    logDrop('too_fast', { ...seen, elapsedMs });
    return json({ ok: true }, 200, origin);
  }
  const verdict = gauntletScore({ name, email, message });
  if (verdict.drop) {
    logDrop('nonsense', { ...seen, score: verdict.score, tells: verdict.tells });
    return json({ ok: true }, 200, origin);
  }

  // The cap counts only messages that passed every wall above, so a bot's
  // rejected junk never uses up a real person's allowance. If the table
  // cannot be read, the message goes ahead and the log says so: the cap is a
  // wall against abuse, not a reason to lose a real lead.
  try {
    const cap = await passCap(await visitorHash(req));
    if (cap !== 'ok') {
      logDrop(cap === 'visitor' ? 'rate_visitor' : 'rate_day', seen);
      return json({ ok: true }, 200, origin);
    }
  } catch (e) {
    logDrop('gate_unavailable', { name, email, error: e instanceof Error ? e.message : String(e) });
  }

  try {
    await sendMail({ name, email, subjectLabel, message, sourceLabel, sku: paidSku });
  } catch (e) {
    // The mail pipe being down must never reach the visitor. They get the
    // same confirmation and the message survives in the log. Note the SDK
    // shape lesson from the kata: Resend RETURNS an API rejection rather
    // than throwing it, so the fetch above checks res.ok and throws itself.
    logDrop('unsent', { ...seen, error: e instanceof Error ? e.message : String(e) });
  }

  return json({ ok: true }, 200, origin);
});
