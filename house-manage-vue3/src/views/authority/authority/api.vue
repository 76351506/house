<template>
  <LayoutPage>
    <template #layout-page-search>
      <a-row :gutter="24">
        <a-col>
          <a-space>
            身份：
            <a-select style="width: 120px" v-model:value="identity" placeholder="请选择身份" @change="onChange">
              <a-select-option value="">请选择</a-select-option>
              <a-select-option v-for="identity in identityList" :key="identity.identity_id" :value="identity.identity_id">{{ identity.identity_text }}</a-select-option>
            </a-select>
          </a-space>
        </a-col>
        <a-col>
          <a-space>
            接口：
            <a-select style="width: 120px" v-model:value="apiIdentity" placeholder="请选择视图权限">
              <a-select-option v-for="api in apiList" :key="api.api_authority_id" :value="api.api_authority_id">{{ api.api_authority_text }}</a-select-option>
            </a-select>
          </a-space>
        </a-col>
        <a-col>
          <a-space>
            <a-button @click="onSetViewAuthByIdentityId">给选择的身份设置视图权限</a-button>
          </a-space>
        </a-col>
      </a-row>
    </template>
    <template #default>
      <div>
        接口列表：
        <a-checkbox-group v-model:value="apiIdentityList">
          <a-space :gutter="24">
            <a-checkbox v-for="api in apiList" :key="api.api_authority_id" :span="4" :value="api.api_authority_id">
              <span v-text="api.api_authority_text"></span>
            </a-checkbox>
          </a-space>
        </a-checkbox-group>
      </div>
      <div>
        <a-button @click="onSetViewAuthByIdentityList">给选择的身份设置视图权限列表</a-button>
      </div>
    </template>
  </LayoutPage>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useIdentityService } from '@/api/identity'
import { useAuthorityService } from '@/api/authority'
import { AuthorityManageType } from '@/interface/model/authority'
import { useApiManageService } from '@/api/api'
import { message } from 'ant-design-vue'
import LayoutPage from '@/components/layout/page.vue'

const identityService = useIdentityService()
const apiService = useApiManageService()
const authorityService = useAuthorityService()

// 选择的身份
const identity = ref<string>('')
// 接口列表
const apiList = ref<Array<AuthorityManageType.ApiState>>([])
// 身份列表
const identityList = ref<Array<AuthorityManageType.IdentityInterface>>()
// 配置身份对应的视图列表
const apiIdentityList = ref<any[]>()
// 配置身份对应的单个视图
const apiIdentity = ref<string>()

const getIdentityList = async () => {
  const result = await identityService.list()
  identityList.value = result.data
}
const getApiList = async () => {
  const result = await apiService.list()
  apiList.value = result.data
}
onMounted(() => {
  getIdentityList()
  getApiList()
})

const onChange = async () => {
  if (!identity.value) return message.error('请选择角色身份')
  const result = await authorityService.getApiAuthByIdentityId(identity.value)
  apiIdentityList.value = result.data.map(apiIdentity => {
    return apiIdentity.api_authority_id
  })
}
const onSetViewAuthByIdentityId = async () => {
  const params: AuthorityManageType.IdentityApiInterface = {
    identity_id: identity.value,
    api_authority_id: apiIdentity.value
  }
  const result = await authorityService.setApiAuthByIdentityId(params)
  console.log(result)
}
const onSetViewAuthByIdentityList = async () => {
  const params: AuthorityManageType.IdentityApiListInterface = {
    identity_id: identity.value,
    api_authority_ids: apiIdentityList.value
  }
  const result = await authorityService.setApiAuthByIdentityList(params)
  console.log(result)
}
</script>
<style lang="less"></style>
