import { createRouter, createWebHistory } from 'vue-router'
import ManagementView from '../views/ManagementView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id',
      name: 'management',
      component: ManagementView
    },
  ]
})

export default router
