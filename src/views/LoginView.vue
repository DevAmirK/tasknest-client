<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">{{ $t('auth.loginTitle') }}</h2>

      <form @submit.prevent="handleLogin">
        <input
          v-model="form.email"
          type="email"
          :placeholder="$t('auth.email')"
          required
          class="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="form.password"
          type="password"
          :placeholder="$t('auth.password')"
          required
          class="mt-4 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          :disabled="auth.loading"
          class="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <span v-if="auth.loading">{{ $t('auth.loggingIn') }}</span>
          <span v-else>{{ $t('auth.login') }}</span>
        </button>

        <p v-if="auth.error" class="text-sm text-red-500 mt-4 text-center">
          {{ auth.error }}
        </p>

        <p class="text-sm text-center mt-6">
          {{ $t('auth.noAccount') }}
          <router-link to="/register" class="text-blue-500 hover:underline">{{ $t('auth.register') }}</router-link>
        </p>
      </form>
      <button
        @click="handleGoogleLogin"
        class="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Login with Google
      </button>
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
  password: ''
})

const handleLogin = async () => {
  await auth.login(form)
  if (auth.token) {
    router.push('/dashboard')
  }
}

const handleGoogleLogin = () => {
  const width = 500
  const height = 600

  const left = window.screenX + (window.outerWidth - width) / 2
  const top = window.screenY + (window.outerHeight - height) / 2

  const popup = window.open(
    `${import.meta.env.VITE_API_URL}/auth/google/redirect`,
    'googleLogin',
    `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars`
  )

  const receiveMessage = async (event) => {
    if (event.origin !== import.meta.env.VITE_API_URL.replace('/api', '')) return

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

import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const changeLocale = () => {
  localStorage.setItem('locale', locale.value)
  // по желанию: window.location.reload() для полной перезагрузки
}
</script>
