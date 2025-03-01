<script setup lang="ts">
import type { Recipe } from '@/types/Recipe.ts'
import type { PropType } from 'vue'

defineProps({
  recipe: {
    type: Object as PropType<Recipe>,
    required: true
  }
})
</script>

<template>
  <span id="recipe-title">{{ recipe.name }}</span>
  <ul>
    <li class="recipe-ingredients" v-for="ingredient in recipe.ingredients" :key="ingredient.name">
      {{ ingredient.name }}: {{ ingredient.quantity }} {{ ingredient.unit }}
    </li>
  </ul>

  <br />
  <span
    class="recipe-instructions"
    v-for="(instruction, index) in recipe.instructions"
    :key="index"
  >
    Крок {{ index + 1 }} <br />
    {{ instruction }}<br /><br
  /></span>
  <span id="recipe-owner"> Від користувача: {{ recipe.owner }}</span>
</template>

<style scoped>
#recipe-title {
  align-self: center;
}

#recipe-owner {
  align-self: end;
}
</style>
