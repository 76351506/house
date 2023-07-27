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
import { useStore } from 'vuex'
import { ref, defineComponent, onMounted } from 'vue'
import { AuthorityManageType } from '@/interface/model/authority'
import { useViewManageService } from '@/api/view'
export default defineComponent({
  name: 'ViewForm',
  setup() {
    const store = useStore()
    const viewManageService = useViewManageService()
    const formRef = ref()
    const formState = ref<AuthorityManageType.ViewState>(new AuthorityManageType.ViewState())
    const rules = {
      view_authority_text: [{ required: true, message: '请输入视图' }],
      view_name: [{ required: true, message: '请输入组件名称' }]
    }
    const getViewForm = async () => {
      const result = await viewManageService.detail(store.state.settings.id)
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
