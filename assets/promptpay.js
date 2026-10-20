/* PromptPay for payers in Thailand (17 Oct 2026). Rick, in the ricktew.com
   chat: "I am allowing our promptpay option for those living in thailand to
   buy our services ... (Rick Tew Co. LTD)". The card is drawn from the Digital
   Dojo's kit (~/Dev/digitaldojo/kits/promptpay/, c169713), the one EverCool,
   SabaiSen and PreferClinic put on their bills the same day: NinjaGym's
   Bangkok Bank merchant QR for Rick Tew Co., Ltd., used exactly as issued
   (/assets/images/promptpay-rick-tew-co.png is the kit's rick-promptpay.png,
   byte for byte); the price as text, the payer types the amount; one Paid
   press. The kit's rule, Rick's 14 Sep words: click, not read.

   What differs from the kit, and why: a client site's bill knows who is
   paying, a Buy button here does not. So the Paid press carries the name, the
   email and the one thing the card checkout asks (baby's first name, studio
   name, arrival date), and posts through the mailbox (ricktew-contact,
   subject "paid", a SKU from its own fixed list). The mail reads "Paid
   PromptPay <SKU>: <name>"; Rick checks the bank and starts the order by hand.
   Nothing is automatic, and no address of Rick's is on the page.

   EVERY BAHT PRICE ON THE SITE IS IN ITEMS, AND NOWHERE ELSE. Rick's picks,
   17 Oct 2026, in this chat and in the Dojo: the $222 app build ฿6,999 with
   the first month; GNS ฿69,999; and, the same afternoon, hosting by PromptPay
   is the YEAR only, ฿19,997 ("we DO NOT WANT to chase them monthlhy"; by card
   it stays $99 a month). A new item needs its SKU in PAID_SKUS in
   supabase/functions/ricktew-contact/index.ts as well, or its press arrives as
   an ordinary message.

   THE CARD IN BAHT, ON THE BUY PAGES (20 Oct 2026). Rick, 19 Oct, as on
   tewtors.com: a visit from Thailand "will CHOOSE how they want to pay", baht
   first ("Baht first, like the app"); everyone else sees US dollars and
   nothing about Thailand. So each Buy page has a "Pay in: ฿ Baht | $ US
   dollars" pick (data-th, run by /assets/th.js) over two ways: the US dollar
   Buy as before, and a baht way with "Pay ฿X by card" (the Digital Dojo's one
   checkout with cur=thb: one payment in baht to Rick Tew Co., Ltd., nothing
   renews) and "Pay ฿X with PromptPay" (this card). The baht way's figures are
   written below from ITEMS, so they live here and nowhere else. */
