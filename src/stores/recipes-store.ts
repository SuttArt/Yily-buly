import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getRecipes } from '@/services/api-Recipe-Service.js'

export const useRecipesStore = defineStore('recipes', () => {
  // state
  const recipes = ref([])
  const fetch_error = ref(null)

  // getters
  const doubleCount = computed(() => 2 * 2)

  // actions
  async function fetchRecipes() {
    try {
      const result = await getRecipes()
      recipes.value = result
    } catch (err) {
      fetch_error.value = err
    }
  }

  return { recipes, fetch_error, doubleCount, fetchRecipes }
})
