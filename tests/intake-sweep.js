/* Run: python3 -m http.server 8765 (from the repo root), then: node tests/intake-sweep.js
   Sim playtest for ricktew.com/aininja/start/ (The Intake). Playwright is loaded
   from the newnei-app checkout on this Mac, like tests/aininja-sweep.js.
   Walks the sheet on a desktop and a phone: console and page errors, failed
   requests, long dashes and bad tokens in visible text, every question rendered
   from the catalog, every option tapped and untapped, "none" exclusivity, the
   "which one" boxes, text caps, autosave surviving a reload, the rail chips and
   gap links, the send validation, a file upload against a MOCKED endpoint and a
   MOCKED storage PUT (nothing leaves this machine), the submit payload shape,
   and the done panel. Also asserts the endpoint's catalog copy is identical to
   the page's. Exit 1 on any finding.
   Since 9 Oct 2026 the page opens on the quick start (name, email, talk or
   type) with the long sheet folded below: the walk opens the fold, checks the
   paired boxes line up, and quickWalk sends a voice note (Chrome's fake
   microphone playing AUDIO, a wav file), a typed note, and an empty send. */
"use strict";
const fs = require("fs");
const path = require("path");
const { chromium, devices } = require("/Users/ricktew/Dev/Roy Martina/newnei-app/node_modules/playwright");

const BASE = process.env.BASE || "http://127.0.0.1:8765/aininja/start/";
const ENDPOINT = "**/functions/v1/ricktew-intake";
const STORAGE_PUT = "**/storage/v1/object/upload/sign/**";
const findings = {};
function flag(kind, detail) { (findings[kind] = findings[kind] || []).push(detail); }

const ROOT = path.join(__dirname, "..");
const catalog = require(path.join(ROOT, "aininja/start/intake-questions.js"));
const QS = catalog.allQuestions();

// ---- the two catalog copies must be byte-identical ----
{
  const a = fs.readFileSync(path.join(ROOT, "aininja/start/intake-questions.js"), "utf8");
  const bPath = path.join(ROOT, "supabase/functions/ricktew-intake/intake-questions.js");
  if (!fs.existsSync(bPath)) flag("catalog-copy", "endpoint has no intake-questions.js; run deploy.sh");
  else if (fs.readFileSync(bPath, "utf8") !== a) flag("catalog-copy", "endpoint copy of intake-questions.js differs from the page's; run deploy.sh");
}

