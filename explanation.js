const WD = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const WD3 = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MO = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MO3 = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const now = new Date();
const TODAY = { y: now.getFullYear(), m: now.getMonth(), d: now.getDate() };

// ── Conway's Doomsday (verified vs JS Date across 1700–2099) ──
const isLeap = y => (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
const centuryAnchor = y => (5 * (Math.floor(y / 100) % 4) + 2) % 7;  // 0=Sun; 1700→Sun,1800→Fri,1900→Wed,2000→Tue
const monthAnchor = (m, leap) => [leap ? 4 : 3, leap ? 29 : 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12][m];
function daysIn(y, m) { return [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m]; }
function weekday(y, m, d) {
  const yy = y % 100, yd = (centuryAnchor(y) + yy + Math.floor(yy / 4)) % 7;
  return ((yd + (d - monthAnchor(m, isLeap(y))) % 7) % 7 + 7) % 7;
}

let st = { y: TODAY.y, m: TODAY.m };
let manual = false;   // true once the user drags the panel away from the auto answer
let userCol = weekday(st.y, st.m, 1);   // the column the user has the panel set to
let stepPx = 1;       // px between columns, recomputed from layout each render
const panel = document.getElementById('panel');

// ── build static bits ──
const moSel = document.getElementById('mo');
MO.forEach((n, i) => { const o = document.createElement('option'); o.value = i; o.textContent = n; moSel.appendChild(o); });
document.getElementById('railMonths').innerHTML = MO3.map((n, i) => `<div class="mo mo-${i}">${n}</div>`).join('');
document.getElementById('heads').innerHTML = WD3.map((n, i) => `<div class="wd-${i}">${n}</div>`).join('');
document.getElementById('today').textContent = `Today (${TODAY.d} ${MO3[TODAY.m]} ${TODAY.y})`;

function positionPanel(col, animate) {
  panel.style.transition = animate ? '' : 'none';
  panel.style.transform = `translateX(${(col * stepPx).toFixed(2)}px)`;
}

// ── "This month's archetype" panel — mixes in the Archetype Wheel's data (months.json,
// weekCards.json) so it tracks whatever month/year the simulator above is browsing ──
let expMonths = [], expWeekCards = [];

async function loadArchetypeData() {
  try {
    const [monthsRes, weekCardsRes] = await Promise.all([fetch('months.json'), fetch('weekCards.json')]);
    expMonths = await monthsRes.json();
    expWeekCards = await weekCardsRes.json();
  } catch (err) {
    console.error('Error loading archetype panel data:', err);
  }
  renderArchetypePanel();
}

// ISO 8601 week number — same algorithm used on the kiosk and wheel pages
function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const firstDayNum = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNum + 3);
  return 1 + Math.round((d - firstThursday) / (7 * 24 * 3600 * 1000));
}

function renderArchetypePanel() {
  if (!expMonths.length) return; // data not loaded yet — render() calls this eagerly, that's fine
  const m = expMonths.find(x => x.month === st.m + 1);
  if (!m) return;

  const nameEl = document.getElementById('expArchetypeName');
  nameEl.textContent = `The ${m.archetype}`;
  nameEl.className = `archetype-name mo-${st.m}`;
  document.getElementById('expArchetypeIdea').textContent = m.coreIdea;
  document.getElementById('expGoal').textContent = m.goal;
  document.getElementById('expFlaw').textContent = m.flaw;
  document.getElementById('expSkill').textContent = m.skill;
  document.getElementById('expMnemonic').textContent = `“${m.mnemonicImage}”`;

  // JS Date only supports years 0–275760, but this simulator's year input already
  // clamps to 1700–2099, so st.y is always safely in range here.
  const daysInMonth = new Date(st.y, st.m + 1, 0).getDate();
  const weekNums = new Set();
  for (let d = 1; d <= daysInMonth; d++) weekNums.add(getISOWeek(new Date(st.y, st.m, d)));

  document.getElementById('expCardsRow').innerHTML = [...weekNums].sort((a, b) => a - b).map(w => {
    const card = expWeekCards.find(c => c.week === w);
    return card
      ? `<div class="archetype-card"><img src="${card.image}" alt="${card.label}" title="Week ${w} — ${card.label}"><span>W${w}</span></div>`
      : `<div class="archetype-card archetype-card-empty"><span>W${w}</span></div>`;
  }).join('');
}

