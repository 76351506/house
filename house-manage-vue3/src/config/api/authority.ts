/*
 * @Author: heinan
 * @Date: 2023-07-24 16:38:46
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 12:07:07
 */
import { resolveUrl } from '@/utils'

export const API_AUTHORITY = {
  viewList: () => resolveUrl('/api/v1/view'),
  apiList: () => resolveUrl('/api/v1/api'),
  getIdentityList: () => resolveUrl('/api/v1/identity'),
  getViewAuthByIdentityId: () => resolveUrl('/getViewAuthByIdentityId'),
  setViewAuthByIdentityId: () => resolveUrl('/api/v1/viewAuth'),
  setViewAuthByIdentityList: () => resolveUrl('/setViewAuthByIdentityList'),
  getApiAuthByIdentityId: () => resolveUrl('/getApiAuthByIdentityId'),
  setApiAuthByIdentityId: () => resolveUrl('/api/v1/apiAuth'),
  setApiAuthByIdentityList: () => resolveUrl('/setApiAuthByIdentityList')
}
