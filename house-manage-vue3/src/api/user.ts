/*
 * @Author: heinan
 * @Date: 2023-06-25 17:17:35
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-19 22:09:29
 */
import { request, axios } from '@/utils/request'
import { API_USER } from '@/config/api/user'
import { LoadingDecorator } from '@/utils/loading'
import { UserManageType } from '@/interface/model/user'

interface UseUserServiceInterface {
  login(data: { username: string | undefined; password: string | undefined }): Promise<any>
  getIdentityList(): Promise<any>
  getUserList(params: { pagesize: number; pagecount: number }): Promise<any>
  upload(file: FormData, uid: string): Promise<any>
  getUserIdByToken(token: string): Promise<any>
  getUserInfoById(params: { uid: string }): Promise<any>
  updateUser(data: UserManageType.UserInfoState): Promise<any>
}

export const useUserService = (): UseUserServiceInterface => {
  class userService {
    // 修改用户信息
    public async updateUser(data: UserManageType.UserInfoState) {
      const url = API_USER.updateUser()
      return request
        .put(url, data)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
    // 用户登录
    public async login(data: { username: string | undefined; password: string | undefined }) {
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
    // 获取用户身份权限
    @LoadingDecorator(true)
    public async getUserList(params: { pagesize: number; pagecount: number }) {
      const url = API_USER.list()
      return request
        .get(url, { params })
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
    // 获取用户身份权限
    @LoadingDecorator(true)
    public async getIdentityList() {
      const url = API_USER.identity()
      return request
        .post(url)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
    // 上传图片
    @LoadingDecorator(true)
    public upload(file: FormData, uid: string) {
      const url = API_USER.upload()
      return axios
        .post(url, file, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          console.error(err)
          return Promise.reject(err)
        })
    }
    // 获取uid
    @LoadingDecorator(true)
    public async getUserIdByToken(token: string) {
      const url = API_USER.getUserIdByToken()
      return request
        .get(`${url}?token=${token}`)
        .then(({ data }) => {
          return Promise.resolve(data)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }
    // 根据uid获得用户信息
    @LoadingDecorator(true)
    public async getUserInfoById(params: { uid: string }) {
      const url = API_USER.getUserInfoById()
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
  return new userService()
}
