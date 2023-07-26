/*
 * @Author: heinan
 * @Date: 2023-07-18 15:07:32
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-19 22:09:51
 */
import { resolveUrl } from '@/utils'

export const API_USER = {
  login: () => resolveUrl('/user/login'),
  registry: () => resolveUrl('/user/registry'),
  list: () => resolveUrl('/user/list'),
  getUserIdByToken: () => resolveUrl('/user/getUserByToken'),
  getUserInfoById: () => resolveUrl('/user/getUserInfo'),
  upload: () => resolveUrl('/user/upload'),
  identity: () => resolveUrl('/identity/list'),
  updateUser: () => resolveUrl('/user/updataUserInfo'),
  getCaptcha: () => resolveUrl('/user/captcha')
}
