<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Login to Tasknest</h2>

      <form @submit.prevent="handleLogin">
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
          class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
          class="mt-4 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          :disabled="auth.loading"
          class="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <span v-if="auth.loading">Logging in...</span>
          <span v-else>Login</span>
        </button>

        <p v-if="auth.error" class="text-sm text-red-500 mt-4 text-center">
          {{ auth.error }}
        </p>

        <p class="text-sm text-center mt-6">
          Don't have an account?
          <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
        </p>
        <button
          @click="handleGoogleLogin"
          class="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Login with Google
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
  await auth.login(form)
  if (auth.token) {
    router.push('/dashboard')
  }
}

const handleGoogleLogin = () => {
  const popup = window.open(
    'http://localhost:8000/api/auth/google/redirect',
    'googleLogin',
    'width=500,height=600'
  )

  const receiveMessage = async (event) => {
    if (event.origin !== 'http://localhost:8000') return

    const { token } = event.data
    if (token) {
      auth.token = token
      localStorage.setItem('token', token)
      await auth.fetchUser()
      router.push('/dashboard')
    }
  }

  window.addEventListener('message', receiveMessage, { once: true })
}
</script>

