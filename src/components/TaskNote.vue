<template>
  <div
    class="relative shadow-md rounded-xl flex flex-col justify-between transition-all duration-300"
    :style="{
      backgroundColor: task.color || '#ffffff',
      opacity: task.done ? 0.9 : 1,
      filter: task.done ? 'grayscale(0.05) contrast(0.85)' : 'none'
    }"
  >
    <div
      v-if="!editing"
      class="flex-1 text-sm whitespace-pre-wrap break-words cursor-pointer p-4"
      @click="startEditing"
      :class="{ 'line-through': task.done }"
    >
      {{ task.text }}
    </div>
    <textarea
      v-else
      v-model="editedText"
      class="w-full text-sm border rounded p-2 mb-2"
      @keydown.enter.prevent="saveText"
      @blur="cancelEdit"
    ></textarea>

    <div class="mt-8 flex justify-between items-center px-4 py-2">
      <label v-if="route.name !== 'trash'" class="flex items-center gap-2 cursor-pointer select-none" @click="$emit('toggle', task)">
        <Transition name="fade-scale" mode="out-in">
          <SquareCheck v-if="task.done" key="checked" class="w-5 h-5" />
          <Square v-else key="unchecked" class="w-5 h-5" />
        </Transition>
      </label>

      <div class="relative" v-if="route.name !== 'trash'">
        <button @click.stop="emit('open-palette', task.id)">
          <Palette />
        </button>
        <div
          v-if="showPalette"
          ref="paletteRef"
          class="absolute left-0 mt-2 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.2)] p-2 flex gap-1 z-50"
        >
          <button
            v-for="color in colors"
            :key="color"
            :style="{ backgroundColor: color }"
            class="w-7 h-7 rounded-full border border-slate-300"
            @click="updateColor(color)"
          ></button>
        </div>
      </div>

      <div class="flex gap-2">
        <button v-if="route.name !== 'trash'"><Archive /></button>

        <template v-else>
          <button @click="$emit('restore', task)">
            <Undo2 />
          </button>
        </template>

        <button v-if="route.name !== 'trash'" @click="$emit('trash', task.id)">
          <Trash2 />
        </button>

        <template v-else>
          <button @click="$emit('delete', task.id)">
            <SquareX />
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Archive, Palette, Square, SquareCheck, SquareX, Trash2, Undo2 } from 'lucide-vue-next'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useTasksStore } from '@/store/tasks'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
  task: Object,
  activePaletteId: Number
})
const emit = defineEmits(['toggle', 'delete', 'trash', 'restore', 'open-palette', 'close-palette'])

const paletteRef = ref(null)
const editing = ref(false)
const editedText = ref(props.task.text)

const tasksStore = useTasksStore()

const showPalette = computed(() => props.activePaletteId === props.task.id)

const colors = ['#ffffff', '#faafa8', '#f39f76', '#fff8b8', '#e2f6d3', '#b4ddd3', '#d4e4ed', '#aeccdc', '#d3bfdb', '#f6e2dd', '#e9e3d4']

const updateColor = async (color) => {
  emit('close-palette')
  await tasksStore.updateTask(props.task.id, { color })
}

const startEditing = () => {
  editing.value = true
  editedText.value = props.task.text
}

const saveText = async () => {
  editing.value = false
  if (editedText.value !== props.task.text) {
    await tasksStore.updateTask(props.task.id, { text: editedText.value })
  }
}

const cancelEdit = () => {
  editing.value = false
}

const handleClickOutside = (event) => {
  if (showPalette.value && paletteRef.value && !paletteRef.value.contains(event.target)) {
    emit('close-palette')
  }
}

const isMobile = ref(window.innerWidth < 640)

const handleResize = () => {
  isMobile.value = window.innerWidth < 640
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
