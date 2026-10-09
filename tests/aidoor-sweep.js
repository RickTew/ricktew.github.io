/* The AI Ninja door, every page but the landing page's own deep walk
   (that is tests/aininja-sweep.js). Serve the repo on 8765 first:
     python3 -m http.server 8765   then   node tests/aidoor-sweep.js
   Shape only, desktop and phone: 200s, console and page errors, failed
   requests, sideways scroll, NaN / undefined / [object Object] in the text,
   long dashes, mailto links, stray addresses, ld+json that does not parse,
   links and anchors that go nowhere. Plus two copy walls from 27 Sep: the
   lines Rick retired must not come back anywhere on the door, and every
   dollar figure on the small pages must be one of the real prices.
   Exit 1 on any finding. */
"use strict";
const fs = require("fs"), path = require("path");
const { chromium, devices } = require("/Users/ricktew/Dev/Roy Martina/newnei-app/node_modules/playwright");
const ROOT = path.join(__dirname, ".."), BASE = "http://localhost:8765";
const SHORT = ["/aininja/ai-customer-service/", "/aininja/ai-agents/", "/aininja/booking-system/"]; // the search pages, 2 Oct 2026
const PAGES = ["/aininja/", "/aininja/done-for-you/", ...SHORT, "/aininja/r2/", "/aininja/start/",
  "/aininja/shop/", "/aininja/shop/ain-mamamia/", "/aininja/shop/ain-mamamia/thanks/", "/aininja/shop/ain-spa-booking/", "/aininja/shop/ain-spa-booking/thanks/", "/aininja/shop/ain-contact-form/", "/aininja/shop/ain-customer-inbox/", "/aininja/shop/thanks/", "/aininja/shop/thanks/?link=expired", "/aininja/shop/download/",
  "/aininja/side-hustle-summit/", "/aininja/legal/terms.html", "/aininja/legal/privacy.html", "/", "/hininja/", "/hsp/"];
const AGENT_ADDRESS = null; // none printed since 1 Oct 2026 (Rick: "never give out our email address as we use message boxes")
const PLACEHOLDERS = new Set(["you@yourcompany.com"]); // the mailbox field's example text
// Vimeo puts a bot challenge in front of headless browsers (the HI page's intro
// video answers 401 here and plays for people; its oEmbed says public). Noise.
const THIRD_PARTY_NOISE = /vimeo|challenges\.cloudflare\.com|%c%d/;

// Lines retired by Rick's rulings. Any of them back on the door is a finding.
const RETIRED = [
  "My AI ninjas run the admin", "Ready to run your Dojo", "Payroll for these hires",
  "a ninja who builds with AI", "trained AI ninjas doing the admin",
  "instead of a person on a day rate", "is a build I price in writing",
  "Sensei runs it, $4,444", "$4,444", "on call"];
const RETIRED_FILES = ["aininja/index.html", "aininja/ask.js", "aininja/done-for-you/index.html",
  ...SHORT.map(u => u.slice(1) + "index.html"), "aininja/r2/index.html", "llms.txt"];
// Dollar figures a small page may print: the two plans, R2's three numbers,
// and the Shop's prices (PAM, $2.99, since 30 Sep 2026; the helpers' $22 a
// month, shown "Not open yet" for Rick's review on 30 Sep).
const PRICES = new Set(["$2,222", "$222", "$99", "$999", "$189", "$2.99", "$22"]);

const found = {};
function flag(kind, msg) { (found[kind] = found[kind] || []).push(msg); }

