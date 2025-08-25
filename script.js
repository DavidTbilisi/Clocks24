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

// Carousel Component
const ClockCarousel = {
  props: {
    clocks: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const currentIndex = ref(0);
    const itemsPerPage = ref(5);
    
    const updateItemsPerPage = () => {
      if (window.innerWidth < 600) {
        itemsPerPage.value = 1;
      } else if (window.innerWidth < 1000) {
        itemsPerPage.value = 3;
      } else {
        itemsPerPage.value = 5;
      }
    };

    const totalPages = computed(() => {
      return Math.ceil(props.clocks.length / itemsPerPage.value);
    });

    const visibleClocks = computed(() => {
      const start = currentIndex.value * itemsPerPage.value;
      return props.clocks.slice(start, start + itemsPerPage.value);
    });

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % totalPages.value;
    };

    const prevSlide = () => {
      currentIndex.value = currentIndex.value === 0 ? totalPages.value - 1 : currentIndex.value - 1;
    };

    const goToSlide = (index) => {
      currentIndex.value = index;
    };

    const getHourLabel = (clockIndex) => {
      const hour = (clockIndex + 12) % 24;
      return hour.toString().padStart(2, '0') + ':00';
    };

    onMounted(() => {
      updateItemsPerPage();
      window.addEventListener('resize', updateItemsPerPage);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateItemsPerPage);
    });

    return {
      currentIndex,
      itemsPerPage,
      totalPages,
      visibleClocks,
      nextSlide,
      prevSlide,
      goToSlide,
      getHourLabel
    };
  },
  template: `
    <div class="carousel-container">
      <div class="carousel-wrapper">
        <button class="carousel-nav carousel-prev" @click="prevSlide" :disabled="totalPages <= 1">‹</button>
        <div class="carousel-content">
          <div class="carousel-track">
            <div v-for="(clock, index) in visibleClocks" :key="index" class="carousel-item">
              <a :href="clock.link" target="_blank" rel="noopener noreferrer">
                <img :src="clock.src" :alt="clock.desc" />
              </a>
              <div class="carousel-desc">
                {{ clock.desc }}
                <br>
                <span>(Shown at {{ getHourLabel(clocks.indexOf(clock)) }})</span>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-nav carousel-next" @click="nextSlide" :disabled="totalPages <= 1">›</button>
      </div>
      <div v-if="totalPages > 1" class="carousel-dots">
        <button 
          v-for="page in totalPages" 
          :key="page"
          class="carousel-dot"
          :class="{ active: currentIndex === page - 1 }"
          @click="goToSlide(page - 1)"
        ></button>
      </div>
    </div>
  `
};

