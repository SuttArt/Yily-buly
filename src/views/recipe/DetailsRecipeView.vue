<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRecipesStore } from '@/stores/recipes-store.ts'
import { useUserStore } from '@/stores/user-store.ts'
import { getRecipe } from '@/services/api-Recipe-Service.ts'
import { useRouter } from 'vue-router'
import type { Recipe } from '@/types/Recipe.ts'

import RecipeShow from '@/components/RecipeShow.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const store = useRecipesStore()
const userStore = useUserStore()
const recipe = ref<Recipe | undefined>(undefined)

const id = computed(() => props.id)
const isOwner = computed(() => {
  if (!userStore.user || !recipe.value) return false
  return userStore.user.id === recipe.value.owner
})

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

const removeRecipe = async (id: string) => {
  const removeStatus = await store.removeRecipe(id)

  if (removeStatus === 200) {
    router.back()
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
  <div id="control-elements">
    <RouterLink v-show="isOwner" :to="{ name: 'recipeEdit', params: { id } }">
      <button class="control-button">Редагувати рецепт</button>
    </RouterLink>
    <button v-show="isOwner" class="control-button" @click="removeRecipe(id)">
      Видалити рецепт
    </button>
  </div>

  <hr />

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
