<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg3>
          <v-card class="elevation-12">
            <v-toolbar  color="#BBE6FE">
              <v-toolbar-title>V2V Login</v-toolbar-title>
              <v-spacer></v-spacer>
              <img src="https://png.icons8.com/windows/30/password.png">
            </v-toolbar>
            <v-card-text class='pb-1'>
              <v-form>
                <v-layout justify-space-around="" row wrap>
                  <v-flex xs1>
                    <img class='myicon' src="https://png.icons8.com/office/40/ffffff/administrator-male.png">
                  </v-flex>
                  <v-flex xs10>
                    <v-text-field class='ml-2' color="#4B75B2" autofocus autocomplete @keyup.enter="login" v-model="email" required name="login" label="Email" type="email"></v-text-field>
                  </v-flex>
                </v-layout>
                      <v-layout justify-space-around="" row wrap>
                  <v-flex xs1>
                   <img class='myicon'  src="https://png.icons8.com/dusk/40/ffffff/lock-2.png">
                  </v-flex>
                  <v-flex xs10>
                     <v-text-field class='ml-2' color="#4B75B2" @keyup.enter="login" autocomplete v-model="mypass" type="password" required name="password" label="Password"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-layout justify-space-between class='ml-2 mb-2'>
                <v-flex xs12>
                  <v-btn class='mr-2' dark v-on:click="login"  small color="#4B75B2">
                    Login</v-btn>
                  <v-btn v-on:click="logout" dark small color="#4B75B2">
                    Logout</v-btn>
                </v-flex>

              </v-layout>
            </v-card-actions>
            <!-- <v-btn @click="$emit('sentpass', mypass)" small color="primary">
            Submit</v-btn> -->

          </v-card>

        </v-flex>
      </v-layout>

    </v-container>

  </v-content>

</template>

<script>
var moment = require("moment");
import firebase from "firebase";
export default {
  name: "login",
  methods: {
    logout: function(e) {
      firebase
        .auth()
        .signOut()
        .then(
          user => {
            alert(user);
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    },
    login: function(e) {
      var i = this.email;
      var t = moment().format("h:mm");
      firebase
        .auth()
        .signInWithEmailAndPassword(i, this.mypass)
        .then(
          user => {
            if (user.user) {
              window.sessionStorage.setItem("emailForSignIn", i);
              window.sessionStorage.setItem("logintime", t);
              console.log(t);
              this.$emit("fire", i);
              window.location.reload(true);
            }
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    },
    onClickButton() {
      this.$emit("sentpass", this.mypass);
    }
  },
  created() {
    this.email = window.sessionStorage.getItem("emailForSignIn");
    var email = this.email;
    console.log(email);
    if (!email) {
      this.$emit("lock");
    }
    if (
      this.email == "chriscombs@vaclaims.net" ||
      this.email == "denvercombs@vaclaims.net"
    ) {
      this.$emit("fire", this.email);
    }
  },
  props: {
    pass: String
  },
  data() {
    return {
      myuser: "",
      email: "",
      mypass: ""
    };
  }
};
</script>
<style>
.myicon {
  padding-top: 10px;
}
</style>
