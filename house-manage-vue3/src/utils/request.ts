/*
 * @Author: heinan
 * @Date: 2023-06-20 11:04:54
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-18 15:21:37
 */
// @ts-nocheck
import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
// import { signOut } from './common'

const request: AxiosInstance = axios.create({
  timeout: 3000
})

request.interceptors.request.use(
  (config: any) => {
    config.headers['Content-Type'] = 'application/json'
    if (localStorage.getItem('token')) {
      const Authorization = localStorage.getItem('token')
      config.headers['Authorization'] = `${Authorization}`
    }
    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(response)
  },
  (error: AxiosError) => {
    const status = error.response?.status as number

    switch (status) {
      case 401:
        message.error(error.response.data.msg as string, 1, () => {
          //   signOut()
          const pathUrl = location.href.split('/')
          window.location.href = `/user/login?redirect=${encodeURIComponent('/' + pathUrl[3])}`
        })
        break
      case 406:
        message.error('暂无数据！')
        break
      case 500:
        message.error('服务端报错,请重启再试！')
        break
      default:
        message.error('未知错误，请刷新页面！')
        break
    }
    return Promise.reject(error)
  }
)

export { request, axios }
