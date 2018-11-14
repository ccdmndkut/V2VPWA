<template>
  <v-app>
    <div>{{ user.email }}</div>
  </v-app>
</template>
<script>
import firebase from "firebase";
export default {
  name: "home",
  props: ["user"],
  data() {
    return {
      me: this.user.email
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.user = {};
          alert("logged out");
        });
    }
  },
  computed: {
    userLength() {
      var u = this.user;
      if (this.user) {
        return Object.keys(u);
      } else {
        return 0;
      }
    }
  }
};
</script>
<style scoped></style>
