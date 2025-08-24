const { createApp, ref, onMounted, onUnmounted, computed } = Vue;

// Clocks data will be loaded from JSON file
let clocks = [];

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
    let interval = null;

    const updateClock = () => {
      if (clocksData.value.length === 0) return;
      
      const now = new Date();
      const hour = now.getHours();
      // shift so that at 12:00 you see the very first (oldest) clock:
      const index = (hour + 12) % 24;
      
      if (clocksData.value[index]) {
        currentClock.value = clocksData.value[index];
      }
      currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const initializeApp = async () => {
      isLoading.value = true;
      await loadClocksData();
      clocksData.value = clocks;
      
      if (clocksData.value.length > 0) {
        updateClock();
        // Refresh every 5 minutes to catch the next hour
        interval = setInterval(updateClock, 5 * 60 * 1000);
      }
      isLoading.value = false;
    };

    onMounted(() => {
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
      isLoading
    };
  },
  template: `
    <div id="clock-display">
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
        <p id="link-to-wiki">Every hour, a different clock from around the world is displayed.</p>
        <div id="carousel-container">
          <clock-carousel :clocks="clocksData" />
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
