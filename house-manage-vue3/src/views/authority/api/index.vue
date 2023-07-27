<template>
  <LayoutPage>
    <template #layout-page-search>
      <a-button @click="openModel('create', '新建')">添加</a-button>
    </template>
    <template #default>
      <div>
        <a-table :dataSource="viewList" :columns="columns" :pagination="false" :rowKey="(record:SettingsManageType.api_authority_id) => record.id">
          <template #action="{ text, record }">
            <span>
              <a @click="openModel('edit', '编辑', record.api_authority_id)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确认删除吗？" ok-text="确认" cancel-text="取消" @confirm="() => confirm(record.api_authority_id)" @cancel="cancel">
                <a href="#">删除</a>
              </a-popconfirm>
            </span>
          </template>
        </a-table>
        <a-modal destroyOnClose v-model:visible="visible" :title="title" @ok="handleOk">
          <ViewForm ref="formRef"></ViewForm>
        </a-modal>
      </div>
    </template>
  </LayoutPage>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import { useApiManageService } from '@/api/api'
import { AuthorityManageType } from '@/interface/model/authority'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { message } from 'ant-design-vue'
import LayoutPage from '@/components/layout/page.vue'
import ViewForm from './form.vue'

const columns = [
  {
    title: '接口名称',
    dataIndex: 'api_authority_text',
    key: 'api_authority_text'
  },
  {
    title: '接口地址',
    dataIndex: 'api_authority_url',
    key: 'api_authority_url'
  },
  {
    title: '请求方式',
    dataIndex: 'api_authority_method',
    key: 'api_authority_method'
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
]
const store = useStore()
const apiManageService = useApiManageService()
const formRef = ref()
const viewList = ref<Array<AuthorityManageType.ApiState>>()
const visible = ref<boolean>(false)
const title = computed(() => store.state.settings.modelTitle)
const modelType: ComputedRef<string> = computed(() => store.state.settings.modelType)

const openModel = (type: string, title: string, id: string) => {
  visible.value = true
  store.dispatch({ type: 'settings/SAVE_MODEL_TYPE', payload: type })
  store.dispatch({ type: 'settings/SAVE_MODEL_TITLE', payload: title })
  if (!id) return
  store.dispatch({ type: 'settings/SAVE_ID', payload: id })
}
const handleOk = () => {
  formRef.value.formRef
    .validate()
    .then(async () => {
      const result = modelType.value == 'create' ? await apiManageService.add(formRef.value.formState) : await apiManageService.edit(formRef.value.formState)
      if (result.code) {
        message.success(result.message as string, 1, () => {
          visible.value = false
          getApiList()
        })
      } else {
        message.error(result.message as string, 1, () => {
          visible.value = false
          formRef.value.formState = new AuthorityManageType.ApiState()
        })
      }
    })
    .catch((error: ValidateErrorEntity<AuthorityManageType.ApiState>) => {
      console.log('error', error)
    })
}
const getApiList = async () => {
  const result = await apiManageService.list()
  viewList.value = result.data
}

const confirm = async (id: string) => {
  const result = await apiManageService.delete(id)
  if (result.code) {
    message.success(result.message as string, 1, () => {
      getApiList()
    })
  } else {
    message.error(result.message as string, 1, () => {
      getApiList()
    })
  }
}

const cancel = (e: MouseEvent) => {
  message.error('Click on No')
}
onMounted(() => {
  getApiList()
})
</script>
<style lang="less"></style>
