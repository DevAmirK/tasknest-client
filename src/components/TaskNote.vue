<template>
  <div class="bg-amber-50 border border-amber-100 shadow rounded-xl p-4 flex flex-col justify-between">
    <div class="flex-1 text-sm text-gray-800 whitespace-pre-wrap break-words" :class="{ 'line-through text-gray-400': task.done }">
      {{ task.text }}
    </div>
    <div class="mt-4 flex justify-between items-center">
      <label class="flex items-center gap-1 text-sm text-blue-600">
        <input type="checkbox" :checked="task.done" @change="$emit('toggle', task)" class="accent-blue-500" />
        {{ $t('dashboard.done') }}
        <Square />
        <SquareCheck />
      </label>
      <button>
        <Palette />
      </button>
      <button @click="">
        <Archive />
      </button>
      <button @click="$emit('delete', task.id)" class="text-xs text-red-500 hover:underline">
        <Trash />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Archive, Palette, Square, SquareCheck, Trash } from 'lucide-vue-next'

defineProps({
  task: Object
})
</script>
