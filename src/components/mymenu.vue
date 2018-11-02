<template>
  <v-toolbar v-bind:class="{menu: !isMobileDevice}" app height="80" fixed color="vueblue">
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex v-if="isMobileDevice==false">
          <v-layout row wrap justify-start>

            <v-tooltip bottom>
              <template slot="activator">
                <v-btn large icon @click="$emit('changeDateYest', yest)">
                  <v-icon color="vuegreen" large>arrow_back</v-icon>
                </v-btn>
                <v-btn large icon @click="$emit('changeDateToday')">
                  <v-icon color="vuegreen" large>arrow_downward</v-icon>
                </v-btn>
                <v-btn large icon @click="$emit('changeDateYest', tom)">
                  <v-icon color="vuegreen" large>arrow_forward</v-icon>
                </v-btn>
              </template>
              <span>Change date viewing</span>
            </v-tooltip>
            <v-tooltip bottom>
              <v-btn slot="activator" large icon @click="$emit('newNote')">
                <v-icon color="low" large>fiber_new</v-icon>
              </v-btn>
              <span>Add new note</span>
            </v-tooltip>
          </v-layout>
        </v-flex>
        <v-flex xs1 class='mr-3'>
          <v-btn v-if="isMobileDevice==true" large icon @click="$emit('changeDateToday')">
            <v-icon color="vuegreen" large>arrow_downward</v-icon>
          </v-btn>
        </v-flex>

        <v-flex v-if="isMobileDevice==false">
          <v-layout row wrap class="mt-1" justify-center>
            <div style="minWidth: 150px; width: 100%">
              <v-autocomplete placeholder='Client Name' solo prepend-inner-icon="search" flat class="mx-3" @change="$emit('sentquery', newquery); clearQuery();" v-model="newquery" :items="names" item-text="name" :filter="customFilter"></v-autocomplete>
            </div>
          </v-layout>
        </v-flex>

        <v-flex v-if="isMobileDevice==true">
          <v-layout row wrap class="mt-1" justify-center>
            <div style="width: 100%">
              <v-autocomplete placeholder='Client Name' solo prepend-inner-icon="search" flat class="mx-3" @change="$emit('sentquery', newquery)" v-model="newquery" :items="names" item-text="name" :filter="customFilter"></v-autocomplete>
            </div>
          </v-layout>
        </v-flex>

        <v-flex v-if="isMobileDevice==false">
          <v-layout row wrap justify-end="">

            <v-btn round color="vuegreen" dark flat small @click="cam">
              Cam
            </v-btn>
            <!-- <v-btn round color="vuegreen" dark flat small @click="$emit('logout')">
              Log-Out
            </v-btn> -->
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-toolbar>

</template>

<script>
export default {
  name: "mymenu",

  props: {
    isMobileDevice: Boolean,
    query: "",
    names: "",
    customFilter: "",
    date: ""
  },

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
<style>
</style>
