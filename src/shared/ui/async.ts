import { defineAsyncComponent } from 'vue'

export const TopBar = defineAsyncComponent(() => import('./TopBar/TopBar.vue'))
export const Input = defineAsyncComponent(() => import('./Input/Input.vue'))
export const Card = defineAsyncComponent(() => import('./Card/Card.vue'))
export const Scaffold = defineAsyncComponent(() => import('./Scaffold/Scaffold.vue'))
export const SafeArea = defineAsyncComponent(() => import('./SafeArea/SafeArea.vue'))
export const PageDelimiter = defineAsyncComponent(() => import('./PageDelimiter/PageDelimiter.vue'))
export const TextButton = defineAsyncComponent(() => import('./TextButton/TextButton.vue'))
export const ActivityIndicator = defineAsyncComponent(() => import('./ActivityIndicator/ActivityIndicator.vue'))
