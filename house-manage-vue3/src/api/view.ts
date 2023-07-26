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
import { SettingsManageType } from '@/interface/model/settings'

interface useViewManageServiceInterface {
  list(): Promise<CommonManageType.CommonAxiosResponse<SettingsManageType.ViewState>>
  add(params: SettingsManageType.ViewState): Promise<CommonManageType.CommonAxiosResponse<any>>
  edit(params: SettingsManageType.ViewState): Promise<CommonManageType.CommonAxiosResponse<any>>
  detail(id: string): Promise<any>
  delete(id: string): Promise<CommonManageType.CommonAxiosResponse<any>>
}

export const useViewManageService = (): useViewManageServiceInterface => {
  class ViewManageService {
    @LoadingDecorator(true)
    public async delete(id: string) {
      const url = API_SETTINGS.viewList() + `/${id}`
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
      const url = API_SETTINGS.viewList() + `/${id}`
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
      const url = API_SETTINGS.viewList()
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
    public async add(params: SettingsManageType.ViewState) {
      const url = API_SETTINGS.viewList()
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
    public async edit(params: SettingsManageType.ViewState) {
      const url = API_SETTINGS.viewList() + `/${params.view_authority_id}`
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
  return new ViewManageService()
}
