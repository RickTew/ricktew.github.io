/* Run: python3 -m http.server 8765 (from the repo root), then: node tests/aininja-sweep.js
   Needs Playwright; it is loaded from the newnei-app checkout on this Mac (path below).
   BASE=https://ricktew.com/aininja/ node tests/aininja-sweep.js runs it against the live page. */
/* Sim playtest, Recipe B, for ricktew.com/aininja/.
   Walks the page headlessly on a desktop and a phone viewport and asserts on
   SHAPE: console/page errors, failed requests, broken links, bad text (NaN,
   undefined, long dashes, empty blocks), dead buttons, the quiz (12 steps,
   30 seeded random walks), the chat box (golden set + nonsense + hand-off),
   the mailbox (empty submit, valid submit against a MOCKED endpoint, nothing
   is sent), rails loading, reveals, phone overlap and overflow.
   Exit 1 on any finding. Repro inputs to anomaly_repro.json beside this file. */
"use strict";
const path = require("path");
const fs = require("fs");
const { chromium, devices } = require("/Users/ricktew/Dev/Roy Martina/newnei-app/node_modules/playwright");

const BASE = process.env.BASE || "http://127.0.0.1:8765/aininja/";
const ENDPOINT = "**/functions/v1/ricktew-contact";
const findings = {}; const repro = [];
function flag(kind, detail, input) { (findings[kind] = findings[kind] || []).push(detail); if (input) repro.push({ kind, detail, input }); }
function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

async function checkExternal(urls) {
  const out = [];
  for (const u of urls) {
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 8000);
      let r = await fetch(u, { method: "HEAD", redirect: "follow", signal: ctl.signal }).catch(() => null);
      if (!r || r.status === 405 || r.status === 403) r = await fetch(u, { method: "GET", redirect: "follow", signal: ctl.signal }).catch(() => null);
      clearTimeout(t);
      if (!r) out.push([u, "no response"]); else if (r.status >= 400) out.push([u, r.status]);
    } catch (e) { out.push([u, String(e.message || e)]); }
  }
  return out;
}

