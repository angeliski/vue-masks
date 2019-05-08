import Vue from "vue";
import App from "./App.vue";

import VueInputMasks from '../src';
Vue.use(VueInputMasks);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
