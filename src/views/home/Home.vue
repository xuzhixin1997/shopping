<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-views :recommends="recommends" />
    <feature-view />
    <tab-control class="tab-cotrol"  :titles="['流行', '新款', '精选']" ref="tabControl"></tab-control>
    <ul>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "content/tabControl/TabControl";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendViews from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    RecommendViews,
    FeatureView
  },
  data() {
    return {
      // result:null
      banners: [
        {
          image: require("@/textPic/ban1.jpg"),
          link: "aaa",
          height: 390,
          height923: 390,
          wdith: 750,
          wdith923: 750,
          image923: "@/textPic/ban1.jpg",
          title: "牛"
        },
        {
          image: require("@/textPic/ban2.jpg"),
          link: "aaa",
          height: 390,
          height923: 390,
          wdith: 750,
          wdith923: 750,
          image923: "@/textPic/ban1.jpg",
          title: "牛"
        },
        {
          image: require("@/textPic/ban3.jpg"),
          link: "aaa",
          height: 390,
          height923: 390,
          wdith: 750,
          wdith923: 750,
          image923: "@/textPic/ban1.jpg",
          title: "牛"
        },
        {
          image: require("@/textPic/ban4.jpg"),
          link: "aaa",
          height: 390,
          height923: 390,
          wdith: 750,
          wdith923: 750,
          image923: "@/textPic/ban1.jpg",
          title: "牛"
        }
      ],
      recommends: [
        {
          image: require("@/textPic/circle1.jpg"),
          link: "aaa",
          title: "一件特卖"
        },
        {
          image: require("@/textPic/circle1.jpg"),
          link: "aaa",
          title: "二件狂卖"
        },
        {
          image: require("@/textPic/circle1.jpg"),
          link: "aaa",
          title: "三件甩卖"
        },
        {
          image: require("@/textPic/circle1.jpg"),
          link: "aaa",
          title: "四件不卖"
        }
      ]
    };
  },
  created() {
    // getHomeMultidata().then(res=>{
    //   console.log(res)
    //   // this.result = res;
    //   this.banners = res.data.banner.list;
    //   this.recommends = res.data.recommends.list;
    // })
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-cotrol{
  position:sticky;
  top: 44px;
}
</style>
