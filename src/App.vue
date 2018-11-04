<template>
  <div>
    <loader v-if="loading"> </loader>
    <v-app>
      <template v-if="!loading">
        <transition name="fade">
          <login v-if="!loggedIn" @fire="fire"></login>
        </transition>
        <!-- <home v-if="this.user" :user="user"></home> -->
        <transition name="fade">
          <maincont v-if="loggedIn" :user="user"></maincont>
        </transition>
      </template>
    </v-app>
  </div>

</template>

<script>
import firebase from "firebase";
import firestore from "./components/firebaseInit";
import login from "./components/login";
// import home from "./components/home";
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
      // user: null,
      scrollBar: "none",
      user: "",
      loading: true
    };
  },
  computed: {
    loggedIn() {
      var u = this.user;
      if (u) {
        return true;
        // return Object.keys(u).length;
      } else {
        return false;
      }
    }
  },
  methods: {
    // fire() {
    //   this.user = firebase.auth().currentUser;
    //   this.loggedIn = true;
    //   this.locked = false;
    //   document.querySelector("body").classList.remove("bs");
    // }
  },
  mounted() {
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.user = user;
        self.loading = false;
      } else {
        self.loading = false;

        // User is signed out.
        // ...
      }
    });
  }

  // watch: {
  //   locked() {
  //     document.querySelector("body").style.transform = this.locked
  //       ? "translateX(500px)"
  //       : "translateY(-300px)";
  //   }
  // }
};
</script>
<style scoped>
.bs::-webkit-scrollbar {
  display: none;
}
#ani {
  transition: 1000ms;
}
</style>

