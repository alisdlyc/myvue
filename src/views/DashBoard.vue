<template>
  <div>
    <div v-if="this.$route.params.dim === '2'">
      <v-chart class="chart" :option="option2d" />
    </div>
    <div v-else>
      <v-chart class="chart" :option="option" />
    </div>
  </div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);


export default {
  name: "HelloWorld",
  components: {
    VChart
  },
  data() {
    return {
      option2d: {
        title: {
          text: "数据可视化「饼图」",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "Traffic Sources",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.$route.params.re,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      option: {
        title: {
          text: '数据可视化「折线图」'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.$route.params.k1 // k1
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.$route.params.k2 //k2
        },
        yAxis: {
          type: 'value'
        },

        series: this.$route.params.re
      }
    }
  }
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
