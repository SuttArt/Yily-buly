import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'

// Lazy-loading (don't load this code until it's requested)
const myBook = () => import('@/views/BookView.vue')
const search = () => import('@/views/SearchView.vue')
const settings = () => import('@/views/SettingsView.vue')
const recipeDetails = () => import('@/views/recipe/DetailsRecipeView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mybook',
      name: 'mybook',
      component: myBook
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings
    },
    {
      path: '/recipe/:id',
      name: 'recipeDetails',
      props: true,
      component: recipeDetails
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition)
        }, 100)
      })
    } else {
      return { top: 0 }
    }
  }
})

export default router
