<template>
  <div>
    <div class="col-span-full flex justify-center items-center gap-4 mb-2">
      <span class="italic text-lg">{{ $t('dashboard.trashTitle') }}</span>
      <button v-if="trashTasks.length > 0" @click="clearTrash" class="text-sm text-red-500 font-semibold px-4 py-2 hover:bg-blue-50">
        {{ $t('dashboard.clearTrash') }}
      </button>
    </div>
    <div v-if="trashTasks.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <TaskNote v-for="task in trashTasks" :key="task.id" :task="task" @delete="deleteTask" @restore="restoreTask" />
    </div>
    <div v-else class="flex flex-col justify-center items-center gap-4 mt-[20vh]">
      <Trash2 :size="128" class="text-[#e5e5e5]" />
      <span class="text-stone-600 text-xl">{{ $t('dashboard.trashEmpty') }}</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useTasksStore } from '@/store/tasks'
import TaskNote from '@/components/TaskNote.vue'
import { Trash2 } from 'lucide-vue-next'

const tasksStore = useTasksStore()

const trashTasks = computed(() => tasksStore.tasks.filter((t) => t.status === 2))

const deleteTask = (id) => tasksStore.deleteTask(id)
const clearTrash = () => tasksStore.clearTrash()
const restoreTask = (task) => tasksStore.restoreTask(task)

onMounted(() => {
  tasksStore.fetchTasks()
})
</script>
