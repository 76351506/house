/*
 * @Author: heinan
 * @Date: 2023-07-25 10:39:07
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 11:48:59
 */

import { request } from '@/utils/request'
import { API_AUTHORITY } from '@/config/api/authority'
import { LoadingDecorator } from '@/utils/loading'
import { CommonManageType } from '@/interface/model/common'
import { AuthorityManageType } from '@/interface/model/authority'

interface useAuthorityManageServiceInterface {
  // 给身份设置单个视图权限
  setViewAuthByIdentityId(params: AuthorityManageType.IdentityViewInterface): Promise<CommonManageType.CommonAxiosResponse<any>>
  // 给身份设置视图列表权限
  setViewAuthByIdentityList(params: AuthorityManageType.IdentityViewListInterface): Promise<CommonManageType.CommonAxiosResponse<any>>
  // 根据身份获取对应视图权限
  getViewAuthByIdentityId(id: string): Promise<CommonManageType.CommonAxiosResponse<any>>

  // 给身份设置单个接口权限
  setApiAuthByIdentityId(params: AuthorityManageType.IdentityApiInterface): Promise<CommonManageType.CommonAxiosResponse<any>>
  // 给身份设置接口列表权限
  setApiAuthByIdentityList(params: AuthorityManageType.IdentityApiListInterface): Promise<CommonManageType.CommonAxiosResponse<any>>
  // 根据身份获取对应接口权限
  getApiAuthByIdentityId(id: string): Promise<CommonManageType.CommonAxiosResponse<any>>
}

export const useAuthorityService = (): useAuthorityManageServiceInterface => {
  class AuthorityManageService {
    @LoadingDecorator(true)
    public async setViewAuthByIdentityId(params: AuthorityManageType.IdentityViewInterface) {
      const url = API_AUTHORITY.setViewAuthByIdentityId()
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
    public async setViewAuthByIdentityList(params: AuthorityManageType.IdentityViewListInterface) {
      const url = API_AUTHORITY.setViewAuthByIdentityList()
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
      const url = API_AUTHORITY.getViewAuthByIdentityId() + `/${id}`
      return request
        .get(url)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
    @LoadingDecorator(true)
    public async setApiAuthByIdentityId(params: AuthorityManageType.IdentityApiInterface) {
      const url = API_AUTHORITY.setApiAuthByIdentityId()
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
    public async setApiAuthByIdentityList(params: AuthorityManageType.IdentityApiListInterface) {
      const url = API_AUTHORITY.setApiAuthByIdentityList()
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
    public async getApiAuthByIdentityId(id: string) {
      const url = API_AUTHORITY.getApiAuthByIdentityId() + `/${id}`
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
