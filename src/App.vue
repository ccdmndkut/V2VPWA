<template>
  <v-app>
    <login @login="login" v-if="!loggedIn"></login>
    <!-- <myapp v-else></myapp> -->
    <div v-else>
      <v-btn @click="logout()" color="success">text</v-btn>
    </div>
  </v-app>
</template>

<script>
import firebase from "firebase";
import myapp from "./components/myapp";
import login from "./components/login";

export default {
  name: "App",
  components: {
    myapp,
    login
  },
  data() {
    return {
      loggedIn: Boolean,
      user: ""
    };
  },
  computed: {},
  methods: {
    login(email, password) {
      console.log(email);
      var self = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("app.vue says login button pressed");
          self.checkLoginState();
        })
        .catch(function(error) {
          self.loginError = error.message;
          console.log(error.message);
        });
    },
    logout() {
      var self = this;
      firebase
        .auth()
        .signOut()
        .then(function() {
          sessionStorage.clear();
          console.info("logged out");
          self.checkLoginState();
        })
        .catch(function(error) {
          self.logoutError = error;
          console.error(error);
          // An error happened.
        });
    },
    checkLoginState() {
      var user = firebase.auth().currentUser;
      if (user) {
        this.loggedIn = true;
        this.user = user;
      } else {
        this.loggedIn = false;
      }
    }
  },
  created() {
    console.info("app.vue created");
    var user = firebase.auth().currentUser;
    if (user) {
      this.loggedIn = true;
      this.user = user;
    } else {
      this.loggedIn = false;
    }
  },
  updated() {
    console.log("updated");
  }

  // var checkUser = firebase.auth().currentUser;

  // var session = sessionStorage.userloggedin;
  // if (checkUser) {
  //   this.user = firebase.auth().currentUser;
  //   this.email = this.user.email;
  //   sessionStorage.setItem("email", this.email);
  //   sessionStorage.setItem("userloggedin", true);
  //   this.isLoggedIn = JSON.parse(session);
  // } else {
  //   sessionStorage.setItem("userloggedin", false);
  //   this.isLoggedIn = JSON.parse(session);
  // }

  // if (sessionStorage.user) {
  //   this.user = sessionStorage.user;
  //   this.isLoggedIn = true;
  // if (sessionStorage.user) {
  //   this.isLoggedIn = true;
  //   this.user = sessionStorage.user;
  //   console.log(currUser + " is logged in");
  // } else {
  //   this.isLoggedIn = false;
  //   console.log("user is not logged in");
  // }

  // watch: {
  //   user(newName) {
  //     sessionStorage.user = newName;
  //     if (sessionStorage.user) {
  //       this.isLoggedIn = true;
  //     } else {
  //       this.isLoggedIn = false;
  //     }
  //   }
  // }
};
</script>
<style>
.bs::-webkit-scrollbar {
  display: none;
}
</style>
