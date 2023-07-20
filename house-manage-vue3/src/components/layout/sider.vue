<template>
  <a-menu :openKeys="openKeys" mode="inline">
    <!-- 自行遍历组件 -->
    <!-- <a-sub-menu un-checked-children="Light" v-for="menu in menuConfig" :key="menu.key">
      <template #title>
        <a-space>
          <MenuIcon :iconType="menu.icon"/>
          {{ menu.title }}
        </a-space>
      </template>
      <div v-if="menu.children">
        <a-menu-item v-for="subMenu in menu.children" :key="subMenu.name" @click="setOpenKeys(subMenu)">
          <router-link :to="{ name: subMenu.name }">
            {{ subMenu.title }}
          </router-link>
        </a-menu-item>
      </div>
    </a-sub-menu> -->

    <!-- 使用ant-desing-vue提供的方式遍历菜单-->
    <!-- webpack需要开启 runtimeCompiler配置 -->
    <template v-for="item in menuConfig" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key" @click="setOpenKeys(item)">
          <template #icon>
            <MenuIcon :iconType="item.icon"></MenuIcon>
          </template>
          {{ item.title }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.key" @click="onFirstMenuClick(item)" />
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { computed, defineComponent, ref, toRefs } from 'vue'
import MenuIcon from '@/components/page/menuIcon.vue'
import MenuConfig from '@/config/common/menu'
import { AppManageType } from '@/interface/model/app'

const subMenu = {
  name: 'SubMenu',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const store = useStore()
    const state = {
      menuConfig: ref<Array<AppManageType.MenuItemForSider>>(MenuConfig),
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4'],
      openKeys: computed(() => store.state.app.openKeys)
    }
    const menuTravel = (name: string, rootMenu: Array<AppManageType.MenuItemForSider>) => {
      if (rootMenu.length == 0) return
      if (rootMenu.length == 1) return rootMenu[0].key
      const openParent = []
      for (let j = 0; j < rootMenu.length; j++) {
        const current = rootMenu[j]
        if (!current.children) return
        for (let k = 0; k < current.children?.length; k++) {
          if (current.children[k].name == name) {
            openParent.push(current)
          }
        }
      }
      return openParent.length ? openParent[0].key : []
    }
    const setOpenKeys = (menu: any) => {
      const openParent = menuTravel(menu.name, state.menuConfig.value)
      store.commit({ type: 'app/UPDATE_OPEN_MENU_MAP', payload: [openParent] })
    }
    return {
      ...state,
      setOpenKeys
    }
  },
  template: `
    <a-sub-menu :key="menuInfo.key">
      <template #icon><MenuIcon :iconType="menuInfo.icon"></MenuIcon></template>
      <template #title>{{ menuInfo.title }}</template>
      <template v-for="item in menuInfo.children" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key" @click="setOpenKeys(item)">
            <template #icon>
              <MenuIcon :iconType="item.icon"/>
            </template>
            <router-link :to="{ name: item.name }">
              {{ item.title }}
            </router-link>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
      </template>
    </a-sub-menu>
  `,
  components: {
    MenuIcon
  }
}
export default defineComponent({
  name: 'LayoutSider',
  components: {
    MenuIcon,
    'sub-menu': subMenu
  },
  setup() {
    const store = useStore()
    const state = {
      menuConfig: ref<Array<AppManageType.MenuItemForSider>>(MenuConfig),
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4'],
      openKeys: computed(() => store.state.app.openKeys)
    }
    // 遍历menu-config找到顶层menu菜单的那个key
    const menuTravel = (name: string, rootMenu: Array<AppManageType.MenuItemForSider>) => {
      if (rootMenu.length == 0) return
      if (rootMenu.length == 1) return rootMenu[0].key
      const openParent = []
      for (let j = 0; j < rootMenu.length; j++) {
        const current = rootMenu[j]
        if (!current.children) return
        for (let k = 0; k < current.children?.length; k++) {
          if (current.children[k].name == name) {
            openParent.push(current)
          }
        }
      }
      return openParent.length ? openParent[0].key : []
    }
    // 结合状态管理完成slide-menu菜单单开功能
    const setOpenKeys = (menu: any) => {
      const openParent = menuTravel(menu.name, state.menuConfig.value)
      store.commit({ type: 'app/UPDATE_OPEN_MENU_MAP', payload: [openParent] })
    }
    const onFirstMenuClick = (current: any) => {
      if (!state.openKeys.value.includes(current.key)) {
        store.commit({ type: 'app/UPDATE_OPEN_MENU_MAP', payload: [current.key] })
      }
    }
    return {
      ...state,
      setOpenKeys,
      onFirstMenuClick
    }
  }
})
</script>

<style lang="less"></style>
