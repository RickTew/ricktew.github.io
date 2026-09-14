# Games block of /aininja/: layout proposal, two options

Draft only, never publishes (`playtest/` is excluded from the Pages build by
`_config.yml` line 19). Written by design-agent, 14 September 2026, on Rick's
brief of the same day, relayed in the task. Propose only: nothing in
`aininja/index.html` was touched.

What it replaces: the chapter "CH 4: game season" (`aininja/index.html` lines
1475 to 1537, inside the first `.timeline`) and the band "From the games / The
characters" (`section.charwall#characters`, lines 1541 to 1555, which sits
between the two `.timeline` divs). The words come from Copy's draft in
`playtest/drafts-games-copy.md` (eyebrow, one-line headline, a 62 to 68 word
paragraph, an 18 to 27 word closer, one want pill). This file is the shape
that carries them.

## The one decision under both options

The new block takes the charwall's slot, between the two timelines, OFF the
rail: no `.chapter`, no `.dot`, no date line. The story rail then runs April
(books) straight into June (TewBeDo), and the hobby sits between them as a
full-bleed panel band, the same shape as the page's other asides (`.noise`,
`.charwall`, `.appwall`, all `background:var(--panel)` with a 1px `--line` top
and bottom). That is what makes it read as a side door: a band you can scroll
past in one flick, not a chapter with a dot on the timeline.

## Where the height goes today (computed from the CSS, not measured)

No browser in this run; every number here is worked out from the values in
the inline style block, and the sweep should measure the built thing.

- Desktop (1040 wrap, two 460px columns): the chapter's right column is the
  phone fan at `min-height:430px` (line 221) plus two captions, the 74px app
  icon row, then the two 3:4 portrait photos at about 300px plus captions:
  roughly 1,000px of column plus 144px of chapter padding. The charwall adds
  76px top and bottom padding, an eyebrow, a 38px heading and the 120px
  sprite row: about 380px. Total about 1,500px, 1.7 desktop screens.
- Phone (390): the chapter stacks to about 1,500px and the charwall wraps six
  sprites into two rows for about 470px more. Total about 1,970px.

Target from the brief: under about 900px desktop, about two phone screens.

## What gets cut or shrunk (plainly)

1. Cut all five captions that name games: `.sprinkle-cap` (line 1515), both
   `.vis-cap` lines (1523, 1531), both `figcaption`s (1533, 1534). The copy
   says beta and fun; the pictures do not need labels. `alt` text keeps the
   names, which is accessibility, not copy.
2. Cut the charwall's own eyebrow and heading (lines 1543, 1544) and its
   76px paddings. The block has one eyebrow and one heading, Copy's.
3. Cut the 74px app icon (`.store-icon`, line 1525). It costs a row and its
   art says the game's name. The black App Store badge alone is the proof.
4. Shrink the phone fan from 190px phones in a 430px box to 92px phones in
   a 196px tile on desktop (112px phones, 250px, on a phone). Still three
   phones, still reads as phones at a squint; it is the proof, not the hero.
5. Shrink, do not cut, the two portrait photos (the paper board game and the
   Arena RPG key art): they become square-cropped frames in a cycle tile
   (`object-fit:cover` already does the crop; `object-position:center top`
   for the paper one). Option A gives them a two-frame tile of their own,
   which flips paper to key art and back every 5.2 seconds. Option B folds
   them into the second cycle. One flag: the key art has "ARENA RPG by Rick
   Tew" painted on the shield, a game name inside the picture. Rick's call
   whether that counts as saying it.
6. Trim cycle 1 from 20 frames to the 11 board and action frames (drop the
   nine `dh-ui-*` menu screens). At 196px square a compendium index is grey
   text and the tile holds it for five seconds. Height unchanged; optional.
7. Sprites stay 1:1 on desktop (six boxes, 104 to 120px, gap 24: 796px wide,
   120px tall), because they are the only "characters" part and the only
   thing that survives a squint. On a phone the row has to halve or thin
   out, see the sprite note under the CSS.
