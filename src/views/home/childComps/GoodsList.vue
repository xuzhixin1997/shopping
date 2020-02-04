<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.page" :goodsItem="item"></goods-list-item>
  </div>
</template>

<script>
// 显示商品详细信息
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-around;
    padding: 2px;
  }
</style>