<template>
  <div>
    <div class="col-span-full flex justify-end mb-2">
      <button @click="clearTrash" class="text-sm text-red-500 hover:underline">
        {{ $t('dashboard.clearTrash') }}
      </button>
    </div>
    <div class="grid grid-cols-4 gap-4 mt-2">
      <TaskNote
        v-for="task in trashTasks"
        :key="task.id"
        :task="task"
        :active-palette-id="activePaletteId"
        @open-palette="openPalette"
        @close-palette="closePalette"
        @delete="deleteTask"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTasksStore } from '@/store/tasks'
import TaskNote from '@/components/TaskNote.vue'

const tasksStore = useTasksStore()
const activePaletteId = ref(null)

const trashTasks = computed(() => tasksStore.tasks.filter((t) => t.status === 2))

const deleteTask = (id) => tasksStore.deleteTask(id)
const clearTrash = () => tasksStore.clearTrash()
const openPalette = (id) => (activePaletteId.value = id)
const closePalette = () => (activePaletteId.value = null)
</script>
