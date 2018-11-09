import Vue from "vue";
import "../plugins/vuetify";

import App from "./subapp.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#subapp");