async function walk(browser, label, ctxOpts) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  const consoleErrors = [], pageErrors = [], badReq = [];
  page.on("console", m => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", e => pageErrors.push(String(e)));
  page.on("requestfailed", r => { if (r.url().startsWith(BASE.slice(0, BASE.indexOf("/aininja")))) badReq.push([r.url(), r.failure() && r.failure().errorText]); });
  page.on("response", r => { if (r.status() >= 400 && r.url().startsWith("http://127.0.0.1")) badReq.push([r.url(), r.status()]); });
  let posted = null;
  await page.route(ENDPOINT, async route => { posted = route.request().postDataJSON(); await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }); });

  await page.goto(BASE, { waitUntil: "load" });
  await page.waitForTimeout(1500);

  // ---- text shape ----
  const text = await page.evaluate(() => {
    const bad = [], empty = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n; while ((n = walker.nextNode())) {
      const el = n.parentElement; if (!el || el.closest("script,style,noscript")) continue;
      const t = n.textContent;
      if (/\bNaN\b|\bundefined\b|\[object Object\]|(^|\s)null(\s|$)/.test(t)) bad.push(["token", t.trim().slice(0, 80), el.tagName + "." + el.className]);
      if (/[–—]|--/.test(t)) bad.push(["long dash", t.trim().slice(0, 80), el.tagName + "." + el.className]);
    }
    document.querySelectorAll("h1,h2,h3,p,li,summary").forEach(el => {
      if (el.id === "slotErr" || el.id === "rSub" || el.closest("#slotDone,#askPanel,[hidden]")) return;
      if (!el.textContent.trim() && !el.querySelector("img,svg,a,button,input")) empty.push(el.tagName + "." + el.className + " in #" + ((el.closest("section,header,footer,[id]") || {}).id || "?"));
    });
    return { bad, empty };
  });
  text.bad.forEach(b => flag("bad-text", label + ": " + b.join(" | ")));
  text.empty.forEach(e => flag("empty-block", label + ": " + e));

  // ---- links ----
  const links = await page.evaluate(() => [].map.call(document.querySelectorAll("a[href]"), a => [a.getAttribute("href"), a.textContent.trim().slice(0, 40)]));
  const hashes = new Set(), sameOrigin = new Set(), external = new Set();
  for (const [h] of links) {
    if (!h || h === "#") continue;
    if (h.startsWith("#")) hashes.add(h.slice(1));
    else if (/^https?:/.test(h)) external.add(h);
    else if (!/^(mailto|tel|javascript):/.test(h)) sameOrigin.add(h);
    else flag("mailto-or-tel", label + ": " + h);
  }
  for (const id of hashes) { if (!(await page.evaluate(id => !!document.getElementById(id), id))) flag("broken-anchor", label + ": #" + id); }
  for (const h of sameOrigin) {
    const u = new URL(h, BASE).href;
    const r = await ctx.request.get(u).catch(() => null);
    if (!r || r.status() >= 400) flag("broken-link", label + ": " + h + " -> " + (r ? r.status() : "no response"));
  }
  if (label === "desktop") { (await checkExternal([...external])).forEach(([u, s]) => flag("external-link", u + " -> " + s)); }

  // ---- data-want / data-mail / ask-open buttons ----
  const wants = await page.$$("[data-want]");
  for (const w of wants) {
    const want = await w.getAttribute("data-want"), kind = await w.getAttribute("data-want-kind") || "build";
    const visible = await w.isVisible(); if (!visible) continue;
    await page.evaluate(() => { document.getElementById("slotMessage").value = ""; });
    await w.click({ force: true }); await page.waitForTimeout(150);
    const got = await page.evaluate(() => ({ msg: document.getElementById("slotMessage").value, subj: document.getElementById("slotSubject").value }));
    if (got.msg.indexOf("I want this Tew: " + want) === -1) flag("dead-button", label + ": data-want '" + want + "' did not prefill the mailbox", { want, got });
    const expect = ["hours", "build", "dojo", "slot", "hininja", "other"].includes(kind) ? kind : "other";
    if (got.subj !== expect) flag("dead-button", label + ": data-want '" + want + "' subject " + got.subj + " (wanted " + expect + ")");
  }
  for (const m of await page.$$("[data-mail]")) {
    if (!(await m.isVisible())) continue;
    await page.evaluate(() => { document.getElementById("slotMessage").value = ""; });
    await m.click({ force: true }); await page.waitForTimeout(150);
    const msg = await page.evaluate(() => document.getElementById("slotMessage").value);
    if (!msg.trim()) flag("dead-button", label + ": data-mail '" + (await m.getAttribute("data-mail")) + "' left the mailbox empty");
  }
  for (const a of await page.$$("[data-ask-open]")) {
    if (!(await a.isVisible())) continue;
    await page.evaluate(() => window.rtAskClose && window.rtAskClose());
    await a.click({ force: true }); await page.waitForTimeout(100);
    if (await page.evaluate(() => document.getElementById("askPanel").hidden)) flag("dead-button", label + ": a [data-ask-open] did not open the chat");
    await page.evaluate(() => window.rtAskClose());
  }
  for (const id of ["mailLink", "buildMail"]) {
    const el = await page.$("#" + id); if (!el || !(await el.isVisible())) continue;
    await el.click({ force: true }); await page.waitForTimeout(150);
    const inView = await page.evaluate(() => { const r = document.getElementById("slot").getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; });
    if (!inView) flag("dead-button", label + ": #" + id + " did not bring the mailbox into view");
  }

  // ---- rails and reveals ----
  await page.evaluate(async () => { document.documentElement.style.scrollBehavior = "auto"; for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, document.body.scrollHeight); });
  await page.waitForTimeout(1200);
  const rails = await page.evaluate(() => ["appRail", "shelf2"].map(id => { const el = document.getElementById(id); const imgs = [...el.querySelectorAll("img")]; return [id, el.classList.contains("run"), imgs.length, imgs.filter(i => i.complete && i.naturalWidth > 0).length]; }));
  rails.forEach(([id, run, n, ok]) => { if (!run) flag("rail", label + ": #" + id + " never started (.run missing)"); if (n === 0 || ok < n) flag("rail", label + ": #" + id + " images " + ok + "/" + n + " loaded"); });
  const hidden = await page.evaluate(() => [...document.querySelectorAll(".rv:not(.in)")].map(e => e.tagName + "." + e.className + " in #" + ((e.closest("[id]") || {}).id)));
  hidden.forEach(h => flag("reveal", label + ": still hidden after scrolling the whole page: " + h));
  const rv0 = await page.evaluate(() => [...document.querySelectorAll(".rv.in")].filter(e => getComputedStyle(e).opacity === "0").length);
  if (rv0) flag("reveal", label + ": " + rv0 + " revealed blocks still at opacity 0");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (overflow > 2) flag("overflow", label + ": page is " + overflow + "px wider than the viewport");

  // ---- quiz: 30 seeded random walks ----
  const rand = rng(20260828);
  for (let run = 0; run < 30; run++) {
    await page.evaluate(() => { const b = document.getElementById("quizBox"); b.scrollIntoView(); });
    // restart: reload quiz state by clicking back to the first step
    await page.evaluate(() => { const q = document.querySelectorAll("#quizBox .q-step"); q.forEach((s, i) => s.classList.toggle("active", i === 0)); document.querySelectorAll("#quizBox .q-opt.on").forEach(b => { b.classList.remove("on"); b.setAttribute("aria-pressed", "false"); }); });
    const picks = [];
    for (let step = 0; step < 12; step++) {
      const info = await page.evaluate(() => { const s = document.querySelector('#quizBox .q-step.active:not([data-q="result"])'); if (!s) return null; return { multi: s.dataset.multi === "1", n: s.querySelectorAll(".q-opt").length, q: s.dataset.q }; });
      if (!info) { flag("quiz", label + ": no active step at step " + step, { run, picks }); break; }
      if (info.multi) {
        const count = 1 + Math.floor(rand() * Math.min(3, info.n)); const chosen = [];
        for (let k = 0; k < count; k++) { const i = Math.floor(rand() * info.n); if (!chosen.includes(i)) chosen.push(i); }
        for (const i of chosen) await page.evaluate(i => document.querySelectorAll("#quizBox .q-step.active .q-opt")[i].click(), i);
        picks.push({ q: info.q, multi: chosen });
        const nextOk = await page.evaluate(() => { const n = document.querySelector("#quizBox .q-step.active .q-next"); if (!n || n.disabled) return false; n.click(); return true; });
        if (!nextOk) { flag("quiz", label + ": multi step next button disabled after picking", { run, picks }); break; }
      } else {
        const i = Math.floor(rand() * info.n); picks.push({ q: info.q, i });
        await page.evaluate(i => document.querySelectorAll("#quizBox .q-step.active .q-opt")[i].click(), i);
      }
      await page.waitForTimeout(20);
    }
    const res = await page.evaluate(() => { const r = document.querySelector("#quizBox .q-result, #quizBox .result, #rBelt"); const box = document.getElementById("rBig"); const start = document.getElementById("rStart"); return { active: !!document.querySelector('#quizBox .q-step.active:not([data-q="result"])'), big: box ? box.textContent.trim() : null, start: start ? start.textContent.trim().slice(0, 120) : null, text: (document.getElementById("quizBox") || {}).innerText || "" }; });
    if (res.active) flag("quiz", label + ": run " + run + " did not reach the result", { run, picks });
    if (/\bNaN\b|undefined|\[object/.test(res.text)) flag("quiz", label + ": run " + run + " result text has NaN/undefined", { run, picks, text: res.text.slice(0, 300) });
    if (!res.big) flag("quiz", label + ": run " + run + " has no headline result", { run, picks });
    if (run === 0) {
      await page.evaluate(() => document.getElementById("rBook").click()); await page.waitForTimeout(150);
      const msg = await page.evaluate(() => document.getElementById("slotMessage").value);
      if (!/Tier|hours|Suggested|Estimated|answers|quiz/i.test(msg)) flag("quiz", label + ": rBook did not carry the quiz result into the mailbox", { msg });
      await page.evaluate(() => { document.getElementById("rEmail").value = "sweep@example.test"; document.getElementById("rForm").dispatchEvent(new Event("submit", { cancelable: true })); }); await page.waitForTimeout(150);
      const em = await page.evaluate(() => document.getElementById("slotEmail").value);
      if (em !== "sweep@example.test") flag("quiz", label + ": rForm did not carry the email into the mailbox");
    }
  }

  // ---- chat box ----
  const gold = [["what does it cost", "answer"], ["is ai safe", "answer"], ["can I use it to answer my emails", "answer"], ["what is the front desk", "answer"], ["is grok safer than claude", "answer"], ["how much to build a chat box", "answer"], ["recipe for pad thai", "miss"], ["who won the world cup", "miss"], ["hi", "empty"], ["", "none"]];
  await page.evaluate(() => window.rtAskOpen());
  for (const [q, kind] of gold) {
    const before = await page.evaluate(() => document.querySelectorAll("#askLog .ask-b").length);
    await page.evaluate(q => window.rtAskQuestion(q), q); await page.waitForTimeout(30);
    const last = await page.evaluate(() => { const b = [...document.querySelectorAll("#askLog .ask-n")].pop(); return b ? b.innerText.slice(0, 120) : ""; });
    const after = await page.evaluate(() => document.querySelectorAll("#askLog .ask-b").length);
    if (kind === "none") { if (after !== before) flag("chat", label + ": empty question produced a bubble"); continue; }
    if (after !== before + 2) flag("chat", label + ": '" + q + "' did not add a question and an answer bubble");
    if (kind === "answer" && /I do not have that one|Give me a few more words/.test(last)) flag("chat", label + ": '" + q + "' should answer, got: " + last.slice(0, 60));
    if (kind === "miss" && !/I do not have that one/.test(last)) flag("chat", label + ": '" + q + "' should miss, got: " + last.slice(0, 60));
    if (kind === "empty" && !/few more words/.test(last)) flag("chat", label + ": 'hi' should ask for more words, got: " + last.slice(0, 60));
    if (/\bNaN\b|undefined|\[object|[–—]/.test(last)) flag("chat", label + ": bad text in answer to '" + q + "'");
  }
  const askMisses = await page.evaluate(() => window.rtAskMisses.length);
  if (askMisses !== 2) flag("chat", label + ": miss list has " + askMisses + " entries (wanted 2)");
  await page.evaluate(() => document.getElementById("askCta").click()); await page.waitForTimeout(200);
  const hand = await page.evaluate(() => ({ msg: document.getElementById("slotMessage").value, subj: document.getElementById("slotSubject").value, open: !document.getElementById("askPanel").hidden }));
  if (hand.msg.indexOf("I asked your ninja") === -1 || hand.subj !== "hours") flag("chat", label + ": hand-off did not carry the questions into the mailbox", hand);
  if (hand.open) flag("chat", label + ": panel stayed open after the hand-off");
  const tipCount = await page.evaluate(() => document.querySelectorAll("#askLog .ask-tip").length);
  if (tipCount < 5) flag("chat", label + ": only " + tipCount + " Tew Tips rendered for 6 answers");

  // ---- mailbox ----
  await page.evaluate(() => { ["slotName", "slotEmail", "slotMessage"].forEach(id => document.getElementById(id).value = ""); });
  await page.evaluate(() => document.getElementById("slotForm").requestSubmit()); await page.waitForTimeout(150);
  const err = await page.evaluate(() => { const e = document.getElementById("slotErr"); return getComputedStyle(e).display !== "none" && e.textContent.trim(); });
  if (!err) flag("mailbox", label + ": empty submit showed no error");
  await page.evaluate(() => { document.getElementById("slotName").value = "Sweep"; document.getElementById("slotEmail").value = "sweep@example.test"; document.getElementById("slotMessage").value = "sim playtest, mocked endpoint, nothing sent"; });
  await page.evaluate(() => document.getElementById("slotForm").requestSubmit()); await page.waitForTimeout(900);
  const done = await page.evaluate(() => !document.getElementById("slotDone").hidden && document.getElementById("slotForm").hidden);
  if (!done) flag("mailbox", label + ": valid submit did not swap to the confirmation");
  if (!posted || posted.website !== "" || typeof posted.elapsedMs !== "number" || posted.email !== "sweep@example.test") flag("mailbox", label + ": posted body has the wrong shape", posted);

  // ---- phone-only checks ----
  if (label === "phone") {
    await page.reload({ waitUntil: "load" }); await page.waitForTimeout(800);
    const bar = await page.evaluate(() => { const m = document.getElementById("mbar"); const l = document.getElementById("askLaunch"); const mb = m && m.getBoundingClientRect(); const lb = l && l.getBoundingClientRect(); return { mbar: !!m && getComputedStyle(m).display !== "none", launchVisible: !!l && !l.hidden && getComputedStyle(l).display !== "none", overlap: mb && lb && !(lb.right < mb.left || lb.left > mb.right || lb.bottom < mb.top || lb.top > mb.bottom) }; });
    if (!bar.mbar) flag("phone", "quiz bar not shown on phone");
    if (bar.launchVisible && bar.overlap) flag("phone", "Ask pill overlaps the quiz bar");
    const askBtn = await page.$(".mbar .ask-mbar");
    if (!askBtn) flag("phone", "no Ask button in the quiz bar"); else { await askBtn.click(); await page.waitForTimeout(100); if (await page.evaluate(() => document.getElementById("askPanel").hidden)) flag("phone", "quiz bar Ask button did not open the chat"); await page.evaluate(() => window.rtAskClose()); }
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; scrollTo(0, document.body.scrollHeight); }); await page.waitForTimeout(400);
    const covered = await page.evaluate(() => [...document.querySelectorAll("footer a")].map(a => { const r = a.getBoundingClientRect(); const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return [a.textContent.trim(), !!hit && (hit === a || a.contains(hit))]; }).filter(x => !x[1]).map(x => x[0]));
    covered.forEach(t => flag("phone", "footer link '" + t + "' is covered at the bottom of the page"));
  }

  consoleErrors.forEach(e => flag("console-error", label + ": " + e.slice(0, 160)));
  pageErrors.forEach(e => flag("page-error", label + ": " + e.slice(0, 160)));
  badReq.forEach(([u, s]) => flag("request", label + ": " + u + " -> " + s));
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch();
  try {
    await walk(browser, "desktop", { viewport: { width: 1280, height: 900 } });
    await walk(browser, "phone", { ...devices["iPhone 13"], isMobile: true, hasTouch: true });
  } catch (e) { flag("sweep-crashed", String(e.stack || e)); }
  await browser.close();
  const kinds = Object.keys(findings);
  console.log("\nSIM PLAYTEST, /aininja/, " + new Date().toISOString());
  if (!kinds.length) { console.log("no findings across desktop and phone"); process.exit(0); }
  for (const k of kinds) { console.log("\n" + k + ": " + findings[k].length); findings[k].slice(0, 5).forEach(d => console.log("  - " + d)); if (findings[k].length > 5) console.log("  ... and " + (findings[k].length - 5) + " more"); }
  fs.writeFileSync(path.join(__dirname, "anomaly_repro.json"), JSON.stringify(repro, null, 2));
  console.log("\nrepro inputs: " + path.join(__dirname, "anomaly_repro.json"));
  process.exit(1);
})();
