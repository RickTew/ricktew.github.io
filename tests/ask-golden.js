/* The golden set for Ask the ninja (aininja/ask.js). Run: node tests/ask-golden.js
   Three shapes, from the kata: a question that must land on one entry, a
   question that must return NOTHING (the nonsense controls, the permanent
   floor), and a drift check that holds the solution entries to the page's
   own rows word for word. No network, no browser, no secrets. */
"use strict";
var path=require("path"), fs=require("fs");
var ask=require(path.join(__dirname,"..","aininja","ask.js"));

var fails=0, n=0;
function ok(cond, msg){ n++; if(!cond){ fails++; console.log("  FAIL  "+msg); } }

/* ---- 1. questions that must land ---- */
var GOLD=[
  ["what is ai?", "what-is-ai"],
  ["What's AI in one sentence", "what-is-ai"],
  ["nobody knows how AI works so isn't it dangerous", "nobody-understands"],
  ["how does it work", "nobody-understands"],
  ["is it a black box", "nobody-understands"],
  ["is AI safe for my business", "is-ai-safe"],
  ["does it hallucinate or make things up", "is-ai-safe"],
  ["will this replace my staff", "replace-staff"],
  ["will an AI email my customers without me knowing", "talks-to-customers"],
  ["which AI do you use", "which-ai"],
  ["do you use claude or chatgpt", "which-ai"],
  ["is my customer data private", "data-privacy"],
  ["is one AI safer than another", "safer-ai"],
  ["is grok safer than claude", "safer-ai"],
  ["what's the difference between anthropic and xai", "safer-ai"],
  ["which AI is the most cautious", "safer-ai"],
  ["can I use it to answer my emails", "answer-my-emails"],
  ["I am drowning in email", "answer-my-emails"],
  ["how do you use AI yourself", "how-rick-uses"],
  ["what do you use it for in your own business", "how-rick-uses"],
  ["do I need to understand AI to use this", "need-to-understand"],
  ["I hate computers", "need-to-understand"],
  ["what is an AI agent", "what-is-agent"],
  ["why the belts", "belts"],
  ["what is an agentic cmo", "masters"],
  ["what does a human presses every send mean", "human-press"],
  ["what is agent-ready", "agent-ready"],
  ["are you an AI?", "is-this-chat-ai"],
  ["am I talking to a bot", "is-this-chat-ai"],
  ["what can AI do for my business", "what-can-ai-do"],
  ["what do you offer", "what-can-ai-do"],
  ["we already use chatgpt, why would we need this", "using-vs-operating"],
  ["does it learn my business over time", "learns"],
  ["what happens when it gets something wrong", "mistakes"],
  ["how much does it cost", "cost"],
  ["pricing?", "cost"],
  ["what's the difference between sensei runs it and your dojo", "tiers"],
  ["can I cancel", "cancel"],
  ["is there a contract or lock in", "cancel"],
  ["what happens in the first month", "first-month"],
  ["how do we get started", "first-month"],
  ["how long does it take", "how-long"],
  ["can you build me an app", "build-app"],
  ["I need a new website", "build-app"],
  ["who is this for", "who-for"],
  ["is this for a one person business", "who-for"],
  ["what is the quiz", "quiz"],
  ["do you have testimonials", "testimonials"],
  ["what is your email address", "contact"],
  ["can we book a call", "contact"],
  ["how fast do you reply", "reply-time"],
  ["who is rick tew", "who-is-rick"],
  ["where are you based", "who-is-rick"],
  ["who owns the code", "ownership"],
  ["are there hidden costs", "third-party"],
  ["can you just make me a flyer", "helpings"],
  ["do you still teach martial arts", "hininja"],
  ["can you run my google ads", "marketing"],
  ["does it work in thai", "languages"],
  ["what is tewbedo", "tewbedo"],
  ["are you taking new clients", "availability"],
  ["do you work with businesses in europe", "remote"],
  ["can you teach me to do it myself", "teach-me"],
  ["what is the front desk", "front-desk"],
  ["can it answer my support emails", "front-desk"],
  ["what is the money desk", "money-desk"],
  ["can it handle my bookings", "booking-desk"],
  ["what is colleagues by email", "colleagues"],
  ["what is the marketing room", "marketing-room"],
  ["what is the ad room", "ad-room"],
  ["I want to write a book", "publishing-house"],
  ["can I have a chat box like this on my site", "answer-engine"],
  ["what is the notebook", "notebook"],
  ["what is the quiz funnel", "quiz-funnel"],
  ["what is the video room", "video-room"],
  ["what does the agentic cfo do", "seat-cfo"],
  ["what does the head of customer care do", "seat-care"]
];
console.log("1. must land ("+GOLD.length+")");
GOLD.forEach(function(g){
  var r=ask.answer(g[0]);
  var got = r.kind==="answer" ? r.entry.id : r.kind==="choose" ? "choose:"+r.entries.map(function(e){ return e.id; }).join("|") : r.kind;
  ok(got===g[1], JSON.stringify(g[0])+" -> "+got+" (wanted "+g[1]+")");
});

