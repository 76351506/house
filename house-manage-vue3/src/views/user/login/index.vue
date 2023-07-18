<template>
  <div>this is login page</div>
</template>
<script lang="ts" setup>
import { useStore, mapGetters, mapState } from 'vuex'
import { ref, onMounted, watch, computed } from 'vue'
import { UserManageType } from '@/interface/model/user'
import { useUserService } from '@/api/user'

const store = useStore()
const userService = useUserService()
const formState = ref<UserManageType.LoginFormState>(new UserManageType.LoginFormState())
const login = async () => {
  const result = await userService.login(formState.value)
}
const token = computed(() => mapState(['user/token']))

onMounted(() => {
  console.log(243)
})
</script>
<style lang="less"></style>
