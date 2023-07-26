<template>
  <LayoutPage>
    <template #layout-page-search>
      <a-button @click="openModel('create', '新建')">添加</a-button>
    </template>
    <template #default>
      <div>
        <a-table :dataSource="viewList" :columns="columns" :pagination="false" :rowKey="(record:SettingsManageType.view_authority_id) => record.id">
          <template #action="{ text, record }">
            <span>
              <a @click="openModel('edit', '编辑', record.view_authority_id)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确认删除吗？" ok-text="确认" cancel-text="取消" @confirm="() => confirm(record.view_authority_id)" @cancel="cancel">
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
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useViewManageService } from '@/api/view'
import { SettingsManageType } from '@/interface/model/settings'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { message } from 'ant-design-vue'
import LayoutPage from '@/components/layout/page.vue'
import ViewForm from './form.vue'

const columns = [
  {
    title: '视图',
    dataIndex: 'view_authority_text',
    key: 'view_authority_text'
  },
  {
    title: '组件',
    dataIndex: 'view_name',
    key: 'view_name'
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
]
const store = useStore()
const viewManageService = useViewManageService()
const formRef = ref()
const viewList = ref<Array<SettingsManageType.ViewState>>([])
const visible = ref<boolean>(false)
const title = computed(() => store.state.settings.modelTitle)

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
      const result = store.state.settings.type == 'create' ? await viewManageService.add(formRef.value.formState) : await viewManageService.edit(formRef.value.formState)
      if (result.code) {
        message.success(result.message, 1, () => {
          visible.value = false
          getViewList()
        })
      } else {
        message.error(result.message, 1, () => {
          visible.value = false
          formRef.value.formState = SettingsManageType.ViewState()
        })
      }
    })
    .catch((error: ValidateErrorEntity<SettingsManageType.viewForm>) => {
      console.log('error', error)
    })
}
const getViewList = async () => {
  const result = await viewManageService.list()
  viewList.value = result.data
}

const confirm = async (id: string) => {
  const result = await viewManageService.delete(id)
  if (result.code) {
    message.success(result.message, 1, () => {
      getViewList()
    })
  } else {
    message.error(result.message, 1, () => {
      getViewList()
    })
  }
}

const cancel = (e: MouseEvent) => {
  console.log(e)
  message.error('Click on No')
}
onMounted(() => {
  getViewList()
})
</script>
<style lang="less"></style>
