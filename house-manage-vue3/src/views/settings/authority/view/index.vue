<template>
  <LayoutPage>
    <template #layout-page-search>
      <a-button @click="openModel(true)">添加</a-button>
    </template>
    <template #default>
      <div>
        <a-table :dataSource="viewList" :columns="columns" :pagination="false" :rowKey="(record:SettingsManageType.view_authority_id) => record.id">
          <template #action="{ text, recoed }">
            <span>
              <a>删除</a>
              <a-divider type="vertical" />
              <a>编辑</a>
              <a-divider type="vertical" />
              <a>修改</a>
            </span>
          </template>
        </a-table>
        <a-modal destroyOnClose v-model:visible="visible" @ok="handleOk">
          <ViewForm ref="formRef"></ViewForm>
        </a-modal>
      </div>
    </template>
  </LayoutPage>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useSettingsManageService } from '@/api/settings'
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
const settingsManageService = useSettingsManageService()
const formRef = ref()
const viewList = ref<Array<SettingsManageType.ViewState>>([])
const visible = ref<boolean>(false)

const openModel = (flag: boolean) => {
  visible.value = flag
}
const handleOk = () => {
  formRef.value.formRef
    .validate()
    .then(async () => {
      const result = await settingsManageService.add(formRef.value.formState)
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
  const result = await settingsManageService.list()
  viewList.value = result.data
}

onMounted(() => {
  getViewList()
})
</script>
<style lang="less"></style>
