<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-views :recommends="recommends" />
    <feature-view />
    <tab-control
      class="tab-cotrol"
      :titles="['流行', '新款', '精选']"
      ref="tabControl"
      @itemClick="itemClick"
    ></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "content/tabControl/TabControl";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendViews from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import GoodsList from "./childComps/GoodsList";

import { getHomeMultidata, getHomeDate } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,

    HomeSwiper,
    RecommendViews,
    FeatureView,
    GoodsList
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
      ],
      goods: {
        pop: {
          page: 1,
          list: [
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing1.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            }
          ]
        },
        new: {
          page: 1,
          list: [
            {
              img: require("@/textPic/liuxing.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            }
          ]
        },
        sell: {
          page: 1,
          list: [
            {
              img: require("@/textPic/liuxing2.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing2.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing2.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing2.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing2.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing2.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing2.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            },
            {
              img: require("@/textPic/liuxing2.jpg"),
              title: "服装",
              price: "123",
              cfav: "55"
            }
          ]
        }
      },
      currentType: "pop"
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // this.getMultidata()
    // this.getHomeProducts(POP);
    // this.getHomeProducts(NEW);
    // this.getHomeProducts(SELL);
    // console.log(this.goods);
  },
  methods: {
    /*
      事件监听相关的
    */
    itemClick(index) {
      console.log(index);
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
    },
    /*
    网络请求相关方法
    */
    getMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommends.list;
      });
    },
    getHomeProducts(type) {
      getHomeDate(type, this.goods[type].page).then(res => {
        const goodsList = res.data.list;
        this.goodsList[type].list.push(...goodsList);
        this.goodsList[type].page += 1;
      });
    }
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
.tab-cotrol {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
