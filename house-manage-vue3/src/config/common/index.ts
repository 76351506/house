/*
 * @Author: heinan
 * @Date: 2023-07-18 15:10:30
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-21 10:36:19
 */

// 接口请求公共的前端
export const BASE_URL = process.env.VUE_APP_API_URL
// 直播接口请求前缀
export const API_LIVE_PREFIX = process.env.VUE_APP_LIVE_URL_ADDRESS
// 入口页面Layou模板排除登录、注册
export const LAYOUT_EXCEPT = ['/user/login', '/user/registry']
