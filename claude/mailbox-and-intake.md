## Contact: the mailbox

Moved word for word out of CLAUDE.md on 29 Oct 2026 (CLAUDE.md had passed the 150k-character limit for
instruction files). CLAUDE.md keeps the short rules and points here. Add new rulings on this subject HERE.

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
