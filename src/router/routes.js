
const routes = [
  {
    path: '/',
    component: () => import('layouts/layout.vue'),
    children: [
      { path: '', component: () => import('pages/todo.vue') },
      { path: '/settings', component: () => import('pages/settings.vue') },
      { path: '/auth', component: () => import('pages/auth.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
