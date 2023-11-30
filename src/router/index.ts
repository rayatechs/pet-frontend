import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import HomeView from '../views/HomeView.vue'
import TutorialView from '../views/TutorialView.vue'
import AdView from '../views/AdView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainView,
      redirect: () => {
        return { path: '/home' }
      },
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView,
          meta: { transition: 'slide-left' }
        },
        {
          path: '/tutorial',
          name: 'tutorial',
          component: TutorialView,
          meta: { transition: 'slide-left' }
        },
        {
          path: '/ad',
          name: 'ad',
          component: AdView,
          meta: { transition: 'slide-left' }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Auth/RegisterView.vue')
    },
    {
      path: '/pet/create',
      name: 'pet.create',
      component: () => import('@/views/Pet/CreateView.vue'),
      children: [
        {
          path: 'step-1',
          name: 'type',
          component: () => import('@/views/Pet/Steps/TypeView.vue')
        },
        {
          path: 'step-2',
          name: 'sex',
          component: () => import('@/views/Pet/Steps/SexView.vue')
        },
        {
          path: 'step-3',
          name: 'info',
          component: () => import('@/views/Pet/Steps/InfoView.vue')
        }
      ]
    },
    {
      path: '/pet/show/:id',
      name: 'pet.show',
      component: () => import('@/views/Pet/ShowView.vue')
    }
  ]
})

router.beforeEach((to) => {
  const isLoggedIn = localStorage.getItem('token') != null
  const authPages = ['login', 'register']

  if (to.meta.requiresAuth && !isLoggedIn) {
    return {
      path: '/login'
      // save the location we were at to come back later
      // query: { redirect: to.fullPath },
    }
  } else if (authPages.includes(to.name?.toString() || '') && isLoggedIn) {
    return {
      path: '/'
    }
  }
})

export default router