8. The "May 2026" date line goes with the chapter. If Copy wants the month,
   it goes in the eyebrow.

## Option A: two columns, off the rail

Text left (copy, button, then the fan and badge), media right (clip over a
row of three squares, sprites under). Reads like a chapter without the dot.

### Desktop, 992px content inside the 1040 wrap

```
 panel band, full bleed, 1px line top and bottom                     row px
+===========================================================================+
|                                                                           |  48
| OFF THE CLOCK  (.k)              +=====================================+  |  15
| I have a hobby too.              |            clip 16:9                |  |
| It is called TewBit Games.       |            512 x 288                |  |  74 (h2, 30px, 2 lines)
| (h2)                             +=====================================+  | 288 (right col)
| paragraph, 440px wide,           +==========+ +==========+ +==========+   |  12
| 7 lines at 16.5/1.6   196        | cycle 1  | | cycle 2  | | paper to |   | 163
| closer, 3 lines        90        | 163 sq   | | 163 sq   | | key art  |   |
| ( I have an old idea too )  44   +==========+ +==========+ +==========+   |  14
|                                  (nin)(wiz)(sha)(pal)(med)(min) at 1:1    | 120
|      [] [] []   fan, 112px phones, 250                                    |
|      [App Store]  46, gap 14                                              |
|                                                                           |  48
+===========================================================================+
 text column 440 + gap 40 + media 512 = 992
 left column 753, right column 597, block about 849
```

Left column: 15 + 74 + 196 + 90 + 44 + (24 + 250) + (14 + 46) = 753.
Right column: 288 + 12 + 163 + 14 + 120 = 597, with 156px of slack under it.

### Phone, 390px (342 content), one column in DOM order

```
+==========================+   row px
|                          |    40
|      OFF THE CLOCK       |    15
|  I have a hobby too. It  |
|  is called TewBit Games. |    66 (h2 26px, 2 lines)
|  paragraph, 9 lines      |   248
|  closer, 4 lines         |   116
|  ( I have an old idea )  |    46
|                          |    20
|     [] [] []  3 phones   |   250 (112px phones)
|      [App Store]         |    58
|                          |    20
| +======================+ |
| |     clip 342 x 192   | |   192
| +======================+ |
| +======+ +======+ +====+ |    12
| | cyc1 | | cyc2 | |pap.| |   106 (three across, 106 sq)
| +======+ +======+ +====+ |
|  (n)(w)(s)(p)(m) sprites |    76 (16 + 60, see sprite note)
|                          |    40
+==========================+
 total about 1,305, 1.5 screens of 844
```

The block ends on the sprite row, because the fan lives in the text column
and DOM order puts it before the media on a phone.

## Option B: one strip, centered (recommended)

Centered copy over one row of four tiles, sprites under the row. Same shape
as `.charwall` and `.appwall` today: a band, not a chapter.

### Desktop, 992px content

```
 panel band, full bleed, 1px line top and bottom                     row px
+===========================================================================+
|                                                                           |  48
|                        OFF THE CLOCK  (.k, blue)                          |  15
|          I have a hobby too. It is called TewBit Games.  (h2, 38px)       |  46
|      paragraph, 60ch centered, #374151, one weight, 6 lines               | 174
|      closer, 3 lines                                                      |  93
|                       ( I have an old idea too )                          |  46
|                                                                           |  26
| +===================+ +==========+ +==========+ +============+            |
| |                   | |          | |          | |  [] [] []  |            |
| |    clip 16:9      | | cycle 1  | | cycle 2  | |  3 phones  |            | 196
| |    349 x 196      | | 196 sq   | | 196 sq   | |  92px      |            |
| +===================+ +==========+ +==========+ +============+            |
|                                                  [App Store]              |  58 (12 + 46)
|                                                                           |  14
|          (nin) (wiz) (sha) (pal) (med) (min)   sprites at 1:1             | 120
|                                                                           |  48
+===========================================================================+
 grid 1.78fr 1fr 1fr 1.1fr, gap 12: 349 + 196 + 196 + 215 = 956 + 36
 block about 884 (about 824 if the sprites are halved on desktop too)
```

