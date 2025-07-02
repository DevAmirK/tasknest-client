<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
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
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTasksStore } from '@/store/tasks'
import TaskNote from '@/components/TaskNote.vue'

const tasksStore = useTasksStore()
const activePaletteId = ref(null)

const archivedTasks = computed(() => tasksStore.tasks.filter((t) => t.status === 1))

const toggleTask = (task) => tasksStore.toggleTask(task)
const deleteTask = (id) => tasksStore.deleteTask(id)
const openPalette = (id) => (activePaletteId.value = id)
const closePalette = () => (activePaletteId.value = null)
</script>