async function walk(browser, label, ctxOpts) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  const consoleErrors = [], pageErrors = [], badReq = [];
  page.on("console", m => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", e => pageErrors.push(String(e)));
  page.on("requestfailed", r => { if (r.url().startsWith("http://127.0.0.1")) badReq.push([r.url(), r.failure() && r.failure().errorText]); });
  page.on("response", r => { if (r.status() >= 400 && r.url().startsWith("http://127.0.0.1")) badReq.push([r.url(), r.status()]); });

  const posts = [];
  let uploadPuts = 0;
  await page.route(ENDPOINT, async route => {
    const body = route.request().postDataJSON();
    posts.push(body);
    if (body.action === "upload-url") {
      const p = `intake/2026-09/${body.intake}/media/t-${body.name}`;
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, url: `https://stub.supabase.co/storage/v1/object/upload/sign/aininja-intake/${p}?token=T`, path: p }) });
    }
    return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.route(STORAGE_PUT, async route => { uploadPuts++; await route.fulfill({ status: 200, contentType: "application/json", body: '{"Key":"x"}' }); });

  // A Shop order rides in on the link too (30 Sep 2026): ?sku=&plan=&order=.
  await page.goto(BASE + "?key=testkey&sku=AIN-CONTACT-FORM&plan=we-run-it&order=cs_live_TESTtest1234567890", { waitUntil: "load" });
  const bought = await page.textContent("#bought");
  if (bought !== "This sheet is for your order: Contact Form, We run it (SKU AIN-CONTACT-FORM).") flag("purchase", label + ": order line reads " + JSON.stringify(bought));
  await page.waitForTimeout(600);
  const folded = await page.evaluate(() => !document.getElementById("full").open);
  if (!folded) flag("quick", label + ": the long sheet is not folded on a fresh visit");
  await page.evaluate(() => { document.getElementById("full").open = true; });
  await page.waitForTimeout(300);
  if (label === "desktop") {
    const off = await page.evaluate(() => [...document.querySelectorAll("#form .row2")].map(r => {
      const i = [...r.querySelectorAll("input")].map(x => Math.round(x.getBoundingClientRect().top));
      return i.length === 2 && Math.abs(i[0] - i[1]) > 2 ? r.querySelector(".q").id + " " + i.join("/") : null;
    }).filter(Boolean));
    off.forEach(o => flag("layout", label + ": paired boxes not level: " + o));
  }

  // ---- text shape ----
  const text = await page.evaluate(() => {
    const bad = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n; while ((n = walker.nextNode())) {
      const el = n.parentElement; if (!el || el.closest("script,style,noscript")) continue;
      const t = n.textContent;
      if (/\bNaN\b|\bundefined\b|\[object Object\]/.test(t)) bad.push(["token", t.trim().slice(0, 80)]);
      if (/[–—]|--/.test(t)) bad.push(["long dash", t.trim().slice(0, 80)]);
    }
    return bad;
  });
  text.forEach(b => flag("bad-text", label + ": " + b.join(" | ")));

  // ---- every question rendered, invite chip on ----
  for (const q of QS) {
    const ok = await page.evaluate(id => !!document.getElementById("q-" + id), q.id);
    if (!ok) flag("missing-question", label + ": #q-" + q.id);
  }
  if (!(await page.evaluate(() => document.getElementById("invite").classList.contains("on")))) flag("invite", label + ": ?key= did not show the invite chip");

  // ---- anchors ----
  const hashes = await page.evaluate(() => [].map.call(document.querySelectorAll('a[href^="#"]'), a => a.getAttribute("href").slice(1)));
  for (const id of new Set(hashes)) if (!(await page.evaluate(id => !!document.getElementById(id), id))) flag("broken-anchor", label + ": #" + id);
  const sameOrigin = await page.evaluate(() => [].map.call(document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"])'), a => a.getAttribute("href")));
  for (const h of new Set(sameOrigin)) {
    const r = await fetch(new URL(h, BASE).href).catch(() => null);
    if (!r || r.status >= 400) flag("broken-link", label + ": " + h + " " + (r ? r.status : "no response"));
  }

  // ---- tap every option, then untap; singles exclusive, multis additive ----
  for (const q of QS) {
    if (q.type !== "single" && q.type !== "multi") continue;
    for (const o of q.options) {
      const sel = `.q-opt[data-q="${q.id}"][data-v="${o.v}"]`;
      await page.click(sel);
      const pressed = await page.$$eval(`.q-opt[data-q="${q.id}"][aria-pressed="true"]`, els => els.map(e => e.dataset.v));
      if (!pressed.includes(o.v)) flag("dead-option", label + `: ${q.id}=${o.v} did not press`);
      if (q.type === "single" && pressed.length !== 1) flag("single-not-exclusive", label + `: ${q.id} has ${pressed.length} pressed`);
      if (o.more) {
        const shown = await page.evaluate(id => document.getElementById("m-" + id).parentElement.classList.contains("on"), q.id);
        if (!shown) flag("more-box", label + `: ${q.id}=${o.v} did not open its which-one box`);
        await page.fill(`#m-${q.id}`, "Which one text");
      }
    }
    if (q.type === "multi") {
      const pressedAll = await page.$$eval(`.q-opt[data-q="${q.id}"][aria-pressed="true"]`, els => els.length);
      // the page's rule, replayed: "none"/"nothing" clears the rest; any other tap clears "none"/"nothing"
      let arr = [];
      for (const o of q.options) { if (o.v === "none" || o.v === "nothing") arr = [o.v]; else arr = arr.filter(v => v !== "none" && v !== "nothing").concat(o.v); }
      const expect = arr.length;
      if (pressedAll !== expect) flag("multi-count", label + `: ${q.id} pressed ${pressedAll}, expected ${expect}`);
    }
  }
  // leave a known state: pick the first option of every choice question
  for (const q of QS) {
    if (q.type !== "single" && q.type !== "multi") continue;
    const on = await page.$$eval(`.q-opt[data-q="${q.id}"][aria-pressed="true"]`, els => els.map(e => e.dataset.v));
    for (const v of on) await page.click(`.q-opt[data-q="${q.id}"][data-v="${v}"]`);
    await page.click(`.q-opt[data-q="${q.id}"][data-v="${q.options[0].v}"]`);
  }

  // ---- text fields, caps ----
  for (const q of QS) {
    if (["single", "multi"].includes(q.type)) continue;
    const v = q.type === "email" ? "tester@example.com" : q.type === "url" ? "https://example.com" : q.type === "tel" ? "+66 800 000 000" : q.type === "long" ? ("Long answer for " + q.id + ". ").repeat(3) : "Answer " + q.id;
    await page.fill("#f-" + q.id, v);
  }
  const capOk = await page.evaluate(lim => { const t = document.getElementById("f-workflow"); return t.maxLength === lim; }, catalog.LIMITS.long);
  if (!capOk) flag("caps", label + ": long textarea maxlength is not the catalog limit");

  const cnt = await page.textContent("#cnt");
  if (!cnt.includes(String(QS.length) + " of " + QS.length) && !cnt.replace(/\s+/g, " ").includes(`${QS.length} of ${QS.length}`)) flag("progress", label + ": counter reads '" + cnt.replace(/\s+/g, " ") + "' after answering everything");

  // ---- autosave: reload and every answer is back ----
  await page.waitForTimeout(700);
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(500);
  const restored = await page.evaluate(() => ({ name: document.getElementById("f-name").value, cnt: document.getElementById("cnt").textContent.replace(/\s+/g, " "), pressed: document.querySelectorAll('.q-opt[aria-pressed="true"]').length }));
  if (restored.name !== "Answer name") flag("autosave", label + ": name did not survive a reload");
  const choiceQs = QS.filter(q => ["single", "multi"].includes(q.type)).length;
  if (restored.pressed !== choiceQs) flag("autosave", label + `: ${restored.pressed} pressed after reload, expected ${choiceQs}`);

  // ---- send validation: a bad email is told to the visitor ----
  await page.fill("#f-email", "not-an-address");
  await page.click("#sendBtn");
  await page.waitForTimeout(300);
  const errShown = await page.evaluate(() => document.getElementById("sendErr").classList.contains("on"));
  if (!errShown) flag("validation", label + ": bad email did not show an error");
  if (posts.some(p => p.action === "submit")) flag("validation", label + ": a submit was posted with a bad email");
  await page.fill("#f-email", "tester@example.com");

  // ---- upload a file against the mocked storage ----
  await page.setInputFiles("#fileInput", { name: "price list.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4 stub " + "x".repeat(2000)) });
  await page.waitForTimeout(800);
  const fileRows = await page.$$eval("#fileList li .fp.ok", els => els.length);
  if (fileRows !== 1) flag("upload", label + `: expected 1 finished upload row, saw ${fileRows}`);
  if (uploadPuts !== 1) flag("upload", label + `: expected 1 PUT to storage, saw ${uploadPuts}`);
  const up = posts.find(p => p.action === "upload-url");
  if (!up || up.kind !== "file" || up.name !== "price list.pdf" || !/^[a-z0-9]{20}$/.test(up.intake)) flag("upload", label + ": upload-url request malformed: " + JSON.stringify(up));

  // ---- recorder cards: present, and the screen card degrades on a phone ----
  const rec = await page.evaluate(() => ({
    audioBtn: !!document.querySelector('[data-rec="audio"][data-act="start"]'),
    screenCtl: !document.querySelector("#cardScreen .rec-ctl").hidden,
  }));
  if (!rec.audioBtn) flag("recorder", label + ": no audio record button");
  if (label === "phone" && rec.screenCtl) flag("recorder", label + ": screen recording controls shown on a phone");

  // ---- phone: no horizontal overflow ----
  const over = await page.evaluate(() => {
    const w = document.documentElement.clientWidth; const out = [];
    document.querySelectorAll("body *").forEach(el => { const r = el.getBoundingClientRect(); if (r.width > 0 && r.right > w + 1 && getComputedStyle(el).position !== "absolute" && !el.closest(".trap")) out.push(el.tagName + "." + el.className + " right=" + Math.round(r.right)); });
    return { w, out: out.slice(0, 8), sw: document.documentElement.scrollWidth };
  });
  if (over.sw > over.w + 1) flag("overflow", label + `: page scrolls sideways (${over.sw} > ${over.w}): ` + over.out.join("; "));

  // ---- submit ----
  await page.evaluate(() => { document.getElementById("sendBtn").scrollIntoView(); });
  await page.click("#sendBtn");
  await page.waitForTimeout(600);
  const sub = posts.find(p => p.action === "submit");
  if (!sub) flag("submit", label + ": no submit posted");
  else {
    if (sub.key !== "testkey") flag("submit", label + ": key not carried");
    const pu = sub.purchase || {};
    if (pu.sku !== "AIN-CONTACT-FORM" || pu.plan !== "we-run-it" || pu.order !== "cs_live_TESTtest1234567890") flag("purchase", label + ": order not carried: " + JSON.stringify(sub.purchase));
    if (sub.company_url !== "") flag("submit", label + ": trap field not empty");
    if (typeof sub.elapsedMs !== "number" || sub.elapsedMs < 0) flag("submit", label + ": elapsedMs missing");
    if (!sub.answers || sub.answers.name !== "Answer name" || sub.answers.email !== "tester@example.com") flag("submit", label + ": contact answers missing");
    const answered = Object.keys(sub.answers).filter(k => !k.endsWith("_more")).length;
    if (answered !== QS.length) flag("submit", label + `: ${answered} answers posted, expected ${QS.length}`);
    if (!Array.isArray(sub.files) || sub.files.length !== 1 || !sub.files[0].path.includes(`/${sub.intake}/media/`)) flag("submit", label + ": file list missing or wrong: " + JSON.stringify(sub.files));
    for (const q of QS) if (q.type === "single" && sub.answers[q.id] !== q.options[0].v) flag("submit", label + `: ${q.id} posted ${sub.answers[q.id]}`);
  }
  const done = await page.evaluate(() => document.getElementById("done").classList.contains("on") && document.getElementById("sendForm").hidden);
  if (!done) flag("submit", label + ": done panel did not show");
  const draftGone = await page.evaluate(() => localStorage.getItem("rt-intake-v1") === null);
  if (!draftGone) flag("submit", label + ": draft still in localStorage after send");

  // ---- the address wall ----
  const html = await page.content();
  const at = html.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || [];
  const leaked = at.filter(a => !/example\.com$/.test(a));
  if (leaked.length) flag("address", label + ": address in served page: " + [...new Set(leaked)].join(", "));

  consoleErrors.forEach(e => flag("console-error", label + ": " + e.slice(0, 200)));
  pageErrors.forEach(e => flag("page-error", label + ": " + e.slice(0, 200)));
  badReq.forEach(b => flag("bad-request", label + ": " + b.join(" ")));
  await ctx.close();
}

