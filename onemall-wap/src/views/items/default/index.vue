<template>
  <scroll class="default">
    <div class="default-cont" v-show="!loadingState">
      <base-header class="fixedHeader" :title=" !loadingState ? goods.info.name : '' "></base-header>
      <div class="slider-wrapper">
        <div class="slider-content">
          <slider :data="  !loadingState ? goods.info.gallery : []">
            <div v-for="(item, index) in ( !loadingState ? goods.info.gallery : [] )" :key="index">
              <a href="javascript:void(0);">
                <img :src="item" />
              </a>
            </div>
          </slider>
        </div>
      </div>
      <div class="loadingWrapper">
        <loading v-show="loadingState"></loading>
      </div>
    </div>
  </scroll>
</template>
<script>
import baseHeader from "@/components/base-header";
import scroll from "@/components/scroll";
import slider from "@/components/slider";
import loading from "@/components/loading";

import { goodsDetail } from "@/api/api";
export default {
  name: "default",
  components: {
    baseHeader,
    loading,
    scroll,
    slider
  },
  data() {
    return {
      goods: [],
      goodsId: this.$route.params.id,
      loadingState: true
    };
  },
  created() {
    this.initData();
  },

  methods: {
    initData() {
      goodsDetail({ id: this.goodsId }).then(res => {
        const data = res.data.data;
        this.goods = data;
        this.loadingState = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.default {
  height: 100%;
  .default-cont {
      padding-top: $header-h;
      .fixedHeader{
          position:fixed;
          left: 0;
          top: 0;
          width: 100%;
      }
    .loadingWrapper {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
    }
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100.5%;
      overflow: hidden;

      .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>