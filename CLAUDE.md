# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, buildless website with two pages, deployed via GitHub Pages (legacy static serving of the `main` branch root, no Actions workflow):

- **`index.html`** (the site root — what GitHub Pages actually serves) — **the presentation/kiosk page.** A full-screen, always-on "digital signage" display: the current time (ticking every second), today's weekday/date/month, and the historic clock associated with the current hour shown as a full-bleed background image. Meant to be glanced at from across a room, not interacted with — there are no controls beyond a single link out.
- **`explanation.html`** — **the "Perpetual Calendar" simulator**, an interactive teaching tool for Conway's Doomsday algorithm (computing the weekday of any date by hand). This was the original `index.html` before the presentation page was split out; it's linked from the kiosk page's "How the calendar works →" button, and links back via "‹ Clocks24" in its own header.

Each page is a fully self-contained HTML/CSS/JS triplet — `index.html`/`index.css`/`index.js` and `explanation.html`/`explanation.css`/`explanation.js` — plain vanilla JS, no framework, no build step, no shared JS/CSS file between them (some palette tokens are intentionally duplicated rather than factored out, to keep each page a standalone unit — see CSS section).

`explanation.*` was ported from a "perpetual-calendar-sim" page in an unrelated personal research vault (`~/code/Neural-OS-Research`); its palette variables (`--bg`/`--panel`/`--line`/`--text`/`--muted`/`--accent`/`--pick`/`--ok`/`--warn`/`--hl`) were extracted from that vault's shared `explain-viz.css` toolkit so this repo has no external dependency on it.

An earlier version of this repo showed a different historic clock for each hour of the day (a Vue 3 `ClockShowcase` component). That app is gone, but its data now feeds `index.html`'s kiosk display, so `clocks.json`, `weekdays.json`, `monthDays.json`, and `months.json` are all in active use — only `dates.json`, `clocks.txt`, `poetry.txt` remain unused/orphaned. The repo also previously contained a standalone Prague Orloj simulator (`prague-clock.*`) and an unrelated Tailwind/daisyUI demo page (`docs.html`), which were removed since neither was reachable from the live site.

## Commands

```bash
# Run the Playwright test suite (spins up `python -m http.server 4173` automatically)
npm test

# Run tests with a visible browser / interactive UI
npm run test:headed
npm run test:ui

# Run a single test file
npx playwright test tests/responsive.spec.js
```

There is no lint, typecheck, or CSS build script. To manually preview the site, just serve the repo root statically (e.g. `python -m http.server 4173`) and open `index.html` (kiosk) or `explanation.html` (simulator).

## Architecture

### `index.html` / `index.js` / `index.css` — the kiosk page

`index.js` fetches `clocks.json`/`weekdays.json`/`monthDays.json`/`months.json` once, then `renderStage()` runs every second via `setInterval`. Every tick it updates the clock/date text; the background image and "this hour's clock" caption only change when `currentHourKey` actually changes (compared against `clocks.json[].time`, `"HH:00"`), so the `<img>` isn't re-fetched every second — a `bg.onload` handler adds the `.loaded` class to fade the new image in via CSS transition. The weekday (`weekdays.json[].day`/`.georgian`) and month (`months.json[].name`/`.emoji`) are looked up by `Date#getDay()`/`Date#getMonth()+1`, and the day-of-month mnemonic comes from `monthDays.json[].day`. This page intentionally ignores `prefers-color-scheme` and is always dark/cinematic — a deliberate choice for a photo-backed display, not an oversight.

### `explanation.html` / `explanation.js` / `explanation.css` — the Doomsday simulator

Driven by two pieces of state: `st = { y, m }` (the viewed year/month) and `userCol` (which of the 7 weekday columns the draggable day-panel is snapped to; `manual` tracks whether the user dragged it away from the computed answer). `render()` recomputes the correct weekday for the 1st of `st` via Conway's Doomsday algorithm (`centuryAnchor` + `monthAnchor` + `weekday`), then updates: the month rail tab, the sliding day-panel position, the resulting month grid (`.cal`), the step-by-step mental-math breakdown, and the four "fast path" arithmetic methods (Standard/Dozens/Odd+11/Vedic) shown side by side. Navigation (prev/next month, ±year, dragging the panel, arrow keys) all funnels back through `render()`.

The BRIDGE section (`BRIDGES` array + `renderBridges()`) is a static set of cross-domain analogies (Antikythera mechanism, casting out nines, cyclic group ℤ₇) with one placeholder slot intentionally left as `TODO(human)` — that entry is meant to be hand-edited or deleted, not filled in generically.

The year range is clamped to 1700–2099 in `shiftMonth`/`shiftYear`/the year `<input>` — that's the range the Doomsday formula here was verified against, not an arbitrary UI limit. This page no longer shows live "right now" data (that moved to `index.html` when the two pages were split) — it's purely about the algorithm.

### Weekday/month color-coding (both pages)

Weekdays and months are color-coded wherever their names appear — via `.wd-0`..`.wd-6` (Sun→Sat) and `.mo-0`..`.mo-11` (Jan→Dec) utility classes, backed by `--wd-*`/`--mo-*` custom properties defined in each page's own CSS file (duplicated between `index.css` and `explanation.css`, not shared). If you add a new place that renders a weekday or month name, add the matching `wd-${i}`/`mo-${i}` class (0-indexed, matching JS-native `Date#getDay()`/`getMonth()` order) rather than inlining a color.

In `explanation.css` specifically, these are written as doubled selectors (e.g. `.wd-0.wd-0`) so their specificity stays below `.heads div.on`/`.rail .mo.on` — the teal "currently selected" state must keep winning over the decorative rainbow/season color. `index.css` has no such competing "selected" state, so its `.wd-*`/`.mo-*` rules are plain single-class selectors.

## CSS

Both `index.css` and `explanation.css` are hand-written — edit directly, no build step. `explanation.css` follows `prefers-color-scheme` (light "paper & parchment" / dark "walnut"); `index.css` is fixed dark/cinematic regardless of OS theme (see above).

## Testing

`tests/responsive.spec.js` covers both pages at several viewport sizes: `explanation.html`'s `.wrap`/`.controls`/`.cal` layout (plus a check that the day-panel starts in the correct `.feedbk.ok` position for today's date) and `index.html`'s `.stage`/`.stage-time`/`.stage-date` layout (plus a check that the background image loads and the "How the calendar works →" link navigates to `explanation.html`). `playwright.config.js` boots `python -m http.server 4173` as the web server automatically — no need to start a server manually before `npm test`.
