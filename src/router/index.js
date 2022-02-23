import { createRouter, createWebHashHistory } from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'


const routes = [ 
  {
    path: '/about',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'YourFeed',
    component: GlobalFeed
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: GlobalFeed
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: GlobalFeed
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: GlobalFeed
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: GlobalFeed
  },
  {
    path: '/settings',
    name: 'settings',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: GlobalFeed
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: GlobalFeed
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
