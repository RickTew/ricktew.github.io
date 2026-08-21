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

Related: **no email address is ever written into page source.** Assemble it at
runtime from parts, the way `/aininja/index.html` does. Crawlers harvest every
address they can read.

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
- Deployed as static files, zero dependencies.

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
│                   # sweep these into a commit; the repo is public.
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
| Winjitsu | **Live** at winjitsu.com (verified 2026-08-21) | No longer a teaser |

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
- Created **Winjitsu**: a mental martial art and success system
- Authored "Be a Black Belt in What You Do" — 5-book series on practical success principles
- Runs NinjaGym in Samui, Thailand
- Offers: live-in martial arts camps, training tours, ninja mindset coaching, corporate speaking
- Core belief: happiness comes from focused, challenging activity with clear objectives — applied to martial arts and life

**Bio voice:** First person throughout the site.

**Bio structure:** Rick's own "5's" coaching framework — Who, What, When, Where, Why — then How as the action/CTA. The bio should model the system he teaches.

**The "5" thread — use it:** 5 W's, 5 belt levels (HSP), 5 Winjitsu books, 5-book "Be a Black Belt" series. This is a real brand motif, not a coincidence. Consider making it a subtle visual or structural element on the site.

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

- No CMS, no backend, no build system
- No analytics without an explicit decision
- No cookies / tracking
- **A note that used to read "no contact form, use mailto: or social links".
  That is now wrong and was actively harmful:** a click-to-mail link publishes
  Rick's address to every crawler that reads the page. If a page here ever
  needs a contact form, the pattern is on the Dojo shelf
  (`~/Dev/digitaldojo/packs/letter-slot.md`) and it is running live on two
  other sites. Its first rule is that the address appears nowhere the browser
  can read.
