<template>
  <div id="detail" >
    <!-- <div>{{$store.state.cartList}}</div> -->
    <nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-image="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo ref="params" :param-info="paramInfo"></DetailParamInfo>
      <DetailCommentInfo ref="comment" :comment-info="commentInfo"></DetailCommentInfo>
      <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    </scroll>
    <!-- <detail-buttom-bar @addCart="addToCart"></detail-buttom-bar> -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-buttom-bar @addCart="addToCart"></detail-buttom-bar>
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

import { mapActions } from "vuex";

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
      // topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      topImages: []
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
      this.topImages = data.itemInfo.topImages;

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
      this.detailInfo = data.detailInfo;
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
    // 映射
    ...mapActions({
      addCart: "addCart"
    }),

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
      // console.log("aaaaa");
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // product.count = 1;

      this.addCart(product).then(res => {
        console.log(res);
        this.$toast.show(res, 2000);
      });

      // this.$store.dispatch('addCart', product).then(res=>{
      //   console.log(res)
      // })
      // this.$store.commit('addCart', product)
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
  z-index: 19;
  background-color: #f2f2f2;
  height: 100vh;
}

/*Scroll需要指定content高度*/
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

</style>