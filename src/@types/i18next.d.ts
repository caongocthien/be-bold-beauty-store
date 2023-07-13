import 'i18next'
import { defaultNS, resources } from '../i18n/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    // eslint-disable-next-line prettier/prettier
    resources: (typeof resources)['vi']
  }
}
