<template>
  <div>
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item ref="name" label="接口名称" name="api_authority_text">
        <a-input v-model:value="formState.api_authority_text" />
      </a-form-item>
      <a-form-item label="组件" name="接口地址">
        <a-input v-model:value="formState.api_authority_url" />
      </a-form-item>
      <a-form-item ref="name" label="请求方式" name="api_authority_method">
        <a-input v-model:value="formState.api_authority_method" />
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex'
import { ref, defineComponent, onMounted } from 'vue'
import { SettingsManageType } from '@/interface/model/settings'
import { useApiManageService } from '@/api/api'
export default defineComponent({
  name: 'ViewForm',
  setup() {
    const store = useStore()
    const apiManageService = useApiManageService()
    const formRef = ref()
    const formState = ref<SettingsManageType.ViewState>(new SettingsManageType.ApiState())
    const rules = {
      api_authority_text: [{ required: true, message: '请输入接口名称' }],
      api_authority_url: [{ required: true, message: '请输入接口地址' }],
      api_authority_method: [{ required: true, message: '请输入请求方式' }]
    }
    const getViewForm = async () => {
      const result = await apiManageService.detail(store.state.settings.id)
      formState.value = result.data
    }
    onMounted(() => {
      if (store.state.settings.id && store.state.settings.modelType == 'edit') {
        getViewForm()
      }
    })
    return {
      formRef,
      formState,
      rules
    }
  }
})
</script>
<style lang="less"></style>
