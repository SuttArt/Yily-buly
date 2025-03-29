import { ref, computed } from 'vue'
import type { Recipe } from '@/types/Recipe'

export function useFilteredRecipes(source: () => Recipe[] | null) {
  const searchTerm = ref('')

  const filteredRecipes = computed(() => {
    const all = source() ?? []

    // If search is empty, return all
    if (!searchTerm.value.trim()) return all

    return all.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })

  return { searchTerm, filteredRecipes }
}
