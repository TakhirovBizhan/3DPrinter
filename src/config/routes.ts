import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PrintersView from '../views/PrintersView.vue'
import PlasticsView from '../views/PlasticsView.vue'
import ModelsView from '../views/ModelsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/printers',
      name: 'printers',
      component: PrintersView,
    },
    {
      path: '/plastics',
      name: 'plastics',
      component: PlasticsView,
    },
    {
      path: '/models',
      name: 'models',
      component: ModelsView,
    },
  ],
})

export default router