<template>
  <v-content class="body ">
    <transition appear name="form">
      <loginform v-if="!loggedIn" @login="login" />
    </transition>
  </v-content>
</template>
<script>
import firebase from "firebase";
import loginform from "./loginform";
export default {
  name: "login",
  components: {
    loginform
  },
  data() {
    return {
      loggedIn: false
    };
  },
  computed: {},
  methods: {
    login(email, password) {
      this.loggedIn = true;
      this.$emit("login", email, password);
    }
  },
  watch: {},
  computed: {}
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.form-enter {
  filter: blur(25px) sepia(1);
  opacity: 0;
}
.form-leave-to {
  filter: blur(25px);
  opacity: 0;
}
.form-leave,
.for-enter-to {
  opacity: 1;
}
.form-enter-active,
.form-leave-active {
  transition: all 1000ms;
}

.body {
  height: 100vh;
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
