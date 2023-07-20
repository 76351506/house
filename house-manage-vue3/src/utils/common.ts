/*
 * @Author: heinan
 * @Date: 2023-06-20 11:35:35
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-04 23:07:45
 */
import { BASE_URL } from '@/config/common'
import { AppManageType } from '@/interface/model/app'

// 接收一个url地址返回完整的请求接口地址
// BASE_URL可以针对多个开发人员及环境动态判断修改请求接口的前缀
export const resolveUrl = (url: string): string => {
  return BASE_URL + url
}

export const getStorage = (key: string) => {
  return localStorage.getItem(key)
}
export const setStorage = (key: string, value: any) => {
  return localStorage.setItem(key, value)
}

export const isLogin = (): boolean => {
  return getStorage('token') ? true : false
}

export const signOut = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('uid')
  localStorage.removeItem('OPEN_KEYS')
  localStorage.removeItem('userInfo')
  localStorage.removeItem('THEME_TYPE')
}

export const getParentKeyMap = (menuItem: AppManageType.MenuItem, breadcrumbMap: Array<AppManageType.BreadcrumbInterface>, parentName = ''): void => {
  const { name, title } = menuItem
  breadcrumbMap.push({
    name,
    title,
    parentName,
    params: ''
  })
  // 如果超过两层递归
  // menuItem.children?.forEach(_menuItem => {
  //   getParentKeyMap(_menuItem, breadcrumbMap, name)
  // })
}

export const createBreadcrumbMap = (menuList: Array<AppManageType.MenuItemForSider>): Array<AppManageType.BreadcrumbInterface> => {
  const breadcrumbMap: Array<AppManageType.BreadcrumbInterface> = []
  menuList.forEach(menuItem => {
    //  排除头部菜单
    menuItem.children?.forEach(item => {
      getParentKeyMap(item, breadcrumbMap)
    })
  })
  return breadcrumbMap
}
