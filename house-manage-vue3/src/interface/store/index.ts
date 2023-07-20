/*
 * @Author: heinan
 * @Date: 2023-07-17 15:23:43
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-19 21:48:58
 */

export namespace StoreManageType {
  //	store的commit范型
  export interface CommitInterface<T> {
    commit: (type: string, value: unknown) => void
    state: T
  }
  // store的IPayload类型
  export interface IPayload {
    type: string
    payload?: any
  }
}
