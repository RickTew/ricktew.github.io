## PromptPay for payers in Thailand (17 Oct 2026)

Moved word for word out of CLAUDE.md on 29 Oct 2026 (CLAUDE.md had passed the 150k-character limit for
instruction files). CLAUDE.md keeps the short rules and points here. Add new rulings on this subject HERE.

Rick, in this chat: "I am allowing our promptpay option for those living in
thailand to buy our services ... (Rick Tew Co. LTD)". The same option the
Dojo put on EverCool, SabaiSen and PreferClinic that day (its kit,
`~/Dev/digitaldojo/kits/promptpay/`): NinjaGym's Bangkok Bank merchant QR for
Rick Tew Co., Ltd., used as issued (the payer's bank shows RICK TEW NINJA GYM,
PromptPay 086-294-4374). Card stays Stripe, Tew's Inc, USD, unchanged.

- **Prices, Rick's picks 17 Oct (his clicks here and in the Dojo):** the $222
  app build ฿6,999 with the first month; GNS ฿69,999; hosting in baht is
  ฿1,997 a month or ฿19,997 for the year, by PromptPay or card (it was the
  YEAR only from 17 Oct, "we DO NOT WANT to chase them monthlhy"; Rick gave
  the three R2 Hosting clients month or year on 19 Oct in the TEWBEDO chat,
  "they can pay month or year (and save) and the same with prompt pay or
  credit card", and clicked "Match: month or year" here on 20 Oct: the
  buy pages' baht line, the PromptPay card, the R2 FAQ and Terms section 3
  say so; the dollar card stays $99 a month); Your Dojo ฿69,999 a month (his pick, shown on no page;
  it goes on the client's own bill; MONTHLY, not the year-only rule, his click
  of 19 Oct: a Your Dojo client is worked with every month anyway). **Every baht price on the site is in
  `ITEMS` in `assets/promptpay.js` and nowhere else** (they moved once the
  same afternoon); `tests/promptpay-sweep.js` fails on a ฿ figure anywhere
  else on the doors or in llms.txt.
- **Where:** under each Buy button a same-size quiet button, "In Thailand? Pay
  with PromptPay", plus the client sites' card note cut short ("Paying with a
  Thai card? Ask your bank first to allow international (US dollar) payments
  on it."): MamaMia, the Spa booking site, /hininja/ and /gns/ (gns.js tags it
  src=gns like Enroll). One line under the /aininja/ plan cards, one in the R2
  FAQ "How do I pay?", one in Terms section 3 (dated 17 October 2026). No
  baht figure on those lines.
- **Only a visit from Thailand sees them (20 Oct 2026).** Rick's rule of
  19 Oct on tewtors.com: "a person OUTSIDE of thailand will have no idea why
  you are saying 'in thailand' ... it is a red flag. They also will not know
  what THB means." Every one of those lines except the Terms (the contract,
  for everyone) carries `data-th hidden`, and `/assets/th.js` opens them only
  when **`ricktew-geo`** (this repo, `supabase/functions/ricktew-geo/`, on
  tews-inc, `--no-verify-jwt`) answers `{"th":true}`. No answer, no line.
  The function cannot read a country: Supabase logs Cloudflare's
  `cf-ipcountry` at its gateway but passes only `cf-connecting-ip` inside
  (probed 20 Oct), so it looks the address up in Thailand's blocks from
  APNIC's public registry, baked into `th-ranges.ts` by `th-ranges.py`. No
  third-party geo service, nothing kept, nothing logged. `?th=1` or `?th=0`
  on a page previews either view. A new Thailand line gets `data-th hidden`
  plus the th.js script tag, and its page goes in `TH_PAGES` in
  `tests/promptpay-sweep.js`, which walks all three views (Thailand,
  elsewhere, no answer). Test: `deno test supabase/functions/ricktew-geo/geo_test.ts`.
  Refresh the blocks once in a while: run `th-ranges.py`, the test, deploy.
