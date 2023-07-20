/*
 * @Author: heinan
 * @Date: 2023-06-24 16:19:28
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-19 21:46:44
 */
import { StoreManageType } from '@/interface/store'
import { AppManageType } from '@/interface/model/app'
import { setStorage, getStorage } from '@/utils/common'

interface IAPPSTATE {
  loading: boolean
  breadcrumbMap: Array<AppManageType.BreadcrumbInterface>
  openKeys: Array<AppManageType.MenuItem>
  selectedKeys: Array<AppManageType.MenuItem>
  themeType: boolean
}

export default {
  namespaced: true,
  state: {
    loading: false,
    breadcrumbMap: [],
    openKeys: JSON.parse(getStorage('OPEN_KEYS') as string) || [],
    themeType: localStorage.getItem('THEME_TYPE') === null ? true : JSON.parse(getStorage('THEME_TYPE') as string)
  },
  mutations: {
    UPDATE_THEME_TYPE(state: IAPPSTATE, { payload }: StoreManageType.IPayload): void {
      state.themeType = payload
      console.log(typeof payload)
      setStorage('THEME_TYPE', payload)
    },
    UPDATE_SELECTED_KEYS(state: IAPPSTATE, { payload }: StoreManageType.IPayload): void {
      state.selectedKeys = payload
      setStorage('SELECTED_KEYS', JSON.stringify(payload))
    },
    UPDATE_OPEN_MENU_MAP(state: IAPPSTATE, { payload }: StoreManageType.IPayload): void {
      state.openKeys = payload
      setStorage('OPEN_KEYS', JSON.stringify(payload))
    },
    SET_BREADCRUMB_MAP(state: IAPPSTATE, { payload }: StoreManageType.IPayload): void {
      state.breadcrumbMap = payload
    },
    UPDATE_LOAD(state: IAPPSTATE, { payload }: StoreManageType.IPayload) {
      state.loading = payload
    }
  }
}
