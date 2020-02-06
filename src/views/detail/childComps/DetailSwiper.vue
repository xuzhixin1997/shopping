<template>
  <div class="detail-swiper">
    <swiper class="swiper1"> 
      <swiper-item v-for="(item, index) in topImage" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "common/swiper";

export default {
  name: 'DetailSwiper',
  props:{
    topImage:{
      type: Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style>
.swiper1{
  height: 300px;
  overflow: hidden;
}
</style>