function render() {
  const { y, m } = st;
  const correct = weekday(y, m, 1);         // the right column for the 1st
  if (!manual) userCol = correct;           // controls re-solve; dragging sets it manually
  const shown = userCol;                    // the panel/calendar follow what the user has set
  const dim = daysIn(y, m);

  // controls
  moSel.value = m;
  document.getElementById('yr').value = y;

  // rail tab
  document.getElementById('tab').textContent = MO3[m];
  document.getElementById('tab').style.left = `calc(${(m + 0.5)} * 100% / 12)`;
  [...document.querySelectorAll('#railMonths .mo')].forEach((el, i) => el.classList.toggle('on', i === m));

  // sliding panel (px-positioned so it is draggable) + weekday heads
  stepPx = (document.getElementById('slots').getBoundingClientRect().width + 5) / 7;
  positionPanel(shown, true);
  panel.classList.toggle('wrong', shown !== correct);
  document.getElementById('panelLbl').textContent = `shift ${shown}`;
  [...document.querySelectorAll('#heads div')].forEach((el, i) => el.classList.toggle('on', i === shown));

  // readout — always states the truth
  document.getElementById('readout').innerHTML =
    `In <b>${MO[m]} ${y}</b>, the 1st falls on a <b>${WD[correct]}</b>. ` +
    `Move the month tab to <b>${MO3[m]}</b>, then slide the day panel <span class="shift">${correct} column${correct === 1 ? '' : 's'}</span> from the left` +
    `${correct === 0 ? ' (hard left)' : correct === 6 ? ' (fully right)' : ''}.`;

  // feedback — compares what the user set against the truth
  const fb = document.getElementById('feedbk');
  if (shown === correct) {
    fb.className = 'feedbk ok';
    fb.innerHTML = `✓ Set right — “1” is under <b>${WD[correct]}</b> (shift ${correct}).`;
  } else {
    fb.className = 'feedbk bad';
    fb.innerHTML = `✗ As set, “1” sits under <b>${WD[shown]}</b> (shift ${shown}). The 1st is really a <b>${WD[correct]}</b> → shift ${correct}.`;
  }

  // resulting calendar — follows the panel, so a wrong drag shows the misalignment
  let cells = WD3.map((n, i) => `<div class="h wd-${i}">${n}</div>`).join('');
  for (let i = 0; i < shown; i++) cells += `<div class="d blank"></div>`;
  for (let d = 1; d <= dim; d++) {
    const cls = ['d', d === 1 ? 'one' : '', (y === TODAY.y && m === TODAY.m && d === TODAY.d) ? 'today' : ''].join(' ').trim();
    cells += `<div class="${cls}">${d}</div>`;
  }
  document.getElementById('cal').innerHTML = cells;

  renderMath(y, m, correct);
  renderFast(y);
  renderArchetypePanel();
}

// ── fast paths to the year offset (Vedic / Conway / Odd+11) ──
const cmp = x => (x <= 3 ? '' : `<span class="cmp">(≡−${7 - x})</span>`);   // complement note for 4,5,6
function renderFast(y) {
  const yy = y % 100, anchor = centuryAnchor(y);

  // Standard
  const q = Math.floor(yy / 4), sum = yy + q, off = sum % 7;
  const cStd = [`⌊${yy}/4⌋ = ${q}`, `${yy} + ${q} = ${sum}`, [`${sum} mod 7 = <span class="g">${off}</span>`, 1]];

  // Conway dozens: yy = 12a + b
  const a = Math.floor(yy / 12), b = yy % 12, c = Math.floor(b / 4);
  const cDoz = [`${yy} = 12·${a} + ${b}`, `⌊${b}/4⌋ = ${c}`, `${a}+${b}+${c} = ${a + b + c}`,
                [`mod 7 = <span class="g">${off}</span>`, 1]];

  // Odd+11 (division-free)
  let t = yy; const s1 = (t % 2) ? `${yy} odd → +11 = ${t += 11}` : `${yy} even`;
  const t2 = t / 2; const s2 = `÷2 = ${t2}`;
  let t3 = t2; const s3 = (t2 % 2) ? `${t2} odd → +11 = ${t3 = t2 + 11}` : `${t2} even`;
  const r = t3 % 7;
  const cOdd = [s1, s2, s3, `${t3} mod 7 = ${r}`, [`7 − ${r} = <span class="g">${(7 - r) % 7}</span>`, 1]];

  // Vedic: cast out sevens + halve-twice + complement add
  const yr7 = yy % 7, q7 = q % 7;
  const cVed = [`${yy} mod 7 = ${yr7}`, `${yy}/4 = ${Math.floor(yy / 2)}→${q}`, `${q} mod 7 = ${q7}`,
                [`${yr7}${cmp(yr7)} + ${q7}${cmp(q7)} = <span class="g">${off}</span>`, 1]];

  const cols = [
    ['Standard', 'yy + ⌊yy/4⌋', cStd],
    ['Dozens', 'Conway: 12a+b', cDoz],
    ['Odd + 11', 'no division', cOdd],
    ['Vedic', 'cast-out 7s + complement', cVed],
  ];
  document.getElementById('fp').innerHTML = cols.map(([name, tag, rows]) =>
    `<div class="fpcol"><h3>${name}<span class="tag">${tag}</span></h3>` +
    rows.map((rw, i) => {
      const [html, fin] = Array.isArray(rw) ? rw : [rw, 0];
      return `<div class="fp-row show ${fin ? 'fin' : ''}" data-r="${i}">${html}</div>`;
    }).join('') + `</div>`).join('');

  const yd = (anchor + off) % 7;
  document.getElementById('fplead').textContent =
    `${y}: yy = ${yy} — all four routes reach offset ${off}.`;
  document.getElementById('fpfoot').innerHTML =
    `+ century anchor: (${anchor} + ${off}${cmp(off)}) mod 7 = <b>${yd} = ${WD[yd]}</b> — that's the ${y} doomsday, which the steps above feed into.`;
}

