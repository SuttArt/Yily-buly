<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes-store.ts'
import { useUserStore } from '@/stores/user-store.ts'
import RecipeCard from '@/components/RecipeCard.vue'
import type { Recipe } from '@/types/Recipe.ts'

const store = useRecipesStore()
const recipes = ref<Recipe[] | null>(null)

onMounted(async () => {
  const user_store = useUserStore()
  if (user_store.user) {
    // Type check to ensure user is not null
    await store.fetchUserRecipes(user_store.user.id)
    recipes.value = store.getRecipesByOwner(user_store.user.id)
  } else {
    console.warn('User is not logged in, but this page was accessed.')
  }
})
</script>

<template>
  <div id="control-elements">
    <label for="search">Пошук:</label>
    <input id="search" />

    <RouterLink :to="{ name: 'recipeCreate' }">
      <button class="control-button">Додати рецепт</button>
    </RouterLink>
  </div>
  <hr />
  <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
</template>

<style scoped></style>
