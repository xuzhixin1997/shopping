<template>
  <div id="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{$store.state.cartList.length}})</div>
    </NavBar>

    <scroll class="content" ref="scroll">
      <CartList></CartList>
    </scroll>
    <CartBottomBar class="bottom-bar"></CartBottomBar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
#cart {
  position: relative;
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 600;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.bottom-bar {
}
</style>
