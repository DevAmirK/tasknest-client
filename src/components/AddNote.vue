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

    <div
      v-else
      class="border border-stone-400 rounded-xl p-4 shadow-lg/10 transition-colors duration-300"
      :style="{ backgroundColor: newTaskColor || '#ffffff' }"
    >
      <form @submit.prevent="addTask">
        <textarea
          v-model="newTask"
          rows="3"
          class="w-full rounded-lg px-3 py-2 resize-none"
          :placeholder="$t('dashboard.addPlaceholder')"
          required
        ></textarea>

        <div class="flex items-center justify-between mt-2">
          <div class="relative">
            <button type="button" class="note-btn" @click.stop="showPalette = !showPalette">
              <Palette class="w-5 h-5 text-gray-600" />
            </button>
            <div
              v-if="showPalette && !isMobile"
              ref="paletteRef"
              class="absolute left-[50%] translate-x-[-50%] mt-2 bg-white rounded-lg shadow p-2 flex gap-1 z-50"
            >
              <button
                v-for="color in colors"
                :key="color"
                :style="{ backgroundColor: color }"
                class="w-6 h-6 rounded-full border border-slate-300 transition"
                :class="{ 'ring-2 ring-blue-500': color === newTaskColor }"
                @click="selectColor(color)"
              ></button>
            </div>
            <Teleport to="body">
              <!-- Мобильная палетка -->
              <div
                v-if="showPalette && isMobile"
                ref="paletteRef"
                class="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_8px_rgba(0,0,0,0.2)] z-[1000] px-3 py-5 flex gap-2 overflow-x-auto"
              >
                <button
                  v-for="color in colors"
                  :key="color"
                  :style="{ backgroundColor: color }"
                  :class="[
                    'w-12 h-12 rounded-full border border-slate-300 shrink-0',
                    color === newTaskColor ? 'outline outline-3 outline-blue-400' : ''
                  ]"
                  @click.stop="selectColor(color)"
                ></button>
              </div>
            </Teleport>
          </div>

          <div class="flex gap-4">
            <button
              type="button"
              @click="cancelNewTask"
              class="bg-stone-100 hover:bg-stone-200 text-stone-600 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              {{ $t('dashboard.cancel') }}
            </button>
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              {{ $t('dashboard.add') }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTasksStore } from '@/store/tasks'
import { Palette, Plus } from 'lucide-vue-next'
import BaseTooltip from '@/components/BaseTooltip.vue'

const tasksStore = useTasksStore()

const newTask = ref('')
const creating = ref(false)
const newTaskColor = ref('#ffffff')
const showPalette = ref(false)
const paletteRef = ref(null)

const colors = ['#ffffff', '#faafa8', '#f39f76', '#fff8b8', '#e2f6d3', '#b4ddd3', '#d4e4ed', '#aeccdc', '#d3bfdb', '#f6e2dd', '#e9e3d4']

const addTask = () => {
  if (!newTask.value.trim()) return
  tasksStore.addTask(newTask.value.trim(), newTaskColor.value)
  resetForm()
}

const cancelNewTask = () => {
  resetForm()
}

const resetForm = () => {
  creating.value = false
  newTask.value = ''
  newTaskColor.value = null
  showPalette.value = false
}

const selectColor = (color) => {
  newTaskColor.value = color
  showPalette.value = false
}

// --- Обработчик клика вне палетки ---
const handleClickOutside = (e) => {
  if (showPalette.value && paletteRef.value && !paletteRef.value.contains(e.target)) {
    showPalette.value = false
  }
}

const isMobile = ref(window.innerWidth < 640)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
