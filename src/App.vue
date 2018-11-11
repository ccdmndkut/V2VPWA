<template>
  <v-app>
    <login @login="login" v-if="!loggedIn"></login>
    <myapp @logoutEvent="logout" :user="user" v-else></myapp>
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
          localStorage.setItem("loggedin", true);
          self.loggedIn = true;
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
          console.info("logged out from navbar");
          self.checkLoginState();
        })
        .catch(function(error) {
          self.logoutError = error;
          console.error(error);
          // An error happened.
        });
    },
    checkLoginState() {
      console.log("app.vue checking login state");
      var user = this.user;
      this.user = firebase.auth().currentUser;
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
  },
  mounted() {
    console.info("app.vue mounted");
    this.checkLoginState();
  },
  created() {
    console.info("app.vue created");
    this.checkLoginState();
  },
  updated() {
    console.log("app.vue updated");
    var user = this.user;

    if (user) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
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
.fade {
  animation: 1.5s linear 0s infinite alternate fade;
}

@keyframes fade {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}
.bs::-webkit-scrollbar {
  display: none;
}
</style>
