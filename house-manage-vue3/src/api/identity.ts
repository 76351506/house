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

interface useIdentityManageServiceInterface {
  list(): Promise<CommonManageType.CommonAxiosResponse<SettingsManageType.IdentityInterface>>
}

export const useIdentityService = (): useIdentityManageServiceInterface => {
  class IdentityManageService {
    @LoadingDecorator(true)
    public async list() {
      const url = API_SETTINGS.getIdentityList()
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
  return new IdentityManageService()
}
