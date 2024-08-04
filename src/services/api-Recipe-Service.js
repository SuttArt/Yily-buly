const API_BASE_URL = 'http://localhost:3000'

export async function getRecipes() {
  const response = await fetch(`${API_BASE_URL}/recipes`)
  if (!response.ok) {
    throw new Error(`Recipes not Found! Response status: ${response.status}`)
  }
  return response.json()
}

export async function getRecipe(id) {
  const response = await fetch(`${API_BASE_URL}/recipes/` + id)
  if (!response.ok) {
    throw new Error(`Recipe not Found! Response status: ${response.status}`)
  }
  return response.json()
}
