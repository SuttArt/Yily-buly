import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router' // This import should point to your routes file declared above

import RecipeCard from '../RecipeCard.vue'

// More about testing with Router: https://test-utils.vuejs.org/guide/advanced/vue-router.html
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

describe('RecipeCard', () => {
  beforeEach(async () => {
    // Ensures the router is ready before running tests
    await router.push('/')
    await router.isReady()
  })

  it('renders the recipe details correctly', async () => {
    const recipe = {
      id: '1',
      name: 'Test Recipe',
      description: 'A delicious test recipe',
      ingredients: [
        { name: 'Flour', quantity: 2, unit: 'cups' },
        { name: 'Sugar', quantity: 1, unit: 'tbsp' }
      ],
      instructions: ['Mix ingredients', 'Bake at 180°C for 30 minutes']
    }

    const wrapper = mount(RecipeCard, {
      props: { recipe },
      global: { plugins: [router] }
    })

    // Wait for Vue to process updates
    await wrapper.vm.$nextTick()

    // Check if the recipe name appears
    expect(wrapper.text()).toContain('Test Recipe')

    // Check if the description appears
    expect(wrapper.text()).toContain('A delicious test recipe')
  })
})
