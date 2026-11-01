const STAGE_WD = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const STAGE_MO = ['January','February','March','April','May','June','July','August','September','October','November','December'];

let stageClocks = [], stageWeekdays = [], stageMonthDays = [], stageMonths = [], stageWeekCards = [];
let currentHourKey = null, currentWeekKey = null, currentDayKey = null;

// Two stacked <img class="stage-bg"> layers: the next hour's painting loads into the hidden one and only then
// crossfades over the old one, so the hour change never dips to black while the new image is in flight.
let bgFront = null;
function showBackground(src, alt) {
  const a = document.getElementById('stageBg'), b = document.getElementById('stageBgB');
  const next = bgFront === a ? b : a, prev = bgFront;
  next.onload = () => {
    next.classList.add('loaded');
    if (prev) { prev.classList.remove('loaded'); prev.alt = ''; }
    bgFront = next;
  };
  next.src = src;
  next.alt = alt;
}

async function loadStageData() {
  try {
    const [clocksRes, weekdaysRes, monthDaysRes, monthsRes, weekCardsRes] = await Promise.all([
      fetch('clocks.json'), fetch('weekdays.json'), fetch('monthDays.json'), fetch('months.json'), fetch('weekCards.json')
    ]);
    stageClocks = await clocksRes.json();
    stageWeekdays = await weekdaysRes.json();
    stageMonthDays = await monthDaysRes.json();
    stageMonths = await monthsRes.json();
    stageWeekCards = await weekCardsRes.json();
  } catch (err) {
    console.error('Error loading stage data:', err);
  }
  renderStage();
}

// ISO 8601 week number (1..52, occasionally 53) — Monday-start weeks, week 1 contains the year's first Thursday
function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = (d.getUTCDay() + 6) % 7; // Mon=0..Sun=6
  d.setUTCDate(d.getUTCDate() - dayNum + 3); // nearest Thursday
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const firstDayNum = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNum + 3);
  return 1 + Math.round((d - firstThursday) / (7 * 24 * 3600 * 1000));
}

function renderStage() {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  const ss = now.getSeconds().toString().padStart(2, '0');

  document.getElementById('stageTime').firstChild.textContent = `${hh}:${mm}`;
  document.getElementById('stageSecs').textContent = `:${ss}`;

  const dayIdx = now.getDay();
  const wd = stageWeekdays[dayIdx];
  const enEl = document.getElementById('stageWeekdayEn');
  const kaEl = document.getElementById('stageWeekdayKa');
  enEl.textContent = wd ? wd.day : STAGE_WD[dayIdx];
  enEl.className = `stage-weekday wd-${dayIdx}`;
  kaEl.textContent = wd ? wd.georgian : '';
  kaEl.className = `stage-weekday georgian wd-${dayIdx}`;

  document.getElementById('stageDayNum').textContent = now.getDate();

  const monthIdx = now.getMonth();
  const monthEntry = stageMonths.find(mo => mo.month === monthIdx + 1);
  const monthEl = document.getElementById('stageMonthName');
  monthEl.textContent = monthEntry ? monthEntry.name : STAGE_MO[monthIdx];
  monthEl.className = `stage-month mo-${monthIdx}`;

  if (monthEntry && monthEntry.archetype) {
    const archNameEl = document.getElementById('stageArchetypeName');
    archNameEl.textContent = monthEntry.archetype;
    archNameEl.className = `mo-${monthIdx}`;
    document.getElementById('stageCoreIdea').textContent = `— ${monthEntry.coreIdea}`;
    document.getElementById('stageArchetype').title = monthEntry.mnemonicImage || '';
  }

  document.getElementById('stageYear').textContent = now.getFullYear();

  // hour's historic clock — also drives the background image, swapped only when the hour actually changes
  const hourKey = `${hh}:00`;
  if (hourKey !== currentHourKey) {
    currentHourKey = hourKey;
    const hourClock = stageClocks.find(c => c.time === hourKey);
    if (hourClock) {
      showBackground(hourClock.src, hourClock.desc);
      document.getElementById('stageClockName').textContent = hourClock.desc;
      document.getElementById('stageClockMnemonic').textContent = hourClock.mnemonic || '';
      document.getElementById('stageClockLink').href = hourClock.link || '#';
    }
  }

  const weekNum = getISOWeek(now);
  const weekKey = `${now.getFullYear()}-${weekNum}`;
  if (weekKey !== currentWeekKey) {
    currentWeekKey = weekKey;
    document.getElementById('stageWeekNum').textContent = weekNum;
    const card = stageWeekCards.find(c => c.week === weekNum);
    const weekImg = document.getElementById('stageWeekImg');
    const weekLabel = document.getElementById('stageWeekLabel');
    if (card) {
      weekImg.src = card.image; weekImg.alt = card.label; weekImg.style.visibility = 'visible';
      weekLabel.textContent = card.label;
    } else {
      // week 53 — the deck only maps 52 weeks, so there's no card for it
      weekImg.style.visibility = 'hidden';
      weekLabel.textContent = 'no card (53-week year)';
    }
  }

  const dayEntry = stageMonthDays.find(d => d.day === now.getDate());
  if (dayEntry && dayEntry.day !== currentDayKey) {
    currentDayKey = dayEntry.day;
    const dayImg = document.getElementById('stageDayImg');
    // 38px badge: use the 220px thumbnail, not the full-size peg art in dayEntry.image (up to several MB)
    dayImg.src = `images/days/thumb/${dayEntry.day}.jpg`;
    dayImg.alt = `Day ${dayEntry.day}`;
    document.getElementById('stageDayMnemonic').textContent = dayEntry.mnemonic;
  }
}

loadStageData();
setInterval(renderStage, 1000);
