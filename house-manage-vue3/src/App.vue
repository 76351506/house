<template>
  <Layout></Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '@/components/layout/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Layout
  }
})
</script>

<style lang="less">
@import url('~@/assets/css/reset.less');
@import url('~@/assets/css/common.less');
@import url('~@/assets/css/theme.less');
</style>
