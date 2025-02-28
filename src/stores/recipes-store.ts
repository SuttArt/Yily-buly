import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRecipes } from '@/services/api-Recipe-Service.js'
import type { Recipe } from '@/types/Recipe.ts'

export const useRecipesStore = defineStore('recipes', () => {
  // state
  const recipes = ref<Recipe[]>([])

  // getters

  // actions
  async function fetchRecipes() {
    try {
      recipes.value = (await getRecipes()) as Recipe[]
    } catch (err) {
      console.error(err)
    }
  }

  return { recipes, fetchRecipes }
})
