<template>
  <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
    <a-form-item name="nickname" label="昵称">
      <a-input placeholder="请输入用户昵称" v-model:value="formState.nickname" />
    </a-form-item>
    <a-form-item name="avatar" label="图片">
      <a-upload v-model:file-list="fileList" :show-upload-list="false" name="avatar" list-type="picture-card" :before-upload="beforeUpload" class="avatar-uploader" @change="handleChange">
        <a-image v-if="formState.avatar" style="width: 50px" :src="formState.avatar" />
        <div v-else>
          <MenuIcon v-if="loading" iconType="LoadingOutlined"></MenuIcon>
          <MenuIcon v-else iconType="PlusOutlined"></MenuIcon>
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item name="mobile" label="手机号">
      <a-input placeholder="请输入用户名" v-model:value="formState.mobile" />
    </a-form-item>
    <a-form-item name="email" label="邮箱">
      <a-input placeholder="请输入邮箱" v-model:value="formState.email" />
    </a-form-item>
    <a-form-item name="graph" label="口号">
      <a-textarea :row="4" placeholder="请输入口号" v-model:value="formState.graph" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
      <a-space>
        <a-button block type="primary" @click="onSubmit">更新</a-button>
        <a-button block type="primary" @click="onReset">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useUserService } from '@/api/user'
import { UserManageType } from '@/interface/model/user'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { message } from 'ant-design-vue'

export default defineComponent({
  name: 'UserInfo',
  setup() {
    const userService = useUserService()
    const store = useStore()
    const state = {
      formRef: ref(),
      formState: ref<UserManageType.UserInfoState>(new UserManageType.UserInfoState()),
      fileList: ref([]),
      loading: ref<boolean>(false),
      rules: {},
      labelCol: { span: 4 },
      wrapperCol: { span: 12 }
    }
    const beforeUpload = () => {
      return false
    }
    // 上传文件的回调
    const handleChange = async (info: { file: File }) => {
      const formData = new FormData()
      formData.append('file', info.file)
      const result = await userService.upload(formData, store.state.user.uid)
      // 表单项中参数不同导致表单校验不通过的，可以通过手动维护
      state.formState.value.avatar = result.imgurl
      state.formRef.value.clearValidate('img')
    }
    const onSubmit = () => {
      state.formRef.value
        .validate()
        .then(async (): Promise<void> => {
          const result = await userService.updateUser(state.formState.value)
          // 成功失败都从服务端重新获取用户信息
          if (result.code) {
            message.success(result.msg, 1, getUserInfo)
          } else {
            message.error(result.msg, 1, getUserInfo)
          }
        })
        .catch((error: ValidateErrorEntity<UserManageType.LoginFormState>) => {
          console.error(error)
        })
    }
    const getUserInfo = async () => {
      // 获取用户信息入库
      const userInfo = await userService.getUserInfoById({ uid: store.state.user.uid })
      state.formState.value = userInfo.data
      store.dispatch({ type: 'user/SAVE_USER_INFO', payload: userInfo.data })
    }
    const onReset = () => {
      // 将状态管理中的值在赋值一次
      state.formState.value = store.state.user.userInfo
    }
    onMounted(() => {
      getUserInfo()
    })
    return {
      ...state,
      onSubmit,
      onReset,
      beforeUpload,
      handleChange
    }
  }
})
</script>

<style></style>
