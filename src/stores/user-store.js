import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRecipesStore = defineStore('user', () => {
  // state
  const user = ref('SuttArt')
  const fetch_error = ref(null)

  // getters

  // actions

  return { user, fetch_error }
})
