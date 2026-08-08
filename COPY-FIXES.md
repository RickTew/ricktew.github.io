# Faithful-copy fixes needed before this goes to git / GitHub Pages

Findings from Rick's side-by-side review of the compare harness (localhost:8788),
verified against the live site and this repo, 2026-08-08. Goal: the copy should
match the live Google Sites version exactly; the redesign comes later, on top of
a faithful capture.

## 1. Blue is wrong (site-wide)

Live renders `#1e73bd` for the blue bands (button blue `#3367d6`). The copy's CSS
contains four slightly different blues, evidently sampled from compressed
screenshots: `#3865b8`, `#3d65ad`, `#3c5ccd`, `#3e64a9` (all in `css/`).
Fix: replace all four with the true values.

## 2. Oswald font missing on subpages

Only the root `index.html` loads the Google Fonts link
(`Oswald` + `Open Sans`). Subpages (`home/`, `about/`, `camps/`, ...) declare
`font-family: "Oswald"` in CSS but never load it, so titles fall back to a
system font. Fix: add the same `<link>` to the `<head>` of every page.

## 3. Image display sizing (about page kick photo, check others)

The high-kick cutout on the about page renders near source size in the copy vs
a ~500px slot on the live site. Source assets are fine (full resolution, often
larger than what live serves). Fix: constrain the figure/img widths to match
live; audit other pages for the same missing constraint.

## 4. Yellow highlight lost (camps page, check all pages)

Live highlights the two pricing paragraphs ("Our VIP private group travel &
training program... $2,222..." and "Our base training program is currently
$2,222...") in yellow. The copy has no highlight markup anywhere
(`grep -i background camps/index.html` finds none) - the capture stripped
Google Sites' inline highlight spans. Fix: re-add (e.g. `<mark>` with the
live's highlight color), and re-check every page for other stripped
highlights/inline styles.

## 5. Paragraph break lost (camps page)

In `camps/index.html` the "Our VIP private group..." sentence was merged into
the preceding "Sensei Rick Tew is accepting..." paragraph. Live has them as
separate paragraphs. Fix: split them; likely the same capture bug elsewhere -
re-check paragraph boundaries on all pages.

## 6. Paragraphs converted to a bullet list (camps page, check all pages)

Live renders "Martial Arts - ...", "Fitness - ...", "Mind - ...",
"Diet & Health - ..." as four separate paragraphs with a bold lead word.
`camps/index.html` turned them into a `<ul>` bullet list and dropped the bold
lead words. Fix: restore paragraphs with `<strong>` lead words; audit other
pages for the same paragraph-to-list conversion.

## 7. Bold initial letters lost (camps page, check all pages)

Live bolds the initials in "**R**ick **T**ew's **M**artial **S**cience Program"
(the R.T.M.S. wordplay). The copy has the sentence as plain text. Fix: re-add
`<strong>` on R/T/M/S; this is deliberate brand emphasis, and the same
letter-level bolding may be stripped elsewhere (same capture bug family as the
lost highlights in item 4 - inline character-level spans were flattened).

## 8. Blue band section lost (tours page)

Live renders "BLAST IS AN ACRONYM FOR *BREATHING, LAUGHING, ADVENTURING,
STRETCHING,* AND *THINKING*. ALL INTEGRATED AS PART OF RICK TEW'S TRAVEL &
TRAINING TOUR" as white text on a full-width blue band, with the acronym words
in italics. The copy renders it as plain black headings on white: band gone,
italics gone.

## 9. Two-column layout restructured (tours page, "Make Life a Blast")

Live: BLAST logo left with the intro text beside it, then the "Items owned..."
paragraphs full-width below the logo block. Copy: all paragraphs stacked in the
right column next to the logo. Restore the live column/flow structure.

## 10. Styled quote flattened (tours page)

"Travel is the only thing you buy that makes you richer." is blue italic on
live; the copy renders it as plain black bold. Same inline-style stripping as
items 4 and 7.

## 11. Image display sizes shrunk (tours page; extends item 3)

The Winjitsu book banner and the big group photo above the testimonials render
noticeably smaller than live. Item 3's sizing audit should treat the about-page
kick (too big) and these (too small) as the same defect: display widths are not
being carried over from the live layout, in either direction.

## Sequencing caution

`CNAME` contains `ricktew.com`. Publishing this repo to GitHub Pages and
switching DNS replaces the live Google Site. Push to a private repo first,
fix the above, then cut over deliberately.
