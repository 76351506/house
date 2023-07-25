<template>
  <div>
    <a-form ref="formRef" :model="formState" :rules="rules">
      <a-form-item ref="name" label="视图" name="view_authority_text">
        <a-input v-model:value="formState.view_authority_text" />
      </a-form-item>
      <a-form-item label="组件" name="view_name">
        <a-input v-model:value="formState.view_name" />
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import { SettingsManageType } from '@/interface/model/settings'

export default defineComponent({
  name: 'ViewForm',
  setup() {
    const formRef = ref()
    const formState = ref<SettingsManageType.ViewState>(new SettingsManageType.ViewState())
    const rules = {
      view_authority_text: [{ required: true, message: '请输入视图' }],
      view_name: [{ required: true, message: '请输入组件名称' }]
    }
    return {
      formRef,
      formState,
      rules
    }
  }
})
</script>
<style lang="less"></style>
