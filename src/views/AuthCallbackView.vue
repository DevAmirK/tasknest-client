<script setup>
import { useAuthStore } from '@/store/auth'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

onMounted(async () => {
  const token = route.query.token
  if (token) {
    auth.token = token
    localStorage.setItem('token', token)
    await auth.fetchUser()
    router.push('/dashboard')
  } else {
    router.push('/login')
  }
})
</script>

<template>
  <div class="text-center mt-10 text-gray-600">Logging in via Google...</div>
</template>
