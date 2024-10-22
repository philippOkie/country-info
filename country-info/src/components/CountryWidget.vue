<template>
  <div>
    <div v-for="country in randomCountries" :key="country.name" class="widget-item">
      <div><strong>{{ country.name }}</strong></div>
      <div>Next Holiday: {{ country.holiday }}</div>
      <div>Date: {{ country.date }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';

export default defineComponent({
  name: 'CountryWidget',
  props: {
    countries: {
      type: Array as PropType<{ name: string; holiday: string; date: string }[]>,
      required: true,
    },
  },
  setup(props) {
    const getRandomCountries = (countries: { name: string; holiday: string; date: string }[], count: number) => {
      if (countries.length === 0) return [];
      const shuffled = countries.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(count, countries.length));
    };

    const randomCountries = computed(() => getRandomCountries(props.countries, 3));

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