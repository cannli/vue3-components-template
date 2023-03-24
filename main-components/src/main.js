import Vue from "vue";
import "@/styles/index.scss"; // global css
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./core";
import "./plugins/element.js";
import "./icons"; // icon
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
Vue.config.productionTip = false;
Vue.use(VueQuillEditor);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
