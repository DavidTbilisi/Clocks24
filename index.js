const STAGE_WD = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const STAGE_MO = ['January','February','March','April','May','June','July','August','September','October','November','December'];

let stageClocks = [], stageWeekdays = [], stageMonthDays = [], stageMonths = [];
let currentHourKey = null;

async function loadStageData() {
  try {
    const [clocksRes, weekdaysRes, monthDaysRes, monthsRes] = await Promise.all([
      fetch('clocks.json'), fetch('weekdays.json'), fetch('monthDays.json'), fetch('months.json')
    ]);
    stageClocks = await clocksRes.json();
    stageWeekdays = await weekdaysRes.json();
    stageMonthDays = await monthDaysRes.json();
    stageMonths = await monthsRes.json();
  } catch (err) {
    console.error('Error loading stage data:', err);
  }
  renderStage();
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

  document.getElementById('stageYear').textContent = now.getFullYear();

  // hour's historic clock — also drives the background image, swapped only when the hour actually changes
  const hourKey = `${hh}:00`;
  if (hourKey !== currentHourKey) {
    currentHourKey = hourKey;
    const hourClock = stageClocks.find(c => c.time === hourKey);
    if (hourClock) {
      const bg = document.getElementById('stageBg');
      bg.classList.remove('loaded');
      bg.onload = () => bg.classList.add('loaded');
      bg.src = hourClock.src;
      bg.alt = hourClock.desc;
      document.getElementById('stageClockName').textContent = hourClock.desc;
      document.getElementById('stageClockMnemonic').textContent = hourClock.mnemonic || '';
      document.getElementById('stageClockLink').href = hourClock.link || '#';
    }
  }

  const dayEntry = stageMonthDays.find(d => d.day === now.getDate());
  if (dayEntry) {
    const dayImg = document.getElementById('stageDayImg');
    dayImg.src = dayEntry.image;
    dayImg.alt = `Day ${dayEntry.day}`;
    document.getElementById('stageDayMnemonic').textContent = dayEntry.mnemonic;
  }
}

loadStageData();
setInterval(renderStage, 1000);
