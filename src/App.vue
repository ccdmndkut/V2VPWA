<template>
  <div>
    <loader v-if="loading"> </loader>
    <v-app v-if="!loading">
      <template>
        <template v-if="!loggedIn">
          <transition name="zoom">
            <login @loadingTrigger="loadingTrigger"></login>
          </transition>
        </template>
        <template v-if="loggedIn">
          <transition name="fade">
            <maincont @loadingTrigger="loadingTrigger" @logout="logout" :user="user"></maincont>
          </transition>
        </template>
      </template>
    </v-app>
  </div>
</template>

<script>
import firebase from "firebase";
import firestore from "./components/firebaseInit";
import login from "./components/login";
import maincont from "./components/maincont";
import loader from "./components/loader";

export default {
  name: "App",
  components: {
    login,
    maincont,
    loader
  },
  data() {
    return {
      scrollBar: "none",
      user: "",
      loading: Boolean
    };
  },
  computed: {
    loggedIn() {
      if (this.user) {
        return true;
        // return Object.keys(u).length;
      } else {
        return false;
      }
    }
  },
  methods: {
    loadingTrigger(l) {
      console.log("loader triggered");
      this.loading = l;
    },
    logout() {
      this.loading = true;
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.user = firebase.auth().currentUser;
          console.log("logged out");
          this.loading = false;
        });
    },
    fbUser() {
      var $j = this;
      firebase.auth().onAuthStateChanged(function(a) {
        a ? ($j.user = a) : console.log("no user logged in");
        $j.loading = !1;
      });
    }
  },
  mounted() {
    this.fbUser();
  }
};
</script>
<style>
.bs::-webkit-scrollbar {
  display: none;
}
</style>

