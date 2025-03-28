import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import RecipeFormFields from '../RecipeFormFields.vue'
describe('RecipeFormFields ingredients', () => {
  const type = 'ingredients'
  const ingredients = [{ name: '', quantity: 0, unit: '' }]
  const index = 0

  const wrapper = mount(RecipeFormFields, {
    props: { type, modelValue: ingredients[0], index }
  })

  const nameInput = wrapper.find<HTMLInputElement>('input[id="ingredient_name_' + index + '"]')
  const quantityInput = wrapper.find<HTMLInputElement>(
    'input[id="ingredient_quantity_' + index + '"]'
  )
  const quantityMaxInput = wrapper.find<HTMLInputElement>(
    'input[id="ingredient_quantity_max_' + index + '"]'
  )
  const unitInput = wrapper.find<HTMLInputElement>('input[id="ingredient_unit_' + index + '"]')

  it('renders the recipe ingredients inputs correctly', async () => {
    // Wait for Vue to process updates
    await wrapper.vm.$nextTick()

    // Check if the labels appears
    expect(wrapper.text()).toContain('Інгредієнт:')
    expect(wrapper.text()).toContain('Кількість:')
    expect(wrapper.text()).toContain('Максимальна кількість:')
    expect(wrapper.text()).toContain('Одиниця:')

    // Check if the input fields exist
    expect(nameInput.exists()).toBe(true)
    expect(quantityInput.exists()).toBe(true)
    expect(quantityMaxInput.exists()).toBe(true)
    expect(unitInput.exists()).toBe(true)
  })
})

describe('RecipeFormFields instructions', () => {
  const type = 'instructions'
  const instructions = ['']
  const index = 0

  const wrapper = mount(RecipeFormFields, {
    props: { type, modelValue: instructions[0], index }
  })

  it('renders the recipe instructions inputs rendered correctly', async () => {
    // Wait for Vue to process updates
    await wrapper.vm.$nextTick()

    // Check if the labels appears
    expect(wrapper.text()).toContain('Крок:')

    // Check if the input fields exist
    const textAreaInput = wrapper.find('textarea[id="instruction_' + index + '"]')

    expect(textAreaInput.exists()).toBe(true)
  })
})
