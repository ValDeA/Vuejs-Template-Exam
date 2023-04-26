<template>
  <div class="p-3 pb-0 card-header">
    <h6>{{ title }}</h6>
    <!-- eslint-disable vue/no-v-html -->
    <!-- <p v-if="description" class="text-sm text-end" v-html="description" /> -->
    <!-- <div v-if="description !== undefined" class="mb-3 d-flex align-items-center justify-content-end">
      <div v-for="item in description" v-bind:key="item">
        <div v-if="item == 1" class="ms-2">
          <input id="pm0p1" type="checkbox" />
          <label for="pm0p1"> {{ $t("dashboard.pm0p1") }}</label>
        </div>
      </div>
      <button class="btn bg-gradient-success mb-0 ms-4 py-2" v-on:click="drawChart">적용</button>
    </div> -->
  </div>
  <div class="p-3 card-body">
    <div class="chart">
      <canvas :id="id" class="chart-canvas" :height="height"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

const COLORS = [
  '#4dc9f6',
  '#f67019',
  '#f53794',
  '#537bc4',
  '#acc236',
  '#166a8f',
  '#00a950',
  '#58595b',
  '#8549ba',
  '#36a2eb',
  '#4bc0c0',
  '#ff9f40',
  '#ff6384'
];

let ctx = undefined;
let gradientStroke1 = undefined;
let data = undefined;
let options = undefined;


export default {
  name: "GradientLineChart",
  props: {
    id: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: "300",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    chart: {
      type: Object,
      required: true,
      labels: Array,
      datasets: {
        type: Array,
        label: String,
        data: Array,
      },
      default: [
          {
          labels: [ ],
          datasets: [
            {
              label: '',
              data: [ ],
            },
          ],
        }
      ]
    },
    colorIndex: {
      type: Number,
      defulat: undefined,
    },
  },
  mounted() {
    ctx = document.getElementById(this.id).getContext("2d");

    gradientStroke1 = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, "rgba(203,12,159,0.2)");
    gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
    gradientStroke1.addColorStop(0, "rgba(203,12,159,0)");

    data = {
      labels: [''],
      datasets: [
        {
          label: [''],
          tension: 0.4,
          borderWidth: 0,
          pointRadius: 0,
          borderColor: "#cb0c9f",
          // eslint-disable-next-line no-dupe-keys
          borderWidth: 3,
          backgroundColor: gradientStroke1,
          fill: true,
          data: [0],
          maxBarThickness: 6,
        },
      ],
    };
    options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      scales: {
        y0: {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#b2b9bf",
            font: {
              size: 11,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
        x: {
          grid: {
            drawBorder: false,
            display: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            color: "#000000",
            padding: 20,
            font: {
              size: 11,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        },
      },
    };

    let chartStatus = Chart.getChart(this.id);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    this.drawChart(data, options);
  },
  watch: {
    chart: function() {
      this.updateChart(this.chart);
    }
  },
  methods: {
    drawChart: function (chartData, chartOptions) {
      let chartStatus = Chart.getChart(this.id);
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }

      new Chart(ctx, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });
    },
    updateChart: function (chartData) {
      let chart = Chart.getChart(this.id);
      if(chart == undefined) return;

      // Y축 개수 초기화
      delete chart.options.scales.y1;
      delete chart.options.scales.y2;
      delete chart.options.scales.y3;

      // Y축이 0개일 때
      if (chartData.datasets.length == 0) {
        chart.options.scales['y0'] = {
          grid: {
            drawBorder: false,
            display: true,
            drawOnChartArea: true,
            drawTicks: false,
            borderDash: [5, 5],
          },
          ticks: {
            display: true,
            padding: 10,
            color: "#b2b9bf",
            font: {
              size: 11,
              family: "Open Sans",
              style: "normal",
              lineHeight: 2,
            },
          },
        };
      }
      else {
        // Y축이 n개일 때
        // 선택된 항목만큼 데이터 및 Y축 추가
        for (var i = 0; i < chartData.datasets.length; i++) {
          chart.options.scales['y' + i] = {
            type: "linear",
            position: i < 2 ? 'left' : 'right',
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
              color: "#00000075", // COLORS[i],
              // gridLines: {
              //   color: "rgba(0,0,0,0)"
              // }
            },
            ticks: {
              display: true,
              padding: 10,
              color: "#00000075", // COLORS[i],
              font: {
                size: 11,
                family: "Open Sans",
                style: "normal",
                lineHeight: 2,
              },
            },
          }
        }
      }


      // Chart Data 치환
      chart.data.labels = chartData.labels;

      var oldDataSets = chart.data.datasets;
      var newDataSets = chartData.datasets;
      var diff = oldDataSets.length - newDataSets.length;

      if(diff > 0) {
        for(var idx=newDataSets.length; idx<newDataSets.length+diff; idx++) {
          oldDataSets.pop();
        }
      }
      for(var i=0; i<newDataSets.length; i++) {
        if(chartData.datasets[i] == undefined) {
          chart.data.datasets.pop(i);
        } else {
          chart.data.datasets[i] = {
            label: chartData.datasets[i].label,
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: COLORS[this.colorIndex] ?? COLORS[i],
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 1.5,
            // 색 채우기
            // backgroundColor: gradientStroke1,
            // fill: true,
            data: chartData.datasets[i].data,
            maxBarThickness: 6,
          };
        }
      }

      chart.update();
    },
  },
};
</script>
