/*
 * @Author: heinan
 * @Date: 2023-06-27 20:26:02
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-01 19:09:11
 */

export namespace AppManageType {
  // 面包屑
  export interface BreadcrumbInterface {
    name?: string
    title: string
    parentName: string
    params?: string
  }
  // 子菜单项
  export interface MenuItem {
    key: string
    name?: string
    title: string
    icon?: string
  }
  // menu菜单项,可以没有name
  export interface MenuItemForSider extends MenuItem {
    icon?: string
    children?: Array<MenuItemForSider> | undefined
  }
}
