# Priya, the clinic owner with fifteen minutes - 2026-10-01

Round five. Read on a phone profile (headless Chromium, iPhone 13, 390 x 664, touch), live https://ricktew.com/aininja/ . The page is 46,550 px tall: about 70 phone screens. About 20 minutes in character: chat box first, then a thumb scroll top to bottom, the quiz once, one "I want this Tew" button, and the mailbox filled as "Priya (test)" / priya@example.test and left unsent.

Safety: the route block on `functions/v1/ricktew-(contact|intake)` was armed before every page load in all seven browser runs and logged nothing, because nothing tried to reach either endpoint. The mailbox and quiz runs also listened for any POST and recorded none. The send button was never pressed.

## Verdict in one line
Priya would write one short question in the mailbox, not sign up. By screen 4 she knew it does bookings and drafted replies, that Rick does the computer work, and that it costs $2,222 a month. What she could not tell is whether a clinic that only wants bookings and replies needs the $2,222 plan or the $222 one. Her own quiz result then said $2,222 "does not add up yet." So she writes to ask.

## Moments of friction (the core of the report)

1. **WHERE:** the top screen, "I'm not a marketing expert. I'm the person behind your AI ninjas." **Expected:** the word bookings, replies or a price. **What happened:** about 15 seconds to get "he builds AI helpers for one business, and either I run them or he runs them with me". Nothing on it says bookings or what it costs. **Feeling:** "I didn't come for marketing. Is this even for a clinic? Let me just ask the box." **Severity:** annoyance. (Not proposing changes; noted for timing.)
2. **WHERE:** screens 1 and 2, the photo and counters ("25+ years a ninja", "20+ years a nerd", "6,237+ rounds of changes since March", "100+ solutions built"). **Expected:** what it does for me. **What happened:** a portrait and four numbers that tell me nothing about my front desk. The counters were still rolling when I looked: one screenshot caught "22+" and "18+". **Feeling:** "Rounds of changes? Thumb, keep going." **Severity:** annoyance.
3. **WHERE:** Ask the ninja, my question "how much for a physio clinic". **Expected:** a number. **What happened:** "More than one answer fits that. Which one did you mean?", then a tap on "What does it cost?". The answer is three paragraphs plus a Tew Tip, the longest thing I read all session. It names $2,222 and the $222 + $99 plan, a free audit, "one desk on its own ... at the same flat price" and "a custom job quoted in writing". **Feeling:** "I asked one question and got a contract." **Severity:** annoyance.
4. **WHERE:** Ask the ninja, "does it work with Cliniko". **Expected:** yes or no. **What happened:** "I do not have that one, and I would rather say so than guess. Rick does: ask him directly." Honest. But for a clinic this is the real question: does it sit on the booking software I already pay for, or replace it? Nothing on the page answers that. **Feeling:** "Fine, I'll ask him. That's one more email." **Severity:** annoyance.
5. **WHERE:** the two cards in "Hate tech, tired of it, or no time for it." (screens 3 to 4). **Expected:** the card that says "bookings". **What happened:** R2 reads "Your website or small app, with the forms that bring work in." Your Dojo reads "I manage the AI ninjas that draft every reply and file every payment." Bookings only show up in the How it works box under the cards ("the drafts, the filing, the bookings"). **Feeling:** "So is online booking the $222 thing or the $2,222 thing? That's ten times the money." **Severity:** annoyance, and the biggest one of the session.
6. **WHERE:** the button "I want this Tew" (on every card and in the header). **Expected:** a label that says what happens: write, book, buy. **What happened:** I tapped the Your Dojo one. It jumped about 64 screens down to the mailbox with a useful prefill. That works, but nothing told me where it would go, and "Tew" reads like a product I haven't heard of. The empty name field then lit up with a red outline, which looked like I had already made a mistake. **Feeling:** "Did I just order something?" **Severity:** annoyance (the red ring is cosmetic).
7. **WHERE:** the five-box storyboard under How it works (screen 5). **Expected:** "The clinic's Dojo" flashing in the drawing looked like a tab for me. **What happened:** it is a rotating caption, not a button (bakery, clinic, salon cycle by themselves). Tapping it does nothing. Then a vocabulary lesson: Dojo, ninja, seat, belt, sensei. **Feeling:** "It said clinic and then wouldn't let me in." **Severity:** annoyance.
8. **WHERE:** "No pitch. Just what got built." with "What you see on social right now." and "I'm not from that playbook." (screens 6 to 8). **Expected:** more about the service. **What happened:** four made-up YouTube thumbnails and a long card about a Side Hustle Summit, a $1,995 program and a $597 cold-email platform. **Feeling:** "Why am I reading about somebody else's webinar? I have a patient in nine minutes." **This is where I would have closed the tab**, about four minutes in, with my answers already from the chat. **Severity:** would-quit.
9. **WHERE:** "Five months. Solutions and goals. One reason." (screens 9 to 22). **Expected:** proof for a business like mine. **What happened:** fourteen screens of the gym, kids, playlist songs, books from his twenties, a board game, a console, WinJitsu. The one line that mattered to me ("4,985+ app bookings since April") is buried on screen 9. **Feeling:** pure thumb scrolling. **Severity:** annoyance.
10. **WHERE:** "Just a few of the apps I've made recently". **What happened:** a moving row of phones, mostly games (Dungeon Hole, AstroHold, TEWGO), then a row of icons. **Feeling:** "I run a clinic, not an arcade." **Severity:** cosmetic.
11. **WHERE:** "Six Agentic Masters. I run them. You hold the press." **Expected:** nothing; I thought I'd seen the offer. **What happened:** Agentic CMO, Head of Customer Care, Chief of Staff, Head of Content, CFO, CTO, each "On the mat". By now I have met ninjas, desks, solutions, seats, Masters and a Dojo. **Feeling:** "Which of these am I paying for? Is a CFO extra?" **Severity:** annoyance.
12. **WHERE:** "Your own Digital Dojo. Built by a sensei." (screens 42 to 47). **What happened:** the same two prices again, this time in the opposite order (Your Dojo first, R2 second; at the top R2 came first), under a different headline, with a red label where the top one was blue. Then the same two cards a third time in the Claudeforce band (screen 50), then a fourth time in the FAQ. **Feeling:** "Is this a different plan or the same one?" **Severity:** annoyance.
13. **WHERE:** "Somebody told you to get Claudeforce? Here is the honest bill." **What happened:** nobody told me that. Salesforce seat prices, a Marlow comparison, then the cards again. **Feeling:** skipped. **Severity:** cosmetic.
14. **WHERE:** quiz result. **What happened:** after I said I rent clinic software, it said: "Some of what you described is not a desk sitting on a system you already own, it is the system." Then: "by your own numbers that is about $1,300 a month back against $2,222 a month. It does not add up yet." The smaller start it offers, "one desk on its own, The Front Desk, as a build scoped and priced in writing first", has no number on it. **Feeling:** "So he'd replace my booking software? And the plan doesn't pay for itself for me? Then what does the small version cost?" **Severity:** annoyance.
15. **WHERE:** the bottom bar (Take the quiz / Ask / x). **What happened:** it covers about a sixth of every phone screen. At the mailbox it sits on top of the sentence under the send button. **Severity:** cosmetic.
16. **WHERE:** "This page is ready for the AI agents. Yours can be too." (just above the mailbox). **What happened:** a band about assistants, a browser trial and tools an agent can call. **Feeling:** "Is that a third thing he sells? I don't have an assistant. I have a receptionist." **Severity:** annoyance.

