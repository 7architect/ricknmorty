import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

export function useRouter(app: App) {
  const history = createWebHistory()
  const router = createRouter({
    history,
    routes,
  })
  app.use(router)
}
