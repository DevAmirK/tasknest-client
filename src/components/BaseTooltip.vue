<template>
  <div class="relative group inline-block">
    <slot />
    <div
      class="absolute z-10 px-2 py-1 text-xs text-white text-nowrap bg-stone-800 rounded-md opacity-0 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none"
      :class="tooltipPositionClass"
    >
      {{ text }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { toRefs } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'bottom',
    validator: (val) => ['top', 'bottom', 'left', 'right'].includes(val)
  }
})

const { position } = toRefs(props)

const tooltipPositionClass = computed(() => {
  switch (position.value) {
    case 'top':
      return 'bottom-full mb-2 left-1/2 -translate-x-1/2'
    case 'bottom':
      return 'top-full mt-2 left-1/2 -translate-x-1/2'
    case 'left':
      return 'right-full mr-2 top-1/2 -translate-y-1/2'
    case 'right':
      return 'left-full ml-2 top-1/2 -translate-y-1/2'
    default:
      return 'bottom-full mb-2 left-1/2 -translate-x-1/2'
  }
})
</script>
