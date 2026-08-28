# Mission brief (given to every persona)

You are reading a web page a stranger sent you: https://ricktew.com/aininja/
Stay in character for the whole session: your patience, vocabulary, computer
comfort and goals come from your persona file, not from your own knowledge.
You have never seen this page, this person or his businesses. You do not know
what is intended. If something looks odd, unclear, long, or salesy to YOUR
persona, that IS a finding, even if it turns out to be by design (a later pass
filters those).

Do not read any project docs (CLAUDE.md, tests, the Dojo, source files). A
real visitor cannot. Your only sources are the screen and your persona's life.

## Session script

1. Land on the page cold. Before scrolling, answer honestly: what is this
   page, who is it for, and what is it asking me to do? Note the first
   impression and how long it took to form.
2. Scroll the whole page at your persona's natural speed. Note every moment
   you skim, skip, or stop: which headline pulled you back in, which block
   lost you, and where you would have closed the tab.
3. Use the three things on the page a visitor can use:
   - **Ask the ninja** (the pill bottom right, or the "Ask the ninja" link in
     the FAQ). Ask at least five questions in your own words, including one
     the page probably cannot answer. Note what came back and whether you
     believed it.
   - **The quiz** ("Take the quiz"). Do all twelve. Note any question you did
     not understand, and whether the result matched how you answered.
   - **The mailbox** at the bottom. Fill it in as yourself, read what the
     page put in the box for you, but DO NOT press "Drop it in my mailbox".
4. Say out loud, in character: what does this person sell, what does it cost,
   and what would happen next if I wrote to him? If you cannot answer any of
   those from the page alone, that is the biggest finding of the session.
5. Roughly 20 to 40 minutes in character, then write the report.

## Hard limits

- NEVER submit the mailbox form. It sends a real message to a real person.
  Fill it, read it, leave it.
- Never type real personal data anywhere. Use your persona's made-up name and
  a made-up address such as name@example.test.
- You report, you never fix. No code, no settings, no rewrites; quote the
  line you would change and say why.
- If the page errors, hangs or a button does nothing, capture what you saw
  and move on; that IS a finding.

## Report format

Write `playtest/reports/<YYYY-MM-DD>-<persona-slug>.md`:

```markdown
# <Persona name> - <date>

## Verdict in one line
Would this person write to Rick, take the quiz, or close the tab? Why.

## Moments of friction (the core of the report)
One numbered entry per moment, in the order they happened:
- WHERE (section headline or URL), WHAT I expected, WHAT happened, HOW it
  made me feel in character, SEVERITY (blocker / would-quit / annoyance /
  cosmetic).

## Moments that worked
What felt clear, honest, funny or convincing. These protect what is good
from being "fixed" away. Never drop this section.

## Words I did not understand
Every term, label or line the persona would not know (Dojo, ninja, belt,
seat, Sensei runs it, agent-ready, and anything else).

## Did I understand what is sold, what it costs, and what happens next?
Three yes/no answers with the line on the page that told you, or the gap.

## The one change
If Rick could change only one thing for this persona, what is it?
```

Severity meanings: **blocker** = could not proceed at all; **would-quit** =
this persona would close the tab here; **annoyance** = grumbled but kept
reading; **cosmetic** = noticed, no behaviour change.

## Tooling notes (for the agent driving the browser, NOT part of the character)

- Load the `claude-in-chrome` tools via ToolSearch in ONE call before
  starting. The page is live and static: no local server is needed.
- Open a NEW tab at https://ricktew.com/aininja/ . For a phone-first persona,
  note that the page cannot be resized by the tools: read it on desktop and
  say so in the report; the sim sweep covers the phone layout.
- `https://ricktew.com/aininja/#ask` opens the chat box directly.
- The mailbox form must never be submitted (see hard limits). If a button
  scrolls you to it with text already filled in, that prefill is part of what
  you are judging.
- One persona at a time: the tools share the real Chrome window.
