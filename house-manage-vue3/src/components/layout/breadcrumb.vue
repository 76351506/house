<template>
  <a-breadcrumb class="breadcrumb-wraper" :routes="routes">
    <template #itemRender="{ route }">
      <router-link :to="{ name: route.name }">
        {{ route.title }}
      </router-link>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const store = useStore()
    const routes = computed(() => store.state.app.breadcrumbMap)
    return {
      routes,
      store
    }
  }
})
</script>

<style lang="less">
.breadcrumb-wraper {
  padding: 16px !important;
  margin-top: 16px !important;
}
</style>
