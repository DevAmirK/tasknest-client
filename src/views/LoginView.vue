<template>
  <div class="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-500 to-purple-600">
    <div class="absolute inset-0 bg-black/40 z-0"></div>

    <div class="relative z-10 bg-white shadow-lg rounded-xl p-8 w-full max-w-md animate-scale-in">
      <Languages class="absolute top-3 right-3" />

      <h2 class="text-2xl font-bold mb-6 text-center">
        {{ $t('auth.loginTitle') }}
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
          class="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex justify-center items-center gap-2"
        >
          <LoaderCircle v-if="auth.loading" class="animate-spin w-5 h-5" />
          <span>
            {{ auth.loading ? $t('auth.loggingIn') : $t('auth.login') }}
          </span>
        </button>

        <p v-if="auth.error" class="text-sm text-red-500 mt-4 text-center">
          {{ auth.error }}
        </p>
      </form>

      <hr class="my-4 border-t-2 border-slate-300" />

      <p class="text-sm text-center">
        {{ $t('auth.noAccount') }}
        <router-link to="/register" class="text-blue-500 hover:underline">{{ $t('auth.registerNow') }}</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import { reactive } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import { LoaderCircle } from 'lucide-vue-next'
import Languages from '@/components/Languages.vue'
import { useGoogleLogin } from '@/composables/useGoogleLogin'

const { handleGoogleLogin, loadingGoogle } = useGoogleLogin()

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
</script>
