// Renders a Shop share card: 1200 x 630, the cover on the left, the words on
// the right, no price (a price in a picture goes stale). Same look as the
// 2 Oct 2026 cards, whose script was never saved; this one is, so the next
// product's card is one command (3 Oct 2026).
//
//   node tests/share-card.js <out.jpg> <cover image> "<dark title>" "<blue title>" ["<line under>"]
//
// e.g. node tests/share-card.js aininja/shop/share-positive-creativity-red.jpg \
//        aininja/shop/positive-creativity-red.webp "Positive Creativity," "a WinJitsu workbook"
//
// The cover may be a transparent notebook (the WinJitsu notebook covers since
// 3 Oct 2026, <slug>-cover-clear.png) or a flat cover; pass --flat for a flat
// one and it gets the white card and shadow the 2 Oct cards had. --kicker="..."
// changes the small blue line over the title (default "The Shop · Rick Tew").
// --logo=<png> puts that logo above the title, and the dark title may then be
// "" (the Tewtors card, 6 Oct 2026: the logo, then "by Rick Tew" in blue).
const fs = require("fs"), path = require("path");
const { chromium } = require("/Users/ricktew/Dev/Roy Martina/newnei-app/node_modules/playwright");

const args = process.argv.slice(2);
const flat = args.includes("--flat");
const kick = (args.find(a => a.startsWith("--kicker=")) || "--kicker=The Shop \u00b7 Rick Tew").slice(9);
const logo = (args.find(a => a.startsWith("--logo=")) || "").slice(7);
const [out, cover, dark, blue, under = "Printable PDF, US Letter and A4."] = args.filter(a => !a.startsWith("--"));
if (!out || !cover || (!dark && !logo)) { console.error("usage: share-card.js <out.jpg> <cover> <dark title> [blue title] [line under] [--flat]"); process.exit(1); }

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const ext = path.extname(cover).slice(1).toLowerCase();
const mime = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp" }[ext];
const src = "data:" + mime + ";base64," + fs.readFileSync(cover).toString("base64");
const logoSrc = logo ? "data:image/png;base64," + fs.readFileSync(logo).toString("base64") : "";

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&family=Archivo:wght@800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#f7f6f4;display:flex;align-items:center;font-family:Nunito,Arial,sans-serif;overflow:hidden}
.pic{flex:0 0 520px;height:630px;display:flex;align-items:center;justify-content:center}
.pic img{max-height:560px;max-width:460px;display:block;filter:drop-shadow(0 18px 28px rgba(16,20,24,.16))}
.pic.flat img{background:#fff;border-radius:12px;padding:14px;max-height:540px;box-shadow:0 18px 40px rgba(16,20,24,.14);filter:none}
.txt{flex:1;padding-right:70px;padding-left:48px}
.logo{display:block;width:420px;height:auto;margin-top:22px}
.logo + h1{margin-top:14px;font-size:44px}
.k{font-size:19px;font-weight:800;letter-spacing:.2em;color:#1e73bd;text-transform:uppercase}
h1{font-family:Archivo,Arial,sans-serif;font-weight:900;font-size:60px;line-height:1.08;color:#101418;margin-top:18px}
h1 span{color:#1e73bd}
p{margin-top:26px;font-size:25px;font-weight:800;color:#4b5563;line-height:1.4}
.site{margin-top:38px;font-family:Archivo,Arial,sans-serif;font-weight:900;font-size:22px;letter-spacing:.08em;color:#101418}
.site i{font-style:normal;color:#d61f26}
</style></head><body>
<div class="pic${flat ? " flat" : ""}"><img src="${src}" alt=""></div>
<div class="txt">
  <div class="k">${esc(kick)}</div>
  ${logoSrc ? '<img class="logo" src="' + logoSrc + '" alt="">' : ""}
  <h1>${esc(dark)}${blue ? (dark ? " " : "") + "<span>" + esc(blue) + "</span>" : ""}</h1>
  <p>${esc(under)}</p>
  <div class="site">RICKTEW<i>.</i>COM</div>
</div>
</body></html>`;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.setContent(html, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: out, type: "jpeg", quality: 88 });
  await b.close();
  console.log("wrote", out);
})();
