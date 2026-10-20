/* The PromptPay option for payers in Thailand (17 Oct 2026), walked end to
   end. Serve the repo on 8765 first:
     python3 -m http.server 8765   then   node tests/promptpay-sweep.js
   The mailbox endpoint is mocked: nothing is sent. Desktop and phone:
   - every Buy page's PromptPay button reaches its card with the right SKU,
     and a post's ?src= rides along (the GNS page tags it gns);
   - each card shows its payee, the receiver, the number, its baht price as
     text, the QR (the kit's file), and switches to Thai and back;
   - Paid with empty boxes or a bad email posts nothing; Paid filled in posts
     subject "paid", the SKU, the baht amount and the checkout field, once;
   - a SKU off the list, or from the other door, shows the missing line;
   - no sideways scroll, no console errors, no address of Rick's;
   - every baht price on the door lives in assets/promptpay.js, nowhere else;
   - the lines about paying from Thailand (data-th) show only when
     ricktew-geo answers th:true (mocked here), and a visit from anywhere
     else, or with no answer, sees none of them (Rick, 19 Oct 2026).
   Exit 1 on any finding. */
"use strict";
const fs = require("fs"), path = require("path");
const { chromium, devices } = require("/Users/ricktew/Dev/Roy Martina/newnei-app/node_modules/playwright");
const ROOT = path.join(__dirname, ".."), BASE = "http://localhost:8765";
const ENDPOINT = "https://qegfhbseccinnxnzfhxw.supabase.co/functions/v1/ricktew-contact";
const GEO = "https://qegfhbseccinnxnzfhxw.supabase.co/functions/v1/ricktew-geo";
// Every page with a data-th line.
const TH_PAGES = ["/aininja/shop/ain-mamamia/", "/aininja/shop/ain-spa-booking/", "/hininja/", "/gns/", "/aininja/", "/aininja/r2/"];

const CASES = [
  { from: "/aininja/shop/ain-mamamia/", btn: "#ppMamaMia", sku: "AIN-MAMAMIA", door: "/aininja/shop/promptpay/",
    payee: "R2 Hosting Thailand · Rick Tew Co., Ltd.", amount: "฿6,999 to build, first month included", then: "Then ฿19,997 a year for the hosting: about ฿1,666 a month, paid once for the year.", field: "Baby's first name", value: "Luna" },
  { from: "/aininja/shop/ain-spa-booking/", btn: "#ppSpaBooking", sku: "AIN-SPA-BOOKING", door: "/aininja/shop/promptpay/",
    payee: "R2 Hosting Thailand · Rick Tew Co., Ltd.", amount: "฿6,999 to build, first month included", then: "Then ฿19,997 a year for the hosting: about ฿1,666 a month, paid once for the year.", field: "Studio name", value: "Sabai Test Studio" },
  { from: "/hininja/", btn: "#ppGns", sku: "HIN-GNS-2W", door: "/hininja/promptpay/",
    payee: "Rick Tew Co., Ltd.", amount: "฿69,999 for 2 weeks, all in", then: "", field: "Arrival date", value: "2027-01-22" },
];

const found = [];
const flag = m => found.push(m);

