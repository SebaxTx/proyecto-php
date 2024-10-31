import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomeSection.vue';
import Carreras from '../views/Carreras.vue';
import Cuestionario from '../components/Cuestionario.vue';
import CuestionarioPreference from '../components/CuestionarioPreference.vue';
import TestResult from '../components/TestResult.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/career', component: Carreras },
  { path: '/test-intelligence', component: Cuestionario },
  { path: '/test', component: CuestionarioPreference },
  { path: '/results', name: 'TestResult', component: TestResult},
  { path: '/login', component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
