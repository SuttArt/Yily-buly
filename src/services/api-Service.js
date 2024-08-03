const API_BASE_URL = 'http://localhost:3000'

export async function getRecipes() {
  const response = await fetch(`${API_BASE_URL}/recipes`)
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  return response.json()
}
