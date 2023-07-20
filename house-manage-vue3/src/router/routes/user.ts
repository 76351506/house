/*
 * @Author: heinan
 * @Date: 2023-06-25 16:30:34
 * @Last Modified by: heinan
 * @Last Modified time: 2023-06-25 16:33:26
 */

export const UserManage = {
  path: '/user',
  name: 'UserManage',
  component: () => import(/* webpackChunkName: "UserManage" */ '@/views/user/manage/index.vue')
}
export const UserLogin = {
  path: '/user/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "Login" */ '@/views/user/login/index.vue')
}

export const UserRegistry = {
  path: '/user/registry',
  name: 'Registry',
  component: () => import(/* webpackChunkName: "Registry" */ '@/views/user/registry/index.vue')
}
export const UserIdentity = {
  path: '/user/identity',
  name: 'UserIdentity',
  component: () => import(/* webpackChunkName: "UserIdentity" */ '@/views/user/manage/identity.vue')
}

export const UserInfo = {
  path: '/user/info',
  name: 'UserInfo',
  component: () => import(/* webpackChunkName: "UserInfo" */ '@/views/user/info/index.vue')
}
export const UserList = {
  path: '/user/list',
  name: 'UserList',
  component: () => import(/* webpackChunkName: "UserList" */ '@/views/user/manage/list.vue')
}
