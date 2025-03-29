<script setup lang="ts">
import { onMounted } from 'vue'
import { useRecipesStore } from '@/stores/recipes-store.ts'
import RecipeCard from '@/components/RecipeCard.vue'
import SearchField from '@/components/SearchField.vue'
import { useFilteredRecipes } from '@/composables/useFilteredRecipes'

const store = useRecipesStore()

onMounted(async () => {
  await store.fetchRecipes()
})

// Filtered list based on search input
const { searchTerm, filteredRecipes } = useFilteredRecipes(() => store.recipes)
</script>

<template>
  <div id="control-elements">
    <SearchField v-model="searchTerm" />
  </div>
  <hr />
  <RecipeCard v-for="recipe in filteredRecipes" :key="recipe.id" :recipe="recipe" />
</template>

<style scoped></style>