// staggered "race" reveal — all columns advance one row per tick
let fpSeq = 0;
function raceFast() {
  const mine = ++fpSeq;
  const rows = [...document.querySelectorAll('#fp .fp-row')];
  rows.forEach(r => r.classList.remove('show'));
  const maxR = Math.max(0, ...rows.map(r => +r.dataset.r));
  (function tick(t) {
    if (mine !== fpSeq) return;
    rows.filter(r => +r.dataset.r === t).forEach(r => r.classList.add('show'));
    if (t < maxR) setTimeout(() => tick(t + 1), 700);
  })(0);
}

// ── BRIDGE: cross-domain analogies (propose-then-curate) ──
const BRIDGES = [
  { tab: 'Antikythera gears',
    mech: '<b>Perpetual calendar</b> ≈ the <b>Antikythera mechanism</b> — both are a <i>fixed dial read against a pointer whose position is set by a cyclic offset</i>. The wooden calendar is a hand-driven, degenerate gear computer.',
    rows: [
      ['fixed 1–31 board', 'engraved fixed dial face'],
      ['sliding 7-column day panel', 'pointer on a 7-tooth (ℤ₇) gear'],
      ['+7 days wraps one column', 'one full tooth-cycle returns the gear'],
      ['month tab selects the month', 'input crank selects the cycle'],
      ['you set the offset by hand', 'gears set the offset mechanically'],
    ],
    note: 'candidate — curate or reject' },
  { tab: 'Casting out nines',
    mech: '<b>Perpetual calendar</b> ≈ <b>casting out nines</b> — Conway’s doomsday is a <i>checksum that crushes a whole date down to its residue in a modulus</i>. Nines verifies base-10 arithmetic; the calendar identifies the weekday in base 7.',
    rows: [
      ['weekday of a date', 'digit-sum residue of a number'],
      ['mod 7 (cast out sevens)', 'mod 9 (cast out nines)'],
      ['century + year + month offsets summed', 'the digits summed'],
      ['complements 4/5/6 ≡ −3/−2/−1', 'nine’s-complement shortcuts'],
      ['wrong weekday ⇒ arithmetic slip', 'checksum mismatch ⇒ error caught'],
    ],
    note: 'candidate — curate or reject' },
  { tab: 'Cyclic group ℤ₇',
    mech: '<b>Perpetual calendar</b> ≈ the <b>cyclic group ℤ₇</b> — the seven weekdays form a <i>finite cyclic group under “add a day”</i>, so every doomsday rule is just group arithmetic, and the +5 century step is a <i>generator</i> that visits all seven.',
    rows: [
      ['the 7 weekday columns', 'the 7 elements of ℤ₇'],
      ['advance one day', 'the group operation (+1)'],
      ['+7 = back to the start', 'the identity (order 7)'],
      ['+5/century: Tue→Sun→Fri→Wed→…', '5 is a generator (gcd(5,7)=1)'],
      ['the century anchor', 'a chosen base element'],
    ],
    note: 'candidate — curate or reject' },
  { tab: 'Your bridge →', todo: true,
    mech: 'This slot is yours. The strongest bridge is usually from a domain <i>you</i> hold deeply — a tuning dial? a transposing capo? a car odometer rolling over? Edit this entry with the mechanism-match that clicks for you, or delete it.',
    rows: [],
    note: 'TODO(human) — author or remove' },
];
let brIdx = 0;
function renderBridges() {
  document.getElementById('brTabs').innerHTML = BRIDGES.map((b, i) =>
    `<button class="br-tab ${i === brIdx ? 'on' : ''}" data-i="${i}">${b.tab}</button>`).join('');
  const b = BRIDGES[brIdx];
  const map = b.rows.map(r => `<tr><td class="l">${r[0]}</td><td class="m">≈</td><td class="r">${r[1]}</td></tr>`).join('');
  document.getElementById('brDetail').innerHTML =
    `<div class="br-mech">${b.mech}</div>` +
    (map ? `<table class="br-map">${map}</table>` : '') +
    `<div class="br-cand ${b.todo ? 'todo' : ''}">${b.note}</div>`;
  [...document.querySelectorAll('#brTabs .br-tab')].forEach(t =>
    t.onclick = () => { brIdx = +t.dataset.i; renderBridges(); });
}

