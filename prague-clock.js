const fallbackMonths = [
    { month: 1, name: "January", color: "#4f46e5", image: "images/months/1.jpg" },
    { month: 2, name: "February", color: "#dc2626", image: "images/months/2.jpg" },
    { month: 3, name: "March", color: "#059669", image: "images/months/3.jpg" },
    { month: 4, name: "April", color: "#7c3aed", image: "images/months/4.jpg" },
    { month: 5, name: "May", color: "#65a30d", image: "images/months/5.jpg" },
    { month: 6, name: "June", color: "#ea580c", image: "images/months/6.jpg" },
    { month: 7, name: "July", color: "#dc2626", image: "images/months/7.jpg" },
    { month: 8, name: "August", color: "#d97706", image: "images/months/8.jpg" },
    { month: 9, name: "September", color: "#b45309", image: "images/months/9.jpg" },
    { month: 10, name: "October", color: "#ea580c", image: "images/months/10.jpg" },
    { month: 11, name: "November", color: "#92400e", image: "images/months/11.jpg" },
    { month: 12, name: "December", color: "#166534", image: "images/months/12.jpg" }
];

const fallbackWeekdays = [
    { day: "Sunday", color: "red" },
    { day: "Monday", color: "orange" },
    { day: "Tuesday", color: "gold" },
    { day: "Wednesday", color: "green" },
    { day: "Thursday", color: "deepskyblue" },
    { day: "Friday", color: "indigo" },
    { day: "Saturday", color: "violet" }
];

const fallbackMonthDays = Array.from({ length: 31 }, (_, index) => ({
    day: index + 1,
    mnemonic: `Day ${index + 1}`,
    image: `images/days/${index + 1}.png`
}));

const englishDayProfiles = [
    "Falcon above a stone arcade",
    "Owl in a tower loft",
    "Boar crossing the harbor gate",
    "Dragon in a vaulted corridor",
    "Raccoon in the royal garden",
    "Tiger beside the bronze fan",
    "Zebra in the quiet quarter",
    "Mouse on the cedar shelf",
    "Stag on the patterned floor",
    "Hare by the cabinet of maps",
    "Snail on the carved bedframe",
    "Wolf in the meadow wind",
    "Crocodile in the moonlit reeds",
    "Spider in the maker's room",
    "Butterfly above the baker's hall",
    "Giraffe near the rusted shutters",
    "Raven on the silk ledge",
    "Elephant by the council chair",
    "Fox at the sweetwell court",
    "Courier horse in the archive drawer",
    "Peacock at the north window",
    "Chameleon beneath the storm umbrella",
    "Bat on the deep fence line",
    "Crow in the flower coffer",
    "Doe near the glowing signal",
    "Sparrow inside the travel satchel",
    "Sheep in the empty corner",
    "Ox by the old monument",
    "Chick in the red front room",
    "Ladybird at the painted gate",
    "Bull in the five-star tree"
];

const romanHours24 = [
    "XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI",
    "XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"
];
const zodiacLabels = ["AR", "TA", "GE", "CA", "LE", "VI", "LI", "SC", "SG", "CP", "AQ", "PI"];

// Calendar disc constants
const monthDayStarts = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const monthDayLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const calMonthAbbr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const calZodiacGlyphs = ["♑","♒","♓","♈","♉","♊","♋","♌","♍","♎","♏","♐"];
const calMonthColors = [
    "#1e4fa0","#0e6090","#0e7858","#1a8c4a","#3a9020","#789020",
    "#b08c1a","#cc5c14","#b03818","#8c2e18","#4c2030","#22185e"
];

