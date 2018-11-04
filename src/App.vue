<template>
  <div>
    <login v-if="this.userLength == 0" @fire="fire"></login>
    <!-- <home v-if="this.userLength == 36" :user="this.user.email"></home> -->
    <home v-if="this.user" :user="user"></home>

  </div>

</template>

<script>
import firebase from "firebase";
import firestore from "./components/firebaseInit";
import login from "./components/login";
import home from "./components/home";

export default {
  name: "App",
  components: {
    login,
    home
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

