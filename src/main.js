import './assets/styles.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'
import { Toaster } from 'vue-sonner'

import en from './locales/en'
import ru from './locales/ru'

const savedLocale = localStorage.getItem('locale') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    ru
  }
})

export { i18n }

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Toaster)

app.mount('#app')