// 365 saint / feast-day names (Jan 1 → Dec 31)
const saintsCalendar = [
    // January
    "Mary, Mother of God","Basil & Gregory","Genoveva","Elizabeth Ann Seton","John Neumann",
    "Epiphany","Raymond of Penyafort","Apollinaris","Adrian of Canterbury","William of Bourges",
    "Hyginus","Benedict Biscop","Hilary of Poitiers","Felix of Nola","Paul the Hermit",
    "Marcellus I","Anthony of Egypt","Prisca","Wulfstan","Fabian & Sebastian",
    "Agnes","Vincent of Saragossa","Marianne Cope","Francis de Sales","Paul the Apostle",
    "Timothy & Titus","Angela Merici","Thomas Aquinas","Gildas","Mutius of Rome",
    "John Bosco",
    // February
    "Brigid of Ireland","Presentation of Jesus","Blaise & Ansgar","Isidore of Pelusium","Agatha",
    "Paul Miki & Companions","Colette","Jerome Emiliani","Miguel Febres Cordero","Scholastica",
    "Our Lady of Lourdes","Meletius of Antioch","Ermengild","Cyril & Methodius","Claude de la Colombière",
    "Pamphilus","Seven Servite Founders","Flavian of Constantinople","Conrad of Piacenza","Jacinta & Francisco",
    "Peter Damian","Chair of Peter","Polycarp","Praetextatus","Walburga",
    "Porphyrius","Gregory of Narek","Romanus of Condat",
    // March
    "David of Wales","Chad of Mercia","Katharine Drexel","Casimir of Poland","Ciaran of Saighir",
    "Chrodegang","Perpetua & Felicity","John of God","Frances of Rome","John Ogilvie",
    "Eulogius of Córdoba","Gregory the Great","Ansovinus","Leobinus","Clement Mary Hofbauer",
    "Herbert of Cologne","Patrick of Ireland","Cyril of Jerusalem","Joseph","Cuthbert",
    "Nicholas von Flüe","Nicholas Owen","Toribio of Lima","Óscar Romero","Annunciation",
    "Ludger","Rupert of Salzburg","Gontran","Jonas & Barachisius","John Climacus",
    "Benjamin",
    // April
    "Hugh of Grenoble","Francis of Paola","Richard of Chichester","Isidore of Seville","Vincent Ferrer",
    "Celestine I","John Baptist de la Salle","Agabus","Mary of Egypt","Fulbert of Chartres",
    "Stanislaus of Kraków","Julius I","Martin I","Tiburtius & Valerian","Paternus of Wales",
    "Bernadette Soubirous","Stephen Harding","Galdinus","Alphege of Canterbury","Agnes of Montepulciano",
    "Anselm of Canterbury","Theodore of Sykeon","George","Fidelis of Sigmaringen","Mark the Evangelist",
    "Our Lady of Good Counsel","Zita","Peter Chanel","Catherine of Siena","Pius V",
    // May
    "Joseph the Worker","Athanasius","Philip & James","Florian of Austria","Hilary of Arles",
    "Marian & James","Domitian","Peter of Tarentaise","Pachomius","Antoninus of Florence",
    "Ignatius of Laconi","Nereus & Achilleus","Our Lady of Fatima","Matthias","Isidore the Farmer",
    "Andrew Bobola","Paschal Baylón","John I","Dunstan","Bernardino of Siena",
    "Christopher Magallanes","Rita of Cascia","John Baptist Rossi","Mary Magdalene de Pazzi","Bede & Gregory VII",
    "Philip Neri","Augustine of Canterbury","Germanus of Paris","Paul VI","Joan of Arc",
    "Visitation of Mary",
    // June
    "Justin Martyr","Marcellinus & Peter","Charles Lwanga","Francis Caracciolo","Boniface",
    "Norbert","Robert of Newminster","William of York","Ephrem of Syria","Landericus",
    "Barnabas","Leo III","Anthony of Padua","Elisha","Vitus",
    "John Francis Regis","Alban","Ephraem of Edessa","Romuald","Silverius",
    "Aloysius Gonzaga","Paulinus of Nola","Etheldreda","John the Baptist","William of Vercelli",
    "Josemaría Escrivá","Cyril of Alexandria","Irenaeus of Lyon","Peter & Paul","First Martyrs of Rome",
    // July
    "Junípero Serra","Bernardino Realino","Thomas the Apostle","Elizabeth of Portugal","Anthony Zaccaria",
    "Maria Goretti","Palladius","Kilian of Würzburg","Augustine Zhao Rong","Rufina of Seville",
    "Benedict of Nursia","Gualbert","Henry II","Camillus de Lellis","Bonaventure",
    "Our Lady of Carmel","Clement of Okhrida","Pambo","Macrina the Elder","Apollinaris of Ravenna",
    "Lawrence of Brindisi","Mary Magdalene","Bridget of Sweden","Sharbel Makhluf","James the Apostle",
    "Joachim & Anne","Aurelius of Carthage","Samson of Dol","Martha Mary & Lazarus","Peter Chrysologus",
    "Ignatius of Loyola",
    // August
    "Alphonsus Liguori","Eusebius of Vercelli","Lydia of Thyatira","John Mary Vianney","Our Lady Major",
    "Transfiguration","Sixtus II","Dominic de Guzmán","Teresa Benedicta of the Cross","Lawrence of Rome",
    "Clare of Assisi","Jane Frances de Chantal","Pontian & Hippolytus","Maximilian Kolbe","Assumption of Mary",
    "Stephen of Hungary","Hyacinth of Poland","Helena","John Eudes","Bernard of Clairvaux",
    "Pius X","Queenship of Mary","Rose of Lima","Bartholomew the Apostle","Louis IX of France",
    "Dom Augustin Bartholomew","Monica","Augustine of Hippo","Beheading of John the Baptist","Fantinus",
    "Raymond Nonnatus",
    // September
    "Giles","Stephen of Zante","Gregory the Great","Rosalia","Teresa of Calcutta",
    "Bega","Cloud","Nativity of Mary","Peter Claver","Nicholas of Tolentino",
    "Paphnutius","Holy Name of Mary","John Chrysostom","Exaltation of the Holy Cross","Our Lady of Sorrows",
    "Cornelius & Cyprian","Robert Bellarmine","Joseph of Cupertino","Januarius","Andrew Kim Tae-gon",
    "Matthew the Apostle","Maurice","Padre Pio","Our Lady of Ransom","Finbar",
    "Cosmas & Damian","Vincent de Paul","Wenceslaus of Bohemia","Michael Gabriel Raphael","Jerome",
    // October
    "Thérèse of Lisieux","Guardian Angels","Thomas of Hereford","Francis of Assisi","Faustina Kowalska",
    "Bruno of Cologne","Our Lady of the Rosary","Pelagia","Denis & Companions","Francis Borgia",
    "John XXIII","Seraphin of Montegranaro","Edward the Confessor","Callixtus I","Teresa of Ávila",
    "Hedwig & Margaret Mary","Ignatius of Antioch","Luke the Evangelist","Paul of the Cross","Cornelius",
    "Hilarion","John Paul II","John of Capistrano","Anthony Mary Claret","Crispin & Crispinian",
    "Evaristus","Frumentius","Simon & Jude","Ermelinda","Alphonsus Rodriguez",
    "Wolfgang of Regensburg",
    // November
    "All Saints","All Souls","Martin de Porres","Charles Borromeo","Elizabeth & Zechariah",
    "Leonard of Noblac","Willibrord","Elizabeth of the Trinity","Dedication of Lateran","Leo the Great",
    "Martin of Tours","Josaphat","Frances Xavier Cabrini","Lawrence O'Toole","Albert the Great",
    "Margaret of Scotland & Gertrude","Elizabeth of Hungary","Dedication of Peter & Paul","Mechtilde","Edmund the Martyr",
    "Presentation of Mary","Cecilia","Clement I","Andrew Dung-Lac","Catherine of Alexandria",
    "Leonard of Port Maurice","Virgil of Salzburg","Catherine Labouré","Saturninus","Andrew the Apostle",
    // December
    "Eligius","Bibiana","Francis Xavier","John Damascene","Sabas",
    "Nicholas","Ambrose","Immaculate Conception","Peter Fourier","Our Lady of Loreto",
    "Damasus I","Our Lady of Guadalupe","Lucy","John of the Cross","Valerian",
    "Adelheid","Lazarus & Olympias","Gatianus","Anastasius I","Dominic of Silos",
    "Peter Canisius","Chaeremon","John of Kanty","Sharbel Makhluf","Christmas Eve",
    "Nativity of Christ","Stephen the First Martyr","John the Evangelist","Holy Innocents","Sabinus",
    "Sylvester I"
];

const state = {
    months: fallbackMonths,
    weekdays: fallbackWeekdays,
    monthDays: fallbackMonthDays,
    markers: [],
    mode: "live",
    isPlaying: false,
    speed: 3600,
    manualDate: null,
    selectedDayIndex: null,
    lastTick: performance.now()
};

