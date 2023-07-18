/*
 * @Author: heinan
 * @Date: 2023-07-17 15:23:43
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-17 15:25:26
 */

export namespace CommonStoreManageType {
  export interface CommmitInterface<T> {
    commit: (type: string, value: unknown) => void
    state: T
  }
}
