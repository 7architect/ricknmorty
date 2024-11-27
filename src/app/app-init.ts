import { createApp, h } from 'vue'
import App from './App.vue'
import { setupApollo } from './init-apollo'
import { usePinia } from './init-pinia'
import { useRouter } from './init-router'
import './root-style.css'

export const app = createApp({
  setup() {
    setupApollo()
  },

  render: () => h(App),
})

usePinia(app)
useRouter(app)
