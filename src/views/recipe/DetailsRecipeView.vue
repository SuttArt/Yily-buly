<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes-store.ts'
import { getRecipe } from '@/services/api-Recipe-Service.ts'
import type { Recipe } from '@/types/Recipe.ts'

import RecipeShow from '@/components/RecipeShow.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useRecipesStore()
const recipe = ref<Recipe | undefined>(undefined)

const id = computed(() => props.id)

const find_in_store = () => {
  recipe.value = store.recipes.find((r) => r.id === id.value)
}

const fetch_recipe = async () => {
  try {
    recipe.value = await getRecipe(id.value)
    //TODO: add new recipe to local store
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  // search in Pinia store
  find_in_store()
  // fetch from DB
  if (recipe.value === null || recipe.value === undefined) {
    fetch_recipe()
  }
})
</script>

<template>
  <div v-if="recipe" id="recipe-wrapper">
    <RecipeShow :recipe="recipe" />
  </div>
  <div v-else>Recipe is not found...</div>
</template>

<style scoped>
#recipe-wrapper {
  display: flex;
  flex-direction: column;
  margin: 2vw;
  padding: 1vw;
}
</style>
