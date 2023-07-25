<template>
  <div class="page-wraper">
    <div class="layout-page-search">
      <slot name="layout-page-search"></slot>
    </div>

    <slot></slot>
    <div class="layout-page-pagination">
      <slot name="layout-page-pagination"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less">
.page-wraper {
  background-color: #dec;
  .layout-page-search {
    background-color: #fff;
    padding: 16px;
    margin-bottom: 16px;
  }
  .layout-page-pagination {
    margin-top: 16px;
    padding: 16px;
    background-color: #fff;
    & > ul {
      text-align: right;
    }
  }
}
</style>
