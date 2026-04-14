const { createApp, ref, onMounted, onUnmounted, computed, watch } = Vue;

// Clocks data will be loaded from JSON file
let clocks = [];
let months = [];
let weekdays = [];
let monthDays = [];

// Load clocks data from JSON file
async function loadClocksData() {
    try {
        const response = await fetch('clocks.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        clocks = await response.json();
        return clocks;
    } catch (error) {
        console.error('Error loading clocks data:', error);
        // Fallback to empty array if loading fails
        clocks = [];
        return clocks;
    }
}

// Load months data from JSON file
async function loadMonthsData() {
    try {
        const response = await fetch('months.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        months = await response.json();
        return months;
    } catch (error) {
        console.error('Error loading months data:', error);
        months = [];
        return months;
    }
}

// Load weekdays data from JSON file
async function loadWeekdaysData() {
    try {
        const response = await fetch('weekdays.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        weekdays = await response.json();
        return weekdays;
    } catch (error) {
        console.error('Error loading weekdays data:', error);
        weekdays = [];
        return weekdays;
    }
}

// Load month days data from JSON file
async function loadMonthDaysData() {
    try {
        const response = await fetch('monthDays.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        monthDays = await response.json();
        return monthDays;
    } catch (error) {
        console.error('Error loading month days data:', error);
        monthDays = [];
        return monthDays;
    }
}

// Note: thumbnail carousel removed. Main card will handle swipe navigation.


// Main Clock Showcase Component (swipe-enabled)
const ClockShowcase = {
    setup() {
        const currentTime = ref('');
        const clocksData = ref([]);
        const isLoading = ref(true);
        const isDarkTheme = ref(false);
        const currentIndex = ref(0);

        // Sidebar data
        const monthsData = ref([]);
        const weekdaysData = ref([]);
        const monthDaysData = ref([]);
        const currentDate = ref(new Date());

        // Pointer / swipe state
        const pointerStartX = ref(null);
        const pointerDeltaX = ref(0);
        const isPointerDown = ref(false);
        const dragging = ref(false);

        let interval = null;

        // Theme management functions
        const loadThemePreference = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                isDarkTheme.value = savedTheme === 'dark';
            } else {
                isDarkTheme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            applyTheme();
        };

        const applyTheme = () => {
            const root = document.documentElement;
            if (isDarkTheme.value) {
                root.classList.add('dark-theme');
                root.classList.remove('light-theme');
            } else {
                root.classList.add('light-theme');
                root.classList.remove('dark-theme');
            }
        };

        const toggleTheme = () => {
            isDarkTheme.value = !isDarkTheme.value;
            applyTheme();
            localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light');
        };

        // Derived current clock from index
        const currentClock = computed(() => {
            return clocksData.value.length > 0 ? (clocksData.value[currentIndex.value] || clocksData.value[0]) : {};
        });

        const updateClock = () => {
            if (clocksData.value.length === 0) return;

            const now = new Date();
            currentDate.value = now;
            const hour = now.getHours();
            const currentTimeString = hour.toString().padStart(2, '0') + ':00';

            // Find the index of the clock that matches the current hour
            const index = clocksData.value.findIndex(clock => clock.time === currentTimeString);
            if (index !== -1) {
                currentIndex.value = index;
            }

            currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        };

        const nextClock = () => {
            if (clocksData.value.length === 0) return;
            currentIndex.value = (currentIndex.value + 1) % clocksData.value.length;
        };

        const prevClock = () => {
            if (clocksData.value.length === 0) return;
            currentIndex.value = (currentIndex.value - 1 + clocksData.value.length) % clocksData.value.length;
        };

        // Pointer / swipe handlers
        const onPointerDown = (e) => {
            // Only handle primary pointer
            if (e.pointerType && e.button && e.button !== 0) return;
            isPointerDown.value = true;
            dragging.value = true;
            pointerStartX.value = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX) ?? null;
            pointerDeltaX.value = 0;
            if (e.pointerId && e.target && e.target.setPointerCapture) {
                try { e.target.setPointerCapture(e.pointerId); } catch (err) { }
            }
        };

        const onPointerMove = (e) => {
            if (!isPointerDown.value) return;
            const clientX = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX);
            if (clientX == null) return;
            pointerDeltaX.value = clientX - pointerStartX.value;
        };

        const onPointerUp = (e) => {
            if (!isPointerDown.value) return;
            isPointerDown.value = false;
            dragging.value = false;
            const threshold = 50; // px
            if (pointerDeltaX.value > threshold) {
                prevClock();
            } else if (pointerDeltaX.value < -threshold) {
                nextClock();
            }
            pointerDeltaX.value = 0;
            if (e.pointerId && e.target && e.target.releasePointerCapture) {
                try { e.target.releasePointerCapture(e.pointerId); } catch (err) { }
            }
        };

        const onPointerCancel = () => {
            isPointerDown.value = false;
            dragging.value = false;
            pointerDeltaX.value = 0;
        };

        const onKeyDown = (e) => {
            if (e.key === 'ArrowLeft') prevClock();
            else if (e.key === 'ArrowRight') nextClock();
        };

        // Computed properties for sidebar data
        const currentMonth = computed(() => {
            if (monthsData.value.length === 0) return null;
            const monthIndex = currentDate.value.getMonth();
            return monthsData.value[monthIndex];
        });

        const currentWeekday = computed(() => {
            if (weekdaysData.value.length === 0) return null;
            const dayIndex = currentDate.value.getDay();
            return weekdaysData.value[dayIndex];
        });

        const currentMonthDay = computed(() => {
            if (monthDaysData.value.length === 0) return null;
            const dayOfMonth = currentDate.value.getDate();
            return monthDaysData.value.find(day => day.day === dayOfMonth);
        });

        const initializeApp = async () => {
            isLoading.value = true;

            // Load all data files
            await Promise.all([
                loadClocksData(),
                loadMonthsData(),
                loadWeekdaysData(),
                loadMonthDaysData()
            ]);

            clocksData.value = clocks;
            monthsData.value = months;
            weekdaysData.value = weekdays;
            monthDaysData.value = monthDays;

            if (clocksData.value.length > 0) {
                // Initialize current index to the clock matching the current hour (if any)
                updateClock();
                // Refresh every minute to update time and date
                interval = setInterval(updateClock, 60 * 1000);
            }
            isLoading.value = false;
        };

        onMounted(() => {
            loadThemePreference();
            initializeApp();
            window.addEventListener('keydown', onKeyDown);
        });

        onUnmounted(() => {
            if (interval) {
                clearInterval(interval);
            }
            window.removeEventListener('keydown', onKeyDown);
        });

        return {
            currentTime,
            currentClock,
            clocksData,
            isLoading,
            isDarkTheme,
            currentIndex,
            currentMonth,
            currentWeekday,
            currentMonthDay,
            toggleTheme,
            nextClock,
            prevClock,
            onPointerDown,
            onPointerMove,
            onPointerUp,
            onPointerCancel,
            pointerDeltaX,
            dragging
        };
    },
    template: `
    <div class="app-container">
      <div id="clock-display">
        <div v-if="isLoading" class="loading">
          <h1>Loading clocks...</h1>
        </div>
        <div v-else-if="clocksData.length === 0" class="error">
          <h1>Error loading clocks data</h1>
          <p>Please check that clocks.json file is available.</p>
        </div>
        <div v-else
             class="clock-card"
             @pointerdown="onPointerDown"
             @pointermove="onPointerMove"
             @pointerup="onPointerUp"
             @pointercancel="onPointerCancel"
             @touchstart.passive="onPointerDown"
             @touchmove.passive="onPointerMove"
             @touchend.passive="onPointerUp"
             :style="{ transform: dragging ? 'translateX(' + pointerDeltaX + 'px)' : 'translateX(0)', transition: dragging ? 'none' : 'transform 300ms ease' }"
        >
          <div class="image-wrap">
            <img :src="currentClock.src" :alt="currentClock.desc" class="clock-img" />
            <h1 class="clock-overlay-time">{{ currentTime }}</h1>

            <div class="meta-bottom" role="region" aria-label="Date information">
              <div v-if="currentMonth" class="meta-bottom-item">
                <img v-if="currentMonth.image" :src="currentMonth.image" :alt="currentMonth.name" class="meta-image" @error="$event.target.style.display='none'"/>
                <div class="meta-content"><div class="meta-label">Month</div><div class="meta-value" :style="{ color: currentMonth.color }">{{ currentMonth.name }}</div></div>
              </div>
              <div v-if="currentWeekday" class="meta-bottom-item">
                <div class="meta-content"><div class="meta-label">Day</div><div class="meta-value weekday-name" :style="{ color: currentWeekday.color }">{{ currentWeekday.day.substring(0,3) }}</div></div>
              </div>
              <div v-if="currentMonthDay" class="meta-bottom-item">
                <img v-if="currentMonthDay.image" :src="currentMonthDay.image" :alt="'Day ' + currentMonthDay.day" class="meta-image" @error="$event.target.style.display='none'"/>
                <div class="meta-content"><div class="meta-label">Date</div><div class="meta-value day-number">{{ currentMonthDay.day }}</div></div>
              </div>
            </div>
          </div>
          <div class="post-image">
            <p class="clock-desc">
              <a v-if="currentClock.link" :href="currentClock.link" target="_blank" rel="noopener noreferrer">
                {{ currentClock.desc }}
              </a>
              <span v-else>{{ currentClock.desc }}</span>
            </p>
            <p v-if="currentClock.mnemonic" class="clock-mnemonic">{{ currentClock.mnemonic }}</p>
            <p id="link-to-wiki">Every hour, a different clock from around the world is displayed.</p>
          </div>
        </div>
      </div>
    </div>
  `
};

// Create Vue App
const app = createApp({
    components: {
        ClockShowcase
    }
});

app.mount('#app');
