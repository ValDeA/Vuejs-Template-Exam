<template>
  <div class="container border-radius-lg">
    <div class="row">
      <div class="py-3 col-12">
        <!-- <div class="mb-2 d-flex">
          <div
            class="text-center shadow icon icon-shape icon-xxs border-radius-sm me-2 d-flex align-items-center justify-content-center"
            :class="`bg-gradient-info`"
          >
            <font-awesome-icon
              :icon="faHandPointer"
              size="xs"
              :style="{ color: 'white' }"
            />
          </div>
          <p class="mt-1 mb-0 text-xs font-weight-bold"> 이름 </p>
        </div> -->
        <div class="progress-pos w-100 mt-1">
          <div
            class="font-weight-bolder mb-0 progress-pos text" 
            :style="`width: ${ calcPosition <= 100 ? calcPosition : 100 }% !important`"
          > 
          </div>
          <div
            class="font-weight-bolder mb-0 progress-pos text"
          > 
            {{ value }}
          </div>
        </div>

        <div class="progress w-100">
          <div
            class="progress-bar sel1"
            :class="`w-${index[0]}`"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <div
            class="progress-bar sel2"
            :class="`w-${index[1]}`"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <div
            class="progress-bar sel3"
            :class="`w-${index[2]}`"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
          <div
            class="progress-bar sel4"
            :class="`w-${index[3]}`"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .sel1 {
    background-color: #36a2eb;
  }
  .sel2 {
    background-color: #4bc0c0;
  }
  .sel3 {
    background-color: #ff9f40;
  }
  .sel4 {
    background-color: #ff6384;
  }
  .container {
    padding: 0;
  }
  
  .progress-pos {
    display: flex;
    overflow: hidden;
  }
  .progress-pos.text {
    text-align: end;
    justify-content: end;
    transition: all 1s;
  }
</style>
<script>
  export default {
    props: {
      rawIndexArr: {
        type: Array,
        default: () => {
          [0, 25, 50, 75, 100];
        }
      },
      value: {
        type: String,
        default: "0"
      }
    },
    data() {
      return {
        index: [],
      }
    },
    mounted() {
      this.calcIndex = this.rawIndexArr;
    },
    computed: {
      calcIndex: {
        get: function() {
          return this.index;
        },
        set: function(newIndexArr) {
          var indexArr = [];

          for(var i=1; i<newIndexArr.length; i++) {
            indexArr.push(
              (newIndexArr[i] - newIndexArr[i-1]) /newIndexArr[4] * 100
            );
          }

          this.index = indexArr;
        }
      },
      calcPosition: function() {
        return this.value / this.rawIndexArr[4] * 100;
      }
    },
  }
</script>
