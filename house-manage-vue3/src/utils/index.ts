/*
 * @Author: heinan
 * @Date: 2023-07-18 15:09:34
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-21 10:36:09
 */
import { BASE_URL, API_LIVE_PREFIX } from '@/config/common'

/**
 * 根据ENV配置文件创建请求接口地址
 * @param url String 请求接口地址
 * @returns 完整的URL路径 /${环境前缀}/接口地址
 */
export const resolveUrl = (url: string) => {
  return BASE_URL + url
}

/**
 * 创建直播地址
 * @param room String 房间号
 * @param anchor String 主播直播间的名称
 * @returns 完整的直播地址 http://${ip}:${prot}/${room}/${anchor}.flv
 */
export const generatorLiveAddress = (room: string, anchor: string) => {
  return API_LIVE_PREFIX + `/${room}/${anchor}.flv`
}