## Moments that worked

- **"You do not want it explained. You want it done."** then **"Good. That is who I build for. You press one button and I think about the rest."** That's me, word for word.
- **The How it works box** (screen 4): "You tell me the job. / My AI ninjas do the legwork: the drafts, the filing, the bookings. / A person checks it. Nothing goes out without a press. / I manage all of it and report to you in writing." This was the clearest thing on the page. It answered "will a robot message my patients?" before I could ask.
- **Prices are on screen 3.** No "book a discovery call to find out". "Any number of people" matters with four therapists and a receptionist, and so does "The AI is in the price."
- **Chat, bookings:** "At my spa it also knows the furniture: three foot chairs, two beds, one mat, and each therapist's call-in notice, so it only offers a slot the room can actually hold." That sounds like my clinic. It's the only line anywhere that did.
- **Chat, who does the setup:** "The best owners I work with never open the tools. They approve drafts on their phone between customers." That is literally how I'd use it.
- **Chat, the honest miss** on my booking software. It didn't make anything up.
- **The quiz's honest maths:** "It does not add up yet, and I would rather say so than sell it." I trusted him more after that line than after anything else. The quiz took about a minute, asked for no email, and the questions were in my language ("Scheduling. Does Tuesday work, can we move it, are you free").
- **The want-button prefill:** "I want this Tew: Your Dojo, $2,222 a month. ... What I do: / What eats the hours right now: / When I would like it running:". Three blanks I could fill in 30 seconds between patients.
- **FAQ:** "Can I get just one desk?", "What happens if you disappear?" ("You lose the window, not the room") and "Can I cancel?" Short, and closed until I opened them.
- **The full Your Dojo card's "Not included" list.** It's the only place that says plainly what I would still pay for elsewhere.

