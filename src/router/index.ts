import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user-store'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'

// Lazy-loading (don't load this code until it's requested)
const myBook = () => import('@/views/BookView.vue')
const settings = () => import('@/views/SettingsView.vue')
const recipeDetails = () => import('@/views/recipe/DetailsRecipeView.vue')
const login = () => import('@/views/auth/LoginView.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/mybook',
    name: 'mybook',
    component: myBook,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/recipe/:id',
    name: 'recipeDetails',
    props: true,
    component: recipeDetails
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,

  // Do not work after overflow-y: scroll; in .css
  // TODO: Find a solution
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition)
        }, 10)
      })
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, _from, next) => {
  const store = useUserStore()

  if (to.meta.requiresAuth && !store.isAuthenticated()) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export { routes }

export default router
