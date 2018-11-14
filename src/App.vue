<template>
  <v-app>
    <myapp v-if="loggedIn" @logoutEvent="logout" :user="user"></myapp>
    <login :loginError="loginError" :loggedIn="loggedIn" @login="login" v-if="!loggedIn"></login>
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
    console.log(this.$store.state.db);
  },

  updated() {}
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
