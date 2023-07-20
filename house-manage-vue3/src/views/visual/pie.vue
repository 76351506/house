<template>
  <div ref="pieRef" class="pie">饼路由</div>
</template>

<script lang="ts">
import * as echarts from 'echarts/core'
import { TitleComponent, TitleComponentOption, TooltipComponent, TooltipComponentOption, LegendComponent, LegendComponentOption } from 'echarts/components'
import { PieChart, PieSeriesOption } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

import { defineComponent, onMounted, ref, nextTick } from 'vue'

echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout])

type EChartsOption = echarts.ComposeOption<TitleComponentOption | TooltipComponentOption | LegendComponentOption | PieSeriesOption>

export default defineComponent({
  name: 'VisualPieCharts',
  setup() {
    const state = {
      pieRef: ref(),
      charts: ref()
    }
    const init = () => {
      state.charts.value = echarts.init(state.pieRef.value as HTMLElement)
      create()
    }
    const create = () => {
      const options: EChartsOption = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'left',
          bottom: 'bottom'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      state.charts.value.setOption(options)
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

<style>
.pie {
  width: 500px;
  height: 500px;
  background-color: #fff;
}
</style>
