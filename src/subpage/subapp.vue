<template>
  <v-app id="body">
    <v-content>
      <v-btn @click="updatedFunc" color="success">{{updated}}</v-btn>

      <v-alert transition="scale-transition" type="success" icon="check_circle" :value="this.updated">
        {{this.updated}}
      </v-alert>
      <div>
        <span v-for="n in frequency" :key="n">
          <v-alert transition="scale-transition" type="success" icon="check_circle" :value="updated">
            {{n}}
          </v-alert>
        </span>
      </div>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "subapp",
  components: {},

  data() {
    return {
      updated: false,
      frequency: 1
    };
  },
  computed: {
    updatedComputation() {
      if (this.updated) {
        return "updated is true";
      }
      if (!this.updated) {
        return "updated is false";
      }
    }
  },
  methods: {
    updatedFunc() {
      this.updated = !this.updated;
      var count = this.frequency;
      if (count == 2 || count > 10 || count < 0) {
        count = 4;
        this.frequency = count;
      }
      if (count == 3) {
        count = 5;
        this.frequency = count;
        this.updated = true;
      } else {
        this.frequency = count + count;
      }
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  }
};
</script>
<style>
.myclass {
  width: 90vw;
}
.bs::-webkit-scrollbar {
  display: none;
}
</style>
