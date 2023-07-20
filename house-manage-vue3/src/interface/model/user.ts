/*
 * @Author: heinan
 * @Date: 2023-07-18 15:04:46
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-19 21:43:21
 */

export namespace UserManageType {
  export interface LoginForm {
    username: string | undefined
    password: string | undefined
  }
  export class LoginFormState implements LoginForm {
    username: string | undefined
    password: string | undefined
  }
  export class IdentityState {
    identity_id: string | undefined
    identity_text: string | undefined
    identity_type: number | undefined
  }
  export class UserInfoState {
    uid?: string
    nickname: string | undefined
    graph: string | undefined
    avatar: string | undefined
    email: string | undefined
    mobile: string | undefined
  }
}
