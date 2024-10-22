<template>
  <div id="app">
    <div class="container">
      <div>
        <input type="text" placeholder="Search Input" v-model="searchTerm" />
        <h3>Countries List</h3>
       <CountryList :countries="filteredCountries" />
      </div>

      <div class="random-widget">
        <h3>Random Countries Widget</h3>
        <CountryWidget :countries="filteredCountries" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, defineComponent } from 'vue';

import CountryList from './components/CountryList.vue';
import CountryWidget from './components/CountryWidget.vue';

const baseUrl = 'https://date.nager.at/api/v3'

export default defineComponent({
  name: 'App',
  components: { CountryList, CountryWidget },
  setup() {
    const countries = ref<{ name: string; code: string }[]>([]);
    const searchTerm = ref('');

    const fetchCountries = async () => {
      try {
        const response = await fetch(`${baseUrl}/AvailableCountries`);
        const data = await response.json();

        countries.value = data.map((country: any) => ({
          name: country.name,
          code: country.countryCode,
        }));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    const filteredCountries = computed(() => {
      return countries.value.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });

    onMounted(fetchCountries);

    return {
      countries,
      searchTerm,
      filteredCountries,
    };
  },
});
</script>

<style scoped>
  .container {
    display: flex;
    gap: 9px;
  } 

  .random-widget {
    overflow: scroll;
    width: 100%;
    height: 100vh;
  }

  input {
    padding: 8px;
    margin-bottom: 10px;
  }
</style>