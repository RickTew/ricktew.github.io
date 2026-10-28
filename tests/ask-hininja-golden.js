/* The golden set for /hininja/'s Ask the Ninja box (hininja/ask.js, 28 Oct 2026). Offline, no
   browser: node tests/ask-hininja-golden.js. Exit 1 on any finding.

   1. Every entry answers its own question and the sample questions below.
   2. Nonsense and off-topic questions return nothing (the honest miss).
   3. Every sentence in an answer is on the page (hininja/index.html or menu.js), or its
      text after a "Label:" is, or it is one of the ADAPT lines (a labelled rewording).
   4. Every dollar figure in an answer is on the page.
   5. No at-sign, no long dashes, no AI company or model names, anywhere in the file.
   6. Every next step goes to #menu, #price or the Ask Kuno form, and the anchors exist; the one
      exception is /hsp/, the page's own Home Study Program button (Rick, 28 Oct 2026). */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const ask = require(path.join(ROOT, "hininja/ask.js"));
const SRC = fs.readFileSync(path.join(ROOT, "hininja/ask.js"), "utf8");
const PAGE = fs.readFileSync(path.join(ROOT, "hininja/index.html"), "utf8");
const MENU = fs.readFileSync(path.join(ROOT, "hininja/menu.js"), "utf8");
const bad = [];

