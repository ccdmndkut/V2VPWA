<template>
  <div>
    <v-app>
      <login v-if="this.loggedin==false" @login="login" :loggedin="loggedin" :user="user"></login>
      <div v-if="this.loggedin==true">
        <maincont @logout="logout" :user="user"></maincont>
      </div>

    </v-app>
  </div>
</template>

<script>
import firebase from "firebase";
import firestore from "./firebaseInit";
import maincont from "./maincont";
import login from "./login";

export default {
  name: "myapp",
  components: {
    login,
    maincont
  },
  data() {
    return {
      scrollBar: "none",
      user: "",
      loggedin: true
    };
  },
  // computed: {
  //   loggedinold() {
  //     if (this.user) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // },
  methods: {
    login(e, p) {
      firebase
        .auth()
        .signInWithEmailAndPassword(e, p)
        .then(() => {
          var storeduser = firebase.auth().currentUser.email;
          window.sessionStorage.setItem("user", storeduser);
          this.user = storeduser;
          console.log("logged in as " + this.user);
          if (this.user) {
            this.loggedin = true;
          }
        });
    },
    logout() {
      this.loading = true;
      this.loggedin = false;
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
  mounted() {
    if (this.user) {
      console.log("user true");
      this.loggedin = true;
    } else {
      console.log("user false");
      this.loggedin = false;
    }
  }
};
</script>
<style>
.bs::-webkit-scrollbar {
  display: none;
}
</style>
