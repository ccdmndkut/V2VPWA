<template>
  <div>
    <maincont @logoutEvent="$emit('logoutEvent');" :user="user"></maincont>
  </div>
</template>

<script>
import maincont from "./maincont";

export default {
  name: "myapp",
  props: ["user"],
  components: {
    maincont
  },
  data() {
    return {
      scrollBar: "none"
    };
  },

  mounted() {
    console.log("myapp.vue mounted");
  },
  methods: {
    logoutEvent() {
      console.log("got logout event");
    },
    loginEvent() {
      // alert("myapp.vue says login event from login.vue");
      this.user = sessionStorage.user;
    }
  },
  created() {
    console.log("created my app");
  }
};
</script>
<style>
.bs::-webkit-scrollbar {
  display: none;
}
</style>