## Section by section

0. **(top screen, not rated)**: "I'm not a marketing expert. I'm the person behind your AI ninjas." (screens 0 to 2). About 15 seconds to "AI helpers for a business"; no bookings, no price yet.
1. **KEEP**: "Hate tech, tired of it, or no time for it. You still want it to work." (screens 2.5 to 6). The two prices, "I think about the rest" and How it works. Everything I came for, in four screens.
2. **LOST**: "No pitch. Just what got built." (with "What you see on social right now." and "I'm not from that playbook.") (screens 6 to 8.6). A YouTube summit takedown. I thought I'd clicked onto a different page.
3. **SKIP**: "Five months. Solutions and goals. One reason." (screens 8.6 to 22.7). Fourteen screens of his gym, songs, books and games. Nice man, not my problem.
4. **SKIP**: "Just a few of the apps I've made recently" (screens 22.7 to 24.2). Mostly games.
5. **SKIP**: "The website is not the machine. It is the handle." (screens 24.2 to 27.5). The spa example is close to me, but it's a metaphor and I don't have time for metaphors.
6. **REPEAT**: "Most people do not want an app. They want the job done." (screens 27.5 to 29.3). "You do it / I do it" is the hero's "either you run it yourself or I run it with you" and the How it works box again.
7. **SKIP**: "Using AI and operating with it are not the same thing." (screens 29.3 to 31.9). An essay. I wasn't arguing.
8. **REPEAT**: "You run the business. I run the ninjas that do your admin." (screens 31.9 to 33.2). His bio and the counters from screen 2 ("rounds of changes since March") again. The headline comes back as a subhead at screen 47.
9. **KEEP**: "The solutions. Every one ran on me first." (screens 33.2 to 36). The Booking Desk and The Front Desk, named for exactly my two problems. Eleven rows plus "The helpings" is a lot, though.
10. **LOST**: "Six Agentic Masters. I run them. You hold the press." (screens 36 to 40.4). CMO, CFO, CTO for a physio clinic? I stopped knowing what I'd be buying.
11. **KEEP**: "Your own Digital Dojo. Built by a sensei." (screens 40.4 to 47.6). The full card is the one I needed: free audit, not included, cancel anytime. It's still the second time I'm reading those prices, and in a different order.
12. **SKIP**: "Somebody told you to get Claudeforce? Here is the honest bill." (screens 47.6 to 51.7). Nobody did. The cards a third time.
13. **KEEP**: "Twelve questions. Then you tell me if I'm wrong." (screens 51.7 to 53.6). A minute of taps and an honest "does not add up yet". Worth it.
14. **REPEAT**: "You keep the judgment calls. I keep the machine moving." (screens 53.6 to 55). Audit, first ninja, widens: same as the three steps in section 11 and the chat's first-month answer.
15. **REPEAT**: "Same job for 25 years. New tools." (screens 55 to 55.9). The gym and the bio again.
16. **SKIP**: "I like to build." (screens 55.9 to 60.4). Old tapes, Europe, a supply shop. Not why I came.
17. **REPEAT**: "Why I do this" (screens 60.4 to 61.9). "Not a marketing expert" from the top screen; "a friend ... asked me to just do it" from section 3.
18. **KEEP**: "The questions that come up every time" (screens 61.9 to 64). Cost, one desk, first month, cancel. Closed until tapped, which suits me. Same words as the chat box.
19. **REPEAT**: "Asked for, shipped, and now part of the Dojo, waiting for you" (screens 64 to 66.1). The gym app, the $5 till and the 1998 factory, all already told in section 3.
20. **LOST**: "This page is ready for the AI agents. Yours can be too." (screens 66.1 to 68.1). A third thing for sale? For robots?
21. **KEEP**: "One message. I read every one." (screens 68.1 to 70). The form, and the prefill from the button.

**Counts (21 rated sections):** KEEP 6, SKIP 6, REPEAT 6, LOST 3.

Repeats Priya noticed across sections: the two price cards (screens 3, 42 to 46, 50, plus the FAQ and chat); "Want the whole day run for you? That is a custom price, and we talk first." (screen 4, the full card, the note under it, the Claudeforce band, the FAQ, the chat); "Nothing for you to log into, renew or fix." (the R2 card, the storyboard, the full card, the note, the FAQ); the friend who said "could you just do it for us?" (sections 3, 17, 19).

