# ricktew.com — Audit & Plan

*Date: 2026-05-04*

---

## Current State

| | |
|--|--|
| **Live site** | Google Sites (ricktew.com) |
| **DNS** | Squarespace |
| **New repo** | `/Users/ricktew/Dev/RickTew/` — scaffolded, empty |
| **Goal** | Full personal brand site: about + every product, game, business |
| **Constraint** | Static only (security). No server, no CMS. |

---

## Hosting Decision

**Move to GitHub Pages.** Google Sites blocks all raw HTML/CSS control — can't use modern tech, can't own the markup.

### Migration Checklist

- [ ] `git init` in `/Users/ricktew/Dev/RickTew/`
- [ ] Create GitHub repo (e.g. `ricktew/ricktew.com`)
- [ ] Push `main` branch
- [ ] Enable GitHub Pages in repo Settings → Pages → Source: `main`, `/ (root)`
- [ ] Add `CNAME` file to repo root with content: `ricktew.com`
- [ ] In **Squarespace DNS**, add:
  - A record: `@` → `185.199.108.153`
  - A record: `@` → `185.199.109.153`
  - A record: `@` → `185.199.110.153`
  - A record: `@` → `185.199.111.153`
  - CNAME: `www` → `ricktew.github.io`
- [ ] Enforce HTTPS in GitHub Pages settings (available once DNS propagates)
- [ ] Confirm old Google Sites no longer serves the domain

---

## Launch Tiers

### Tier 1 — Very Soon (launch-ready, include with real info)
- The Adroit Swordsman — live at adroit-swordsman.vercel.app
- Tew's Total Recall — live on Vercel
- Pixel Dungeon — Phaser 4 web game, live at dungeon-king.vercel.app. Repo: `DungeonKing/Phaser/` (Next.js + Phaser 4 + TypeScript)

### Tier 2 — Soon (in dev, show as teaser)
- Winjitsu
- Home Study Program — **FLAG: no repo found yet. What is this? Martial arts curriculum? Connected to Tew's Total Recall or separate?**
- Ninja Ninja Defense

### Tier 3 — Omit for now
- NinjaCampBuilder (stalled)
- TEWGO (iOS, still early)
- gemma-unity-plugin (niche, open source — maybe a footnote only)

---

## Content Needed

### Must Have Before Launch
- [ ] **Bio / About text** — First person. Structured on Rick's own "5's" framework: Who, What, When, Where, Why — then How as the call to action. Should model the system he teaches.
- [ ] **Headshot / portrait photo** — for hero section
- [ ] **Tagline** — one line that captures who Rick Tew is. Tie to "5" motif or Winjitsu if it fits naturally.

### Per Project (Tier 1 — Very Soon)
- [ ] **Adroit Swordsman** — screenshot, tagline, link
- [ ] **Tew's Total Recall** — screenshot, tagline, link
- [ ] **Pixel Dungeon** — live at dungeon-king.vercel.app. Need screenshot + short description for site card.

### Per Project (Tier 2 — Teaser cards)
- [ ] **Winjitsu** — logo or name treatment, one-line teaser, "coming soon"
- [ ] **Home Study Program (HSP)** — 200-page visual book + companion app. In design phase (Claude Chat Projects). Teaser copy + name treatment needed.
- [ ] **Ninja Ninja Defense** — screenshot or mockup, teaser copy

### NinjaGym (Business)
- [ ] Logo or screenshot
- [ ] One-paragraph description (real business, Thailand, martial arts)
- [ ] Link to ninjagym.com

---

## Site Architecture

Single-page site for launch. Sections scroll vertically:

```
[ NAV: Rick Tew logo/name | Work | About | dark/light toggle | social icons ]

[ HERO: Name, tagline, photo ]

[ ABOUT: 2-3 paragraphs ]

[ WORK: filtered card grid ]
  Filters: All | Apps | Games | Business
  Cards: image/screenshot, name, one-liner, status badge, link

[ FOOTER: social links, copyright ]
```

No subpages needed at launch. Add `/work/[project]` detail pages later when there's enough content per project.

---

## Tech Approach

Modern CSS — no build step, no npm, open `index.html` in a browser to develop.

| Feature | Use |
|---------|-----|
| CSS Custom Properties | Design tokens — colors, spacing, type scale in `tokens.css` |
| `color-scheme` + custom props | Dark/light theming — JS toggle writes `data-theme` on `<html>` |
| `localStorage` | Persist theme choice across visits |
| CSS Grid + `subgrid` | Project card grid layout |
| Container Queries | Cards respond to container width, not just viewport |
| `@layer` | Organized cascade: reset, tokens, base, components, utilities |
| `clamp()` | Fluid typography — no breakpoints for font sizes |
| `<dialog>` | Any lightbox or modal needs |
| View Transitions API | Page/section transitions (progressive enhancement) |
| Web Components | `<project-card>` custom element if card logic gets complex |

---

## Social Links

| Platform | Handle / URL |
|----------|-------------|
| X | x.com/ricktew |
| Facebook | facebook.com/ricktew |
| Instagram | instagram.com/ricktew |
| LinkedIn | linkedin.com/in/ricktew |
| YouTube | youtube.com/@ricktew |

---

## Priorities

### Phase 1 — Foundation
- [ ] `index.html` — semantic structure, all sections stubbed
- [ ] `css/tokens.css` — color palette, type scale, spacing
- [ ] `css/main.css` — reset, layout, components
- [ ] `js/main.js` — dark/light toggle with localStorage
- [ ] `CNAME` file
- [ ] Placeholder content throughout

### Phase 2 — Go Live
- [ ] GitHub repo created, Pages enabled
- [ ] Squarespace DNS updated
- [ ] HTTPS enforced

### Phase 3 — Real Content
- [ ] Bio text finalized
- [ ] Real photos/screenshots for all Tier 1 projects
- [ ] Teaser cards for Tier 2 projects

### Phase 4 — Polish
- [ ] Typography and color finalized
- [ ] Mobile tested
- [ ] Accessibility pass (semantic HTML, alt text, focus styles)
- [ ] Performance: images optimized, no render-blocking assets

### Phase 5 — Ongoing
- [ ] Update cards as projects ship
- [ ] App Store / Play Store links when available
- [ ] Individual project pages when content justifies it

---

## Open Questions

1. **Pixel Dungeon vs Dungeon King** — Resolved. Pixel Dungeon = Phaser 4 web game (live). Dungeon King = Godot version (in dev). Both in `DungeonKing/` repo.
2. **Home Study Program (HSP)** — Confirmed: 200-page visual book + companion app, in design phase in Claude Chat Projects. No local repo yet. Still TBD: is it under the Winjitsu brand, or standalone?
3. **Bio voice** — First person ("I build...") or third person ("Rick Tew builds...")?
4. **Design direction** — Any reference sites you like the feel of? Colors or vibe in mind?
5. **NinjaGym on site** — List it as a business under your name, or just reference it?
