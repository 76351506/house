import { createStore } from 'vuex'
import { CommonManageType } from '@/interface/model'
import { CommonStoreManageType } from '@/interface/store'

const createModule = (): CommonManageType.Data<CommonStoreManageType.CommmitInterface<string>> => {
  // 通过require.context获取目录下的ts文件集
  const context = require.context('./modules', false, /\.ts$/)
  const modules: CommonManageType.Data<CommonStoreManageType.CommmitInterface<string>> = {}
  // 获取文件集的[key1,key2,...keyn]遍历
  context.keys().forEach(key => {
    const moduleName: string = key.replace(/^\.\/(.*)\.\w+$/, '$1')
    const moduleContext = context(key).default
    modules[moduleName] = moduleContext
  })
  return modules
}

const store = createStore({
  strict: true,
  modules: createModule()
})
export default store
