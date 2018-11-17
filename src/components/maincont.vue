<template>
  <div>
    <navbar @logoutEvent="$emit('logoutEvent')" :loading='loading' app @logout=" logout" @sentquery="makequery" :db="db"> </navbar>
    <v-content>
      <v-container fluid>
        <div v-if="loading" class="text-xs-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <template v-if="!loading">
          <div v-for="item in db" :key="item['.key']">
            <listitem @deleteNote='deleteNote' :loading="loading" :item="item"></listitem>
          </div>
        </template>
      </v-container>
    </v-content>
  </div>

</template>
<script>
import firebase from "firebase";
import navbar from "./navbar";
import listitem from "./listitem";
import { db } from "../main";

export default {
  name: "maincont",
  props: ["user"],
  components: {
    navbar,
    listitem
  },
  data() {
    return {
      db: [],
      query: "",
    };
  },
  firestore() {
    return {
      db: db
    };
  },
  methods: {
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
      const result = this.db.filter(client => client.name === this.query);
      result.sort(this.compareD);
      this.db = result;
    },
    dateFunc() {
      const result = this.db.filter(client => client.date === this.date);
      result.sort(this.compareP);
      this.db = result;
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
    loading() {
if (this.db.length > 1) {
  return false
} else {
  return true
}
    },
    currentUser() {
      return this.user.email;
    },
    userdbdef() {
      if (this.currentUser == "chriscombs@vaclaims.net") {
        return {
          tasks: "tasks",
          client: "clients",
          trash: "trash"
        };
      }
      if (this.currentUser == "denvercombs@vaclaims.net") {
        return {
          tasks: "denver",
          client: "clientsdlc",
          trash: "trash"
        };
      }
    }
  },
  updated() {
    console.log("maincont.vue updated");
  },
  destroyed() {
    console.log("maincont.vue destroyed");
  },
  mounted() {
    // var useremail = firebase.auth().currentUser.email;
    // this.currentUser = useremail;
    // var db = this.userdbdef.trash;
    // this.fs(db);
    // console.log("maincont.vue mounted");
  }
};
</script>
<style scoped>
</style>
