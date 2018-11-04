<template>
  <v-app>
    <v-content id="body">
      <div class="login-page">
        <div class="form">
          <div class="login-form">
            <div id="err">{{errM}}</div>
            <input v-bind:class="{ active: isActive }" @blur="isActive=false" @focus="isActive=true" v-model="email" type="text" placeholder="username" />
            <input v-bind:class="{ active: isActiveb }" @blur="isActiveb=false" @focus="isActiveb=true" @keydown.enter="login()" v-model="password" type="password" placeholder="password" />
            <!-- <button @click.prevent="$emit('fire')">login</button> -->
            <button @click.prevent="login()">login</button>
            <button @click="logout()">logout</button>
          </div>
        </div>
      </div>
    </v-content>
  </v-app>

</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      user: {},
      email: "chriscombs@vaclaims.net",
      password: "",
      errC: "",
      errM: "",
      isActive: false,
      isActiveb: false,
      err: ""
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          alert("logged out");
        })
        .catch(function(error) {
          this.err = error;
          // An error happened.
        });
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => this.logmein());
    },
    logmein() {
      const user = firebase.auth().currentUser;
      this.user = user;
      this.$emit("fire");
    }
  },
  computed: {},
  created() {},
  props: {}
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
#err {
  position: absolute;
  top: 235px;
  color: red;
}
#email {
  position: absolute;
  top: 250px;
  color: red;
}
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 96%;
  display: block;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  transition: 300ms;
}
.active {
  border-radius: 25px;
}

.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #006064;
  width: 40%;
  margin: 5px;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4caf50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #ef3b3a;
}
#body {
  background: #00787e; /* fallback for old browsers */
  background: -webkit-linear-gradient(right, #00787e, #00484b);
  background: -moz-linear-gradient(right, #00787e, #00484b);
  background: -o-linear-gradient(right, #00787e, #00484b);
  background: linear-gradient(to left, #00787e, #00484b);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
</style>