<template>
  <div id="detail">
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from "./childComps/DetailNavBar";

export default {
  name: "detail",
  data() {
    return {
      iid: null
    };
  },
  components: {
    NavBar
  },
  
  created() {
    console.log(this.$route);
    this.iid = this.$route.params.iid;
  }
};
</script>

<style>
</style>