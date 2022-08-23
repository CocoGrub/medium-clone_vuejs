import Vue from 'vue'
import VueRouter from 'vue-router'
import McvGlobalFeed from '../views/GlobalFeed.vue'
import Register from '../views/Register'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: McvGlobalFeed,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
