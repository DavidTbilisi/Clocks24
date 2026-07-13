# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, buildless website with three pages, deployed via GitHub Pages (legacy static serving of the `main` branch root, no Actions workflow):

- **`index.html`** (the site root — what GitHub Pages actually serves) — **the presentation/kiosk page.** A full-screen, always-on "digital signage" display: the current time (ticking every second), today's weekday/date/month, and the historic clock associated with the current hour shown as a full-bleed background image. Meant to be glanced at from across a room, not interacted with — there are no controls beyond two links out (top-right).
- **`explanation.html`** — **the "Perpetual Calendar" simulator**, an interactive teaching tool for Conway's Doomsday algorithm (computing the weekday of any date by hand). This was the original `index.html` before the presentation page was split out.
- **`archetypes.html`** — **the Archetype Wheel**, a 12-segment SVG wheel (the classic 4-quadrant brand-archetype model: Stability/Control, Learning/Freedom, Risk/Achievement, Belonging) where each segment is one month. Clicking a segment shows that month's archetype (goal/flaw/skill/mnemonic image) and the playing cards its ISO weeks draw this year (from `weekCards.json`), connecting the month-archetype and week-card mnemonic systems.

All three link to each other (`index.html`'s top-right has both outbound links; `explanation.html` and `archetypes.html` each have a "‹ Clocks24" back-link plus a link to the third page, in their header eyebrow line).

Each page is a fully self-contained HTML/CSS/JS triplet — `index.html`/`index.css`/`index.js`, `explanation.html`/`explanation.css`/`explanation.js`, `archetypes.html`/`archetypes.css`/`archetypes.js` — plain vanilla JS, no framework, no build step, no shared JS/CSS file between them (some palette tokens are intentionally duplicated rather than factored out, to keep each page a standalone unit — see CSS section).

`explanation.*` was ported from a "perpetual-calendar-sim" page in an unrelated personal research vault (`~/code/Neural-OS-Research`); its palette variables (`--bg`/`--panel`/`--line`/`--text`/`--muted`/`--accent`/`--pick`/`--ok`/`--warn`/`--hl`) were extracted from that vault's shared `explain-viz.css` toolkit so this repo has no external dependency on it.

An earlier version of this repo showed a different historic clock for each hour of the day (a Vue 3 `ClockShowcase` component). That app is gone, but its data now feeds `index.html`'s kiosk display, so `clocks.json`, `weekdays.json`, `monthDays.json`, and `months.json` are all in active use — only `dates.json`, `clocks.txt`, `poetry.txt` remain unused/orphaned. The repo also previously contained a standalone Prague Orloj simulator (`prague-clock.*`) and an unrelated Tailwind/daisyUI demo page (`docs.html`), which were removed since neither was reachable from the live site.

`images/cards/` (52 PNGs, `{suit}_{rank}.png`) and `weekCards.json` (ISO week 1–52 → a specific card, `week: 1` = Ace of Clubs through `week: 52` = King of Spades, sequential by suit) are vendored from [hanhaechi/playing-cards](https://github.com/hanhaechi/playing-cards) — used as a mnemonic for the ISO week number on the kiosk page and on the Archetype Wheel. That source repo declares no explicit license (describes itself as a modified "freebie" resource); worth revisiting if this repo's licensing terms ever need to be strict. Week 53 (occurs in some years) has no card — `weekCards.json` only has 52 entries by design, and both `index.js` and `archetypes.js` show an empty/fallback state rather than wrapping around.

`months.json` also carries the 12 brand-archetype fields consumed by `archetypes.html`: `archetype`, `quadrant` (one of `stability`/`learning`/`risk`/`belonging` — fixed display grouping, matches the classic wheel), `goal`, `flaw`, `skill` (alongside the pre-existing `coreIdea`/`mnemonicImage`). If you ever reconcile this with a different archetype-naming convention, note that some sources call October's "Everyman" the "Orphan" and December's "Outlaw" the "Rebel" — same archetypes, different labels.

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

There is no lint, typecheck, or CSS build script. To manually preview the site, just serve the repo root statically (e.g. `python -m http.server 4173`) and open `index.html` (kiosk), `explanation.html` (simulator), or `archetypes.html` (wheel).

## Architecture

### `index.html` / `index.js` / `index.css` — the kiosk page

`index.js` fetches `clocks.json`/`weekdays.json`/`monthDays.json`/`months.json`/`weekCards.json` once, then `renderStage()` runs every second via `setInterval`. Every tick it updates the clock/date text; the background image, "this hour's clock" caption, and the week-card pill only change when `currentHourKey`/`currentWeekKey` actually change (compared against `clocks.json[].time` and a `"year-weekNumber"` key respectively), so images aren't re-fetched every second — a `bg.onload` handler adds the `.loaded` class to fade the new background in via CSS transition. The weekday (`weekdays.json[].day`/`.georgian`) and month (`months.json[].name`/`.emoji`) are looked up by `Date#getDay()`/`Date#getMonth()+1`, the day-of-month mnemonic comes from `monthDays.json[].day`, and the ISO week number (`getISOWeek()`, standard Monday-start/first-Thursday algorithm) is looked up in `weekCards.json[].week`. This page intentionally ignores `prefers-color-scheme` and is always dark/cinematic — a deliberate choice for a photo-backed display, not an oversight.

### `explanation.html` / `explanation.js` / `explanation.css` — the Doomsday simulator

Driven by two pieces of state: `st = { y, m }` (the viewed year/month) and `userCol` (which of the 7 weekday columns the draggable day-panel is snapped to; `manual` tracks whether the user dragged it away from the computed answer). `render()` recomputes the correct weekday for the 1st of `st` via Conway's Doomsday algorithm (`centuryAnchor` + `monthAnchor` + `weekday`), then updates: the month rail tab, the sliding day-panel position, the resulting month grid (`.cal`), the step-by-step mental-math breakdown, and the four "fast path" arithmetic methods (Standard/Dozens/Odd+11/Vedic) shown side by side. Navigation (prev/next month, ±year, dragging the panel, arrow keys) all funnels back through `render()`.

The BRIDGE section (`BRIDGES` array + `renderBridges()`) is a static set of cross-domain analogies (Antikythera mechanism, casting out nines, cyclic group ℤ₇) with one placeholder slot intentionally left as `TODO(human)` — that entry is meant to be hand-edited or deleted, not filled in generically.

The year range is clamped to 1700–2099 in `shiftMonth`/`shiftYear`/the year `<input>` — that's the range the Doomsday formula here was verified against, not an arbitrary UI limit. This page no longer shows live "right now" data (that moved to `index.html` when the two pages were split) — it's purely about the algorithm.

### `archetypes.html` / `archetypes.js` / `archetypes.css` — the Archetype Wheel

`archetypes.js` builds the wheel as SVG `<path>` donut segments (`donutSegmentPath()`), not a chart library — `MONTH_ORDER` is a hardcoded array of 12 `months.json` month numbers in the wheel's fixed clockwise-from-12-o'clock display order (this does **not** match calendar order; it matches the reference brand-archetype wheel's layout, grouped into contiguous 3-segment quadrant arcs). Segment fill color comes from one of 4 CSS custom properties (`--q-stability`/`--q-learning`/`--q-risk`/`--q-belonging`, defined in `archetypes.css`) keyed by each month's `quadrant` field — deliberately only 4 hues, not 12, both to match the source wheel's look and because a 12-color categorical palette failed `dataviz` skill's CVD-separation/chroma-floor checks at this saturation (`scripts/validate_palette.js`); this 4-color set passes cleanly in both light and dark mode. Clicking or keyboard-activating (Enter/Space) a segment calls `selectMonth()`, which updates the detail panel and computes that month's ISO weeks (walking every day 1..daysInMonth through `getISOWeek()` for the current year) to look up and display their cards from `weekCards.json` — this is the actual "connect it to playing cards" link, derived from existing data rather than a separate invented mapping.

Segments use `outline: none` plus a `filter: drop-shadow(...)` for `:focus-visible` — a plain CSS `outline` on an SVG `<path>` renders as a bounding-box rectangle in Chrome, not the wedge shape, so don't reintroduce `outline` here.

### Weekday/month color-coding (all three pages)

Weekdays and months are color-coded wherever their names appear — via `.wd-0`..`.wd-6` (Sun→Sat) and `.mo-0`..`.mo-11` (Jan→Dec) utility classes, backed by `--wd-*`/`--mo-*` custom properties defined in each page's own CSS file (duplicated between `index.css` and `explanation.css`, not shared). If you add a new place that renders a weekday or month name, add the matching `wd-${i}`/`mo-${i}` class (0-indexed, matching JS-native `Date#getDay()`/`getMonth()` order) rather than inlining a color.

In `explanation.css` specifically, these are written as doubled selectors (e.g. `.wd-0.wd-0`) so their specificity stays below `.heads div.on`/`.rail .mo.on` — the teal "currently selected" state must keep winning over the decorative rainbow/season color. `index.css` has no such competing "selected" state, so its `.wd-*`/`.mo-*` rules are plain single-class selectors.

## CSS

All three CSS files are hand-written — edit directly, no build step. `explanation.css` and `archetypes.css` follow `prefers-color-scheme` (light "paper & parchment" / dark "walnut") and share the same `--bg`/`--panel`/`--line`/`--text`/`--muted`/`--accent`/`--pick`/`--wood` token names (values duplicated, not imported); `index.css` is fixed dark/cinematic regardless of OS theme (see above). `archetypes.css` additionally defines the 4 `--q-*` quadrant colors, validated via the `dataviz` skill's palette validator for both light and dark surfaces — re-run `node scripts/validate_palette.js "<hex,hex,hex,hex>" --mode light|dark` (from the skill's own directory) before changing any of them.

## Testing

`tests/responsive.spec.js` covers all three pages at several viewport sizes: `explanation.html`'s `.wrap`/`.controls`/`.cal` layout (plus a check that the day-panel starts in the correct `.feedbk.ok` position for today's date), `index.html`'s `.stage`/`.stage-time`/`.stage-date` layout (plus checks that the background image loads and both header links navigate correctly), and `archetypes.html`'s `.wheel-svg`/12 `.wheel-seg` elements/`.archetype-detail` layout (plus a check that clicking a segment updates the detail panel). `playwright.config.js` boots `python -m http.server 4173` as the web server automatically — no need to start a server manually before `npm test`.
