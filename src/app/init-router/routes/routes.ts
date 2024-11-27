import type { RouteRecordRaw } from 'vue-router'

export default <RouteRecordRaw[]>[
  {
    path: '/',
    component: () => import('@/pages/_Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/pages/MainPage/MainPage.vue'),
      },
      {
        path: 'episode',
        component: () => import('@/pages/Episode.vue'),
      },
      {
        path: 'character/:id',
        props: true,
        component: () => import('@/pages/Character.vue'),
      },
    ],
  },
]
