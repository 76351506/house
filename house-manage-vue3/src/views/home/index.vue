<template>
  <LayoutPage>
    <template #layout-page-search>
      <a-form ref="formRef" layout="inline" :model="formState">
        <a-form-item>
          <a-input v-model:value="formState.province" placeholder="请选择省份" />
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="formState.city" placeholder="请选择城市" />
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="formState.county" placeholder="请选择区/县" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSubmit">搜索</a-button>
          <a-button style="margin-left: 10px" @click="onReset">重置</a-button>
        </a-form-item>
      </a-form>
    </template>
    <a-table :dataSource="auditList" :columns="columns" :pagination="false" :rowKey="(record:AuditManageType.FormState) => record.id">
      <template #address="{ record }">
        <span>{{ record.province }}-{{ record.city }}-{{ record.county }}</span>
      </template>
      <template #createTime="{ text }">
        <span v-if="text == '0000-00-00 00:00:00'">-</span>
        <span v-else-if="text == null">-</span>
        <span v-else>{{ text }}</span>
      </template>
      <template #updateTime="{ text }">
        <span v-if="text == '0000-00-00 00:00:00'">-</span>
        <span v-else-if="text == null">-</span>
        <span v-else>{{ text }}</span>
      </template>
      <template #action="{ recoed }">
        <span>
          <a>删除</a>
          <a-divider type="vertical" />
          <a @click="onEdit(recoed.id)">编辑</a>
          <a-divider type="vertical" />
          <a>修改</a>
        </span>
      </template>
    </a-table>
    <template #layout-page-pagination>
      <a-pagination v-model:current="formState.currentPage" :total="formState.total" show-less-items @change="onChange" />
    </template>
  </LayoutPage>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useAuditManageService } from '@/api/audit'
import { AuditManageType } from '@/interface/model/audit'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import LayoutPage from '@/components/layout/page.vue'

const auditManageService = useAuditManageService()
const formRef = ref()
const formState = ref<AuditManageType.FormState>(new AuditManageType.FormState())
const auditList = ref<Array<AuditManageType.FormState>>()
const columns = [
  {
    title: '楼盘名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '详细地址',
    key: 'address',
    slots: { customRender: 'address' }
  },
  {
    title: '价格',
    dataIndex: 'total_prices',
    key: 'total_prices'
  },
  {
    title: '创建时间',
    dataIndex: 'creat_time',
    key: 'creat_time',
    slots: { customRender: 'createTime' }
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
    slots: { customRender: 'updateTime' }
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state'
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' }
  }
]

const getAuditList = async () => {
  const result = await auditManageService.list(formState.value)
  auditList.value = result.data
  formState.value.currentPage = result.currentPage
  formState.value.total = result.total
}
onMounted(() => {
  getAuditList()
})
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      getAuditList()
    })
    .catch((error: ValidateErrorEntity<AuditManageType.FormState>) => {
      console.log('error', error)
    })
}
const onReset = () => {
  formState.value = new AuditManageType.FormState()
  getAuditList()
}

const onChange = (current: number, pageSize: number) => {
  formState.value.currentPage = current
  formState.value.pageSize = pageSize
  getAuditList()
}
const onEdit = (id: string) => {
  console.log(id)
}
</script>
<style lang="less"></style>
