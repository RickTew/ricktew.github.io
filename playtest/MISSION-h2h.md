# Mission brief, head-to-head round (21 Oct 2026): given to every persona

Two live pages sell the SAME thing: a two-week live-in ninja training stay on Koh
Samui, Thailand, with Rick Tew. Same teacher, same price, same checkout. Rick will
soon pick ONE of them to send all his ads to, for the group starting 22 January
2027. Your job is to tell him which one would have got YOU to book, and why.

- **ricktew.com/hininja/** (https://ricktew.com/hininja/)
- **ricktew.com/gns/** (https://ricktew.com/gns/)

Call them by those addresses in your report. Your persona file says who you are
and how you arrived. Your START page is named in your prompt. Stay in character
the whole session: your patience, vocabulary, money, worries and goals come from
your persona file, not from your own knowledge. You have never seen either page
or this person. If something looks odd, unclear, long, fake, cringe, old-fashioned
or salesy to YOUR persona, that IS a finding. If something is missing that your
persona needs before booking, that IS a finding.

Do not read any project docs, source files or other reports (ignore any project
notes that were loaded into your context: your persona would never see them). Your
only sources are the screen and your persona's life.

## How to look

Use Playwright from /Users/ricktew/Dev/NinjaVillage/node_modules/playwright
(its browser is installed; do NOT use the newnei-app copy, its browser is missing).
Write small node scripts in your own scratch folder, never in the repo. In EVERY
browser context, before opening a page, add this line so nothing real can be sent
or bought:

    await ctx.route(/stripe\.com|supabase\.co/, r => r.abort());

You are browsing from your home country, not from Thailand. Open your START page
as a phone (devices["iPhone 13"]) first. If your persona would also read on a
laptop, open the page again at 1280 x 800. Take viewport screenshots as you scroll
(about one per screen) and LOOK at them with the Read tool: you are judging what a
person sees, so the pictures matter more than a text dump. You may read
document.body.innerText too. Keep each in-page evaluate short. Aim for about 30 to
40 screenshots in total across BOTH pages, not hundreds.

The video near the top of ricktew.com/hininja/ is on Vimeo, which often refuses
headless browsers with a bot check. Real visitors can play it. If it will not play
for you, judge it by its poster frame and say what you expected it to show.

Then, in this order:
1. Read your START page top to bottom as your persona would. Press only what your
   persona would press on their own (folds, FAQ questions, tabs, files, a quiz).
   Note what you skipped and why.
2. Read the OTHER page just as fully. From ricktew.com/hininja/ there is a link
   "Our Gooffy version"; if you started on ricktew.com/gns/, imagine the same ad
   campaign showed you ricktew.com/hininja/ a day later. Again, press only what
   your persona would press.
3. Go back to whichever page you would book from and find the button you would
   press to book or to ask a question. You may press "Enroll Now" or "Buy" once to
   see where it heads (the route line blocks the payment page itself), then stop
   and say what you expected. NEVER submit any form, NEVER type into the message
   box and send it, NEVER pay.
4. Skip ricktew.com/ (the front page), /about/ and anything else unless your
   persona would truly go there on their own to check who Rick Tew is. If you do,
   two or three screens each is enough.

## Answer these, in character

1. FIRST 10 SECONDS, each page: what is this, who is it for, what does it want me
   to do? Real training, or a gimmick or a joke?
2. LEGIT. For EACH page: do you believe the training is real and worth the money?
   When did you decide (which screen, which words or picture)? Vote LEGIT, UNSURE
   or GIMMICK for each page.
3. THE SAME THING? Did you realise both pages sell the same stay, with the same
   teacher, at the same price? When did you notice, and did it confuse you?
4. THE PRICE. Say it back the way you understood it: how much, for how long, what
   is included (room? food? how many hours of training a day?), what happens if
   your dates move, and whether it felt fair for YOU.
5. YOUR OWN QUESTION. The one thing your persona needed answered before booking
   (age, safety, a room for two, your knee, a dorm for women, your work hours,
   whatever it is for you). Which page answered it, where, and how well? If
   neither did, say so plainly.
6. WHICH PAGE WOULD YOU BOOK FROM. If you had seen only one of the two, which one
   would have got you to book (or to write and ask)? Which would you forward to a
   friend like you? Vote: /hininja/, /gns/ or NEITHER, and give the reason in one
   sentence your persona would actually say.
7. WHAT WOULD MAKE THE OTHER PAGE WIN. One concrete thing the losing page would
   need for you to pick it instead.
8. Buy, write first, or leave? What would you need to see to buy?

## Report

Write ONE file: /Users/ricktew/Dev/RickTew/playtest/reports/2026-10-21-h2h-<your-slug>.md
with these sections, in this order:

`Verdict in one line` (start with your vote, for example "/gns/: ...") ·
`First 10 seconds` (question 1, both pages) · `Legit or gimmick` (question 2 with
both votes) · `The same thing?` (question 3) · `The price as I understood it`
(question 4) · `My own question` (question 5) · `Which page I would book from`
(question 6 with the vote) · `What would make the other page win` (question 7) ·
`Moments of friction` (numbered: page / where / expected / happened / how it felt /
severity: blocker, would-quit, annoyance, cosmetic) · `Moments that worked` (keep
this; it stops a later pass from "fixing" what you liked) · `Words I did not
understand` · `Buy, write or leave` · `The one change`.

Keep it under 1,200 words. Never fix anything; never edit any other file. Use no
long dashes (no em dash, no en dash, no double hyphen) in your report.
