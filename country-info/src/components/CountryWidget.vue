<template>
  <div>
    <div
      v-for="country in randomCountries"
      :key="country.name"
      class="widget-item"
    >
      <div>
        <strong>{{ country.name }}</strong>
      </div>
      <div>Next Holiday: {{ country.holiday }}</div>
      <div>Date: {{ country.date }}</div>
    </div>
    <div v-if="randomCountries.length === 0">No countries available.</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';

const baseUrl = process.env.VUE_APP_BASE_URL;

export default defineComponent({
  name: 'CountryWidget',
  props: {
    countries: {
      type: Array as PropType<{ name: string; code: string }[]>,
      required: true,
    },
  },
  setup(props) {
    const randomCountries = ref<
      { name: string; code: string; holiday?: string; date?: string }[]
    >([]);

    const getRandomCountries = (
      countries: { name: string; code: string }[],
      count: number
    ) => {
      if (countries.length === 0) return [];
      const shuffled = countries.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(count, countries.length));
    };

    const fetchNextHolidays = async () => {
      try {
        const selectedCountries = getRandomCountries(props.countries, 3);

        const countriesWithHolidays = await Promise.all(
          selectedCountries.map(async (country) => {
            const holidayResponse = await fetch(
              `${baseUrl}/NextPublicHolidays/${country.code}`
            );
            const holidayData = await holidayResponse.json();

            const nextHoliday = holidayData[0];

            return {
              ...country,
              holiday: nextHoliday?.name || 'No holiday found',
              date: nextHoliday?.date || 'N/A',
            };
          })
        );

        randomCountries.value = countriesWithHolidays;
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    watch(
      () => props.countries,
      (newCountries) => {
        if (newCountries.length > 0) {
          fetchNextHolidays();
        }
      },
      { immediate: true }
    );

    return {
      randomCountries,
    };
  },
});
</script>

<style scoped>
.widget-item {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
