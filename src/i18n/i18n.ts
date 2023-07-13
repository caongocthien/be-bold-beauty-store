import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HEADER_EN from '../locales/en/header.json'
import HEADER_VI from '../locales/vi/header.json'

export const resources = {
  en: {
    header: HEADER_EN
  },
  vi: {
    header: HEADER_VI
  }
}

export const defaultNS = 'header'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['header'],
  defaultNS,
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})
