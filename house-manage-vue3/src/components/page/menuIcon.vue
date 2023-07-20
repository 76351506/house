<template>
  <UserOutlined v-if="iconType === 'UserOutlined'" :style="style" />
  <CheckOutlined v-else-if="iconType === 'CheckOutlined'" :style="style" />
  <PlusOutlined v-else-if="iconType === 'PlusOutlined'" :style="style" />
  <ShareAltOutlined v-else-if="iconType === 'ShareAltOutlined'" :style="style" />
  <FilterOutlined v-else-if="iconType === 'FilterOutlined'" :style="style" />
  <PictureOutlined v-else-if="iconType === 'PictureOutlined'" :style="style" />
  <AppstoreOutlined v-else-if="iconType === 'AppstoreOutlined'" :style="style" />
  <BarsOutlined v-else-if="iconType === 'BarsOutlined'" :style="style" />
  <ShopOutlined v-else-if="iconType === 'ShopOutlined'" :style="style" />
  <LoadingOutlined v-else-if="iconType === 'LoadingOutlined'" :style="style" />
  <DownOutlined v-else-if="iconType === 'DownOutlined'" :style="style" />
  <BranchesOutlined v-else-if="iconType === 'BranchesOutlined'" :style="style" />
  <IdcardOutlined v-else-if="iconType === 'IdcardOutlined'" :style="style" />
  <PieChartOutlined v-else-if="iconType === 'PieChartOutlined'" :style="style" />
  <BarChartOutlined v-else-if="iconType === 'BarChartOutlined'" :style="style" />
  <LineChartOutlined v-else-if="iconType === 'LineChartOutlined'" :style="style" />
  <DeploymentUnitOutlined v-else-if="iconType === 'DeploymentUnitOutlined'" :style="style" />
</template>

<script lang="ts">
import {
  UserOutlined,
  CheckOutlined,
  DownOutlined,
  PlusOutlined,
  ShareAltOutlined,
  FilterOutlined,
  PictureOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ShopOutlined,
  LoadingOutlined,
  BranchesOutlined,
  IdcardOutlined,
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  DeploymentUnitOutlined
} from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MenuIcon',
  components: {
    DownOutlined,
    LoadingOutlined,
    ShopOutlined,
    BarsOutlined,
    AppstoreOutlined,
    PictureOutlined,
    FilterOutlined,
    UserOutlined,
    CheckOutlined,
    PlusOutlined,
    ShareAltOutlined,
    BranchesOutlined,
    IdcardOutlined,
    PieChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
    DeploymentUnitOutlined
  },
  props: {
    iconType: {
      type: String,
      require: true
    },
    style: {
      type: Object
    }
  }
})
</script>

<style></style>
