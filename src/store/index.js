import Vue from "vue";
import Vuex from "vuex";

import "babel-polyfill";
import VueFirestore from "vue-firestore";
require("firebase/firestore");

import firebase from "firebase";
import config from "../components/firebaseConfig";

firebase.initializeApp(config);
import firestore from "./firebaseInit";

Vue.use(Vuex);
const state = {
  db: firebase.firestore()
};

export default new Vuex.Store({
  state,
  modules: {}
});
