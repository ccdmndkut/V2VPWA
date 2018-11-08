<template>
  <div>
    <navbar :loading='loading' app @logout="logout" @sentquery="makequery" :db="db"> </navbar>
    <v-content>
      <v-container fluid>
        <div v-if="loading" class="text-xs-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <template v-if="!loading">
          <div v-for="(item, i) in db.tasks" :key="i">
            <listitem @deleteNote='deleteNote' :loading="loading" :item="item"></listitem>
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
      loading: true,
      query: "",
      db: {
        tasks: "",
        main: ""
      }
    };
  },
  methods: {
    fs(i) {
      var a = this;
      this.$binding("tasks", firebase.firestore().collection(i)).then(function(
        b
      ) {
        console.log("got db");
        a.db.tasks = b;
        a.db.main = b;
        a.loaded();
      });
    },
    loaded() {
      this.loading = false;
    },
    logout() {
      this.$emit("logout");
    },
    makequery(sentquery) {
      this.query = sentquery;
      this.searchFunc();
    },
    searchFunc() {
      const result = this.db.main.filter(client => client.name === this.query);
      result.sort(this.compareD);
      this.db.tasks = result;
    },
    dateFunc() {
      const result = this.db.main.filter(client => client.date === this.date);
      result.sort(this.compareP);
      this.db.tasks = result;
    },
    compareP: function(a, b) {
      const nameA = a.priority;
      const nameB = b.priority;
      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    },
    deleteNote(item) {
      console.log("deleted");
      console.log(JSON.parse(JSON.stringify(item)));
      // this.$firestore.tasks.doc(item[".key"]).delete();
    }
  },
  computed: {
    currentUser() {
      return this.user;
    },

    userdbdef() {
      if (this.currentUser == "chriscombs@vaclaims.net") {
        return {
          tasks: "tasks",
          client: "clients",
          trash: "trash"
        };
      } else if (this.currentUser == "denvercombs@vaclaims.net") {
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
