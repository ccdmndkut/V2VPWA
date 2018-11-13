<template>
  <v-app>
    <myapp v-if="loggedIn" @logoutEvent="logout" :user="user"></myapp>
    <transition appear name="fade">
      <login :loginError="loginError" :loggedIn="loggedIn" @login="login" v-if="!loggedIn"></login>
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
  localStorage: {
    lsUser: {
      type: Object
    },
    lsLoggedIn: {
      type: Boolean
    }
  },
  components: {
    myapp,
    login
  },
  data() {
    return {
      user: {},
      loginError: String
    };
  },
  computed: {
    loggedIn() {
      let checker = Object.keys(this.user).length;
      if (checker === 0) {
        return false;
      }
      if (checker > 0) {
        return true;
      }
    }
  },
  methods: {
    login(email, password) {
      var self = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          var user = firebase.auth().currentUser;
          self.$localStorage.set("lsLoggedIn", true);
          this.user = self.$localStorage.set("lsUser", user);
        })
        .catch(function(error) {
          self.loginError = error;
          return;
        });
    },
    logout() {
      var self = this;
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.info("logged out from navbar");
          self.$localStorage.remove("lsUser");
          self.user = {};
        })
        .catch(function(error) {
          self.logoutError = error;
          self.$localStorage.remove("lsUser");
          self.user = {};
          console.error(error.message);
        });
    }
  },
  mounted() {
    console.info("app.vue mounted");
    this.loggedIn = this.$localStorage.get("lsLoggedIn");
    this.user = this.$localStorage.get("lsUser");
  },
  created() {
    // console.info("app.vue created");
    // this.loggedIn = this.$localStorage.get("lsLoggedIn");
    // this.user = this.$localStorage.get("lsUser");
  },

  updated() {
    // console.log("app.vue updated");
    // this.loggedIn = this.$localStorage.get("lsLoggedIn");
    // this.user = this.$localStorage.get("lsUser");
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
