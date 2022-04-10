<template>
  <main>
    <v-chart :options="polar"/>

  </main>
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 600px;
  height: 600px;
}
</style>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'       //绘制不同的图表要引入不同的chart和component
import 'echarts/lib/component/polar'

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      polar: {
        // 指定图表的配置项和数据
      }
    }
  }
}
</script>
