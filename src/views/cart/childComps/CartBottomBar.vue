<template>
  <div class="bottom-bar">
    <div class="checkAll">
      <CheckButton :is-checked="IsSelectAll" @click.native="checkClick"></CheckButton>
      <span>全选</span>
    </div>

    <div>合计: {{totalPrice}}</div>
    <div class="calculate">去计算: ({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      if (this.IsSelectAll) {
        this.$store.getters.cartList.forEach(i => (i.checked = false));
      } else {
        this.$store.getters.cartList.forEach(i => (i.checked = true));
      }
    }
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.getters.cartList.filter(i => i.checked).length;
    },
    IsSelectAll() {
      //filter 会遍历完 性能不会特别的高
      //   return !(this.$store.getters.cartList.filter(i => !i.checked).length)
      // 去学下用 some every
      if (this.$store.getters.cartList.length === 0) return false;
      return !this.$store.getters.cartList.find(i => !i.checked);
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  background-color: red;
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 49px;
  background-color: #eee;
  display: flex;
  line-height: 40px;
}
.checkAll {
  line-height: 20px;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 6px;
}
.checkAll span {
  margin-left: 5px;
  margin-right: 15px;
}
.calculate {
  position: absolute;
  width: 100px;
  background-color: var(--color-tint);
  text-align: center;
  color: #fff;
  right: 0;
}
</style>
