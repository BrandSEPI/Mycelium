import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import SigninView from '../views/SigninView.vue'
import SignupView from '../views/SignupView.vue'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import PostView from '../views/PostView.vue'
import NewpostView from '../views/NewpostView.vue'
import AdminUserView from '../views/AdminUserView.vue'
import AdminPostView from '../views/AdminPostView.vue'
import OopsView from '../views/OopsView.vue'
import cguView from '../views/Cguview.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/landing',
    name: 'landing',
    component: LandingView
  },
  {
    path: '/login/signin',
    name: 'Signin',
    component: SigninView
  },
  {
    path: '/login/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/user/:id',
    name: 'user',
    component: UserView
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostView
  },
  {
    path: '/newpost',
    name: 'newpost',
    component: NewpostView
  },
  {
    path: '/admin/user',
    name: 'adminUser',
    component: AdminUserView
  },
  {
    path: '/admin/post',
    name: 'adminPost',
    component: AdminPostView
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: OopsView
  },
  {
    path: '/Cgu',
    name: 'Cgu',
    component : cguView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
