<template>
  <v-app>

    <login v-if="this.userLength == 0" @fire="fire"></login>
    <div v-if="this.userLength > 0">
      <v-btn @click=" logger" color="success">log</v-btn>
      <v-btn @click=" logout" color="success">log out</v-btn>

      <!-- {{user.uid}} -->
    </div>

  </v-app>
</template>

<script>
import firebase from "firebase";
import firestore from "./components/firebaseInit";
import login from "./components/login";
export default {
  name: "App",
  components: {
    login
  },
  props: [],
  data() {
    return {
      user: {},
      scrollBar: "none",
      loggedIn: false
    };
  },
  watch: {
    locked() {
      document.querySelector("body").style.transform = this.locked
        ? "translateX(500px)"
        : "translateY(-300px)";
    }
  },
  computed: {
    userLength() {
      var u = this.user;
      return Object.keys(u).length;
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.user = {};
          alert("logged out");
        });
    },
    logger() {
      console.log(this.user);
    },
    fire() {
      this.user = firebase.auth().currentUser;
      // this.loggedIn = this.user.I;
      this.locked = false;
      document.querySelector("body").classList.remove("bs");
    }
  }
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

