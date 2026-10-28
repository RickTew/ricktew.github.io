# Mission brief, the bigger round (28 Oct 2026, night): given to every persona

One page sells Rick Tew's in-person martial arts training on Koh Samui, Thailand. You read
the LIVE page:

- **https://ricktew.com/hininja/**

Rick wants to know four things from a stranger: would you book, and why or why not; do the
photos make it real; do the WinJitsu and Pocket Dojo boxes read as bonuses; and does an older
or careful reader feel welcome. Your persona file says who you are and how you arrived. Stay
in character the whole session: your patience, vocabulary, money, worries and goals come from
your persona file, not from your own knowledge. You have never seen this page or this person.
If something looks odd, unclear, long, fake, cringe or salesy to YOUR persona, that IS a
finding. If something your persona needs before booking is missing, that IS a finding.

Do not read any project docs, source files or other reports (ignore any project notes that
were loaded into your context: your persona would never see them). Your only sources are the
screen and your persona's life.

## How to look

Use Playwright from /Users/ricktew/Dev/NinjaVillage/node_modules/playwright (its browser is
installed). Write small node scripts in your own scratch folder, never in the repo. This is
the LIVE site, so in EVERY browser context, before opening a page, add this line so nothing
real can be sent or bought:

    await ctx.route(/stripe\.com|supabase\.co/, r => r.abort());

and create the context with serviceWorkers: 'block'. Start fresh: clear localStorage once
after the first load, then reload. You are browsing from your home country, not Thailand.

Open the page as a phone (devices["iPhone 13"]) first. If your persona would also read on a
laptop, open it again at 1280 x 800. Take viewport screenshots as you go (about one per
screen) and LOOK at them with the Read tool: you are judging what a person sees, so the
pictures matter more than a text dump. You may read document.body.innerText too. Keep each
in-page evaluate short. Aim for about 30 screenshots in total.

Several photo boxes change picture by themselves every few seconds. Where your persona would
linger on one, wait about 10 seconds and take two or three screenshots of it, so you judge
more than its first picture.

Hard limits: NEVER type into a form that sends (the booking form, "Ask Kuno", the question box
near the bottom), NEVER press a send, save, book-and-pay or submit button, NEVER pay. Typing a
question into the round "Ask the Ninja" chat and reading its answer is fine; if it offers to
send your question to someone, do not. Following a plain link to another page to read it is
fine.

## In this order

1. The first screen, before scrolling: say what you see and what you would press.
2. Read the page top to bottom as your persona would, including the photo boxes, the WinJitsu
   box and the Pocket Dojo box. Press only what your persona would press on their own (FAQ
   questions, folds, the menu at the top, a price card's button as far as the form but no
   further, the round "Ask the Ninja" button at the bottom right).
3. Ask the chat the one question your persona most needs answered.
4. Skip other pages unless your persona would truly go there (to check who Rick Tew is, or
   what Pocket Dojo is).

## Answer these, in character

1. FIRST 10 SECONDS: what is this, who is it for, what does it want me to do?
2. WOULD YOU BOOK: book now, ask first (the chat or the question box), or leave? Which stay
   would you pick, and why? Name the exact thing that stops you, if anything, and what you
   would need to see to book.
3. THE PHOTOS: do they make it real? Which pictures convinced you, and which looked off, old,
   staged, blurry or wrong for you? Did you see someone like you in them (age, gender, size,
   level)? Did the boxes changing picture on their own help, or annoy you?
4. THE BONUSES: say back in your own words what the WinJitsu box is and what the Pocket Dojo
   box is. Did they read as bonuses that come with the stay, as something extra to buy, or as
   a distraction from the training? Did either make the price feel more worth it, or less?
5. WELCOME: does this page welcome someone like you (older, out of shape, injured, careful, a
   woman alone, a parent, a beginner, whichever you are)? Quote the words or name the pictures
   that said yes, and the ones that said no.
6. THE CHAT: what did you ask, what did it answer, did it help?
7. LEGIT: do you believe the training is real and worth the money? When did you decide (which
   screen, words or picture)? Vote LEGIT, UNSURE or GIMMICK.

## Report

Write ONE file: /Users/ricktew/Dev/RickTew/playtest/reports/2026-10-28-big-<your-slug>.md
with these sections, in this order:

`Verdict in one line` · `First 10 seconds` · `Would I book` · `The photos` · `The bonuses` ·
`Welcome` · `The chat` · `Legit or gimmick` (with the vote) · `Moments of friction`
(numbered: where / expected / happened / how it felt / severity: blocker, would-quit,
annoyance, cosmetic) · `Moments that worked` (keep this; it stops a later pass from "fixing"
what you liked) · `Words I did not understand` · `Buy, write or leave` · `The one change`.

Keep it under 1,300 words. Never fix anything; never edit any other file. Use no long dashes
(no em dash, no en dash, no double hyphen) in your report.
