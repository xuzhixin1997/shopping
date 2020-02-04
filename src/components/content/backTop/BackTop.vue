<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
// 滚回顶部按钮封装
export default {
  name:"BackTop"
}
</script>

<style>
  .backtop{
    position: fixed;
    right: 10px;
    bottom: 55px;
  }
  .backtop img{
    width: 43px;
    height: 43px;
  }
</style>