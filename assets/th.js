/* Lines for visits from Thailand only (20 Oct 2026). Rick, 19 Oct, on
   tewtors.com: "a person OUTSIDE of thailand will have no idea why you are
   saying 'in thailand' ... it is a red flag. They also will not know what THB
   means." So every line about paying from Thailand (the PromptPay button, the
   bank note, the PromptPay sentences under the plans and in the R2 FAQ)
   carries data-th and the hidden attribute, and shows only when ricktew-geo,
   our own function on tews-inc, answers that the visit is from Thailand. No
   answer, no line: everyone else sees US dollars and nothing about Thailand.
   ?th=1 or ?th=0 on the address previews either view (Rick is in Thailand).
   The Terms keep their PromptPay line for everyone: they are the contract.

   The card in baht (staged 20 Oct 2026): a Buy page's "Pay in" pick is one of
   those lines. From Thailand it opens on baht ("Baht first, like the app",
   Rick on tewtors.com) and switches the page's [data-way] blocks: "usd" is the
   US dollar Buy, shown to everyone else; "thb" is the card in baht and
   PromptPay, its figures written by /assets/promptpay.js.

   EVERY BUY PAYS RICK TEW CO. (21 Oct 2026). Rick: "we default to the Rick Tew
   Co., for now", and for a visitor from abroad: "Customer SEES what would be
   normal to see, when it goes to Striple or pay it can show how it is supposed
   to show ... We don't sell aininja to tourists". So a visit from Thailand sees
   the baht way and PromptPay; everyone else sees the US dollar view (GNS at its
   dollar price; the two apps say "Want one? Write to me.", no price, no Buy), and Stripe's
   Adaptive Pricing on Rick Tew Co. shows them their own currency at checkout.
   The buy relays send cur=thb on every Buy, so every card lands on Rick Tew
   Co. The "Pay in" pick is gone: both choices would reach the same company.
   Tew's Inc on these pages again: the cur check back in /aininja/shop/buy/ and
   /hininja/buy/, and the pick shown in show(). */
(function () {
  "use strict";
  var lines = document.querySelectorAll("[data-th]"), hasWays = !!document.querySelector("[data-way]");
  if (!lines.length && !hasWays) return;
  function pick(cur) {
    [].forEach.call(document.querySelectorAll("[data-way]"), function (el) { el.hidden = el.getAttribute("data-way") !== cur; });
    [].forEach.call(document.querySelectorAll(".pick button[data-cur]"), function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-cur") === cur)); });
  }
  [].forEach.call(document.querySelectorAll(".pick button[data-cur]"), function (b) {
    b.addEventListener("click", function () { pick(b.getAttribute("data-cur")); });
  });
  function show() {
    [].forEach.call(lines, function (el) { el.hidden = false; });
    if (hasWays) pick("thb");
  }
  var preview = /[?&]th=([01])(?:&|$)/.exec(location.search);
  if (preview) { if (preview[1] === "1") show(); return; }
  fetch("https://qegfhbseccinnxnzfhxw.supabase.co/functions/v1/ricktew-geo", { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (a) { if (a && a.th === true) show(); })
    .catch(function () {});
})();
