import { type User } from '@/types/User.ts'

const API_BASE_URL = 'http://localhost:3000'

export async function login(id: string, password: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/` + id)

  if (!response.ok) {
    throw new Error(`User not Found! Response status: ${response.status}`)
  }

  const user: User = await response.json() // Await the JSON conversion

  if (user.password !== password) {
    throw new Error(`User not Found! Response status: ${response.status}`)
  }

  return user
}

export function logout(): boolean {
  return true
}
