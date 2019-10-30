<template>
  <div class="search-content">
    <div class="search-box-wrapper">
      <search-box @query="onQueryChange" :focus="searchBoxFocus" ref="searchBox"></search-box>
    </div>
    <scroll class="search-history-wrapper" v-show="!query">
        <div class="search-history">
          <div class="history-wrapper">
            <span>历史搜索</span>
            <span @click="clearQueryHistory">
              <i class="iconfont icon-qingkong1"></i>清空历史记录
            </span>
          </div>
          <transition-group name="list" tag="ul" class="history-list">
            <li v-for=" (item, index) in queryHistory " :key="index" @click="setQuery(item)">
              <span class="history-name">{{item}}</span>
              <span class="iconfont icon-chuyidong" @click.stop="deleteQueryHistory(index)"></span>
            </li>
          </transition-group>
        </div>
    </scroll>
    <div class="search-result-wrapper" v-show="query">
      <search-result :query="query"></search-result>
    </div>
  </div>
</template>
<script>
import searchBox from "@/components/search-box";
import searchResult from "@/components/search-result";
import {toast, confirm} from "@/components/dialog";
import scroll from "@/components/scroll";

import { getGoodsList } from "@/api/api";

export default {
  name: "search",
  components: {
    searchBox,
    scroll,
    searchResult
  },
  data() {
    return {
      query: "",
      queryHistory: [],
      searchBoxFocus: true
    };
  },
  created() {
    this.queryHistory = this._getQueryHistory();
  },
  methods: {
    onQueryChange(query) {
      this.query = query;
      if (!query) return;

      // this.reset();
      this.setQueryHistory(query);
    },
    deleteQueryHistory(index) {
      this.queryHistory.splice(index, 1);
      window.localStorage.setItem("queryHistory", this.queryHistory.join("|"));
      toast.success('删除成功！');
    },
    clearQueryHistory() {
      if(!this.queryHistory.length){
        toast.fail('操作失败：历史搜索为空。');
        return;
      }

      const _this = this;
      confirm({
        text: '是否清空所有搜索历史？',
        confirmBtnText: "清空",
        confirm(){
            _this.clearSearch();
        }
      });
    },
    clearSearch() {
      this.queryHistory = [];
      window.localStorage.setItem("queryHistory", "");
    },
    setQueryHistory(query) {
      let queryHistory = this._getQueryHistory();
      if (queryHistory.indexOf(query) >= 0) return;

      queryHistory.push(query);
      window.localStorage.setItem("queryHistory", queryHistory.join("|"));
      this.queryHistory = queryHistory;
    },
    setQuery(query) {
      this.$refs.searchBox.setQuery(query);
    },
    refreshScroll(){
        this.$nextTick(()=>{
            this.$refs.searchScroll.refresh();
        })
    },
    reset() {
      this.searchGoodsList = [];
    },
    _getQueryHistory() {
      const queryHistory = window.localStorage.getItem("queryHistory");
      return queryHistory ? queryHistory.split("|") : [];
    }
  }
};
</script>
<style lang="scss" scoped>
.search-content {
  padding-top: px2rem(110);
  height: 100%;
  .search-box-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  .search-history-wrapper {
    height: 100%;
    

    .search-history {
        background-color: $wrapper-bg;
      padding: $pd-size;

      .history-wrapper {
        display: flex;
        justify-content: space-between;
        span {
          color: $text-color-assist;
          .iconfont {
            font-size: $text-size-big;
            margin-right: px2rem(10);
          }
        }
      }

      .history-list {
        margin-top: $pd-size;
        li {
          &.list-enter-active, &.list-leave-active {
            transition: all 0.1s;
          }

          &.list-enter, &.list-leave-to {
            height: 0;
          }

          padding: $pd-size-small 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .history-name {
            font-size: $text-size-big;
            color: $text-color;
          }
          .iconfont {
            font-size: px2rem(50);
            color: $text-color-assist;
          }
        }
      }
    }
  }
  .search-result-wrapper{
    height: 100%;
  }
}
</style>