- **The card in baht, the buyer's pick (LIVE 20 Oct 2026, Rick's clicks
  "Rework it now, live on your go" then "Go live now"; he set
  `SHOP_TH_LIVE=on` on tews-inc himself, this chat's secret write being
  blocked; the branches `baht-pick` and `baht-card` are history).** The shape of tewtors.com's workbook pages, by
  Rick's 19 Oct rule: a visit from Thailand "will CHOOSE how they want to
  pay", baht first ("Baht first, like the app"). On MamaMia, the Spa booking
  site, /hininja/ and /gns/ a `p.pick` ("Pay in: ฿ Baht | $ US dollars",
  `data-th hidden`) sits over two `[data-way]` blocks: `usd` is the US dollar
  Buy as before (everyone else sees only this), `thb` (`data-sku`) holds "Pay
  ฿X by card" (`.thb-card`, the relay with `cur=thb`, which the relays pass on
  to ricktew-shop: one payment in baht to Rick Tew Co., Ltd., nothing renews,
  Stripe's own PromptPay left out) and "Pay ฿X with PromptPay" (`.thb-pp`, the
  card). `/assets/promptpay.js` writes the baht figures (`.thb-amt`,
  `.thb-what`, `.thb-then`) from ITEMS, so the one-place wall holds; th.js runs
  the pick. /hininja/'s big price swaps too, and so do its two longer-stay
  lines (price box and the FAQ "Can I stay longer?"): in baht they read
  "Write to me for a longer stay" with no dollar figures (Rick's click,
  20 Oct, on his read of the page). /gns/ matches (his click "Match
  /hininja/", same read): in baht its price chip, big number and sticky bar
  read ฿ from ITEMS, the 2/3/4-week ladder gives way to "Stay longer? Write
  to me for a longer stay." (to the page's own ask box, `#ask`), the FAQ
  answer and the quiz's claim button and "long" plan line follow
  (`shownPrice()` in gns.js); the dollar view is his design untouched. A
  page with a baht pick shows no dollar figure in baht view, and the
  reverse. gns.js keeps `cur=thb` when it tags src=gns.
  The old "Paying with a Thai card?" note is gone. Terms section 3 reads
  "Paying in Thai baht". **It needs `SHOP_TH_LIVE=on`** on tews-inc: if
  the switch is ever off, a `cur=thb` Buy quietly gets the US dollar
  checkout, so turn it off only together with taking the pick off the pages.
  Read live 20 Oct from Thailand, nothing paid: the four "Pay ฿X by card"
  reach Stripe as Rick Tew Co., Ltd. in THB (6,999 and 69,999) with the
  right question; the dollar Buys reach Tews Inc.
- **Stripe's Adaptive Pricing stays ON on Tew's Inc (Rick, 20 Oct 2026).**
  A visitor in Thailand on a dollar Buy sees Stripe offer THB at its exchange
  rate, with a toggle back to US dollars. His words: "if stripe suggest it a
  certain way then keep it that way is fine we are not strict to limit a
  customer we are just aware that a person in the united states has no idea
  what a baht is and will be confused ... this is just about helping the
  customers." His currency rules are about not confusing a buyer, never
  about limiting one. Do not raise it again. PromptPay is Thailand's own
  payment system, so Thailand-only is a given, not a question.
- **The cards:** `/aininja/shop/promptpay/?sku=` (payee "R2 Hosting Thailand ·
  Rick Tew Co., Ltd.", blue) and `/hininja/promptpay/?sku=` (payee "Rick Tew
  Co., Ltd.", red press only), both noindex, both run by `assets/promptpay.js`,
  SKU held to its fixed list per door. Drawn from the kit, not copied verbatim,
  because a stranger has no bill: the Paid press carries name, email and the
  checkout's own field (baby's first name, studio name, arrival date). English
  and Thai. No Thai reader round: Rick, 19 Oct, "Keep it simple for Thai if
  you do not trust that it is correct". The kit's Thai (live on the three
  client sites) stays; the lines this page adds are short and plain (the
  build line reads ค่าจัดทำ, the posted line names the payment and stops).
  A new Thai line follows the same rule. The QR is the
  kit's `rick-promptpay.png` byte for byte (`assets/images/promptpay-rick-tew-co.png`,
  decoded with the macOS Vision framework to NinjaGym's payload, CRC 4363).
- **The Paid press** posts to the mailbox (ricktew-contact v28): subject key
  `paid` plus a SKU from `PAID_SKUS` (a new item goes in both places, or its
  press arrives as "Something else"). The mail reads `Paid PromptPay <SKU>:
  <name>`, Via the PromptPay card, Source `gns` from the GNS page, and carries
  `Auto-Submitted: auto-generated` + `X-PromptPay-Sku`, so the Ninja Agent
  does not answer it. Rick checks the bank and starts the order by hand; the
  Dojo records it in its open payments. Live proof 17 Oct: a TEST press
  delivered to the Ninja Agent's mailbox, no auto-reply sent. Escaping test
  34 checks (42 since the ad fields of 22 Oct 2026, ricktew-contact v34).
- **Pocket Dojo (HSP, $2,222 once): built, ON HOLD.** Rick, 17 Oct: PromptPay
  "inside the app" at ฿69,999, and "pocket dojo is not on or part of tewtors so
  ricktew chat should be handling that". Its code is in the app repo
  `~/Dev/Winjitsu` (shared with Tewtors): branch `promptpay-hsp` (d18d4bc,
  e788fec; worktree `~/Dev/Winjitsu-promptpay-hsp`), a person approves every
  slip, its own line apart from Tewtors; migration 0063 applied (additive,
  unused until merge); its test 19/19, Tewtors' 31/31. Held on his click
  ("Hold it, keep it ready") after he told NinjaGym "None now". On his go:
  NinjaGym adds kind `hsp` to its slip hub, then merge, push, read live.
- **The new `/hsp/` (19 Oct 2026, Rick's click "Replace /hsp/ now"):** title
  and heading "Pocket Dojo" and "The Home Study Program", built in the GNS
  page's shape (belt tabs with every lesson title except inside Ninja Tools,
  how a lesson works in five steps, four app screens, two ways in, FAQ) in the
  HI door look: red only on buttons, the app's blue only inside screenshots.
  Facts come from the app's code: no lesson video plays today, no belt test
  exists (demo only). The $2,222 card says "Personal feedback from Rick on
  every technique: text, audio, and video." (Rick, the same evening: the
  Home Study Program includes all three; Direct Connect is the one with
  audio and video priced on top). Linked from `/hininja/`'s Pocket Dojo box since 28 Oct 2026 (Rick's ask); before that it was not, so the six
  month comparison with `/gns/` stays clean. Still to build and test, in
  the app, before the full move: the $2,222's audio and video reply path,
  one end-to-end test purchase, the lesson videos, belt tests.
