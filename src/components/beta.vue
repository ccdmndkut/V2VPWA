<template>
    <v-layout row wrap>
        <v-btn @click="$emit('update:beta', !beta)" round small flat color="grey" class='ver'>10/12 11.00</v-btn>
        <v-flex xs12>
            <v-alert type="success" :value="true">
                {{groupBy.Completed[myc].name}}
            </v-alert>
            <v-alert type="success" :value="true">
                {{groupBy.Completed[myc].notes}}
            </v-alert>
        </v-flex>
        <v-btn @click="counteradd" color="success">Plus</v-btn>
        <v-btn @click="counterm" color="success">Minus</v-btn>
    </v-layout>
</template>

<script>
export default {
  name: "beta",
  props: {
    db: "",
    beta: ""
  },
  data() {
    return {
      myc: 0
    };
  },
  computed: {
    groupBy: function() {
      var self = this;
      var objectArray = self.db;
      var property = "type";
      return objectArray.reduce(function(acc, obj) {
        var key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});
    }
  },
  methods: {
    counteradd() {
      this.myc++;
    },
    counterm() {
      this.myc--;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
