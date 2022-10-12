import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/index.vue';
import House from './pages/house.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/house/:id', component: House },
];

export const router = createRouter({
  history: createWebHistory('/'),
  routes,
});
