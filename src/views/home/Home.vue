<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      ref="tabControl1"
      @itemClick="itemClick"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-views :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" ref="tabControl2" @itemClick="itemClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 监听组件原生事件时，要用.native -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";
// import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendViews from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultidata, getHomeDate } from "network/home";

import { itemListenerMixin, backTopMixin } from "@/common/mixin";

import { debounce } from "@/common/utils";
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    Scroll,
    HomeSwiper,
    RecommendViews,
    FeatureView,
    GoodsList
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      // result:null
      banners: [
        {
          image: require("@/textPic/home/ban1.jpg"),
          link: "aaa",
          height: 390,
          height923: 390,
          wdith: 750,
          wdith923: 750,
          image923: "@/textPic/home/ban1.jpg",
          title: "牛"
        },
        {
          image: require("@/textPic/home/ban2.jpg"),
          link: "aaa",
          height: 390,
          height923: 390,
          wdith: 750,
          wdith923: 750,
          image923: "@/textPic/home/ban1.jpg",
          title: "牛"
        },
        {
          image: require("@/textPic/home/ban3.jpg"),
          link: "aaa",
          height: 390,
          height923: 390,
          wdith: 750,
          wdith923: 750,
          image923: "@/textPic/home/ban1.jpg",
          title: "牛"
        },
        {
          image: require("@/textPic/home/ban4.jpg"),
          link: "aaa",
          height: 390,
          height923: 390,
          wdith: 750,
          wdith923: 750,
          image923: "@/textPic/home/ban1.jpg",
          title: "牛"
        }
      ],
      recommends: [
        {
          image: require("@/textPic/home/circle1.jpg"),
          link: "aaa",
          title: "一件特卖"
        },
        {
          image: require("@/textPic/home/circle1.jpg"),
          link: "aaa",
          title: "二件狂卖"
        },
        {
          image: require("@/textPic/home/circle1.jpg"),
          link: "aaa",
          title: "三件甩卖"
        },
        {
          image: require("@/textPic/home/circle1.jpg"),
          link: "aaa",
          title: "四件不卖"
        }
      ],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    this.getMultidata();
    this.getHomeProducts("pop");
    this.getHomeProducts("new");
    this.getHomeProducts("sell");
    // console.log(this.goods);
  },
  mounted() {
    // 监听item图片加载
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
    const refresh = debounce(this.$refs.scroll.refresh, 200);
  },
  activated() {

    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();

  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();


    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    /*
      事件监听相关的
    */

    // debounce(func, delay) {
    //   let timer = null;
    //   return function(...args) {
    //     if (timer) clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       func.apply(this, args);
    //     }, delay);
    //   };
    // },
    itemClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // console.log("aaaa", this.$refs.tabControl2.$el.offsetTop)
      this.$refs.scroll.scrollTo(0, -this.$refs.tabControl2.$el.offsetTop, 0);
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // backtop() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },
    contentScroll(position) {
      // console.log(position)
      // 判断Tabtop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 判断tabControl是否吸顶(position: fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // console.log("上啦加载更多");
      this.getHomeProducts(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.$refs.tabControl2.$el.offsetTop);
    },
    /*
    网络请求相关方法
    */
    getMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 因为没法拿到接口，数据写死，所以先不调用
    getHomeProducts(type) {
      const page = this.goods[type].page + 1;
      getHomeDate(type, page).then(res => {
        // console.log(res);
        // 将网络请求得到都数组塞到 定义的新数组中 保留数据
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control {
  position: relative;
  z-index: 9;
  padding-top: 0;
  background-color: #f6f6f6;
}
/* .tab-cotrol {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  /* height: 300px; */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
