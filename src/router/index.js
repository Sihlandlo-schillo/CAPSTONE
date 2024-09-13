import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/',
    name: 'signIn',
    component: () => import('../views/LogInView.vue')
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import('../views/SignUpView.vue')
  },
  {
    path: '/userInfo/',
    name: 'userInfo',
    component: () => import('../views/UserInfo.vue'),
    props:true
  },
  {
    path: '/items',
    name: 'items',
    component: () => import('../views/ItemsView.vue')
  },
  {
    path: '/manageItems',
    name: 'manageItems',
    component: () => import('../views/ManageItems.vue')
  },
  {
    path: '/addItem',
    name: 'addItem',
    component: () => import('../views/AddItem.vue')
  },
  {
    path:'/updateItem/:id',
    name: 'updateItem',
    component: () => import('../views/UpdateItem.vue')
  },
  {
    path:'/orders',
    name:'ordersView',
    component: () => import('../views/OrdersView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
