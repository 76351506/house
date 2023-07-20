<template>
  <div v-if="route.path == '/user/login' || route.path == '/user/registry'">
    <router-view />
  </div>
  <a-layout style="min-height: 100vh" v-else :class="themeType ? 'theme-light' : 'theme-dark'">
    <a-layout-sider v-model:collapsed="collapsed">
      <div class="logo">
        <img :src="require('@/assets/images/logo.png')" alt="" srcset="" />
      </div>
      <div :class="!collapsed ? 'slider-collapsed' : 'slider-collapsed small'">
        <MenuUnfoldOutlined @click="onCollapsed" style="font-size: 18px" />
      </div>
      <LayoutSider></LayoutSider>
    </a-layout-sider>
    <a-layout>
      <LayoutHeader @onQuit="onSignOut"></LayoutHeader>
      <a-layout-content style="margin: 0 16px">
        <Breadcrumb></Breadcrumb>
        <a-divider />
        <div :style="{ marginTop: '16px', padding: '24px', minHeight: '360px' }">
          <a-spin :spinning="loading" size="large">
            <router-view />
          </a-spin>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">Beijing BaWei University Wangzhan Colleage ©2023 Created by heinan</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import LayoutSider from '@/components/layout/sider.vue'
import LayoutHeader from './header.vue'
import Breadcrumb from './breadcrumb.vue'
import { useUserService } from '@/api/user'
import { getStorage } from '@/utils/common'
import { MenuUnfoldOutlined } from '@ant-design/icons-vue'
// import { darkThemeSwitch } from '@/utils/theme'

export default defineComponent({
  name: 'Layout',
  components: {
    Breadcrumb,
    LayoutSider,
    LayoutHeader,
    MenuUnfoldOutlined
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const userService = useUserService()
    const state = {
      loading: computed(() => store.state.app.loading),
      collapsed: ref<boolean>(false),
      themeType: computed(() => store.state.app.themeType)
    }
    const onSignOut = () => {
      store.dispatch({ type: 'user/RESET_TOKEN' })
      router.push('/user/login')
    }
    const init = async () => {
      // if (getStorage('uid') == null || getStorage('uid') == '') return
      // const userInfo = await userService.getUserInfoById({ uid: store.state.user.uid })
      // store.commit({ type: 'user/UPDATE_USER_INFO', payload: userInfo.data })
      // darkThemeSwitch(state.themeType.value)
    }
    const onCollapsed = () => {
      state.collapsed.value = !state.collapsed.value
    }
    onMounted(() => {
      init()
    })
    return {
      ...state,
      route,
      onSignOut,
      onCollapsed
    }
  }
})
</script>

<style lang="less">
.layout-wraper {
  width: 100%;
  height: 100%;
  min-height: 100vh !important;
}
.logo {
  padding: 16px;
  & > img {
    height: 85%;
    width: 100%;
  }
}

.theme-dark {
  .ant-layout-sider,
  .ant-layout-header {
    background-color: none;
  }
}
.theme-light {
  .ant-layout-sider,
  .ant-layout-header {
    background-color: #fff;
  }
}
.slider-collapsed {
  text-align: left;
  padding-left: 16px;
  &.small {
    text-align: center;
    padding-left: 0;
  }
}
</style>