Cycle 2 holds the five AstroHold frames, the two 3D renders and the two
portrait photos: nine frames, 47 seconds a lap. With Copy's Version 3 (39
words, no closer) the copy rows drop from 313 to about 120 and the block
lands near 690.

### Phone, 390px (342 content)

```
+==========================+   row px
|                          |    40
|      OFF THE CLOCK       |    15
|  I have a hobby too. It  |
|  is called TewBit Games. |    66
|  paragraph, 9 lines      |   248
|  closer, 4 lines         |   116
|  ( I have an old idea )  |    46
|                          |    20
| +======================+ |
| |     clip 342 x 192   | |   192
| +======================+ |
| +=========+ +=========+  |    12
| | cycle 1 | | cycle 2 |  |   165
| +=========+ +=========+  |
| +======================+ |    12
| |   [] [] []  3 phones | |   250 (112px phones)
| +======================+ |
|      [App Store]         |    58
|  (n)(w)(s)(p)(m) sprites |    76 (16 + 60, see sprite note)
|                          |    40
+==========================+
 total about 1,356, 1.6 screens of 844
```

The grid does the stacking: the clip and the fan span both columns, the two
cycles share a row. The block ends on the App Store badge, the proof.

## CSS changes, reuse first (both options unless marked)

Shell and copy, all existing rules reused by putting `class="charwall games"`
on the section and `class="wrap rv"` on its inner div:

- `.charwall` (line 275): the band. Add `.games{padding:48px 0}` to cut the
  76px paddings.
- `.charwall .k, .charwall h2` (276, 277): the centered eyebrow and heading,
  as is. Option A adds `.games .cols .k,.games .cols h2{text-align:left}`.
- `.charwall .sub` (278) for both paragraphs, with one override so body copy
  is not muted-on-grey: `.games .sub{color:#374151;font-weight:600;
  font-size:16.5px;line-height:1.6;margin-top:12px}`. `#374151` is the
  chapters' own prose color (`.chapter .prose p`, line 180). Muted `#69707a`
  on `--panel` computes to 4.63:1, a pass with no margin; `#374151` on
  `--panel` is 9.5:1. One weight per paragraph: 600 throughout, no inline
  `<b>`.
- `.want` (416): the pill, as is. Centered by the parent's `text-align`.
  `.games .want{margin-top:16px}`.

The tile row, reusing `.sprinkle` (301 to 314) so the cycle script at line
3413 (`#gameTiles .cycle`) keeps working untouched; the container keeps
`id="gameTiles"`:

- `.games .sprinkle{grid-template-columns:1.78fr 1fr 1fr 1.1fr;gap:12px;
  margin-top:26px;align-items:start}` (Option B). Option A:
  `repeat(3,1fr)` with `.games .gclip{grid-column:1/-1}`.
- `.games .sprinkle figure{transform:none}` and `.games .sprinkle
  figure:hover{transform:scale(1.04)}`: the 3n tilt (303 to 305) fights a
  straight clip; keep a small hover lift.
- The clip figure: `.games .gclip{aspect-ratio:16/9}` and `.games .gclip
  video{display:block;width:100%;height:100%;object-fit:cover;
  border-radius:12px;border:1px solid var(--line);box-shadow:0 6px 16px
  rgba(16,20,24,.10);background:var(--line)}`: the same border and shadow
  `.sprinkle img` (307) gives the tiles. Markup: `<video autoplay muted
  loop playsinline preload="metadata" poster="...webp" aria-label="The
  camera zooms down onto the game board">` with a webm source then an mp4.
  `muted` plus `playsinline` is what lets iOS autoplay it. The poster should
  be the clip's first frame so nothing flashes.
