/*
 * @Author: heinan
 * @Date: 2023-07-25 10:53:02
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 11:56:41
 */

export namespace AuthorityManageType {
  // 视图
  export class ViewState {
    view_authority_id?: string
    view_authority_text: string | undefined
    view_name: string | undefined
  }
  // 接口
  export class ApiState {
    api_authority_id?: string
    api_authority_text: string | undefined
    api_authority_url: string | undefined
    api_authority_method: string | undefined
  }
  // 身份
  export interface IdentityInterface {
    identity_id: string
    identity_text: string
  }
  // 身份对应视图权限
  export interface IdentityViewInterface {
    identity_id: string | undefined
    view_authority_id: string | undefined
  }
  // 身份对应视图权限列表
  export interface IdentityViewListInterface {
    identity_id: string | undefined
    view_authority_ids: string[] | undefined
  }
  // 身份对应接口权限
  export interface IdentityApiInterface {
    identity_id: string | undefined
    api_authority_id: string | undefined
  }
  // 身份对应接口权限列表
  export interface IdentityApiListInterface {
    identity_id: string | undefined
    api_authority_ids: string[] | undefined
  }
}
