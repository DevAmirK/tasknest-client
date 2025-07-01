<template>
  <div class="relative min-h-screen flex flex-col items-center gap-4 justify-center bg-gradient-to-br from-green-400 to-blue-500 px-4">
    <div class="absolute inset-0 bg-black/40 z-0"></div>

    <div class="relative bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        {{ $t('auth.registerTitle') }}
        <router-link to="/" class="text-blue-500">Tasknest</router-link>
      </h2>

      <button
        @click="handleGoogleLogin"
        class="w-full flex gap-4 items-center border-1 border-slate-400 hover:border-red-500 hover:bg-red-500 hover:text-white text-slate-400 font-semibold px-4 py-2 rounded-lg"
      >
        <GoogleIcon class="w-5 h-5 text-inherit" />
        {{ $t('auth.google') }}
      </button>

      <hr class="hr-with-text" :data-content="$t('auth.or')" />

      <form @submit.prevent="handleRegister">
        <input
          v-model="form.name"
          type="text"
          :placeholder="$t('auth.name')"
          required
          class="mb-4 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="form.email"
          type="email"
          :placeholder="$t('auth.email')"
          required
          class="mb-4 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          v-model="form.password"
          type="password"
          :placeholder="$t('auth.password')"
          required
          class="mb-4 border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          :disabled="auth.loading"
          class="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <span v-if="auth.loading">{{ $t('auth.registering') }}</span>
          <span v-else>{{ $t('auth.register') }}</span>
        </button>

        <p v-if="auth.error" class="text-sm text-red-500 mt-4 text-center">
          {{ auth.error }}
        </p>
      </form>

      <hr class="my-4 border-t-2 border-slate-300" />

      <p class="text-sm text-center mt-6">
        {{ $t('auth.haveAccount') }}
        <router-link to="/login" class="text-blue-500 hover:underline">
          {{ $t('auth.loginNow') }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import { reactive } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: ''
})

const handleRegister = async () => {
  await auth.register(form)
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
</script>
