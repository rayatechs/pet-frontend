import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Auth/RegisterView.vue'),
    }
  ]
})

router.beforeEach((to) => {
  const isLoggedIn = localStorage.getItem('token') != null
  const authPages = ['login', 'register']

  if (to.meta.requiresAuth && !isLoggedIn) {
    return {
      path: '/login',
      // save the location we were at to come back later
      // query: { redirect: to.fullPath },
    }
  } else if (authPages.includes(to.name) && isLoggedIn) {
    return {
      path: '/'
    }
  }
})


export default router
