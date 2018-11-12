<template>
  <v-app>

    <myapp v-if="loggedIn==true" @logoutEvent="logout" :user="user"></myapp>
    <transition appear name="fade">
      <login @login="login" v-if="!user"></login>
    </transition>
    <!-- <div v-else>
      <v-btn @click="logout()" color="success">text</v-btn>
    </div> -->
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
  computed: {
    currentUser() {
      return firebase.auth().currentUser.email;
    }
  },
  methods: {
    login(email, password) {
      console.log(email);
      var self = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log("app.vue says login button pressed");
          localStorage.setItem("loggedin", true);
          setTimeout(self.checkLoginState, 2000);
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
          console.info("logged out from navbar");
          console.log("timeout start");
          setTimeout(self.checkLoginState, 2000);
        })
        .catch(function(error) {
          self.logoutError = error;
          console.error(error);
          // An error happened.
        });
    },
    checkLoginState() {
      console.log("app.vue checking login state");
      this.user = firebase.auth().currentUser;
      var user = this.user;
      if (user) {
        console.log("checkloginstate found true");
        this.loggedIn = true;
      } else {
        console.log("checkloginstate found false");
        this.loggedIn = false;
      }
    }
  },
  mounted() {
    if (this.currentUser) {
      this.user = this.currentUser;
      this.loggedIn = true;
      console.log("app.vue updated method checked user value and found true");
    } else {
      this.loggedIn = false;
      console.log("app.vue updated method checked user value and found false");
    }
    console.info("app.vue mounted");
    // this.checkLoginState;
  },
  created() {
    console.info("app.vue created");
    this.checkLoginState;
  },
  updated() {
    this.checkLoginState;
    console.log("app.vue updated");
    var user = this.user;
    if (user) {
      this.loggedIn = true;
      console.log("app.vue updated method checked user value and found true");
    } else {
      this.loggedIn = false;
      console.log("app.vue updated method checked user value and found false");
    }
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
.fade-enter {
  filter: grayscale(1);
  opacity: 0;
}
.fade-leave-to {
  filter: grayscale(1);
}
/* .fade-leave,
.for-enter-to {
} */
.fade-enter-active,
.fade-leave-active {
  transition: all 2000ms;
}

.bs::-webkit-scrollbar {
  display: none;
}
</style>
