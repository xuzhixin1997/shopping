import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null,
    }
  },
  mounted() {
    // 进行防抖 图片加载完成的事件监听
    this.refresh = debounce(this.$refs.scroll.refresh(), 50)

    this.itemImgListener = () => {
      this.refresh()
    }

    // 监听图片加载完毕
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
  }
}