<template>
  <div>
    <v-app>
      <template>

        <login v-bind:class="loggedin ? activeClass : inactiveClass" v-if="this.loggedin==false" @login="login" :loggedin="loggedin" :user="user"></login>
        <!-- <login v-if="this.loggedin==false" @login="login" :loggedin="loggedin" :user="user"></login> -->
        <template v-if="this.loggedin==true">
          <transition name="fade">
            <maincont @logout="logout" :user="user"></maincont>
          </transition>
        </template>
      </template>
    </v-app>
  </div>
</template>

<script>
import firebase from "firebase";
import firestore from "./firebaseInit";
import login from "./login";
import maincont from "./maincont";

export default {
  name: "myapp",
  components: {
    login,
    maincont
  },
  data() {
    return {
      activeClass: "active",
      inactiveClass: "notactive",
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
.notactive {
  opacity: 1;
  transition: opacity 3000ms;
}
.active {
  transition: opacity 3000ms;
  opacity: 0;
}
.bs::-webkit-scrollbar {
  display: none;
}
</style>
