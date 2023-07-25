/*
 * @Author: heinan
 * @Date: 2023-07-25 15:59:15
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-25 16:52:52
 */

import { StoreManageType } from '@/interface/store'

interface ISettingsState {
  modelType: string
  modelTitle: string
  id: string
}
export default {
  namespaced: true,
  state: {
    modelType: '',
    modelTitle: '',
    id: ''
  },
  mutations: {
    SAVE_MODEL_TYPE: (state: ISettingsState, payload: string): void => {
      state.modelType = payload
    },
    SAVE_MODEL_TITLE: (state: ISettingsState, payload: string): void => {
      state.modelTitle = payload
    },
    SAVE_ID: (state: ISettingsState, payload: string): void => {
      state.id = payload
    }
  },
  actions: {
    SAVE_MODEL_TYPE({ commit }: StoreManageType.CommitInterface<StoreManageType.IPayload>, { payload }: StoreManageType.IPayload) {
      commit('SAVE_MODEL_TYPE', payload)
    },
    SAVE_MODEL_TITLE({ commit }: StoreManageType.CommitInterface<StoreManageType.IPayload>, { payload }: StoreManageType.IPayload) {
      commit('SAVE_MODEL_TITLE', payload)
    },
    SAVE_ID({ commit }: StoreManageType.CommitInterface<StoreManageType.IPayload>, { payload }: StoreManageType.IPayload) {
      commit('SAVE_ID', payload)
    }
  }
}
