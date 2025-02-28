<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user-store'
import { useRoute, useRouter } from 'vue-router'

const id = ref('')
const password = ref('')
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const handleLogin = async () => {
  try {
    await userStore.login(id.value, password.value)
    // Get the stored redirect URL or default to home `/`
    const redirectPath = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.push(redirectPath)
  } catch (error) {
    console.error('Login failed', error)
  }
}
</script>

<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <!--      <input v-model="id" type="id" placeholder="Email" required />-->
      <input v-model="id" type="text" placeholder="Enter your ID" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped></style>
