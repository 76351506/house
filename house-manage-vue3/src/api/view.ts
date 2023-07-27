/*
 * @Author: heinan
 * @Date: 2023-07-25 10:39:07
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 11:55:42
 */

import { request } from '@/utils/request'
import { API_AUTHORITY } from '@/config/api/authority'
import { LoadingDecorator } from '@/utils/loading'
import { CommonManageType } from '@/interface/model/common'
import { AuthorityManageType } from '@/interface/model/authority'

interface ViewManageServiceInterface {
  list(): Promise<CommonManageType.CommonAxiosResponse<AuthorityManageType.ViewState>>
  add(params: AuthorityManageType.ViewState): Promise<CommonManageType.CommonAxiosResponse<any>>
  edit(params: AuthorityManageType.ViewState): Promise<CommonManageType.CommonAxiosResponse<any>>
  detail(id: string): Promise<any>
  delete(id: string): Promise<CommonManageType.CommonAxiosResponse<any>>
}

export const useViewManageService = (): ViewManageServiceInterface => {
  class ViewManageService {
    @LoadingDecorator(true)
    public async delete(id: string) {
      const url = API_AUTHORITY.viewList() + `/${id}`
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
      const url = API_AUTHORITY.viewList() + `/${id}`
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
      const url = API_AUTHORITY.viewList()
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
    public async add(params: AuthorityManageType.ViewState) {
      const url = API_AUTHORITY.viewList()
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
    public async edit(params: AuthorityManageType.ViewState) {
      const url = API_AUTHORITY.viewList() + `/${params.view_authority_id}`
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
