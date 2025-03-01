import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRecipes, getUserRecipes } from '@/services/api-Recipe-Service.js'
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

  async function fetchUserRecipes(user: string) {
    try {
      const user_recipes = (await getUserRecipes(user)) as Recipe[]

      // Check if the recipe ID already exists in recipes and dont add it
      user_recipes.forEach((value) => {
        if (!recipes.value.some((recipe) => recipe.id === value.id)) {
          recipes.value.push(value)
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  function getRecipesByOwner(user: string) {
    return recipes.value.filter((recipe) => recipe.owner === user)
  }

  return { recipes, fetchRecipes, fetchUserRecipes, getRecipesByOwner }
})
