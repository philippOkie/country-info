<template>
  <div>
    <div v-for="country in countries" :key="country.name" class="country-item">
      {{ country.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CountryList',
  props: {
    countries: {
      type: Array as PropType<{ name: string; holiday: string; date: string }[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.country-item {
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}
</style>