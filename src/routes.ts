import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/index.vue';
import House from './pages/house.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/house/:id', component: House },
];

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory('/'),
  routes, // short for `routes: routes`
});
