/* GNS moved to NerdHostel on 23 Oct 2026 (Rick: "remove the one on ricktew as we will just use
   one site"). ricktew.com/gns/ is only a forward now, so this sweep checks the forward: the
   query string (a post's ?src=, an ad's gclid and cid) and the #hash ride along to
   https://www.nerdhostel.com/gns, and the old /hininja/next/ and /hininja/preview/ addresses land on /hininja/.
   The full GNS page sweep was here until then (git history); its page is NerdHostel's now.
   NerdHostel is not contacted: its address is answered locally.
   Serve the repo first, then: BASE=http://localhost:8765 node tests/gns-sweep.js */
const { chromium } = require("/Users/ricktew/Dev/Roy Martina/newnei-app/node_modules/playwright");
const BASE = process.env.BASE || "http://localhost:8765";
const NH = "https://www.nerdhostel.com/gns";
const CASES = [
  ["/gns/", NH],
  ["/gns/?src=instagram", NH + "?src=instagram"],
  ["/gns/?gclid=TEST1&cid=42", NH + "?gclid=TEST1&cid=42"],
  ["/gns/?src=ricktew#ask", NH + "?src=ricktew#ask"],
  ["/gns/index.html?src=x", NH + "?src=x"],
];
(async () => {
  const browser = await chromium.launch();
  const findings = [];
  const ctx = await browser.newContext();
  await ctx.route("https://www.nerdhostel.com/**", (r) => r.fulfill({ status: 200, contentType: "text/html", body: "<p>NerdHostel stand-in</p>" }));
  for (const [from, want] of CASES) {
    const p = await ctx.newPage();
    await p.goto(BASE + from, { waitUntil: "load" }).catch(() => {});
    await p.waitForURL((u) => String(u).startsWith(NH), { timeout: 5000 }).catch(() => {});
    if (p.url() !== want) findings.push(`${from} landed on ${p.url()}, wanted ${want}`);
    await p.close();
  }
  const p = await ctx.newPage();
  await p.goto(BASE + "/hininja/next/?src=x#price", { waitUntil: "load" }).catch(() => {});
  await p.waitForURL((u) => !String(u).includes("/next/"), { timeout: 5000 }).catch(() => {});
  if (p.url() !== BASE + "/hininja/?src=x#price") findings.push(`/hininja/next/ landed on ${p.url()}`);
  // Since 25 Oct 2026 /hininja/ books through its Ninja Menu (tests/hininja-menu-sweep.mjs walks it);
  // the price card's button opens the menu, and the old preview address lands on /hininja/.
  const card = await p.$eval("#price .card a.btn", (a) => a.getAttribute("href")).catch(() => null);
  if (card !== "#menu") findings.push(`/hininja/ price card button goes to ${card}`);
  if (!(await p.$("#menu .tile"))) findings.push("/hininja/ has no Ninja Menu");
  await p.goto(BASE + "/hininja/preview/?gclid=Ab_c-12&cid=987#belts", { waitUntil: "load" }).catch(() => {});
  await p.waitForURL((u) => !String(u).includes("/preview/"), { timeout: 5000 }).catch(() => {});
  if (p.url() !== BASE + "/hininja/?gclid=Ab_c-12&cid=987#belts") findings.push(`/hininja/preview/ landed on ${p.url()}`);
  await browser.close();
  console.log("SIM PLAYTEST, the /gns/ forward, " + new Date().toISOString());
  console.log(findings.length ? findings.join("\n") : "clean");
  process.exit(findings.length ? 1 : 0);
})();