- The fan figure, and this one is load-bearing: `.sprinkle figure
  {aspect-ratio:1}` and `.sprinkle img{aspect-ratio:1;border;box-shadow}`
  (302, 307) have the same specificity as `.phone img` (226) and come later,
  so a phone nested in the strip would render SQUARE with a hairline border.
  Add `.games .gfan{aspect-ratio:auto}` and `.games .gfan .phone img
  {aspect-ratio:440/954;border:0;box-shadow:none;border-radius:12px}`, and
  `.games .gfan:hover{transform:none}` so the tile lift does not fight the
  fan's own hover.
- The small fan, a modifier on the existing `.phone-fan` (221 to 239):
  `.phone-fan.sm{min-height:196px}`, `.phone-fan.sm .phone{width:92px;
  padding:4px;border-radius:16px;box-shadow:0 10px 20px rgba(16,20,24,.24)}`,
  `.phone-fan.sm .p1{transform:rotate(-8deg) translateX(-46px)}`,
  `.phone-fan.sm .p3{transform:rotate(11deg) translateX(50px)}`, hover
  `-58px` and `62px`. Specificity (0,3,0) beats the `max-width:480px`
  `.phone{width:150px}` rule (235) without `!important`.
- The badge: `.store-row` (262) and `.store-badge` (265) as is, the icon
  removed from the markup. `.games .store-row{margin-top:12px}`, `.games
  .store-badge{padding:7px 12px}`, `.games .store-badge .b2{font-size:15px}`
  so it fits the 215px fan column (about 150px wide).

The sprites, reusing `.spr-row` (293) and the six `.spr-*` boxes (115 to
126):

- `.games .spr-row{gap:24px;margin-top:14px}`. Six at 1:1 is 796px wide,
  120px tall, one row on desktop.
- Sprite note, phone (under 480px): six at 1:1 wrap to three rows, about
  370px, which is not acceptable. Two ways, pick after ONE check: open one
  strip (`assets/story/sprites/ninja_attack_south.png`, 936 x 104, nine
  frames) at 800 percent. If the smallest visible block is 2 x 2 PNG pixels
  the art is drawn at 2x and halves cleanly: `.games .spr{zoom:.5}` (zoom
  scales the box, the background and the keyframe offsets together, so
  `steps(9)` still lands on frame edges; Chrome, Safari and Firefox 126 and
  later all support it) with `.games .spr-row{gap:12px}`, then five at half
  size is 278 + 48 = 326px, one row, 60px tall; hide the sixth with
  `.games .spr-fig:nth-child(6){display:none}`. If the art is 1x, halving
  drops every other pixel and the sword blades go, so instead keep 1:1 and
  show three (ninja 104 + paladin 108 + medusa 112 + two 6px gaps = 336px,
  under 342) by hiding children 2, 3 and 6. Either way the row is one line.

Phone stacking, one media block:

- `@media (max-width:700px){ .games .sprinkle{grid-template-columns:1fr 1fr}
  .games .gclip,.games .gfan{grid-column:1/-1} .phone-fan.sm{min-height:
  250px} .phone-fan.sm .phone{width:112px} .phone-fan.sm .p1{transform:
  rotate(-8deg) translateX(-56px)} .phone-fan.sm .p3{transform:rotate(11deg)
  translateX(60px)} }`. Fan span on a phone: 112 + 56 + 60 plus rotation
  bleed, about 245px, inside 342. No horizontal scroll; `.charwall` is
  `overflow:hidden` anyway (275).
- Option A only: `.games .cols{display:grid;grid-template-columns:440px 1fr;
  gap:40px;align-items:start}` and, under 900px, `grid-template-columns:1fr`.

Motion:

