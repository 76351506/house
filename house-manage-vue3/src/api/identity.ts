/*
 * @Author: heinan
 * @Date: 2023-07-25 10:39:07
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 11:38:58
 */

import { request } from '@/utils/request'
import { API_AUTHORITY } from '@/config/api/authority'
import { LoadingDecorator } from '@/utils/loading'
import { CommonManageType } from '@/interface/model/common'
import { AuthorityManageType } from '@/interface/model/authority'

interface useIdentityManageServiceInterface {
  list(): Promise<CommonManageType.CommonAxiosResponse<AuthorityManageType.IdentityInterface>>
}

export const useIdentityService = (): useIdentityManageServiceInterface => {
  class IdentityManageService {
    @LoadingDecorator(true)
    public async list() {
      const url = API_AUTHORITY.getIdentityList()
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
