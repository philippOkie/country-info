<template>
  <div class="country-page">
    <CountryHolidayInfo />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CountryHolidayInfo from '../components/CountryHolidayInfo.vue';

export default defineComponent({
  name: 'CountryPage',
  components: {
    CountryHolidayInfo, 
  },
});
</script>
