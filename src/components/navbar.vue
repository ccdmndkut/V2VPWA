<template>
  <v-toolbar height="70" app fixed color="vueblue">
    <div id="grid">
      <div id="left">
        <v-btn large icon @click="$emit('changeDateYest', yest)">
          <v-icon color="vuegreen" large>arrow_back</v-icon>
        </v-btn>
        <v-btn large icon @click="$emit('changeDateToday')">
          <v-icon color="vuegreen" large>arrow_downward</v-icon>
        </v-btn>
        <v-btn large icon @click="$emit('changeDateYest', tom)">
          <v-icon color="vuegreen" large>arrow_forward</v-icon>
        </v-btn>
        <v-btn large icon @click="$emit('newNote')">
          <v-icon color="low" large>fiber_new</v-icon>
        </v-btn>
      </div>
      <div v-if="loading" id="mid">
        <v-autocomplete id="searchBar" loading placeholder='Loading' solo prepend-inner-icon="search" flat class="mx-3" disabled></v-autocomplete>
      </div>
      <div v-if="!loading" id="mid">
        <v-autocomplete id="searchBar" placeholder='Client Name' solo prepend-inner-icon="search" flat class="mx-3" @change="$emit('sentquery', newquery)" v-model="newquery" :items="names" item-text="name"></v-autocomplete>
      </div>
      <div id="right">
        <v-btn round color="vuegreen" dark flat small @click="cam">
          cam
        </v-btn>
        <v-btn round color="vuegreen" dark flat small @click="$emit('logoutEvent')">
          Logout </v-btn>
      </div>
    </div>
  </v-toolbar>

</template>
<script>
import firebase from "firebase";
export default {
  name: "navbar",
  props: ["db", "loading"],
  data() {
    return {
      newquery: "",
      isLoggedIn: "",
      user: ""
    };
  },
  methods: {
    cam() {
      console.log("cam pressed");
    },
    logout() {
      this.isLoggedIn = false;
      firebase
        .auth()
        .signOut()
        .then(function() {
          window.sessionStorage.clear();
          console.log("logged out");
        })
        .catch(function(error) {
          console.log(error);
          // An error happened.
        });
    },
    compare(a, b) {
      const nameA = a.name;
      const nameB = b.name;
      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    }
  },
  created() {
    this.user = window.sessionStorage.user;
    if (this.user) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    console.log("created navbar");
  },
  mounted() {
    console.log("navbar mounted");
  },
  computed: {
    names() {
      var array = this.db;
      const unique = [...new Set(array.map(item => item.name))];
      var mapped = unique.map(item => ({
        key: item,
        name: item
      }));
      mapped.sort(this.compare);
      return mapped;
    }
  }
};
</script>
<style scoped>
#grid {
  display: grid;
  grid-template-columns: 1fr repeat(3, 25vw) 1fr;
  align-items: center;
  justify-self: center;
  width: 100%;
}
#left {
  grid-column: 2 / span 1;
  justify-self: left;
}
#mid {
  margin-top: 8px;

  grid-column: 3 / span 1;
  justify-self: center;
  max-width: 400px;
}
#right {
  grid-column: 4 / span 1;
  justify-self: right;
}
@media only screen and (max-width: 900px) {
  #grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 100%;
  }
  #left {
    grid-column: 1 / span 1;
    justify-self: center;
  }
  #mid {
    margin-top: 8px;
    grid-column: 2 / span 1;
    justify-self: center;
    max-width: 400px;
  }
  #right {
    display: none;
  }
}
</style>
