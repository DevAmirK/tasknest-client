<template>
  <div class="min-h-screen relative flex flex-col">
    <header
      :class="[
        'fixed top-0 left-0 right-0 z-10 h-16 bg-white flex justify-between items-center border-b-2 border-slate-200 px-6 pt-4 pb-4 transition-shadow',
        scrolled ? 'shadow-md/20' : ''
      ]"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">{{ $t('dashboard.title') }}</h1>
        <p v-if="auth.user?.name" class="text-sm text-gray-600">
          {{ $t('dashboard.welcome') }} <b>{{ auth.user.name }}</b>
        </p>
      </div>

      <div class="flex gap-8 items-center">
        <component
          :is="
            {
              idle: CloudCheck,
              loading: LoaderCircle,
              success: CloudCheck,
              error: CloudAlert
            }[fetchStatus]
          "
          class="w-6 h-6"
          :class="{ 'animate-spin': fetchStatus === 'loading' }"
        />
        <Languages class="relative" />
        <button @click="handleLogout" class="flex items-center text-gray-700 hover:text-red-600">
          <LogOut class="w-5 h-5" />
        </button>
      </div>
    </header>

    <div class="h-full flex wrapper flex-1 mb-16 sm:mb-4 mt-20">
      <aside class="w-50 hidden sm:block">
        <nav class="w-50 flex flex-col gap-1 fixed top-20 pr-4">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.name"
            :to="`/dashboard/${tab.name}`"
            class="flex items-center gap-3 text-left py-3 px-3 rounded-lg font-medium transition hover:bg-slate-100"
            active-class="bg-blue-50 text-blue-600"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            {{ $t(`dashboard.tabs.${tab.name}`) }}
          </RouterLink>
        </nav>
      </aside>

      <main class="flex-1">
        <RouterView />
      </main>
    </div>

    <div class="sm:hidden fixed bottom-0 left-0 z-10 w-full h-16 bg-white flex justify-between items-center border-t-1 border-slate-300">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.name"
        :to="`/dashboard/${tab.name}`"
        class="w-1/3 h-full flex flex-col justify-center items-center gap-1"
      >
        <component :is="tab.icon" class="w-5 h-5" />
        <span class="text-sm">{{ $t(`dashboard.tabs.${tab.name}`) }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import Languages from '@/components/Languages.vue'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useTasksStore } from '@/store/tasks'
import { CloudCheck, LoaderCircle, CloudAlert, LayoutList, Archive, Trash2, LogOut } from 'lucide-vue-next'

const tasksStore = useTasksStore()

const fetchStatus = computed(() => tasksStore.fetchStatus)

const auth = useAuthStore()
const router = useRouter()

const tabs = [
  { name: 'tasks', icon: LayoutList },
  { name: 'archive', icon: Archive },
  { name: 'trash', icon: Trash2 }
]

const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}

let timerId = null

async function pollTasks() {
  await tasksStore.fetchTasks()

  const interval = tasksStore.error ? 15000 : 60000

  timerId = setTimeout(pollTasks, interval)
}

const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 0
}

onMounted(() => {
  pollTasks()
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  clearTimeout(timerId)
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.router-link-exact-active {
  background-color: #eff6ff;
  color: #2563eb;
}
</style>
