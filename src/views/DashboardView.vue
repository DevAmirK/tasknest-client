<template>
  <div class="min-h-screen bg-gray-100 px-4 py-6">
    <header class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">{{ $t('dashboard.title') }}</h1>
        <p v-if="auth.user" class="text-sm text-gray-600">
          {{ $t('dashboard.welcome', { name: auth.user.name }) }}
        </p>
      </div>

      <div class="flex gap-4 items-center">
        <Languages />
        <button @click="handleLogout" class="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl">
          {{ $t('auth.logout') }}
        </button>
      </div>
    </header>

    <form @submit.prevent="addTask" class="mb-4 flex gap-2">
      <input
        v-model="newTask"
        type="text"
        :placeholder="$t('dashboard.addPlaceholder')"
        class="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
        {{ $t('dashboard.add') }}
      </button>
    </form>

    <div v-if="tasks.length > 0" class="bg-white shadow rounded-lg divide-y divide-gray-200">
      <div v-for="task in tasks" :key="task.id" class="flex justify-between items-center px-4 py-3">
        <div class="flex items-center gap-2">
          <input type="checkbox" :checked="task.done" @change="toggleTask(task)" class="w-5 h-5 text-blue-500 rounded focus:ring-0" />
          <span
            :class="{
              'line-through text-gray-400': task.done,
              'text-gray-800': !task.done
            }"
            class="text-sm"
          >
            {{ task.text }}
          </span>
        </div>
        <button @click="deleteTask(task.id)" class="text-sm text-red-500 hover:underline">
          {{ $t('dashboard.delete') }}
        </button>
      </div>
    </div>

    <p v-else class="text-center text-gray-500 mt-8">{{ $t('dashboard.noTasks') }}</p>

    <p v-if="tasksStore.error" class="text-center text-red-500 mt-4">
      {{ tasksStore.error }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useTasksStore } from '@/store/tasks'
import { useRouter } from 'vue-router'
import Languages from '@/components/Languages.vue'

const auth = useAuthStore()
const tasksStore = useTasksStore()
const router = useRouter()

const newTask = ref('')

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchUser()
  }

  if (!auth.token || !auth.user) {
    router.push('/login')
  }

  await tasksStore.fetchTasks()
})

const tasks = computed(() => tasksStore.tasks)

const addTask = () => {
  if (!newTask.value.trim()) return
  tasksStore.addTask(newTask.value.trim())
  newTask.value = ''
}

const toggleTask = (task) => {
  tasksStore.toggleTask(task)
}

const deleteTask = (id) => {
  tasksStore.deleteTask(id)
}

const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>
