import { createI18n } from 'vue-i18n'
import en from './en.json'
import ko from './ko.json'


const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  fallbackLocale: 'en',
  messages: { en, ko }
})

// this.$i18n.locale = language code;
export default i18n;