<template>
  <sidenav :custom_class="this.$store.state.mcolor" :class="[
    this.$store.state.isTransparent,
    this.$store.state.isRTL ? 'fixed-end' : 'fixed-start',
  ]" v-if="this.$store.state.showSidenav" />
  <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    :style="this.$store.state.isRTL ? 'overflow-x: hidden' : ''">
    <!-- nav -->

    <navbar
      :class="[navClasses]"
      :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize"
      v-if="this.$store.state.showNavbar" 
    />
    <router-view />
    <app-footer v-show="this.$store.state.showFooter" />
    <configurator :toggle="toggleConfigurator" :class="[
      this.$store.state.showConfig ? 'show' : '',
      this.$store.state.hideConfigButton ? 'd-none' : '',
    ]" />
  </main>
</template>
<script>
import Sidenav from "@/examples/Sidenav/index.vue";
import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import { mapMutations } from "vuex";
import Chart from "chart.js/auto";
export default {
  name: "App",
  components: {
    Sidenav,
    Configurator,
    Navbar,
    AppFooter,
  },
  mounted() {
    // 도넛 차트 텍스트 삽입
    Chart.register({
      id: 'text',
      beforeDraw: function (chart) {
        try {
          if (chart.config.options.elements.center) { //Get ctx from string
            var ctx = chart.ctx; //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontSize = centerConfig.fontSize || '50';
            var fontStyle = centerConfig.fontStyle || 'Arial';
            var txt = centerConfig.text; var color = centerConfig.color || '#000';
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
            //Start with a base font of 30px
            ctx.font = fontSize + "px " + fontStyle;

            //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width. 
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(30 * widthRatio);
            var elementHeight = (chart.innerRadius * 0.7);

            // Pick a new font size so it will not be larger than the height of label. 
            var fontSizeToUse = Math.min(newFontSize, elementHeight);

            //Set font settings to draw it correctly. 
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

            //반도넛일 경우
            if (chart.config.options.rotation === Math.PI && chart.config.options.circumference === Math.PI) {
              centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 1.3);
            }
            ctx.font = fontSizeToUse + "px " + fontStyle;
            ctx.fillStyle = color;

            //Draw text in center 
            ctx.fillText(txt, centerX, centerY);
          }
        } catch(e) {
          // Chart Type is Not Doughnut
        }
      }
    });
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  },
  computed: {
    navClasses() {
      return {
        "position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky": this
          .$store.state.isNavFixed,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-0 mx-4 mt-4": !this.$store.state.isAbsolute,
      };
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
  },
};
</script>
