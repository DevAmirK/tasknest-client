<template>
  <div class="min-h-screen">
    <header class="flex justify-between items-center mb-6 border-b-2 border-slate-200">
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
    <div class="wrapper mx-auto">
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <TaskNote v-for="task in tasks" :key="task.id" :task="task" @toggle="toggleTask" @delete="deleteTask" />

        <div
          @click="creating = true"
          v-if="!creating"
          class="cursor-pointer border-2 border-dashed border-blue-400 rounded-xl p-4 flex flex-col items-center justify-center text-blue-500 hover:bg-blue-50 transition"
        >
          <Plus class="w-8 h-8" />
          <span class="mt-2 text-sm">{{ $t('dashboard.add') }}</span>
        </div>

        <div v-if="creating" class="bg-white rounded-xl p-4 shadow">
          <form @submit.prevent="addTask">
            <textarea
              v-model="newTask"
              rows="3"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              :placeholder="$t('dashboard.addPlaceholder')"
              required
            ></textarea>
            <div class="mt-2 flex justify-end gap-2">
              <button type="button" @click="cancelNewTask" class="text-sm text-gray-500 hover:underline">
                {{ $t('dashboard.cancel') }}
              </button>
              <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm font-semibold">
                {{ $t('dashboard.add') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <p v-if="tasksStore.error" class="text-center text-red-500 mt-4">
        {{ tasksStore.error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useTasksStore } from '@/store/tasks'
import { useRouter } from 'vue-router'
import Languages from '@/components/Languages.vue'
import TaskNote from '@/components/TaskNote.vue'
import { Plus } from 'lucide-vue-next'

const auth = useAuthStore()
const tasksStore = useTasksStore()
const router = useRouter()

const newTask = ref('')
const creating = ref(false)

onMounted(async () => {
  if (!auth.user) await auth.fetchUser()
  if (!auth.token || !auth.user) router.push('/login')
  await tasksStore.fetchTasks()
})

const tasks = computed(() => tasksStore.tasks)

const addTask = () => {
  if (!newTask.value.trim()) return
  tasksStore.addTask(newTask.value.trim())
  newTask.value = ''
  creating.value = false
}

const cancelNewTask = () => {
  creating.value = false
  newTask.value = ''
}

const toggleTask = (task) => tasksStore.toggleTask(task)
const deleteTask = (id) => tasksStore.deleteTask(id)
const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>
