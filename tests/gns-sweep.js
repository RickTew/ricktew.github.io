/* Gooffy Ninja ShhT!! at /gns/, moved here from ninjagym.com/gns on 28 Sep
   2026. Serve the repo on 8765 first:
     python3 -m http.server 8765   then   node tests/gns-sweep.js
   Desktop and phone: 200, console and page errors, failed requests,
   sideways scroll, NaN / undefined / [object Object], long dashes, mailto
   links, stray addresses, links and anchors that go nowhere. Then the page's
   own moving parts: every Enroll goes to the checkout through the HI page's
   Buy step, tagged src=gns (Rick's click, 12 Oct 2026; a post's ?src= rides
   on as gns-<src>, a bad one is dropped; an ad click's gclid / gbraid and
   cid ride on as gns-gads-<cid>-<g|b><id>, Rick's pick of 21 Oct 2026, and
   the ask box posts them), the quiz's enroll button too, the
   three mailbox prefills, the belt tabs, the vault (declassify, every tape
   tab, a tape plays, every world file opens, reseal), the quiz (every first
   answer, then 40 seeded random walks to a result, Back, Retake, and "See
   the full program" going back to the top). Exit 1 on any finding. */
"use strict";
const { chromium, devices } = require("/Users/ricktew/Dev/Roy Martina/newnei-app/node_modules/playwright");
const BASE = process.env.BASE || "http://localhost:8765", URL_ = "/gns/";
const ENROLL = BASE + "/hininja/buy/?sku=HIN-GNS-2W&src=gns";
const found = {};
function flag(kind, msg) { (found[kind] = found[kind] || []).push(msg); }

// a seeded random, so a failing walk can be replayed
function rng(seed) { return () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648; }