/* ---- 2. the permanent floor: nonsense must return nothing ---- */
var CONTROLS=[
  "what is the weather in bangkok today",
  "recipe for pad thai",
  "who won the world cup",
  "how tall is the eiffel tower",
  "convert 5 miles to kilometres",
  "write me a poem about cats",
  "what time is it",
  "best beach on koh samui",
  "how do I fix my printer",
  "tell me a joke"
];
console.log("2. must miss ("+CONTROLS.length+")");
CONTROLS.forEach(function(c){
  var r=ask.answer(c);
  ok(r.kind==="miss"||r.kind==="empty", JSON.stringify(c)+" -> "+r.kind+(r.entry?" ("+r.entry.id+")":""));
});

/* ---- 3. drift: solution entries quote the page's rows word for word ---- */
console.log("3. page drift");
var html=fs.readFileSync(path.join(__dirname,"..","aininja","index.html"),"utf8");
function text(s){ return s.replace(/<[^>]+>/g,"").replace(/&quot;/g,'"').replace(/\s+/g," ").trim(); }
var rows={};
html.replace(/<details class="sol-row rv">\s*<summary><span class="nm">([^<]+)<\/span><span class="tg">([^<]+)<\/span><\/summary>\s*<div class="bd"><p>([\s\S]*?)<\/p>/g, function(_, nm, tg, p){
  rows[text(nm)]={tg:text(tg), p:text(p)};
});
ok(Object.keys(rows).length===11, "found "+Object.keys(rows).length+" solution rows on the page (wanted 11)");
ask.LIBRARY.filter(function(e){ return e.sol; }).forEach(function(e){
  var row=rows[e.sol];
  if(!row){ ok(false, e.id+": no row named "+JSON.stringify(e.sol)+" on the page"); return; }
  var a=text(e.a);
  ok(a.indexOf(row.tg)===0, e.id+": answer does not open with the row's tagline");
  ok(a.indexOf(row.p)>-1, e.id+": answer does not carry the row's paragraph word for word");
  ok(e.cta && e.cta.what===e.sol && e.cta.note===row.tg, e.id+": want button does not match the row's");
});

/* ---- 4. every answer is clean: no address, no long dash, no kata talk ---- */
console.log("4. hygiene");
ask.LIBRARY.forEach(function(e){
  var t=text(e.a)+" "+e.q;
  ok(!/@/.test(t), e.id+": an at-sign in the answer");
  ok(!/[–—]|--/.test(t), e.id+": a long dash in the answer");
  ok(!/\b(kata|shelf|receipts?)\b/i.test(t), e.id+": kata, shelf or receipts in public copy");
  ok(!/\b(claude|chatgpt|gemini|openai|anthropic|grok|xai)\b/i.test(t), e.id+": a company or model named in public copy");
});

console.log(fails ? "\n"+fails+" of "+n+" checks FAILED" : "\nall "+n+" checks passed");
process.exit(fails?1:0);
