<template>
  <div class="index-search">
    <div class="search-wrap">
      <i class="iconfont icon-sousuo"></i>
      <input :placeholder="placeholder" ref="queryInput" v-model="query" :disabled="disabled" />
      <i v-show="query" @click="clearQueryHandle" class="iconfont icon-shanchu"></i>
    </div>
  </div>
</template>
<script>
import { debounce } from "@/utils/util";
export default {
  name: "search-box",
  props: {
    placeholder: {
      type: String,
      default: "请输入商品名称"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    focus:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      query: ""
    };
  },
  created() {
    //created的神奇功能:
    //在watch被解析时中debounce已自动被执行一遍了，
    //所以watch query监听的是debounce返回的函数
    //而且debounce里面的属性(timer)会被缓存起来
    this.$watch(
      "query",
      debounce(newQuery => {
        //预防输入太快重复请求search，提高性能
        this.$emit("query", newQuery.trim());
      }, 200)
    );
  },
  mounted () {
    if(this.focus) {this.$refs.queryInput.focus()};
  },
  methods: {
    clearQueryHandle() {
      this.query = "";
    },
    setQuery(query){
      this.query = query;
    },
    blur(){
      this.$refs.queryInput.blur();
    }
  }
};
</script>
<style lang="scss" scoped>
.index-search {
  background-color: $wrapper-bg;
  padding: $pd-size;
  .search-wrap {
    padding: px2rem(10) px2rem(16);
    background-color: $inner-wrapper-bg;
    border-radius: px2rem(8);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .iconfont {
      color: $text-color-assist;
      font-size: $text-size-imp;
    }
    .icon-sousuo {
      margin-right: px2rem(16);
    }
    input {
      flex: 1;
      margin-right: px2rem(16);
      border: none;
      height: px2rem(50);
      background-color: transparent;
    }
  }
}
</style>