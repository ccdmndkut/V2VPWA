<template>
  <div>

    <myapp></myapp>

  </div>
</template>

<script>
import myapp from "./components/myapp";
export default {
  name: "App",
  components: {
    myapp
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {}
};
</script>
<style>
.bs::-webkit-scrollbar {
  display: none;
}
</style>