- Cycle tiles: the script at 3412 already returns before starting on
  `prefers-reduced-motion`, first frame stands. Sprites: `.spr{animation:
  none !important}` (127). Fan and tiles: transitions already zeroed (233,
  314). The clip needs two lines added inside the same IIFE, before its
  reduced-motion return: `var v=document.querySelector("#games video");
  if(v&&matchMedia("(prefers-reduced-motion: reduce)").matches){
  v.removeAttribute("autoplay");v.pause();}`, so the poster stands still.
  CSS cannot stop an autoplay attribute, hence script.

Rules checked against the kit: no left accent bars; the only pills are the
two things you can press (`.want` 999px, `.store-badge` 11px); tiles are 12px
radius, not pills; the band is `--panel` #f7f6f4, not dark; no new font, no
external script; no em dash, en dash or double-hyphen dash anywhere in this
file or the proposed markup (the only `--` in here are CSS variable names such
as `--panel`, the page's own spelling, and they never leave a code span).

## Assessment

- Contrast on `--panel` #f7f6f4: `--ink` about 17:1; `#374151` 9.5:1;
  `--blue` eyebrow 4.58:1 (passes AA, and it is the page-wide eyebrow on
  every panel band already); `--muted` 4.63:1, which is why the paragraph is
  not muted.
- Squint at 200px wide: Option B is a centered text block, one filmstrip
  line, one line of dots. It reads as a band, the same as the other asides.
  Option A reads as text-left-pictures-right, which is every chapter on the
  page, so the reader files it as a chapter.
- Hairlines at small size: the phones at 92px keep a 4px frame and a 12px
  inner radius, which still reads as a phone; the App Store badge at 15px
  Archivo is fine. The sprites at half size are the only hairline risk, and
  the check above decides it.
- Both options fit the budget: A about 849 desktop and 1,305 phone; B about
  884 (824 with halved sprites) desktop and 1,356 phone. Copy's Version 3
  takes either well under 750.
- Assets not in the repo yet, as the brief said: the board-zoom clip, its
  poster, the two 3D renders. Layout reserves their slots; nothing was
  invented for them.

## Recommendation

Option B, the strip. It is the same shape as the page's other panel bands,
so a reader who skips it loses one flick of the thumb and nothing else, and a
reader who stops gets the whole hobby in one row: moving board, two turning
tiles, three phones and a badge, six characters underneath.
The copy sits above the pictures in both layouts, so the eyebrow and headline
do their skip-or-stay job before any art loads.
Build B with Copy's Version 1 or 2, halve the sprites on phone only if the
PNG check says the art is 2x, and measure the built block with the sweep
before calling the 900px promise kept.

## Sources for every value

- Palette, `.wrap`, `.k`, `.pixel`: `aininja/index.html` lines 22 to 25, 38
  to 40.
- Sprites: lines 112 to 127; strip file `assets/story/sprites/
  ninja_attack_south.png` (936 x 104, viewed).
- Chapter grid and prose color: lines 168 to 181. Photos: 211 to 218.
  Phone fan and phone: 221 to 239. Store row and badge: 262 to 272.
  Charwall and sprite row: 275 to 296. Sprinkle and cycle: 301 to 316.
  Want pill: 416, 465. Reveal: 592, 593.
- Markup replaced: lines 1475 to 1537 (chapter) and 1541 to 1555 (charwall).
  Cycle script: 3409 to 3428.
- Copy shape and the button spec: `playtest/drafts-games-copy.md`.
- Photos judged for square cropping: `assets/story/rick/childhood-game.webp`
  (already near square) and `assets/story/rick/arena-rpg.webp` (805 x 1200
  portrait, title on the shield at center).
- Contrast ratios computed by hand from the hex values (WCAG relative
  luminance), not eyeballed.
- `.claude/agent-context/design.md` (30 Jul) was read first and describes a
  site that does not exist (`css/tokens.css`, Space Grotesk, an amber accent,
  dark default). `CLAUDE.md` says the same on 21 Aug. Nothing from it was
  used; the page's own style block is the kit here.
