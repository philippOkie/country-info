<template>
  <div class="container">
    <div v-for="country in countries" :key="country.code" class="country-item" @click="selectCountry(country.code)">
      {{ country.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

const selectedCountryCode = ref<string | null>(null); 

const selectCountry = (code: string): void => {
  selectedCountryCode.value = code; 
  console.log(code);
};

export default defineComponent({
  name: 'CountryList',
  props: {
    countries: {
      type: Array as PropType<{ name: string; code: string; }[]>,
      required: true,
    }
  },
  methods: {
    selectCountry(code: string): void  {
      selectedCountryCode.value = code; 
      console.log(code); 
    },
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