import { createRouter, createWebHistory } from 'vue-router'

const UiView = () => import('@/pages/ui/Ui.vue')
const MainView = () => import('@/pages/main/Main.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/ui',
      name: 'ui',
      component: UiView,
    },
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
  ],
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
