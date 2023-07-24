/*
 * @Author: heinan
 * @Date: 2023-07-24 16:36:18
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 17:46:49
 */

export namespace AuditManageType {
  export class PaginationParams {
    pageSize: number = 10
    currentPage: number = 1
    total: number | undefined
  }
  export class FormState extends PaginationParams {
    id: string | undefined
    province: string | undefined
    city: string | undefined
    county: string | undefined
    title: string | undefined
    state: string | undefined
  }
}
