# Mission brief, GNS round (12 Oct 2026): given to every persona

Two live pages sell the same thing: a two-week live-in ninja training stay on Koh
Samui, Thailand, with Rick Tew. Both run for real; ads will send people to either.

- **The GNS page:** https://ricktew.com/gns/ (the fun one: dark, cartoon, jokes)
- **The HI page:** https://ricktew.com/hininja/ (the plain one: light, straight)

Your persona file says how you arrived. Your START page is named in your prompt.
Stay in character the whole session: your patience, vocabulary, money and goals
come from your persona file, not from your own knowledge. You have never seen
either page or this person. If something looks odd, unclear, long, fake, cringe,
old-fashioned or salesy to YOUR persona, that IS a finding.

Do not read any project docs, source files or other reports. Your only sources
are the screen and your persona's life.

## How to look

Use Playwright from /Users/ricktew/Dev/Roy Martina/newnei-app/node_modules/playwright
(write small node scripts in your own scratch folder, never in the repo). In EVERY
browser context, before opening a page, add this line so nothing real can be sent
or bought:

    await ctx.route(/stripe\.com|supabase\.co/, r => r.abort());

Open your START page as a phone (devices["iPhone 13"]) first. If your persona would
also read on a laptop, open it again at 1280 x 800. Take viewport screenshots as you
scroll (about one per screen) and LOOK at them with the Read tool: you are judging
what a person sees, so the pictures matter more than a text dump. You may read
document.body.innerText too. Keep each in-page evaluate short. Aim for about 25 to
40 screenshots in total, not hundreds.

Then, in this order:
1. Read your START page top to bottom as your persona would. Only press what your
   persona would press on their own. Note what you skipped.
2. On the GNS page there are sealed "files" (a button that opens a file on Rick, and
   folders inside it). Say honestly whether your persona would have found and pressed
   them unprompted. THEN open them anyway, play at least one tape for a few seconds
   (a screenshot is enough), open the world files, and say what changed in your mind.
3. On the GNS page, take the quiz ("Which Gooffy Ninja Are You?") once, answering as
   your persona. Does the result make sense for you?
4. Visit the OTHER page (if you started on the HI page there is an "Our Gooffy
   version" link; if you started on the GNS page, a friend sends you the HI page
   link). Read it the way your persona would read a second link.
5. Glance at https://ricktew.com/ (the front page) and https://ricktew.com/about/ as
   someone checking who this Rick Tew is. Two or three screens each is enough.

NEVER submit any form and NEVER press "Buy" (the route line above blocks it anyway).
You may press "Enroll Now" or "Enrol" to see where it takes you, then stop and say
what you expected instead.

## Answer these, in character

1. First 10 seconds on your START page: what is this, who is it for, what does it
   want me to do? Real training, or a gimmick or a joke?
2. LEGIT. Do you believe the training is real and worth learning? When exactly did
   you decide (which screen, which words or picture)? What almost made you think it
   was a gimmick? Vote: LEGIT, UNSURE or GIMMICK, for each page.
3. THE FILES. Did you find the sealed files on your own? Would most people like you?
   What inside them changed your view? If ONE thing from inside should be visible
   without pressing anything, which one, and where on the page?
4. WHICH PAGE. Which of the two pages speaks to you, and why? Vote: GNS, HI or BOTH.
5. THE OFFER, told to a friend: what is the training like (hard? relaxed? how many
   hours?), who teaches, what is included, what does it cost, who is it for? Holiday
   with some training, or a hard camp?
6. WHO IS IT FOR, AND NOT FOR. Who do you picture in the room with you? Would you
   expect fight-gym types, gym bros, Muay Thai fighters? Does anything on the pages
   say who this is NOT for, and would that matter to you?
7. HOW YOU WOULD FIND IT. What words would you have typed into Google, or where would
   you have come across this (which app, group, forum, hostel board, friend)? What
   would an ad have to say for you to stop scrolling?
8. Would you buy, write first, or leave? What would you need to see to buy?

## Report

Write ONE file: /Users/ricktew/Dev/RickTew/playtest/reports/2026-10-12-gns-<your-slug>.md
with these sections, in this order:

`Verdict in one line` · `Legit or gimmick` (question 2 with both votes) · `The files`
(question 3) · `Which page` (question 4 with the vote) · `Moments of friction`
(numbered: page / where / expected / happened / how it felt / severity: blocker,
would-quit, annoyance, cosmetic) · `Moments that worked` (keep this; it stops a later
pass from "fixing" what you liked) · `Words I did not understand` · `Who it is for,
and not for` (question 6) · `How I would have found it` (question 7) · `What I would
tell a friend` (question 5) · `Buy, write or leave` · `The one change`.

Keep it under 1,100 words. Never fix anything; never edit any other file. Use no
long dashes (no em dash, no en dash, no double hyphen) in your report.
