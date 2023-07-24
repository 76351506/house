/*
 * @Author: heinan
 * @Date: 2023-07-24 16:38:46
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 16:39:24
 */
import { resolveUrl } from '@/utils'

export const API_AUDIT = {
  list: () => resolveUrl('/api/v1/audit')
}
