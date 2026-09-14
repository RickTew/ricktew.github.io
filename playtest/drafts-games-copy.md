# Games chapter of /aininja/: three drafts

Draft only, never publishes. Written by Copy, 14 September 2026, on Rick's brief
of the same day (share, not sell; TewBit Games brand; beta is key; no game names;
appeal to the reader with no business but an old idea). Voice from
`.claude/agent-context/writing.md`, the 13 Sep section. Memory: the shared
writing-agent file and this project's agent memory do not exist yet; nothing read,
nothing contradicted.

What this replaces: the chapter headed "The games I carried in my head for decades
came out." (`aininja/index.html` line 1480) and the strip "From the games / The
characters" (line 1543). The pictures, the App Store badge and the zoom clip stay;
this is the words only.

The two-reader test every version has to pass: the owner reads the eyebrow and the
headline, sees a hobby, skips it and loses nothing. The reader with an old idea
reads on and finds Rick had one too, took it seriously, and will scope theirs.

---

## Version 1: the full one

**Eyebrow:** Off the clock

**Headline:** I have a hobby too. It is called TewBit Games.

**Paragraph (62 words):**

Most of these I made for me. The old-school pixel look was a choice. I built the
characters myself, and that part was fun. In one May, five half-built games came
out of my notebooks and became playable. One made the App Store. The rest are in
beta, because a good game takes months and a hundred questions the player never
sees.

**Closer (27 words, Rick's kept line plus the ask):**

Games are hard. Apps and business tools are far easier, which is good news for
you. If you have an old idea in a drawer, bring it.

Body copy total: 89 words.

**Button:** see the shared button spec below.

---

## Version 2: leads with the paper game

**Eyebrow:** TewBit Games, my hobby

**Headline:** Got an old idea in a drawer? So did I.

**Paragraph (68 words):**

Mine was a board game I drew on paper as a kid. It is being built for real now,
under my TewBit Games brand, with the rest. Most I made for me. The pixel look was
a choice, I built the characters myself, and I learned more than one way to make a
game. One made the App Store. The rest are in beta, which means not finished.

**Closer (18 words, Rick's kept line plus the ask):**

Games are hard. Apps and business tools are far easier, which is good news for
you. Bring yours.

Body copy total: 86 words.

**Button:** see the shared button spec below.

---

## Version 3: the shortest thing that could work

**Eyebrow:** The hobby chapter

**Headline:** TewBit Games is my hobby. What is yours?

**Two sentences (39 words):**

Most of these I made for me, one is on the App Store, and the rest are in beta.
If you have an old idea in a drawer, bring it, and I scope it in writing before
you pay a thing.

Body copy total: 39 words.

This version drops Rick's kept line ("Games are hard. Apps and business tools are
far easier, which is good news for you."). If he wants it, it stands as its own
line under the two sentences and the total becomes 55 words. This version also
carries no "fun", so it needs the strip caption below; the other two do not.

**Button:** see the shared button spec below.

---

## The button (shared by all three)

The page's existing want pill, `a.want`, kind `build` (the mailbox subject that
reads "Build me something: an app, a site, a chat box"). No new form, no mailto.

- **Visible label (short, spoken):** I have an old idea too
  (Fallback if every pill on the page must read the same: I want this Tew.)
- **`data-want`** (writes "I want this Tew: ..." into the message box):
  my old idea, out of the drawer
- **`data-want-note`** (the one line that rides with it):
  Priced in writing first. Nothing paid before the scope is agreed.
- **`data-want-kind`:** build

No price in the block on purpose. The R2 Hosting card carries $222 to build then
$99 a month, and the reader who arrives with no money and no business would read
a number here as the door closing. The note says "priced in writing first", which
is true and is all this reader needs to press. Rick can add the R2 line if he
wants it here.

---

## Caption for the picture strip

Characters, screens, a couple in 3D. Made for fun, most in beta.
(12 words)

Alternate, if the strip sits next to the App Store badge:

Made for fun, by me. One on the App Store, the rest in beta.
(14 words)

My call: with Version 1 or Version 2, drop the caption and the "From the games /
The characters" heading entirely. Both paragraphs already say fun and beta, and
Rick's brief was "these don't need a title or text". With Version 3, keep the
caption, because the two sentences say beta but not fun. Either way the strip
loses its own heading and sits under the paragraph as pictures.

---

## Flags on the existing copy (not fixed, by rule)

1. The books chapter (line 1465) bolds a phrase mid-paragraph, "In April they
   started becoming finished things:", against Rick's one-weight-per-paragraph
   ruling of 5 Sep. Not mine to fix uninvited.
2. The captions around the games chapter name games (the sprinkle caption on
   line 1515, the two phone captions on lines 1523 and 1531, the two figcaptions
   on lines 1533 and 1534). Rick's brief says the copy does not say game names.
   Those captions are outside this draft; the session that lays out the block
   should decide whether they go. The `alt` texts and `data-game` are code and
   accessibility, not copy, and can keep the names.

---

## Slop pass (detect, by hand, on the three versions and the caption)

Caught and cut before the draft was written down:

- "Beta is the honest word" (labelling honesty). Cut from every version. Version
  1 keeps Rick's own reason instead, "a good game takes months and a hundred
  questions the player never sees"; Version 2 says "which means not finished".
- "The old-school pixel look was a choice, I built the characters myself, and it
  was fun" as one comma-spliced run (robotic rhythm). Split into two sentences in
  Version 1.
- "several game engines" (tech word for a reader who hates tech, and the brief
  says do not name engines). Now "more than one way to make a game" in Version
  2, absent elsewhere.
- "beta means months still to go" (a claim the facts do not make for every game).
  Now "which means not finished".
- The strip's own heading and eyebrow ("From the games / The characters"):
  a header over no text. Dropped.

Kept as voice, one each:

- "which is good news for you" (Rick's kept line, verbatim).
- "Got an old idea in a drawer? So did I." and "What is yours?" (a spoken CTA
  question, Rick's exception; one per version).
- "Bring yours." and "bring it" (one flat landing fragment per paragraph).
- "before you pay a thing" (his spoken register).

Checked clean: no long dash of any kind (the hyphens in "half-built" and
"old-school" are word hyphens, both already on the page); no contractions; no
"quietly"; no colon reveal; no "not X, it's Y" beyond Rick's kept line; no AI
company, model, engine or game named; no bold; every fact traces to the brief.

---

## Memory proposals

- 2026-09-14 | durable | Rick's ruling for the games chapter of /aininja/: it is
  share, not sell; the brand is "TewBit Games" (two words, three capitals); no
  game names in the copy; "beta" is the word for the unfinished ones; the reader
  it courts is the one with no business and an old idea, and the door is the
  existing "Build me something" want button, never a game-building service or a
  game price. Source: Rick, 14 Sep 2026, relayed in the task brief.
- 2026-09-14 | perishable | On /aininja/ every want pill reads "I want this Tew";
  `data-want` is the thing's name and lands in the message as "I want this Tew:
  X"; `data-want-note` is the one-line promise; `data-want-kind` is one of the
  mailbox subject values (`build`, `dojo`, `hours`, `other`). Source: read in
  `aininja/index.html` lines 1312 to 2502 on 14 Sep 2026.

Copy
