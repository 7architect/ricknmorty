import { defineAsyncComponent } from 'vue'

export type { CharacterCardProps } from './CharacterCard.ts'
export const CharacterCard = defineAsyncComponent(() => import('../CharacterCard/CharacterCard.vue'))
