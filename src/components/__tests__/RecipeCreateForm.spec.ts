import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import RecipeCreateForm from '../RecipeCreateForm.vue'

describe('RecipeCreateForm', () => {
  it('renders the recipe ingredients inputs correctly', async () => {
    const type = 'ingredients'
    const ingredients = [{ name: '', quantity: 0, unit: '' }]
    const index = 0

    const wrapper = mount(RecipeCreateForm, {
      props: { type, modelValue: ingredients[0], index }
    })

    // Wait for Vue to process updates
    await wrapper.vm.$nextTick()

    // Check if the labels appears
    expect(wrapper.text()).toContain('Інгредієнт:')
    expect(wrapper.text()).toContain('Кількість:')
    expect(wrapper.text()).toContain('Максимальна кількість:')
    expect(wrapper.text()).toContain('Одиниця:')

    // Check if the input fields exist
    const nameInput = wrapper.find('input[id="ingredient_name_' + index + '"]')
    const quantityInput = wrapper.find('input[id="ingredient_quantity_' + index + '"]')
    const quantityMaxInput = wrapper.find('input[id="ingredient_quantity_max_' + index + '"]')
    const unitInput = wrapper.find('input[id="ingredient_unit_' + index + '"]')

    expect(nameInput.exists()).toBe(true)
    expect(quantityInput.exists()).toBe(true)
    expect(quantityMaxInput.exists()).toBe(true)
    expect(unitInput.exists()).toBe(true)
  })
})
