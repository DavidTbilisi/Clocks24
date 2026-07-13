// Wheel display order, clockwise from 12 o'clock — matches the classic 4-quadrant
// brand-archetype wheel (Stability/Control, Learning/Freedom, Risk/Achievement, Belonging).
// Each number is a months.json `month` value (1=January .. 12=December).
const MONTH_ORDER = [7, 6, 1, 9, 5, 8, 12, 3, 2, 11, 10, 4];

const QUADRANT_LABELS = {
  stability: 'Stability · Control',
  learning: 'Learning · Freedom',
  risk: 'Risk · Achievement',
  belonging: 'Belonging'
};

let allMonths = [], allWeekCards = [];

async function loadWheelData() {
  try {
    const [monthsRes, weekCardsRes] = await Promise.all([fetch('months.json'), fetch('weekCards.json')]);
    allMonths = await monthsRes.json();
    allWeekCards = await weekCardsRes.json();
  } catch (err) {
    console.error('Error loading archetype wheel data:', err);
  }
  buildWheel();
  selectMonth(new Date().getMonth() + 1);
}

// ISO 8601 week number — same algorithm used on the kiosk page (index.js)
function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const firstDayNum = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNum + 3);
  return 1 + Math.round((d - firstThursday) / (7 * 24 * 3600 * 1000));
}

// angle 0 = 12 o'clock, increasing clockwise, in SVG's y-down coordinate space
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
}

function donutSegmentPath(cx, cy, rInner, rOuter, startAngle, endAngle) {
  const large = endAngle - startAngle > 180 ? 1 : 0;
  const p1 = polarToCartesian(cx, cy, rOuter, startAngle);
  const p2 = polarToCartesian(cx, cy, rOuter, endAngle);
  const p3 = polarToCartesian(cx, cy, rInner, endAngle);
  const p4 = polarToCartesian(cx, cy, rInner, startAngle);
  return [
    `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
    'Z'
  ].join(' ');
}

function buildWheel() {
  const svg = document.getElementById('wheelSvg');
  const cx = 250, cy = 250, rOuter = 222, rInner = 116, labelR = 172;
  const frag = document.createDocumentFragment();

  MONTH_ORDER.forEach((monthNum, i) => {
    const m = allMonths.find(x => x.month === monthNum);
    if (!m) return;
    const start = i * 30, end = start + 30, mid = start + 15;

    const seg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    seg.setAttribute('d', donutSegmentPath(cx, cy, rInner, rOuter, start, end));
    seg.setAttribute('class', `wheel-seg q-${m.quadrant}`);
    seg.setAttribute('data-month', monthNum);
    seg.setAttribute('tabindex', '0');
    seg.setAttribute('role', 'button');
    seg.setAttribute('aria-label', `${m.archetype} — ${m.name}`);
    seg.addEventListener('click', () => selectMonth(monthNum));
    seg.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectMonth(monthNum); }
    });
    frag.appendChild(seg);

    const labelPos = polarToCartesian(cx, cy, labelR, mid);
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', labelPos.x.toFixed(2));
    label.setAttribute('y', labelPos.y.toFixed(2));
    label.setAttribute('class', 'wheel-label');
    label.setAttribute('data-month', monthNum);
    label.textContent = m.archetype;
    label.style.pointerEvents = 'none';
    frag.appendChild(label);
  });

  svg.appendChild(frag);
}

function selectMonth(monthNum) {
  const m = allMonths.find(x => x.month === monthNum);
  if (!m) return;

  document.querySelectorAll('.wheel-seg').forEach(seg => {
    seg.classList.toggle('selected', +seg.dataset.month === monthNum);
  });
  document.querySelectorAll('.wheel-label').forEach(label => {
    label.classList.toggle('selected', +label.dataset.month === monthNum);
  });

  document.getElementById('wheelCenterSub').textContent = m.name;

  const quadEl = document.getElementById('detailQuadrant');
  quadEl.textContent = QUADRANT_LABELS[m.quadrant];
  quadEl.className = `detail-quadrant q-${m.quadrant}`;

  document.getElementById('detailArchetype').textContent = `The ${m.archetype}`;
  document.getElementById('detailMonth').textContent = `${m.name} ${m.emoji || ''}`.trim();
  document.getElementById('detailCoreIdea').textContent = m.coreIdea;
  document.getElementById('detailGoal').textContent = m.goal;
  document.getElementById('detailFlaw').textContent = m.flaw;
  document.getElementById('detailSkill').textContent = m.skill;
  document.getElementById('detailMnemonic').textContent = `“${m.mnemonicImage}”`;

  const year = new Date().getFullYear();
  const daysInMonth = new Date(year, monthNum, 0).getDate();
  const weekNums = new Set();
  for (let d = 1; d <= daysInMonth; d++) {
    weekNums.add(getISOWeek(new Date(year, monthNum - 1, d)));
  }

  const cardsRow = document.getElementById('detailCardsRow');
  cardsRow.innerHTML = [...weekNums].sort((a, b) => a - b).map(w => {
    const card = allWeekCards.find(c => c.week === w);
    return card
      ? `<div class="detail-card"><img src="${card.image}" alt="${card.label}" title="Week ${w} — ${card.label}"><span>W${w}</span></div>`
      : `<div class="detail-card detail-card-empty"><span>W${w}</span></div>`;
  }).join('');
}

loadWheelData();
