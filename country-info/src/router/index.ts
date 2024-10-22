import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CountryHolidayInfo from '../components/CountryHolidayInfo.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/country/:countryCode',
      name: 'CountryHolidayInfo',
      component: CountryHolidayInfo,
      props: true,
    },
  ],
});

export default router;