// Main Clock Showcase Component
const ClockShowcase = {
  components: {
    ClockCarousel
  },
  setup() {
    const currentTime = ref('');
    const currentClock = ref({});
    const clocksData = ref([]);
    const isLoading = ref(true);
    const isDarkTheme = ref(false);
    const showCarousel = ref(false);
    
    // Sidebar data
    const monthsData = ref([]);
    const weekdaysData = ref([]);
    const monthDaysData = ref([]);
    const currentDate = ref(new Date());
    
    let interval = null;

    // Theme management functions
    const loadThemePreference = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        isDarkTheme.value = savedTheme === 'dark';
      } else {
        // Default to system preference
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

    const toggleCarousel = () => {
      showCarousel.value = !showCarousel.value;
      localStorage.setItem('showCarousel', showCarousel.value.toString());
    };

    const loadCarouselPreference = () => {
      const savedPreference = localStorage.getItem('showCarousel');
      if (savedPreference !== null) {
        showCarousel.value = savedPreference === 'true';
      }
    };

    const updateClock = () => {
      if (clocksData.value.length === 0) return;
      
      const now = new Date();
      currentDate.value = now;
      const hour = now.getHours();
      const currentTimeString = hour.toString().padStart(2, '0') + ':00';
      
      // Find the clock that matches the current hour
      const clock = clocksData.value.find(clock => clock.time === currentTimeString);
      
      if (clock) {
        currentClock.value = clock;
      }
      currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
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
        updateClock();
        // Refresh every minute to update time and date
        interval = setInterval(updateClock, 60 * 1000);
      }
      isLoading.value = false;
    };

    onMounted(() => {
      loadThemePreference();
      loadCarouselPreference();
      initializeApp();
    });

    onUnmounted(() => {
      if (interval) {
        clearInterval(interval);
      }
    });

    return {
      currentTime,
      currentClock,
      clocksData,
      isLoading,
      isDarkTheme,
      showCarousel,
      currentMonth,
      currentWeekday,
      currentMonthDay,
      toggleTheme,
      toggleCarousel
    };
  },
  template: `
    <div class="app-container">
      <!-- Left Sidebar -->
      <div class="sidebar" v-if="!isLoading && clocksData.length > 0">
        <!-- Month -->
        <div class="sidebar-section" v-if="currentMonth">
          <div class="sidebar-item month-item">
            <img 
              v-if="currentMonth.image" 
              :src="currentMonth.image" 
              :alt="currentMonth.name"
              class="sidebar-image"
              @error="$event.target.style.display='none'"
            />
            <div class="sidebar-content">
              <div class="sidebar-label">Month</div>
              <div class="sidebar-value" :style="{ color: currentMonth.color }">
                {{ currentMonth.name }}
              </div>
              <div class="sidebar-emoji">{{ currentMonth.emoji }}</div>
            </div>
          </div>
        </div>

        <!-- Weekday -->
        <div class="sidebar-section" v-if="currentWeekday">
          <div class="sidebar-item weekday-item">
            <div class="sidebar-content">
              <div class="sidebar-label">Day</div>
              <div class="sidebar-value weekday-name" :style="{ color: currentWeekday.color }">
                {{ currentWeekday.day.substring(0, 3) }}
              </div>
              <div class="sidebar-emoji">{{ currentWeekday.emoji }}</div>
            </div>
          </div>
        </div>

        <!-- Month Day -->
        <div class="sidebar-section" v-if="currentMonthDay">
          <div class="sidebar-item day-item">
            <img 
              v-if="currentMonthDay.image" 
              :src="currentMonthDay.image" 
              :alt="'Day ' + currentMonthDay.day"
              class="sidebar-image"
              @error="$event.target.style.display='none'"
            />
            <div class="sidebar-content">
              <div class="sidebar-label">Date</div>
              <div class="sidebar-value day-number">
                {{ currentMonthDay.day }}
              </div>
              <div class="sidebar-mnemonic">{{ currentMonthDay.mnemonic }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div id="clock-display">
        <button class="theme-toggle" @click="toggleTheme" :title="isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'">
          <span v-if="isDarkTheme">☀️</span>
          <span v-else">🌙</span>
        </button>
        <div v-if="isLoading" class="loading">
          <h1>Loading clocks...</h1>
        </div>
        <div v-else-if="clocksData.length === 0" class="error">
          <h1>Error loading clocks data</h1>
          <p>Please check that clocks.json file is available.</p>
        </div>
        <div v-else>
          <h1>{{ currentTime }}</h1>
          <img 
            :src="currentClock.src" 
            :alt="currentClock.desc" 
            width="40%" 
            class="clock-img" 
          />
          <p class="clock-desc">
            <a 
              v-if="currentClock.link" 
              :href="currentClock.link" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {{ currentClock.desc }}
            </a>
            <span v-else>{{ currentClock.desc }}</span>
          </p>
          <p v-if="currentClock.mnemonic" class="clock-mnemonic">{{ currentClock.mnemonic }}</p>
          <p id="link-to-wiki">Every hour, a different clock from around the world is displayed.</p>
          <button class="carousel-toggle" @click="toggleCarousel" :title="showCarousel ? 'Hide other clocks' : 'Show other clocks'">
            <span v-if="showCarousel">🔼 Hide Other Clocks</span>
            <span v-else>🔽 Show Other Clocks</span>
          </button>
          <div v-if="showCarousel" id="carousel-container">
            <clock-carousel :clocks="clocksData" />
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