(async () => {
  const b = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  for (const [dev, opts] of [["desktop", { viewport: { width: 1440, height: 900 } }], ["phone", devices["iPhone 13"]]]) {
    const ctx = await b.newContext(opts);
    // never leave the site
    await ctx.route(/^https:\/\/(www\.)?(ninjagym|winjitsu)\.com\//, r => r.fulfill({ status: 200, body: "stub" }));
    const p = await ctx.newPage(), errs = [], bad = [];
    p.on("pageerror", e => errs.push(e.message));
    p.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
    p.on("requestfailed", r => { const e = r.failure() && r.failure().errorText;
      if (e !== "net::ERR_ABORTED") bad.push(r.url() + " " + e); });
    p.on("response", r => { if (r.status() >= 400 && r.url().startsWith(BASE)) bad.push(r.url() + " " + r.status()); });
    const at = dev;
    const res = await p.goto(BASE + URL_, { waitUntil: "load" });
    if (res.status() !== 200) flag("status", at + " " + res.status());
    await p.waitForTimeout(800);

    // shape: overflow, text, links
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (ov > 1) flag("sideways scroll", at + " " + ov + "px");
    const text = await p.evaluate(() => document.body.innerText);
    for (const m of text.match(/\bNaN\b|\bundefined\b|\[object Object\]/g) || []) flag("broken text", at + ": " + m);
    if (/[–—]/.test(text)) flag("long dash", at + ": " + (text.match(/.{0,40}[–—].{0,40}/) || [""])[0]);
    const html = await p.content();
    if (/href="mailto:/i.test(html)) flag("mailto", at);
    for (const a of new Set(html.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/gi) || [])) flag("address", at + ": " + a);
    for (const h of new Set(await p.$$eval("a[href]", a => a.map(x => x.getAttribute("href"))))) {
      if (/^https?:/.test(h)) continue;
      if (h.startsWith("#")) { if (!(await p.$(h))) flag("dead anchor", at + " " + h); continue; }
      const r = await ctx.request.get(new URL(h, BASE + URL_).href);
      if (r.status() !== 200) flag("dead link", at + " " + h + " " + r.status());
    }
    // a question stays on this page (21 Oct 2026): no link to the AI page but its asset files
    for (const h of new Set(await p.$$eval("a[href]", a => a.map(x => x.getAttribute("href")))))
      if (/^\/aininja\/(?!assets\/)/.test(h)) flag("contact", at + ": a link to the AI page, " + h);
    const contact = await p.$$eval(".gt-foot a", a => a.filter(x => x.textContent.trim() === "Contact").map(x => x.getAttribute("href")));
    if (contact.join() !== "#ask") flag("contact", at + ": footer Contact is " + JSON.stringify(contact));
    const enrolls = await p.$$eval("a", a => a.filter(x => /enroll/i.test(x.textContent)).map(x => x.href));
    if (enrolls.length < 4) flag("enroll", at + ": only " + enrolls.length + " Enroll links");
    enrolls.forEach(h => { if (h !== ENROLL) flag("enroll", at + ": " + h); });

    // belt tabs: each shows its own card and only its own
    const belts = await p.$$("#gtBelts .gt-belt");
    for (let i = 0; i < belts.length; i++) {
      await belts[i].click();
      const shown = await p.$$eval(".gt-beltcard", c => c.map(x => !x.hidden));
      if (shown.filter(Boolean).length !== 1 || !shown[i]) flag("belts", at + ": tab " + (i + 1) + " shows " + JSON.stringify(shown));
    }

    // the vault
    await p.click("#gvDeclass");
    await p.waitForTimeout(300);
    if (!(await p.isVisible("#gvFile"))) flag("vault", at + ": declassify did not open the file");
    for (const id of ["trms", "nunchaku", "strikes", "intro"]) {
      await p.click('.gv-tab[data-tape="' + id + '"]');
      if (!(await p.isVisible("#tape-" + id))) flag("vault", at + ": tape " + id + " not shown");
      const meta = await p.$eval("#tape-" + id + " video", v => new Promise(res => {
        if (v.readyState >= 1) return res(v.duration);
        v.preload = "metadata"; v.load();
        v.addEventListener("loadedmetadata", () => res(v.duration), { once: true });
        v.addEventListener("error", () => res("error " + (v.error && v.error.code)), { once: true });
        setTimeout(() => res("timeout"), 8000);
      }));
      if (!(meta > 1)) flag("vault", at + ": tape " + id + " metadata " + meta);
      if (!(await p.$eval("#tape-" + id + " video", v => v.poster && v.poster.length))) flag("vault", at + ": tape " + id + " no poster");
    }
    await p.click("#tape-intro .gv-feature-lock");
    await p.waitForTimeout(700);
    const played = await p.$eval("#tape-intro video", v => ({ t: v.currentTime, c: v.controls, paused: v.paused }));
    if (!played.c || !(played.t > 0 || !played.paused)) flag("vault", at + ": the tape did not play " + JSON.stringify(played));
    await p.click('.gv-tab[data-tape="trms"]');
    if (!(await p.$eval("#tape-intro video", v => v.paused))) flag("vault", at + ": switching tapes left the last one playing");
    for (let i = 0; i < 3; i++) {
      await p.click("#gvRegions .gv-region-sealed >> nth=" + i);
      const photo = await p.$eval("#gvRegions .gv-region-photo img", im => new Promise(res => {
        if (im.complete && im.naturalWidth) return res(im.naturalWidth);
        im.addEventListener("load", () => res(im.naturalWidth), { once: true });
        im.addEventListener("error", () => res("error " + im.src), { once: true });
        setTimeout(() => res("timeout " + im.src), 6000);
      }));
      if (!(photo > 10)) flag("vault", at + ": world file " + (i + 1) + " photo " + photo);
      const dots = await p.$$("#gvRegions .gv-region-dot");
      for (let d = 0; d < dots.length; d++) {
        await dots[d].click();
        const src = await p.$eval("#gvRegions .gv-region-photo img", im => im.src);
        const r = await ctx.request.get(src);
        if (r.status() !== 200) flag("vault", at + ": world photo " + src + " " + r.status());
      }
      if ((await p.$$("#gvRegions .gv-region-open-file")).length !== 1) flag("vault", at + ": more than one world file open");
      await p.click("#gvRegions .gv-region-reseal");
    }
    await p.click("#gvReseal");
    if (!(await p.isVisible("#gvFolder"))) flag("vault", at + ": reseal did not close the file");

    // the quiz
    const qz = "#qz";
    const firsts = ["skills", "coach", "fun", "gamer", "reset", "escape"];
    for (let walk = 0; walk < 40; walk++) {
      const r = rng(walk * 7919 + (dev === "phone" ? 1 : 0));
      await p.evaluate(() => { document.getElementById("qz").scrollIntoView(); });
      // back to the hook: reload is slow, so use Retake when a result is on screen
      const retake = await p.$(qz + " >> text=Retake with different answers");
      if (retake) await retake.click();
      else if (await p.$(qz + " >> text=Yes, reveal my ninja")) await p.click(qz + " >> text=Yes, reveal my ninja");
      let steps = 0, back = walk % 5 === 0;
      while (steps++ < 30) {
        const opts = await p.$$(qz + " .qz-opt");
        if (!opts.length) break;
        const pick = steps === 1 ? walk % opts.length : Math.floor(r() * opts.length);
        await opts[pick].click();
        if (back && steps === 3) { await p.click(qz + " .qz-back"); back = false; }
      }
      if (steps >= 30) { flag("quiz", at + " walk " + walk + ": no result after 30 answers"); continue; }
      await p.waitForSelector(qz + " .qz-type", { timeout: 9000 }).catch(() => flag("quiz", at + " walk " + walk + ": calculating never finished"));
      const out = await p.$eval(qz, n => n.innerText);
      if (/\bundefined\b|NaN|\[object|\bnull\b/.test(out)) flag("quiz", at + " walk " + walk + ": " + out.match(/.{0,40}(undefined|NaN|\[object|null).{0,20}/)[0]);
      if (/[–—]/.test(out)) flag("quiz", at + " walk " + walk + ": long dash");
      if (!/^The (Shadow|Thunder|Twilight) /m.test(out)) flag("quiz", at + " walk " + walk + ": type " + (out.match(/The .*/) || [""])[0]);
      const hrefs = await p.$$eval(qz + " a", a => a.map(x => x.href));
      hrefs.forEach(h => { if (h !== BASE + URL_ + "#ask" && !/^https:\/\/www\.winjitsu\.com\/?$/.test(h)) flag("quiz", at + ": link " + h); });
      if (walk === 3) {
        const full = await p.$(qz + " >> text=/^See the full/");
        if (!full) flag("quiz", at + ": no See the full program button");
        else {
          await full.click();
          await p.waitForFunction(() => window.scrollY === 0, null, { timeout: 5000 })
            .catch(async () => flag("quiz", at + ": See the full program stopped at scrollY " + await p.evaluate(() => scrollY)));
        }
      }
    }
    // every first answer is reachable
    for (const f of firsts) {
      const retake = await p.$(qz + " >> text=Retake with different answers");
      if (retake) await retake.click();
      const i = firsts.indexOf(f);
      const opts = await p.$$(qz + " .qz-opt");
      if (opts.length !== 6) { flag("quiz", at + ": first question has " + opts.length + " answers"); break; }
      await opts[i].click();
      const q = await p.$eval(qz + " .qz-q", n => n.textContent);
      if (!q || q === "What pulls you in most?") flag("quiz", at + ": " + f + " did not branch");
      await p.click(qz + " .qz-back"); // back on the first question for the next one
    }

    // the three mailbox links arrive with the subject and the first line
    // written in; a value not on the list leaves the box alone
    const ABOUT = { "gns": "I want this Tew: a spot on Gooffy Ninja ShhT!!",
      "gns-private": "I want this Tew: private 1-on-1 sessions with Rick", "gns-ask": "About: Gooffy Ninja ShhT!!", "evil": "" };
    for (const [k, first] of Object.entries(ABOUT)) {
      const q = await ctx.newPage();
      q.on("pageerror", e => errs.push("slot " + k + ": " + e.message));
      await q.goto(BASE + "/aininja/?about=" + k + "#opt-8c", { waitUntil: "load" });
      const got = await q.evaluate(() => ({ sub: document.getElementById("slotSubject").value, msg: document.getElementById("slotMessage").value }));
      if (first ? (got.sub !== "hininja" || !got.msg.startsWith(first)) : got.msg !== "") flag("slot prefill", at + " " + k + ": " + JSON.stringify(got).slice(0, 120));
      if (first) {
        const inView = await q.evaluate(() => { const r = document.getElementById("opt-8c").getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; });
        if (!inView) flag("slot prefill", at + " " + k + ": the mailbox is not on screen");
      }
      await q.close();
    }

    // Enroll with a post's ?src=, a bad ?src=, and the quiz's enroll button.
    // The buy step is stubbed: it would hand off to the real checkout.
    {
      // Its own context with service workers blocked: /aininja/ (opened above
      // for the prefills) registers /sw.js, and a page served by the worker
      // skips page.route, so the stub below never fired and the real buy step
      // ran (12 Oct 2026: two live checkout sessions opened, unpaid, expired).
      const ec = await b.newContext({ ...opts, serviceWorkers: "block" });
      const q = await ec.newPage();
      q.on("pageerror", e => errs.push("enroll: " + e.message));
      let bought = "";
      // never past the buy step: abort anything bound for the checkout, then
      // stub the step itself.
      await q.route(/supabase\.co|stripe\.com/, r => r.abort());
      await q.route(/\/hininja\/buy\//, r => { bought = r.request().url(); r.fulfill({ status: 200, contentType: "text/html", body: "<p>buy stub</p>" }); });
      const longId = "A".repeat(190);
      for (const [src, want] of [["instagram", ENROLL + "-instagram"], ["no%20good", ENROLL],
        // An ad click: the campaign and Google's click id ride in src; the ad wins
        // over a post's src; a click id off the shape or too long is left off.
        ["x&gclid=Cj0KCQjw_abc-123XYZ_BwE&cid=21987654321", ENROLL + "-gads-21987654321-gCj0KCQjw_abc-123XYZ_BwE"],
        ["instagram&gbraid=0AAAAADx9", ENROLL + "-gads-0-b0AAAAADx9"],
        ["x&gclid=bad%20id&cid=5", ENROLL + "-gads-5"],
        ["x&gclid=" + longId + "&cid=123", ENROLL + "-gads-123"]]) {
        await q.goto(BASE + URL_ + "?src=" + src, { waitUntil: "load" });
        const hs = await q.$$eval("a", a => a.filter(x => /enroll/i.test(x.textContent)).map(x => x.href));
        if (hs.length < 4) flag("enroll", at + " ?src=" + src + ": only " + hs.length + " Enroll links");
        hs.forEach(h => { if (h !== want) flag("enroll", at + " ?src=" + src + ": " + h); });
      }
      await q.goto(BASE + URL_, { waitUntil: "load" });
      await q.evaluate(() => { document.getElementById("qz").scrollIntoView(); });
      for (let i = 0; i < 30; i++) {
        const o = await q.$(qz + " .qz-opt");
        if (o) { await o.click(); continue; }
        const yes = await q.$(qz + " >> text=Yes, reveal my ninja");
        if (yes) { await yes.click(); continue; }
        break;
      }
      await q.waitForSelector(qz + " .qz-type", { timeout: 9000 }).catch(() => {});
      const go = await q.$(qz + " button >> text=/Claim your 2-week spot|enroll/i");
      if (!go) flag("enroll", at + ": the quiz result has no enroll button");
      else {
        await go.click();
        await q.waitForURL(/\/hininja\/buy\//, { timeout: 9000 }).catch(() => {});
        if (bought !== ENROLL) flag("enroll", at + ": the quiz's enroll went to " + (bought || q.url()));
      }
      await ec.close();
    }

    // The ask box: an empty press posts nothing; a filled one posts the mailbox's
    // shape (subject hininja, the page in the first line, a post's ?src=, the
    // trap empty) to a stubbed endpoint and shows Posted. Nothing is sent.
    {
      const ac = await b.newContext({ ...opts, serviceWorkers: "block" });
      const q = await ac.newPage();
      q.on("pageerror", e => errs.push("ask: " + e.message));
      const posts = [];
      await q.route(/stripe\.com/, r => r.abort());
      await q.route(/supabase\.co/, r => {
        if (/ricktew-contact/.test(r.request().url()) && r.request().method() === "POST") {
          posts.push(JSON.parse(r.request().postData() || "{}"));
          return r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
        }
        return r.abort();
      });
      await q.goto(BASE + URL_ + "?src=instagram", { waitUntil: "load" });
      await q.evaluate(() => document.getElementById("ask").scrollIntoView());
      await q.click("#askSend");
      if (!(await q.isVisible("#askErr"))) flag("ask", at + ": an empty press shows no error");
      await q.fill("#askName", "Sweep Test");
      await q.fill("#askEmail", "sweep@example.com");
      await q.fill("#askMsg", "Is there a room for two?");
      await q.click("#askSend");
      await q.waitForSelector("#askDone.on", { timeout: 5000 }).catch(() => flag("ask", at + ": no Posted after a filled press"));
      if (posts.length !== 1) flag("ask", at + ": " + posts.length + " posts");
      else {
        const d = posts[0];
        if (d.subject !== "hininja") flag("ask", at + ": subject " + d.subject);
        if (!/^About: Gooffy Ninja ShhT!!, from the GNS page\.\n\nIs there a room for two\?$/.test(d.message || "")) flag("ask", at + ": message " + JSON.stringify(d.message).slice(0, 120));
        if (d.source !== "instagram") flag("ask", at + ": source " + d.source);
        if (d.website !== "") flag("ask", at + ": trap field not empty");
        if (!(d.elapsedMs > 0)) flag("ask", at + ": elapsedMs " + d.elapsedMs);
        if ("adCampaign" in d || "adClick" in d) flag("ask", at + ": ad fields on a visit with no ad click");
      }
      // From an ad click: source gads, the campaign and the click id.
      await q.goto(BASE + URL_ + "?gclid=Cj0KCQjw_abc-123XYZ_BwE&cid=21987654321", { waitUntil: "load" });
      await q.evaluate(() => document.getElementById("ask").scrollIntoView());
      await q.fill("#askName", "Sweep Test");
      await q.fill("#askEmail", "sweep@example.com");
      await q.fill("#askMsg", "Is there a room for two?");
      await q.click("#askSend");
      await q.waitForSelector("#askDone.on", { timeout: 5000 }).catch(() => flag("ask", at + ": ad visit, no Posted after a filled press"));
      if (posts.length !== 2) flag("ask", at + ": ad visit, " + (posts.length - 1) + " posts");
      else {
        const d = posts[1];
        if (d.source !== "gads" || d.adCampaign !== "21987654321" || d.adClick !== "gclid:Cj0KCQjw_abc-123XYZ_BwE")
          flag("ask", at + ": ad visit posted " + JSON.stringify({ source: d.source, adCampaign: d.adCampaign, adClick: d.adClick }));
      }
      await ac.close();
    }

    errs.forEach(e => flag("console", at + ": " + e.slice(0, 160)));
    bad.forEach(e => flag("request", at + ": " + e));
    await ctx.close();
  }
  await b.close();
  const kinds = Object.keys(found);
  console.log("SIM PLAYTEST, /gns/, " + new Date().toISOString());
  if (!kinds.length) { console.log("no findings, desktop and phone"); return; }
  for (const k of kinds) {
    const u = [...new Set(found[k])];
    console.log("\n" + k + " (" + u.length + ")");
    u.slice(0, 8).forEach(m => console.log("  " + m));
  }
  process.exit(1);
})();
