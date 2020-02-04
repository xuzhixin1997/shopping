
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 页面滚动封装
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },

  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 默认时不侦测
      // probe 侦测
      // 0 1不侦测
      // 2：手指滚动过程中侦测
      // 3：只要是滚动，都侦测
      probeType: this.probeType,

      // 上啦加载
      pullUpLoad: this.pullUpLoad
    });

    // 监听滚动
    if (this.probeType === 2 || this.probeType == 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }

    // 监听加载
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("上啦加载");
        this.$emit("pullingUp");
      });
    }

    // this.scroll.refresh();
  },
  methods: {
    // 往上滚动
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 上啦加载
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      // console.log("aaaaa");
      this.scroll && this.scroll.refresh();
    },
    getScrollY(){
      return  this.scroll ? this.scroll.y : 0;
     
    }

  }
};
</script>

<style>
</style>