<template>
  <div class="py-4 container-fluid">
    <div v-if="this.$store.state.module == 'eAQ1100S'" class="row">
      <div v-for="(item, index) in $tm('dashboard.sensor.eAQ1100S')" v-bind:key="item" class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          :title=item
          :value="(this.sensorData[index] ?? 0)"
          v-on:click="post(index)"
          :percentage="{
            value: '+505%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-money-coins',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
    </div>
    <div v-else-if="this.$store.state.module == 'eAQ2000S'" class="row">
      <div v-for="(item, index) in $tm('dashboard.sensor.eAQ2000S')" v-bind:key="item" class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          :title=item
          value="6000"
          v-on:click="post(index)"
          :percentage="{
            value: '+505%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-money-coins',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
    </div>

    <div class="mt-4 row">
      <div class="mb-4 col-lg-6 mb-lg-0">
        <div class="card z-index-2">
          <div class="p-3 card-body">

            <div class="row">
              <div class="col-6">
                <reports-doughnut-chart 
                  id="chart-doughnut-cai"
                  title="dashboard.sensor.CAIval"
                  description="(<strong>+23%</strong>) than last week"
                  :chartData="{
                    labels: [
                      'Air Quality Index',
                      'Not Exist',
                    ],
                    datasets: {
                      label: 'CAI',
                      data: (this.sensorData['CAIval'] ?? 0),
                    },
                  }"
                  :backgroundArr="aqiArr"
                />
                <index-info-chart
                  :rawIndexArr="aqiArr"
                  :value="String((this.sensorData['CAIval'] ?? 0))"
                />
              </div>
              <div class="col-6">
                <reports-doughnut-chart 
                  id="chart-doughnut-vrs"
                  title="dashboard.sensor.VirusVal"
                  description="(<strong>+23%</strong>) than last week"
                  :chartData="{
                    labels: [
                      'Virus Index',
                      'Not Exist',
                    ],
                    datasets: {
                      label: 'VRS',
                      data: (this.sensorData['Virusval'] ?? 0),
                    },
                  }"
                  :backgroundArr="vrsArr"
                />
                <index-info-chart
                  :rawIndexArr="vrsArr"
                  :value="String((this.sensorData['Virusval'] ?? 0))"
                />
              </div> 
            </div>


          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <!-- line chart -->
        <div class="card z-index-2">
          <gradient-line-chart
            id="chart-line"
            title="Gradient Line Chart"
            description="<i class='fa fa-arrow-up text-success'></i>
      <span class='font-weight-bold'>4% more</span> in 2021"
            :chart="chartData"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import ReportsDoughnutChart from "@/examples/Charts/ReportsDoughnutChart.vue";

import IndexInfoChart from "../examples/Charts/IndexInfoChart.vue";

const AQI = [0, 50, 100, 250, 500];
const VRS = [0, 40, 70, 90, 100];

const dataRefreshTime = 10;

export default {
  name: "dashboard-default",
  data() {
    return {
      iconBackground: "bg-gradient-success",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,

      module: undefined,
      chartData: { },
      aqiArr: AQI,
      vrsArr: VRS,

      sensorData: { },
    };
  },
  components: {
    MiniStatisticsCard,
    ReportsBarChart,
    GradientLineChart,
    ReportsDoughnutChart,

    IndexInfoChart
  },
  mounted() {
    if(this.$store.state.module !== undefined) {
      this.post("PM2P5val");
    }

    this.getRealTimeData();
    setInterval(this.getRealTimeData, dataRefreshTime * 1000);
  },
  unmounted() {
    clearInterval(this.getRealTimeData);
  },
  methods: {
    getRealTimeData() {
      // 페치페치
      fetch("http://192.168.0.119:3000/" + "api/device/TIA0002053", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "0x00"
        },
      })
      .then((res) => { return res.json() })
      .then((data) => {
        this.sensorData = data;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    post(selectedOneSensor) {
      var jsonBody = { targetSensor: [selectedOneSensor] };

      fetch(this.$store.state.chartUrl + "vue/chart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody)
      })
      .then((res) => { return res.json() })
      .then((data) => {
        this.chartData = data;
      })
      .catch((err) => {
        console.log(err);
        this.chartData = undefined;
      })
    },
  }
};
</script>
