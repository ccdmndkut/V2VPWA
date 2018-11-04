<template>
  <div id="body">
    <h1>
      loading

    </h1>
  </div>

</template>

<script>
export default {
  name: "loader",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400");

//Colors Variables
$primary: #5c6bc0; // blue
$success: #8bc34a; // green
$danger: #f44336; // red
$warning: #ffb74d; // yellow
$mainBgc: #03002e;
html,
#body {
  margin: 0;
  height: 100vh;
  background: #00787e; /* fallback for old browsers */
  background: -webkit-linear-gradient(right, #00787e, #00484b);
  background: -moz-linear-gradient(right, #00787e, #00484b);
  background: -o-linear-gradient(right, #00787e, #00484b);
  background: linear-gradient(to left, #00787e, #00484b);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

#body {
  font-family: "Open Sans";
}

h1 {
  text-align: center;
  color: white;
  font-size: 60px;
  font-weight: 300;
  margin-bottom: 30px;
}
</style>
