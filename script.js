// List of 24 clocks, oldest→newest. We skipped “Binns Clock” here.
const clocks = [
  { src: 'images/960px-Padova_Piazza_dei_Signori_Torre_dell\'Orologio_6.jpg',        desc: 'Torre dell’Orologio (Padua, Italy) – installed 1344', link: 'https://en.wikipedia.org/wiki/Torre_dell%27Orologio,_Padua' },
  { src: 'images/Zytglogge – Bern, Switzerland.jpg',             desc: 'Zytglogge (Bern, Switzerland) – c. 1405', link: 'https://en.wikipedia.org/wiki/Zytglogge' },
  { src: 'images/Prague Astronomical Clock.jpg',                desc: 'Prague Astronomical Clock – 1410', link: 'https://en.wikipedia.org/wiki/Prague_astronomical_clock' },
  { src: 'images/St Mark\'s Clock, San Marco, Venice.jpg',      desc: 'St Mark’s Clock (Venice, Italy) – 1499', link: 'https://en.wikipedia.org/wiki/St_Mark%27s_Clocktower' },
  { src: 'images/Astronomical clock tower , Town Hall of Ulm, Baden-Wurttemberg,.jpg', desc: 'Ulm Town Hall Astronomical Clock – 1520', link: 'https://en.wikipedia.org/wiki/Ulm_Town_Hall' },
  { src: 'images/Sighișoara Clock Tower – Sighișoara, Romania.jpg', desc: 'Sighișoara Clock Tower – 1648', link: 'https://en.wikipedia.org/wiki/Sighi%C8%99oara_Clock_Tower' },
  { src: 'images/Astronomical Clock of Lyon.jpg',               desc: 'Astronomical Clock of Lyon – 1661', link: 'https://en.wikipedia.org/wiki/Astronomical_clock_of_Lyon' },
  { src: 'images/Spasskaya (Saviour’s) Tower Clock – Moscow, Russia.jpg', desc: 'Spasskaya Tower Clock – 1852', link: 'https://en.wikipedia.org/wiki/Spasskaya_Tower' },
  { src: 'images/daytonian-in-manhattan%3a-tiffany-co-1853-atlas-clock.jpg', desc: 'Atlas Clock (Tiffany, NYC) – 1853', link: 'https://en.wikipedia.org/wiki/Atlas_Clock' },
  { src: 'images/BigBen.jpg',                                   desc: 'Big Ben (London) – 1859', link: 'https://en.wikipedia.org/wiki/Big_Ben' },
  { src: 'images/Église_Sainte-Croix_-_Nantes_-_01.jpg',         desc: 'Église Sainte-Croix Clock (Nantes) – 1860', link: 'https://fr.wikipedia.org/wiki/%C3%89glise_Sainte-Croix_de_Nantes' },
  { src: 'images/Dolmabahçe Clock Tower – Istanbul, Turkey.jpg', desc: 'Dolmabahçe Clock Tower – 1895', link: 'https://en.wikipedia.org/wiki/Dolmabah%C3%A7e_Clock_Tower' },
  { src: 'images/Philadelphia City Hall Clock – Philadelphia, USA.jpeg', desc: 'Philadelphia City Hall Clock – 1898', link: 'https://en.wikipedia.org/wiki/Philadelphia_City_Hall' },
  { src: 'images/Orsay clock.jpg',                              desc: 'Orsay Station Clock (Paris) – 1900', link: 'https://en.wikipedia.org/wiki/Mus%C3%A9e_d%27Orsay' },
  { src: 'images/Edwardian clock and tower, Borough.jpg',       desc: 'Edwardian Clock & Tower (Dorchester) – 1905', link: 'https://en.wikipedia.org/wiki/Dorchester,_Dorset' },
  { src: 'images/Grand Central Terminal Clock – New York City, USA.jpg', desc: 'Grand Central Terminal Clock – 1913', link: 'https://en.wikipedia.org/wiki/Grand_Central_Terminal' },
  { src: 'images/Anker Clock Vienna.jpg',                       desc: 'Anker Clock (Vienna) – 1914', link: 'https://en.wikipedia.org/wiki/Ankeruhr' },
  { src: 'images/Peace Tower – Ottawa, Canada.webp',            desc: 'Peace Tower (Ottawa) – 1920', link: 'https://en.wikipedia.org/wiki/Peace_Tower' },
  { src: 'images/Oxford Street, London, England.jpg',           desc: 'Selfridges Clock, Oxford St – 1931', link: 'https://en.wikipedia.org/wiki/Selfridges,_Oxford_Street' },
  { src: 'images/World Clock (Urania) – Berlin, Germany.jpg',   desc: 'World Clock (Urania, Berlin) – 1969', link: 'https://en.wikipedia.org/wiki/World_clock' },
  { src: 'images/Allen-Bradley Clock Tower – Milwaukee, USA.jpg', desc: 'Allen-Bradley Clock Tower – 1962', link: 'https://en.wikipedia.org/wiki/Allen-Bradley_Clock_Tower' },
  { src: 'images/Leaning Clock Tower of Tbilisi – Tbilisi, Georgia.jpg', desc: 'Leaning Clock Tower (Tbilisi) – 2011', link: 'https://en.wikipedia.org/wiki/Leaning_Clock_Tower_(Tbilisi)' },
  { src: 'images/Makkah Royal Clock Tower – Mecca, Saudi Arabia.jpg', desc: 'Makkah Royal Clock Tower – 2011', link: 'https://en.wikipedia.org/wiki/Abraj_Al_Bait' },
  { src: 'images/Binns Clock.jpg_large',                        desc: 'Binns Clock (Edinburgh, Scotland) - 1960s', link: 'https://www.atlasobscura.com/places/binns-clock' }
];

function showClockByHour() {
  const now   = new Date();
  const hour  = now.getHours();              // 0–23
  const minutes = now.getMinutes();          // 0–59
  // shift so that at 12:00 you see the very first (oldest) clock:
  const index = (hour + 12) % 24;
  const { src, desc, link } = clocks[index];

  const img  = document.getElementById('clock-img');
  const para = document.getElementById('clock-desc');
  const clock = document.querySelector('#clock-display h1');

  img.src         = src;
  img.alt         = desc;
  if (link) {
    para.innerHTML = `<a href="${link}" target="_blank" rel="noopener noreferrer">${desc}</a>`;
  } else {
    para.textContent = desc;
  }
  clock.textContent = `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

// initialize on load
window.addEventListener('DOMContentLoaded', showClockByHour);
// and refresh every 5 minutes to catch the next hour:
setInterval(showClockByHour, 5 * 60 * 1000);

// --- Owl Carousel for all clocks ---
window.addEventListener('DOMContentLoaded', function() {
  // Build carousel items
  const $carousel = $("#owl-carousel");
  clocks.forEach((clock, i) => {
    // Calculate the hour this clock is shown (0–23, oldest at 12:00)
    const hour = (i + 12) % 24;
    const hourLabel = hour.toString().padStart(2, '0') + ':00';
    const item = $(
      `<div class="carousel-item">
        <a href="${clock.link}" target="_blank" rel="noopener noreferrer">
          <img src="${clock.src}" alt="${clock.desc}" style="width:100%;max-height:180px;object-fit:contain;border-radius:4px;" />
        </a>
        <div class="carousel-desc">${clock.desc}<br><span style='color:#888;font-size:0.95em'>(Shown at ${hourLabel})</span></div>
      </div>`
    );
    $carousel.append(item);
  });
  $carousel.owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: true,
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1000: { items: 5 }
    }
  });
});
