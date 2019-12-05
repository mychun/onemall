<template>
<div class="goods">
  <base-header class="top-header" :title="title"></base-header>
  <scroll class="goods-scroll" ref="goodsScroll" :pullup="pullup" @scrollToEnd="goodsMore">
    <div class="goods-wrapper">
      <goods-list v-show="list.length" :data="list"></goods-list>
      <loading ref="loading" v-show="hasMore"></loading>
      <div class="end-wrapper" v-show="endHint && list.length">没有更多了!</div>
    </div>
  </scroll>
</div>
  
</template>
<script>
import scroll from "@/components/scroll";
import goodsList from "@/components/goods-list";
import loading from "@/components/loading";
import baseHeader from "@/components/base-header";

import { getGoodsList } from "@/api/api";

const limit = 10;

export default {
  name: "goods",
  components: {
    scroll,
    goodsList,
    loading,
    baseHeader
  },
  data() {
    return {
      page: 1,
      list: [],
      pullup: true,
      hasMore: true,
      endHint: false
    };
  },
  created() {
    this.getList();
  },
  computed: {
    title(){
      let title = '';
      if(this.$route.params.type == 'hot'){
        title = '人气推荐';
      }
      else if(this.$route.params.type == 'new'){
        title = '新品首发';
      }
      else{
        title='商品列表';
      }
      return title;
    }
  },
  methods: {
    getList() {
      const type = this.$route.params.type;

      getGoodsList({
        isHot: type == 'hot' ? true : false,
        isNew: type == 'new' ? true : false,
        page: this.page,
        limit: limit
      }).then(res => {
        this.list.push(...res.data.data.list);
        this._checkMore(res.data.data);
      });
    },
    goodsMore() {
      //下拉加载
      if (!this.hasMore) {
        return;
      }
      this.page++;
      this.getList();
    },
    _checkMore(data) {
      //判断是否到数据末尾
      if (
        !data.list.length ||
        data.list.length + (data.page - 1) * limit >= data.total
      ) {
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
.goods {
  height: 100%;
  padding-top: px2rem(100);
  .top-header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
  .goods-scroll{
    height: 100%;
  }
  .goods-wrapper {
    .end-wrapper {
      padding: px2rem(30) 0;
      text-align: center;
      font-size: $text-size-mid;
      color: $text-color;
    }
  }
}
</style>