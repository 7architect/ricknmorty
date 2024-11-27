import { defineAsyncComponent } from 'vue'

export type { CharacterListProps } from './CharacterListWidget.ts'
export const CharacterList = defineAsyncComponent(() => import('./CharacterListWidget.vue'))