function flat(s) {
  return s.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&#39;|&rsquo;|&lsquo;/g, "'").replace(/&middot;/g, "·").replace(/&nbsp;/g, " ").replace(/&copy;/g, "©")
    .replace(/[‘’]/g, "'").replace(/\s+/g, " ").replace(/ ([.,:;?!])/g, "$1").toLowerCase();
}
const TEXT = flat(PAGE) + " " + flat(MENU.replace(/\\"/g, '"'));

/* the only sentences that are not on the page word for word: each one joins facts that are */
const ADAPT = [
  "the ninja menu has eight areas: stances, rolls, falls, strikes, kicks, body movement, ninja tools and self-defense",
  "ninja tools is one of the eight areas on the ninja menu: stick / tonfa, knife, chain / rope, staff, sword / half staff, sai, nunchaku and more",
  "the first two picks: natural reactions: train a move until it happens on its own, without thinking"
];

const SAMPLES = {
  "what-is": ["what is this exactly?", "what is hi ninja", "is this a retreat"],
  "price": ["how much is it?", "what are your prices", "is it expensive"],
  "one-week": ["can I come for a week", "do you do one week?"],
  "longer": ["can I stay longer", "what about 3 weeks", "can I come for a month"],
  "start": ["when can I start", "what are the dates", "when is the next group", "I am already on Koh Samui. Can I start next week?"],
  "schedule": ["what does a typical day look like", "how many classes a week", "what is the daily schedule"],
  "learn": ["what will I learn", "is this ninjutsu", "what style of martial art is it"],
  "menu": ["how does the ninja menu work", "what are quick picks", "how do I choose my tactics"],
  "experience": ["I have never trained before", "do I need any experience", "I am a complete beginner"],
  "age": ["am I too old at 55", "is there an age limit", "What ages are the other students?"],
  "teens": ["I am 17, can I come alone", "do you take teenagers"],
  "injury": ["I have a bad knee", "I am out of shape, is that ok", "I have an old injury"],
  "sparring": ["is there sparring", "is it a hardcore boot camp", "is it intense"],
  "women": ["is it ok for a solo female traveler", "is there a women's dorm"],
  "self-defense": ["can I learn self defense", "I want to protect myself"],
  "weapons": ["do you teach weapons", "can I learn nunchaku"],
  "dorm": ["where do I sleep", "is accommodation included", "what is the hostel like"],
  "private-room": ["can I get a private room", "can I share a room with my girlfriend"],
  "own-place": ["I already have a place on Samui", "is it cheaper without the dorm"],
  "meals": ["are meals included", "what about food"],
  "airport": ["do you pick me up from the airport", "how do I get there"],
  "where": ["where is it", "where in thailand is this"],
  "center": ["is there a game room", "what facilities does the gym have", "can I work remotely there"],
  "who-teaches": ["who teaches the classes", "does rick teach every class", "Does Rick Teach morning or evening sessions?"],
  "rick": ["who is rick tew", "is rick legit", "what are his credentials"],
  "belts": ["how do the belts work", "can I earn a yellow belt", "is there a belt test"],
  "mastery": ["what is mastery", "I want to move to thailand and train", "tell me about the mastery program"],
  "rick-time": ["how many hours with rick in mastery", "do I get private lessons"],
  "instructor": ["what is the instructor program", "I want to become an instructor", "can I learn to teach"],
  "winjitsu": ["what is winjitsu", "is there life coaching"],
  "pocket-dojo": ["what is pocket dojo", "is there a home study program", "I can't travel, can I train from home?"],
  "kids": ["can I bring my kids", "can my family come"],
  "refunds": ["can I get a refund", "can I change my dates", "What happens if my flights change and I can not come on my dates?"],
  "book": ["how do I book", "how do I sign up", "how do I pay"],
  "included": ["what is included", "do I get a t-shirt"]
};
const NONSENSE = ["tell me a joke", "what is the capital of france", "asdf qwerty zxcv", "do you sell pizza",
  "best crypto to buy now", "can you fix my car", "what is the weather tomorrow", "write me a poem", "is the moon made of cheese"];

const ids = new Set();
for (const e of ask.LIBRARY) {
  if (ids.has(e.id)) bad.push("duplicate id " + e.id); ids.add(e.id);
  for (const q of [e.q].concat(SAMPLES[e.id] || [])) {
    const r = ask.answer(q);
    if (r.kind !== "answer" || r.entry.id !== e.id)
      bad.push(`"${q}" should answer ${e.id}, got ${r.kind}${r.entry ? " " + r.entry.id : ""}${r.entries ? " " + r.entries.map(x => x.id).join("/") : ""}`);
  }
  if (!SAMPLES[e.id]) bad.push("no samples for " + e.id);
  const plain = e.a.replace(/<\/p>\s*<p>/g, " ").replace(/<[^>]+>/g, "").replace(/[‘’]/g, "'");
  for (let s of plain.split(/(?<=[.?!])\s+/)) {
    s = s.trim().toLowerCase().replace(/[.?!:]+$/, "");
    if (!s) continue;
    const parts = s.split(": ");
    const ok = TEXT.includes(s) || ADAPT.includes(s) || (parts.length > 1 && (TEXT.includes(parts.slice(1).join(": ")) || TEXT.includes(parts[parts.length - 1])));
    if (!ok) bad.push(`${e.id}: not on the page: "${s}"`);
  }
  for (const m of plain.match(/\$[0-9][0-9,]*/g) || []) if (!TEXT.includes(m.toLowerCase())) bad.push(`${e.id}: price ${m} is not on the page`);
  if (/@/.test(e.a)) bad.push(e.id + ": at-sign in the answer");
  const n = e.next;
  if (!n) bad.push(e.id + ": no next step");
  else if (n.ask) { if (!n.label || typeof n.line !== "string") bad.push(e.id + ": ask step without label or line"); }
  else if (n.href === "/hsp/") { if (!PAGE.includes('href="/hsp/"')) bad.push(e.id + ": /hsp/ is not linked on the page"); }
  else if (!["#menu", "#price"].includes(n.href)) bad.push(e.id + ": next step goes to " + n.href);
}
for (const id of ask.STARTERS) if (!ids.has(id)) bad.push("starter " + id + " is not an entry");
for (const q of NONSENSE) {
  const r = ask.answer(q);
  if (r.kind !== "miss" && r.kind !== "empty") bad.push(`nonsense "${q}" got ${r.kind}${r.entry ? " " + r.entry.id : ""}`);
}
if (/["'][^"'\n]*@[^"'\n]*["']/.test(SRC)) bad.push("an address (an at-sign inside a string) in ask.js");
if (/[—–]/.test(SRC) || /["'][^"'\n]*--[^"'\n]*["']/.test(SRC)) bad.push("a long dash in ask.js");
if (/\b(openai|anthropic|claude|chatgpt|gpt|gemini|grok|llama|copilot|mistral)\b/i.test(SRC)) bad.push("an AI company or model name in ask.js");
if (/tewtors/i.test(SRC)) bad.push("Tewtors named in ask.js");
for (const id of ["menu", "price", "askWebsite", "kunoPanel", "kunoLaunch", "kunoLog", "kunoForm", "kunoIn", "kunoX"])
  if (!new RegExp('id="' + id + '"').test(PAGE)) bad.push("the page has no #" + id);

if (bad.length) { console.log(bad.join("\n")); console.log(bad.length + " finding(s)"); process.exit(1); }
console.log(`CLEAN: ${ask.LIBRARY.length} entries, ${Object.values(SAMPLES).flat().length} samples, ${NONSENSE.length} nonsense controls`);
