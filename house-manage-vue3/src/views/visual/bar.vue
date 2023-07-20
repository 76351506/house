<template>
  <div ref="barRef" class="bar">柱状路由</div>
</template>

<script lang="ts">
import * as echarts from 'echarts/core'
import { GridComponent, GridComponentOption, LegendComponent, LegendComponentOption } from 'echarts/components'
import { BarChart, BarSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

import { defineComponent, ref, onMounted } from 'vue'
echarts.use([GridComponent, LegendComponent, BarChart, CanvasRenderer])

type EChartsOption = echarts.ComposeOption<GridComponentOption | LegendComponentOption | BarSeriesOption>

export default defineComponent({
  name: 'VisualBarCharts',
  setup() {
    const state = {
      barRef: ref(),
      charts: ref()
    }
    const init = () => {
      state.charts.value = echarts.init(state.barRef.value as HTMLElement)
    }
    const createNormal = (): void => {
      const option: EChartsOption = {
        // x轴
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      }
      state.charts.value.setOption(option)
    }
    const createDynamicSort = () => {
      const data: any[] = []
      for (let i = 0; i < 5; ++i) {
        data.push(Math.round(Math.random() * 200))
      }
      let option: EChartsOption = {
        xAxis: {
          max: 'dataMax'
        },
        yAxis: {
          type: 'category',
          data: ['A', 'B', 'C', 'D', 'E'],
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 2 // only the largest 3 bars will be displayed
        },
        series: [
          {
            realtimeSort: true,
            name: 'X',
            type: 'bar',
            data: data,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            }
          }
        ],
        legend: {
          show: true
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      }
      function run() {
        for (var i = 0; i < data.length; ++i) {
          if (Math.random() > 0.9) {
            data[i] += Math.round(Math.random() * 2000)
          } else {
            data[i] += Math.round(Math.random() * 200)
          }
        }
        state.charts.value.setOption({
          xAxis: {
            max: 'dataMax'
          },
          yAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E'],
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 2 // only the largest 3 bars will be displayed
          },
          series: [
            {
              realtimeSort: true,
              name: 'X',
              type: 'bar',
              data
            }
          ]
        })
      }

      setInterval(function () {
        run()
      }, 3000)
      state.charts.value.setOption(option)
    }
    onMounted(() => {
      init()
      createDynamicSort()
    })
    return {
      ...state
    }
  }
})
</script>

<style lang="less">
.bar {
  width: 500px;
  height: 500px;
  background-color: #fff;
}
</style>
