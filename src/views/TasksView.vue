<template>
  <div>
    <div class="w-full lg:w-1/2 mx-auto mb-8">
      <AddNote />
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
      <TaskNote
        v-for="task in activeTasks"
        :key="task.id"
        :task="task"
        :active-palette-id="activePaletteId"
        :class="{
          'opacity-[0] pointer-events-none': selectedTask && selectedTask.id === task.id
        }"
        @open-palette="openPalette"
        @close-palette="closePalette"
        @toggle="toggleTask"
        @trash="trashTask"
        @archive="archiveTask"
        @open-modal="(task, $event) => openModal(task, $event)"
        ref="taskRefs"
      />
    </div>

    <hr v-if="completedTasks.length" class="hr-with-text col-span-full border-t border-gray-300 my-4" :data-content="$t('dashboard.completed')" />

    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
      <TaskNote
        v-for="task in completedTasks"
        :key="task.id"
        :task="task"
        :active-palette-id="activePaletteId"
        @open-palette="openPalette"
        @close-palette="closePalette"
        @toggle="toggleTask"
        @trash="trashTask"
        @archive="archiveTask"
        @open-modal="openModal"
      />
    </div>

    <TaskModal
      v-if="selectedTask"
      :task="selectedTask"
      :note-rect="noteRect"
      :active-palette-id="activePaletteId"
      @close="closeModal"
      @open-palette="openPalette"
      @close-palette="closePalette"
      @toggle="toggleTask"
      @trash="trashTask"
      @archive="archiveTask"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useTasksStore } from '@/store/tasks'
import TaskNote from '@/components/TaskNote.vue'
import AddNote from '@/components/AddNote.vue'
import TaskModal from '@/components/TaskModal.vue'

const tasksStore = useTasksStore()

const activePaletteId = ref(null)

const tasks = computed(() => tasksStore.tasks)
const activeTasks = computed(() => tasks.value.filter((t) => !t.done && t.status !== 1 && !t.deleted_at))
const completedTasks = computed(() => tasks.value.filter((t) => t.done && t.status !== 1 && !t.deleted_at))

const toggleTask = (task) => tasksStore.toggleTask(task)
const trashTask = (id) => tasksStore.trashTask(id)
const archiveTask = (id) => tasksStore.archiveTask(id)

const openPalette = (id) => {
  activePaletteId.value = activePaletteId.value === id ? null : id
}
const closePalette = () => (activePaletteId.value = null)

const selectedTaskId = ref(null)

const selectedTask = computed(() => tasksStore.tasks.find((t) => t.id === selectedTaskId.value))
const noteRect = ref(null)

const openModal = (task, event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  noteRect.value = rect
  selectedTaskId.value = task.id
}
const closeModal = () => {
  selectedTaskId.value = null
}

onMounted(() => {
  tasksStore.fetchTasks()
})
</script>