(function () {
  "use strict";

  var ENDPOINT = "https://qegfhbseccinnxnzfhxw.supabase.co/functions/v1/ricktew-contact";

  /* What the payer's bank app shows, and the number printed under the QR
     (NinjaGym prints both the same way). Nobody changes these. */
  var RECIPIENT = "RICK TEW NINJA GYM";
  var MOBILE = "086-294-4374";
  /* Who is being paid, by door (the Dojo, 17 Oct, Rick's picks): the AI side
     is "R2 Hosting Thailand" as on the client sites, the HI side the company. */
  var PAYEE = { ai: "R2 Hosting Thailand · Rick Tew Co., Ltd.", hi: "Rick Tew Co., Ltd." };

  var ITEMS = {
    "AIN-MAMAMIA": {
      door: "ai", thb: 6999, year: 19997, kind: "build",
      name: { en: "MamaMia", th: "MamaMia" },
      field: { en: "Baby's first name", th: "ชื่อของลูก" }, type: "text",
      back: "/aininja/shop/ain-mamamia/#ain-mamamia"
    },
    "AIN-SPA-BOOKING": {
      door: "ai", thb: 6999, year: 19997, kind: "build",
      name: { en: "Spa booking site", th: "เว็บไซต์จองสปา" },
      field: { en: "Studio name", th: "ชื่อร้าน" }, type: "text",
      back: "/aininja/shop/ain-spa-booking/#ain-spa-booking"
    },
    "HIN-GNS-2W": {
      door: "hi", thb: 69999, kind: "weeks",
      name: { en: "Gooffy Ninja ShhT!!, 2 weeks", th: "Gooffy Ninja ShhT!! 2 สัปดาห์" }, /* no place in a payment name (Rick, 19 Oct 2026) */
      field: { en: "Arrival date", th: "วันที่มาถึง" }, type: "date",
      back: "/hininja/#price"
    }
  };

  /* Both languages. The kit's lines are the Dojo's Thai, live on the three
     client sites. Rick, 19 Oct 2026: "Keep it simple for Thai if you do not
     trust that it is correct", so the lines this page adds stay short and plain
     (the posted line names the payment and stops). */
  var WORDS = {
    en: {
      title: "Pay with PromptPay", lang: "ไทย", copy: "Copy", copied: "Copied",
      card: "Pay {thb} by card", pp: "Pay {thb} with PromptPay",
      build: "to build, first month included", then: "Then {thb} a year for the hosting: about {mo} a month, paid once for the year.", weeks: "for 2 weeks, all in",
      doIt: "Scan and pay this. Then press Paid.", name: "Your name", email: "Your email", paid: "Paid {thb}",
      phone: "On your phone? Press and hold the QR to save it, then scan it from your photos in your bank app.",
      backQ: "Prefer to pay by card?", back: "Back to the card option",
      need: "Fill in all three boxes, then press Paid.", badEmail: "That email does not look right.",
      failed: "That did not go through. Press Paid again.",
      posted: "Posted: paid {thb} by PromptPay for {item}. Payments are checked at the bank by hand.",
      missing: "That link is missing its product.", home: "Back to the site"
    },
    th: {
      title: "ชำระด้วยพร้อมเพย์", lang: "EN",
      copy: "คัดลอก", copied: "คัดลอกแล้ว",
      build: "ค่าจัดทำ รวมค่าโฮสติ้งเดือนแรกแล้ว",
      then: "จากนั้นค่าโฮสติ้ง {thb} ต่อปี เฉลี่ยประมาณ {mo} ต่อเดือน จ่ายครั้งเดียวทั้งปี",
      weeks: "สำหรับ 2 สัปดาห์ รวมทุกอย่าง",
      doIt: "สแกนจ่ายตามนี้ แล้วกด จ่ายแล้ว",
      name: "ชื่อของคุณ", email: "อีเมลของคุณ",
      paid: "จ่ายแล้ว {thb}",
      phone: "เปิดบนมือถือ? กดค้างที่ QR เพื่อบันทึกรูป แล้วเลือกสแกนจากรูปภาพในแอปธนาคาร",
      backQ: "ต้องการจ่ายด้วยบัตร?", back: "กลับไปที่ตัวเลือกบัตร",
      need: "กรอกให้ครบทั้งสามช่อง แล้วกด จ่ายแล้ว",
      badEmail: "อีเมลนี้ดูไม่ถูกต้อง",
      failed: "ยังส่งไม่สำเร็จ กด จ่ายแล้ว อีกครั้ง",
      posted: "ส่งแล้ว: จ่ายแล้ว {thb} ทางพร้อมเพย์ สำหรับ {item}",
      missing: "ลิงก์นี้ไม่มีชื่อสินค้า", home: "กลับไปที่เว็บไซต์"
    }
  };

  var $ = function (id) { return document.getElementById(id); };
  var thb = function (n) { return "฿" + n.toLocaleString("en-US"); };
  /* The year with what it comes to a month, as the kit prints it (no saving claimed). */
  var yearLine = function (w, y) { return w.then.replace("{thb}", thb(y)).replace("{mo}", thb(Math.floor(y / 12))); };

  /* A Buy page: write the baht way's figures (English, like the page) and stop. */
  if (!$("pay")) {
    [].forEach.call(document.querySelectorAll(".thb-amt, .thb-what, .thb-then, .thb-card, .thb-pp"), function (el) {
      var box = el.closest("[data-sku]"), k = box && box.getAttribute("data-sku");
      var it = k && Object.prototype.hasOwnProperty.call(ITEMS, k) ? ITEMS[k] : null;
      if (!it) return;
      var w = WORDS.en, c = el.classList;
      el.textContent =
        c.contains("thb-amt") ? thb(it.thb) :
        c.contains("thb-what") ? (it.kind === "build" ? w.build : w.weeks) :
        c.contains("thb-then") ? (it.year ? yearLine(w, it.year) : "") :
        (c.contains("thb-card") ? w.card : w.pp).replace("{thb}", thb(it.thb));
    });
    return;
  }
  var door = document.body.getAttribute("data-door");
  var q; try { q = new URLSearchParams(location.search); } catch (e) { q = null; }
  var sku = (q && q.get("sku")) || "";
  var item = Object.prototype.hasOwnProperty.call(ITEMS, sku) && ITEMS[sku].door === door ? ITEMS[sku] : null;
  /* Where the buyer came from rides into the mail's Source row, which the
     endpoint holds to its own fixed list: a post's ?src=instagram, or "gns"
     for anything from the GNS page (it tags its checkout gns or gns-<post>). */
  var src = (q && q.get("src")) || "";
  if (!/^[A-Za-z0-9_-]{1,200}$/.test(src)) src = "";
  if (/^gns(-|$)/.test(src)) src = "gns";

  var lang = "en";
  try { lang = localStorage.getItem("promptpay-lang") || ((navigator.language || "").slice(0, 2) === "th" ? "th" : "en"); } catch (e) {}
  if (!WORDS[lang]) lang = "en";
  var opened = Date.now(), posted = false;

  function render() {
    var w = WORDS[lang];
    document.documentElement.lang = lang;
    document.title = w.title + (door === "hi" ? " | HI Ninja | Rick Tew" : " | AI Ninja | Rick Tew");
    $("t-title").textContent = w.title;
    $("lang").textContent = w.lang;
    if (!item) {
      $("pay").hidden = true; $("gone").hidden = false;
      $("t-missing").textContent = w.missing; $("home").textContent = w.home;
      return;
    }
    $("payee").textContent = PAYEE[door];
    $("item").textContent = item.name[lang];
    $("who").textContent = RECIPIENT;
    $("mobile").textContent = MOBILE;
    $("copy").textContent = w.copy;
    $("amount").textContent = thb(item.thb) + " " + (item.kind === "build" ? w.build : w.weeks);
    $("then").textContent = item.year ? yearLine(w, item.year) : "";
    $("then").hidden = !item.year;
    $("t-do").textContent = w.doIt;
    $("l-name").textContent = w.name;
    $("l-email").textContent = w.email;
    $("l-field").textContent = item.field[lang];
    $("ppField").type = item.type;
    $("ppSend").textContent = w.paid.replace("{thb}", thb(item.thb));
    $("t-phone").textContent = w.phone;
    $("t-back-q").textContent = w.backQ;
    $("back-link").textContent = w.back;
    $("back-link").href = src === "gns" ? "/gns/" : item.back;
    if (posted) $("posted").textContent = w.posted.replace("{thb}", thb(item.thb)).replace("{item}", item.name[lang]);
  }
  render();

  $("lang").addEventListener("click", function () {
    lang = lang === "en" ? "th" : "en";
    try { localStorage.setItem("promptpay-lang", lang); } catch (e) {}
    $("ppErr").textContent = "";
    render();
  });

  if (!item) return;

  var copy = $("copy");
  copy.addEventListener("click", function () {
    var done = function () { copy.textContent = WORDS[lang].copied; setTimeout(function () { copy.textContent = WORDS[lang].copy; }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(MOBILE.replace(/\D/g, "")).then(done, done);
    else done();
  });

  var form = $("ppForm"), send = $("ppSend"), err = $("ppErr");
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var w = WORDS[lang];
    var name = $("ppName").value.trim(), email = $("ppEmail").value.trim(), field = $("ppField").value.trim();
    if (!name || !email || !field) { err.textContent = w.need; return; }
    if (!/^[^\s@,;:<>"']+@[^\s@,;:<>"']+\.[^\s@,;:<>"']{2,}$/.test(email)) { err.textContent = w.badEmail; $("ppEmail").focus(); return; }
    err.textContent = "";
    /* The mail is for Rick, so it is always in English, whatever the card shows. */
    var en = WORDS.en;
    var message =
      "Paid by PromptPay: " + item.name.en + ", " + thb(item.thb) + " " + (item.kind === "build" ? en.build : en.weeks) + "." +
      (item.year ? " " + yearLine(en, item.year) : "") + "\n" +
      "Paid to: " + PAYEE[door].replace(" · ", ", ") + " (" + RECIPIENT + ", PromptPay " + MOBILE + ").\n" +
      item.field.en + ": " + field + "\n" +
      "SKU: " + sku + "\n" +
      "The card was read in " + (lang === "th" ? "Thai" : "English") + ".";
    var data = {
      name: name, email: email, subject: "paid", sku: sku, message: message,
      website: ($("ppWebsite") || {}).value || "", elapsedMs: Date.now() - opened, source: src
    };
    send.disabled = true;
    fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      .then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(function () {
        posted = true;
        form.hidden = true; $("t-do").hidden = true;
        $("posted").hidden = false; render(); $("posted").focus();
      })
      .catch(function () { send.disabled = false; err.textContent = WORDS[lang].failed; });
  });
})();
