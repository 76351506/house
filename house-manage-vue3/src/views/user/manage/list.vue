<template>
  <a-table :columns="columns" :data-source="userList" :rowKey="record => record.uid">
    <template #avatar="{ text }">
      <a-image :width="30" :src="text" />
    </template>
    <template #action>
      <span>
        <a>修改密码</a>
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
  name: 'UserList',
  setup() {
    const userService = useUserService()
    const state = {
      columns: [
        {
          title: '昵称',
          dataIndex: 'nickname',
          key: 'nickname'
        },

        {
          title: '头像',
          dataIndex: 'avatar',
          key: 'avatar',
          slots: { customRender: 'avatar' }
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile'
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: '口号',
          dataIndex: 'graph',
          key: 'graph'
        },
        {
          title: '操作',
          key: 'action',
          slots: { customRender: 'action' }
        }
      ],
      userList: ref<Array<UserManageType.UserInfoState>>([])
    }
    const getUsreList = async (): Promise<void> => {
      const result = await userService.getUserList({
        pagesize: 10,
        pagecount: 1
      })
      state.userList.value = result.data
    }
    onMounted(() => {
      getUsreList()
    })
    return {
      ...state
    }
  }
})
</script>

<style></style>