(async () => {
  for (const f of RETIRED_FILES) {
    const t = fs.readFileSync(path.join(ROOT, f), "utf8");
    for (const r of RETIRED) if (new RegExp("\\b" + r.replace(/[$.*+?()[\]{}|\\^]/g, "\\$&") + "\\b").test(t) || (r.startsWith("$") && t.includes(r)))
      flag("retired line back", f + ": " + JSON.stringify(r));
  }
  const b = await chromium.launch();
  for (const [dev, opts] of [["desktop", { viewport: { width: 1280, height: 900 } }], ["phone", devices["iPhone 13"]]]) {
    const ctx = await b.newContext(opts);
    for (const url of PAGES) {
      const p = await ctx.newPage(), errs = [], bad = [];
      p.on("pageerror", e => errs.push(e.message));
      p.on("console", m => { if (m.type() === "error" && !THIRD_PARTY_NOISE.test(m.text() + " " + ((m.location() || {}).url || ""))) errs.push(m.text()); });
      p.on("requestfailed", r => { const e = r.failure() && r.failure().errorText;
        if (e !== "net::ERR_ABORTED" && !THIRD_PARTY_NOISE.test(r.url())) bad.push(r.url() + " " + e); });
      p.on("response", r => { if (r.status() >= 400 && r.url().startsWith(BASE)) bad.push(r.url() + " " + r.status()); });
      const res = await p.goto(BASE + url, { waitUntil: "load" });
      await p.waitForTimeout(1500); // some pages stream media and never go network-idle
      const at = dev + " " + url;
      if (res.status() !== 200) flag("status", at + " " + res.status());
      errs.forEach(e => flag("console", at + ": " + e.slice(0, 160)));
      bad.forEach(e => flag("request", at + ": " + e));
      const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (ov > 1) flag("sideways scroll", at + " " + ov + "px");
      const text = await p.evaluate(() => document.body.innerText);
      for (const m of text.match(/\bNaN\b|\bundefined\b|\[object Object\]/g) || []) flag("broken text", at + ": " + m);
      if (/[–—]/.test(text)) flag("long dash", at + ": " + (text.match(/.{0,40}[–—].{0,40}/) || [""])[0]);
      if (dev !== "desktop") { await p.close(); continue; }
      const html = await p.content();
      if (/href="mailto:/i.test(html)) flag("mailto", url);
      for (const a of new Set((html.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) || []).map(x => x.replace(/\.+$/, ""))))
        if (a !== AGENT_ADDRESS && !PLACEHOLDERS.has(a) && !/^\d|@\d|\.(png|jpg|webp|js|css)$/i.test(a)) flag("address", url + ": " + a);
      for (const j of await p.$$eval('script[type="application/ld+json"]', s => s.map(x => x.textContent)))
        try { JSON.parse(j); } catch (e) { flag("ld+json", url + ": " + e.message); }
      if (url === "/aininja/done-for-you/" || url === "/aininja/r2/" || SHORT.includes(url))
        for (const d of new Set(text.match(/\$[\d,]+(\.\d\d)?/g) || [])) if (!PRICES.has(d)) flag("price", url + ": " + d);
      const links = await p.$$eval("a[href]", a => a.map(x => x.getAttribute("href")));
      for (const h of new Set(links)) {
        if (!h || h === "#" || /^(https?:|mailto:|tel:|javascript:)/.test(h) && !h.startsWith(BASE)) continue;
        if (h.startsWith("#")) { if (!(await p.$(h))) flag("dead anchor", url + " -> " + h); continue; }
        const [pth, hash] = h.split("#"), target = new URL(pth || url, BASE + url).href;
        const r = await ctx.request.get(target);
        if (r.status() !== 200) { flag("dead link", url + " -> " + h + " " + r.status()); continue; }
        if (hash && !(await r.text()).includes('id="' + hash + '"')) flag("dead anchor", url + " -> " + h);
      }
      await p.close();
    }
    await ctx.close();
  }
  await b.close();
  const kinds = Object.keys(found);
  console.log("SIM PLAYTEST, the AI Ninja door, " + new Date().toISOString());
  if (!kinds.length) { console.log("no findings across " + PAGES.length + " pages, desktop and phone"); return; }
  for (const k of kinds) {
    const u = [...new Set(found[k])];
    console.log("\n" + k + " (" + u.length + ")");
    u.slice(0, 6).forEach(m => console.log("  " + m));
  }
  process.exit(1);
})();
