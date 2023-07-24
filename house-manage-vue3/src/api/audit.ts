/*
 * @Author: heinan
 * @Date: 2023-06-25 17:17:35
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 17:08:14
 */
import { request } from '@/utils/request'
import { API_AUDIT } from '@/config/api/audit'
import { LoadingDecorator } from '@/utils/loading'
import { AuditManageType } from '@/interface/model/audit'
import { CommonManageType } from '@/interface/model/common'

interface AuditManageServiceInterface {
  list(params: AuditManageType.FormState): Promise<CommonManageType.CommonAxiosResponse<AuditManageType.FormState>>
}

export const useAuditManageService = (): AuditManageServiceInterface => {
  class AuditManageService {
    @LoadingDecorator(true)
    public async list(params: AuditManageType.FormState) {
      const url = API_AUDIT.list()
      return request
        .get(url, { params })
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
  }
  return new AuditManageService()
}
