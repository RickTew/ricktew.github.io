# /aininja/: prices, plans and page rulings

Moved word for word out of CLAUDE.md on 29 Oct 2026 (CLAUDE.md had passed the 150k-character limit for
instruction files). CLAUDE.md keeps the short rules and points here. Add new rulings on this subject HERE.

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

### R2 HOSTING IS "R2 MANAGED HOSTING" (29 Oct 2026, Rick: "adjust our R2 Hosting to say, R2 Managed Hosting and explain what that is")

Every page, the chat box, the Terms, llms.txt and the JSON-LD, the mailbox label (ricktew-contact v41) and the
Intake's option label (ricktew-intake v32), in a71cd0a. The word is explained in one sentence where the card
contrasts a normal host: "Managed means you send me a message instead." The PromptPay payee "R2 Hosting Thailand"
stays (it is the name on the client sites and bills). TEWBEDO synced ask.js (81d94d3), and the Stripe product on Rick
Tew Co. is "R2 Managed Hosting, the month". Older lines in this file that say "R2 Hosting" mean the same offer.
**His BAM idea the same day is NOT live:** a free first build (Booking, App, Messages), with R2 Managed Hosting, the
agents and his oversight paid. Nothing about BAM or "free" goes on a page until the Digital Dojo's package exists
(his click). Open steps are in `.claude/NEXT-SESSION.md`.

**Later the same day (Rick: "do NOT say, ME or anywhere say ME or Rick as the ME in promises ... do not trap me"):**
every promise line on the AI Ninja door (the plan cards, How it works, the FAQ, the quiz results, the storyboard, the
search pages, the chat and the Intake) is "we / us" or generic. The story, the cases and "Why I do this" stay in his
voice (4b58ece, c48274d). The Terms (d9a6c70) say "we" means Rick Tew Co., Ltd., and add four things. Section 2: what
the monthly fee covers (fixes and small changes to what is there; anything above the norm we decide is an added fee,
quoted first). Section 3: the first month is a trial both ways, and we may stop at the end of a paid period. Section 4:
the build and app are ours even when free; the data (customers, records, content) is theirs; a domain we register
stays ours, one they own stays theirs. New FAQs: "Do I own the app?" and "What counts as a fix or a small change?". A
new page, answer, ad or video follows the rule from the start.

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
