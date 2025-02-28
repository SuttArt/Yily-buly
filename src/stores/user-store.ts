import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type User, Role } from '@/types/User.ts'
import { login as apiLogin, logout as apiLogout } from '@/services/api-Auth-Service.ts'

export const useUserStore = defineStore('user', () => {
  // state
  const user = ref<User | null>(null)

  // actions
  const login = async (id: string, password: string) => {
    try {
      const userData = await apiLogin(id, password)
      user.value = userData as User
    } catch (err) {
      console.error(err)
    }
  }

  const logout = async () => {
    try {
      apiLogout()
      user.value = null
    } catch (err) {
      console.error(err)
    }
  }

  // getters
  const isAuthenticated = () => !!user.value
  const isAdmin = () => user.value?.role === Role.Admin
  const isUser = () => user.value?.role === Role.User
  const isGuest = () => !user.value

  return { user, login, logout, isAuthenticated, isAdmin, isUser, isGuest }
})
