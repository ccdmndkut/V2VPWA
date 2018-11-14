<template>
  <v-toolbar height="70" app fixed color="vueblue">
    <div id="grid">
      <div id="left">
        <v-btn large icon @click="$emit('changeDateYest', yest);">
          <v-icon color="vuegreen" large>arrow_back</v-icon>
        </v-btn>
        <v-btn large icon @click="$emit('changeDateToday');">
          <v-icon color="vuegreen" large>arrow_downward</v-icon>
        </v-btn>
        <v-btn large icon @click="$emit('changeDateYest', tom);">
          <v-icon color="vuegreen" large>arrow_forward</v-icon>
        </v-btn>
        <v-btn large icon @click="$emit('newNote');">
          <v-icon color="low" large>fiber_new</v-icon>
        </v-btn>
      </div>
      <div id="mid">
        <v-autocomplete
          id="searchBar"
          placeholder="Client Name"
          solo
          prepend-inner-icon="search"
          flat
          class="mx-3"
          @change="
            $emit('sentquery', newquery);
            clearQuery();
          "
          v-model="newquery"
          :items="names"
          item-text="name"
          :filter="customFilter"
        ></v-autocomplete>
      </div>
      <div id="right">
        <v-btn round color="vuegreen" dark flat small @click="cam">
          {{ clock }}
        </v-btn>
      </div>

      <!--
        <v-btn round color="vuegreen" dark flat small @click="$emit('logout')">
           Log-Out
         </v-btn>
      -->
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: "mymenu",
  props: ["isMobileDevice", "query", "names", "customFilter", "date", "clock"],
  data() {
    return {
      newquery: "",
      yest: -1,
      tom: 1
    };
  },
  methods: {
    clearQuery() {
      this.newquery = "";
    },
    cam() {
      window.open("https://v2vcam.netlify.com");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
