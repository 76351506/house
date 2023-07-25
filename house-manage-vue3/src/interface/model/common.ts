/*
 * @Author: heinan
 * @Date: 2023-07-17 15:24:42
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-25 10:40:08
 */

export namespace CommonManageType {
  export interface Data<T> {
    [key: string]: T
  }
  // 分页参数
  export class PaginationParams {
    pagesize?: number = 20
    pagecount?: number = 1
  }
  export interface FileItem {
    uid: string
    name?: string
    status?: string
    response?: string
    url?: string
    type?: string
    size: number
    originFileObj: any
  }

  export interface FileInfo {
    file: FileItem | undefined
    fileList: FileItem[] | undefined
  }
  export interface CommonAxiosResponse<T> {
    code: number
    data: Array<T>
    msg?: string
    total?: number
    currentPage?: number
  }
}
