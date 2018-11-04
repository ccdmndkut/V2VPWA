<template>
  <div>
    <navbar></navbar>
    <v-content>
      <div v-if="!this.loading">
        <div v-for="(name, i) in tasks" :key="i">
          <v-chip>
            {{name.name}}
          </v-chip>
        </div>
      </div>
    </v-content>
  </div>

</template>
<script>
import firebase from "firebase";
import navbar from "./navbar";
export default {
  name: "maincont",
  components: {
    navbar
  },
  props: ["user"],
  data() {
    return {
      myemail: this.user.email,
      loading: true,
      tasks: ""
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
  },
  mounted() {
    // Binding Collections

    this.$binding("users", firebase.firestore().collection("trash")).then(
      users => {
        console.log(users); // => __ob__: Observer
        this.loading = false;
        this.tasks = users;
      }
    );
  }
};
</script>
<style scoped>
</style>