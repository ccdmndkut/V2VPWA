<template>
  <div>
    <v-app>
      <template>
        <login v-if="this.loggedin==false" @login="login" :loggedin="loggedin" :user="user"></login>
        <template v-if="this.loggedin==true">
          <transition name="fade">
            <maincont  @logout="logout" :user="user"></maincont>
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
      scrollBar: "none",
      user: "",
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
    },
  },
  methods: {
     login(e,p) {      
      firebase
        .auth()
        .signInWithEmailAndPassword(e, p)
        .then(() => {
          this.user = firebase.auth().currentUser;
          console.log("logged in");

        });
    },
    logout() {
      this.loading = true;
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.user = firebase.auth().currentUser;
          console.log("logged out");
          this.loggedin = false;
        });
    }
    // fbUser() {
    //   var $j = this;
    //   firebase.auth().onAuthStateChanged(function(a) {
    //     a ? ($j.user = a) : console.log("no user logged in");
    //     $j.loading = !1;
    //   });
    // }
  },
  created() {
    // console.log(firebase.auth().currentUser)
    // this.user = firebase.auth().currentUser;
    // var $j = this;
    // firebase.auth().onAuthStateChanged(function(a) {
    //   a ? ($j.user = a) : console.log("no user logged in");
    //   $j.loggedin = false;
    // });
  }
};
</script>
<style>
.bs::-webkit-scrollbar {
  display: none;
}
</style>

