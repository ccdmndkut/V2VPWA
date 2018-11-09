<template>
  <v-app id="body">
    <v-content>
      <v-container>
        <v-layout justify-center>
          <v-flex justify-center=text-xs-center xs5>
            <Box class="box" :pose="isVisible ? 'visible' : 'hidden'" />
            <v-alert id="warning" type="warning" :value="true" class="display-1">
              You should not be here. Leave NOW!!!
            </v-alert>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import posed from "vue-pose";
export default {
  name: "subapp",
  components: {
    Box: posed.div({
      visible: {
        opacity: 1,
        transition: { duration: 20 }
      },
      hidden: { opacity: 0 }
    })
  },

  data() {
    return {
      isVisible: false
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {
    setInterval(() => {
      this.isVisible = !this.isVisible;
    }, 1000);
  }
};
</script>
<style>
body {
}

.box {
  width: 100px;
  height: 100px;
  background: #54e365;
}
#warning {
  color: black;
}
.bs::-webkit-scrollbar {
  display: none;
}
</style>
