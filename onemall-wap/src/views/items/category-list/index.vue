<template>
  <div class="category-list">
    <div class="category-top">
      <div class="swiper-container" id="nav">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item, index) in navList"
            :key="index"
          >{{item.name}}</div>
          <div class="bar">
            <div class="color"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-container" id="page">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in navList" :key="index">
          <div class="swiper-container category-content">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <h3 class="category-title">{{item.name}}</h3>
                <div class="category-slogan">{{item.desc}}</div>
                <template v-if="goodsList[index] && goodsList[index].length > 0">
                  <goods-view :data="goodsList[index] && goodsList[index].length > 0 ? goodsList[index] : []"></goods-view>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import { goodsCategory, goodsList as goodsListApi } from "@/api/api";
import goodsList from "@/components/goods-list";
export default {
  name: "categoryList",
  components: {
    goodsView: goodsList
  },
  data() {
    return {
      navList: [],
      currentCategory: {},
      currentIndex: 0,
      goodsList:[],
      limit: 10,
      page: 0,
      categoryId: null,
      tSpeed: 300, //切换速度300ms
      navSwiper: null,
      pageSwiper: null,
      containerSwiper: null,
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      await goodsCategory({ id: this.$route.params.id }).then(res => {
        this.navList = res.data.data.brotherCategory;
        this.currentCategory = res.data.data.currentCategory;
        this.categoryId = this.currentCategory.id;

        this.goodsList.length = this.navList.length;

        this.navList.some((item, index) => {
            if (item.name === this.currentCategory.name) {
              this.currentIndex = index;
            }
        });
        
        this.$nextTick(() => {
          this.navSwiperHandle(this.currentIndex);
          this.pageSwiperHandle(this.currentIndex);
          this.containerSwiperHandle();
        });
      });
    },
    navSwiperHandle(activeIndex) {
      const _that = this;
      _that.navSwiper = new Swiper("#nav", {
        slidesPerView: "auto",
        initialSlide: activeIndex,
        centeredSlides : true,
        centeredSlidesBounds: true,
        on: {
          init: function() {
            const activeSlide = this.slides.eq(activeIndex); //获取当前需要选择的slides
            activeSlide.addClass("swiper-sel");
            
            const activeSlideWidth = activeSlide.css("width");
            
            _that.bar = this.$el.find(".bar");
            _that.bar.css("width", activeSlideWidth);
            _that.bar.transition(_that.tSpeed);
            const activeSlideLeft = this.slides[activeIndex].offsetLeft;
            _that.bar.transform("translateX(" + activeSlideLeft + "px)");
          }
        }
      });
      _that.navSwiper.on("tap", function(e) {
        const clickIndex = this.clickedIndex;
        const clickSlide = this.slides.eq(clickIndex);
        this.slides.removeClass("swiper-sel");
        clickSlide.addClass("swiper-sel");
        this.slideTo(clickIndex, _that.tSpeed);
        _that.pageSwiper.slideTo(clickIndex, 0);
      });
    },
    pageSwiperHandle(activeIndex) {
      const _that = this;
      _that.pageSwiper = new Swiper("#page", {
        initialSlide: activeIndex,
        resistanceRatio: 0,
        on: {
          init: function() {
            _that.getGoodsList(_that.navList[activeIndex].id);
          },
          slideChange: function() {
            const activeIndex = this.activeIndex;
            const activeSlidePosition = _that.navSwiper.slides[activeIndex].offsetLeft;
            //释放时导航移动过渡
            const activeSlideWidth = _that.navSwiper.slides.eq(activeIndex).css('width');
            _that.bar.css("width", activeSlideWidth);
            _that.bar.transition(_that.tSpeed);
            _that.bar.transform("translateX(" + activeSlidePosition + "px)");
            //释放时swiper-slide添加样式
            _that.navSwiper.slides.removeClass("swiper-sel");
            _that.navSwiper.slides.eq(activeIndex).addClass('swiper-sel');
            //让菜单navSwiper移动
            _that.navSwiper.slideTo(activeIndex, _that.tSpeed);
            
            //切换完，就请求当前商品列表
            _that.currentIndex = activeIndex;
            _that.getGoodsList(_that.navList[activeIndex].id);
          }
        }
      });
    },
    containerSwiperHandle(){
      this.containerSwiper = new Swiper('.category-content', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
      });
    },
    getGoodsList(categoryId) {

      //如果当前商品数据已存在goodsList数组里，就不再api请求
      //好处：减少页面刚加载时，不断调取api请求所有分类商品数据
      if(this.goodsList[this.currentIndex] && this.goodsList[this.currentIndex].length > 0) return;

      goodsListApi({
        categoryId: categoryId ? categoryId : this.categoryId,
        page: this.page,
        limit: this.limit
      }).then(res => {
        this.$set(this.goodsList, this.currentIndex, res.data.data.list);
        
        this.$nextTick(()=>{
          //加载完数据后，让containerSwiper刷新下，预防滚动出错
          this.containerSwiper[this.currentIndex].update();
        })
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.category-list {
  background-color: #fff;
  height: 100%;
  padding-top: px2rem(90);

  .category-top {
    position: fixed;
    top: 0;
    left: 0;
    height: px2rem(90);
    width: 100%;
    z-index: 1;
    border-bottom: px2rem(2) solid $inner-wrapper-bg;
    #nav {
      .swiper-slide {
        width: auto;

        height: px2rem(88);
        line-height: px2rem(88);
        text-align: center;
        padding: 0 px2rem(30);
        color: $text-color;
        &.swiper-sel {
          color: $text-color-imp;
        }
      }
    }
    .bar {
      position: absolute;

      width: px2rem(100);

      bottom: 0;
      .color {
        height: px2rem(6);
        width: px2rem(72);
        margin: 0 auto;
        background-color: $act-color;
      }
    }
  }
  #page {
    height: 100%;

    .category-title {
      padding-top: px2rem(30);
      text-align: center;
      font-size: px2rem(40);
      font-weight: normal;
    }
    .category-slogan {
      padding: px2rem(20) 0;
      text-align: center;
      font-size: px2rem(32);
      color: $text-color;
    }
  }
  .category-content{
    height: 100%;
    .swiper-slide{
      height: auto;
    }
  }
}
</style>