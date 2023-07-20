<template>
  <a-table :columns="columns" :data-source="identityList" :rowKey="record => record.identity_id">
    <template #action>
      <span>
        <a>编辑</a>
        <a-divider type="vertical" />
        <a>删除</a>
      </span>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useUserService } from '@/api/user'
import { UserManageType } from '@/interface/model/user'

export default defineComponent({
  name: 'UserIdentity',
  setup() {
    const userService = useUserService()
    const state = {
      columns: [
        {
          title: '身份id',
          dataIndex: 'identity_id',
          key: 'identity_id'
        },
        {
          title: '身份权限',
          dataIndex: 'identity_text',
          key: 'identity_text'
        },
        {
          title: '操作',
          key: 'action',
          slots: { customRender: 'action' }
        }
      ],
      identityList: ref<Array<UserManageType.IdentityState>>([])
    }
    const getIdentityList = async (): Promise<void> => {
      const result = await userService.getIdentityList()
      state.identityList.value = result.data
    }
    onMounted(() => {
      getIdentityList()
    })
    return {
      ...state
    }
  }
})
</script>

<style></style>