// ── dragging the day panel ──
let dragging = false, startX = 0, startCol = 0, dragPx = 0;
function colFromPx(px) { return Math.max(0, Math.min(6, Math.round(px / stepPx))); }

panel.addEventListener('pointerdown', e => {
  dragging = true; startX = e.clientX; startCol = userCol; dragPx = startCol * stepPx;
  panel.classList.add('dragging'); panel.setPointerCapture(e.pointerId); e.preventDefault();
});
panel.addEventListener('pointermove', e => {
  if (!dragging) return;
  dragPx = Math.max(0, Math.min(6 * stepPx, startCol * stepPx + (e.clientX - startX)));
  panel.style.transition = 'none';
  panel.style.transform = `translateX(${dragPx.toFixed(2)}px)`;
  const col = colFromPx(dragPx);                 // live readout while dragging
  document.getElementById('panelLbl').textContent = `shift ${col}`;
  [...document.querySelectorAll('#heads div')].forEach((el, i) => el.classList.toggle('on', i === col));
});
function endDrag() {
  if (!dragging) return;
  dragging = false; panel.classList.remove('dragging');
  manual = true; userCol = colFromPx(dragPx); render();   // snap + grade
}
panel.addEventListener('pointerup', endDrag);
panel.addEventListener('pointercancel', endDrag);

function renderMath(y, m, offset) {
  const yy = y % 100, q = Math.floor(yy / 4), sum = yy + q, yo = sum % 7;
  const cVal = centuryAnchor(y), cName = WD[cVal];
  const yd = (cVal + yo) % 7, leap = isLeap(y), anchor = monthAnchor(m, leap);
  const stepRaw = 1 - anchor, step = ((stepRaw % 7) + 7) % 7;
  const rows = [
    ['Leap year?', `${leap ? 'yes' : 'no'} — ${MO3[m]} anchor = <b>${anchor}</b> (${MO3[m]} ${anchor} is a doomsday)`],
    ['Century', `${Math.floor(y / 100)}00s → <b>${cName}</b> (${cVal})`],
    ['Year offset', `${yy} + ⌊${yy}/4⌋=${q} = ${sum} &nbsp;mod 7 = <b>${yo}</b>`],
    ['Year doomsday', `(${cVal} + ${yo}) mod 7 = ${yd} = <b>${WD[yd]}</b>`],
    ['Step to the 1st', `1 − ${anchor} = ${stepRaw} &nbsp;≡&nbsp; <b>+${step}</b> mod 7`],
  ];
  const finalRow = `<div class="row final"><span class="k">⇒ 1st is</span><span class="v">(${yd} + ${step}) mod 7 = ${offset} = <b>${WD[offset]}</b> → slide ${offset}</span></div>`;
  document.getElementById('math').innerHTML =
    rows.map(r => `<div class="row"><span class="k">${r[0]}</span><span class="v">${r[1]}</span></div>`).join('') + finalRow;
}

// ── navigation (every control re-solves: panel jumps back to the correct column) ──
function shiftMonth(dir) {
  let m = st.m + dir, y = st.y;
  if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
  y = Math.max(1700, Math.min(2099, y)); st = { y, m }; manual = false; render();
}
function shiftYear(dir) { st.y = Math.max(1700, Math.min(2099, st.y + dir)); manual = false; render(); }

document.getElementById('pm').onclick = () => shiftMonth(-1);
document.getElementById('nm').onclick = () => shiftMonth(1);
document.getElementById('ym').onclick = () => shiftYear(-1);
document.getElementById('yp').onclick = () => shiftYear(1);
document.getElementById('auto').onclick = () => { manual = false; render(); };
document.getElementById('race').onclick = raceFast;
document.getElementById('today').onclick = () => { st = { y: TODAY.y, m: TODAY.m }; manual = false; render(); };
moSel.onchange = e => { st.m = +e.target.value; manual = false; render(); };
document.getElementById('yr').onchange = e => {
  const v = parseInt(e.target.value, 10);
  if (!isNaN(v)) { st.y = Math.max(1700, Math.min(2099, v)); manual = false; render(); }
};
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') shiftMonth(-1);
  else if (e.key === 'ArrowRight') shiftMonth(1);
  else if (e.key === 'ArrowUp') { shiftYear(1); e.preventDefault(); }
  else if (e.key === 'ArrowDown') { shiftYear(-1); e.preventDefault(); }
});
// keep the px-positioned panel aligned when the layout reflows
let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(render, 120); });

render();
renderBridges();
loadArchetypeData();
