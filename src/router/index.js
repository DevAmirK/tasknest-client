import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth' 

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
  },
  {
    path: '/auth/callback',
    name: 'GoogleCallback',
    component: () => import('../views/AuthCallbackView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // Просто проверяем наличие токена — значит, пользователь залогинен
  const isLoggedIn = !!auth.token

  if ((to.path === '/' || to.path === '/login' || to.path === '/register') && isLoggedIn) {
    return next('/dashboard')
  }

  // опционально: если пользователь пытается зайти на dashboard без токена
  if (to.path === '/dashboard' && !isLoggedIn) {
    return next('/login')
  }

  next()
})

export default router
