<template>
  <div v-if="archivedTasks.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
    <TaskNote
      v-for="task in archivedTasks"
      :key="task.id"
      :task="task"
      :active-palette-id="activePaletteId"
      @open-palette="openPalette"
      @close-palette="closePalette"
      @toggle="toggleTask"
      @trash="trashTask"
      @unarchive="unarchiveTask"
    />
  </div>
  <div v-else class="flex flex-col justify-center items-center gap-4 mt-[20vh]">
    <Archive :size="128" class="text-[#e5e5e5]" />
    <span class="text-stone-600 text-xl">{{ $t('dashboard.archiveEmpty') }}</span>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useTasksStore } from '@/store/tasks'
import TaskNote from '@/components/TaskNote.vue'
import { Archive } from 'lucide-vue-next'

const tasksStore = useTasksStore()
const activePaletteId = ref(null)

const archivedTasks = computed(() => tasksStore.tasks.filter((t) => t.status === 1))

const toggleTask = (task) => tasksStore.toggleTask(task)
const trashTask = (id) => tasksStore.trashTask(id)
const unarchiveTask = (id) => tasksStore.unarchiveTask(id)

const openPalette = (id) => {
  activePaletteId.value = activePaletteId.value === id ? null : id
}
const closePalette = () => (activePaletteId.value = null)

onMounted(() => {
  tasksStore.fetchTasks()
})
</script>
