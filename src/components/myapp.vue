<template>
  <div>
    <v-app>
      <template>
        <pose-transition>
          <login v-if="this.loggedin==false" @login="login" :loggedin="loggedin" :user="user"></login>
          <!-- <login v-if="this.loggedin==false" @login="login" :loggedin="loggedin" :user="user"></login> -->
          <template v-if="this.loggedin==true">
            <maincont @logout="logout" :user="user"></maincont>

          </template>
        </pose-transition>

      </template>
</v-app>
</div>
</template>

<script>
import firebase from "firebase";
import firestore from "./firebaseInit";
import login from "./login";
import maincont from "./maincont";
import { PoseTransition } from "vue-pose";

export default {
  name: "myapp",
  components: {
    login,
    maincont,
    PoseTransition
  },
  data() {
    return {
      scrollBar: "none",
      user: ""
      // loggedin: false
    };
  },
  computed: {
    loggedin() {
      if (this.user) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    login(e, p) {
      firebase
        .auth()
        .signInWithEmailAndPassword(e, p)
        .then(() => {
          var storeduser = firebase.auth().currentUser.email;
          sessionStorage.setItem("user", storeduser);

          this.user = sessionStorage.getItem("user");
          console.log("logged in as " + this.user);
        });
    },
    logout() {
      this.loading = true;
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logged out");
          sessionStorage.removeItem("user");
          this.user = "";
          this.loggedin = false;
        });
    }
  },
  created() {
    var cu = sessionStorage.getItem("user");
    this.user = cu;
  }
};
</script>
<style>
.bs::-webkit-scrollbar {
  display: none;
}
</style>
