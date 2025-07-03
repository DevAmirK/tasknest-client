<template>
  <div>
    <div
      @click="creating = true"
      v-if="!creating"
      class="cursor-pointer border-2 border-dashed border-blue-400 rounded-xl p-4 flex flex-col items-center justify-center text-blue-500 hover:bg-blue-50 transition"
    >
      <Plus class="w-8 h-8" />
      <span class="mt-2 text-sm">{{ $t('dashboard.add') }}</span>
    </div>

    <div v-if="creating" class="bg-white rounded-xl p-4 shadow mb-4">
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

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
      <TaskNote
        v-for="task in activeTasks"
        :key="task.id"
        :task="task"
        :active-palette-id="activePaletteId"
        @open-palette="openPalette"
        @close-palette="closePalette"
        @toggle="toggleTask"
        @delete="deleteTask"
        @trash="trashTask"
        @restore="restoreTask"
      />
    </div>

    <hr v-if="completedTasks.length" class="hr-with-text col-span-full border-t border-gray-300 my-4" :data-content="$t('dashboard.completed')" />

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
      <TaskNote
        v-for="task in completedTasks"
        :key="task.id"
        :task="task"
        :active-palette-id="activePaletteId"
        @open-palette="openPalette"
        @close-palette="closePalette"
        @toggle="toggleTask"
        @delete="deleteTask"
        @trash="trashTask"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useTasksStore } from '@/store/tasks'
import TaskNote from '@/components/TaskNote.vue'
import { Plus } from 'lucide-vue-next'

const tasksStore = useTasksStore()

const newTask = ref('')
const creating = ref(false)
const activePaletteId = ref(null)

const tasks = computed(() => tasksStore.tasks)
const activeTasks = computed(() => tasks.value.filter((t) => !t.done && t.status !== 1 && !t.deleted_at))
const completedTasks = computed(() => tasks.value.filter((t) => t.done && t.status !== 1 && !t.deleted_at))

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
const trashTask = (id) => tasksStore.trashTask(id)
const restoreTask = (task) => tasksStore.restoreTask(task)

const openPalette = (id) => (activePaletteId.value = id)
const closePalette = () => (activePaletteId.value = null)

onMounted(() => {
  tasksStore.fetchTasks()
})
</script>
