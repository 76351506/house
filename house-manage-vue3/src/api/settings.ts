/*
 * @Author: heinan
 * @Date: 2023-07-25 10:39:07
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-25 11:55:50
 */

import { request } from '@/utils/request'
import { API_SETTINGS } from '@/config/api/settings'
import { LoadingDecorator } from '@/utils/loading'
import { CommonManageType } from '@/interface/model/common'
import { SettingsManageType } from '@/interface/model/settings'

interface SettingsManageServiceInterface {
  list(): Promise<CommonManageType.CommonAxiosResponse<SettingsManageType.ViewState>>
  add(params: SettingsManageType.ViewState): Promise<CommonManageType.CommonAxiosResponse<any>>
}

export const useSettingsManageService = (): SettingsManageServiceInterface => {
  class SettingsManageService {
    @LoadingDecorator(true)
    public async list() {
      const url = API_SETTINGS.list()
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
      const url = API_SETTINGS.list()
      return request
        .post(url, params)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
  }
  return new SettingsManageService()
}
