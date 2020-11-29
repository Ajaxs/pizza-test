import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sales',
    name: 'About',
    component: () => import('@/views/Sales.vue')
  },
  {
    path: '/products',
    name: 'Product',
    component: () => import('@/views/Product.vue'),
    children: [
      {
        path: 'pizzas/:id',
        name: 'ProductPizza',
        component: () => import('@/components/products/pizzas/ProductPizza.vue')
      }
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
