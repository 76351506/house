/*
 * @Author: heinan
 * @Date: 2023-07-18 14:39:23
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-18 15:12:00
 */

import { request } from '@/utils/request'
import { UserManageType } from '@/interface/model/user'
import { API_USER } from '@/config/api/user'

interface UseUserServiceInterface {
  login(data: { username: string | undefined; password: string | undefined }): Promise<any>
}
export const useUserService = (): UseUserServiceInterface => {
  class userService {
    // 用户登录
    public async login(data: UserManageType.LoginForm) {
      const url = API_USER.login()
      return request
        .post(url, data)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
  }
  return new userService()
}
