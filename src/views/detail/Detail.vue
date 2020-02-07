<template>
  <div id="detail" class="detail">
    <nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-image="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo ref="params" :param-info="paramInfo"></DetailParamInfo>
      <DetailCommentInfo ref="comment" :comment-info="commentInfo"></DetailCommentInfo>
      <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    </scroll>
    <detail-buttom-bar @addCart="addToCart"></detail-buttom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
// import DetailBottomBar from './childComps/DetailBottomBar'
import GoodsList from "components/content/goods/GoodsList";
import DetailButtomBar from "./childComps/DetailBottomBar";
import { itemListenerMixin, backTopMixin } from "@/common/mixin";

import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { debounce } from "@/common/utils";

// 测试数据
// import {detailBanner} from '@/textshuju/detailBanner'

export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  components: {
    NavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailButtomBar,
    GoodsList,
    Scroll
  },

  created() {
    // console.log(detailBanner)
    // console.log(this.$route);
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then(res => {
      // console.log("请求到数据")
      // console.log(res);
      const data = res.result;
      this.topImage = data.itemInfo.topImages;

      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
        // console.log(this.commentInfo);
      }

      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
      });
      this.$nextTick(() => {});
    });
    // 3. 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  updated() {
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
  },
  mounted() {},
  methods: {
    imageLoad() {
      // console.log("aaa");
      this.$refs.scroll.refresh();
      // this.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      const positionY = -position.y;
      // console.log(positionY);

      let length = this.themeTopYs.length;

      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isShowBackTop = -position.y > 1000;
      // for (let i = 0; i < length; i++) {
      //   if (
      //     (this.currentIndex !== i &&
      //       i < length - 1 &&
      //         positionY >= this.themeTopYs[i] &&
      //         positionY < this.themeTopYs[i + 1]) ||
      //     (i === length - 1 && positionY >= this.themeTopYs[i])
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
    },
    addToCart() {
      console.log("aaaaa");
    }
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  /*detail页面盖住下面的导航栏*/
  position: relative;
  z-index: 11;
  background-color: #fff;

  height: 100vh;
}

/*Scroll需要指定content高度*/
.content {
  height: calc(100% - 44px - 58px);
}

/*滚动时盖住顶部导航栏了 修改*/
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
</style>