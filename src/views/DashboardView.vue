<template>
  <div class="min-h-screen">
    <header class="flex justify-between items-center mb-6 border-b-2 border-slate-200 px-6 pt-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">{{ $t('dashboard.title') }}</h1>
        <p v-if="auth.user?.name" class="text-sm text-gray-600">
          {{ $t('dashboard.welcome') }} <b>{{ auth.user.name }}</b>
        </p>
      </div>

      <div class="flex gap-4 items-center">
        <Languages class="relative" />
        <button @click="handleLogout" class="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl">
          {{ $t('auth.logout') }}
        </button>
      </div>
    </header>

    <div class="flex wrapper">
      <aside class="w-48">
        <nav class="flex flex-col gap-2">
          <button
            v-for="tabOption in tabs"
            :key="tabOption"
            @click="activeTab = tabOption"
            class="text-left py-2 px-3 rounded-lg font-medium transition hover:bg-slate-100"
            :class="{ 'bg-blue-50 text-blue-600': activeTab === tabOption }"
          >
            {{ $t(`dashboard.tabs.${tabOption}`) }}
          </button>
        </nav>
      </aside>

      <div class="flex-1 px-4">
        <TasksView
          v-if="activeTab === 'tasks'"
          :active-palette-id="activePaletteId"
          :open-palette="openPalette"
          :close-palette="closePalette"
          :toggle-task="toggleTask"
          :delete-task="deleteTask"
        />
        <ArchiveView
          v-else-if="activeTab === 'archive'"
          :active-palette-id="activePaletteId"
          :open-palette="openPalette"
          :close-palette="closePalette"
          :toggle-task="toggleTask"
          :delete-task="deleteTask"
        />
        <TrashView
          v-else-if="activeTab === 'trash'"
          :active-palette-id="activePaletteId"
          :open-palette="openPalette"
          :close-palette="closePalette"
          :delete-task="deleteTask"
        />

        <p v-if="tasksStore.error" class="text-center text-red-500 mt-4">
          {{ tasksStore.error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useTasksStore } from '@/store/tasks'
import { useRouter } from 'vue-router'
import Languages from '@/components/Languages.vue'
import TasksView from '@/views/TasksView.vue'
import ArchiveView from '@/views/ArchiveView.vue'
import TrashView from '@/views/TrashView.vue'

const auth = useAuthStore()
const tasksStore = useTasksStore()
const router = useRouter()

const activePaletteId = ref(null)
const activeTab = ref('tasks')
const tabs = ['tasks', 'archive', 'trash']

onMounted(async () => {
  if (!auth.user) await auth.fetchUser()
  if (!auth.token || !auth.user) router.push('/login')
  await tasksStore.fetchTasks()

  setInterval(() => {
    tasksStore.fetchTasks()
  }, 1000)
})

const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}

const openPalette = (id) => (activePaletteId.value = id)
const closePalette = () => (activePaletteId.value = null)
const toggleTask = (task) => tasksStore.toggleTask(task)
const deleteTask = (id) => tasksStore.deleteTask(id)
</script>
