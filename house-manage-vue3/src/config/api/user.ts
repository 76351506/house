/*
 * @Author: heinan
 * @Date: 2023-07-18 15:07:32
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-18 15:11:37
 */
import { resolveUrl } from '@/utils'

export const API_USER = {
  login: () => resolveUrl('/user/login'),
  registry: () => resolveUrl('/user/registry')
}
