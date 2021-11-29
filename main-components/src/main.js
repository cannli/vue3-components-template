import Vue from "vue";
import "@/styles/index.scss"; // global css
import App from "./App.vue";
import store from "./store";
import router from "./router";
import './core';
import "./plugins/element.js";
import "./icons"; // icon

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
