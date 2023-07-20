import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  // history模式
  history: createWebHistory(process.env.BASE_URL),
  // hash
  // history: createWebHashHistory(process.env.BASE_URL),
  routes
})
export default router
