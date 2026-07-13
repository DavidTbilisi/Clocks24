# Clocks24

A three-page static site: a live kiosk display of the current time paired with a historic clock, an interactive simulator that teaches Conway's Doomsday algorithm, and a clickable wheel of the 12 monthly brand archetypes connected to a deck-of-cards mnemonic for the week of the year.

## Pages

### `index.html` — the presentation

A full-screen, always-on display: the current time (ticking live), today's weekday and date, and the historic clock associated with the current hour shown as a full-bleed photo background. Meant to be glanced at or left running on a screen — no controls beyond a link to the explanation page.

### `explanation.html` — the simulator

An interactive teacher for Conway's Doomsday algorithm: given any month and year (1700–2099), it walks through working out the weekday of the 1st by hand, then lets you drag a day-panel onto the column you think is correct and checks your answer.

- **The mechanism**: a month rail plus a draggable 7-column day panel — snap it to where you think the 1st falls, or use the controls / **Auto-set** to solve it for you.
- **Resulting month**: a live calendar grid that follows wherever the day panel is set, so a wrong guess visibly misaligns the month.
- **Doing it in your head**: a step-by-step breakdown of the algorithm (leap year → century anchor → year offset → year doomsday → step to the 1st).
- **Fast paths**: four different ways to compute the year offset side by side (Standard, Conway's Dozens, Odd+11, Vedic cast-out-sevens), with a "race the methods" animation.
- **BRIDGE**: cross-domain analogies for the same underlying mechanism (Antikythera gears, casting out nines, the cyclic group ℤ₇) — plus one intentionally-blank slot for you to fill in your own.
- Light/dark theme follows the system `prefers-color-scheme` automatically.

### `archetypes.html` — the Archetype Wheel

A 12-segment SVG wheel — the classic 4-quadrant brand-archetype model (Stability/Control, Learning/Freedom, Risk/Achievement, Belonging) — where each segment is one month. Click a segment to see that month's archetype, its goal/flaw/skill and mnemonic image, and the actual playing cards its ISO weeks draw this year.

## Technology

Pure vanilla JavaScript and hand-written CSS — no framework, no build step. Each page is a self-contained HTML/CSS/JS triplet.

## Usage

Serve the repo root statically:

```bash
python3 -m http.server 8080
# then open http://localhost:8080/index.html (kiosk), /explanation.html (simulator), or /archetypes.html (wheel)
```

All three pages `fetch()` JSON data files (`clocks.json`, `weekdays.json`, `monthDays.json`, `months.json`, `weekCards.json`), so open them via a local server rather than `file://`.

## File Structure

```
index.html / index.js / index.css                     - kiosk presentation page
explanation.html / explanation.js / explanation.css    - Doomsday algorithm simulator
archetypes.html / archetypes.js / archetypes.css       - the Archetype Wheel
clocks.json, weekdays.json, monthDays.json, months.json - shared data (24 historic clocks, weekday/month names+colors+archetypes, day-of-month mnemonics)
weekCards.json, images/cards/                          - ISO week 1-52 -> playing card mnemonic (52 vendored card images)
```

## Development

```bash
npm test          # run the Playwright test suite
npm run test:ui   # interactive test runner
```

See `CLAUDE.md` for architecture notes.

---

Created by David.
