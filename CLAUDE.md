# RickTew — ricktew.com

Personal brand and portfolio site for Rick Tew. Everything he makes lives here: apps, games, businesses, and tools.

**CURRENT STATE (2026-08-21): the site is TWO DOORS.** The front page asks one
question, "Which ninja do you want?", and sends the visitor to one of two
places:

- **`/hininja/` HI Ninja** — Human Interaction. In-person martial arts,
  life-coaching, the mental martial arts. This is Rick's thirty years of
  teaching. **Since 9 Oct 2026 `/hininja/` is ONE landing page that sells GNS**
  (Rick: "one page landing page on HI like AI but with links for details"):
  the realistic version, light, red only on the buttons, words only until Rick
  sends today's photos, a "Buy 2 weeks, $2,222" button (SKU `HIN-GNS-2W` in the
  Dojo's one checkout, through `/hininja/buy/`; arrival date asked; "All sales
  are final; your dates can move to another two weeks, within a year of buying"
  (the year is Rick's click of 10 Oct); thanks page
  `/hininja/thanks/`) and its own enrol form on the mailbox (subject `hininja`).
  Rick and a NinjaGym Guide take turns teaching (Rick at least 2 classes a
  week); shared dorms, a women's dorm on request. `/gns/` is the FUN version of
  the same program and stays as he designed it: both pages run for real, and
  ~6 months of ads and data compare them. Never restyle one toward the other;
  in questions name them by address, never "test A/B". The old HI home is word
  for word at `/hininja/history/`. Reader round and rulings:
  `playtest/reports/2026-10-09-hi-SUMMARY.md`, memory `project_hi_landing_plan`.
  **Since 25 Oct 2026 `/hininja/` opens with the Ninja Menu** (Rick: "make one at the
  top that will lead them to training: two week intro to martial arts by Rick Tew"): a
  quiz where the visitor builds a Ninja Week (5 picks from 8 areas of the RTMS book, no
  Book before the 5th), then picks a stay (2 weeks $2,222, 3 weeks $3,222, the month
  $3,997, the belt program $7,994 for 2 months, yellow belt first); the plan goes to the
  mailbox (subject `plan`, Auto-Submitted) and Book goes straight to `/hininja/buy/` with
  `?weeks=2|3|4|8`, which the checkout sells (Digital Dojo cadd11cd; Rick lifted the hold
  for that one change). The morning is the Sensei Seminar, built from the group's picks.
  Code `hininja/menu.js`, sweep `tests/hininja-menu-sweep.mjs`. Colours: white, grey, the
  AI Ninja blue, yellow, belt colours, red only on buttons; no mall named; WinJitsu
  coaching included; never Rick's photo next to the bunk beds.
  **Since 27 Oct 2026 the headline is "Martial Arts Introduction by Rick Tew"** (Rick: "Intro
  to martial arts instead of two weeks (as we offer multiple lengths", then "Martial Arts
  Introduction so martial arts leads. For seo or google later we might need retreat, camp or
  Thailand"), and the page after the intro and quiz runs in his 5 W's order: Who `#who` (the
  target audience: "the WHO will be our target audience not Rick. That can be after"), What
  `#what` then `#belts`, When `#day`, Where `#where`, Why `#mind` (with the student voices),
  How `#price`, then Rick's own `#rick` ("Who you learn from"), the FAQ and the ask box. The quiz box holds two sentences at most per view
  ("Max of two sentences on the right"); its ready step is five short ticks (his pick).
  **Later on 27 Oct, his notes on the live page:** the hero's left column holds "How it works", five icon
  steps (Pick, Book, Arrive, Train, Explore), where Vid's menu video sat ("looks weird"); the video was then
  dropped from the page altogether (his click "Drop the video"; v2 to v4 stay on the Extreme Pro). Why `#mind` is the reasons people come (learn martial arts, a new
  skill on vacation, see Thailand, advice from someone who has been there), with the student voices;
  **WinJitsu is not a Why, it is What's "Bonus: WinJitsu"** (blue box). When is "The dates and the
  schedule." Where is "Koh Samui, Thailand.", then "Interested in a California, U.S. Tew's Tour? Click here"
  (it fills the ask box until the tour has a page; swap the href when it does) and the few-days stay at
  nerdhostel.com. The menu's eight areas are icons from the HSP yellow belt sheet (Extreme Pro,
  `Rick Tew Archive/Graphics & Art/Level_1complete.ai`; all 18 cut in `Studio/RickTew/takes/menu-icons/`),
  four across; under them his four **popular quick picks**, one fills a whole week (`q0` to `q3` in menu.js).
  **The November friend promo** ("Attend with a friend for FREE if you book in November"; his picks: the friend
  gets the same as the booker, comes on the same dates for the same stay, any of the four stays; bookings 1 to 30
  November 2026): a hero line, a box in the price card, and "Bringing a friend for FREE? Their name" on the
  menu's book form, which rides in the plan mail (the checkout stays one item). Every piece is `data-promo
  hidden`; the page's script shows them until 30 November 2026 ends in Thailand and then they are gone by
  themselves. The friend needs a second dorm bed: NerdHostel was told.
  **Since 28 Oct 2026 the price section is packages, biggest first** (Rick pasted a Bronze / Silver /
  Gold note, "let's create something for our page too", then clicked "3 cards, biggest first" and asked
  for "a pricey mastery program for 1-2 years ... what part of 16K did you not understand? ... under
  20K"): "Pick your stay." over four cards, **Mastery $15,988** (all five belts, yellow to red, over 1
  to 2 years; its button "Write to me" fills the ask box, because the checkout sells up to 2 months),
  Earn a belt $7,994, The month $3,997, 2 weeks $2,222, each about double the next. 3 weeks stays a
  line under the cards (four fixed stays). A card's button picks that stay in the Ninja Menu
  (`a[data-stay]` in menu.js); the Ninja Week is still built first unless it is the belt.
  **The Mastery pitch, `#mastery`, a dark band after the belt program** (Rick, 28 Oct: "we would rather have
  10 1-2 students than 10-20 in and out students ... a solid mastery sales pitch ... those that MOVE to
  Thailand"; "mastery includes the same"): "Moving to Thailand? Earn all five belts.", four tiles (a
  routine, people, progress, WinJitsu coaching), Rick's own move (Holland, now Thailand), $15,988 and
  "Write to me about Mastery". His clicks the same day: **visas stay off the page** (no enrolment letter
  offered, though the DTV's soft-power route lists sports training), and **"Pay it all at once, or in five
  parts, one before each belt."** (invoiced, not the checkout), and the People tile adds **"Stay long enough
  and you can help lead practice as a Guide."** (no pay or title promised).
  **How Mastery works, Rick's words the same day:** "I teach them a tactic or technique and then they
  practice and focus on their training to MASTER the skills. It is not Rick Tew babysitting them hours on
  end with private 1-1 sessions every day (that would cost them close to $222 an hour or more with
  privates). So it is more sporadic with a guaranteed 200 hours a year"; private and small-group training
  with him guiding them through the martial art and the system ("certifications etc"); they join the
  short-stay classes; "access to everything (including all resources, apps, books etc)". On the page: three
  steps (Rick shows you, You practice, You earn the belt), the not-daily-privates line, four tiles (200 hours
  a year guaranteed, every class, every resource, people) and the FAQ "How much time with Rick do I get in
  Mastery?". His concept for the pitch: "looking for your Mr. Miyagi", "be the Ninja Kid".
  **No specifics in videos, images or ads** (Rick, same day: "We do not use specific for our
  ads or images or videos as we might want to change them often so leave the specifics for
  the pages and text that we can list fast"): no place, length of stay, time, date, price or
  count in a picture or a clip, recorded screens included; the page text carries them.
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
  **A first contact on this site is free** (the quiz, the mailbox).

The prices are the Dojo's facts: final and live in Stripe (Tew's Inc, USD).
Change them there first, then here. The rule that CLAIMS on this page come
from the Dojo still stands.

The other dollar signs on the page are not Rick's price: `$5` is the POS
vendor's per-staff fee inside his own story, and `$20 / $30 / $60` are the
quiz asking the reader what their own hour is worth. Leave them.

### ONE DOJO PRICE SINCE 2026-09-12: Sensei runs it is OFF THE PAGE, by Rick's ruling

Rick, 12 Sep 2026: "remove or adjust the pricing for 4444 to a custom
scenario, or remove it for now ... we don't want to get in the trap of
building for them at too low of a rate ... two simple plans that meet most
everyone. Tiny small business will choose the 222 and not take up our time.
More active will take the 2222, and anyone bigger will likely be okay with a
higher custom price that we can talk about. So it will be I build it, host
it, and help you run it, but we are not employees doing all their work."

What that is on the site now:

- **Two cards in `#offers`:** **Your Dojo, $2,222 / month** (now the `hot`
  card, headline in Rick's words "I build it, host it, and help you run
  it.") then **R2 Hosting, $222 once** (tag "Start here" that day, "Basic
  plan · R2 Hosting" since the third ruling below). The `.price-cards`
  grid is two columns, max 860px.
- **"Run it for me" and "bigger than one Dojo" are a custom price, talked
  about first.** That sentence is the Your Dojo card's first not-included
  line, the honest paragraph under the cards, the FAQ cost answer, the
  chat box (`cost`, `tiers`, `included`), llms.txt, the quiz result and the
  R2 page. It is NOT a card, NOT a number, NOT a "seats left" line.
- **The quiz has one tier.** `driver` = "you" or "nobody" no longer picks a
  $4,444 tier; it shapes the sentence (the custom conversation) and adds
  "Wants the daily work run for them: custom price, talk first" to the
  summary that rides into the slot. `priceNum` is 2222.
- **Every other surface followed:** the Claudeforce band's price cell and
  "Who runs it" row, the `#agent` band, the WebMCP read tool (key
  `offers`, was `monthly_offers`), the mailbox subject `dojo` ("Which fits
  me, Your Dojo or R2 Hosting?") on the page AND in
  `ricktew-contact/index.ts` (redeployed 12 Sep), the Terms (section 1,
  the offer list, "Seats on Your Dojo", dated 12 September 2026), the R2
  page's comparison table (two columns) and FAQ, the intake catalog
  (`operator` option `rick` relabelled "Rick's team. A custom price, talk
  first"; `tier` option `sensei` replaced by `custom`; redeployed with
  `deploy.sh` 12 Sep), and the agent-door build (one monthly Offer).
- **Not touched:** the Dojo's own copies (`site/legal/terms.html`,
  `site/dojo-landing-v2.html`) and the playtest reports, which are history.
  The golden test still lands "sensei runs it" on `tiers`, whose answer
  says the card is off the page and points at the custom conversation.
- **The Stripe product "Sensei Runs It" ($4,444) stays on Tew's Inc, by
  Rick's word the same day:** not archived, it becomes the Custom option he
  sends when a bigger in-house request comes ("we build, and we are on call
  for that month to help, on call by chat not phone"). Verified 12 Sep that
  no Payment Link points at it (the only link on the account is a 2022
  Thailand training add-on). Renaming it there is his call, not done.

### EVERY PLAN LIVES ON RICK'S STACK (2026-09-12, later the same day, Rick's ruling)

His words: "host it is my stack and we are only going to work with our
stack and not do the headache of other people's stacks unless CUSTOM here
and there." The why, from helping others in their own house: the logins and
sign-ins waste the most time; the registrar and its settings, every app
stack setup, the database, hosting, email, and needing the client's credit
card approval for each service is "a giant pain"; owning the builds also
protects him and is what lets him do it cheaper. And the rule for the copy:
**explain it only where needed, benefit first, never the fear.** Most
customers do not understand tech and get defensive if it is over-explained;
the ones who let him run it grasp the benefit fast: nobody wants to jump
into their tech to change a page, fix a bug or manage the back end.

What that is on the site now (all pushed 12 Sep):

- **The claim, everywhere it is made:** every offer is built, hosted and
  managed on Rick's own stack, in his accounts (hosting, app stack,
  database, mail plumbing, settings). The build, the code and the
  configuration are his. **What is the client's, always: their domain,
  their content and their data,** and those leave with them; the build and
  the hosting end with the subscription, nothing charged after. A build
  inside the client's own accounts, so they own the machinery outright, is
  a **custom job, quoted in writing, and costs more** because every login,
  registrar setting and card approval on their side is an hour.
- **Where it is explained (and nowhere else):** the Terms section 4, now
  "Where it lives, and what is yours" (the contract carries the full
  statement; section 1's custom line adds "on call by chat, not by phone,
  for the month of the build"; section 3's work-in-progress line); a new
  band `#why` on `/aininja/r2/` ("You get the result. I keep the
  plumbing.", four benefit tiles, one honest line, linked from its nav as
  "Why my stack"); a new FAQ on `/aininja/`, "Do I have to manage any of
  the tech?" (in the JSON-LD via the build); the chat box `ownership`
  entry (now also answers "where does it live" and "do I have to manage").
- **Where the old claim was quietly corrected:** the Your Dojo card's
  hosting bullet ("on my stack ... nothing for you to log into, renew or
  fix") and third-party line; the honest paragraph under the cards; the
  Claudeforce "What you own" row (it now concedes the build ends with the
  subscription, same as theirs, and points at custom); the cancel FAQ; the
  Claudeforce FAQ; the R2 table's "Where it lives" (both "My stack, your
  domain"); llms.txt; and six chat-box entries (`is-ai-safe`, `which-ai`,
  `data-privacy`, `contract`, `cancel`, `third-party`) plus two Tew Tips.
  The intake's `access` question is reframed: the only access needed is
  for what stays theirs (domain, mail, tools to move out of); "build on
  new accounts in my name" is now "I want it built inside my own accounts
  (a custom job, quoted first)", same value `fresh`; the `tier` custom
  label names in-house. Redeployed with `deploy.sh`.
- **Third-party costs** are still not in the price, phrased as "ad spend,
  and any AI usage or software your business needs beyond the build"; the
  old "your AI account, in your name" is gone. **Whose key the ninjas run
  on (his, inside the price, or the client's, metered to them) is NOT
  ruled;** the copy is written to be true either way. Ask before promising.
- **"Your data leaves with you"** is a commitment in the Terms and on the
  page, and since the third ruling of 12 Sep, so is "I do not keep a copy":
  Rick confirmed "data" means their mail and content, not the builds, and
  wanted it said that he keeps none of it. The Terms say it is handed over
  and then removed from his stack. Backup retention is not specified.

### THE THIRD RULING OF 12 SEP: easy for them, easy for him

- **The AI is inside the price, on Rick's accounts.** His words: "likely
  will be our AI keys but we run on SUB and we just charge it as part of
  our service ... ten clients at $2,222 against a 20x Max plan at $2,222
  ... we don't really want them to hassle with AI or any of those issues."
  The customer type from the landing page hates computers and the
  non-stop changes in AI. So the card has a bullet ("The AI is in the
  price. I run it on my accounts: you never open an AI account, hold a
  key, watch a meter or keep up with which model is best this month"), the
  Terms section 4 says it with a fair-use line (use far beyond a small
  business's normal day is priced in writing first, Rick's pattern from
  the mail cap), and the FAQ, the chat box (`cost`, `included`,
  `third-party`, `which-ai`, `is-ai-safe`), the Claudeforce "AI inside"
  row and llms.txt agree. **Not included** is now only ad spend and
  software the client already pays for on its own. The old "one switch
  pauses every metered AI call" lost the word metered; the old "weekly
  line on what the agents cost" is gone (the cost is his).
- **Limits, Terms only plus one R2 tile:** mail from the client's domain
  up to 5,000 sends a month (his Resend Pro 50K split ten ways; the
  vendor is not named anywhere), more priced in writing; large media
  (video, big files) stored as needed and priced only when it becomes a
  real cost (Cloudflare, sometimes Supabase; also unnamed). He said "we
  can if needed say 5K", so it is in section 4 and in the R2 "Company
  email" tile, nowhere louder.
- **The tags:** "Start here" read as an instruction, so the cards now say
  **"Basic plan · R2 Hosting"** and **"Full plan · Your Dojo"** (his ask:
  "Basic Plan or similar"); the R2 headline became "I build it, I host it,
  I keep it running." so the name is not said twice. The WebMCP read tool
  quotes the tags, so an agent sees the plan level with the name.
- **The two cards share rows** (`.price-card` is a subgrid spanning seven
  rows of `.price-cards`, row-gap 0, column-gap 18px): tag, headline,
  price, list, button, want pill and cancel line sit level whatever wraps.
  The Your Dojo price got a `.then` line, "flat, any number of seats, the
  AI included", so its row is not empty against R2's "first month
  included" line. Phones stack the cards with an 18px margin. A browser
  without subgrid (Safari before 16, Chrome before 117) gets two
  independent stacks, which is what it had before.
- **Stripe:** the $4,444 product is renamed **"The Digital Dojo: Custom
  Build Plus"** (`prod_V3zVzzFRsdk6eA`, metadata tier `custom-build-plus`,
  description rewritten to "Your Dojo plus the custom options"; its
  monthly price and id are unchanged). It is the invoice he sends for a
  bigger in-house request; it is on no page.

The evidence-based ruling of 26 Aug (visible prices, no anchors, no paid
first call, a free first contact) still stands; it just applies to two
cards now.

### THE LESS-IS-MORE PASS (2026-10-01, Rick's go): what left the page, where things are now

Rick, 1 Oct: "dumb it down and simplify it and also remove redundancy ...
NO ONE should land on this page and be confused as to what we offer (so not
changing the top)". Round five (`playtest/reports/2026-10-01-SUMMARY.md`:
an editor's map plus two personas) found the offer clear in `#you` and about
2,250 shown words that nobody needed. Rick: "we can not make big changes
based on only 2 persona runs. So let's do your 3 suggestions and then run
20 persona" (10 first, his pick), straight onto /aininja/, then "go". The
round-six reports judge it. **This block supersedes the older lines below
that describe the full price cards, the subgrid, the Masters, the #agent
band and the summit card.**

- **Gone from the page:** `#opt-2c` and the summit card (`#summit`; the
  /aininja/side-hustle-summit/ page stays live), `#outcome`, `#operating`
  (it held the Dojo's rulebook line, e37c694), `#opt-2b` (the "3-second"
  band), `#masters` (the six seat buttons; the quiz result names no seat
  now, a one-line override beside `topSeat`; the FAQ "What is an Agentic
  CMO?" went with it; the chat box's `masters` entry stays), `#opt-5a`,
  `#opt-6a`, `#ninja` (its tapes still sit in `aininja/assets/story/ninja/`
  for /gns/; its scripts are guarded and idle), `#opt-8b` (the chat's
  testimonials link now points at `#story`, "See what got built") and
  `#agent` (the WebMCP tools in the form keep working without it).
- **One set of price cards:** the two short cards in `#you`. Their
  container is `#offers`, the R2 card is `#r2`, and each has a `.way-more`
  line carrying what the full cards used to (R2 is me, Rick Tew; the $222
  builds a site with a contact or booking form or a small app, from the R2
  page's own FAQ; first month included; the free audit; cancel anytime).
  The full `.price-cards` grid left `#dojo`, and the copy inside
  `#claudeforce`'s relief became a "See the two plans" button to `#offers`.
  The WebMCP read tool reads `#offers .way`. The done-for-you page copies
  these short cards word for word, which is why they are the set that stayed.
- **Five questions moved up** into `#you`, under How it works, as
  `<div class="you-faq" id="faq-first">`: understand AI, cost, disappear,
  manage the tech, cancel. `tests/agent-door-build.py` reads that block AND
  `#opt-8a` for the FAQPage. A line under the cards now says what the "I
  want this Tew" button does.
- **Unchanged:** the top, the five boxes (the seat box still teaches a word
  the page no longer uses much; flagged, not cut), the story, the apps,
  #opt-e1, the solutions, #dojo's intro, steps and the paragraph with the
  Intake link, #claudeforce, the quiz, #opt-6b, the FAQ band, the mailbox.
- Undo is one revert of the commit that says "less-is-more pass".
- **Third pass, after round seven** (`playtest/reports/2026-10-01-r7-SUMMARY.md`;
  Rick's click answers): the apps row and `#opt-e1` moved INSIDE the story
  fold; `#dojo`'s three step cards and the "2015 org chart" line sit in
  `<details class="dojo-more">` ("How it grows, step by step") without
  their buy buttons; the intro and the paragraph with The Intake link stay
  open. The five boxes are FOUR (no "seat"), sit behind "What do the words
  mean?" under How it works, the first box arrives drawn (`.sb-end`, a
  negative animation delay) and then plays on, and the belt box's ninja
  keeps a white belt (the strip under it shows the climb). The Your Dojo
  card names the jobs (only what the rows claim). Under the cards: the
  channels line (email first; WhatsApp, LINE, Instagram or texts are a
  build) and "I stick to writing on purpose". The mailbox headline was "One
  message. It reaches me." until 5 Oct, when Rick read it as a promise
  ("don't make a promise that it reaches me") and the band as messy: it is
  now "Drop it in my mailbox." over one line, "Tell me where your hours go.
  Or try the ninja first: drop a question in and see what comes back." (the
  crawler and email-app sentence left with it).
- **Rick's facts and rulings, 1 Oct 2026 (quote them, do not sharpen them):**
  - Who reads a client's mail: "only me, plus the AI that drafts the
    replies". He signs a HIPAA business associate agreement for health
    practices. Both are in "Is it safe to let an AI read my inbox?" and the
    chat box's `inbox-security` and `data-privacy` answers.
  - Sending on its own: by default nothing goes out without a press;
    automatic sending is the client's choice, task by task, and only after
    it has been tested ("lean on No and all auto is their option for
    different tasks"). Coded system replies are not AI, but nobody grasps
    the difference, so the page does not explain it. Do not write a new
    "that rule never bends" absolute. The five old ones (the FAQ "Will an AI
    talk to my customers without me knowing?", its done-for-you copy, three
    chat answers) now read, on Rick's yes the same day: "By default nothing
    goes out without a press. Sending on its own is your choice, task by
    task, and only after it has been tested."
  - R2 sends booking reminders by email (Rick, 1 Oct, after the quick
    check): on the R2 card's line and in the chat's `r2-hosting` answer.
  - The channels line under the cards, softened on his pick: "Your
    customers text, WhatsApp or LINE you? Tell me which, and I set it up and
    quote it in writing first."
  - The FAQ "Will an AI talk to my customers without me knowing?" (landing,
    done-for-you, chat) opens "Not without your say." (was "Never.").
  - The mailbox subject `dojo` is labelled "Your Dojo or R2 Hosting" on the
    page AND in `ricktew-contact/index.ts` (redeployed 1 Oct; foreign
    origin still 403).
  - **The no-promises pass is DONE (1 Oct, Rick's clicks, one per promise):**
    no "I read every message / follow up myself" (now "I pick it up from
    there."), no "within a minute", no "usually within a day", no "in the
    next minute" (now "check your inbox for its reply / for the receipt"),
    no "free forever", and the "I will ..." offers rewritten as plain
    directions. Refusals ("I will not invent a quote") stay. Covered: the
    /aininja/ mailbox band, small print and thank-you, the WebMCP tool
    text, the FAQ, done-for-you, R2, the Intake page, the chat box, llms.txt
    and the Intake RECEIPT mail (ricktew-intake redeployed 1 Oct).
  - **AI labels, Rick's ruling the same day:** "AI Ninja", "Rick Tew, AI
    version", messaging the AI Ninja and AI words for search are all fine.
    What he does not want: telling anyone their workflow or emails will be
    marked "sent by AI". So nothing says our mailbox replies are "signed as
    the AI" or "an AI I built", and the Intake receipt no longer says "I am
    an AI". The escaping test checks the receipt carries neither the label
    nor the read-every promise.
  - **Clearing the list, same evening (Rick: "Don't leave things open"):**
    the focus rings on every AI Ninja page are blue, not red (22 rules; the
    27 Aug red ruling is retired). "The audit" is "the free look" everywhere
    it names the free first step (Rick's pick; five owners read "audit" as
    the taxman); "audit trail", the Quiz Funnel's "self-audit" and the
    Terms' legal verb stay. "Does it replace the apps I already pay for?"
    adds Rick's fact: guest messages from Booking.com, Agoda or Airbnb
    arrive as email and the Front Desk drafts replies to them. "What happens
    in the first month?" moved into The first questions. Dave's line sits
    under the ticks: "I do the computer work. You never log in, renew, fix
    or learn anything; when something needs changing, you tell me." Rick's
    calendar holds two reminders: 25 Oct re-read Search Console, 10 Nov
    renew the WebMCP token (expires 17 Nov).
- **Second pass, same day, after round six** (ten personas,
  `playtest/reports/2026-10-01-r6-SUMMARY.md`; Rick's click answers):
  - **The story folds:** chapter 1 ("A gym full of kids") and chapter 7
    ("Friends asked about AI") stay open. Chapters 2 to 6 and the sprite
    wall sit inside `<details class="tl-more">` ("More of what I built"),
    with their own fills `tlFill3` and `tlFill4`. Nothing was deleted.
  - **`#claudeforce` is gone,** with its FAQ "Is this like Claudeforce?"
    and its llms.txt section (the build no longer writes it). The Marlow
    line went with it.
  - **Under the cards:** the smaller start in one line, "One desk on its
    own, without the monthly plan, is quoted in writing after the free
    audit." (no number, Rick's pick), and the chat box's "I stick to text
    on purpose: everything we agree is on the record. A call is a custom
    step."
  - **The first questions** gained "Does it replace the apps I already pay
    for?" (Rick's fact: it works alongside what they already use; the
    free audit decides what connects and whether anything is worth
    replacing) and "Is it safe to let an AI read my inbox?" (moved up from
    the FAQ band).
  - **The quiz** no longer tells renters "it is the system": `rented`
    left `needsBuild`.
  - **The chat box** gained the `existing-apps` entry. Its gate now needs
    two matched words to be MORE than half the question's real words (8 of
    10 personas got a confident wrong answer from two common words), and
    `data-privacy`, `a-person` and `testimonials` got tighter phrases. The
    `data-privacy` Tew Tip changed to "Ask any builder where your data
    lives and who can open it. You should get a straight answer." (the old
    one argued against the on-my-stack offer). The golden set gained seven
    regression lines.

### 2 OCT 2026: the visuals are back, as case studies; How it works is three steps and a storyboard

Rick, 2 Oct: "we took out the visuals (apps etc) so put those back in ...
digital is very bad at judging what a human would see as relevant with a
stranger (visual proof of product is bigger than text and now our landing
page is only text)." **A persona round may say a section is "not needed";
it does not get to remove the pictures.** This block supersedes the 1 Oct
lines above about the story fold, the apps row and the How it works strip.

- **The live screens (`#apps`) sit in the open, between `#you` and the
  story.** They had been inside the story fold since 1 Oct.
- **Case studies (`#cases`) replace the "More of what I built" fold.**
  Rick: "bring it all back but now we will use them as case studies and
  examples and they can click the OPEN CASE button to see the full story
  ... 'I want to turn my board game into a real game' then we show the
  steps ... unique to business, personal, hobby." Five `<details
  class="case">` cards after chapter 1, each with its picture in the open,
  a kind line, the ask in one sentence, three steps and the button:
  `case-gym` and `case-spa` (business), `case-console` and `case-winjitsu`
  (personal), `case-game` (hobby). The body of each is the old story
  chapter word for word (chapters 2 to 6, the sprites, `#opt-e1` inside
  the spa case). An opened case takes the whole row; a link to something
  inside a closed case opens it. Chapter 7 (the friends) stays open below.
  Every step line is a fact that was already on the page, in `ask.js` or on
  the R2 page. The five asks are my wording from those facts; Rick offered
  to give his own case for each, so expect them to change. A sixth case
  (a client) needs his facts and his say on naming: the friends in chapter
  7 are unnamed on purpose.
- **How it works is Rick's three steps and his note,** because the old
  four-step strip ("My AI ninjas do the legwork: the drafts, the filing,
  the bookings") was, in his words, "not actually how it works ... what we
  really do is more custom": 1 the foundation first, systems that work like
  software and run without AI; 2 then AI where it helps, the ninjas trained
  for that workflow in the Digital Dojo; 3 a person at the helm, overseeing
  the builds, the finished work and the process. Note: real-life testing is
  the client's ("we will never know their business or needs like they do");
  testing with hired people is an added cost. The same words are in the
  chat's `a-person` and `tested-first` answers, the FAQ "Does anyone test
  it before my customers see it?", and the steps on done-for-you and the
  AI agents page.
- **The How it works storyboard (`#howBoard`), the office telling.** Rick:
  "maybe our explainer video shows we build them the dojo ... first we
  build you an office (?) and then we attach the SYSTEM and the WAY to it.
  Then we train the ai ninja who will work in your office all overseen by a
  manager in the loop ... we can test out what works best." Both tellings
  were drawn and read cold the same day (six fresh readers, pictures only,
  three per telling): all six said the order back and would read on; boxes
  they were sure of, office 7 of 12, Dojo 4 of 12, the whole gap in box 1
  ("Dojo" read as a martial arts gym). His three picks: **"Office, and name
  the Dojo once"** (box 1's caption is "First I build your office. I call
  it your Dojo."), the sign says **"Your business"** and never changes
  (the turning bakery / clinic / salon names told a baker it was for
  clinics), and **THE WAY lists "your prices, your rules, your steps"**.
  Four boxes above the three written steps: Rick builds your office; the
  system and the way go in (that part runs without AI); AI ninjas, one job
  each, nothing out without a press; Rick, a person, oversees it and writes
  the report. The engine is one function, `rtBoard(rootId, prefix,
  SCENES)`, called twice (the four words, then this). A scene is an SVG
  string in the page; edit it there. **It clicks through like slides and
  never moves on by itself** (Rick, 2 Oct: "videos are easier with 1, next,
  2, next and 3 that they can just click through like a slide as well";
  5 Oct: "stop this from autoplay. I pressed 1 to look at 1 and it went
  from 1 to 2 to 3 and I can't even look at 1. That creates stress."): the
  parts are numbered 1 to 4, each draws itself in and then waits, and its
  one button reads Next, then From the top on the last part. A board marked
  `data-video` behaves this way, and since 5 Oct BOTH boards are marked
  so (Rick: "1234 like I requested and keep that for all of them going
  forward"): the four words lost their dots, Back and Replay. Any new
  storyboard gets `data-video` and `sb-nums`, never autoplay. The same day
  the characters were made to match in all eight scenes (Rick: "the
  consistency of the characters"): Rick is blue with a BLACK belt, every AI
  ninja is black with a white belt, the owner ("you") is grey without a
  mask, and the Dojo is always the flat-roofed office whose sign says "Your
  business" (the four words' cycling bakery / clinic / salon sign is gone,
  by the 2 Oct ruling). The Dojo telling is in the history at
  abafc7b. The plan is still called Your Dojo; "ninja office" as a product
  name is NOT ruled.
- **Same day, his pick "True up the page and chat, not the card":** the
  done-for-you page's top paragraph, descriptions and "AI where it helps"
  heading, and the chat's `masters` answer, follow the three steps. The
  Your Dojo card ("I manage the AI ninjas that draft every reply and file
  every payment") stays as written. The five case asks stay until he sends
  his own wording.

- **After persona round nine (2 Oct, `playtest/reports/2026-10-02-r9-SUMMARY.md`),
  Rick's clicks:** the explainer's part two adds "or connected to the apps
  you already use" (the FAQ said alongside, the picture said build); the
  testing note left the How it works panel and the two short pages and
  lives in the FAQ "Does anyone test it before my customers see it?" and
  the chat (a burned owner read it as "I am the tester"); the live
  screens row and its icons run business apps first (NinjaGym, SabaiSen,
  EverCool, WinJitsu, TEWBEDO, SamuiKids, NerdHostel), the games after
  (all three readers took the games for a hobby page).
- **Two services only (Rick, 2 Oct 2026: "we have only two services, where
  is this as a service?").** "One desk on its own ... quoted in writing"
  is gone from under the cards, the FAQ "Can I get just one desk?" (all
  three pages), the quiz's "does not add up yet" result and its mailbox
  summary, and the chat's cost answer. Every Dojo still starts with one
  desk at the flat $2,222; the smaller start is R2 Hosting. Never offer a
  one-desk build, a desk price or any third plan without his word. The
  whole day run for you stays a custom price, talked about first.

### The search pages (2 Oct 2026, Rick's pick "More search pages", then "Open all three")

Three short pages in the shape of done-for-you, each on a phrase Google's
autocomplete suggests (checked 2 Oct): `/aininja/ai-customer-service/`
("ai customer service for small business"), `/aininja/ai-agents/` ("ai
agent for small business owners") and `/aininja/booking-system/` ("online
booking system for small business", which sells R2 Hosting first). In the
sitemap, in llms.txt, linked from the /aininja/ footer and from each other.
**Nothing on them is new copy except the headlines and ledes.**
`tests/agent-door-build.py` fails, naming the sentence, if any step, tile,
plan card, note or FAQ answer on them is not already on the AI Ninja page,
in `ask.js` or on the R2 page, or if a price is not in the landing cost
answer; it also writes each page's ld+json. So a landing-page edit that
breaks the build means: copy the new sentence onto the short page. A new
search page goes in `SHORT` in that script and in `SHORT` in
`tests/aidoor-sweep.js`. Search Console baseline before them: 5
impressions in 28 days for /aininja/.

### The live row: no claim sentence any more (2026-08-28)

The apps section used to promise every capture was "exactly as it loads for
anyone who taps it", then narrowed that to "most are what a stranger sees,
two are what Rick sees inside". On 28 Aug Rick cut the whole sentence as
unneeded; the intro is now one line ("Some I built for a business, some as a
hobby..."). Nothing on the page describes the captures any more, so a tile
swap needs no copy check. The row label above the phones is the only text left.

### Accessibility on the AI Ninja pages (13 Oct 2026, from the Dojo's axe run)

axe (WCAG A, AA and best-practice) is clean on the eight AI Ninja pages
(`/aininja/`, done-for-you, ai-agents, ai-customer-service, booking-system,
side-hustle-summit, r2, start), desktop and phone. Keep it that way on a new page:

- **Landmarks:** the door bar is `<nav class="doorbar" aria-label="Which ninja">`,
  everything from the hero to the last section sits in `<main id="main">`, and the
  phone's bottom bar on `/aininja/` is `<nav class="mbar" aria-label="Quick links">`.
  On the Intake the form's mount is `<div id="form">` (it was an empty `<main>`
  that sat hidden in the fold).
- **The app strip (`#appRail`):** `liveRail()` builds one real set of cards,
  reachable by keyboard and screen reader, then the loop copies with class `dup`,
  `aria-hidden` and `tabindex="-1"`. Tabbing into it adds class `kb`, which stops
  the strip and wraps it; reduced motion hides the copies. A new tile goes in the
  real set only.
- **Light text on the blue bands** is `#f0f6fc` (4.55:1), never `#dcebf9`.
- **A wide table** that scrolls sideways gets `tabindex="0" role="region"
  aria-labelledby` its heading and a blue `:focus-visible` outline (R2, summit).
- The 11.5px label size (price tags, case labels, the captions under the phones)
  is the page's look since launch and passes contrast; changing it is Rick's call.
- **Since 17 Oct 2026 (Rick's click "Fix them now") the Shop is clean too:** the
  Shop index, the four product pages, the three thanks pages, /hininja/ and its
  thanks page, and the two PromptPay cards (English and Thai). Same landmarks
  (door bar a `nav`, content in `main`), the breadcrumb link underlined, and a
  phone's sideways screenshot strip (`.shots`) is `tabindex="0"` labelled by its
  heading. The two buy relay pages are left with axe's best-practice "no h1":
  they hop to the checkout at once.

---

## Contact: the mailbox

**The name is "the mailbox" (Rick, 1 Oct 2026): "Letter slot is a very odd
name ... stop using letter slot for anything going forward."** The page has
always said "My mailbox" and "Drop it in my mailbox"; "The Letter Slot" was
only the Dojo kata's name, and it had leaked into the CMO seat's Runs line,
the chat box and the WebMCP tool description (all now "the mailbox" or "The
Mailbox"). Never write the old name in this repo again. The Dojo renamed
its side the same day (its 6055770: `packs/mailbox.md`, `kits/mailbox/`), and
`gauntlet.ts` here was re-copied from the renamed kit. The playtest reports
are history and keep the old name.
The display name inside the `CONTACT_FROM` secret was the old name as well.
That is the sender on the mailbox mail AND on the Intake receipt every client
gets. Rick renamed it to "AI Ninja", matching the receipt's sign-off, on
1 Oct (verified by digest). To check a secret without reading it, compare the
digest that `supabase secrets list` shows with the sha256 of the expected value.

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
arrives at that address: it answers from the chat box's library (since
16 Oct 2026 a copy committed in TEWBEDO, see below), answers only on a strong match, sends the honest
miss otherwise ("I do not have that one written down. Rick reads every
message and follows up himself."), signs as the AI, adds the Tew Tip as a
P.S., and never replies to machine mail, bounces or auto-responders. One
switch in the TEWBEDO inbox header turns it off without a deploy. This is
the deliberate exception to "a human presses every send", stated on the
page in the FAQ and the mailbox blurb; the threads stay open for Rick's
follow-up. **Because the library is the mail's only knowledge, every
edit to `ask.js` is also an edit to what strangers get by email:** run the
golden test, push, then tell the TEWBEDO session in one line, "ask.js
changed". **Since 16 Oct 2026 the mail does not read the live file**
(TEWBEDO 6624aae, the Dojo's security pass: running a file downloaded from
this public repo on TEWBEDO's server put every TEWBEDO secret one commit
away). It runs a copy committed in TEWBEDO
(`lib/support/ninja/ask-library.generated.ts`); TEWBEDO runs
`scripts/ninja-library-sync.mjs`, reads the diff and commits. Until it does,
the mail answers from the older copy while the chat box uses the new file.
The same day, on Rick's click, `main` here got a ruleset, "main: no
rewrites" (id 25219319): no force push, no deleting the branch. Normal
pushes are unchanged. **No email address is published anywhere on the site, the
ninja's included (Rick, 1 Oct 2026: "never give out our email address as we
use message boxes").** The page used to print `aininja@ricktew.com` on
purpose; it is gone from the mailbox band, the chat box (`contact`,
`email-the-ninja`, which now asks "Can I try the ninja before I pay?" and
points at the mailbox), the R2 page, llms.txt and the JSON-LD
contactPoint. The golden test now fails on ANY at-sign in an answer, and
`tests/aidoor-sweep.js` allows no address at all. The mailbox still lands
with the Ninja Agent, which answers by email from that address; it is just
never printed.

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
that said so was `#agent`, just above the slot, until it left the page on
1 Oct 2026; any new copy about it must stay true with or without the token,
so never claim assistants are already using it. As of July 2026 none of the big assistants call these
tools yet; Gemini in Chrome is the announced first. Local check:
`chrome://flags/#enable-webmcp-testing`, then the Model Context Tool
Inspector extension, or Lighthouse's "Registered WebMCP tools" audit.

**The agent door for assistants that FETCH rather than browse (2026-08-29).**
`/llms.txt` at the repo root and a `<script type="application/ld+json">`
graph in the head of `/aininja/` (Person, the Dojo as a ProfessionalService
with the two Offers in USD per month, the eleven solution rows, and a
FAQPage). **The FAQPage and the solution list in that block are a SNAPSHOT
of the page's FAQ `<details>` (the `#faq-first` block in `#you` and the
`#opt-8a` band, since 1 Oct 2026) and `.sol-row` summaries.** If you change a
FAQ question or answer, or a row, or a price, run
`python3 tests/agent-door-build.py`: it rewrites both from the page text
(a mismatch is a bug, and Google treats a FAQPage that does not match the
visible text as spam). Never hand-edit the block. `llms.txt` quotes the
rows and both prices the same way. The Dojo's
checker reads the live page: `node ~/Dev/digitaldojo/scripts/agent-door-check.mjs https://ricktew.com/aininja/`
(8 of 8 doors on 29 Aug; presence only). The Agent-ready band `#agent`
left the page on 1 Oct 2026; the tools and these two files did not.

**Claudeforce band `#claudeforce`: REMOVED 2026-10-01 (Rick, after round six:
10 of 10 personas said it could go). The notes below are history.**
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
Rick this", which drops the question into the mailbox. Every answer
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
**The rest of the door: `tests/aidoor-sweep.js`** (27 Sep): the landing page plus
done-for-you, R2, the Intake, the summit, both legal pages, the front page
and /hininja/, desktop and phone, shape only, plus two copy walls: lines
Rick retired ("My AI ninjas run the admin", "Payroll for these hires",
"on call", $4,444 and the rest in its RETIRED list) must not come back in
the page, the chat library, the small pages or llms.txt, and every dollar
figure on the small pages must be a real price. The HI page's Vimeo intro
answers 401 to headless browsers (a bot check; it is public and plays), so
the sweep treats Vimeo and Cloudflare challenge noise as noise.

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
paragraph after the three steps in `#dojo` on `/aininja/` (it sat under the
full price cards until those left on 1 Oct 2026), `llms.txt`, and invite links.

- **THE QUICK START, since 9 Oct 2026 (96b1575, Rick: "shorten to ONLY what
  we need to start work ... just hit record and GO (make sure bots can not get
  it)").** The page opens on name, email, then ONE red "Tap to talk" button
  (the voice note is kept on Stop and uploaded) or the catalog's `QUICK` box
  ("What do you want done?"), then "Send it to Rick". The 56-question sheet,
  recordings and its own Send are folded in `<details id="full">` ("Want to
  give me more now?"). The endpoint calls it a quick start when the answers are
  only name, email and `quick`: 8 seconds minimum (not 20), no nine empty
  sections in the Markdown, no skipped-questions list in the receipt, and name
  plus email with nothing to say is a silent drop. **The upload door has walls:**
  Origin required, the trap field rides along, and `public.aininja_intake_gate`
  (RLS on, no policies) caps 30 addresses an hour per visitor (a keyed hash,
  never the IP), 24 per sheet, 60 a day for the whole site, and hands out none
  once the bucket holds 5 GB (27 Oct 2026, after the Digital Dojo's second
  security pass; the detail is in its private report); if the gate is unreadable
  no address is handed out (a 503, `gate_unavailable`). **The Send has a cap too (16 Oct
  2026, Rick's click):** 3 accepted sheets an hour per visitor, door `submit`
  in the same table (it has a `door` column since that day: `upload`,
  `submit`, `mailbox`, and `notice` since 27 Oct; each door counts only its
  own rows), checked after every other wall and before anything is stored or
  mailed. The site's first 50 sheets of the day get the receipt; from the 51st
  to the 150th the sheet still lands with Rick, marked `X-Intake-Held: receipt`
  with a line saying no receipt went out (`receipt_held` in the log); past 150,
  or over the visitor's three, it is a silent drop (`rate_visitor`,
  `rate_day`, the answers in the line); an unreadable gate is a silent drop
  too. **Since 27 Oct 2026 every door counts and records in ONE call,** the
  database function `public.aininja_gate_hit` (service role only), inside one
  transaction under a lock per door: before that the count and the insert were
  separate calls and a parallel burst passed them all (Poli M1; proven live the
  same day: 40 requests at once for one sheet got exactly 24 addresses; the
SQL is `supabase/migrations/20261027042616_aininja_gate_hit_atomic.sql`, a
record, not re-run). An upload is counted when its address is handed out, not
when the file lands: that is what bounds storage, and its cost is that a flood
of address requests with no file closes uploads for the day (the Digital
Dojo's L10, accepted LOW; the text box still works). The page names the true
reason: the visitor's hour, the sheet's 24 files, or "Uploads are closed for
now" for the site's day or a full bucket. If the drop log shows
`"gate":"full"`, clear junk from the bucket. The
  receipt names a Shop helper only from the fixed list `SHOP_NAMES` (the
  page's `SHOP` map: add a new one in both) and never repeats the order id,
  which stays in Rick's copy. The bucket's own size limit is 50 MB since 16 Oct
  (it was 500 MB), the same as the catalog; it has no type allowlist on
  purpose (real clients' .numbers, .pages and .key files arrive typeless, and
  the files are only ever opened by Rick from the signed links in his own
  mail). ricktew-intake v31; the escaping test is 86 checks.
  First live run the same day: intake
  `o8faxgimwcqqbbm9p5lc`, a 6-second voice note (a song from Rick's Downloads
  through Chrome's fake microphone), both mails sent. The sweep takes
  `AUDIO=<wav>` for that fake microphone.
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
  **The receipt echoes nothing a stranger typed (15 Oct 2026, after TEWBEDO's
  link-echo find on another install):** it goes to the typed address from our
  own sender, so its subject is fixed (`AI Ninja Intake received`), the business
  is not repeated, and the greeting uses the first name only when it is plainly
  a name (letters, `'`, `.`, `-`, no link or domain), else "Hi there". A submit
  with no Origin header is dropped like an acceptance (`no_origin`), as on the
  mailbox. The mail to Rick is unchanged.
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
  writes the third Offer and the llms.txt line. The chat box has no R2 entry yet.
  **Stripe (Tew's Inc, live), made by the Dojo session on 2026-09-05, IDs
  only, no keys:** product R2 Hosting `prod_VCduH2K4C7l0l5`; build $222
  one-off `price_1UCEeZ24k28tlk41Hdf0NMQM`; monthly $99
  `price_1UCEec24k28tlk41yWvcSEMc`; yearly $999
  `price_1UCEef24k28tlk41K1HC4woO`. Per client: one customer, one
  subscription on the monthly or yearly price with `trial_end` at the start
  of month two (the build fee covers month one; this is a per-client
  convention, nothing in Stripe encodes it), plus a one-off invoice on the
  build price. First client on it: The Prefer Clinic, starter invoice sent
  5 Sep 2026, subscription trialing to 1 Oct 2026. The two older installs
  (Evercool, SabaiSen) keep their own per-client subscriptions. The Dojo's copy of the fact:
  `~/Dev/digitaldojo/docs/Digital Dojo, Note 2026-09-05, R2 Hosting offer.md`.
  Rick wrote both "R2 Hosting" and "R2 Hosting"; the page says R2S until he
  rules.
- **Rick's visual rulings on this page (2026-09-05), which apply to every
  new page:** one weight per paragraph (a half-bold lede reads "bubbly and
  unprofessional"); round pill shapes only on things you can press; never
  tag a field "optional", just ask.
- **Shop orders (30 Sep 2026, Rick's yes):** a Shop helper's Payment Link
  lands the buyer on `/aininja/start/?sku=<SKU>&plan=<yours-to-run|we-run-it>&order=<Stripe checkout id>`.
  The page holds each value to a fixed shape and keeps it with the saved sheet.
  It shows "This sheet is for your order: ..." (`SHOP` in the page script maps
  SKU to name) and sends `purchase` with the submit. The endpoint checks the
  values again: a bad SKU drops the whole purchase, and a bad plan or order
  drops just that value. It writes "Bought in the Shop:" into the sheet, puts
  `purchase` in intake.json (NOT the table, which has no column for it), adds
  `X-Intake-Sku`, `X-Intake-Plan` and `X-Intake-Order` to the Ninja mail, and
  puts the same line in the receipt. The subject prefix and `X-Intake-Id` are
  untouched.
- **Tests, run both after any change:**
  `./supabase/functions/ricktew-intake/run-escaping-test.sh` (74 offline
  checks: hostile submission, both mails, the Markdown, the gauntlet, paths
  from another intake refused) and `node tests/intake-sweep.js` (Playwright,
  serve the repo on 8765: every option tapped, autosave across a reload, a
  mocked upload and submit, phone overflow, address wall). First real
  end-to-end intake: 2026-09-05, id `9ztegx65t1yxqadwpyx0`, both mails
  delivered, TEST in the name.

**The done-for-you page, `/aininja/done-for-you/` (2026-09-27, Rick's GO
on the SEO run).** A short page written on the words buyers actually type
("done for you AI automation", "for small business owners"; "AI ninja" and
"Digital Dojo" get no Google suggestions), because the 9,000-word landing
page is about twenty things and Google showed it 5 times in 28 days. Every
line on it is taken from `/aininja/`: nothing new is claimed there, so a
change to a claim, a price or one of its five FAQ answers on the landing
page must be copied here too; `tests/agent-door-build.py` now fails, naming the line, if a sentence in its jobs tiles, plan cards or FAQ answers is no longer on the landing page or a dollar figure is not in the landing cost answer (its ADAPT list holds the only allowed rewording). Its ld+json (a Service with the two offers,
prices read from the landing page, plus a FAQPage) is written by
`tests/agent-door-build.py`: never hand-edit it. In the sitemap, in
llms.txt, linked from the landing page footer ("Done-for-you AI, in
short"). Same day, same ruling: the landing page's title is "Done-for-you
AI for small business, managed by a real person" and it sells a SERVICE run
by a person (Rick manages the AI ninjas, a person checks the work, the
client's team presses send), not AI agents. The service itself did not
change; Rick: "it is our service, ... explain our offer better". The audit
is free (his ruling, 27 Sep), and one desk is how every Dojo starts, not a
separate price.

**Before you touch the endpoint, run its test:**

```
~/Dev/RickTew/supabase/functions/ricktew-contact/run-escaping-test.sh
```

It transpiles the real endpoint, stubs only the mailer, drives a hostile
submission through it and reads every tag in the produced mail, then drives
four real probe bots, two real people and a POST with no Origin header
through the real handler. Twenty-one assertions. No secrets, no inbox, runs
anywhere. The kata is explicit that the escaping half is the one check a
person reading the code reliably passes and the code reliably fails, and two
earlier installs shipped that exact bug.

**The nonsense check is the Dojo's file, not this repo's (2026-09-12).**
`gauntlet.ts` beside `index.ts` is `~/Dev/digitaldojo/kits/mailbox/gauntlet.ts`
copied in verbatim; `index.ts` imports it. Fix it in the kit and re-copy,
never edit the copy: a local rewrite is how the August version drifted one
point too shy and passed four probes to the Ninja Agent in one night, each
of which got an answer. Same day, a second wall: a POST with no Origin header
is dropped like an acceptance (`no_origin` in the log). Every browser sends
Origin on this cross-site POST, including the page's own WebMCP tool. Be
clear about what this wall does and does not do: the September bot copies
the Origin header (its hits after the deploy all dropped as `nonsense` at
score 5, none as `no_origin`), so the gauntlet is what stops it; the Origin
wall costs nothing and catches only the careless script. The page's `fetch`
at the `ENDPOINT` line is the endpoint's only legitimate caller, and
`llms.txt` points assistants at the tool, not the URL. Keep it that way: a
new caller that posts from outside a browser is dropped silently.

**The send cap (16 Oct 2026, Rick's click after the Dojo's security pass;
reworked 27 Oct 2026 after its second pass).** Every accepted question draws
the Ninja Agent's reply to the address typed, so one visitor gets 5 questions
an hour, counted in `public.aininja_intake_gate` under door `mailbox` (a
keyed hash, never the IP) and only AFTER every other wall, so a bot's junk
never uses up a person's allowance. The count and the row are one call to
`public.aininja_gate_hit` (one transaction, a lock per door), so a parallel
burst counts itself. The site's first 100 questions of the day go as usual;
from the 101st to the 300th the mail still reaches Rick, marked
`Auto-Submitted` and `X-Mailbox-Held: day` with a "Held" line, so the Ninja
Agent sends nothing to the typed address (TEWBEDO's guard skips any mail
carrying Auto-Submitted) and a filled day no longer silences real messages;
past 300 it is a silent drop. Paid, plan and site messages are door `notice`
(10 an hour per visitor, 300 a day), counted apart, so a flood of questions
never silences a Paid press. Over a cap is a silent drop (`rate_visitor`,
`rate_day`, the whole message in the line). **If the gate is unreadable the
message is dropped too** (`gate_unavailable`, the whole message in the line):
it fails closed, the kata's rule, because a broken count must not open the
door to mailing any address a stranger types (until 27 Oct it went ahead).
Drop lines are cut at 20,000 characters, like the Intake's. ricktew-contact
v40; the escaping test is 57 checks.

**Read the drop log WEEKLY: Supabase keeps it 7 days on Pro** (it said
"monthly for the first quarter" until 27 Oct 2026, which outlived the log
by three weeks). Supabase logs, filter
`event_message like '%ricktew-contact drop%'`. A rejected submission is
deliberately indistinguishable from an accepted one, and a mail pipe that is
down never reaches the visitor, so this log is the ONLY place a lost message
or a broken sending key shows up. That is not paranoia: a wrong key produced
a flawless confirmation and sent nothing during the build, and one logged line
caught it in seconds.

`supabase/` is excluded from the Pages build by `_config.yml`, so the endpoint
source is not served at ricktew.com. It was, briefly, until 2026-08-23.

**Kata:** `~/Dev/digitaldojo/packs/mailbox.md`. Receipts and the two
findings this install sent back: `~/Dev/digitaldojo/private/proof-ledger.md`.

---

## The Shop: /aininja/shop/ (live 2026-09-30)

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

---

## PromptPay for payers in Thailand (17 Oct 2026)

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
  audio and video priced on top). Not linked from `/hininja/`, so the six
  month comparison with `/gns/` stays clean. Still to build and test, in
  the app, before the full move: the $2,222's audio and video reply path,
  one end-to-end test purchase, the lesson videos, belt tests.

---

## /gns/: Gooffy Ninja ShhT!! (moved from NinjaGym 2026-09-28)

**GNS MOVES TO NERDHOSTEL (Rick's click, 22 Oct 2026, "Move GNS to NerdHostel").**
His words: "we can integrate that into nerdhostel somehow as it can explain the
ninja perks and we can likely just move that one over to nerd hostel and remove
from ricktew. We might even just have ricktew types book direct on nerdhostel if
that is easier to keep the one booking system functional". The GNS page and its
booking go to nerdhostel.com, built by the NerdHostel chat (`~/Dev/nerd-hostel`,
one booking system: 6 men's + 6 women's beds, one row a bed, Stripe and
PromptPay). This chat keeps ONE relaxed HI page (the preview at
`/hininja/next/`, built 22 Oct to his brief) whose Book button goes to
NerdHostel's GNS booking with `?src=ricktew`, and once NerdHostel's page is live
`/gns/` FORWARDS there (query string kept, so ad and post links still count),
leaves the sitemap and llms.txt, and the `/hininja/buy/` relay for HIN-GNS-2W
retires (the held checkout code is not touched). The HI Ninja ads land on
NerdHostel's page; the gclid counting moves into NerdHostel's bookings (TEWBEDO
told). The 12-reader round runs on the finished path. Until NerdHostel's page is
live, everything below stands and nothing here changes.
**Later the same day, Rick's picks:** "NerdHostel first, GNS as upgrade" (in
TEWBEDO; NerdHostel is the front door, ninja and AI are upgrades) and, on an AI
Ninja stay, "Add-on first": "Build it with Rick" as a weekly add-on at
NerdHostel, no ads, its own two weeks only if it sells (research, private, in
`.claude/research/2026-10-22-ai-ninja-stay-*.md`: AI-trip searches about 350 a
month against ninja's 850; nobody sells it).

Rick's live-in 2-week ninja program on Koh Samui ($2,222, +$1,000 a week).
Rick, 28 Sep: GNS belongs on ricktew.com/gns, not NinjaGym. The NinjaGym
session handed over everything it knew in
`~/Dev/GNS/GNS-HANDOFF-from-NinjaGym.md` (brand rules, the quiz, the vault,
open items); read it before changing the page. Canonical program docs:
`~/Dev/GNS/GNS-*.md`.

- **The page is a static port, word for word,** of the Next.js page that
  ran at ninjagym.com/gns: `gns/index.html` (markup and CSS) and
  `gns/gns.js` (belt tabs, the vault, the branching quiz, the scroll
  motion). The GNS look lives only on GNS pages: dark "ninja night",
  orange `#ff7a1a`, red `#e23b2e`, Bangers / Nunito / Fredoka. It is its
  own sub-brand, so the light-page and door-bar rules do not apply to it.
- **Enroll goes to the checkout (since 12 Oct 2026, Rick's click after the
  GNS persona round: 7 of 7 readers were put off when Enroll landed on the
  blue AI page).** The four Enroll Now buttons and the quiz's enroll buttons
  go to `/hininja/buy/?sku=HIN-GNS-2W&src=gns`, the HI page's Buy step into
  the Dojo's one checkout. `src=gns` tags the order as this page's for the
  6-month comparison; `gns.js` turns a post's `?src=instagram` into
  `gns-instagram`. The all-sales line sits under the price-section Enroll, as
  under the HI page's Buy. A buyer who cancels at checkout returns to /gns/
  when src is "gns" or starts "gns-" (the Dojo's checkout, beae04a, 12 Oct);
  any other src returns to /hininja/. Success lands on /hininja/thanks/. NinjaGym removed GNS on 28 Sep (its checkout,
  bookings table and images are gone; ninjagym.com/gns, /gns/* and
  /gooffy-ninja 308 here). **A question stays on /gns/ (21 Oct 2026, Rick:
  "it used to have its own ... Obviously it should not go there"):** the page
  has its own ask box, `#ask` ("Shh, ask first", name, email, question),
  posting from `gns.js` to the mailbox with subject `hininja`, the first line
  "About: Gooffy Ninja ShhT!!, from the GNS page." (plus ", private 1-on-1
  sessions with Rick" from the quiz's private button), a post's `?src=` when
  it is on the mailbox's list (else `gns`), and the trap field outside the
  form. The footer Contact, the baht view's "Write to me" lines and the
  quiz's buttons all point at `#ask`; no link on /gns/ goes to /aininja/ but
  the asset files (the sweep fails on one). History: Contact went to
  ninjagym.com/contact, then from 28 Sep to the AI page's mailbox as a
  stopgap, and /gns/ was never re-pointed when /hininja/ got its own form on
  9 Oct; 8 of 12 head-to-head readers landed on the blue page and 6 would
  have quit. The `?about=gns`, `gns-private` and `gns-ask` presets stay on
  /aininja/ for links already out. The Ninja Agent's auto-reply answers them
  from the chat box's `hininja` entry, then Rick follows up. Never edit
  anything in `~/Dev/NinjaGym`.
- **The head-to-head round of 21 Oct 2026** (`playtest/reports/2026-10-21-h2h-SUMMARY.md`,
  12 types, each reading BOTH pages, Rick's pick "12 types"). Vote /gns/ 7,
  /hininja/ 5, but 9 of 12 voted for the page they started on: the split by
  type is the signal. Every fun-nerd and traveller type went /gns/ (gamers,
  skeptic nerd, nomad, backpacker, team, couple); every careful type went
  /hininja/ (woman alone, careful beginner, parent with a teen, 54-year-old,
  bad knee). Legit: /gns/ 9 of 12, /hininja/ 3 of 12 (side by side, against
  6 of 7 read alone on 12 Oct). 12 of 12 named the /gns/ photo grid as the
  proof; 12 of 12 were confused by the door bar on /hininja/ ("is this an AI
  company?"); 0 would buy now, 12 would write first. Rick's clicks the same
  day: /gns/ gets its own ask box (above); /hininja/'s "Got an injury, or not
  very fit?" is copied into the /gns/ FAQ word for word; the /gns/ photo grid
  and caption go on /hininja/ after "What it is" (`figure.proof`), to be
  swapped for today's adult class shots when he sends them. **Then his two
  picks: the HI Ninja ads land on /gns/** (TEWBEDO builds the Google Ads
  campaign, "HI Ninja ...", in the shared account; this chat owns the facts,
  the ad words, the page and the sale's source), **and ad sales are counted
  on our side, no Google tag:** the page packs the ad's campaign and Google's
  click id into the Buy's `src` (the relay and the checkout already take
  `[A-Za-z0-9_-]{1,200}`, so the held ricktew-shop code is not touched) and
  the ask box carries the same to the mailbox; TEWBEDO uploads the sales.
  **The counting is LIVE since 22 Oct 2026; the ads are NOT started** (Rick,
  22 Oct: "just prepare the ads but we will not start yet until we get clear
  set up for the page and still waiting on the personal review note etc for
  the pages"). How it works: an ad visit's `gclid` (or `gbraid` / `wbraid`)
  plus `cid` (the campaign's final URL suffix `cid={campaignid}`) makes the
  Buy's src `gns-gads-<campaign>-<g|b|w><click id>` (`gns.js`; a click id off
  `[A-Za-z0-9_-]` or past 200 in total is left off, a missing cid is `0`; the
  ad wins over a post's ?src=); the ask box posts `source: "gads"`,
  `adCampaign` and `adClick: "gclid:<id>"`, and ricktew-contact (v34) holds
  both to a fixed shape and writes an "Ad:" line plus `X-Ad-Campaign` and
  `X-Ad-Click` into the mail, NOT Auto-Submitted (the Ninja Agent answers it).
  Nothing is kept in the browser. The Privacy page has the "Ads:" line, Rick's
  pick of the full wording (dated 22 October 2026). Known gap: Stripe's own
  back arrow returns to a bare /gns/, so a second Buy after it loses the tag
  (the browser's Back keeps it); the fix (src on the cancel URL) is the held
  checkout code, at the full move. The ad V1 (headlines, descriptions,
  callouts, sitelinks, search words, the data TEWBEDO reads) waits in
  `.claude/gns-ads-v1.md` (private) until he says start.
  /hininja/ stays live as the HI door.
- **Rick's clicks of 22 Oct 2026 on the round's other findings** (yellow boxes
  in his Chrome): the door bar off every HI page (above); the /gns/ adult photo
  grid moved up into the /hininja/ hero, the Phi Phi jump kick left the page and
  its share card (the old history page keeps it); "The goofy is the whole
  point. Every session is silly" became "Sessions are relaxed and fun, and they
  are backed by more than 25 years of real ninja training, taught around the
  globe." on /hininja/ only; the ages 16, 19 and 21 left both pages ("Teaching
  since his teens" stays; /gns/'s USA world file and quiz lost "at 16", "at
  19", "at 21"); the /hininja/ form opens with "About: the 2-week live-in
  program on Koh Samui." (was "I want this Tew: a spot on Gooffy Ninja
  ShhT!!"); both pages' FAQ gained "Is there a private room, or a room for
  two?" ("No private rooms" is his fact). **His facts the same day:** meals
  stay included as the pages say ("if both already say included keep it for
  now"; normally 2 a day; none of the 12 readers decided on meals, 10 asked how
  many); "we are selling the training and the housing and meals are optional at
  no added costs" (no discount for one's own place); GNS runs with NerdHostel
  to keep its rooms full from January, **max 6 men and 6 women per 2 weeks**,
  and this chat and the NerdHostel chat must share one count so nobody is
  overbooked (the checkout asks only the arrival date and checks no capacity);
  age: 16 and over, a parent of an under-18 signs extra documents and need not
  stay. Research done (no Thai law bars it; the hostel's rule decides), Rick's
  click "Write first, parent signs", and NerdHostel's yes (22 Oct: 16 and 17
  alone with a parent's signed consent, the normal shared dorm; whether it is
  a licensed hotel is NOT answered, so no licence claim on any page). So both
  FAQs carry, after "Can I bring my family or kids?": "I am 16 or 17. Can I
  come on my own?" / "Yes, with a parent's signature on the papers: the
  enrolment, a travel consent letter and a medical consent. Write to me before
  you book." (/hininja/next/ had it from the start.)
- **The GNS round of 12 Oct 2026** (`playtest/reports/2026-10-12-gns-SUMMARY.md`,
  7 readers in Rick's audience plus the find-them research). All 7 were UNSURE
  the training was real until the sealed file, because the open page showed no
  real person. Rick's clicks, the same day, on BOTH pages unless named: the
  Asia file's "Inside NinjaGym on Koh Samui" photo sits in the open after
  "What is it" (GNS page; the file keeps it too); "Beginners to seasoned
  fighters" became "Built for beginners. Trained before? Welcome too."; "Not a
  fight camp. No sparring unless you ask." (GNS "All welcome" panel and FAQ,
  HI FAQ); and the date fact: arrive any day, classes run all year, the next
  group is 22 January 2027. Second batch, same day: the GNS evening review
  reads "Optional, club-style practice with the group." (as on the HI page);
  the GNS Stay row adds "A women's dorm on request."; the tape is "RTMS 2000"
  (was TRMS); both pages' FAQ gained "Already have a place on Samui?" in the
  quiz's words; both "What is it" paragraphs say "The art is Rick's own system,
  Modern American Ninjitsu (most people spell it ninjutsu)." (his spelling
  stays; the word is there for search). Years stay "more than 25" (Rick: "don't
  give away my age so plus 25 years is okay"). Not picked, do not re-ask: a
  no-smoking / no-steroids line, swapping the Muay Thai banner photo. Photos:
  no current adult shots of the center were found on the external drive or in
  the NinjaGym gallery (kids only); the slot waits for his.
- **The vault's tapes and world photos are not copied:** the page plays the
  same files `/aininja/` serves from `aininja/assets/story/ninja/`. Moving
  those breaks both pages.
- **The two "sticky" bars do not stick,** exactly as on NinjaGym (the page
  root has `overflow-x:hidden`). Switching them on puts the enroll bar over
  the hero's Enroll button on a phone and a 900px laptop; Rick's call.
- **Test:** `node tests/gns-sweep.js` (serve the repo on 8765): desktop and
  phone, links, every Enroll target (checkout, with and without a post's
  ?src=, and the quiz's enroll button), the three slot prefills, belts, the
  vault, 40 quiz walks.
- In the sitemap and in llms.txt (HI door section, via
  `tests/agent-door-build.py`). Not linked from `/hininja/` or the front
  page; on NinjaGym it was not in the nav either. Since 9 Oct 2026 the new
  `/about/` (The Map) sends its live-in camp section and the quiz's camp
  answer here, on Rick's pick "GNS", in the GNS page's own words.

---

## Site Purpose

- About Rick Tew (who he is, what he does)
- Showcase of every product, game, app, and business
- Static for security — no backend, no CMS, no server logic
- Looks current, uses modern HTML/CSS tech

---

## Who runs the site: Rick Tew Co., Ltd. (21 Oct 2026)

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
