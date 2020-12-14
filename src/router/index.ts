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
    name: 'Sales',
    component: () => import('@/views/Sales.vue')
  },
  {
    path: '/products/pizzas/:id',
    name: 'PizzaPage',
    component: () => import('@/components/products/pizzas/Page.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/tracking/:id',
    name: 'Tracking',
    component: () => import('../views/Tracking.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
