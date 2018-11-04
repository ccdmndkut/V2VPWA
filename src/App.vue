<template>
  <v-app>
    <transition name="fade">
      <login v-if="this.userLength == 0" @fire="fire"></login>
    </transition>
    <!-- <home v-if="this.user" :user="user"></home> -->
    <transition name="fade">
      <maincont v-if="this.user" :user="user"></maincont>
    </transition>
  </v-app>

</template>

<script>
import firebase from "firebase";
import firestore from "./components/firebaseInit";
import login from "./components/login";
// import home from "./components/home";
import maincont from "./components/maincont";

export default {
  name: "App",
  components: {
    login,
    maincont
  },
  data() {
    return {
      user: null,
      scrollBar: "none",
      loggedIn: false
    };
  },
  computed: {
    userLength() {
      var u = this.user;
      if (this.user) {
        return Object.keys(u).length;
      } else {
        return 0;
      }
    }
  },
  methods: {
    fire() {
      this.user = firebase.auth().currentUser;
      // this.loggedIn = this.user.I;
      this.locked = false;
      document.querySelector("body").classList.remove("bs");
    }
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
<style>
.bs::-webkit-scrollbar {
  display: none;
}
#ani {
  transition: 1000ms;
}
</style>

