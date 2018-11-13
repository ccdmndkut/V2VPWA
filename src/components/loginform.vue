<template>
  <form>
    <div :class="[clearedError ? bwoff :  bw]" class="form">
      <div :class="[clearedError ? erroff : err ]" id="err">{{myerr}}</div>
      <input @mousedown="clearError" required v-model="email" type="text" autocomplete="email" placeholder="username" />
      <input required @keydown.prevent.enter="login(email,  password)" autocomplete="current-password" v-model="password" type="password" placeholder="password" />
      <button @click.prevent="login">login</button>
    </div>
  </form>
</template>
<script>
export default {
  name: "loginform",
  props: ["loginError"],
  data() {
    return {
      email: "",
      password: "",
      form: "form",
      clearedError: true,
      err: "err",
      erroff: "erroff",
      bw: "bw",
      bwoff: "bwoff",
      myerr: ""
    };
  },
  computed: {
    loginerr() {
      return this.loginError.message;
    }
  },
  methods: {
    clearError() {
      this.clearedError = true;
      this.myerr = "";
    },
    login() {
      var email = this.email;
      var password = this.password;
      this.$emit("login", email, password);
      this.password = "";
      this.email = "";
      this.clearedError = false;
      this.myerr = this.loginerr;
    }
  },
  watch: {},
  created() {}
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.bw {
  filter: grayscale(1);
  filter: opacity(0.8);
}
.bwoff {
  filter: grayscale(0);
}
form {
  margin-top: 50vh;
  transform: translateY(-50%);
}
.err {
  position: absolute;
  bottom: 5px;
  color: red;
  word-wrap: break-word;
  width: 270px;
}

.erroff {
  display: none;
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
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: rgb(0, 96, 100);
  width: 100%;
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
  background: rgb(0, 96, 100, 0.9);
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
</style>
