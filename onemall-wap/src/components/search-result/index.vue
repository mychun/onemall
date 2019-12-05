<template>
  <scroll class="search-result" ref="searchResultScroll" :pullup="pullup" @scrollToEnd="searchMore">
    <div>
      <goods-list v-show="searchGoodsList.length" :data="searchGoodsList"></goods-list>
      <empty-hint v-show="!hasMore && !searchGoodsList.length" emptyTxt="搜索不到该商品"></empty-hint>
      <loading ref="loading" v-show="hasMore"></loading>
      <div class="end-wrapper" v-show="endHint && searchGoodsList.length">没有更多了!</div>
    </div>
  </scroll>
</template>
<script>
import scroll from "@/components/scroll";
import goodsList from "@/components/goods-list";
import emptyHint from "@/components/empty-hint";
import loading from "@/components/loading";
import { getGoodsList } from "@/api/api";

const limit = 10;

export default {
  name: "search-result",
  components: {
    scroll,
    goodsList,
    emptyHint,
    loading
  },
  data () {
    return {
      page: 1,
      searchGoodsList: [],
      pullup: true,
      hasMore: true,
      endHint: false
    }
  },
  props: {
    query: {
      type: String,
      default: []
    }
  },
  watch: {
    query(newVal){
      if (!newVal) return;
      this.getSearchGoods();
    }
  },
  methods: {
    init(){
      //搜索输入后第一次搜索
      this.page = 1; //重置page为1
      this.endHint = false;
      this.hasMore = true;
      this.searchGoodsList = [];
      this.$refs.searchResultScroll.scrollTo(0, 0); //要返回头部
    },
    getSearchGoods() {
      this.init();

      getGoodsList({
        keyword: this.query,
        page: this.page,
        limit: limit,
        categoryId: 0
      })
        .then(res => {
          this.searchGoodsList = res.data.data.list;
          this._checkMore(res.data.data);
        })
        .catch(err => {});
    },
    searchMore() {
        //下拉加载
      if (!this.hasMore) {
        return;
      }
      this.page++;
      getGoodsList({
        keyword: this.query,
        page: this.page,
        limit: limit,
        categoryId: 0
      })
        .then(res => {
          this.searchGoodsList.push(...res.data.data.list);
          this._checkMore(res.data.data);
        })
        .catch(err => {});
    },
    _checkMore(data) {
      //判断是否到数据末尾
      if ( !data.list.length || data.list.length + (data.page - 1) * limit >= data.total) {
        this.hasMore = false;
        this.endHint = true;
        return;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
*{
  touch-action: none;
}
.search-result{
  height: 100%;

  .end-wrapper{
    padding: px2rem(30) 0; 
    text-align: center;
    font-size: $text-size-mid;
    color: $text-color;
  }
}
</style>