<template>
  <div class="relative min-h-screen flex flex-col items-center gap-4 justify-center bg-gradient-to-br from-green-400 to-blue-500 px-4">
    <div class="absolute inset-0 bg-black/40 z-0"></div>

    <div class="relative bg-white shadow-lg rounded-xl p-8 w-full max-w-md animate-scale-in">
      <Languages class="absolute top-3 right-3" />

      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        {{ $t('auth.registerTitle') }}
        <router-link to="/" class="text-blue-500">Tasknest</router-link>
      </h2>

      <button
        @click="handleGoogleLogin"
        :disabled="loadingGoogle"
        class="w-full flex gap-4 items-center justify-center border border-slate-400 hover:border-red-500 hover:bg-red-500 hover:text-white text-slate-400 font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
      >
        <template v-if="loadingGoogle">
          <LoaderCircle class="w-5 h-5 animate-spin" />
        </template>
        <template v-else>
          <GoogleIcon class="w-5 h-5 text-inherit" />
          {{ $t('auth.google') }}
        </template>
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
          class="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <LoaderCircle v-if="auth.loading" class="w-5 h-5 animate-spin" />
          <span>
            {{ auth.loading ? $t('auth.registering') : $t('auth.register') }}
          </span>
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
import { ref, reactive } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import { LoaderCircle } from 'lucide-vue-next'
import Languages from '@/components/Languages.vue'

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

const loadingGoogle = ref(false)

const handleGoogleLogin = () => {
  loadingGoogle.value = true

  const width = 500
  const height = 600
  const left = window.screenX + (window.outerWidth - width) / 2
  const top = window.screenY + (window.outerHeight - height) / 2

  const popup = window.open(
    `${import.meta.env.VITE_API_URL}/auth/google/redirect`,
    'googleLogin',
    `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars`
  )

  if (!popup) {
    loadingGoogle.value = false
    return
  }

  const receiveMessage = async (event) => {
    if (event.origin !== import.meta.env.VITE_API_URL.replace('/api', '')) return

    const { token } = event.data
    if (token) {
      auth.token = token
      localStorage.setItem('token', token)
      await auth.fetchUser()
      router.push('/dashboard')
    }

    loadingGoogle.value = false
  }

  window.addEventListener('message', receiveMessage, { once: true })
}
</script>
