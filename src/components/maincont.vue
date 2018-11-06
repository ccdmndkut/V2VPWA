<template>
  <div>
    <navbar app @logout="logout"> </navbar>
    <v-content>
      <v-container fluid>
        <div v-if="loading" class="text-xs-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <template v-if="!loading">
          <div v-for="(item, i) in db.tasks" :key="i">
            <listitem :loading="loading" :item="item"></listitem>
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
import listitem from "./listitem";

export default {
  name: "maincont",
  components: {
    navbar,
    listitem
  },
  props: ["user"],
  data() {
    return {
      myemail: this.user.email,
      loading: Boolean,
      db: {
        tasks: ""
      }
    };
  },
  methods: {
    fs(i) {
      var a = this;
      this.loading = !0;
      this.$binding("tasks", firebase.firestore().collection(i)).then(function(
        b
      ) {
        console.log("got db");
        a.db.tasks = b;
        a.loaded();
      });
    },
    loaded() {
      this.loading = false;
    },
    logout() {
      this.$emit("logout");
    }
  },
  computed: {
    dblength() {
      return this.tasks.length;
    },
    userdbdef() {
      let user = this.user.email;
      if (user == "chriscombs@vaclaims.net") {
        return {
          tasks: "tasks",
          client: "clients",
          trash: "trash"
        };
      } else if (user == "denvercombs@vaclaims.net") {
        return {
          tasks: "denver",
          client: "clientsdlc",
          trash: "trash"
        };
      }
    }
  },
  mounted() {
    var db = this.userdbdef.trash;
    this.fs(db);
  }
};
</script>
<style scoped>
</style>