const dom = {
    currentTime: document.getElementById("currentTime"),
    currentDateLabel: document.getElementById("currentDateLabel"),
    currentCalendarFocus: document.getElementById("currentCalendarFocus"),
    dialCenterTime: document.getElementById("dialCenterTime"),
    monthSummary: document.getElementById("monthSummary"),
    weekdaySummary: document.getElementById("weekdaySummary"),
    astronomySummary: document.getElementById("astronomySummary"),
    dialLayerSummary: document.getElementById("dialLayerSummary"),
    zodiacRing: document.getElementById("zodiacRing"),
    goldenHand: document.getElementById("goldenHand"),
    sunDisc: document.getElementById("sunDisc"),
    sunHalo: document.getElementById("sunHalo"),
    moonMarker: document.getElementById("moonMarker"),
    siderealStar: document.getElementById("siderealStar"),
    czechRing: document.getElementById("czechRing"),
    calDiscGroup: document.getElementById("calDiscGroup"),
    calSaintToday: document.getElementById("calSaintToday"),
    calendarMonthName: document.getElementById("calendarMonthName"),
    calendarDayNumber: document.getElementById("calendarDayNumber"),
    calendarWeekday: document.getElementById("calendarWeekday"),
    dayMnemonic: document.getElementById("dayMnemonic"),
    simulationNotes: document.getElementById("simulationNotes"),
    monthImage: document.getElementById("monthImage"),
    dayImage: document.getElementById("dayImage"),
    modeSelect: document.getElementById("modeSelect"),
    dateInput: document.getElementById("dateInput"),
    timeInput: document.getElementById("timeInput"),
    speedSelect: document.getElementById("speedSelect"),
    playPauseButton: document.getElementById("playPauseButton"),
    stepHourButton: document.getElementById("stepHourButton"),
    stepDayButton: document.getElementById("stepDayButton"),
    resetButton: document.getElementById("resetButton"),
    sunReadout: document.getElementById("sunReadout"),
    moonReadout: document.getElementById("moonReadout"),
    zodiacReadout: document.getElementById("zodiacReadout"),
    czechHourReadout: document.getElementById("czechHourReadout"),
    unequalReadout: document.getElementById("unequalReadout"),
    siderealReadout: document.getElementById("siderealReadout")
};

function getEnglishMnemonic(dayNumber) {
    return englishDayProfiles[dayNumber - 1] || `Day ${dayNumber}`;
}

function normalizeMonthDays(rawMonthDays) {
    return rawMonthDays.map((entry, index) => ({
        day: entry.day,
        image: entry.image,
        mnemonic: getEnglishMnemonic(index + 1),
        title: `Calendar day ${index + 1}`
    }));
}

async function loadJson(path, fallback) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load ${path}: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.warn(error.message);
        return fallback;
    }
}

function getPragueNow() {
    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Prague",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const parts = Object.fromEntries(
        formatter
            .formatToParts(new Date())
            .filter((part) => part.type !== "literal")
            .map((part) => [part.type, part.value])
    );

    const year = Number(parts.year);
    const month = Number(parts.month);
    const day = Number(parts.day);
    const hour = Number(parts.hour);
    const minute = Number(parts.minute);
    const second = Number(parts.second);
    const totalSeconds = hour * 3600 + minute * 60 + second;
    const asDate = new Date(Date.UTC(year, month - 1, day));
    const yearStart = new Date(Date.UTC(year, 0, 1));
    const dayOfYear = Math.floor((asDate - yearStart) / 86400000) + 1;

    return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
}

function createSnapshot(date) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Prague",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const parts = Object.fromEntries(
        formatter
            .formatToParts(date)
            .filter((part) => part.type !== "literal")
            .map((part) => [part.type, part.value])
    );

    const year = Number(parts.year);
    const month = Number(parts.month);
    const day = Number(parts.day);
    const hour = Number(parts.hour);
    const minute = Number(parts.minute);
    const second = Number(parts.second);
    const totalSeconds = hour * 3600 + minute * 60 + second;
    const asDate = new Date(Date.UTC(year, month - 1, day));
    const yearStart = new Date(Date.UTC(year, 0, 1));
    const dayOfYear = Math.floor((asDate - yearStart) / 86400000) + 1;

    return {
        year,
        month,
        day,
        weekday: parts.weekday,
        hour,
        minute,
        second,
        totalSeconds,
        dayOfYear,
        sourceDate: date
    };
}

function polarToCartesian(cx, cy, radius, angleDegrees) {
    const angle = (angleDegrees - 90) * (Math.PI / 180);
    return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle)
    };
}

