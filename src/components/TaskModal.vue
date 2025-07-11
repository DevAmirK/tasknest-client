<template>
  <div class="fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/30 z-40" @click="handleClose"></div>

    <div ref="animatedModal" :style="styles">
      <TaskNote
        :task="task"
        :active-palette-id="activePaletteId"
        modal-task
        @open-palette="$emit('open-palette', task.id)"
        @close-palette="$emit('close-palette')"
        @toggle="$emit('toggle', task)"
        @trash="handleTrash"
        @archive="handleArchive"
        @close-modal="handleClose"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import TaskNote from './TaskNote.vue'

const props = defineProps({
  task: Object,
  activePaletteId: Number,
  noteRect: Object
})

const emit = defineEmits(['close', 'open-palette', 'close-palette', 'toggle', 'trash', 'archive'])

const animatedModal = ref(null)
const styles = ref({})
const isMounted = ref(false)

onMounted(() => {
  document.documentElement.style.overflow = 'hidden'
  isMounted.value = true
})

watch(
  () => props.noteRect,
  async (rect) => {
    if (!rect) return

    styles.value = {
      position: 'fixed',
      left: rect.left + 'px',
      top: rect.top + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
      transform: 'scale(1)',
      transition: 'all 300ms ease',
      zIndex: '50'
    }

    await nextTick()

    requestAnimationFrame(() => {
      const vw = window.innerWidth
      const finalWidth = vw < 640 ? vw * 0.9 : vw < 768 ? vw * 0.5 : vw * 0.35

      styles.value = {
        position: 'fixed',
        left: '50%',
        top: '50%',
        width: finalWidth + 'px',
        height: 'auto',
        transform: 'translate(-50%, -60%) scale(1)',
        transition: 'all 300ms ease',
        zIndex: '50'
      }
    })
  },
  { immediate: true }
)

const handleClose = () => {
  const rect = props.noteRect
  if (!rect) {
    emit('close')
    return
  }

  styles.value = {
    position: 'fixed',
    left: rect.left + 'px',
    top: rect.top + 'px',
    width: rect.width + 'px',
    height: rect.height + 'px',
    transform: 'scale(1)',
    transition: 'all 300ms ease',
    zIndex: '50'
  }

  setTimeout(() => {
    emit('close')
    isMounted.value = false
  }, 300)
}

const handleArchive = (id) => {
  emit('archive', id)
  handleClose()
}

const handleTrash = (id) => {
  emit('trash', id)
  handleClose()
}

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
})
</script>
