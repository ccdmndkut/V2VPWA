<template>
  <div>
    <navbar app @logout="logout"> </navbar>
    <v-content>
      <v-container fluid>
        <template v-if="!loading">
          <v-btn @click="switchdb" color="success">text</v-btn>
          <div v-for="(name, i) in tasks" :key="i">
            <v-chip @click="tasks.pop()">
              {{i +1}}. {{name.name}}
            </v-chip>
          </div>
        </template>
      </v-container>
    </v-content>
  </div>

</template>
<script>
import firebase from "firebase";
import firestore from "./firebaseInit";

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
      tasks: "",
      db: "trash"
    };
  },
  methods: {
    fs(i) {
      this.loading = true;
      this.$binding("users", firebase.firestore().collection(i)).then(users => {
        console.log("got db"); // => __ob__: Observer
        this.loading = false;
        // this.$emit("loadingTrigger", false);
        this.tasks = users;
      });
    },
    switchdb() {
      this.loading = true;

      if (this.db == "trash") {
        this.db = "clients";
      } else {
        this.db = "trash";
      }
      this.fs(this.db);
    },
    logout() {
      this.$emit("logout");
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
  // firestore() {
  //   return {
  //     persons: {
  //       // collection reference.
  //       ref: firestore.collection(this.db),
  //       // Bind the collection as an object if you would like to.
  //       objects: false,
  //       resolve: data => {
  //         this.tasks = data;
  //         this.loading = false;
  //       },
  //       reject: err => {
  //         console.log(err);
  //       }
  //     }
  //   };
  // }
  mounted() {
    this.fs("clients");
  }
};
</script>
<style scoped>
</style>