import type { Recipe } from '@/types/Recipe'

const API_BASE_URL = 'http://localhost:3000'

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/recipes`)
  if (!response.ok) {
    throw new Error(`Recipes not Found! Response status: ${response.status}`)
  }

  return await response.json() as Promise<Recipe[]>
}

export async function getRecipe(id: string): Promise<Recipe> {
  const response = await fetch(`${API_BASE_URL}/recipes/` + id)
  if (!response.ok) {
    throw new Error(`Recipe not Found! Response status: ${response.status}`)
  }

  return await response.json() as Promise<Recipe>
}
