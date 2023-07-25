/*
 * @Author: heinan
 * @Date: 2023-07-24 16:38:46
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-25 16:51:49
 */
import { resolveUrl } from '@/utils'

export const API_SETTINGS = {
  viewList: () => resolveUrl('/api/v1/view'),
  apiList: () => resolveUrl('/api/v1/api')
}
