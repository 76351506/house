/*
 * @Author: heinan
 * @Date: 2023-07-17 15:10:49
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-25 11:06:13
 */
import { RouteRecordRaw } from 'vue-router'
import { UserManage } from '@/router/routes/user'

const NotFoundRedirect = {
  path: '/:pathMatch(.*)*',
  redirect: '/404'
}
const NotFound = {
  path: '/404',
  name: 'NotFound',
  component: () => import(/* webpackChunkName: "NotFound" */ '@/components/page/404.vue')
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },

  UserManage,

  {
    path: '/home',
    name: 'Home',
    meta: {
      requireAuth: true
    },
    component: () => import(/* webpackChunkName: "Home" */ '@/views/home/index.vue')
  },
  {
    path: '/user/:uid',
    name: 'UserInfo',
    component: () => import(/* webpackChunkName: "UserInfo" */ '@/views/user/info/index.vue')
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
  NotFoundRedirect,
  {
    path: '/visual/pie',
    name: 'VisualPieCharts',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "VisualPieCharts" */ '@/views/visual/pie.vue')
  },
  {
    path: '/visual/bar',
    name: 'VisualBarCharts',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "VisualBarCharts" */ '@/views/visual/bar.vue')
  },
  {
    path: '/visual/line',
    name: 'VisualLineCharts',
    meta: { requireAuth: true },
    component: () => import(/* webpackChunkName: "VisualLineCharts" */ '@/views/visual/line.vue')
  },

  {
    path: '/chat',
    name: 'ChatRoom',
    component: () => import(/* webpackChunkName: "ChatRoom" */ '@/views/chat/index.vue')
  },
  {
    path: '/authority/viewAuthority',
    name: 'ViewAuthority',
    component: () => import(/* webpackChunkName: "Authority" */ '@/views/authority/authority/view.vue')
  },
  {
    path: '/authority/apiAuthority',
    name: 'ApiAuthority',
    component: () => import(/* webpackChunkName: "Authority" */ '@/views/authority/authority/api.vue')
  },
  {
    path: '/authority/identity',
    name: 'Identity',
    component: () => import(/* webpackChunkName: "Authority" */ '@/views/authority/identity/index.vue')
  },
  {
    path: '/authority/view',
    name: 'ViewManage',
    component: () => import(/* webpackChunkName: "Authority" */ '@/views/authority/view/index.vue')
  },
  {
    path: '/authority/api',
    name: 'ApiManage',
    component: () => import(/* webpackChunkName: "Authority" */ '@/views/authority/api/index.vue')
  }
]
