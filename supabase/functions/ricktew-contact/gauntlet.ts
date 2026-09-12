// The Letter Slot's gauntlet, the nonsense half. Kata: packs/letter-slot.md.
//
// COPY THIS FILE IN. Do not re-implement it from the kata's prose: the prose
// was re-implemented once, on 2026-08, and the copy came out one point too
// shy. It then passed four probe bots in a night on a slot that feeds an
// auto-answering desk, so every probe got a reply, which is a receipt telling
// the bot's operator that the form works and the address is live.
//
// What it scores. A machine-minted submission has a shape a person's does
// not, and three of the tells are strong enough on their own:
//
//   scrambled_name    one word, twelve letters or more, case switching three
//                     times or more inside it: "NBRRFThoNaJNvSWZJVOsCCbA".
//                     A person's one-word name switches case once at most
//                     (McDonald, DeAngelo, LaToya). This is the rule the
//                     shy copy lost, and the rule the two oldest installs
//                     have dropped on since May 2026.
//                     It is scored whatever the message length.
//   dotted_mailbox    four dots or more in the part before the @. Gmail
//                     ignores dots, so one account mints endless "unique"
//                     addresses: "thangav.e.l.u.s.en.n.iya.ppa.n@gmail.com".
//                     Scored whatever the message length.
//   one_word_message  the whole message is one token of twelve or more
//                     characters that is not a link or an address:
//                     "APSCFUwhpzfBzWkcBbig". Short messages only.
//
// plus the four older, weaker tells on short messages: a very long word,
// case-scrambling across name and message together, links, and a message
// that is mostly digits.
//
// Pure. No I/O, no dependency, no Deno or Node API, so the same file runs in
// a Supabase edge function, a Next.js route, a Vercel function and the test.
//
// It never answers the visitor. The endpoint that calls it must answer a
// drop EXACTLY like an acceptance (200, ok) and write the whole submission
// to its drop log, because a check that can eat a message needs a way to
// give it back. That is the kata's wall, not this file's job.

export interface Submission {
  name: string;
  email: string;
  message: string;
}

export interface Verdict {
  /** Total points. */
  score: number;
  /** Which tells fired, in order, for the drop log. */
  tells: string[];
  /** score >= DROP_AT */
  drop: boolean;
}

/** Three points drops. A lone weak tell never does. A scrambled name on a
 *  SHORT message does (its two, plus the shared case-scrambling point it
 *  also earns), which is the proven behaviour of the two oldest installs; on
 *  a LONG message the name alone is two and passes, because a long message
 *  is somebody's actual problem and eating one real customer's message is a
 *  worse failure than passing one probe. The false positive this can still
 *  produce is a person who types their name as one CamelCased word; the drop
 *  log exists to give that one back. */
export const DROP_AT = 3;

/** A message this long is somebody's actual problem; only the name and the
 *  address are scored above it. */
const SHORT_MESSAGE = 120;

/** lower-to-upper switches inside a string: "hoNaJNvS" has three. */
function caseSwitches(s: string): number {
  return (s.match(/[a-z][A-Z]/g) || []).length;
}

export function gauntletScore(sub: Submission): Verdict {
  const name = (sub.name || '').trim();
  const email = (sub.email || '').trim();
  const m = (sub.message || '').trim();
  const tells: string[] = [];
  let score = 0;

  // The name, whatever the message length.
  const nameSwitches = caseSwitches(name);
  if (!/\s/.test(name) && name.length >= 12 && nameSwitches >= 3) {
    score += 2;
    tells.push('scrambled_name');
  }

  // The address, whatever the message length.
  const local = email.split('@')[0] || '';
  const dots = (local.match(/\./g) || []).length;
  if (dots >= 4) {
    score += 1;
    tells.push('dotted_mailbox');
  }

  if (m.length >= SHORT_MESSAGE) {
    return { score, tells, drop: score >= DROP_AT };
  }

  // The message, short ones only.
  const words = m.split(/\s+/).filter(Boolean);
  const longestWord = words.reduce((max, w) => Math.max(max, w.length), 0);
  if (longestWord >= 25) { score += 1; tells.push('long_word'); }
  if (longestWord >= 40) { score += 1; tells.push('very_long_word'); }

  const switches = caseSwitches(m) + nameSwitches;
  if (switches >= 3) { score += 1; tells.push('case_scrambled'); }
  if (switches >= 6) { score += 1; tells.push('case_scrambled_heavily'); }

  const isLink = /^https?:\/\//i.test(m) || /^www\./i.test(m);
  const isAddress = m.includes('@');
  if (words.length === 1 && m.length >= 12 && !isLink && !isAddress) {
    score += 1;
    tells.push('one_word_message');
  }

  const links = (m.match(/https?:\/\/|\[url|<a\s/gi) || []).length;
  if (links >= 1) { score += 1; tells.push('link'); }
  if (links >= 3) { score += 1; tells.push('links'); }

  const digits = (m.match(/\d/g) || []).length;
  if (m.length > 0 && digits / m.length > 0.4) { score += 1; tells.push('mostly_digits'); }

  return { score, tells, drop: score >= DROP_AT };
}
