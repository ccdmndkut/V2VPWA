import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import "./registerServiceWorker";
import VueFirestore from "vue-firestore";
require("firebase/firestore");
import VueLocalStorage from "vue-localstorage";
Vue.use(VueLocalStorage);
Vue.use(VueFirestore);
import firestore from "./components/firebaseInit";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
