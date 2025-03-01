import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router' // This import should point to your routes file declared above

import RecipeShow from '../RecipeShow.vue'

// More about testing with Router: https://test-utils.vuejs.org/guide/advanced/vue-router.html
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

describe('RecipeShow', () => {
  beforeEach(async () => {
    // Ensures the router is ready before running tests
    await router.push('/recipe/1')
    await router.isReady()
  })

  it('renders the recipe details correctly', async () => {
    const recipe = {
      id: '1',
      owner: 'Best User',
      name: 'Test Recipe',
      description: 'A delicious test recipe',
      ingredients: [
        { name: 'Flour', quantity: 2, unit: 'cups' },
        { name: 'Sugar', quantity: 1, unit: 'tbsp' }
      ],
      instructions: ['Mix ingredients', 'Bake at 180°C for 30 minutes']
    }

    const wrapper = mount(RecipeShow, {
      props: { recipe },
      global: { plugins: [router] }
    })

    // Wait for Vue to process updates
    await wrapper.vm.$nextTick()

    // Check if the recipe name appears
    expect(wrapper.find('#recipe-title').exists()).toBe(true)
    expect(wrapper.find('#recipe-title').text()).toBe('Test Recipe')

    // Check if the ingredients appears
    const ingredients = wrapper.findAll('.recipe-ingredients')
    expect(ingredients.length).toBe(2)
    expect(ingredients[0].text()).toBe('Flour: 2 cups')
    expect(ingredients[1].text()).toBe('Sugar: 1 tbsp')

    // Check if the instructions appears
    const instructions = wrapper.findAll('.recipe-instructions')
    expect(instructions.length).toBe(2) // Ensure two steps exist
    expect(instructions[0].text()).toContain('Mix ingredients')
    expect(instructions[1].text()).toContain('Bake at 180°C for 30 minutes')

    // Check if the owner appears
    expect(wrapper.find('#recipe-owner').text()).toContain('Best User')
  })
})
