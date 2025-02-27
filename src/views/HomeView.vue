<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes-store.ts'
import RecipeCard from '@/components/RecipeCard.vue'
import type { Recipe } from '@/types/Recipe.ts'

const store = useRecipesStore()
const recipes = ref<Recipe[] | null>(null)

onMounted(async () => {
  await store.fetchRecipes()
  recipes.value = store.recipes
})
</script>

<template>
  <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
</template>

<style scoped></style>
