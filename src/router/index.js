import Vue from 'vue'
import VueRouter from 'vue-router'
import McvGlobalFeed from '../views/GlobalFeed.vue'
import Register from '../views/Register'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
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
  {
    path: '/',
    name: 'globalFeed',
    component: McvGlobalFeed,
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: Login,
  },
  {
    path: '/tags/:slug',
    name: 'yourFeed',
    component: Login,
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: Login,
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: Login,
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: Login,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Login,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: Login,
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: Login,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
