<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Languages, Check } from 'lucide-vue-next'

const { locale } = useI18n()
const open = ref(false)

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' }
]

const toggle = () => {
  open.value = !open.value
}

const selectLanguage = (code) => {
  locale.value = code
  localStorage.setItem('lang', code)
  open.value = false
}
</script>

<template>
  <div class="relative">
    <button @click="toggle" class="flex items-center text-gray-700 hover:text-blue-600">
      <Languages class="w-5 h-5" />
    </button>

    <div v-if="open" class="absolute mt-2 right-0 w-30 bg-white border border-gray-200 rounded shadow z-50">
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="selectLanguage(lang.code)"
        class="flex justify-between items-center w-full px-4 py-2 hover:bg-gray-100 text-sm"
      >
        <span>{{ lang.label }}</span>
        <Check v-if="locale === lang.code" class="w-4 h-4 text-green-500" />
      </button>
    </div>
  </div>
</template>
