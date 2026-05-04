# RickTew — ricktew.com

Personal brand and portfolio site for Rick Tew. Everything he makes lives here: apps, games, businesses, and tools.

---

## Site Purpose

- About Rick Tew (who he is, what he does)
- Showcase of every product, game, app, and business
- Static for security — no backend, no CMS, no server logic
- Looks current, uses modern HTML/CSS tech

---

## Hosting

**Current:** Google Sites
**Target:** GitHub Pages

DNS is managed on **Squarespace**. Migration steps:
1. `git init` in this folder
2. Create repo `ricktew/ricktew.com` on GitHub (or similar name)
3. Push, enable GitHub Pages → source: `main` branch, `/ (root)`
4. Add `CNAME` file to repo root containing `ricktew.com`
5. In Squarespace DNS:
   - Add A records for apex domain pointing to GitHub Pages IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Add CNAME record: `www` → `ricktew.github.io`

---

## Tech Stack

- Plain HTML5 / CSS / Vanilla JS — no build system, no framework, no npm
- CSS Custom Properties for theming (`tokens.css`)
- CSS Grid + Container Queries for layout
- Dark/light mode: user toggle (button in nav) + respects `prefers-color-scheme` default
- Web Components for repeated UI patterns (project cards)
- No preprocessors, no bundlers — `open index.html` in browser to develop
- Deployed as static files, zero dependencies

---

## Folder Structure

```
RickTew/
├── index.html              # Home — hero + about + work grid
├── CNAME                   # GitHub Pages custom domain
├── css/
│   ├── tokens.css          # Design tokens (colors, type, spacing)
│   └── main.css            # Global styles
├── js/
│   └── main.js             # Theme toggle + progressive enhancement
├── assets/
│   ├── images/             # Photos, screenshots, logos
│   └── icons/              # SVG icons
└── work/
    └── index.html          # (Optional) expanded project detail page
```

---

## Content Inventory

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
| Pixel Dungeon | Web (Phaser 4) | Very Soon | Live at dungeon-king.vercel.app. Repo: `DungeonKing/Phaser/` |
| Dungeon King | PC/Mac (Godot) | In dev | Godot version of same IP. Repo: `DungeonKing/Godot/` |
| TEWGO | iOS | In dev | Pente-variant, SwiftUI + SpriteKit |
| Ninja Ninja Defense | PC (Unity) | Soon | Tower defense with on-device AI |
| NinjaCampBuilder | PC (Unity 2D, Steam) | Stalled | Omit for now |

### Brands / Businesses
| Name | Status | Notes |
|------|--------|-------|
| Winjitsu | Soon | Show as teaser |

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

- No CMS
- No contact form (use mailto: or social links)
- No analytics without explicit decision
- No cookies / tracking
