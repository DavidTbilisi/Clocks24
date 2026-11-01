// All 24 Hours — a gallery of every hourly clock painting from clocks.json, ordered 00:00 → 23:00.
// Tiles use the 600px images/paintings/thumb/ copies; the full-size painting only loads in the viewer.

let hours = [];      // clocks.json sorted by time
let viewIndex = -1;  // index into `hours` shown in the viewer, -1 when closed
let nowHour = -1;

const grid = document.getElementById('hoursGrid');
const view = document.getElementById('hourView');

const thumbSrc = src => src.replace('images/paintings/', 'images/paintings/thumb/');
const hourOf = c => parseInt(c.time, 10);

async function init() {
  const res = await fetch('clocks.json');
  hours = (await res.json()).slice().sort((a, b) => a.time.localeCompare(b.time));
  renderGrid();
  markCurrentHour();
  setInterval(markCurrentHour, 30000);
}

function renderGrid() {
  grid.innerHTML = '';
  hours.forEach((c, i) => {
    const li = document.createElement('li');
    li.className = 'hour-tile';
    li.dataset.hour = hourOf(c);
    li.innerHTML = `
      <button type="button" class="hour-btn">
        <img loading="lazy" width="600" height="400" alt="">
        <span class="hour-time"></span>
        <span class="hour-now">Now</span>
        <span class="hour-info">
          <span class="hour-name"></span>
          <span class="hour-mnemonic"></span>
        </span>
      </button>`;
    // set data-derived text via textContent, not innerHTML
    li.querySelector('img').src = thumbSrc(c.src);
    li.querySelector('img').alt = c.desc;
    li.querySelector('.hour-time').textContent = c.time;
    li.querySelector('.hour-name').textContent = c.desc;
    li.querySelector('.hour-mnemonic').textContent = c.mnemonic || '';
    li.querySelector('button').addEventListener('click', () => openView(i));
    grid.appendChild(li);
  });
}

function markCurrentHour() {
  const h = new Date().getHours();
  if (h === nowHour) return;
  nowHour = h;
  grid.querySelectorAll('.hour-tile').forEach(li => {
    const isNow = Number(li.dataset.hour) === h;
    li.classList.toggle('now', isNow);
    li.querySelector('button').setAttribute('aria-current', isNow ? 'time' : 'false');
  });
}

function openView(i) {
  viewIndex = (i + hours.length) % hours.length;
  const c = hours[viewIndex];
  const img = document.getElementById('viewImg');
  img.src = c.src;
  img.alt = c.desc;
  document.getElementById('viewTime').textContent = c.time;
  document.getElementById('viewMnemonic').textContent = c.mnemonic || '';
  document.getElementById('viewName').textContent = c.desc;
  document.getElementById('viewPoetry').textContent = c.poetry || '';
  const link = document.getElementById('viewLink');
  link.href = c.link || '#';
  link.hidden = !c.link;
  if (!view.open) view.showModal();
}

document.getElementById('viewPrev').addEventListener('click', () => openView(viewIndex - 1));
document.getElementById('viewNext').addEventListener('click', () => openView(viewIndex + 1));
document.getElementById('viewClose').addEventListener('click', () => view.close());
view.addEventListener('close', () => {
  const tile = grid.children[viewIndex];
  viewIndex = -1;
  tile?.querySelector('button').focus();
});
// click on the backdrop (outside the dialog box) closes it
view.addEventListener('click', e => { if (e.target === view) view.close(); });
view.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); openView(viewIndex - 1); }
  if (e.key === 'ArrowRight') { e.preventDefault(); openView(viewIndex + 1); }
});

init();
