<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center> <v-flex> test </v-flex> </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
