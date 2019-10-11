<template>
  <div class="home">
    <div class="index-search" @click="clickSearchBoxHandle">
      <search-box placeholder="点击搜索" disabled="disabled"></search-box>
    </div>
    <banner-slider :data="banner"></banner-slider>
    
  </div>
</template>
<script>
import searchBox from "@/components/search-box";
import bannerSlider from "@/components/banner-slider";
import { getHome } from '@/api/api';
export default {
  name: "home",
  components: {
    searchBox,
    bannerSlider
  },
  data() {
    return {
      disabled: true,
      shopInfos: [],
      banner: []
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
        console.log(this.shopInfos)
        this.banner = this.shopInfos.banner
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.home{

}
</style>