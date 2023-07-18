/*
 * @Author: heinan
 * @Date: 2023-07-17 15:10:49
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-17 15:18:33
 */
import { RouteRecordRaw } from 'vue-router'

const NotFoundRedirect = {
  path: '/:pathMatch(.*)*',
  redirect: '/404'
}
const NotFound = {
  path: '/404',
  name: 'NotFound',
  component: () => import(/* webpackChunkName: "NotFound" */ '@/components/common/404.vue')
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/home/index.vue')
  },
  {
    path: '/user/login',
    name: 'UserLogin',
    component: () => import(/* webpackChunkName: "UserLogin" */ '@/views/user/login/index.vue')
  },
  {
    path: '/user/registry',
    name: 'UserRegistry',
    component: () => import(/* webpackChunkName: "UserRegistry" */ '@/views/user/registry/index.vue')
  },
  NotFound,
  NotFoundRedirect
]
