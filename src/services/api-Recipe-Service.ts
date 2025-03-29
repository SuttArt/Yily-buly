import type { Recipe } from '@/types/Recipe'

const API_BASE_URL = 'http://localhost:3000'

/**
 * Fetches all recipes from the API.
 *
 * @returns {Promise<Recipe[]>} A promise that resolves to an array of Recipe objects.
 * @throws {Error} If the response is not OK.
 */
export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/recipes`)
  if (!response.ok) {
    throw new Error(`Recipes not Found! Response status: ${response.status}`)
  }

  return (await response.json()) as Promise<Recipe[]>
}

/**
 * Fetches all recipes belonging to a specific user.
 *
 * @param {string} user - The username or user ID to filter recipes by.
 * @returns {Promise<Recipe[]>} A promise that resolves to an array of Recipe objects.
 * @throws {Error} If the response is not OK.
 */
export async function getUserRecipes(user: string): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/recipes?owner=${user}`)
  if (!response.ok) {
    throw new Error(`Recipes not Found! Response status: ${response.status}`)
  }

  return (await response.json()) as Promise<Recipe[]>
}

/**
 * Fetches a single recipe by its ID.
 *
 * @param {string} id - The ID of the recipe to fetch.
 * @returns {Promise<Recipe>} A promise that resolves to a Recipe object.
 * @throws {Error} If the response is not OK.
 */
export async function getRecipe(id: string): Promise<Recipe> {
  const response = await fetch(`${API_BASE_URL}/recipes/` + id)
  if (!response.ok) {
    throw new Error(`Recipe not Found! Response status: ${response.status}`)
  }

  return (await response.json()) as Promise<Recipe>
}

/**
 * Retrieves the ID of the last (most recent) recipe.
 *
 * @returns {Promise<number|null>} A promise that resolves to the highest recipe ID or null if no recipes exist.
 * @throws {Error} If the response is not OK.
 */
export async function getLastRecipeId(): Promise<number | null> {
  const response = await fetch(`${API_BASE_URL}/recipes?_sort=-id&_limit=1`)

  if (!response.ok) {
    throw new Error(`Failed to fetch last recipe ID! Response status: ${response.status}`)
  }

  const recipes = await response.json()

  return recipes.length > 0 ? recipes[0].id : null
}

/**
 * Posts a new recipe to the API.
 *
 * @param {Recipe} recipe - The recipe object to create.
 * @returns {Promise<Recipe>} A promise that resolves to the created Recipe object.
 * @throws {Error} If the response is not OK.
 */
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

/**
 * Updates an existing recipe via PUT.
 *
 * @param {Recipe} recipe - The recipe object to update (must include an `id` field).
 * @returns {Promise<Recipe>} A promise that resolves to the updated Recipe object.
 * @throws {Error} If the response is not OK.
 */
export async function putRecipe(recipe: Recipe): Promise<Recipe> {
  const response = await fetch(`${API_BASE_URL}/recipes/` + recipe.id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  })
  if (!response.ok) {
    throw new Error(`Failed to put recipe! Response status: ${response.status}`)
  }

  return (await response.json()) as Promise<Recipe>
}

/**
 * Deletes a recipe by its ID.
 *
 * @param {string} id - The ID of the recipe to delete.
 * @returns {Promise<number>} A promise that resolves to the HTTP status code of the delete response.
 * @throws {Error} If the response is not OK.
 */
export async function deleteRecipe(id: string): Promise<number> {
  const response = await fetch(`${API_BASE_URL}/recipes/` + id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    throw new Error(`Failed to delete recipe! Response status: ${response.status}`)
  }

  return response.status
}
