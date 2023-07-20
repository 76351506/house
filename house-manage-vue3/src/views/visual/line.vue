<template>
  <div ref="lineRef" class="line">折线路由</div>
</template>

<script lang="ts">
import * as echarts from 'echarts/core'
import { GridComponent, GridComponentOption } from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { defineComponent, onMounted, ref } from 'vue'

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition])
type EChartsOption = echarts.ComposeOption<GridComponentOption | LineSeriesOption>

export default defineComponent({
  name: 'VisualLineCharts',
  setup() {
    const state = {
      lineRef: ref(),
      lineCharts: ref()
    }
    const init = () => {
      state.lineCharts.value = echarts.init(state.lineRef.value as HTMLElement)
      const option: EChartsOption = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      }
      state.lineCharts.value.setOption(option)
    }
    onMounted(() => {
      init()
    })
    return {
      ...state
    }
  }
})
</script>
<style lang="less" scoped>
.line {
  height: 500px;
  width: 500px;
  background-color: #fff;
}
</style>
