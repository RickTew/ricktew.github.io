## The Shop: /aininja/shop/ (live 2026-09-30)

Moved word for word out of CLAUDE.md on 29 Oct 2026 (CLAUDE.md had passed the 150k-character limit for
instruction files). CLAUDE.md keeps the short rules and points here. Add new rulings on this subject HERE.

**THE WORKBOOKS MOVED TO TEWTORS.COM ON 6 OCT 2026 (Rick's click, "Move now").
This block supersedes the workbook lines below.** His plan: "ricktew.com/shop
will change to aininja offers and [the Tewtors chat] will take the workbooks".
tewtors.com is its own site, planned and built by the Tewtors chat in
`~/Dev/Tewtors` (private repo RickTew/tewtors, Vercel). What that means here:

- `/aininja/shop/` is AI Ninja's ready-made helpers (the two "Not open yet"
  tiles). Since 19 Oct 2026 it says nothing about the workbooks (Rick:
  "tewtors workbooks are not on ricktew", his pick "Remove the mentions": the
  Shop line and the llms.txt line are gone). No Tewtors logo, no
  workbook tiles, no Coming soon list (`tests/shop-build.py` is gone; the
  Coming soon list is the Tewtors chat's now).
- The five workbook pages (`win-cmt-pam/` and the rest) are FORWARDS to their
  tewtors.com twins: canonical + meta refresh + `location.replace` that keeps
  `?src=`. They keep their og tags so posts already out still show a picture.
  Their covers and share cards stay in `aininja/shop/` (outside pages may use
  them). They are out of the sitemap and the sweep. Only their share cards
  stay in `aininja/shop/`; the covers, the PAM map and the Tewtors logo files
  were removed the same day (nothing loads them: the Dojo checked Gumroad,
  which serves only its own CDN, and tewtors.com serves its own images).
- **Still on ricktew.com and load-bearing:** `/aininja/shop/download/` STAYS
  (the Dojo, 6 Oct: the download page stays here; `ricktew-shop` mails link it,
  and its `EXPIRED` and `HELP_URL` point here too). `/aininja/shop/thanks/`
  stays for the five old Payment Links, which still redirect here for posts
  already out. New buys go through the Dojo's one checkout (Rick: "One
  checkout for all"): tewtors.com's Buy buttons use `ricktew-shop`'s
  `/buy?sku=&src=` and land on tewtors.com/thanks/. Both pages here say
  "Tewtors" and link back to tewtors.com. Never move or delete either without
  the Dojo; a download page that moves stays up 7 more days for links mailed.
- Terms section 3 no longer mentions the workbooks (19 Oct 2026); tewtors.com/terms covers them.
- The workbook links left (run-out page, download footer) point at
  `https://tewtors.com/workbooks/`, never the bare domain: after the WinJitsu
  app switch, tewtors.com/ opens the app (the Tewtors chat, 7 Oct). The Terms
  workbook line left on 19 Oct 2026, the day tewtors.com/terms took it over
  (Tewtors 29ac379, Rick's click "Add it as written"); the Terms are dated
  19 October 2026. The forward, thanks and download pages stay until the Dojo
  moves them.

**THE SHOP'S FIRST ROW IS APPS I BUILT (7 Oct 2026, Rick's ruling).** His words:
"we will take our case studies and turn them into a quick 222 product ... the
mamamia app ... if they want one too, it is 222. So the apps or other projects
replace the workbooks." His clicks the same day:

- **The $222 is R2 Hosting** ("222 includes first month then 99"): $222 to build,
  month one included, then $99 a month. Monthly only for now (his pick, same
  day, through the Dojo: "Monthly only, for now"); yearly can be a second link
  later. A shop app is an R2 build, not a third plan.
- **One project at a time, on his word.** MamaMia first (`AIN-MAMAMIA`,
  `/aininja/shop/ain-mamamia/`, the baby page app in `~/Dev/MamaMia`). Each next
  one needs his yes on which project and what its $222 covers.
- **Second app: Spa booking site (AIN-SPA-BOOKING), Rick's clicks 9 Oct 2026.**
  `/aininja/shop/ain-spa-booking/` + `thanks/`: the booking site built for
  SabaiSen. His $222 scope, "Yes, as written": a studio site of a few pages plus
  online booking (treatment, day and open time, therapist or no preference,
  guests; a taken time cannot be booked twice; pay at the desk or PromptPay; a
  "booking received" email, NO reminders, the app sends none for treatments)
  and the bookings list (confirmed, done, no-show, cancelled). Member cards and
  PINs, packs, the till, events and tax invoices are quoted in writing. Pictures
  are phone shots of the live sabaisen.com "as it is" (his pick, therapists'
  names showing). OPEN since 9 Oct (dc4e702, his "Open it now", after the
  Dojo's 3c1a962): Buy button `ricktew-shop/buy?sku=AIN-SPA-BOOKING`, "Studio
  name" asked at checkout, indexed, in the sitemap and llms.txt. No Stripe
  product of its own: since the one-checkout ruling every app is named inline.
- **The two helpers stay** as they are, "Not open yet", below the apps row.
- **The button is the Dojo's ONE checkout, not a Payment Link per app** (Rick,
  7 Oct: "these will be the same as the workbooks where we only need one and the
  price is the same and they just choose the one they want so we don't need 100
  stripe links for each app"). The Buy href is `/aininja/shop/buy/?sku=<SKU>`
  (since 9 Oct, the Dojo's legal floor: hovering a Buy button must not show the
  provider's address); that noindex page checks the SKU and `src` against a fixed
  shape and `location.replace`s to the Dojo's
  `https://qegfhbseccinnxnzfhxw.supabase.co/functions/v1/ricktew-shop/buy?sku=<SKU>`.
  The product page script appends `&src=<source>` (not client_reference_id).
  Next to the button, as California's renewal law asks: "Renews automatically at
  $99 a month after the first 30 days, until you cancel. Cancel anytime with the
  link in your order email." (the Dojo's checkout says the same, live 9 Oct). MamaMia's
  first link (`plink_1UNsbL24k28tlk41EJkKFam1`) is retired by the Dojo once this
  is live. A new app at the same price is one line in the Dojo's shop code plus
  its page here; it stays "Not open yet" and noindex until the Dojo says its SKU
  sells. MamaMia is indexed, in the sitemap and in llms.txt.
  One link: the $222 build (one-time) plus $99 monthly with a 30-day trial, the
  baby's first name asked on the link. The buyer lands on the app's own thanks
  page, `/aininja/shop/ain-mamamia/thanks/` (noindex; no download, Rick sends
  Mama's link and code himself). The Dojo's webhook saves the order and sends
  the sale notice; there is no download and no mail of ours to the buyer.
- **Every fact on an app page comes from that app's README; every picture is
  its demo,** never a real customer's page (MamaMia's demo baby is Luna, drawn).
  The pictures are phone shots taken with the app's own Playwright; its share
  card is the app's own `og.png`.

Rick, 30 Sep, in the Dojo chat: "Ricktew.com should have a shop under AI Ninja
too they can buy as pre-made products as well." This reverses his 9 Sep rule
that the site says nothing about products. The first product is PAM, the
Personal Achievement Map (a WinJitsu workbook PDF, $2.99). More are coming from
the Dojo.

- **The pages, all in this repo.** `aininja/shop/` is the catalogue,
  indexable: small thumbnail tiles under "Ready now", then "Coming soon" with
  one dropdown per WinJitsu area. That list is written by
  `python3 tests/shop-build.py` from the Dojo's catalogue
  (`~/Dev/digitaldojo/private/products/catalogue/wj`); never hand-edit it.
  Each ready product has its own page at its SKU, lowercased:
  `aininja/shop/win-cmt-pam/` for PAM (SKU `WIN-CMT-PAM`). `aininja/shop/thanks/` is where Stripe lands the buyer after paying.
  It is noindex, and with `?link=expired` it becomes the run-out page.
  `aininja/shop/download/` is where the download mail links:
  `#t=TOKEN&f=letter|a4&p=SKU`, with the token in the fragment so it never
  reaches a server log. It is noindex and no-referrer, starts the file once, and
  a reload does not count again. Since 1 Oct (Rick's click) the Shop is linked
  from the /aininja/ footer ("The Shop"), the Shop and the ready product pages
  are in the sitemap, and llms.txt has a Shop line (written by the build). The
  Terms section 3 said Shop downloads are final once sent, and a file that did
  not arrive or open got a "write to me" (Rick's pick; the line left on 19 Oct
  2026 when tewtors.com/terms took the workbooks over). Stripe Tax stays off
  (Rick, 1 Oct: "Not now").
- **Checkout and delivery: THIS CHAT's since 19 Oct 2026 (Rick's ruling above; the code moves here at "the full move", on hold).** Until the move, the history below stands: the Buy button is a
  Stripe Payment Link on Tew's Inc (PAM: `plink_1ULKLE24k28tlk41lQTOvSGM`).
  The delivery function `ricktew-shop` runs on tews-inc (`qegfhbseccinnxnzfhxw`),
  but its source lives in the private Dojo repo at
  `~/Dev/digitaldojo/shop/supabase/functions/ricktew-shop/`, NOT under
  `supabase/` here. It checks the Stripe signature, mails the buyer and counts
  downloads (7 days, 5 per order). It serves each PDF stamped "Licensed to" the
  buyer. The files sit in the private bucket `aininja-shop`. **No PDF ever goes
  in this repo:** it is public.
- **Adding a product:** the Dojo sends its name, picture, Rick's own lines,
  price, buy URL, plink id and SKU. It gets a tile (`data-sku`) and a page at
  `aininja/shop/<sku lowercased>/`, a line in `PRODUCTS` in the download page's
  script (SKU to name), its price in `PRICES` and its page in `PAGES` in
  `tests/aidoor-sweep.js`. Then run `tests/shop-build.py`, which drops it from
  Coming soon. The SKU matches everywhere (Rick, 30 Sep): the tile, the page,
  the mail, the order row and the download link's `p=`.
- **Copy rules for the shop (Rick, 30 Sep):** the product's words are Rick's
  own plus plain facts. **No promises of any kind:** not "I read every message",
  not "I will sort it out", not "within a minute", not "always", not "free".
  Give plain directions instead ("Didn't get it? Write to me with the email you
  paid with."). Contact goes to the mailbox, never an address.
- **Share cards and where a buyer came from (2 Oct 2026, the Dojo's note
  with Rick's yes).** Each shop page's og:image is a wide 1200 x 630 card
  (`share-<name>-red.jpg` since 3 Oct, rendered from the covers by
  `node tests/share-card.js`; no price in the picture, so a price change
  never makes it stale) with `twitter:card`. A new product needs its own
  card, and a changed cover gets a card under a NEW file name, so Facebook
  and LinkedIn fetch it fresh. The
  posts link the shop with `?src=<platform>`: the Shop's tiles pass it to
  the product page, and the product page's Buy button hands it to Stripe
  as `client_reference_id` (letters, digits, dashes, underscores, up to
  200; anything else is left off). The Dojo's `ricktew-shop` keeps it on
  the order as `shop_orders.source`. Nothing is stored in the browser. A
  new product page copies the script at the bottom of the PAM page.
- **Workbook pictures are WinJitsu notebooks (3 Oct 2026, Rick).** Each
  workbook's picture is its spiral notebook in its book's colour from the
  2013 print covers (ACE yellow, MAK orange, MBS green, NRG blue, CMT red),
  with the book's name and badge at the bottom. Use the transparent
  `<slug>-cover-clear.png` from winjitsu-workbooks, as an 800 x 1200 WebP
  (`<name>-red.webp` for the CMT books, `<name>-yellow.webp` for ACE, the
  first of which, Achieving Combined Excellence, went in on 6 Oct), on the tile, the product picture
  and the Product JSON-LD. A cover change is PICTURES ONLY: the PDFs in the
  bucket are never swapped for small changes. PAM's page keeps its map
  below the card, under "The map sheet inside" (Rick's click).
- **Test:** `node tests/aidoor-sweep.js` covers every shop page.
