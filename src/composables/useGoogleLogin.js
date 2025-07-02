import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

export function useGoogleLogin() {
  const loadingGoogle = ref(false)
  const auth = useAuthStore()
  const router = useRouter()

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

    const popupCheckInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupCheckInterval)
        loadingGoogle.value = false
      }
    }, 500)

    const receiveMessage = async (event) => {
      if (event.origin !== import.meta.env.VITE_API_URL.replace('/api', '')) return

      clearInterval(popupCheckInterval)

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

  return {
    loadingGoogle,
    handleGoogleLogin
  }
}
