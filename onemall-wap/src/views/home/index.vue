<template>
  <div class="home">
    <scroll class="home-content" v-show="!loadingState">
      <div class="home-wrapper">
        <div class="home-search" @click="clickSearchBoxHandle">
          <search-box placeholder="点击搜索" disabled="disabled"></search-box>
        </div>

        <div class="slider-wrapper">
          <div class="slider-content">
            <slider :data="shopInfos.banner">
              <div v-for="(item, index) in shopInfos.banner" :key="index">
                <a href="javascript:void(0);">
                  <img :src="item.url" />
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="home-goods">
          <h3>
            <span class="i-title">新品首发</span>
            <router-link tag="span" to="/goods/new" class="i-link">
              更多
              <i class="iconfont icon-youdanjiantou"></i>
            </router-link>
          </h3>
          <goods-list :data="shopInfos.newGoodsList"></goods-list>
        </div>
        <div class="home-goods">
          <h3>
            <span class="i-title">人气推荐</span>
            <router-link tag="span" to="/goods/hot" class="i-link">
              更多
              <i class="iconfont icon-youdanjiantou"></i>
            </router-link>
          </h3>
          <goods-list :data="shopInfos.hotGoodsList"></goods-list>
        </div>
      </div>
    </scroll>
    <div class="loadingWrapper">
      <loading v-show="loadingState"></loading>
    </div>
  </div>
</template>
<script>
import searchBox from "@/components/search-box";
import slider from "@/components/slider";
import goodsList from "@/components/goods-list";
import loading from "@/components/loading";
import scroll from "@/components/scroll";
import { getHome } from "@/api/api";
export default {
  name: "home",
  components: {
    searchBox,
    slider,
    goodsList,
    loading,
    scroll
  },
  data() {
    return {
      disabled: true,
      shopInfos: {
        banner: [],
        newGoodsList: [],
        hotGoodsList: []
      },
      loadingState: true
    };
  },
  created() {
    this.initViews();
  },
  methods: {
    clickSearchBoxHandle() {
      this.$router.push({
        path: "/search"
      });
    },
    initViews() {
      getHome().then(res => {
        this.shopInfos = res.data.data;
        this.loadingState = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  padding-bottom: px2rem(100);
  .home-content {
    height: 100%;
    .home-wrapper {
      .slider-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 55.5%;
        overflow: hidden;

        .slider-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .home-goods {
        margin-top: $pd-size;
        background-color: $wrapper-bg;
        h3 {
          font-weight: normal;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: $pd-size;
          .i-title {
            color: $text-color;
          }
          .i-link {
            color: $text-color-assist;
            .iconfont {
              font-size: px2rem(40);
              vertical-align: bottom;
            }
          }
        }
      }
    }
  }
  .loadingWrapper {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
}
</style>