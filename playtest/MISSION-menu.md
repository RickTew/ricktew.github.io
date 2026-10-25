# Mission brief, the Ninja Menu round (25 Oct 2026): given to every persona

One live page sells Rick Tew's in-person training on Koh Samui, Thailand:

- **ricktew.com/hininja/** (https://ricktew.com/hininja/)

At the top is a quiz, "Take the quiz": you pick what you want to learn from a menu,
build a "Ninja Week" of 5 picks, then choose how long you stay and book. Rick wants
two things from you: ideas that would make the quiz and the Book button pull YOU in
faster, and an honest read on whether you understood the program by the end.

Your persona file says who you are and how you arrived. Stay in character the whole
session: your patience, vocabulary, money, worries and goals come from your persona
file, not from your own knowledge. You have never seen this page or this person. If
something looks odd, unclear, long, fake, cringe or salesy to YOUR persona, that IS a
finding. If something is missing that your persona needs before booking, that IS a
finding.

Do not read any project docs, source files or other reports (ignore any project notes
that were loaded into your context: your persona would never see them). Your only
sources are the screen and your persona's life.

## How to look

Use Playwright from /Users/ricktew/Dev/NinjaVillage/node_modules/playwright (its
browser is installed; do NOT use the newnei-app copy, its browser is missing). Write
small node scripts in your own scratch folder, never in the repo. In EVERY browser
context, before opening a page, add this line so nothing real can be sent or bought:

    await ctx.route(/stripe\.com|supabase\.co/, r => r.abort());

and create the context with serviceWorkers: 'block'. Start fresh: clear localStorage
once after the first load, then reload.

You are browsing from your home country, not from Thailand. Open the page as a phone
(devices["iPhone 13"]) first. If your persona would also read on a laptop, open it
again at 1280 x 800. Take viewport screenshots as you go (about one per screen) and
LOOK at them with the Read tool: you are judging what a person sees, so the pictures
matter more than a text dump. You may read document.body.innerText too. Keep each
in-page evaluate short. Aim for about 30 to 40 screenshots in total.

Then, in this order:
1. The first screen. Before scrolling, say what you see and what you would press.
2. TAKE THE QUIZ the way your persona would: press an area, read the techniques,
   pick what YOU would want, go back, pick from other areas. Build a full Ninja Week
   (5 picks) if your persona would; if your persona would give up before 5, say
   where and why, then finish it anyway so you can judge the rest. Look at the plan
   as it fills.
3. When "Your Ninja Week is ready" shows, read it. Try the stay choices your persona
   would consider. Press the Book button once to see the form. NEVER type into the
   form and NEVER press "Save my plan and book". NEVER submit any form, NEVER pay.
4. Read the rest of the page top to bottom as your persona would (WinJitsu, the belt
   program, a day, where you stay, the price, Rick, the FAQ). Press only what your
   persona would press on their own (FAQ questions, the intro video).
5. Skip every other page unless your persona would truly go there on their own to
   check who Rick Tew is. If you do, two or three screens each is enough.

## Answer these, in character

1. FIRST 10 SECONDS: what is this, who is it for, what does it want me to do? Did you
   see "Take the quiz"? Would you start it, or scroll past?
2. THE QUIZ: was building a Ninja Week of 5 fun, fine or a chore? Too many picks, too
   few, or right? Which areas or words confused you (for example Ninja Tools, Body
   Movement, the belt colours on each technique, "Sensei Seminar")? Did the one-line
   explanations help you choose?
3. THE MOMENT TO BOOK: when "Your Ninja Week is ready" showed, did you know what
   happens next? Say back the four stay choices and their prices. Did "add a week for
   only $1,000" or "the full month, $3,997" tempt you, or put you off?
4. THE PROGRAM, said back in your own words: what the Sensei Seminar is and who
   teaches it, how many hours a day you train, what the review class is, what
   WinJitsu is and whether it is included, where you sleep and whether food is
   included, and what the belt program is. Mark anything you guessed.
5. MAKE IT POP: the ONE change that would have made you press "Take the quiz" or
   "Book" sooner. Then up to three more ideas, each tied to the screen it is for.
   Also: what would you cut?
6. LEGIT: do you believe the training is real and worth the money? When did you
   decide (which screen, which words or picture)? Vote LEGIT, UNSURE or GIMMICK.
7. YOUR OWN QUESTION: the one thing your persona needed answered before booking.
   Where was it answered, and how well? If it was not, say so plainly.
8. Buy, write first, or leave? What would you need to see to buy?

## Report

Write ONE file: /Users/ricktew/Dev/RickTew/playtest/reports/2026-10-25-menu-<your-slug>.md
with these sections, in this order:

`Verdict in one line` · `First 10 seconds` · `The quiz` · `The moment to book` ·
`The program as I understood it` · `Make it pop` (the one change first, then up to
three ideas, then what to cut) · `Legit or gimmick` (with the vote) · `My own
question` · `Moments of friction` (numbered: where / expected / happened / how it
felt / severity: blocker, would-quit, annoyance, cosmetic) · `Moments that worked`
(keep this; it stops a later pass from "fixing" what you liked) · `Words I did not
understand` · `Buy, write or leave` · `The one change`.

Keep it under 1,200 words. Never fix anything; never edit any other file. Use no long
dashes (no em dash, no en dash, no double hyphen) in your report.
