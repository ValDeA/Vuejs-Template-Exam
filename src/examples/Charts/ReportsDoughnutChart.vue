<template>
  <div class="py-3 border-radius-lg" :class="`bg-gradient-${color}`">
    <div class="chart">
      <canvas :id="id" class="chart-canvas" height="170"></canvas>
    </div>
  </div>
  <h6 v-if="title !== ''" class="mt-4 mb-0 ms-2">{{ $t(title) }}</h6>
  <!-- eslint-disable vue/no-v-html -->
  <!-- <p class="text-sm ms-2" v-html="description" /> -->
  <div class="container border-radius-lg">
    <div class="row">
      <div
        v-for="(
          {
            label,
            progress: { content, percentage },
            icon: { color: colour, component },
          },
          index
        ) in items"
        :key="index"
        class="py-3 col-3 ps-0"
      >
        <div class="mb-2 d-flex">
          <div
            class="text-center shadow icon icon-shape icon-xxs border-radius-sm me-2 d-flex align-items-center justify-content-center"
            :class="`bg-gradient-${colour}`"
          >
            <font-awesome-icon
              :icon="component"
              size="xs"
              :style="{ color: 'white' }"
            />
          </div>
          <p class="mt-1 mb-0 text-xs font-weight-bold">{{ label }}</p>
        </div>
        <h4 class="font-weight-bolder">{{ content }}</h4>
        <div class="progress w-75">
          <div
            class="progress-bar bg-dark"
            :class="`w-${percentage}`"
            role="progressbar"
            :aria-valuenow="percentage"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const colorScale = [
  '#ffffff',
  '#36a2eb',
  '#4bc0c0',
  '#ff9f40',
  '#ff6384'
];

export default {
  name: "ReportsBarChart",
  components: {
    FontAwesomeIcon,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "dark",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    chartData: {
      type: Object,
      required: true,
      labels: Array,
      datasets: {
        type: Object,
        label: String,
        data: Number,
      },
    },
    items: {
      type: Array,
      default: () => {
        [];
      },
    },
    backgroundArr: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  mounted() {
    var ctx = document.getElementById(this.id).getContext("2d");

    let chartStatus = Chart.getChart(this.id);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            label: this.chartData.datasets.label,
            borderWidth: 0,
            borderRadius: 0,
            // borderWidth: 2,
            // borderRadius: 0,
            // borderColor: "rgba(255, 255, 255, 0.95)",
            backgroundColor: [
              colorScale[this.getColorScaleIndex(this.chartData.datasets.data)], 
              this.getColorScaleIndex(this.chartData.datasets.data) == 0 ? colorScale[this.getColorScaleIndex(this.chartData.datasets.data)] : colorScale[this.getColorScaleIndex(this.chartData.datasets.data) - 1]
            ],
            data: this.getChartValue(this.chartData.datasets.data),
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false,
          },
        },
        elements: { // 도넛 가운데 글자 속성
          center: {
            text: this.chartData.datasets.data,
            color: colorScale[0],
            // color: colorScale[this.getColorScaleIndex(this.chartData.datasets.data)],
            fontStyle: 'Arial',
            sidePadding: 20,
            fontSize: 20,
            lineHeight: 25
          }
        }
      },
      plugins: [{
        afterUpdate: function(chart) {
          const arcs = chart.getDatasetMeta(0).data;

          arcs.forEach(function(arc) {
            arc.round = {
              x: (chart.chartArea.left + chart.chartArea.right) / 2,
              y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
              radius: (arc.outerRadius + arc.innerRadius) / 2,
              thickness: (arc.outerRadius - arc.innerRadius) / 2,
              backgroundColor: arc.options.backgroundColor
            }
          });
        },
        afterDraw: (chart) => {
          const {
            ctx,
            canvas
          } = chart;

          ((arc) => {
            const startAngle = Math.PI / 2 - arc.startAngle;
            const endAngle = Math.PI / 2 - arc.endAngle;

            ctx.save();
            ctx.translate(arc.round.x, arc.round.y);
            ctx.fillStyle = arc.options.backgroundColor;
            ctx.beginPath();
            ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness-5, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            
            // var m = (arc.round.radius * Math.cos(endAngle) - ((arc.round.thickness-12)/2)) / arc.round.radius * Math.sin(endAngle);
            // console.log(m);
            
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness-12, 0 * Math.PI, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
          })(chart.getDatasetMeta(0).data[0]);

          // chart.getDatasetMeta(0).data.forEach(arc => {
          //   const startAngle = Math.PI / 2 - arc.startAngle;
          //   const endAngle = Math.PI / 2 - arc.endAngle;

          //   ctx.save();
          //   ctx.translate(arc.round.x, arc.round.y);
          //   ctx.fillStyle = arc.options.backgroundColor;
          //   ctx.beginPath();
          //   ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
          //   ctx.closePath();
          //   ctx.fill();
          //   ctx.restore();
          // });
        }
      }]
    });
  },
  methods: {
    getColorScaleIndex(value) {
      if (value <= this.backgroundArr[1]) return 1;
      else if (value <= this.backgroundArr[2]) return 2;
      else if (value <= this.backgroundArr[3]) return 3;
      else return 4;
    },
    getChartValue(value) {
      var foregroundValue = 0, backgroundValue = 0, diff = 0, factor = 0;

      if (value <= this.backgroundArr[1]) {
        diff = this.backgroundArr[1] - this.backgroundArr[0];
        factor = this.backgroundArr[0];
      }
      else if (value <= this.backgroundArr[2]) {
        diff = this.backgroundArr[2] - this.backgroundArr[1];
        factor = this.backgroundArr[1];
      }
      else if (value <= this.backgroundArr[3]) {
        diff = this.backgroundArr[3] - this.backgroundArr[2];
        factor = this.backgroundArr[2];
      }
      else {
        diff = this.backgroundArr[4] - this.backgroundArr[3];
        factor = this.backgroundArr[3];
      }

      foregroundValue = value - factor >= this.backgroundArr[4] ? this.backgroundArr[4] : value - factor;
      backgroundValue = diff - foregroundValue <= this.backgroundArr[0] ? this.backgroundArr[0] : diff - foregroundValue;

      return [foregroundValue, backgroundValue];
    }
  },
  watch: {
    chartData: function() {
      let chart = Chart.getChart(this.id);

      chart.data.datasets[0].backgroundColor = [
        colorScale[this.getColorScaleIndex(this.chartData.datasets.data)], 
        this.getColorScaleIndex(this.chartData.datasets.data) == 0 ? colorScale[this.getColorScaleIndex(this.chartData.datasets.data)] : colorScale[this.getColorScaleIndex(this.chartData.datasets.data) - 1]
      ];
      chart.data.datasets[0].data = this.getChartValue(this.chartData.datasets.data);
      chart.options.elements.center.text = this.chartData.datasets.data;
      chart.update();
      // this.updateChart(this.chart);
    }
  }
};
</script>
