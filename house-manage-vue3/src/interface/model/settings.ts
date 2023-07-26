/*
 * @Author: heinan
 * @Date: 2023-07-25 10:53:02
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-25 16:49:54
 */

export namespace SettingsManageType {
  export class ViewState {
    view_authority_id?: string
    view_authority_text: string | undefined
    view_name: string | undefined
  }
  export class ApiState {
    api_authority_id?: string
    api_authority_text: string | undefined
    api_authority_url: string | undefined
    api_authority_method: string | undefined
  }
  export interface IdentityInterface {
    identity_id: string
    identity_text: string
  }
}
