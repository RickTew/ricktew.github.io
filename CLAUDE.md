# RickTew — ricktew.com

Personal brand and portfolio site for Rick Tew. Everything he makes lives here: apps, games, businesses, and tools.

**DIRECTION, 29 Oct 2026 (Rick's clicks; NOT DONE YET, each step goes live in order):**
1. **The course moves to martialartcamp.com** ("martialartcamp.com (Recommended)"): its own full course page there plus
   the top listing, always labelled "run by the people behind this site"; future ads and marketing point there. The
   martialartcamp.com chat builds it; this chat hands over the page, the Ninja Menu, the chat (`hininja/ask.js`, whose
   Kuno mail line is TEWBEDO's) and the checkout hops. `/hininja/` stays live until that page is, then forwards there
   with its query string.
   **DONE 31 Oct 2026:** Rick's shortening review done here, the hand-over sent (his click "Hand over now"), and the
   page is LIVE at https://martialartcamp.com/camps/ninja (+ /history), his GO in that chat. /hininja/, /hininja/history/,
   /hininja/next/ and /hininja/preview/ forward there (query and #part kept; same section ids). The martialartcamp.com
   chat owns the page, its menu.js, ask.js and the tests (its tests/course/); this repo's tests/hininja-menu-sweep.mjs,
   ask-hininja-golden.js and ask-hininja-sweep.mjs are retired here. Kept on ricktew.com on purpose: /hininja/buy/,
   thanks/, promptpay/, about/, img/, the PDFs, the video, the tapes and every asset (the page and NerdHostel load
   them), and the mailbox (ricktew-contact allows martialartcamp.com since 1393177). The walls below are history for
   this chat; they travel with the page in claude/hininja.md.
2. **ricktew.com becomes one authority page** ("One authority page"): who Rick is, his history, interests and
   companies, each linking out. Terms, Privacy and the checkout hops stay underneath until each moves.
   **Until it is built (Rick, 31 Oct 2026: "until we have the new ricktew page just put up the old one"):** the front
   page `index.html` is the old home word for word (it was /hininja/history/; Home and the logo on every old page
   point to `/`, the footers' "Which ninja?" link reads "Rick Tew"). The two-doors front page is in history (a92be97).
3. **The AI Ninja work (Your Dojo and R2 Managed Hosting) moves together to one new domain** ("Both to one new
   domain"); the mailbox, chat, Intake and search pages go with it. The domain is not named yet.
4. **Rick, later on 29 Oct: "when we finish it and tewbedo will get aininja and it can just copy it completely and
   pick up working on it so you can focus on hininja".** So: TEWBEDO takes the AI Ninja work (Rick picked TewBeDo.com
   in TEWBEDO, not bought yet) and copies `/aininja/` and everything it uses; this chat focuses on `/hininja/` and
   hands it to martialartcamp.com when it is finished (new times, the price settled, his shortening review). Once
   TEWBEDO says its copy is live, this chat edits `/aininja/` only to forward it there.
   **DONE 29 Oct 2026:** tewbedo.com is live; the 13 AI Ninja pages here forward there (query and #part kept). Kept
   on ricktew.com on purpose: `aininja/legal/` (Terms and Privacy cover the course too), the Shop's `buy/`, `thanks/`,
   app `thanks/`, `download/` and `promptpay/` (the held checkout and the order mails point at them), the workbook
   forwards, `ask.js`, and every asset (/hininja/ and NerdHostel load them). `tests/agent-door-build.py` is retired here;
   llms.txt is edited by hand. The AI rules files in `claude/` are history: TEWBEDO keeps them in tewbedo-site/rules/.
Until each step is live, everything below stands.

**CURRENT STATE (2026-08-21): the site is TWO DOORS.** The front page asks one
question, "Which ninja do you want?", and sends the visitor to one of two
places:

- **`/hininja/` HI Ninja**: Human Interaction. In-person martial arts,
  life-coaching, the mental martial arts: Rick's thirty years of teaching.
  Since 9 Oct 2026 it is ONE landing page selling the course on Koh Samui
  ("Martial Arts / Ninja Course / by Rick Tew"): the Ninja Menu quiz
  (`hininja/menu.js`), stays of 1 week, 2 weeks, 3 weeks and 2 months (the belt
  program) sold through the one checkout via `/hininja/buy/?weeks=`, Instructor
  and Mastery reserved through the ask box, and Ask the Ninja with Kuno
  (`hininja/ask.js`). The old HI home is word for word at `/hininja/history/`.
  **Every ruling on it (prices, stays, deposit, photos, sections, wording, his
  facts) is in `claude/hininja.md`, in the order he gave them. Read it before
  any edit to /hininja/, and add new rulings there.** The walls every edit hits:
  - Never "write to me", "Ask me anything" or "Ask first": the CTAs are Book
    now, Reserve a spot, Ask the Ninja and the topic form `#ask`.
  - Never say who teaches or how often.
  - No "HI Ninja" on /hininja/ or the pages a buyer passes ("Ninjitsu", "Martial
    Arts Ninja Course"); the front page doors, HI footers and llms.txt keep it.
  - No belt promised in a set time (29 Oct 2026, 3a6356c: "Every person earns
    at different speeds"); stays are their length, trained at your own pace.
  - Captions sell, never describe; alt text describes. No specifics (place,
    price, length, date, count) in images, videos or ads.
  - No two photos from the same place in a row (rotating boxes wrap too); no
    photo of Rick leading fitness. Never build or assemble a book or PDF of his.
  - After any edit to `hininja/ask.js`: `node tests/ask-hininja-golden.js`,
    `tests/ask-hininja-sweep.mjs` and `tests/hininja-menu-sweep.mjs` (serve the
    repo with a big queue), push, then tell TEWBEDO "ask.js changed". Never
    change the first line "From the Ask the Ninja box on /hininja/:" or the
    subject `hininja` without TEWBEDO.
  - `/gns/` (the FUN version) moved to nerdhostel.com/gns; never restyle one
    toward the other, and name the pages by address, never "test A/B".
- **`/aininja/` AI Ninja** — the digital work. Building with AI for businesses.

Both are live. The honest reason for the split, in Rick's words: the hardcore
camps and real training are more history now, thirty years of teaching is the
record rather than the plan, and the digital work is where the week actually
goes. Neither door is a demotion.

**Picking a door is no longer one-way (2026-08-23).** A slim **door bar** sits
above everything on `/aininja/` and on all eleven HI pages, reading "Which
ninja? / You are in the X Ninja door / Take the Y Ninja door". Red carries HI,
blue carries AI. Its CSS is in `css/site.css` for the HI side and inline for
`/aininja/`. The footer `.doors` link stays as the bottom-of-page answer, and
`/aininja/` got one too, which it had been missing entirely.
**Since 22 Oct 2026 the bar is OFF every HI page** (Rick's click "Off all HI
pages" after the head-to-head round: 12 of 12 readers took "Take the AI Ninja
door" for "is this an AI company?" or "wrong ad?"). Fourteen pages lost the
markup; the CSS stays in `css/site.css` (and inline on /hininja/, its thanks
page, /hsp/ and /about/) so the bar can come back. The footer links to the
front page stay. `/aininja/` and its pages keep their bar. A new HI page gets
no bar.

The old Google Sites pages are all still live at their original URLs, styled by
`css/site.css` + `js/site.js`. The one that moved is the old front page: it is
now `/hininja/` word for word, and their nav "Home" and logo point there. Their
footers carry a link back to the two doors. `/redesign/` is gone (emptied
9 and 10 Oct 2026 on Rick's clicks).

---

## ⛔ THE ONE THING TO KNOW BEFORE YOU COMMIT

**This repo is PUBLIC.** GitHub Pages requires it. It has repeatedly held a
dozen or more untracked working files in `/redesign/` (drafts, tests, prompts).

**Never `git add -A` here.** Stage the paths you actually changed, then read
`git diff --cached --name-only` before committing. A careless stage publishes
whatever was lying around, permanently and to the open internet.

Related: **no email address is ever written into page source, and as of
2026-08-23 none is assembled at runtime either.** The instruction that used to
sit here said to build the address from parts in JavaScript the way
`/aininja/index.html` did. That is gone, and following it now would be a step
backwards: runtime assembly still hands the address to any crawler that runs
scripts, and it still dumps the visitor into their mail client.

Every way of reaching Rick on this site now goes through **the mailbox**,
the form in the closing band of `/aininja/` (`#opt-8c`). The destination lives
in a server secret and appears nowhere the browser can read. Fetch any live
page, grep the response for an at-sign address, and you get zero hits. Keep it
that way: a new page that needs a contact action links to
`/aininja/#opt-8c`, it does not invent a mailto.

---

## Who owns which part of this site

**RICK'S RULING, 19 Oct 2026 (it supersedes the lines below where they differ).**
"we call everything the digital dojo on the ricktew.com pages but in CHAT and the
folder it is something else and everyone is confusing the two of them as one."
So, two different things with one name:
- **"The Digital Dojo" on the pages** is the AI Ninja service's brand, words
  on ricktew.com.
- **The Digital Dojo chat and its folder `~/Dev/digitaldojo`** is the
  organizer: it keeps the foundational code as katas and hands it to the chats as
  needed, and it checks that things work. It does not run ricktew.com.

His words on who does what: "ricktew manages its own pages (no it does not build
the apps themselves) ... the checkout itself is on ricktew.com and so everything
for ricktew.com is handled by ricktew chat and assisted by digital dojo that
checks it is all working. Stripe accounts are handled by tewbedo but the actual
test and connection is on ricktew chat if it will be on ricktew.com. The same
with google set up and ads. So they are account level."
- **This chat owns everything on ricktew.com, the checkout included:** the Buy
  buttons, `ricktew-shop` (the Stripe page, the sale email, the field labels),
  its tests and test payments, and the site side of Google and ads. The move
  of `ricktew-shop` from `~/Dev/digitaldojo/shop/` into this repo's `supabase/`
  (beside ricktew-contact and ricktew-intake) is **ON HOLD (Rick, 19 Oct 2026,
  evening)**: this repo is public, so the code stays in the Digital Dojo's
  private folder, running, with no edits and no deploys, until "the full move"
  (his words: "let's wait, make a note and do the move when we do the full
  move ... as long as it is working"). The full move is his open question,
  ricktew.com as a full app (Pocket Dojo's lessons and videos with it) or
  simple pages plus the checkout; this chat researches it and brings ONE
  recommendation once the TEWBEDO and Digital Dojo Vercel vs Cloudflare
  comparison is in. Never copy the shop code here before that. That code also
  delivers the Tewtors workbooks, so tell the Tewtors chat first.
- **Apps** (MamaMia and the rest) are built in their own folders and chats;
  this chat sells and links them.
- **The TEWBEDO chat owns accounts:** the Stripe accounts and keys, Google and
  ad accounts. Their connection and test on ricktew.com are this chat's.

The site is the shop window. The workshop is a SEPARATE, PRIVATE repo at
`~/Dev/digitaldojo` (the Digital Dojo), which holds Rick's product inventory,
his AI workforce, his proof ledger and his rates. **It stays private and it
never merges into this repo.**

| Part | Owned by | Meaning |
|---|---|---|
| `/aininja/` | **The Digital Dojo** | Its content is a product surface: pricing, what Rick sells, the receipts. Those facts live in the Dojo and go stale there. |
| Everything else | **This repo** | Front page, `/hininja/`, nav, CSS, sitemap, the older pages, deploys. |

**What that means in practice, because there is only ONE copy of every file and
nothing is "sent" between repos:**

- All editing happens HERE, in this folder, including `/aininja/index.html`.
  There is no second copy anywhere and no sync step.
- **But before changing a CLAIM on the AI Ninja page** (a price, a solution
  offered, a receipt, a number), read the Dojo first rather than guessing. It
  is on the same machine:
  - `~/Dev/digitaldojo/packs/` — the twelve things Rick actually sells, and
    their real names. **Never name a solution that is not in there.**
  - `~/Dev/digitaldojo/private/proof-ledger.md` — what is genuinely proven,
    where it runs live, what tests exist.
  - `~/Dev/digitaldojo/INDEX.md` — one-line map of everything, read this first
    rather than crawling that repo.
- Layout, styling, copy polish and anything visual: just do it, no lookup
  needed.

If a change is about the BUSINESS rather than the page (a new offering, a price
change), that belongs in the Dojo first and the page follows.

### The AI Ninja page's rulings: `claude/aininja.md`

The prices, the two plans, every plan on Rick's stack, R2 Managed Hosting, the
less-is-more pass, the case studies and storyboards, the search pages and
accessibility, each with Rick's words and dates. **Read it before changing
anything on /aininja/ or its small pages, and add new rulings there.** The walls:

- **Two services only:** Your Dojo, $2,222 / month, and R2 Managed Hosting
  ($222 to build with month one included, then $99 a month). "Run it for me"
  and anything bigger is a custom price, talked about first: a sentence, never
  a card or a number. Never offer a third plan, a desk price or a one-desk build.
- Every plan lives on Rick's stack with the AI inside the price; the client's
  customers, content and data are theirs. No price in the hero.
- **No "me", "I" or "Rick" making a promise** on the AI door (29 Oct 2026):
  "we / us" or generic. The story, the cases and "Why I do this" stay his voice.
- Storyboards click through (1 2 3 4, Next) and never autoplay. A persona round
  never removes the pictures of what was built.
- After a FAQ, solution row or price edit: `python3 tests/agent-door-build.py`
  (the JSON-LD and llms.txt are snapshots; never hand-edit them). After
  `aininja/ask.js`: `node tests/ask-golden.js`, push, tell TEWBEDO "ask.js
  changed". Sweeps: `tests/aininja-sweep.js`, `tests/aidoor-sweep.js`.
- The BAM promotion is NOT live: nothing about BAM or "free" goes on a page
  until the Digital Dojo's package exists and Rick clicks.

---

## Contact: the mailbox and the Intake: `claude/mailbox-and-intake.md`

Read it before touching `supabase/functions/ricktew-contact/`,
`supabase/functions/ricktew-intake/`, the mailbox band (`#opt-8c`), either chat
box, the WebMCP tools, llms.txt or `/aininja/start/`.

- It is **"the mailbox"**, never "Letter Slot". **No email address anywhere on
  the site, not in source and not assembled at runtime, and no mailto, ever.**
  A contact action links `/aininja/#opt-8c` (the HI pages have their own forms
  posting to the same mailbox).
- Deploy: `supabase functions deploy ricktew-contact --project-ref
  qegfhbseccinnxnzfhxw --no-verify-jwt`, after
  `supabase/functions/ricktew-contact/run-escaping-test.sh`. The Intake deploys
  with its `deploy.sh`, after its `run-escaping-test.sh` and
  `node tests/intake-sweep.js`.
- The secrets live on the tews-inc project only; never write their values here.
- `gauntlet.ts` is the Digital Dojo kit's file copied verbatim: fix it in
  `~/Dev/digitaldojo/kits/mailbox/` and re-copy, never edit the copy.
- The Ninja Agent answers mailbox mail from TEWBEDO's committed copy of the
  chat library, so every `ask.js` edit is also a TEWBEDO "ask.js changed".
- Read the drop log weekly (Supabase keeps it 7 days).

## The Shop: `claude/shop.md`

The workbooks moved to tewtors.com on 6 Oct 2026; `/aininja/shop/` sells apps
Rick built as R2 builds, one project at a time on his yes. Buy buttons go
through `/aininja/shop/buy/?sku=` to the one checkout (its code stays in the
Digital Dojo's folder, on hold until "the full move"). `/aininja/shop/download/`
and `/aininja/shop/thanks/` stay. No PDF ever goes in this repo. No promises in
shop copy.

## PromptPay and baht: `claude/promptpay.md`

Every baht price lives only in `ITEMS` in `assets/promptpay.js`. Lines meant for
Thailand carry `data-th hidden` and open only when `ricktew-geo` says so;
/hininja/ and /gns/ are `<body data-usd-only>`. Baht checkout needs
`SHOP_TH_LIVE=on`. Test: `tests/promptpay-sweep.js`.

## /gns/: `claude/gns.md`

Gooffy Ninja ShhT!! moved to nerdhostel.com/gns (23 Oct 2026) and
ricktew.com/gns/ forwards there. Keep `/hininja/buy/`, the PromptPay card, the
tapes in `aininja/assets/story/ninja/`, the fonts, `th.js` and `promptpay.js`:
NerdHostel loads them. Never edit anything in `~/Dev/NinjaGym`.

---

## Site Purpose

- About Rick Tew (who he is, what he does)
- Showcase of every product, game, app, and business
- Static for security — no backend, no CMS, no server logic
- Looks current, uses modern HTML/CSS tech

---

## Who runs the site: Rick Tew Co., Ltd.: `claude/company.md`

Since 21 Oct 2026 ricktew.com is run by Rick Tew Co., Ltd. and every payment on
it goes to Rick Tew Co. (the two buy relays add `cur=thb`; that needs
`SHOP_TH_LIVE=on`). The Tew's Inc dollar checkout is paused on these pages, not
switched off. Never write that Rick Tew Co. sells something Tew's Inc's Stripe
charges. The /aininja/ plan cards stay in dollars (invoiced). Read the file
before touching the Terms, Privacy, footers or a relay.

---

## Hosting

**LIVE on GitHub Pages.** The migration below is DONE, kept only as a record.

- Repo: `RickTew/ricktew.github.io`, **public**, branch `main`, root.
- `CNAME` contains `ricktew.com`. DNS on **Squarespace**.
- **ricktew.com is verified with GitHub (16 Oct 2026, Rick's click after the
  Dojo's Poli pass):** the TXT record `_github-pages-challenge-RickTew` stays
  in Squarespace for good (deleting it un-verifies the domain), and
  github.com/settings/pages shows it Verified, so no other GitHub user can
  serve a page on any name under ricktew.com. The same day the three dead
  names were deleted: `mail` and `ftp` (CNAMEs to ricktew.com that Pages
  answered with a 404) and `cpanel` (an A record to an old SiteGround
  server). Mail delivery never used them; it runs on the MX records.
- Pages cannot send security headers (HSTS, CSP, frame and referrer
  policies); that is a limit of the host, not an oversight.
- **Nothing is live until it is PUSHED.** Pages serves the remote, not your
  working copy, and Rick's standing rule is to push every solid change without
  being asked, because he reviews from the remote while away from the desk.
  Pages takes roughly a minute; verify with a real request, not by assuming.
- `robots.txt` says `Allow: /` with a sitemap, so the whole site including both
  doors is open to search.

*(Historical migration steps: git init, create the repo, push, enable Pages on
main at root, add CNAME, then Squarespace A records to 185.199.108.153,
185.199.109.153, 185.199.110.153, 185.199.111.153 and a `www` CNAME to
ricktew.github.io.)*

---

## Tech Stack

Plain HTML5 / CSS / Vanilla JS. No build system, no framework, no npm, no
preprocessor, no bundler. Open a file in a browser and it works.

**What is actually here, verified 2026-08-21.** The list that used to sit in
this section described a site that was never built: there is no `tokens.css`,
no `main.css`, no `main.js`, no container queries, no dark/light toggle and no
web components. Anyone who codes against that list will write against nothing.

- `css/site.css` + `js/site.js` style the old Google Sites pages and
  `/hininja/`. Light only. Oswald + Open Sans.
- The front page and `/aininja/` each carry their own `<style>` block inline,
  no shared stylesheet. Archivo + Nunito, from Google Fonts.
- Shared palette across the front page and `/aininja/`, matched variable for
  variable so the doors do not feel like leaving the site:
  `--bg:#ffffff  --ink:#101418  --muted:#69707a  --blue:#1e73bd
  --red:#d61f26  --line:#e8e6e2  --panel:#f7f6f4`. The old pages use the same
  `#1e73bd` blue. Red carries HI, blue carries AI.
- Every page is light on white. A dark front page was tried on 21 Aug and
  rejected: it made both doors look like they led off-site, and it killed the
  logo, whose black outlines need white to read against.
- Deployed as static files, zero dependencies. The single exception is the
  contact endpoint, which is server code and lives in `supabase/`. It is not
  part of the site build and is not served. See Contact above.

---

## Folder Structure

As it actually stands on 2026-08-21, not as once planned:

```
RickTew/
├── index.html      # The front page: which ninja do you want?
├── CNAME           # ricktew.com
├── robots.txt      # Allow: / , plus sitemap
├── sitemap.xml
├── hininja/        # DOOR 1: the in-person work
├── gns/            # Gooffy Ninja ShhT!!, moved from ninjagym.com 2026-09-28
├── record/         # Rick's record page (15 Oct 2026), WORK IN PROGRESS: not
│                   # shared anywhere until he says it is ready ("it is putting
│                   # HUGE focus on just the gym app"). noindex, NOT in the
│                   # sitemap, no menu links, no prices, no email; contact is
│                   # the mailbox, never "message me on LinkedIn".
├── aininja/        # DOOR 2: the digital work. DOJO-OWNED, see above.
│   ├── index.html  #   the landing page itself
│   ├── legal/      #   terms + privacy
│   ├── start/      #   The Intake: the client questionnaire, noindex
│   └── assets/     #   ~195 files, its own images and audio
├── about/  camps/  contact/  home/  ninjagym/  tours/  winjitsu/  rtms/
│                   # the older Google Sites pages, still live at their URLs
│                   # (/redesign/ is GONE: the August redesign and five
│                   # "Who is Rick Tew" designs deleted 9 Oct; The Map IS
│                   # /about/; its universe graph is /about/#universe since
│                   # 10 Oct and the parked copy was deleted that day.)
├── supabase/       # the contact endpoint's source. NOT a page. Excluded
│                   # from the Pages build by _config.yml.
├── _config.yml     # exists only to keep supabase/ off the live site
├── css/  js/  assets/
```

---

## Content Inventory

**The rest of this inventory was last reviewed 2026-08-08 and several rows had
drifted by 21 Aug (three were live while still marked "Soon" or "In dev").
Verify a status with a real request before repeating it on the site.**

### Status Legend
- **Live** — publicly available now
- **Very Soon** — launch imminent, show with real info
- **Soon** — in development, show as teaser
- **Stalled** — hide or omit

### Businesses / Operations
| Name | URL | Status | Notes |
|------|-----|--------|-------|
| NinjaGym | ninjagym.com | Live | Martial arts gym in Thailand; PWA runs front desk |

### Apps
| Name | URL / Platform | Status | Notes |
|------|----------------|--------|-------|
| Tew's Total Recall | Vercel + App Stores | Very Soon | Memory/recall curriculum app |
| The Adroit Swordsman | adroit-swordsman.vercel.app | Very Soon | Vocabulary app, 4 age groups, comedic voice |
| Home Study Program (HSP) | Pocket Dojo, pocketdojo.ricktew.com; its door is ricktew.com/hsp/ | Free start live; the $2,222 one-off is on the page, never yet bought, test or real (19 Oct 2026) | "Rick Tew's Martial Science: The Ultimate Visual Guide." 200-page illustrated book (5 belt levels, 18 lessons each) + companion web app. Repo: `/Users/ricktew/Dev/HSP/`. Not sold on this site: the books are not sold separately (Rick's ruling 2026-09-09). |

### Games
| Name | Platform | Status | Notes |
|------|----------|--------|-------|
| Dungeon Hole | Web (Phaser 4 + Next.js) | **Live** at dungeonhole.com, also dungeon-hole.vercel.app (verified 2026-09-13) | 1v1 asymmetric dungeon strategy. Renamed from Dungeon King 2026-07-12; the old dungeon-king.vercel.app 308s to the new address. Repo: `~/Dev/DungeonHole/` (flat, no `Phaser/` subfolder since June 2026). **Two words, Rick's ruling 13 Sep 2026.** `/aininja/` still writes DungeonHole, one word (story paragraph and the `alt`s); fix that with the next edit to that page, not as its own push. |
| Dungeon King (Godot) | PC/Mac | **Does not exist** | Was listed here as in dev. No Godot folder or `project.godot` was ever tracked in the DungeonHole repo (checked 2026-09-13); Dungeon King is only the big game's old name. Never list it as a product. |
| TEWGO | iOS | **Live on the App Store** (verified 2026-08-21) | Pente-variant, SwiftUI + SpriteKit. apps.apple.com/us/app/tewgo/id6763025917 |
| Ninja Ninja Defense | Web (Phaser 4), PC via Electron for Steam later | Private build | Narrative tower defense. Repo `~/Dev/NinjaDefense/`. Rick confirmed the name "Ninja Ninja Defense" 10 Oct 2026; /aininja/ and /about/ use it. |
| NinjaCampBuilder | PC (Unity 2D, Steam) | Stalled | Omit for now |

### Brands / Businesses
| Name | Status | Notes |
|------|--------|-------|
| WinJitsu | **Live** at winjitsu.com (verified 2026-08-21) | No longer a teaser |

### Open Source / Tools
| Name | Notes |
|------|-------|
| gemma-unity-plugin | C# Unity bindings for Google's Gemma.cpp — GitHub link |

---

## Social Links

Format: `ricktew` on every platform (or however each platform renders it).

| Platform | URL |
|----------|-----|
| X | x.com/ricktew |
| Facebook | facebook.com/ricktew |
| Instagram | instagram.com/ricktew |
| LinkedIn | linkedin.com/in/ricktew |
| YouTube | youtube.com/@ricktew |

---

## About Rick Tew (from live site — use as source material)

- Internationally recognized peak performance strategist and martial arts instructor
- Self-described "Martial Arts Therapist" — combines mind and martial arts
- Created **WinJitsu**: a mental martial art and success system
- Authored "Be a Black Belt in What You Do" — 5-book series on practical success principles
- Runs NinjaGym in Samui, Thailand
- Offers: live-in martial arts camps, training tours, ninja mindset coaching, corporate speaking
- Core belief: happiness comes from focused, challenging activity with clear objectives — applied to martial arts and life

**Bio voice:** First person throughout the site.

**Bio structure:** Rick's own "5's" coaching framework — Who, What, When, Where, Why — then How as the action/CTA. The bio should model the system he teaches.

**The "5" thread — use it:** 5 W's, 5 belt levels (HSP), 5 WinJitsu books, 5-book "Be a Black Belt" series. This is a real brand motif, not a coincidence. Consider making it a subtle visual or structural element on the site.

---

## Design Direction

- **Dark/light toggle** — user-controlled button in nav; default follows `prefers-color-scheme`
- Strong personal identity — feels like Rick Tew, not a generic portfolio template
- Works for both game projects and serious business products (martial arts AND tech/games)
- Personality over minimalism — not just a plain list

---

## Writing Rules

- **No long dashes of any kind.** No em dash (—), no en dash (–), no double hyphen (--). Use a period, comma, colon, or restructure the sentence instead.
- No corporate-speak or buzzwords.
- Rick's voice: direct, a little irreverent, confident.

---

## What's NOT Here

- No CMS, no build system, no framework
- **One small backend, and only one:** the contact endpoint (see Contact
  below). The pages themselves are still static files with no server logic,
  and nothing else here talks to a server.
- No analytics without an explicit decision
- No cookies / tracking
- **No mailto: links, anywhere, ever.** This entry has been wrong twice. It
  first said "no contact form, use mailto: or social links", which was
  actively harmful. It was then corrected to "the pattern is on the Dojo
  shelf if a page ever needs one". As of 2026-08-23 the site HAS one, so:
  **The mailbox is live** in the closing band of `/aininja/` (`#opt-8c`),
  the third install of `~/Dev/digitaldojo/packs/mailbox.md` after
  ninjagym.com and playtewgo.com. Anything on this site that needs a contact
  action links to it. See the Contact section below.