async function quickWalk(browser, label, ctxOpts, mode) {
  const ctx = await browser.newContext({ ...ctxOpts, permissions: ["microphone"] });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", e => errs.push(String(e)));
  page.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
  const posts = [];
  await page.route(ENDPOINT, async route => {
    const body = route.request().postDataJSON(); posts.push(body);
    if (body.action === "upload-url") {
      const p = `intake/2026-10/${body.intake}/media/t-${body.name}`;
      return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, url: `https://stub.supabase.co/storage/v1/object/upload/sign/aininja-intake/${p}?token=T`, path: p }) });
    }
    return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  let putBytes = 0;
  await page.route(STORAGE_PUT, async route => { putBytes = (route.request().postDataBuffer() || Buffer.alloc(0)).length; await route.fulfill({ status: 200, contentType: "application/json", body: '{"Key":"x"}' }); });
  await page.goto(BASE, { waitUntil: "load" });
  await page.fill("#qs-name", "Quick " + label);
  await page.fill("#qs-email", "quick@example.com");
  const tag = label + " " + mode;
  if (mode === "empty") {
    await page.click("#qSend"); await page.waitForTimeout(300);
    const msg = await page.textContent("#qErr");
    if (!/Tap to talk, or type/.test(msg)) flag("quick", tag + ": an empty send was not stopped: " + JSON.stringify(msg));
    if (posts.some(p => p.action === "submit")) flag("quick", tag + ": an empty send posted");
  } else {
    if (mode === "voice") {
      await page.click('[data-rec="voice"][data-act="start"]');
      await page.waitForTimeout(3200);
      const live = await page.evaluate(() => document.querySelector('[data-timer="voice"]').textContent);
      const stopOk = await page.waitForSelector('[data-rec="voice"][data-act="stop"]', { state: "visible", timeout: 3000 }).then(() => true, () => false);
      if (!stopOk) {
        const why = await page.evaluate(() => ({ err: document.querySelector('[data-err="voice"]').textContent, url: location.href, secure: isSecureContext }));
        flag("quick", tag + ": recording did not start: " + JSON.stringify(why) + " timer " + live);
        await ctx.close(); return;
      }
      await page.click('[data-rec="voice"][data-act="stop"]');
      await page.waitForFunction(() => /Voice note added/.test(document.getElementById("qVoice").textContent), null, { timeout: 8000 }).catch(() => {});
      const said = await page.textContent("#qVoice");
      if (!/Voice note added, 0:0[2-4]/.test(said)) flag("quick", tag + ": voice note not shown as added (timer read " + live + "): " + JSON.stringify(said));
      if (putBytes < 5000) flag("quick", tag + ": the recording uploaded only " + putBytes + " bytes");
      const up = posts.find(p => p.action === "upload-url");
      if (!up || up.kind !== "audio" || up.company_url !== "") flag("quick", tag + ": upload-url body wrong: " + JSON.stringify(up));
    } else {
      await page.fill("#f-quick", "Answer my booking messages for me.");
    }
    await page.click("#qSend"); await page.waitForTimeout(600);
    const sub = posts.find(p => p.action === "submit");
    if (!sub) flag("quick", tag + ": no submit posted");
    else {
      const keys = Object.keys(sub.answers).sort().join(",");
      const want = mode === "voice" ? "email,name" : "email,name,quick";
      if (keys !== want) flag("quick", tag + ": answers posted " + keys + ", expected " + want);
      if (mode === "voice" && !(sub.files.length === 1 && sub.files[0].kind === "audio" && sub.files[0].seconds >= 2)) flag("quick", tag + ": files posted " + JSON.stringify(sub.files));
      if (mode === "type" && sub.files.length) flag("quick", tag + ": a typed note posted files");
    }
    const done = await page.evaluate(() => document.getElementById("qDone").classList.contains("on") && document.getElementById("qForm").hidden);
    if (!done) flag("quick", tag + ": the Got it panel did not show");
  }
  errs.forEach(e => flag("console-error", tag + ": " + e.slice(0, 200)));
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch();
  await walk(browser, "desktop", { viewport: { width: 1280, height: 900 } });
  await walk(browser, "phone", { ...devices["iPhone 13"] });
  await browser.close();
  // The quick start, with Chrome's fake microphone playing a real audio file
  // (Rick, 9 Oct 2026: "To test the audio just grab a song or audio file").
  const AUDIO = process.env.AUDIO;
  const mic = await chromium.launch({ args: ["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream", ...(AUDIO ? ["--use-file-for-fake-audio-capture=" + AUDIO] : [])] });
  for (const [label, opts] of [["desktop", { viewport: { width: 1280, height: 900 } }], ["phone", { ...devices["iPhone 13"] }]])
    for (const mode of ["voice", "type", "empty"]) await quickWalk(mic, label, opts, mode);
  await mic.close();
  const kinds = Object.keys(findings);
  if (!kinds.length) { console.log("intake sweep: clean (desktop + phone, " + QS.length + " questions, catalog copies identical; quick start: voice, typed and empty, desktop + phone)"); process.exit(0); }
  for (const k of kinds) { console.log("\n== " + k + " (" + findings[k].length + ")"); findings[k].slice(0, 20).forEach(d => console.log("  - " + d)); }
  process.exit(1);
})();
