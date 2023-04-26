<template>
  <div class="py-4 container-fluid">

    <div class="mt-4 row">
      <div class="col-12">


        <div class="mb-4 card">

          <div class="p-3 card-header">

            <div class="d-flex justify-content-end">
              <button class="btn bg-gradient-success mb-0 py-2" v-on:click="post">{{ $t('statistics.applyBtn') }}</button>
            </div>


          </div>

          <div class="p-3 card-body">
            <!-- Input Check Box -->
            <div v-if="this.$store.state.module == 'eAQ1100S'" class="row">
              <div v-for="(item, index) in $tm('statistics.sensor.eAQ1100S')" v-bind:key="item" class="col-xl-2 col-md-4 mb-xl-0">

                <div class="card card-blog card-plain">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      v-on:change="checkCount"
                      v-bind:disabled="checkList.length >= 4 && findCheckBox(index) && mode == 'one'"
                      v-model="checkList"
                      v-bind:id="index" v-bind:value="index"
                      type="checkbox"
                    />
                    <label class="custom-control-label" v-bind:for=index> {{ item }}</label>
                  </div>
                </div>

              </div>
            </div>
            <div v-if="this.$store.state.module == 'eAQ2000S'" class="row">
              <div v-for="(item, index) in $tm('statistics.sensor.eAQ2000S')" v-bind:key="item" class="col-xl-2 col-md-4 mb-xl-0">

                <div class="card card-blog card-plain">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      v-on:change="checkCount"
                      v-bind:disabled="checkList.length >= 4 && findCheckBox(index) && mode == 'one'"
                      v-model="checkList"
                      v-bind:id=index v-bind:value=index
                      type="checkbox"
                    />
                    <label class="custom-control-label" v-bind:for=index> {{ item }}</label>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>


      </div>
    </div>


    <!-- <div v-if="this.$store.state.module == 'eAQ1100S'" class="mb-3 d-flex align-items-center justify-content-end">
      <div v-for="(item, index) in $tm('statistics.sensor.eAQ1100S')" v-bind:key="item" class="form-check">
        <input
          class="form-check-input"
          v-on:change="checkCount"
          v-bind:disabled="checkList.length >= 4 && findCheckBox(index) && mode == 'one'"
          v-model="checkList"
          v-bind:id=index v-bind:value=index
          type="checkbox"
        />
        <label class="custom-control-label" v-bind:for=index> {{ item }}</label>
      </div>
      <button class="btn bg-gradient-success mb-0 ms-4 py-2" v-on:click="post">{{ $t('statistics.applyBtn') }}</button>
    </div> -->

    <div class="row">
      <div class="col">
        <!-- line chart -->
        <div v-if="mode == 'one'">
          <div class="card z-index-2">
            <gradient-line-chart
              id="chart-line"
              title="Gradient Line Chart"
              :chart="chartData"
            />
          </div>
        </div>

        <div v-if="mode == 'two'">
          <div v-for="(sensor, index) in checkList" class="card z-index-2 mb-4">
            <gradient-line-chart
              :id="`chart-line-${sensor}`"
              :title="`${ $t('statistics.sensor.eAQ1100S.'+sensor) }`"
              :chart="chartData[index]"
              height="250"
              :colorIndex=index
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";

export default {
  name: "statistics-default",
  data() {
    return {
      checkCount: 0,
      checkList: [],
      mode: 'two',
      chartData: [
          {
          labels: [ ],
          datasets: [
            {
              label: '',
              data: [ ],
            },
          ],
        }
      ],
    };
  },
  methods: {
    countCheckBox() {
      this.checkCount = this.checkList.length;
    },
    findCheckBox(id) {
      return this.checkList.indexOf(id) == -1;
    },
    post() {
      var jsonBody = { targetSensor: this.checkList };

      fetch(this.$store.state.chartUrl + "vue/chart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody)
      })
      .then((res) => { return res.json() })
      .then((data) => {
        this.makeChartDataModeTwo(data);
      })
      .catch((err) => {
        console.log(err);
        this.chartData = undefined;
      })
    },
    makeChartDataModeTwo(data) {
      if(this.mode == 'one') {
        this.chartData = data;
      }
      else if(this.mode == 'two') {
        this.chartData = new Array();

        for(var i=0; i<data.datasets.length; i++) {
          this.chartData.push(
            {
              labels: data.labels,
              datasets: [
                {
                  label: data.datasets[i].label,
                  data: data.datasets[i].data,
                },
              ],
            }
          )
        }
      }

    },
  },
  components: {
    GradientLineChart,
  },
};
</script>
