import * as Vue from 'vue'
import Antd from 'ant-design-vue'
import { Axios } from 'axios'
import { TinyMCE } from 'tinymce'
import { ModalFunc } from 'ant-design-vue/es/modal/Modal'
import { MessageApi } from 'ant-design-vue/es/message'
import { JSEncrypt } from 'jsencrypt'

declare global {
  interface Window {
    antd: typeof Antd & {
      locales: any
      Modal: {
        readonly info: ModalFunc
        readonly success: ModalFunc
        readonly error: ModalFunc
        readonly warn: ModalFunc
        readonly warning: ModalFunc
        readonly confirm: ModalFunc
        readonly destroyAll: () => void
      }
      message: MessageApi
    }
    JSEncrypt: typeof JSEncrypt
    vue: typeof Vue
    axios: Axios
    tinymce: TinyMCE
  }
}
