<template>
  <div
    :class="[
      'task-note relative min-h-[8rem] max-h-[22rem] shadow-md rounded-xl flex flex-col justify-between self-start',
      {
        'opacity-70': task.done && !isHidden && !modalTask,
        'opacity-100': !task.done && !isHidden,
        'opacity-0 pointer-events-none': isHidden,
        'min-h-[10rem]': modalTask,
        'border border-slate-200': !modalTask
      }
    ]"
    :style="{ backgroundColor: task.color || '#ffffff' }"
    @click="$emit('open-modal', task, $event)"
  >
    <!-- Режим ПРОСМОТРА -->
    <div v-if="!modalTask" class="flex-1 text-sm break-words whitespace-pre-wrap p-4 overflow-hidden outline-none" v-html="clampedHtml"></div>

    <!-- Режим РЕДАКТИРОВАНИЯ -->
    <div
      v-else
      ref="editableRef"
      class="flex-1 text-sm break-words whitespace-pre-wrap p-4 overflow-y-auto outline-none custom-scroll"
      contenteditable
      spellcheck
      @input="handleInput"
      @paste="handlePaste"
    ></div>

    <!-- Buttons -->
    <template v-if="route.name == 'trash'">
      <div class="flex items-center px-4 py-2 gap-2">
        <BaseTooltip :text="$t('tooltip.restore')">
          <button @click.stop="$emit('restore', task)" class="note-btn">
            <Undo2 class="w-4.5 h-4.5" :stroke-width="1.5" />
          </button>
        </BaseTooltip>

        <BaseTooltip :text="$t('tooltip.delete')">
          <button @click.stop="$emit('delete', task.id)" class="note-btn">
            <SquareX class="w-4.5 h-4.5" :stroke-width="1.5" />
          </button>
        </BaseTooltip>
      </div>
    </template>
    <template v-else>
      <div class="flex justify-around items-center px-4 py-2" :class="{ 'border-t-1 border-stone-400': modalTask }">
        <BaseTooltip :text="$t('tooltip.done')">
          <label class="note-btn flex items-center gap-2 cursor-pointer select-none" @click.stop="$emit('toggle', task)">
            <Transition name="fade-scale" mode="out-in">
              <SquareCheck v-if="task.done" key="checked" class="w-4.5 h-4.5" :stroke-width="1.5" />
              <Square v-else key="unchecked" class="w-4.5 h-4.5" :stroke-width="1.5" />
            </Transition>
          </label>
        </BaseTooltip>

        <BaseTooltip :text="$t('tooltip.palette')">
          <div class="relative">
            <button class="note-btn" @click.stop="emit('open-palette', task.id)">
              <Palette class="w-4.5 h-4.5" :stroke-width="1.5" />
            </button>
            <div
              v-if="showPalette && !isMobile"
              ref="paletteRef"
              class="absolute max-w-[90vw] overflow-x-auto left-[50%] translate-x-[-50%] mt-2 bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.2)] p-2 flex gap-1 z-50"
            >
              <button
                v-for="color in colors"
                :key="color"
                :style="{ backgroundColor: color }"
                :class="['w-7 h-7 rounded-full border border-slate-300', color === task.color ? 'outline outline-2 outline-blue-400' : '']"
                @click.stop="updateColor(color)"
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
                    color === task.color ? 'outline outline-3 outline-blue-400' : ''
                  ]"
                  @click.stop="updateColor(color)"
                ></button>
              </div>
            </Teleport>
          </div>
        </BaseTooltip>

        <BaseTooltip :text="$t('tooltip.archive')" v-if="route.name == 'tasks'">
          <button class="note-btn" @click.stop="$emit('archive', task.id)">
            <PanelTopOpen class="w-4.5 h-4.5" :stroke-width="1.5" />
          </button>
        </BaseTooltip>

        <BaseTooltip :text="$t('tooltip.unarchive')" v-else>
          <button class="note-btn" @click.stop="$emit('unarchive', task.id)">
            <PanelTopClose class="w-4.5 h-4.5" :stroke-width="1.5" />
          </button>
        </BaseTooltip>

        <BaseTooltip :text="$t('tooltip.trash')">
          <button class="note-btn" @click.stop="$emit('trash', task.id)">
            <Trash2 class="w-4.5 h-4.5" :stroke-width="1.5" />
          </button>
        </BaseTooltip>
        <button v-if="modalTask" class="px-4 py-2 font-bold text-sm rounded-[2rem] hover:bg-black/5" @click.stop="$emit('close-modal')">
          {{ $t('dashboard.close') }}
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { PanelTopOpen, Palette, Square, SquareCheck, SquareX, Trash2, Undo2, PanelTopClose } from 'lucide-vue-next'
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useTasksStore } from '@/store/tasks'
import { useRoute } from 'vue-router'
import BaseTooltip from './BaseTooltip.vue'

const route = useRoute()

const props = defineProps({
  task: Object,
  activePaletteId: Number,
  isHidden: Boolean,
  modalTask: Boolean
})

const editableRef = ref(null)

watch(
  () => props.modalTask,
  async (val) => {
    if (val) {
      await nextTick()
      if (editableRef.value) {
        editableRef.value.textContent = props.task.text || ''
      }
    }
  }
)

const escapeHtml = (unsafe) => {
  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

const clampedHtml = computed(() => {
  if (!props.task.text) return ''

  const escaped = escapeHtml(props.task.text)
  const lines = escaped.split('\n')
  const isClamped = lines.length > 13
  const visibleLines = lines.slice(0, 13)
  return (isClamped ? [...visibleLines, '...'] : lines).join('<br>')
})

let debounceTimeout = null

const handleInput = (e) => {
  let html = e.target.innerHTML

  html = html
    .replace(/<div><br><\/div>/gi, '\n')
    .replace(/<div>/gi, '\n')
    .replace(/<\/div>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')

  const temp = document.createElement('div')
  temp.innerHTML = html
  let newText = temp.textContent || temp.innerText || ''

  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    tasksStore.updateTask(props.task.id, { text: newText.trim() })
  }, 800)
}

const emit = defineEmits([
  'toggle',
  'archive',
  'unarchive',
  'delete',
  'trash',
  'restore',
  'open-palette',
  'close-palette',
  'open-modal',
  'close-modal'
])

const paletteRef = ref(null)

const tasksStore = useTasksStore()

const showPalette = computed(() => props.activePaletteId === props.task.id)

const colors = ['#ffffff', '#faafa8', '#f39f76', '#fff8b8', '#e2f6d3', '#b4ddd3', '#d4e4ed', '#aeccdc', '#d3bfdb', '#f6e2dd']

const updateColor = async (color) => {
  emit('close-palette')
  await tasksStore.updateTask(props.task.id, { color })
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

onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
  if (props.modalTask && editableRef.value) {
    await nextTick()
    editableRef.value.textContent = props.task.text || ''
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})
</script>
