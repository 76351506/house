/*
 * @Author: heinan
 * @Date: 2023-07-18 15:04:46
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-18 15:16:55
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
}
