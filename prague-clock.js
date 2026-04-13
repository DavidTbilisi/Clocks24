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

const state = {
    months: fallbackMonths,
    weekdays: fallbackWeekdays,
    monthDays: fallbackMonthDays,
    markers: [],
    mode: "live",
    isPlaying: false,
    speed: 3600,
    manualDate: null,
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
    calendarRing: document.getElementById("calendarRing"),
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

function buildCalendarRing() {
    dom.calendarRing.innerHTML = "";
    state.markers = state.monthDays.map((entry, index) => {
        const marker = document.createElement("div");
        const angle = (index / state.monthDays.length) * 360;
        const radius = 188;
        marker.className = "calendar-marker";
        marker.textContent = entry.day;
        marker.style.transform = `rotate(${angle}deg) translateY(-${radius}px) rotate(${-angle}deg)`;
        marker.title = entry.title || `Calendar day ${entry.day}`;
        dom.calendarRing.appendChild(marker);
        return marker;
    });
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
    dom.dayMnemonic.textContent = currentMonthDay.mnemonic || `Day ${snapshot.day}`;
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

    state.markers.forEach((marker, index) => {
        marker.classList.toggle("is-active", index === snapshot.day - 1);
        marker.classList.toggle("is-today-weekday", index === snapshot.day - 1);
    });
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

    buildCalendarRing();
    wireControls();
    updateModeUi();
    updateSimulation();
    window.requestAnimationFrame(tick);
}

init();