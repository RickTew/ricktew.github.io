## Who runs the site: Rick Tew Co., Ltd. (21 Oct 2026)

Moved word for word out of CLAUDE.md on 29 Oct 2026 (CLAUDE.md had passed the 150k-character limit for
instruction files). CLAUDE.md keeps the short rules and points here. Add new rulings on this subject HERE.

For Thailand's ETDA digital platform filing, which files by operating company
with no "doing business as". Rick's ruling in the Digital Dojo chat, "Move every
site to Rick Tew Co.", then his clicks here the same day. **ricktew.com is run
by Rick Tew Co., Ltd.** (a Thai company on Koh Samui) **and everything on it is
sold and charged by Rick Tew Co.; the Tew's Inc dollar checkout is PAUSED.**
His words: "all aininja work for now can just be listed on Rick Tew Co. LTD",
"even GNS now can be Rick Tew Co. LTD Stripe because the people would use our
location in Samui", "simply pause and or hide the other Stripe option", "we
default to the Rick Tew Co., for now as we are doing more work and focus here
and when that changes we can simply adjust".

- **What each visitor sees (the same day, second pass, via TEWBEDO; Rick:
  "Customer SEES what would be normal to see, when it goes to Striple or pay
  it can show how it is supposed to show ... We don't sell aininja to
  tourists"; his clicks on two yellow boxes in a local preview):** a visit
  from Thailand gets the baht way (card in baht + PromptPay, no pick). Anyone
  else gets the US dollar view: GNS on /hininja/ and /gns/ exactly as he
  designed it ($2,222, "Buy 2 weeks, $2,222"), and MamaMia and the Spa booking
  site show NO price and NO Buy, only "Want one? Write to me." (no word of
  Thailand, his 19 Oct red-flag rule; their "At checkout you add ..." line is
  `data-th`). Stripe's Adaptive Pricing then shows a buyer abroad their own
  currency: Stripe offered $2,165.38 for ฿69,999 on 21 Oct (about 32.3 baht
  to the dollar with its fee), under the $2,222 on the page TODAY. It is NOT
  a guarantee: if the baht strengthens past about 31.5 (roughly 2.6% from 21
  Oct), the charge comes out over $2,222 (the Tewtors chat's catch). Re-read
  the checkout amount before any GNS or Pocket Dojo marketing push. The "Pay in"
  pick is gone (both choices reach the same company; no longer `data-th`).
- **GNS is US dollars for EVERY visitor, Thailand included (third pass, same
  day).** Rick: "we don't really sell to visitors in thailand for our hininja
  stuff (we can but its not usual as typical are comfing from their home
  country for us and the vacation. So you should show it in U.S. unless there
  is a law to do otherwise". /hininja/ and /gns/ carry `<body data-usd-only>`,
  so th.js never switches them to baht: $2,222 and his design for everyone, no
  PromptPay button (the /hininja/promptpay/ card still works by its link). The
  Buy still pays Rick Tew Co. No law requiring baht was found (21 Oct): the
  2017 online-sales notice (No. 44 B.E. 2560) asks for a clearly shown price.
  /about/ keeps "2 weeks, $2,222, all in." on his answer. The same rule for
  Pocket Dojo: /hsp/ keeps "$2,222 once" while its checkout charges ฿69,999 on
  Rick Tew Co. (Tewtors app 4b2c47d; Stripe offered $2,165.38 to a US card).
- **The wall is the relays (the checkout code is untouched, still on hold):**
  both (`/aininja/shop/buy/`, `/hininja/buy/`) add `cur=thb` to every Buy, so
  every card, old links included, lands on Rick Tew Co. **It needs
  `SHOP_TH_LIVE=on`** on tews-inc: off, a `cur=thb` Buy falls back to Tew's
  Inc in dollars. Tew's Inc itself is NOT switched off: Rick, in TEWBEDO,
  "just using the Rick Tew Co. Stripe for certain sites can just leave Tews as
  it is for taking payments for global products or other things we do". To
  put Tew's Inc back on these pages: the cur check back in the two relays.
  Checked 21 Oct before pausing: the only ricktew.com orders were two test
  payments (19 Oct), so no live buyer was on Tew's Inc. TEWBEDO read Stripe
  the same day: Tew's Inc has no active subscription (the three R2 Hosting
  ones moved to Rick Tew Co. on 19 Oct), and **Adaptive Pricing is ON for
  Rick Tew Co.** (Checkout, Elements, the hosted invoice page). ricktew-shop's
  baht session sets nothing that turns it off, so a buyer abroad who presses
  "Pay ฿X by card" is offered their own currency at checkout.
- **Never write that Rick Tew Co. sells something Tew's Inc's Stripe charges:**
  Stripe's restricted list bans "receiving settlement proceeds for goods or
  services that you did not provide". If dollars come back on Tew's Inc, the
  Terms go back to naming both companies (commit 1713456 has that wording).
- **Terms** (`aininja/legal/terms.html`, dated 21 October 2026): top line
  "ricktew.com and The Digital Dojo, run by Rick Tew Co., Ltd."; section 3
  opens "Every payment on ricktew.com goes to Rick Tew Co., Ltd." (a card at
  checkout is in baht; the Shop apps and GNS are "at the price shown on" their
  page, no dollar figure); section 8's cap is Rick Tew Co.'s; section 9, "Who
  you are dealing with, and the law", governed by the laws of Thailand.
  **Privacy**: same top line, "Every payment is made to Rick Tew Co., Ltd.".
  Both footers start "Rick Tew Co., Ltd.".
- **Still in dollars on purpose:** the /aininja/ plan cards (Your Dojo
  $2,222 a month, R2 Hosting $222 then $99) are invoiced, not checkout, and
  TEWBEDO bills them from Rick Tew Co.; llms.txt and the two app pages'
  Product JSON-LD keep the dollar list price (the one-place wall keeps baht
  out of them).
- **Footers:** "Run by Rick Tew Co., Ltd." on 31 pages (front page, /hininja/
  and its history page, /hsp/, /about/, the older pages, and every AI Ninja
  page's "THE DIGITAL DOJO · by Rick Tew" line). The copyright stays "Rick
  Tew". The HI and older pages also gained a Terms link (they had none, yet
  /hininja/ sells GNS). /gns/ is left as designed.
- The ETDA filing itself is the Digital Dojo's; this chat tells it when a
  change here is live.
