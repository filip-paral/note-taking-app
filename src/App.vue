<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Noto+Sans+JP:wght@100;300;400;500;700;900&family=Ubuntu:wght@300;400;500;700&family=Roboto:wght@100;300;400;500;700;900&display=swap');

html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
