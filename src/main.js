import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.prototype.$log = console.log;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
