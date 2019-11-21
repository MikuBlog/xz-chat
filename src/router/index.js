import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index'
import Login from '@/views/login/index'
import Register from '@/views/register/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '*',
    redirect: "/login"
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
