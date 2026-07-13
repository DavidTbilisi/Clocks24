# Clocks24

A two-page static site: a live kiosk display of the current time paired with a historic clock, and an interactive simulator that teaches Conway's Doomsday algorithm.

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

## Technology

Pure vanilla JavaScript and hand-written CSS — no framework, no build step. Each page is a self-contained HTML/CSS/JS triplet.

## Usage

Serve the repo root statically:

```bash
python3 -m http.server 8080
# then open http://localhost:8080/index.html (kiosk) or /explanation.html (simulator)
```

Both pages `fetch()` JSON data files (`clocks.json`, `weekdays.json`, `monthDays.json`, `months.json`), so open them via a local server rather than `file://`.

## File Structure

```
index.html / index.js / index.css                   - kiosk presentation page
explanation.html / explanation.js / explanation.css  - Doomsday algorithm simulator
clocks.json, weekdays.json, monthDays.json, months.json - shared data (24 historic clocks, weekday/month names+colors, day-of-month mnemonics)
```

## Development

```bash
npm test          # run the Playwright test suite
npm run test:ui   # interactive test runner
```

See `CLAUDE.md` for architecture notes.

---

Created by David.
