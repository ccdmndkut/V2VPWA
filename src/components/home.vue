<template>
    <div>

    </div>
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
  }
};
</script>
<style scoped>
</style>