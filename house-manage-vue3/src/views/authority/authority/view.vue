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
            视图：
            <a-select style="width: 120px" v-model:value="viewIdentity" placeholder="请选择视图权限">
              <a-select-option v-for="view in viewList" :key="view.view_authority_id" :value="view.view_authority_id">{{ view.view_authority_text }}</a-select-option>
            </a-select>
          </a-space>
        </a-col>
        <a-col>
          <a-space>
            <a-button @click="onSetViewAuthByIdentityId">设置视图权限</a-button>
          </a-space>
        </a-col>
      </a-row>
    </template>
    <template #default>
      <div>
        <a-row>
          <a-col :span="4">视图列表：</a-col>
          <a-col :span="20">
            <a-checkbox-group v-model:value="viewIdentityList">
              <a-row>
                <a-col v-for="view in viewList" :key="view.view_authority_id" :span="4">
                  <a-checkbox :key="view.view_authority_id" :value="view.view_authority_id">
                    <div v-text="view.view_authority_text"></div>
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-col>
        </a-row>
        <a-dirver></a-dirver>
        <a-row>
          <a-col :offset="4">
            <a-button @click="onSetViewAuthByIdentityList">给选择的身份设置视图权限列表</a-button>
          </a-col>
        </a-row>
      </div>
    </template>
  </LayoutPage>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useIdentityService } from '@/api/identity'
import { useAuthorityService } from '@/api/authority'
import { AuthorityManageType } from '@/interface/model/authority'
import { useViewManageService } from '@/api/view'
import { message } from 'ant-design-vue'
import LayoutPage from '@/components/layout/page.vue'

const identityService = useIdentityService()
const viewService = useViewManageService()
const authorityService = useAuthorityService()

// 选择的身份
const identity = ref<string>('')
// 视图列表
const viewList = ref<Array<AuthorityManageType.ViewState>>([])
// 身份列表
const identityList = ref<Array<AuthorityManageType.IdentityInterface>>()
// 配置身份对应的视图列表
const viewIdentityList = ref<any[]>()
// 配置身份对应的单个视图
const viewIdentity = ref<string>()

const getIdentityList = async () => {
  const result = await identityService.list()
  identityList.value = result.data
}
const getViewList = async () => {
  const result = await viewService.list()
  viewList.value = result.data
}
onMounted(() => {
  getIdentityList()
  getViewList()
})

const onChange = async () => {
  if (!identity.value) return message.error('请选择角色身份')
  const result = await authorityService.getViewAuthByIdentityId(identity.value)
  viewIdentityList.value = result.data.map(viewIdentity => {
    return viewIdentity.view_authority_id
  })
}
const onSetViewAuthByIdentityId = async () => {
  const params: AuthorityManageType.IdentityViewInterface = {
    identity_id: identity.value,
    view_authority_id: viewIdentity.value
  }
  const result = await authorityService.setViewAuthByIdentityId(params)
  console.log(result)
}
const onSetViewAuthByIdentityList = async () => {
  const params = {
    identity_id: identity.value,
    view_authority_ids: viewIdentityList.value
  }
  const result = await authorityService.setViewAuthByIdentityList(params)
  console.log(result)
}
</script>
<style lang="less"></style>
