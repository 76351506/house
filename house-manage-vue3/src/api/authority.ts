/*
 * @Author: heinan
 * @Date: 2023-07-25 10:39:07
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-25 17:18:15
 */

import { request } from '@/utils/request'
import { API_SETTINGS } from '@/config/api/settings'
import { LoadingDecorator } from '@/utils/loading'
import { CommonManageType } from '@/interface/model/common'

interface useAuthorityManageServiceInterface {
  // 给身份设置视图权限
  setViewAuthByIdentityId(params: { identity_id: string; view_authority_id: string }): Promise<CommonManageType.CommonAxiosResponse<any>>
  setViewAuthByIdentityList(params: { identity_id: string; view_authority_ids: string[] }): Promise<CommonManageType.CommonAxiosResponse<any>>
  getViewAuthByIdentityId(id: string): Promise<CommonManageType.CommonAxiosResponse<any>>
}

export const useAuthorityService = (): useAuthorityManageServiceInterface => {
  class AuthorityManageService {
    @LoadingDecorator(true)
    public async setViewAuthByIdentityId(params: { identity_id: string; view_authority_id: string }) {
      const url = API_SETTINGS.setViewAuthByIdentityId()
      return request
        .post(url, params)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
    @LoadingDecorator(true)
    public async setViewAuthByIdentityList(params: { identity_id: string; view_authority_ids: string[] }) {
      const url = API_SETTINGS.setViewAuthByIdentityList()
      return request
        .post(url, params)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
    @LoadingDecorator(true)
    public async getViewAuthByIdentityId(id: string) {
      const url = API_SETTINGS.getViewAuthByIdentityId() + `/${id}`
      return request
        .get(url)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
  }
  return new AuthorityManageService()
}
