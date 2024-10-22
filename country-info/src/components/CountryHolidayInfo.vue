<template>
  <div class="country-holiday-info">
    <h2>{{ selectedCountry.toUpperCase() }} Holidays - {{ selectedYear }}</h2>

    <div class="holiday-list">
      <div v-for="holiday in holidays" :key="holiday.name" class="holiday-item">
        <span class="holiday-name">{{ holiday.name }}</span>
        <span class="holiday-date">{{ formatDate(holiday.date) }}</span>
        <span class="holiday-type">{{ holiday.type }}</span>
      </div>
    </div>

    <div class="year-buttons">
      <button
        v-for="year in years"
        :key="year"
        @click="changeYear(year)"
        class="year-button"
        :class="{ active: year === selectedYear }"
      >
        {{ year }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 

const baseUrl = 'https://date.nager.at/api/v3';

interface Holiday {
  name: string;
  date: string;
  type: string;
}

export default {
  name: 'CountryHolidayInfo',
  setup() {
    const route = useRoute();
    const selectedCountry = ref(route.params.code || 'US');
    const selectedYear = ref(new Date().getFullYear());
    const years = ref([2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]);
    const holidays = ref<Holiday[]>([]);

    const fetchHolidays = async () => {
      try {
        const response = await fetch(`${baseUrl}/PublicHolidays/${selectedYear.value}/${selectedCountry.value}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        holidays.value = data; 
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    const changeYear = (year: number) => {
      selectedYear.value = year; 
      fetchHolidays();
    };

    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString(); 
    };

    onMounted(fetchHolidays);

    return {
      selectedCountry,
      selectedYear,
      years,
      holidays,
      changeYear,
      formatDate,
    };
  },
};
</script>

<style scoped>
  .holiday-list {
    height: 50vh;
    overflow: scroll;
  }

  .holiday-item {
    margin: 10px;
    border: 1px solid black;
    padding: 10px;

    display: flex;
    flex-direction: column;
  }

  .year-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .year-button {
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 5px;
    cursor: pointer;
  }
</style>