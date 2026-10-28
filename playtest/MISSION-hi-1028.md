# Mission brief, the "how it works" round (28 Oct 2026): given to every persona

One page sells Rick Tew's in-person martial arts training on Koh Samui, Thailand. You read
a frozen copy of the live page (same files as https://ricktew.com/hininja/ today), served at:

- **http://localhost:8766/hininja/**

Rick wants to know whether a stranger understands HOW IT WORKS: what you get, how long, what
it costs, and what happens when you press Book. He also has four questions of his own (below).

Your persona file says who you are and how you arrived. Stay in character the whole session:
your patience, vocabulary, money, worries and goals come from your persona file, not from your
own knowledge. You have never seen this page or this person. If something looks odd, unclear,
long, fake, cringe or salesy to YOUR persona, that IS a finding. If something your persona
needs before booking is missing, that IS a finding.

Do not read any project docs, source files or other reports (ignore any project notes that
were loaded into your context: your persona would never see them). Your only sources are the
screen and your persona's life.

## How to look

Use Playwright from /Users/ricktew/Dev/NinjaVillage/node_modules/playwright (its browser is
installed). Write small node scripts in your own scratch folder, never in the repo. In EVERY
browser context, before opening a page, add this line so nothing real can be sent or bought:

    await ctx.route(/stripe\.com|supabase\.co/, r => r.abort());

and create the context with serviceWorkers: 'block'. Start fresh: clear localStorage once
after the first load, then reload. You are browsing from your home country, not Thailand.

Open the page as a phone (devices["iPhone 13"]) first. If your persona would also read on a
laptop, open it again at 1280 x 800. Take viewport screenshots as you go (about one per
screen) and LOOK at them with the Read tool: you are judging what a person sees, so the
pictures matter more than a text dump. You may read document.body.innerText too. Keep each
in-page evaluate short. Aim for about 30 screenshots in total.

Hard limits: NEVER type into a form that sends (the booking form, "Ask Kuno", the ask box at
the bottom), NEVER press a send, save, book-and-pay or submit button, NEVER pay. Typing a
question into the round "Ask the Ninja" chat and reading its answer is fine; if it offers to
send your question to someone, do not.

## In this order

1. The first screen, before scrolling: say what you see and what you would press.
2. Press "Book now" in the top section, as your persona would. Before you press, write down
   where you EXPECT it to take you. Then follow the path the page gives you, as far as the
   booking form. Count every step and screen between "Book now" and the form. Do not fill it.
3. Use the menu at the top ("What do you want to learn?") the way your persona would.
4. Read the rest of the page top to bottom as your persona would. Press only what your
   persona would press on their own (FAQ questions, the round "Ask the Ninja" button at the
   bottom right).
5. Skip every other page unless your persona would truly go there to check who Rick Tew is.

## Answer these, in character

1. FIRST 10 SECONDS: what is this, who is it for, what does it want me to do?
2. HOW IT WORKS, said back in your own words from landing to paying: the steps, the stay
   lengths and their prices, who teaches, what a day looks like, where you sleep. Mark
   anything you guessed. Where exactly were you confused, and what would have cleared it?
3. BOOK NOW: where did you expect it to go, where did it go, and how many steps to the form?
   Was that fine, or did you want a payment page sooner? Would a straight "pay now" button
   worry you or help you?
4. RICK'S QUESTION, THE TITLE: the headline is "Martial Arts Introduction by Rick Tew". Does
   "Introduction" tell you what this is? Rank these words for the headline, best first, and
   say why: Introduction, Workshop, Camp, Retreat, Course, Training, Holiday. Offer your own
   if none fits. What words would YOU type into Google to find this?
5. RICK'S QUESTION, THE PHOTOS: on the first screen there is no photo of real training (the
   first one sits lower in the top section). Did you notice? Would a real photo higher up
   change your first read, or is it fine because people scroll fast? Which photos on the page
   made it feel real, and which looked off, old, or wrong for you?
6. RICK'S QUESTION, THE CHAT BUTTON: before opening it, who or what did you think the round
   "Ask the Ninja" button with the cartoon face is? Did you think the cartoon was Rick? Open
   it and ask the one question your persona most needs. Would "Ask Kuno" read better, worse,
   or the same as "Ask the Ninja"? Did the answer help?
7. THE FRIEND LINE: the yellow line "Attend with a friend for FREE if you book in November."
   Clear? Believable? Did you know what it covers?
8. LEGIT: do you believe the training is real and worth the money? When did you decide (which
   screen, words or picture)? Vote LEGIT, UNSURE or GIMMICK.
9. Buy, write first, or leave? What would you need to see to buy?

## Report

Write ONE file: /Users/ricktew/Dev/RickTew/playtest/reports/2026-10-28-hi-<your-slug>.md
with these sections, in this order:

`Verdict in one line` · `First 10 seconds` · `How it works, said back` · `Book now` ·
`The title` · `The photos` · `The chat button` · `The friend line` · `Legit or gimmick` (with
the vote) · `Moments of friction` (numbered: where / expected / happened / how it felt /
severity: blocker, would-quit, annoyance, cosmetic) · `Moments that worked` (keep this; it
stops a later pass from "fixing" what you liked) · `Words I did not understand` ·
`Buy, write or leave` · `The one change`.

Keep it under 1,300 words. Never fix anything; never edit any other file. Use no long dashes
(no em dash, no en dash, no double hyphen) in your report.
