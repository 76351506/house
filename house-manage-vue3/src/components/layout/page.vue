<template>
  <div class="page-wraper">
    <div class="layout-page-search">
      <slot name="layout-page-search"></slot>
    </div>

    <div class="layout-page-content">
      <slot></slot>
    </div>
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
  .layout-page-content {
    background-color: #fff;
    padding: 16px;
  }
  .layout-page-pagination {
    margin-top: 16px;
    background-color: #fff;
    & > ul {
      padding: 16px;
      text-align: right;
    }
  }
}
</style>
