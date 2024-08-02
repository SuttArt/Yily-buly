import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'

// Lazy-loading (don't load this code until it's requested)
const myBook = () => import('@/views/BookView.vue')
const search = () => import('@/views/SearchView.vue')
const settings = () => import('@/views/SettingsView.vue')

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
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