(async () => {
  // The one-place wall: a baht figure anywhere on the doors but the prices file.
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => {
    const f = path.join(d, e.name);
    return e.isDirectory() ? walk(f) : /\.(html|js|txt)$/.test(e.name) ? [f] : [];
  });
  for (const f of [...walk(path.join(ROOT, "aininja")), ...walk(path.join(ROOT, "hininja")), ...walk(path.join(ROOT, "gns")), path.join(ROOT, "llms.txt")]) {
    const m = fs.readFileSync(f, "utf8").match(/฿\s?\d[\d,]*/g);
    if (m) flag("baht price outside assets/promptpay.js: " + path.relative(ROOT, f) + " " + m.join(", "));
  }
  if (fs.readFileSync(path.join(ROOT, "assets/images/promptpay-rick-tew-co.png")).length !== fs.readFileSync("/Users/ricktew/Dev/digitaldojo/kits/promptpay/rick-promptpay.png").length)
    flag("the QR is not the Dojo kit's file (kits/promptpay/rick-promptpay.png)");

  const b = await chromium.launch();
  for (const [dev, opts] of [["desktop", { viewport: { width: 1280, height: 900 } }], ["phone", devices["iPhone 13"]]]) {
    const ctx = await b.newContext({ ...opts, locale: "en-US" });
    let posts = [];
    // A visit from Thailand, for the walk below.
    await ctx.route(GEO, r => r.fulfill({ status: 200, contentType: "application/json", body: '{"th":true}', headers: { "Access-Control-Allow-Origin": "*" } }));
    await ctx.route(ENDPOINT, r => { posts.push(JSON.parse(r.request().postData() || "{}")); r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}', headers: { "Access-Control-Allow-Origin": "*" } }); });
    const watch = (p, at) => {
      p.on("pageerror", e => flag(at + " page error: " + e.message));
      p.on("console", m => { if (m.type() === "error" && !/vimeo|cloudflare/i.test(m.text())) flag(at + " console: " + m.text().slice(0, 160)); });
    };

    for (const c of CASES) {
      const at = dev + " " + c.sku;
      // The Buy page's button, with a post's ?src= on the page.
      const src = c.sku === "HIN-GNS-2W" ? "" : "?src=instagram";
      const p = await ctx.newPage(); watch(p, at);
      await p.goto(BASE + c.from + src, { waitUntil: "load" });
      const href = await p.getAttribute(c.btn, "href").catch(() => null);
      const want = c.door + "?sku=" + c.sku + (src ? "&src=instagram" : "");
      if (!href || !href.endsWith(want)) flag(at + ": the PromptPay button goes to " + href + ", not " + want);
      await p.waitForSelector(c.btn, { state: "visible", timeout: 3000 }).catch(() => flag(at + ": the PromptPay button is not visible from Thailand"));
      await p.click(c.btn);
      await p.waitForLoadState("load");
      if (!p.url().includes(c.door + "?sku=" + c.sku)) flag(at + ": clicking it landed on " + p.url());

      const t = id => p.textContent(id).then(s => (s || "").trim());
      if ((await t("#payee")) !== c.payee) flag(at + ": payee reads " + JSON.stringify(await t("#payee")));
      if ((await t("#who")) !== "RICK TEW NINJA GYM") flag(at + ": receiver reads " + JSON.stringify(await t("#who")));
      if ((await t("#mobile")) !== "086-294-4374") flag(at + ": number reads " + JSON.stringify(await t("#mobile")));
      if ((await t("#amount")) !== c.amount) flag(at + ": amount reads " + JSON.stringify(await t("#amount")));
      if ((await t("#then")) !== c.then) flag(at + ": then-line reads " + JSON.stringify(await t("#then")));
      if ((await t("#l-field")) !== c.field) flag(at + ": the field reads " + JSON.stringify(await t("#l-field")));
      const qr = await p.$eval("#qr", i => ({ w: i.naturalWidth, src: i.getAttribute("src") }));
      if (qr.w !== 552 || qr.src !== "/assets/images/promptpay-rick-tew-co.png") flag(at + ": the QR did not load: " + JSON.stringify(qr));
      const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (ov > 1) flag(at + ": sideways scroll " + ov + "px");
      const html = await p.content();
      if (/[\w.+-]+@[\w-]+\.[a-z]{2,}/i.test(html.replace(/src="[^"]*"/g, ""))) flag(at + ": an address is in the page");
      if (/mailto:/i.test(html)) flag(at + ": a mailto link");
      if (/[–—]/.test(await p.evaluate(() => document.body.innerText))) flag(at + ": a long dash");

      // Thai and back.
      await p.click("#lang");
      if ((await p.getAttribute("html", "lang")) !== "th" || !/ชำระด้วยพร้อมเพย์/.test(await t("#t-title"))) flag(at + ": the Thai switch did not switch");
      if (!/฿/.test(await t("#amount"))) flag(at + ": the Thai amount lost its price");
      await p.click("#lang");
      if ((await p.getAttribute("html", "lang")) !== "en") flag(at + ": the switch did not come back to English");

      // Paid with the boxes empty, then a bad email: nothing posts.
      posts = [];
      await p.click("#ppSend");
      if (!(await t("#ppErr"))) flag(at + ": Paid with empty boxes said nothing");
      await p.fill("#ppName", "Somchai Test"); await p.fill("#ppEmail", "not-an-email"); await p.fill("#ppField", c.value);
      await p.click("#ppSend");
      if (!/email/i.test(await t("#ppErr"))) flag(at + ": a bad email was not caught");
      if (posts.length) flag(at + ": something posted before the boxes were right");

      // Paid, filled in.
      await p.fill("#ppEmail", "somchai.test@example.com");
      await p.waitForTimeout(3100); // the endpoint drops anything faster than 3 seconds
      await p.click("#ppSend");
      await p.waitForSelector("#posted:not([hidden])", { timeout: 5000 }).catch(() => flag(at + ": no posted line after Paid"));
      if (posts.length !== 1) flag(at + ": Paid posted " + posts.length + " times");
      const d = posts[0] || {};
      if (d.subject !== "paid" || d.sku !== c.sku) flag(at + ": posted subject/sku " + d.subject + " " + d.sku);
      if (d.name !== "Somchai Test" || d.email !== "somchai.test@example.com") flag(at + ": posted name/email wrong");
      if (!(d.message || "").includes(c.amount.split(" ")[0]) || !(d.message || "").includes(c.field + ": " + c.value)) flag(at + ": the message is missing the amount or the field: " + JSON.stringify(d.message));
      if (d.website !== "") flag(at + ": the trap field was not empty");
      if (!(d.elapsedMs >= 3000)) flag(at + ": elapsedMs " + d.elapsedMs);
      if (d.source !== (src ? "instagram" : "")) flag(at + ": source " + JSON.stringify(d.source));
      if (!(await t("#posted")).includes(c.amount.split(" ")[0])) flag(at + ": the posted line does not name the amount");
      if (await p.isVisible("#ppForm")) flag(at + ": the form is still showing after Paid");
      await p.close();
    }

    // The GNS page's PromptPay button, tagged gns, and its card's back link.
    {
      const at = dev + " /gns/";
      const p = await ctx.newPage(); watch(p, at);
      await p.goto(BASE + "/gns/?src=instagram", { waitUntil: "load" });
      const href = await p.$eval('a[href^="/hininja/promptpay/?"]', a => a.getAttribute("href")).catch(() => null);
      if (href !== "/hininja/promptpay/?sku=HIN-GNS-2W&src=gns-instagram") flag(at + ": the PromptPay button goes to " + href);
      await p.goto(BASE + href, { waitUntil: "load" });
      if ((await p.getAttribute("#back-link", "href")) !== "/gns/") flag(at + ": the card's back link does not return to /gns/");
      posts = [];
      await p.fill("#ppName", "Somchai Test"); await p.fill("#ppEmail", "somchai.test@example.com"); await p.fill("#ppField", "2027-01-22");
      await p.waitForTimeout(3100); await p.click("#ppSend"); await p.waitForTimeout(400);
      if (!posts[0] || posts[0].source !== "gns") flag(at + ": the Paid mail's source is " + JSON.stringify(posts[0] && posts[0].source) + ", not gns");
      await p.close();
    }

    // A SKU off the list, and a SKU from the other door.
    for (const u of ["/aininja/shop/promptpay/?sku=NOPE-NOPE", "/aininja/shop/promptpay/?sku=HIN-GNS-2W", "/hininja/promptpay/?sku=AIN-MAMAMIA", "/hininja/promptpay/"]) {
      const p = await ctx.newPage(); watch(p, dev + " " + u);
      await p.goto(BASE + u, { waitUntil: "load" });
      if (!(await p.isVisible("#gone")) || (await p.isVisible("#pay"))) flag(dev + " " + u + ": did not show the missing line");
      await p.close();
    }
    // Every data-th line opens from Thailand (the R2 one sits in a closed FAQ).
    for (const u of TH_PAGES) {
      const p = await ctx.newPage(); watch(p, dev + " " + u);
      await p.goto(BASE + u, { waitUntil: "networkidle" });
      const shut = await p.$$eval("[data-th]", els => els.length ? els.filter(e => e.hidden).length : -1);
      if (shut) flag(dev + " " + u + (shut < 0 ? ": no data-th line on the page" : ": " + shut + " Thailand line(s) still hidden from Thailand"));
      await p.close();
    }
    await ctx.close();

    // From anywhere else, or with no answer at all: nothing about Thailand.
    for (const [why, answer] of [["outside Thailand", r => r.fulfill({ status: 200, contentType: "application/json", body: '{"th":false}', headers: { "Access-Control-Allow-Origin": "*" } })], ["no answer", r => r.abort()]]) {
      const out = await b.newContext({ ...opts, locale: "en-US" });
      await out.route(GEO, answer);
      for (const u of TH_PAGES) {
        const at = dev + " " + u + " " + why;
        const p = await out.newPage();
        p.on("pageerror", e => flag(at + " page error: " + e.message));
        await p.goto(BASE + u, { waitUntil: "networkidle" });
        const open = await p.$$eval("[data-th]", els => els.filter(e => !e.hidden).length);
        if (open) flag(at + ": " + open + " Thailand line(s) showing");
        const seen = (await p.evaluate(() => document.body.innerText)).match(/in thailand|thai card|in baht/gi);
        if (seen) flag(at + ": the page says " + seen.join(", "));
        await p.close();
      }
      await out.close();
    }
  }
  await b.close();
  if (found.length) { console.log(found.length + " finding(s):"); found.forEach(f => console.log("  " + f)); process.exit(1); }
  console.log("PromptPay sweep clean: 3 cards, the GNS page, 4 bad links, the Thailand-only lines on " + TH_PAGES.length + " pages (from Thailand, from elsewhere, no answer), desktop and phone, the one-place wall.");
})().catch(e => { console.error(e); process.exit(1); });
