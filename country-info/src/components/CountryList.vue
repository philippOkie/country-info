<template>
  <div class="container">
    <div
      v-for="country in countries"
      :key="country.code"
      class="country-item"
      @click="selectCountry(country.code)"
    >
      {{ country.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'CountryList',
  props: {
    countries: {
      type: Array as PropType<{ name: string; code: string }[]>,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const selectedCountryCode = ref<string | null>(null);

    const selectCountry = (code: string): void => {
      selectedCountryCode.value = code;
      router.push({
        name: 'CountryHolidayInfo',
        params: { countryCode: code },
      });
    };

    return {
      selectCountry,
    };
  },
});
</script>

<style scoped>
.country-item {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}

.container {
  overflow: scroll;
  height: 100vh;

  flex-direction: column;
}
</style>
