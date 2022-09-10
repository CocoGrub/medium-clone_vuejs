import Vue from 'vue'
import VueRouter from 'vue-router'
import GlobalFeed from '../views/GlobalFeed.vue'
import YourFeed from '../views/YourFeed.vue'
import Register from '../views/Register'
import TagFeed from '../views/TagFeed'
import Login from '../views/Login'
import Article from '@/views/Article'

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
    component: GlobalFeed,
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed,
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeed,
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: Login,
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: Article,
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
