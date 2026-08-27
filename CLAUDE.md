# RickTew — ricktew.com

Personal brand and portfolio site for Rick Tew. Everything he makes lives here: apps, games, businesses, and tools.

**CURRENT STATE (2026-08-21): the site is TWO DOORS.** The front page asks one
question, "Which ninja do you want?", and sends the visitor to one of two
places:

- **`/hininja/` HI Ninja** — Human Interaction. In-person martial arts,
  life-coaching, the mental martial arts. This is Rick's thirty years of
  teaching.
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

The old Google Sites pages are all still live at their original URLs, styled by
`css/site.css` + `js/site.js`. The one that moved is the old front page: it is
now `/hininja/` word for word, and their nav "Home" and logo point there. Their
footers carry a link back to the two doors. `/redesign/` holds parked
exploration and is not live.

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

Every way of reaching Rick on this site now goes through **The Letter Slot**,
the form in the closing band of `/aininja/` (`#opt-8c`). The destination lives
in a server secret and appears nowhere the browser can read. Fetch any live
page, grep the response for an at-sign address, and you get zero hits. Keep it
that way: a new page that needs a contact action links to
`/aininja/#opt-8c`, it does not invent a mailto.

---

## Who owns which part of this site

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

### THE TWO PRICES ARE BACK ON THE AI NINJA PAGE (2026-08-26), BY RICK'S RULING

**History, so nobody re-litigates it.** On 2026-08-24 Rick took every price
off the page. On 2026-08-26 he asked for research on whether prices on a
done-for-you service page bring better leads, read the sourced brief
(buyers want visible prices; River Pools: fewer appointments, more sales;
the decoy effect fails replication; a paid first call is a cliff), and said
"go". What went back, and what did not:

- **Back:** the two monthly offers as `.price-card`s in `#offers`, listed
  high to low because that is what the evidence supports: **Sensei runs it,
  $4,444 / month** (highlighted) then **Your Dojo, $2,222 / month**. The
  FAQ cost answer and the quiz result line quote the tier price again.
- **Not back:** the builder-hours block and its $222 / $2,222 figures, the
  "seats left" counters (the Dojo says they are hand-maintained urgency
  text; Rick has not given current numbers), and any consultation or paid
  call price. Rick floated a $2,222 consultation or a $200 call as an
  anchor; the research said no, and he went with the recommendation.
  **A first contact on this site is free** (the quiz, the Letter Slot).

The prices are the Dojo's facts: final and live in Stripe (Tew's Inc, USD).
Change them there first, then here. The rule that CLAIMS on this page come
from the Dojo still stands.

The other dollar signs on the page are not Rick's price: `$5` is the POS
vendor's per-staff fee inside his own story, and `$20 / $30 / $60` are the
quiz asking the reader what their own hour is worth. Leave them.

### The live row shows two signed-in apps, so its copy is narrower than it was

Also 24 Aug: the TEWBEDO and WinJitsu tiles are now Rick's own captures from
*inside* those apps, not the passkey wall and the pale landing page. The
section used to promise every capture was "exactly as it loads for anyone who
taps it", which those two are not any more. It now says most are what a
stranger sees, and the two behind a login are what Rick sees once he is
inside. **If you swap a tile, check that sentence still tells the truth.**

---

## Contact: The Letter Slot

Live since 2026-08-23, inline in the closing band of `/aininja/` (`#opt-8c`).
The form is deliberately ON the page rather than on a contact page: the band
is selling contact forms, so the demo and the product are the same object.

**Two halves, and only one of them is in this repo.**

- **The page half** is the form and its script inside `aininja/index.html`.
  It posts JSON and swaps to a confirmation in place. It holds NO address.
- **The server half** is `supabase/functions/ricktew-contact/index.ts`,
  deployed to the **tews-inc** Supabase project (`qegfhbseccinnxnzfhxw`), the
  shared hub that exists so small things do not each cost $10/month. Deploy
  with:

  ```
  supabase functions deploy ricktew-contact --project-ref qegfhbseccinnxnzfhxw --no-verify-jwt
  ```

  Three secrets live on the project and NOWHERE in this repo:
  `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`. Naming their values in a
  comment here would defeat the whole pattern, in a public repo, in a file
  anyone can fetch.

**Where the mail goes.** To the Ninja Agent's mailbox, which TEWBEDO files as
a ticket for `support-agent`. It drafts the reply, Rick presses send. Nothing
auto-sends. The page says exactly that, so **do not "improve" the copy into
claiming the agent answers instantly.** It does not, and the earlier version
of that band did claim it.

