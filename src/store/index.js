import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    isTransparent: "",
    isRTL: false,
    color: "",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    bootstrap,

    url: "http://ascloud.kr/",
    apiUrl: "http://192.168.0.177:3000/",     // TEST용 URL
    chartUrl: "http://192.168.0.119:3000/",   // TEST용 URL
    // accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjgxNDMxMzY5LCJleHAiOjE2ODE0NDMzNjksImlzcyI6InRlc3RtYW4iLCJhdXRoIjoiUk9MRV9BRE1JTiIsIm1vYmlsZSI6ZmFsc2V9.Rgvs8wjwycnRC-6PBDazK4hk7SWqBoQCdCZAzfAHqadvuVkXZedkaWjUDHHSoCnV9V_jo9hgGMm20C4ek_u2ZA"
  
    userId: undefined,
    device: [
      {
        userId: "test@test.com",
        device: "TIA0002053",
        deviceName: "방1",
        businessType: "병원",
        starred: false,
        owned: false
      },
      {
        userId: "test@test.com",
        device: "TIA0000002",
        deviceName: "방2",
        businessType: "카페",
        starred: false,
        owned: false
      },
      {
        userId: "test@test.com",
        device: "TIA0000001",
        deviceName: "방2",
        businessType: "카페",
        starred: false,
        owned: false
      },
    ],
    module: "eAQ1100S",
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.isTransparent = payload;
    },
    cardBackground(state, payload) {
      state.color = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    },
    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },
    setCardBackground({ commit }, payload) {
      commit("cardBackground", payload);
    },
  },
  getters: { },
});
