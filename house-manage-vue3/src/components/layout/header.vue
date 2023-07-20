<template>
  <a-layout-header>
    <div class="text-right pr15">
      <!-- <a-space>
        <a-tooltip class="theme-color-selector" v-for="color in colorList" :key="color.key">
          <template #title>{{ color.key }}</template>
          <a-tag :color="color.color" @click="changThemeColor(color.color)">
            <CheckOutlined v-if="color.color == primaryColor" />
          </a-tag>
        </a-tooltip>
        {{ themeType }}
        <a-switch checked-children="日" un-checked-children="夜" v-model:checked="themeType" @change="onThemeChange" />
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            <a-avatar>
              <template #icon>
                <UserOutlined v-if="!avatar" />
                <img :src="avatar" alt="" />
              </template>
            </a-avatar>
            <MenuIcon iconType="DownOutlined"></MenuIcon>
          </a>
          <template #overlay>
            <a-menu mode="vertical-right">
              <a-menu-item>
                <router-link to="/user/info">用户信息</router-link>
              </a-menu-item>
              <a-menu-item>
                <a-button type="link" @click="() => emit('onQuit')">退出</a-button>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-space> -->
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, ref } from 'vue'
// import { UserOutlined } from '@ant-design/icons-vue'
// import { darkThemeSwitch } from '@/utils/theme'
// import { colorList, updateTheme } from '@/theme/settingConfig'

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    // UserOutlined
  },
  setup(props, { emit }) {
    const store = useStore()
    const state = {
      primaryColor: ref(''),
      // colorList: ref(colorList),
      avatar: computed(() => store.state.user.userInfo.avatar)
    }
    const themeType = computed(() => store.state.app.themeType)
    const onThemeChange = (value: boolean) => {
      console.log(value)
      // store.commit({ type: 'app/UPDATE_THEME_TYPE', payload: value })
      // darkThemeSwitch(value)
    }
    // const changThemeColor = (color: string) => {
    //   state.primaryColor.value = color
    //   updateTheme(color)
    // }
    return {
      ...state,
      store,
      themeType,
      emit,
      onThemeChange
      // changThemeColor
    }
  }
})
</script>

<style lang="less" scoped>
a,
.ant-btn-link {
  color: #333 !important;
}
.ant-image img {
  height: 100% !important;
}
.theme-color-selector {
  display: block;
  width: 25px;
  height: 25px;
}
</style>
