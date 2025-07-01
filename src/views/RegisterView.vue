<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Register for Tasknest</h2>

      <form @submit.prevent="handleRegister">
        <input
          v-model="form.name"
          type="text"
          placeholder="Name"
          required
          class="mb-4 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email"
          required
          class="mb-4 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
          class="mb-4 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          :disabled="auth.loading"
          class="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <span v-if="auth.loading">Registering...</span>
          <span v-else>Register</span>
        </button>

        <p v-if="auth.error" class="text-sm text-red-500 mt-4 text-center">
          {{ auth.error }}
        </p>

        <p class="text-sm text-center mt-6">
          Already have an account?
          <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
        </p>
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
  name: '',
  email: '',
  password: '',
})

const handleRegister = async () => {
  await auth.register(form)
  if (auth.token) {
    router.push('/dashboard')
  }
}
</script>
