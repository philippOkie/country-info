<template>
  <div>
    <div v-for="country in countries" :key="country.name" class="widget-item">
      <div><strong>{{ country.name }}</strong></div>
      <div>Next Holiday: {{ country.holiday }}</div>
      <div>Date: {{ country.date }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CountryWidget',
  props: {
    countries: {
      type: Array as PropType<{ name: string; holiday: string; date: string }[]>,
      required: true,
    },
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