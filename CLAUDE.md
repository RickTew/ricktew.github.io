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

### The live row: no claim sentence any more (2026-08-28)

The apps section used to promise every capture was "exactly as it loads for
anyone who taps it", then narrowed that to "most are what a stranger sees,
two are what Rick sees inside". On 28 Aug Rick cut the whole sentence as
unneeded; the intro is now one line ("Some I built for a business, some as a
hobby..."). Nothing on the page describes the captures any more, so a tile
swap needs no copy check. The row label above the phones is the only text left.

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

**Where the mail goes, and the one auto-reply on the site (since
2026-08-28, Rick's ruling).** To the Ninja Agent's mailbox
`aininja@ricktew.com`, which TEWBEDO files as a ticket. Since 28 Aug the
Ninja Agent ANSWERS BY ITSELF, within about five seconds, every message that
arrives at that address: it fetches the chat box's library live from
`https://ricktew.com/aininja/ask.js` (ten-minute cache, so mail and chat
box can never disagree), answers only on a strong match, sends the honest
miss otherwise ("I do not have that one written down. Rick reads every
message and follows up himself."), signs as the AI, adds the Tew Tip as a
P.S., and never replies to machine mail, bounces or auto-responders. One
switch in the TEWBEDO inbox header turns it off without a deploy. This is
the deliberate exception to "a human presses every send", stated on the
page in the FAQ and the mailbox blurb; the threads stay open for Rick's
follow-up. **Because the library is the mail's only knowledge, every
edit to `ask.js` is also an edit to what strangers get by email:** run the
golden test. The page prints `aininja@ricktew.com` on purpose (the closing
band, the chat box): it is the agent's address, not Rick's, and the no-address
rule above still covers Rick's own.

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

**The slot is also a tool an AI agent can call (2026-08-27, WebMCP).** The
`<form id="slotForm">` carries `toolname="post_letter_to_rick"`,
`tooldescription`, `toolautosubmit` and a `toolparamdescription` on each
field: that is the WebMCP declarative API, and a second read-only tool,
`list_rick_tew_solutions`, is registered by script via
`document.modelContext` (falls back to `navigator.modelContext`; a no-op
where neither exists). Verified in headless Chrome 151 with
`--enable-features=WebMCPTesting`: both tools list, the read tool answers,
and driving the form tool posts the same JSON the button does, with
`elapsedMs:-1` and `source:"agent"` so the endpoint's fill-time check does
not drop it (`-1` means "do not know", which never drops). **The honeypot
`#slotWebsite` sits OUTSIDE the `<form>` on purpose:** a tool must not offer
an agent a field that is a tripwire. Do not move it back in. In production
the API only exists once the origin has a Chrome origin-trial token in a
`<meta http-equiv="origin-trial">` tag (trial runs Chrome 149 to 156;
Rick registers it, the token is per origin, ricktew.com and www are
separate). Without the token the page behaves exactly as before. The band
that says so is `#agent`, just above the slot; its copy is written to stay
true with or without the token, so do not "upgrade" it to claim assistants
are already using it. As of July 2026 none of the big assistants call these
tools yet; Gemini in Chrome is the announced first. Local check:
`chrome://flags/#enable-webmcp-testing`, then the Model Context Tool
Inspector extension, or Lighthouse's "Registered WebMCP tools" audit.

**The agent door for assistants that FETCH rather than browse (2026-08-29).**
`/llms.txt` at the repo root and a `<script type="application/ld+json">`
graph in the head of `/aininja/` (Person, the Dojo as a ProfessionalService
with the two Offers in USD per month, the eleven solution rows, and a
FAQPage). **The FAQPage and the solution list in that block are a SNAPSHOT
of the page's FAQ `<details>` and `.sol-row` summaries.** If you change a
FAQ question or answer, or a row, or a price, run
`python3 tests/agent-door-build.py`: it rewrites both from the page text
(a mismatch is a bug, and Google treats a FAQPage that does not match the
visible text as spam). Never hand-edit the block. `llms.txt` quotes the
rows and both prices the same way. The Dojo's
checker reads the live page: `node ~/Dev/digitaldojo/scripts/agent-door-check.mjs https://ricktew.com/aininja/`
(8 of 8 doors on 29 Aug; presence only). The Agent-ready band `#agent`
also lists what an assistant gets here today; every line there quotes
something already true, keep it that way.

**Claudeforce band `#claudeforce` (2026-08-29, Rick's ask).** Right after
the price cards: Salesforce's Claudeforce (announced 26 Aug 2026) compared
with The Front Desk, with Salesforce's list prices as read from
salesforce.com/sales/pricing that day and the date printed in the band.
Their prices move: re-read the page before repeating a number, and update
the date. The five-seat arithmetic is Agentforce 1 Sales $550 x 5 x 12 =
$33,000 against Your Dojo $2,222 x 12 = $26,664. The honest line (buy
Starter at $25 a seat if three of you need a contact list) stays: the
Dojo does not beat that and the band says so. The chat box has NO
Claudeforce entry, by the never-name-an-AI-company ruling; a visitor who
asks gets the honest miss. Sources are in the Dojo:
`docs/Digital Dojo, Note 2026-08-29, Claudeforce and The Front Desk.md`.

**Ask the ninja (2026-08-28): the chat box, and it is NOT an AI.** The
floating "Ask the ninja" pill on `/aininja/` opens a chat panel; the engine,
the answer library and the behaviour are all in `aininja/ask.js`, the
markup and CSS are inline in the page (search `ask-panel`), and the FAQ
band links to it. It is a client-side fit of the Dojo's Retrieval Brain
kata, word half only: a hand-written library Rick approved, matched by the
words in the question, with the kata's wall kept whole: **return nothing
rather than guess.** A miss says "I do not have that one" and offers "Ask
Rick this", which drops the question into the Letter Slot. Every answer
ends in the same want button as the nav (`my hours back`, kind `hours`),
and the hand-off writes the questions asked into the slot message, so a
lead from the box arrives with context. No server, no storage, no model
call, no address; it also registers a third WebMCP tool, `ask_rick_tew`.
Rick's rulings, same day: the box never names an AI company or model
("AI companies" is the phrase); it quotes page claims as they stand, never
sharpened; and the welcome does NOT explain the mechanism (the word
matching is his secret sauce, and an earlier welcome that spelled it out
was cut by him). The line that stays honest is the header, "Answers Rick
wrote. No guessing.", and the box must never claim to be an AI. "Are you
an AI?" lands on the answer-box entry, which says every answer is Rick's
and offers to build one. Every answer carries a **Tew Tip** (`TIPS` map in
`ask.js`, one leading line per entry that points at the next move); Rick's
pasted texts are ideas to rewrite in the page's voice, never verbatim, and
answers should say how he uses the thing himself (gym desk, SabaiSen desk
agent, TewBeDo) where that is true. **Run `node tests/ask-golden.js` after touching the
library or the solution rows:** it holds the solution entries to the
page's rows word for word, keeps the nonsense controls returning nothing,
and greps every answer for addresses, long dashes and company names.
`tests/` is excluded from the Pages build. Unanswered questions in a
session are readable at `window.rtAskMisses` for the playtest.

**The sim playtest for this page is `tests/aininja-sweep.js`** (Playwright,
loaded from the newnei-app checkout; serve the repo on 8765 first). It
walks desktop and phone: every link and anchor, every want and mail button,
the quiz (30 seeded random walks), the chat box, the mailbox against a
mocked endpoint (nothing is sent), the rails, the reveals, phone overlap and
overflow. Exit 1 on any finding. First run, 2026-08-28: two dead links
fixed (the FAQ's `#ask` href, a hidden design-tests pill), then clean.

**The Intake (2026-09-05, Rick's ask): the client questionnaire at
`/aininja/start/`.** For people who have picked an offer and want to start,
and for new clients sent an invite link. It asks more of their time up front
(20 to 40 minutes) so the build starts faster. Four parts: 56 push-button and
short-text questions in nine sections (what they need, one job or the whole
command center, front side or back office only, how far into the money, who
logs in, who runs it, which agent seats, what may go out without a human
press, what runs it today, timing, tier, limits, what done looks like), seven
free-text boxes in their own words, recordings (voice note, camera video,
screen recording with the mic mixed in, all in the browser with MediaRecorder,
plus file upload), and one press. Answers autosave in localStorage until sent.
The page is `noindex` and is NOT in the sitemap; the only links to it are the
sensei note under the price cards on `/aininja/`, `llms.txt`, and invite links.

- **One catalog, two copies.** Every question, option and limit lives in
  `aininja/start/intake-questions.js`. The page builds its form from it; the
  endpoint accepts ONLY ids and option values from it, so a stranger can never
  choose a field name that reaches mail. `deploy.sh` copies it into the
  function folder; `tests/intake-sweep.js` fails if the two copies differ.
  Edit the catalog, run the sweep, run `deploy.sh`.
- **The endpoint** is `supabase/functions/ricktew-intake/index.ts` on tews-inc
  (`qegfhbseccinnxnzfhxw`), deployed with
  `supabase/functions/ricktew-intake/deploy.sh`. Two actions: `upload-url`
  hands the browser a one-shot signed PUT into the PRIVATE bucket
  `aininja-intake` (bytes never pass through the function; 50 MB per file,
  24 files: the tews-inc project caps a single upload at 50 MB, a 60 MB test
  on 5 Sep 2026 came back 400, so the recorder stops video at five minutes
  and 46 MB; raise the project limit in the dashboard before raising the
  catalog's); `submit` rewrites the sheet as Markdown, stores `intake.md` and
  `intake.json` beside the media, inserts a row in `public.aininja_intake`
  (RLS on, service role only), mails the Markdown to CONTACT_TO (subject
  `AI Ninja Intake: <name>, <business>`, Reply-To the client, headers
  `Auto-Submitted: auto-generated`, `X-Intake-Id`, `X-Intake-Key`; each
  recording a labelled 30-day signed link), and sends the client a receipt
  (`AI Ninja Intake received: ...`, Reply-To INTAKE_REPLY_TO) listing what
  landed and the essential questions they skipped; it signs "AI Ninja"
  (Rick's ruling 2026-09-05, matching TEWBEDO's follow-up drafts: one
  sign-off that reads right whether he or an agent answers). Same walls as the Letter
  Slot: always `{ok:true}`, drops logged under `ricktew-intake drop`, every
  client character escaped at its point of use, no address in the page.
- **Secrets on the project, not in the repo:** the three shared with
  ricktew-contact, plus `INTAKE_KEYS` (`label:key,label:key`; a matching
  `?key=` on the link marks the intake as that client's, no match is
  reported as INVALID, no key is "open", nothing is dropped for it) and
  `INTAKE_REPLY_TO` (where a reply to the receipt goes: the Ninja Agent's
  mailbox). Mint a client key with `python3 -c "import secrets;
  print(secrets.token_urlsafe(18))"`, append it to INTAKE_KEYS with
  `supabase secrets set --project-ref qegfhbseccinnxnzfhxw INTAKE_KEYS=...`
  (the whole list, it replaces), and send the client
  `https://ricktew.com/aininja/start/?key=<key>`.
- **TEWBEDO's side (built the same day by the TewBeDo session):** the subject
  prefix `AI Ninja Intake:` is a guard in its auto-reply logic (the Ninja
  Agent never answers an intake), the thread gets an "Intake" tag and an
  Intakes tab in the inbox, and an `[INTAKE REVIEW]` mission fires on
  arrival: what they want, what is missing, a follow-up DRAFT Rick sends.
  TEWBEDO matches the prefix literally: change it there first, then here.
  **The `X-Intake-Id` header is load-bearing (2026-09-05, after Rick's first
  sent follow-up looped back and was mistaken for a second intake):** TEWBEDO
  files a mail as an intake only when the prefix AND that header are present,
  so a "Re: AI Ninja Intake:" reply is never re-reviewed. Never drop it.
- **R2 Hosting (Rick's ruling 2026-09-05, on the intake page only so far):**
  a fourth offer, the entry one: $222 to build, then $99 a month or $999 a
  year, Rick builds it, hosts it and manages the hosting on his own stack.
  **Same day, later ruling: the $222 is a separate starter invoice and it
  waives the first month of hosting; the first $99 bill is for the month
  after the build.** (PreferClinic, the first client on it: starter invoice
  in September, first $99 for October.)
  It is a `tier` option and a line in the access explainer on the intake
  page. NOT yet a price card on `/aininja/`, not in Stripe, not in llms.txt
  or the JSON-LD. **Its page is `/aininja/r2/` (live 2026-09-05, indexed,
  in the sitemap, its own Service JSON-LD):** the three prices, what the
  $99 covers (the six areas the evercoolthailand Pay tab lists), the four
  steps, the two live installs (Evercoolthailand.com since June 2026,
  SabaiSen.com since August 2026), a comparison with the two Dojo offers,
  and a FAQ. Every claim on it comes from the two apps' Pay and Bills tabs;
  the not-included lines (new features quoted separately, no ad spend) are
  the Pay tab's own notes. Linked from the sensei note under the price cards
  and llms.txt. **Since later on 2026-09-05 it is also the third price card
  on /aininja/ (`#r2`, tag "Start here", green border), by Rick's ruling:**
  the entry level, because managing the whole stack for Evercoolthailand,
  SabaiSen, NinjaGym and PreferClinic is the work he actually does most.
  The agent-door build reads its price from the card's `data-want` and
  writes the third Offer and the llms.txt line. No Stripe product for the
  $222, $99 or $999 on Rick's own side yet (the two live installs bill
  through their own subscriptions). The chat box has no R2 entry yet. The Dojo's copy of the fact:
  `~/Dev/digitaldojo/docs/Digital Dojo, Note 2026-09-05, R2 Hosting offer.md`.
  Rick wrote both "R2 Hosting" and "R2 Hosting"; the page says R2S until he
  rules.
- **Rick's visual rulings on this page (2026-09-05), which apply to every
  new page:** one weight per paragraph (a half-bold lede reads "bubbly and
  unprofessional"); round pill shapes only on things you can press; never
  tag a field "optional", just ask.
- **Tests, run both after any change:**
  `./supabase/functions/ricktew-intake/run-escaping-test.sh` (44 offline
  checks: hostile submission, both mails, the Markdown, the gauntlet, paths
  from another intake refused) and `node tests/intake-sweep.js` (Playwright,
  serve the repo on 8765: every option tapped, autosave across a reload, a
  mocked upload and submit, phone overflow, address wall). First real
  end-to-end intake: 2026-09-05, id `9ztegx65t1yxqadwpyx0`, both mails
  delivered, TEST in the name.

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
│   ├── start/      #   The Intake: the client questionnaire, noindex
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
