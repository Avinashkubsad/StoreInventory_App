const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', 
        component: () => import('pages/IndexPage.vue')
      },
       { path: '/inventory', component: () => import('pages/InventoryPage.vue') },
      { path: '/cart', component: () => import('pages/CartPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
