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
      <!-- Боковое меню -->
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
      <!-- Контент -->
      <div class="flex-1 mx-auto px-4">
        <TransitionGroup tag="div" name="list" class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <!-- Вкладка ЗАДАЧИ -->
          <template v-if="activeTab === 'tasks'">
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

            <TaskNote
              v-for="task in activeTasks"
              :key="task.id"
              :task="task"
              :active-palette-id="activePaletteId"
              @open-palette="openPalette"
              @close-palette="closePalette"
              @toggle="toggleTask"
              @delete="deleteTask"
            />

            <hr
              v-if="completedTasks.length"
              class="hr-with-text col-span-full border-t border-gray-300 my-2"
              :data-content="$t('dashboard.completed')"
            />

            <TaskNote
              v-for="task in completedTasks"
              :key="task.id"
              :task="task"
              :active-palette-id="activePaletteId"
              @open-palette="openPalette"
              @close-palette="closePalette"
              @toggle="toggleTask"
              @delete="deleteTask"
            />
          </template>

          <!-- Вкладка АРХИВ -->
          <template v-else-if="activeTab === 'archive'">
            <TaskNote
              v-for="task in archivedTasks"
              :key="task.id"
              :task="task"
              :active-palette-id="activePaletteId"
              @open-palette="openPalette"
              @close-palette="closePalette"
              @toggle="toggleTask"
              @delete="deleteTask"
            />
          </template>

          <!-- Вкладка КОРЗИНА -->
          <template v-else-if="activeTab === 'trash'">
            <div class="col-span-full flex justify-end mb-2">
              <button @click="clearTrash" class="text-sm text-red-500 hover:underline">
                {{ $t('dashboard.clearTrash') }}
              </button>
            </div>
            <TaskNote
              v-for="task in trashTasks"
              :key="task.id"
              :task="task"
              :active-palette-id="activePaletteId"
              @open-palette="openPalette"
              @close-palette="closePalette"
              @delete="deleteTask"
            />
          </template>
        </TransitionGroup>

        <p v-if="tasksStore.error" class="text-center text-red-500 mt-4">
          {{ tasksStore.error }}
        </p>
      </div>
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

const tasks = computed(() => tasksStore.tasks)
const activeTasks = computed(() => tasks.value.filter((t) => !t.done && t.status !== 1 && !t.deleted_at))
const completedTasks = computed(() => tasks.value.filter((t) => t.done && t.status !== 1 && !t.deleted_at))
const archivedTasks = computed(() => tasks.value.filter((t) => t.status === 1))
const trashTasks = computed(() => tasks.value.filter((t) => t.status === 2))

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
const clearTrash = () => tasksStore.clearTrash()
const handleLogout = async () => {
  await auth.logout()
  router.push('/login')
}

const openPalette = (id) => {
  activePaletteId.value = id
}

const closePalette = () => {
  activePaletteId.value = null
}
</script>

<style scoped>
.list-move {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
</style>
