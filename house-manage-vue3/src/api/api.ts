/*
 * @Author: heinan
 * @Date: 2023-07-25 10:39:07
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-25 17:18:06
 */

import { request } from '@/utils/request'
import { API_SETTINGS } from '@/config/api/settings'
import { LoadingDecorator } from '@/utils/loading'
import { CommonManageType } from '@/interface/model/common'
import { SettingsManageType } from '@/interface/model/settings'

interface ApiManageServiceInterface {
  list(): Promise<CommonManageType.CommonAxiosResponse<SettingsManageType.ApiState>>
  add(params: SettingsManageType.ApiState): Promise<CommonManageType.CommonAxiosResponse<any>>
  edit(params: SettingsManageType.ApiState): Promise<CommonManageType.CommonAxiosResponse<any>>
  detail(id: string): Promise<CommonManageType.CommonAxiosResponse<any>>
  delete(id: string): Promise<CommonManageType.CommonAxiosResponse<any>>
}

export const useApiManageService = (): ApiManageServiceInterface => {
  class ApiManageService {
    @LoadingDecorator(true)
    public async delete(id: string) {
      const url = API_SETTINGS.apiList() + `/${id}`
      return request
        .delete(url)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
    @LoadingDecorator(true)
    public async detail(id: string) {
      const url = API_SETTINGS.apiList() + `/${id}`
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
    public async list() {
      const url = API_SETTINGS.apiList()
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
    public async add(params: SettingsManageType.ApiState) {
      const url = API_SETTINGS.apiList()
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
    public async edit(params: SettingsManageType.ApiState) {
      const url = API_SETTINGS.apiList() + `/${params.api_authority_id}`
      return request
        .put(url, params)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
  }
  return new ApiManageService()
}