**"I want this Tew" (2026-08-27).** Every thing on the page a visitor can
ask for (the eleven solution rows, the six Master seats, the three Dojo
cards, the two price cards) carries one pill button, `a.want`, with
`data-want` (the thing's name), `data-want-note` (its one-line promise) and
`data-want-kind` (one of the form's existing subject values: `build`,
`dojo`, `other`). Clicking it calls `window.rtWant()` in the slot script,
which sets the subject, writes "I want this Tew: X" plus three blanks into
the message box, and scrolls to the slot. The server is untouched: the want
rides inside the message, and an unknown subject is coerced to Other there
anyway. If you add a new sellable thing to the page, give it this button,
not a new mailto and not a new form. The generic form of it, "I want this Tew,
Rick!" (nav, hero, the 3-second section), is the same button with
`data-want="my hours back"` and pairs with the quiz as the 1-2 punch Rick
asked for on 2026-08-27; there is no "Read the story" button any more. The
older `[data-mail]` links still work through `rtSlot()` for the non-product
CTAs. The hero photo is `rick-cutout-2x.webp`, an AI-made likeness Rick
supplied, lifted off its backdrop with the macOS Vision framework; the
old `rick-cutout.png` was 433px wide and blurred on Retina.

**Before you touch the endpoint, run its test:**

```
~/Dev/RickTew/supabase/functions/ricktew-contact/run-escaping-test.sh
```

It transpiles the real endpoint, stubs only the mailer, drives a hostile
submission through it and reads every tag in the produced mail. Twelve
assertions. No secrets, no inbox, runs anywhere. The kata is explicit that
this is the one check a person reading the code reliably passes and the code
reliably fails, and two earlier installs shipped that exact bug.

**Read the drop log monthly for the first quarter.** Supabase logs, filter
`event_message like '%ricktew-contact drop%'`. A rejected submission is
deliberately indistinguishable from an accepted one, and a mail pipe that is
down never reaches the visitor, so this log is the ONLY place a lost message
or a broken sending key shows up. That is not paranoia: a wrong key produced
a flawless confirmation and sent nothing during the build, and one logged line
caught it in seconds.

`supabase/` is excluded from the Pages build by `_config.yml`, so the endpoint
source is not served at ricktew.com. It was, briefly, until 2026-08-23.

**Kata:** `~/Dev/digitaldojo/packs/letter-slot.md`. Receipts and the two
findings this install sent back: `~/Dev/digitaldojo/private/proof-ledger.md`.

---

## Site Purpose

- About Rick Tew (who he is, what he does)
- Showcase of every product, game, app, and business
- Static for security — no backend, no CMS, no server logic
- Looks current, uses modern HTML/CSS tech

---

## Hosting

**LIVE on GitHub Pages.** The migration below is DONE, kept only as a record.

- Repo: `RickTew/ricktew.github.io`, **public**, branch `main`, root.
- `CNAME` contains `ricktew.com`. DNS on **Squarespace**.
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
├── aininja/        # DOOR 2: the digital work. DOJO-OWNED, see above.
│   ├── index.html  #   the landing page itself
│   ├── legal/      #   terms + privacy
│   └── assets/     #   ~195 files, its own images and audio
├── about/  camps/  contact/  home/  ninjagym/  tours/  winjitsu/  rtms/
│                   # the older Google Sites pages, still live at their URLs
├── redesign/       # parked exploration. OFTEN HAS UNTRACKED FILES. Do not
│                   # sweep these into a commit; the repo is public. Its
│                   # addresses were stripped 2026-08-23; it IS served live.
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
| Home Study Program (HSP) | TBD (Cloud Run) | Soon | "Rick Tew's Martial Science: The Ultimate Visual Guide." 200-page illustrated book (5 belt levels, 18 lessons each) + companion web app. Repo: `/Users/ricktew/Dev/HSP/`. Built with Google AI Studio + Canva + Antigravity Build mode. |

### Games
| Name | Platform | Status | Notes |
|------|----------|--------|-------|
| Pixel Dungeon | Web (Phaser 4) | **Live** at dungeon-king.vercel.app (verified 2026-08-21) | Repo: `DungeonKing/Phaser/` |
| Dungeon King | PC/Mac (Godot) | In dev | Godot version of same IP. Repo: `DungeonKing/Godot/` |
| TEWGO | iOS | **Live on the App Store** (verified 2026-08-21) | Pente-variant, SwiftUI + SpriteKit. apps.apple.com/us/app/tewgo/id6763025917 |
| Ninja Ninja Defense | PC (Unity) | Soon | Tower defense with on-device AI |
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
  **The Letter Slot is live** in the closing band of `/aininja/` (`#opt-8c`),
  the third install of `~/Dev/digitaldojo/packs/letter-slot.md` after
  ninjagym.com and playtewgo.com. Anything on this site that needs a contact
  action links to it. See the Contact section below.
