<script setup>
import { onMounted, ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes.js'

const store = useRecipesStore()
const recipes = ref()

onMounted(async () => {
  await store.fetchRecipes()
  recipes.value = store.recipes
})
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
  padding: 1vw;
  border-style: dashed;
  border-width: thin;
}

.recipe-card:hover {
  opacity: 0.7;
}

.recipe-card:active {
  /* Scaling button to 0.98 to its original size */
  transform: scale(0.98);
  /* Lowering the shadow */
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
}
</style>
