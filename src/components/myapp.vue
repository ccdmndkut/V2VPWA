<template>
  <div>

    <!-- <maincont v-else @logoutEvent='logoutEvent()'></maincont> -->
  </div>
</template>

<script>
// import maincont from "./maincont";
import maincont from "./maincont";

export default {
  name: "myapp",
  components: {
    maincont
    // maincont
  },

  data() {
    return {
      scrollBar: "none"
    };
  },
  mounted() {
    console.log("myapp.vue mounted");
  },
  watch: {
    // user(newName) {
    //   if (!newName) {
    //     this.isLoggedIn = false;
    //   } else {
    //     this.isLoggedIn = true;
    //   }
    // }
  },
  methods: {
    logoutEvent() {
      console.log("got event");
      sessionStorage.clear();
      this.user = sessionStorage.user;
    },
    loginEvent() {
      // alert("myapp.vue says login event from login.vue");
      this.user = sessionStorage.user;
    }
  },
  created() {
    // this.isLoggedIn = sessionStorage.getItem("userloggedin");
    console.log("created my app");
    // this.user = window.sessionStorage.user;
    // if (this.user) {
    //   this.isLoggedIn = true;
    //   this.user = window.sessionStorage.user;
    // } else {
    //   this.isLoggedIn = false;
    // }
  }
  // computed: {
  //   loggedinold() {
  //     if (this.user) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // },
};
</script>
<style>
.bs::-webkit-scrollbar {
  display: none;
}
</style>
