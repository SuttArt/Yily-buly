<script setup>
import { onMounted } from 'vue'
import { useRecipesStore } from '@/stores/recipes.js'

const store = useRecipesStore()

onMounted(async () => {
  await store.fetchRecipes()
})

const recipes = store.recipes
</script>

<template>
  <div v-for="item in recipes" :key="item.id" class="recipe-card">
    <span class="recipe-item">{{ item.name }}</span>
    <span class="recipe-item">{{ item.instructions }}</span>
  </div>
</template>

<style scoped>
.recipe-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2vw;
}
</style>
