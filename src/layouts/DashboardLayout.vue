<template>
  <div class="min-h-screen relative">
    <header class="flex justify-between items-center mb-6 border-b-2 border-slate-200 px-6 pt-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">{{ $t('dashboard.title') }}</h1>
        <p v-if="auth.user?.name" class="text-sm text-gray-600">
          {{ $t('dashboard.welcome') }} <b>{{ auth.user.name }}</b>
        </p>
      </div>

      <div class="flex gap-6 items-center">
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
        <button @click="handleLogout" class="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl">
          {{ $t('auth.logout') }}
        </button>
      </div>
    </header>

    <div class="flex wrapper">
      <!-- Sidebar -->
      <aside class="w-48 hidden md:block pr-2">
        <nav class="flex flex-col gap-2">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.name"
            :to="`/dashboard/${tab.name}`"
            class="text-left py-2 px-3 rounded-lg font-medium transition hover:bg-slate-100"
            active-class="bg-blue-50 text-blue-600"
          >
            {{ $t(`dashboard.tabs.${tab.name}`) }}
          </RouterLink>
        </nav>
      </aside>

      <main class="flex-1">
        <RouterView />
      </main>
    </div>

    <div class="sm:hidden fixed bottom-0 left-0 w-full h-[9vh] bg-white flex justify-between items-center border-t-1 border-slate-300">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.name"
        :to="`/dashboard/${tab.name}`"
        class="w-1/3 h-full flex flex-col justify-center items-center gap-1"
      >
        <component :is="tab.icon" class="w-6 h-6" />
        <span>{{ $t(`dashboard.tabs.${tab.name}`) }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import Languages from '@/components/Languages.vue'
import { onMounted, onUnmounted, computed } from 'vue'
import { useTasksStore } from '@/store/tasks'
import { CloudCheck, LoaderCircle, CloudAlert, LayoutList, Archive, Trash2 } from 'lucide-vue-next'

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

onMounted(() => {
  console.log('onMounted Dashboard')

  pollTasks()
})

onUnmounted(() => {
  clearTimeout(timerId)
})
</script>

<style scoped>
.router-link-exact-active {
  background-color: #eff6ff;
  color: #2563eb;
}
</style>
