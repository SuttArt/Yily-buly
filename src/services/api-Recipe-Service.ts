import type { Recipe } from '@/types/Recipe'

const API_BASE_URL = 'http://localhost:3000'

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/recipes`)
  if (!response.ok) {
    throw new Error(`Recipes not Found! Response status: ${response.status}`)
  }

  return (await response.json()) as Promise<Recipe[]>
}

export async function getUserRecipes(user: string): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/recipes?owner=${user}`)
  if (!response.ok) {
    throw new Error(`Recipes not Found! Response status: ${response.status}`)
  }

  return (await response.json()) as Promise<Recipe[]>
}

export async function getRecipe(id: string): Promise<Recipe> {
  const response = await fetch(`${API_BASE_URL}/recipes/` + id)
  if (!response.ok) {
    throw new Error(`Recipe not Found! Response status: ${response.status}`)
  }

  return (await response.json()) as Promise<Recipe>
}

export async function getLastRecipeId(): Promise<number | null> {
  const response = await fetch(`${API_BASE_URL}/recipes?_sort=-id&_limit=1`)

  if (!response.ok) {
    throw new Error(`Failed to fetch last recipe ID! Response status: ${response.status}`)
  }

  const recipes = await response.json()

  return recipes.length > 0 ? recipes[0].id : null
}

export async function postRecipe(recipe: Recipe): Promise<Recipe> {
  const response = await fetch(`${API_BASE_URL}/recipes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  })
  if (!response.ok) {
    throw new Error(`Failed to post recipe! Response status: ${response.status}`)
  }

  return (await response.json()) as Promise<Recipe>
}

export async function putRecipe(recipe: Recipe): Promise<Recipe> {
  const response = await fetch(`${API_BASE_URL}/recipes/` + recipe.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  })
  if (!response.ok) {
    throw new Error(`Failed to post recipe! Response status: ${response.status}`)
  }

  return (await response.json()) as Promise<Recipe>
}
