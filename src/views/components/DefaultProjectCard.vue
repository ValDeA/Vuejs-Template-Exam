<template>
  <div class="mb-4 col-xl-3 col-md-6 mb-xl-0">
    <div class="card card-blog card-plain">
      <div class="position-relative border-radius-lg p-3 ps-4 pe-4" :style="`background-image: url(${image}); background-size: cover;`">
        <div class="row ps-2 pe-2 border-radius-lg" style="background-color: rgba(0, 0, 0, 0.8)">
          <div class="col-6">
            <reports-doughnut-chart
              :id="id + '_CAI'"
              :chartData="{
                labels: [
                  'Virus Index',
                  'Not Exist',
                ],
                datasets: {
                  label: 'VRS',
                  data: 45,
                },
              }"
              :backgroundArr="[0, 40, 70, 90, 100]"
              color="aa"
            />
          </div>
          <div class="col-6">
            <reports-doughnut-chart
              :id="id + '_VRS'"
              :chartData="{
                labels: [
                  'Virus Index',
                  'Not Exist',
                ],
                datasets: {
                  label: 'VRS',
                  data: 22,
                },
              }"
              :backgroundArr="[0, 40, 70, 90, 100]"
              color="aa"
            />
          </div>
        </div>


        <!-- <a class="shadow-xl d-block border-radius-xl">
          <img
            :src="image"
            alt="img-blur-shadow"
            class="shadow img-fluid border-radius-xl"
          />
        </a> -->
      </div>
      <div class="px-1 pb-0 card-body">
        <p class="mb-2 text-sm text-gradient text-dark">{{ label }}</p>
        <a href="javascript:;">
          <h5>{{ title }}</h5>
        </a>
        <p class="mb-4 text-sm">
          {{ description }}
        </p>
        <hr class="my-3 horizontal dark" />
        <div class="d-flex align-items-center justify-content-between">
          <button
            type="button"
            class="mb-0 btn btn-sm"
            :class="`btn-outline-${action.color}`"
          >
            {{ action.label }}
          </button>
          <div class="mt-2 avatar-group">
            <a
              v-for="({ image: authorImage, name }, index) of authors"
              :key="index"
              href="javascript:;"
              class="avatar avatar-xs rounded-circle"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              :title="name"
            >
              <img :alt="authorImage" :src="authorImage" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportsDoughnutChart from '../../examples/Charts/ReportsDoughnutChart.vue';
import IndexInfoChart from '../../examples/Charts/IndexInfoChart.vue';

export default {
  name: "DefaultProjectCard",
  components: {
    ReportsDoughnutChart,
    IndexInfoChart,
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "Default Project Card",
    },
    description: {
      type: String,
      default: "",
    },
    action: {
      type: Object,
      route: String,
      color: String,
      label: String,
      default: () => {},
    },
    authors: {
      type: Array,
      image: String,
      name: String,
      default: () => [],
    },
  },
};
</script>
