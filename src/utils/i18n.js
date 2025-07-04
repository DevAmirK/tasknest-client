import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import ru from '../locales/ru'

const defaultLang = navigator.language.startsWith('ru') ? 'ru' : 'en'
const savedLocale = localStorage.getItem('locale') || defaultLang

export const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, ru }
})

export const t = (key) => i18n.global.t(key)
