<template>
  <div class="login-wraper">
    <div class="login-head">登录</div>
    <div class="login-body">
      <a-form ref="formRef" :model="formState" :rules="rules">
        <a-form-item ref="username" name="username">
          <a-input autocomplete="off" placeholder="请输入用户名" v-model:value="formState.username">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item ref="password" name="password">
          <a-input autocomplete="off" type="password" placeholder="请输入密码" v-model:value="formState.password">
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button block type="primary" @click="onSubmit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineComponent, computed, toRaw } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useUserService } from '@/api/user'
import { UserManageType } from '@/interface/model/user'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { getStorage } from '@/utils/common'

const store = useStore()
const route = useRoute()
const userService = useUserService()
const formRef = ref()
const formState = ref<UserManageType.LoginFormState>(new UserManageType.LoginFormState())
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
  password: [{ required: true, message: '请输入用密码', trigger: 'change' }]
}
const token = computed(() => {
  return store.state.user.token
})

const onSubmit = async (): Promise<void> => {
  formRef.value
    .validate()
    .then(async (): Promise<void> => {
      const result = await userService.login(toRaw(formState.value))
      if (!result.code) return message.error(result.msg)
      store.dispatch({ type: 'user/SAVE_USER_TOKEN', payload: result.token })
      const user = await userService.getUserIdByToken(getStorage('token') as string)
      store.commit({ type: 'user/SAVE_UID', payload: user.uid })
      if (!route.query.redirect) {
        window.location.href = '/'
      } else {
        window.location.href = `${decodeURIComponent(route.query.redirect as string)}`
      }
    })
    .catch((error: ValidateErrorEntity<UserManageType.LoginFormState>) => {
      console.error(error)
    })
}
</script>

<style lang="less">
.login-wraper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 350px;
  height: 350px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
  & > .login-head {
    height: 100px;
  }
}
</style>
