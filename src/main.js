import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import "./registerServiceWorker";

import VueFirestore from "vue-firestore";
import firebase from "firebase/app";
import "firebase/firestore";
Vue.use(VueFirestore);
firebase.initializeApp({
  projectId: "vaclaims-194006",
  apiKey: "AIzaSyDMbILM1a366tYFM3-nOLwCUXapJ8ETqmw",

  databaseURL: "https://vaclaims-194006.firebaseio.com"
});

export const db = firebase.firestore().collection('trash');

import VueLocalStorage from "vue-localstorage";
Vue.use(VueLocalStorage);

Vue.config.productionTip = true;

new Vue({
  render: h => h(App)
}).$mount("#app");
