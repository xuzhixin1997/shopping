<template>
  <div class="cart-list">
    <CartListItem v-for="(i,index) in cartList" :product="i" :key="index"></CartListItem>
  </div>
</template>

<script>
// import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    // Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  }
};
</script>

<style scoped>
</style>
