<script setup lang="ts">
import type { PropType } from 'vue'
import type { Ingredient } from '@/types/Recipe.ts'

enum template_type {
  ingredients = 'ingredients',
  instructions = 'instructions'
}

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  modelValue: {
    type: [Object, String] as PropType<Ingredient | string>, // Supports both Ingredient (Object) and Instructions (String)
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

// Function to update a specific field in Ingredient object
const updateIngredient = (
  field: 'name' | 'quantity' | 'quantity_max' | 'unit',
  value: string | number
) => {
  if (typeof props.modelValue === 'object') {
    const updatedIngredient = { ...props.modelValue, [field]: value }
    emit('update:modelValue', updatedIngredient)
  }
}

// Function to update instructions (which are plain strings)
const updateInstruction = (event: Event) => {
  const newValue = (event.target as HTMLTextAreaElement).value.trim()
  emit('update:modelValue', newValue)
}
</script>

<template>
  <template v-if="props.type === template_type.ingredients && typeof props.modelValue === 'object'">
    <span class="recipe-label-span">Інгредієнт:</span>
    <input
      class="recipe-ingredients"
      :value="props.modelValue.name"
      type="text"
      @input="updateIngredient('name', ($event.target as HTMLInputElement).value.trim())"
      @keydown.enter.prevent
    />
    <br />
    <span class="recipe-label-span">Кількість:</span>
    <input
      class="recipe-quantity"
      :value="props.modelValue.quantity"
      type="number"
      min="0"
      @input="updateIngredient('quantity', parseFloat(($event.target as HTMLInputElement).value))"
      @keydown.enter.prevent
    />
    <br />
    <span class="recipe-label-span">Максимальна кількість:</span>
    <input
      class="recipe-quantity-max"
      :value="props.modelValue.quantity_max || ''"
      type="number"
      min="0"
      @input="
        updateIngredient('quantity_max', parseFloat(($event.target as HTMLInputElement).value))
      "
      @keydown.enter.prevent
    />
    <br />
    <span class="recipe-label-span">Одиниця:</span>
    <input
      class="recipe-unit"
      :value="props.modelValue.unit"
      type="text"
      @input="updateIngredient('unit', ($event.target as HTMLInputElement).value.trim())"
      @keydown.enter.prevent
    />
  </template>

  <template
    v-if="props.type === template_type.instructions && typeof props.modelValue === 'string'"
  >
    <span class="recipe-label-span">Крок:</span>
    <textarea
      class="recipe-instructions"
      :value="props.modelValue"
      @input="updateInstruction"
      type="text"
      rows="5"
      cols="30"
    />
  </template>
</template>

<style scoped>
.recipe-label-span {
  display: flex;
  align-items: center; /* Aligns items vertically */
}
.recipe-instructions {
  resize: none;
  width: 100%; /* Ensures it takes the available space */
}
</style>
