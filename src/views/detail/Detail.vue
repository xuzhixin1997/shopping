<template>
  <div id="detail" class="detail">
    <nav-bar class="detail-nav" @titleClick = "titleClick"></nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-image="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo :param-info="paramInfo"></DetailParamInfo>
      <DetailCommentInfo :comment-info="commentInfo"></DetailCommentInfo>
      <GoodsList :goods="recommends"></GoodsList>
    </scroll>
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
import GoodsList from "components/content/goods/GoodsList";

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
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
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
    GoodsList,
    Scroll
  },

  created() {
    // console.log(detailBanner)
    // console.log(this.$route);
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then(res => {
      // console.log("请求到数据")
      console.log(res);
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
    });
    // 3. 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  mounted() {},
  methods: {
    imageLoad() {
      // console.log("aaa");
      this.$refs.scroll.refresh();
      // this.refresh();
    },
    titleClick(index){
      console.log(index)

    }
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 1000;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>