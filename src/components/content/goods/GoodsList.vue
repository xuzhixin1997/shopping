<template>
  <div class="goods">
    <!--    <div v-for="item in goods">{{item}}</div>-->
    <goods-list-item v-for="item in goods" :goodsItem="item" :key="item.label"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsLIst",
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
  },
  
};
</script>

<style scoped>
.goods {
  display: flex;
  /*选择包裹 根据内部组件的宽度显示合适的组件个数*/
  /*小组件设置了宽度*/
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>