## The moment I knew

**Section:** "Hate tech, tired of it, or no time for it. You still want it to work.", at the How it works box, **about 4 phone screens down** (screens 3.3 to 4.5).

By then I could say all four:
- **What he sells:** his AI helpers do the admin (the drafts, the filing, the bookings), and he manages them.
- **Who does the computer work:** him ("I think about the rest: the tech, the AI, ... the thing that broke at 2am").
- **What it costs a clinic like mine:** $2,222 a month flat, any number of people, or $222 then $99 a month for the small version.
- **What to do next:** tell him the job ("You tell me the job"), with the button right there.

**What was missing before it:** the top screen talks about AI ninjas and a Dojo, not bookings, and has no price. Screens 1 and 2 are a photo and counters.

**What was still missing at that moment:** which of the two cards covers online booking; what "I want this Tew" actually does before you tap it; and whether it sits on top of the booking software I already rent.

**By chat instead:** about three minutes and five questions (bookings, cost with one extra tap, replies, setup, how to start) to get the same four answers. Scrolling got me there in about a minute. On this page the scroll beat the chat box, because the chat's cost and start answers are long.

## My third

If he cut this page to a third, here is what I would keep, in order:

1. The top screen, as it is.
2. "Hate tech, tired of it, or no time for it." with the two cards and the How it works box. I'd drop the storyboard from it.
3. The solutions list, rows closed. For a clinic the three that matter are The Front Desk, The Booking Desk and The Money Desk.
4. One copy of the full Your Dojo and R2 cards, with "Not included" and the free audit. That one replaces the short cards; I don't need both.
5. One proof block: the gym numbers (app bookings, members) and the spa line about therapists' notice and beds.
6. The quiz.
7. The FAQ: cost, one desk, first month, if you disappear, cancel.
8. The mailbox.

Plus the Ask pill, the whole way down. That comes to roughly 20 to 23 phone screens instead of 70.

## Words I did not understand

- **Dojo / Digital Dojo / Your Dojo**: a plan, a product and a brand at once.
- **AI ninjas, ninja, the sensei**: cute, but I had to learn them before I could read the prices.
- **"I want this Tew"**: Tew is his surname? Or a product?
- **HI Ninja door / "Which ninja?"** (top bar): a second ninja?
- **R2 Hosting**: what is R2? It's explained only on screen 45: "R2 is me, Rick Tew."
- **"on my stack"**: no idea.
- **The Front Desk**: confusing for a clinic, because my front desk is a person. Is he replacing her?
- **desk, seat, belt, white belt, "propose only"**
- **Agentic CMO / CFO / CTO / Head of Customer Care, "Masters", "On the mat"**
- **"rounds of changes"**
- **"draft-and-file work"** (quiz result)
- **"the factories behind your repeated work", "command center"** (full Your Dojo card)
- **Colleagues by Email, The Answer Engine, The Notebook, The Focus Funnel, TewBeDo, TEWBEDO, The Intake**
- **"audit"**: to a clinic owner that word means tax trouble until you read "where the hours go".
- **"AI to HI"**
- **Claudeforce, CRM, Marlow**
- **"Agent-ready", "the browser makers' trial"**
- **Ninja Agent** (the mailbox): another AI with a name?

## Did I understand what is sold, what it costs, and what happens next?

- **What is sold: yes.** "I manage the AI ninjas that draft every reply and file every payment. Your team checks it and presses send." plus "My AI ninjas do the legwork: the drafts, the filing, the bookings." (screens 3 to 4). The chat's Booking Desk answer confirmed bookings. Gap: which plan the bookings belong to.
- **What it costs: yes, with a gap.** "$2,222 a month, flat" and "$222 to build, then $99 a month". Gap: I can't tell which one a clinic wanting bookings and replies needs. The quiz said $2,222 doesn't add up on my numbers, and the smaller start it offered ("one desk on its own ... priced in writing first") has no number.
- **What happens next: mostly yes.** "You tell me the job." The button drops a prefilled message into the mailbox. The chat says "write in the mailbox at the bottom ... I reply myself, usually within a day", and the full card says "The audit first, free". Gap: the button's label doesn't tell you any of that until after you press it.

## The one change

On the two price cards at screen 3, say in plain words which plan gets a small clinic its online booking and its drafted replies. Right now the R2 card says "Your website or small app, with the forms that bring work in" and the Your Dojo card says "I manage the AI ninjas that draft every reply and file every payment". Neither card says bookings, and that one word decides whether I'm a $222 customer or a $2,222 one.