function buildDialLabels() {
    const romanLayer = document.getElementById("romanHourMarkers");
    const zodiacLayer = document.getElementById("zodiacLabels");
    const czechLayer = document.getElementById("oldCzechHourMarkers");
    const earthGridRadials = document.getElementById("earthGridRadials");

    // (1) Roman numerals — 24 labels at 15° intervals, XII at top = noon
    romanHours24.forEach((label, index) => {
        const angle = index * 15;
        const point = polarToCartesian(260, 260, 196, angle);
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", point.x.toFixed(2));
        text.setAttribute("y", (point.y + 6).toFixed(2));
        text.setAttribute("class", "roman-label");
        text.textContent = label;
        romanLayer.appendChild(text);
    });

    // (13) Zodiac labels — 12 at 30° intervals on the rotating zodiac ring
    zodiacLabels.forEach((label, index) => {
        const angle = index * 30;
        const point = polarToCartesian(260, 260, 130, angle);
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", point.x.toFixed(2));
        text.setAttribute("y", (point.y + 4).toFixed(2));
        text.setAttribute("class", "zodiac-label");
        text.setAttribute("transform", `rotate(${angle} ${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
        text.textContent = label;
        zodiacLayer.appendChild(text);
    });

    // (8) Old Czech / Schwabacher numerals — 24 labels in the rotating group
    for (let i = 0; i < 24; i++) {
        const angle = i * 15;
        const point = polarToCartesian(260, 260, 222, angle);
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", point.x.toFixed(2));
        text.setAttribute("y", (point.y + 4).toFixed(2));
        text.setAttribute("class", "czech-hour-label");
        text.textContent = String(i === 0 ? 24 : i);
        czechLayer.appendChild(text);
    }

    // Unequal hour lines — 12 line elements (updated each frame)
    const unequalGroup = document.getElementById("unequalHourLines");
    for (let i = 0; i < 12; i++) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "260");
        line.setAttribute("y1", (260 - 80).toFixed(2));
        line.setAttribute("x2", "260");
        line.setAttribute("y2", (260 - 165).toFixed(2));
        line.setAttribute("class", "unequal-hour-line");
        line.setAttribute("data-index", String(i));
        unequalGroup.appendChild(line);

        // Label for each unequal hour line
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", "260");
        label.setAttribute("y", (260 - 155).toFixed(2));
        label.setAttribute("class", "unequal-hour-label");
        label.setAttribute("data-index", String(i));
        label.textContent = String(i + 1);
        unequalGroup.appendChild(label);
    }

    // Earth grid radials
    for (let i = 0; i < 12; i++) {
        const angle = i * 30;
        const end = polarToCartesian(260, 260, 58, angle);
        const radial = document.createElementNS("http://www.w3.org/2000/svg", "line");
        radial.setAttribute("x1", "260");
        radial.setAttribute("y1", "260");
        radial.setAttribute("x2", end.x.toFixed(2));
        radial.setAttribute("y2", end.y.toFixed(2));
        radial.setAttribute("class", "earth-grid-radial");
        earthGridRadials.appendChild(radial);
    }
}

function svgEl(tag) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
}

function sectorPath(cx, cy, innerR, outerR, startAngle, endAngle) {
    const s1 = polarToCartesian(cx, cy, outerR, startAngle);
    const e1 = polarToCartesian(cx, cy, outerR, endAngle);
    const s2 = polarToCartesian(cx, cy, innerR, endAngle);
    const e2 = polarToCartesian(cx, cy, innerR, startAngle);
    const lf = (endAngle - startAngle) > 180 ? 1 : 0;
    return [
        `M ${s1.x.toFixed(1)} ${s1.y.toFixed(1)}`,
        `A ${outerR} ${outerR} 0 ${lf} 1 ${e1.x.toFixed(1)} ${e1.y.toFixed(1)}`,
        `L ${s2.x.toFixed(1)} ${s2.y.toFixed(1)}`,
        `A ${innerR} ${innerR} 0 ${lf} 0 ${e2.x.toFixed(1)} ${e2.y.toFixed(1)}`,
        "Z"
    ].join(" ");
}

function buildCalendarDial() {
    // Canvas-based 365-segment calendar disc for reliable rendering.
    const canvas = document.getElementById('calendarCanvas');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');
    // logical drawing size
    const size = 600;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    // set internal pixel buffer for crisp rendering on HiDPI
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cx = size / 2, cy = size / 2;
    const outerR = 289, innerR = 116;

    // Clear (logical coords)
    ctx.clearRect(0, 0, size, size);

    // Draw month sectors
    monthDayStarts.forEach((start, mi) => {
        const a1 = (start / 365) * Math.PI * 2 - Math.PI/2;
        const a2 = ((start + monthDayLengths[mi]) / 365) * Math.PI * 2 - Math.PI/2;
        ctx.beginPath();
        ctx.moveTo(cx + innerR*Math.cos(a1), cy + innerR*Math.sin(a1));
        ctx.arc(cx, cy, innerR, a1, a2, false);
        ctx.lineTo(cx + outerR*Math.cos(a2), cy + outerR*Math.sin(a2));
        ctx.arc(cx, cy, outerR, a2, a1, true);
        ctx.closePath();
        ctx.fillStyle = calMonthColors[mi];
        ctx.globalAlpha = 0.98;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = 'rgba(212,168,60,0.7)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
    });

    // Draw day ticks
    for (let i = 0; i < 365; i++) {
        const angle = (i/365)*Math.PI*2 - Math.PI/2;
        const isMonthBound = monthDayStarts.includes(i);
        const r1 = isMonthBound ? 229 : 237;
        const r2 = 265;
        ctx.beginPath();
        ctx.moveTo(cx + r1*Math.cos(angle), cy + r1*Math.sin(angle));
        ctx.lineTo(cx + r2*Math.cos(angle), cy + r2*Math.sin(angle));
        ctx.strokeStyle = isMonthBound ? 'rgba(255,209,109,0.95)' : 'rgba(212,161,69,0.85)';
        ctx.lineWidth = isMonthBound ? 2.0 : 1.0;
        ctx.stroke();
    }

    // Draw thin decorative rings
    ctx.beginPath(); ctx.arc(cx,cy,outerR,0,Math.PI*2); ctx.strokeStyle='rgba(200,170,80,0.45)'; ctx.lineWidth=3; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx,cy,265,0,Math.PI*2); ctx.strokeStyle='rgba(120,90,40,0.25)'; ctx.lineWidth=1.2; ctx.stroke();

    // Draw small month medallions and labels on overlay SVG via DOM for crisp text
    const overlay = document.getElementById('calendarOverlay');
    // remove previous month labels
    const old = overlay.querySelectorAll('.cal-month-label, .cal-month-medal, .cal-zodiac-glyph');
    old.forEach(n=>n.remove());
    monthDayStarts.forEach((start, mi) => {
        const mid = (start + monthDayLengths[mi]/2) / 365 * Math.PI*2 - Math.PI/2;
        const rx = cx + 172*Math.cos(mid);
        const ry = cy + 172*Math.sin(mid);
        const medal = svgEl('circle');
        medal.setAttribute('cx', rx.toFixed(1)); medal.setAttribute('cy', ry.toFixed(1)); medal.setAttribute('r', '17'); medal.setAttribute('class','cal-month-medal');
        overlay.appendChild(medal);
        const glyph = svgEl('text'); glyph.setAttribute('x', rx.toFixed(1)); glyph.setAttribute('y', (ry+6).toFixed(1)); glyph.setAttribute('class','cal-zodiac-glyph'); glyph.textContent = calZodiacGlyphs[mi]; overlay.appendChild(glyph);
        const lab = svgEl('text'); lab.setAttribute('x', (cx + 205*Math.cos(mid)).toFixed(1)); lab.setAttribute('y', (cy + 205*Math.sin(mid)+4).toFixed(1)); lab.setAttribute('class','cal-month-label'); lab.textContent = calMonthAbbr[mi]; overlay.appendChild(lab);
    });

    // Build a single circular textPath containing all 365 names (dense ring)
    // Ensure defs has a path for the names
    const rNames = 275;
    const pathD = `M ${cx} ${cy - rNames} A ${rNames} ${rNames} 0 1 1 ${cx - 0.001} ${cy - rNames}`;
    let defsNode = overlay.querySelector('defs');
    if (!defsNode) {
        defsNode = svgEl('defs');
        overlay.insertBefore(defsNode, overlay.firstChild);
    }
    let namesPath = defsNode.querySelector('#calNamesPath');
    if (!namesPath) {
        namesPath = svgEl('path');
        namesPath.setAttribute('id', 'calNamesPath');
        namesPath.setAttribute('d', pathD);
        namesPath.setAttribute('fill', 'none');
        defsNode.appendChild(namesPath);
    } else {
        namesPath.setAttribute('d', pathD);
    }

    // Group that will be rotated to scroll the ring
    let namesRot = overlay.querySelector('#calNamesRot');
    if (!namesRot) {
        namesRot = svgEl('g');
        namesRot.setAttribute('id', 'calNamesRot');
        namesRot.setAttribute('transform', 'rotate(0 300 300)');
        overlay.appendChild(namesRot);
    }

    // Single text element with textPath
    let namesText = overlay.querySelector('#calNamesText');
    const separator = ' · ';
    const allNames = saintsCalendar.join(separator);
    if (!namesText) {
        namesText = svgEl('text');
        namesText.setAttribute('id', 'calNamesText');
        namesText.setAttribute('class', 'cal-names-text');
        const tp = svgEl('textPath');
        // support both older xlink:href and modern href
        tp.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#calNamesPath');
        tp.setAttribute('href', '#calNamesPath');
        tp.setAttribute('startOffset', '0%');
        tp.textContent = allNames;
        namesText.appendChild(tp);
        namesRot.appendChild(namesText);
    } else {
        const tp = namesText.querySelector('textPath');
        if (tp) tp.textContent = allNames;
    }

    // ensure pointer group exists but hidden initially
    const overlayEl = document.getElementById('calendarOverlay');
    if (overlayEl) {
        let pg = overlayEl.querySelector('#calSelectionPointer');
        if (!pg) {
            pg = svgEl('g'); pg.setAttribute('id','calSelectionPointer'); pg.setAttribute('class','cal-selection-pointer'); pg.setAttribute('style','display:none;');
            const line = svgEl('line'); line.setAttribute('id','calSelectionLine'); line.setAttribute('x1','300'); line.setAttribute('y1','300');
            const tip = svgEl('circle'); tip.setAttribute('id','calSelectionTip'); tip.setAttribute('r','7');
            pg.appendChild(line); pg.appendChild(tip);
            overlayEl.appendChild(pg);
        }
    }
}

function buildSaintsList() {
    const container = document.getElementById('saintsList');
    if (!container) return;
    container.innerHTML = '';
    for (let mi = 0; mi < 12; mi++) {
        const monthEl = document.createElement('div');
        monthEl.className = 'saints-month';
        const heading = document.createElement('h3');
        heading.textContent = (state.months && state.months[mi] && state.months[mi].name) || calMonthAbbr[mi];
        monthEl.appendChild(heading);
        const list = document.createElement('div');
        list.className = 'saint-list-month';
        const start = monthDayStarts[mi];
        const len = monthDayLengths[mi];
        for (let d = 0; d < len; d++) {
            const idx = start + d;
            const item = document.createElement('div');
            item.className = 'saint-item';
            item.dataset.index = String(idx);
            const daySpan = document.createElement('span'); daySpan.className = 'day-num'; daySpan.textContent = String(d + 1).padStart(2, '0');
            const nameSpan = document.createElement('span'); nameSpan.className = 'saint-name'; nameSpan.textContent = saintsCalendar[idx] || `Day ${idx + 1}`;
            item.appendChild(daySpan); item.appendChild(nameSpan);
            item.addEventListener('click', () => selectDay(idx));
            list.appendChild(item);
        }
        monthEl.appendChild(list);
        container.appendChild(monthEl);
    }
}

function selectDay(index) {
    state.selectedDayIndex = index;
    // highlight list
    const container = document.getElementById('saintsList');
    if (container) {
        const prev = container.querySelector('.saint-item.selected');
        if (prev) prev.classList.remove('selected');
        const el = container.querySelector(`.saint-item[data-index="${index}"]`);
        if (el) { el.classList.add('selected'); el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }); }
    }
    // update pointer and set manual date
    updateSelectionPointer(index);
    const now = getPragueNow();
    const year = now.getFullYear();
    const dayOfYear = mapIndexToDayOfYear(index, year);
    state.mode = 'manual';
    state.isPlaying = false;
    state.manualDate = dateFromDayOfYear(year, dayOfYear);
    updateModeUi();
    updateSimulation();
}

function updateSelectionPointer(index) {
    const overlay = document.getElementById('calendarOverlay');
    if (!overlay) return;
    const pg = overlay.querySelector('#calSelectionPointer');
    if (!pg) return;
    if (index == null) { pg.style.display = 'none'; return; }
    const angleDeg = (index % 365) * (360 / 365);
    const pt = polarToCartesian(300, 300, 275, angleDeg);
    const line = overlay.querySelector('#calSelectionLine');
    const tip = overlay.querySelector('#calSelectionTip');
    if (line) { line.setAttribute('x2', pt.x.toFixed(1)); line.setAttribute('y2', pt.y.toFixed(1)); }
    if (tip) { tip.setAttribute('cx', pt.x.toFixed(1)); tip.setAttribute('cy', pt.y.toFixed(1)); }
    pg.style.display = 'inline';
}
function describeZodiac(dayOfYear) {
    const adjusted = ((dayOfYear - 80) + 365) % 365;
    const index = Math.floor((adjusted / 365.25) * 12) % 12;
    const names = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
    return names[index];
}

function getMoonPhase(dayOfYear, hourFraction) {
    const moonCycle = 29.530588;
    const age = ((dayOfYear + hourFraction - 3) % moonCycle + moonCycle) % moonCycle;
    const illumination = (1 - Math.cos((2 * Math.PI * age) / moonCycle)) / 2;

    let phaseName = "New moon";
    if (age > 1.8 && age <= 5.5) phaseName = "Waxing crescent";
    else if (age > 5.5 && age <= 9.2) phaseName = "First quarter";
    else if (age > 9.2 && age <= 12.9) phaseName = "Waxing gibbous";
    else if (age > 12.9 && age <= 16.6) phaseName = "Full moon";
    else if (age > 16.6 && age <= 20.3) phaseName = "Waning gibbous";
    else if (age > 20.3 && age <= 24) phaseName = "Last quarter";
    else if (age > 24) phaseName = "Waning crescent";

    return { age, illumination, phaseName };
}

function getDaylightHours(dayOfYear) {
    // Prague (~50°N): daylight varies from ~8h in winter to ~16h in summer
    return 12 + 4 * Math.sin(((dayOfYear - 80) / 365.25) * 2 * Math.PI);
}

function isLeapYear(year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

// Map a calendar day-of-year (1..365 or 366) to a 0-based index into the 365-entry saintsCalendar.
// On leap years the 29 Feb day is folded into Feb 28 so the disc remains 365 entries.
function mapDayOfYearTo365Index(dayOfYear, year) {
    if (isLeapYear(year) && dayOfYear > 59) {
        // compress by removing the leap-day slot
        return Math.max(0, Math.min(364, dayOfYear - 2));
    }
    return Math.max(0, Math.min(364, dayOfYear - 1));
}

function mapIndexToDayOfYear(index, year) {
    // inverse of mapDayOfYearTo365Index
    index = Math.max(0, Math.min(364, index));
    if (isLeapYear(year)) {
        // indices 0..58 map to days 1..59 (Jan 1..Feb 28)
        if (index <= 58) return index + 1;
        // indices 59..364 map to days 61..366 (skip Feb 29)
        return index + 2;
    }
    return index + 1;
}

function dateFromDayOfYear(year, dayOfYear) {
    // return a Date object at noon UTC for the given day-of-year
    return new Date(Date.UTC(year, 0, dayOfYear - 1, 12, 0, 0));
}

function debounce(fn, wait = 120) {
    let t;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

function attachCalendarInteractions() {
    if (attachCalendarInteractions._attached) return;
    attachCalendarInteractions._attached = true;

    const canvas = document.getElementById('calendarCanvas');
    if (!canvas) return;

    // create small tooltip element
    let tooltip = document.getElementById('calendarTooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'calendarTooltip';
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip);
    }

    const logicalSize = 600;
    const innerR = 116;
    const outerR = 289;
    let namesRotation = 0;

    function hideTooltip() {
        tooltip.style.display = 'none';
    }

    function showTooltip(text, clientX, clientY) {
        tooltip.textContent = text;
        tooltip.style.left = clientX + 'px';
        tooltip.style.top = (clientY - 12) + 'px';
        tooltip.style.display = 'block';
    }

    function getDayIndexFromEvent(ev) {
        const rect = canvas.getBoundingClientRect();
        const px = (ev.clientX - rect.left) / rect.width * logicalSize;
        const py = (ev.clientY - rect.top) / rect.height * logicalSize;
        const dx = px - logicalSize / 2;
        const dy = py - logicalSize / 2;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (r < innerR - 6 || r > outerR + 6) return null;
        let angle = Math.atan2(dy, dx); // -PI..PI, 0 is +X
        let angleDeg = angle * 180 / Math.PI + 90; // convert so 0 is top
        if (angleDeg < 0) angleDeg += 360;
        const dayIndex = Math.floor(angleDeg / (360 / 365)) % 365;
        return dayIndex;
    }

    function onPointerMove(ev) {
        const di = getDayIndexFromEvent(ev);
        if (di == null) return hideTooltip();
        const name = saintsCalendar[di] || `Day ${di + 1}`;
        showTooltip(name, ev.clientX, ev.clientY);
    }

    function onPointerLeave() { hideTooltip(); }

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    canvas.addEventListener('pointerdown', (ev) => {
        const di = getDayIndexFromEvent(ev);
        if (di == null) return;
        selectDay(di);
    });

    // Wheel scroll rotates the names ring for scrolling through the dense text
    canvas.addEventListener('wheel', (ev) => {
        ev.preventDefault();
        namesRotation = (namesRotation + ev.deltaY * 0.22) % 360;
        const nr = document.getElementById('calNamesRot');
        if (nr) nr.setAttribute('transform', `rotate(${namesRotation} 300 300)`);
    }, { passive: false });

    // handle resize -> rebuild dial for crispness
    const onResize = debounce(() => {
        buildCalendarDial();
        updateSimulation();
    }, 150);
    window.addEventListener('resize', onResize);
    // wire control buttons
    const zoomBtn = document.getElementById('calZoomToggle');
    const namesBtn = document.getElementById('calToggleNames');
    const frame = document.getElementById('calendarFullWidthDial');
    if (zoomBtn && frame) {
        zoomBtn.addEventListener('click', () => {
            frame.classList.toggle('zoomed');
            // when zoomed, rebuild overlay to increase font sizes
            buildCalendarDial();
        });
    }
    if (namesBtn && frame) {
        namesBtn.addEventListener('click', () => {
            frame.classList.toggle('hide-names');
            const nr = document.getElementById('calNamesRot');
            if (nr) nr.style.display = frame.classList.contains('hide-names') ? 'none' : 'inline';
        });
    }
}

function getSunriseHour(dayOfYear) {
    return 12 - getDaylightHours(dayOfYear) / 2;
}

function getSunsetHour(dayOfYear) {
    return 12 + getDaylightHours(dayOfYear) / 2;
}

// (8) Old Czech / Italian hours: day resets at sunset, counts 1-24 from sunset
function getOldCzechHour(totalSeconds, dayOfYear) {
    const sunsetSeconds = getSunsetHour(dayOfYear) * 3600;
    const sinceSunset = (totalSeconds - sunsetSeconds + 86400) % 86400;
    return Math.floor(sinceSunset / 3600) + 1;
}

// Unequal / Planetary hours: daylight divided into 12 parts, nighttime into 12 parts
function getUnequalHour(totalSeconds, dayOfYear) {
    const sunriseHour = getSunriseHour(dayOfYear);
    const sunsetHour = getSunsetHour(dayOfYear);
    const daylightSeconds = (sunsetHour - sunriseHour) * 3600;
    const nightSeconds = 86400 - daylightSeconds;
    const currentHour = totalSeconds / 3600;

    if (currentHour >= sunriseHour && currentHour < sunsetHour) {
        const sinceSunrise = (currentHour - sunriseHour) * 3600;
        const hour = Math.min(12, Math.floor(sinceSunrise / (daylightSeconds / 12)) + 1);
        return { isDay: true, hour, minuteLength: (daylightSeconds / 12 / 60).toFixed(1) };
    }

    let sinceNight;
    if (currentHour >= sunsetHour) {
        sinceNight = (currentHour - sunsetHour) * 3600;
    } else {
        sinceNight = (currentHour + 24 - sunsetHour) * 3600;
    }
    const hour = Math.min(12, Math.floor(sinceNight / (nightSeconds / 12)) + 1);
    return { isDay: false, hour, minuteLength: (nightSeconds / 12 / 60).toFixed(1) };
}

// (6) Sidereal angle: the vernal equinox star gains one extra revolution per year
function getSiderealAngle(handAngle, dayOfYear) {
    return (handAngle + ((dayOfYear - 80) / 365.25) * 360) % 360;
}

// Sun's radial distance from center on the golden hand (varies with declination)
function getSunRadius(dayOfYear) {
    // Range 105-155: closer to center in winter (narrow arc), further in summer (wide arc)
    return 130 + 25 * Math.sin(((dayOfYear - 80) / 365.25) * 2 * Math.PI);
}

// Convert hour to dial angle (noon=0° at top, clockwise, midnight=180° at bottom)
function hourToDialAngle(hour) {
    return ((hour + 12) % 24) * 15;
}

function cartesianToArcPath(cx, cy, radius, startAngle, endAngle) {
    const start = polarToCartesian(cx, cy, radius, endAngle);
    const end = polarToCartesian(cx, cy, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function getDateInputValue(snapshot) {
    return `${snapshot.year}-${String(snapshot.month).padStart(2, "0")}-${String(snapshot.day).padStart(2, "0")}`;
}

function getTimeInputValue(snapshot) {
    return `${String(snapshot.hour).padStart(2, "0")}:${String(snapshot.minute).padStart(2, "0")}`;
}

function syncInputs(snapshot) {
    if (document.activeElement !== dom.dateInput) {
        dom.dateInput.value = getDateInputValue(snapshot);
    }

    if (document.activeElement !== dom.timeInput) {
        dom.timeInput.value = getTimeInputValue(snapshot);
    }
}

function updateModeUi() {
    const isManual = state.mode === "manual";
    dom.modeSelect.value = state.mode;
    dom.dateInput.disabled = !isManual;
    dom.timeInput.disabled = !isManual;
    dom.speedSelect.disabled = !isManual;
    dom.playPauseButton.disabled = !isManual;
    dom.stepHourButton.disabled = !isManual;
    dom.stepDayButton.disabled = !isManual;
    dom.playPauseButton.classList.toggle("is-running", state.isPlaying);
    dom.playPauseButton.textContent = state.isPlaying ? "Pause playback" : "Start playback";
}

function applyManualInputs() {
    const dateValue = dom.dateInput.value;
    const timeValue = dom.timeInput.value || "00:00";
    if (!dateValue) {
        return;
    }

    state.manualDate = new Date(`${dateValue}T${timeValue}:00Z`);
}

function getActiveDate() {
    if (state.mode === "manual") {
        if (!state.manualDate) {
            state.manualDate = getPragueNow();
        }
        return new Date(state.manualDate.getTime());
    }

    return getPragueNow();
}

function updateImage(element, src, altText) {
    if (!src) {
        element.removeAttribute("src");
        element.classList.add("is-empty");
        element.alt = altText;
        element.dataset.currentSrc = "";
        return;
    }

    if (element.dataset.currentSrc !== src) {
        element.src = src;
        element.dataset.currentSrc = src;
    }

    element.alt = altText;
    element.classList.remove("is-empty");
}

function updateSimulation() {
    const snapshot = createSnapshot(getActiveDate());
    const currentMonth = state.months[snapshot.month - 1] || fallbackMonths[snapshot.month - 1];
    const currentWeekday = state.weekdays.find((entry) => entry.day === snapshot.weekday) || { day: snapshot.weekday, color: "#95b8ff" };
    const currentMonthDay = state.monthDays.find((entry) => entry.day === snapshot.day) || fallbackMonthDays[snapshot.day - 1];

    const hourFraction = snapshot.hour + snapshot.minute / 60 + snapshot.second / 3600;

    // --- Astronomical calculations ---

    // (9) Golden hand: 24h rotation, noon (XII) at top (0°), midnight at bottom (180°)
    const handAngle = hourToDialAngle(hourFraction);

    // (10) Sun on the golden hand: radial position varies with solar declination
    const sunRadius = getSunRadius(snapshot.dayOfYear);

    // (13) Zodiac ring rotation: sun crosses counterclockwise, ~1° per day
    const zodiacRotation = (snapshot.dayOfYear / 365.25) * 360;

    // (11) Moon: orbits the zodiac ring, one synodic cycle ≈ 29.53 days
    const moonAngle = handAngle + ((snapshot.dayOfYear + hourFraction / 24) / 29.53) * 360;

    // (8) Old Czech (Italian) hour: time since sunset, ring rotates to align 24 with sunset
    const sunsetHour = getSunsetHour(snapshot.dayOfYear);
    const sunriseHour = getSunriseHour(snapshot.dayOfYear);
    const oldCzechHour = getOldCzechHour(snapshot.totalSeconds, snapshot.dayOfYear);
    const czechRingRotation = hourToDialAngle(sunsetHour);

    // Unequal / Planetary hours
    const unequalHour = getUnequalHour(snapshot.totalSeconds, snapshot.dayOfYear);

    // (6) Sidereal star: vernal equinox marker, gains ~4 min/day on the golden hand
    const siderealAngle = getSiderealAngle(handAngle, snapshot.dayOfYear);

    // Moon phase
    const moonPhase = getMoonPhase(snapshot.dayOfYear, hourFraction / 24);
    const activeZodiac = describeZodiac(snapshot.dayOfYear);

    // --- Unequal hour line positions ---
    const sunriseDialAngle = hourToDialAngle(sunriseHour);
    const sunsetDialAngle = hourToDialAngle(sunsetHour);
    let daylightSpan = (sunsetDialAngle - sunriseDialAngle + 360) % 360;
    if (daylightSpan === 0) daylightSpan = 360;
    const unequalLines = document.querySelectorAll("#unequalHourLines line");
    const unequalLabels = document.querySelectorAll("#unequalHourLines text");
    for (let i = 0; i < unequalLines.length; i++) {
        const lineAngle = (sunriseDialAngle + (i + 1) * (daylightSpan / 12)) % 360;
        unequalLines[i].setAttribute("transform", `rotate(${lineAngle.toFixed(2)} 260 260)`);
    }
    for (let i = 0; i < unequalLabels.length; i++) {
        const labelAngle = (sunriseDialAngle + (i + 0.5) * (daylightSpan / 12)) % 360;
        const pt = polarToCartesian(260, 260, 155, labelAngle);
        unequalLabels[i].setAttribute("x", pt.x.toFixed(2));
        unequalLabels[i].setAttribute("y", (pt.y + 3).toFixed(2));
    }

    // --- Apply transforms ---
    document.documentElement.style.setProperty("--accent", currentMonth.color || "#d4a145");
    document.documentElement.style.setProperty("--accent-strong", "#ffd16d");
    document.documentElement.style.setProperty("--weekday-accent", currentWeekday.color || "#95b8ff");

    dom.goldenHand.setAttribute("transform", `rotate(${handAngle.toFixed(2)} 260 260)`);
    dom.sunDisc.setAttribute("cy", (260 - sunRadius).toFixed(2));
    dom.sunHalo.setAttribute("cy", (260 - sunRadius).toFixed(2));
    dom.zodiacRing.setAttribute("transform", `rotate(${zodiacRotation.toFixed(2)} 260 260)`);
    dom.moonMarker.setAttribute("transform", `rotate(${(moonAngle % 360).toFixed(2)} 260 260)`);
    dom.czechRing.setAttribute("transform", `rotate(${czechRingRotation.toFixed(2)} 260 260)`);
    dom.siderealStar.setAttribute("transform", `rotate(${siderealAngle.toFixed(2)} 260 260)`);

    // --- Text displays ---
    const timeText = `${String(snapshot.hour).padStart(2, "0")}:${String(snapshot.minute).padStart(2, "0")}:${String(snapshot.second).padStart(2, "0")}`;
    const shortTimeText = `${String(snapshot.hour).padStart(2, "0")}:${String(snapshot.minute).padStart(2, "0")}`;
    const dateText = `${currentWeekday.day}, ${currentMonth.name} ${snapshot.day}, ${snapshot.year}`;
    const modeText = state.mode === "live" ? "Live Prague clock" : state.isPlaying ? `Manual playback at ${Number(dom.speedSelect.value).toLocaleString()}x` : "Manual simulation";

    dom.currentTime.textContent = timeText;
    dom.currentDateLabel.textContent = dateText;
    dom.currentCalendarFocus.textContent = modeText;
    dom.dialCenterTime.textContent = shortTimeText;

    dom.monthSummary.textContent = `${currentMonth.name} — zodiac ring points toward ${activeZodiac}. Sunrise ${sunriseHour.toFixed(1)}h, sunset ${sunsetHour.toFixed(1)}h (${getDaylightHours(snapshot.dayOfYear).toFixed(1)}h daylight).`;
    dom.weekdaySummary.textContent = `${currentWeekday.day} — calendar disc active weekday.`;
    dom.astronomySummary.textContent = `Sun at ${handAngle.toFixed(0)}° on the dial (${unequalHour.isDay ? "daytime" : "nighttime"}). Moon in ${moonPhase.phaseName.toLowerCase()} (${(moonPhase.illumination * 100).toFixed(0)}% lit).`;
    dom.dialLayerSummary.textContent = `Dial layers: Roman 24h ring (1), Czech ring (8) rotated ${czechRingRotation.toFixed(0)}° for sunset, unequal hours, zodiac (13), sidereal star (6).`;

    dom.calendarMonthName.textContent = currentMonth.name;
    dom.calendarDayNumber.textContent = String(snapshot.day);
    dom.calendarWeekday.textContent = currentWeekday.day;
    const dayIndex = mapDayOfYearTo365Index(snapshot.dayOfYear, snapshot.year);
    const saintToday = saintsCalendar[dayIndex] || `Day ${snapshot.dayOfYear}`;
    dom.dayMnemonic.textContent = saintToday;
    if (dom.calSaintToday) dom.calSaintToday.textContent = saintToday;
    // ensure canvas overlay text updates
    const overlay = document.getElementById('calendarOverlay');
    if (overlay) {
        const todayText = overlay.querySelector('#calSaintToday');
        if (todayText) todayText.textContent = saintToday;
    }
    // update selection pointer (keeps pointer in sync across updates)
    if (typeof updateSelectionPointer === 'function') {
        if (state.selectedDayIndex != null) updateSelectionPointer(state.selectedDayIndex);
        else {
            const ov = document.getElementById('calendarOverlay');
            if (ov) {
                const pg = ov.querySelector('#calSelectionPointer');
                if (pg) pg.style.display = 'none';
            }
        }
    }
    dom.simulationNotes.textContent = `Zodiac: ${activeZodiac}. Old Czech hour: ${oldCzechHour} since sunset. Moon age: ${moonPhase.age.toFixed(1)} days.`;

    // Readout cards
    dom.sunReadout.textContent = `On golden hand at ${handAngle.toFixed(1)}°, radius ${sunRadius.toFixed(0)} (${unequalHour.isDay ? "above horizon" : "below horizon"})`;
    dom.moonReadout.textContent = `${moonPhase.phaseName}, age ${moonPhase.age.toFixed(1)} days, ${(moonPhase.illumination * 100).toFixed(0)}% illuminated`;
    dom.zodiacReadout.textContent = `${activeZodiac}, ring rotated ${zodiacRotation.toFixed(1)}°`;
    dom.czechHourReadout.textContent = `Hour ${oldCzechHour} since sunset (ring rotated ${czechRingRotation.toFixed(0)}°)`;
    dom.unequalReadout.textContent = unequalHour.isDay
        ? `Day hour ${unequalHour.hour} of 12 (each ≈${unequalHour.minuteLength} min)`
        : `Night hour ${unequalHour.hour} of 12 (each ≈${unequalHour.minuteLength} min)`;
    dom.siderealReadout.textContent = `Star at ${siderealAngle.toFixed(1)}° (leads hand by ${((siderealAngle - handAngle + 360) % 360).toFixed(1)}°)`;

    updateImage(dom.monthImage, currentMonth.image, `${currentMonth.name} illustration`);
    updateImage(dom.dayImage, currentMonthDay.image, `Calendar day ${snapshot.day} illustration`);
    syncInputs(snapshot);

    // Rotate calendar disc so today lands at the top (angle 0)
    if (dom.calDiscGroup) {
        const calRot = -(dayIndex) * (360 / 365);
        dom.calDiscGroup.setAttribute("transform", `rotate(${calRot.toFixed(2)} 300 300)`);
    }
}

function tick(timestamp) {
    const elapsedSeconds = (timestamp - state.lastTick) / 1000;
    state.lastTick = timestamp;

    if (state.mode === "manual" && state.isPlaying && state.manualDate) {
        state.manualDate = new Date(state.manualDate.getTime() + elapsedSeconds * state.speed * 1000);
    }

    updateSimulation();
    window.requestAnimationFrame(tick);
}

function wireControls() {
    dom.modeSelect.addEventListener("change", () => {
        state.mode = dom.modeSelect.value;
        if (state.mode === "manual") {
            state.manualDate = getPragueNow();
        } else {
            state.isPlaying = false;
        }
        updateModeUi();
        updateSimulation();
    });

    dom.dateInput.addEventListener("change", () => {
        state.mode = "manual";
        applyManualInputs();
        updateModeUi();
        updateSimulation();
    });

    dom.timeInput.addEventListener("change", () => {
        state.mode = "manual";
        applyManualInputs();
        updateModeUi();
        updateSimulation();
    });

    dom.speedSelect.addEventListener("change", () => {
        state.speed = Number(dom.speedSelect.value);
        updateSimulation();
    });

    dom.playPauseButton.addEventListener("click", () => {
        state.mode = "manual";
        if (!state.manualDate) {
            state.manualDate = getPragueNow();
        }
        state.isPlaying = !state.isPlaying;
        updateModeUi();
        updateSimulation();
    });

    dom.stepHourButton.addEventListener("click", () => {
        state.mode = "manual";
        if (!state.manualDate) {
            state.manualDate = getPragueNow();
        }
        state.manualDate = new Date(state.manualDate.getTime() + 3600000);
        updateModeUi();
        updateSimulation();
    });

    dom.stepDayButton.addEventListener("click", () => {
        state.mode = "manual";
        if (!state.manualDate) {
            state.manualDate = getPragueNow();
        }
        state.manualDate = new Date(state.manualDate.getTime() + 86400000);
        updateModeUi();
        updateSimulation();
    });

    dom.resetButton.addEventListener("click", () => {
        state.mode = "live";
        state.isPlaying = false;
        state.manualDate = null;
        updateModeUi();
        updateSimulation();
    });
}

async function init() {
    buildDialLabels();

    const [months, weekdays, monthDays] = await Promise.all([
        loadJson("months.json", fallbackMonths),
        loadJson("weekdays.json", fallbackWeekdays),
        loadJson("monthDays.json", fallbackMonthDays)
    ]);

    state.months = months;
    state.weekdays = weekdays;
    state.monthDays = normalizeMonthDays(monthDays);
    state.speed = Number(dom.speedSelect.value);
    state.lastTick = performance.now();

    buildCalendarDial();
    buildSaintsList();
    attachCalendarInteractions();
    wireControls();
    updateModeUi();
    updateSimulation();
    window.requestAnimationFrame(tick);
}

init();