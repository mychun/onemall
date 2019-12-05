<template>
  <div class="category">
    <div v-if="loadEnd" class="category-main">
      <div class="search-wrapper" @click="clickSearchBoxHandle">
        <search-box placeholder="点击搜索" disabled="disabled"></search-box>
      </div>
      <div class="category-wrapper clearfix">
        <scroll class="nav-scroll">
          <ul class="nav">
            <li
              v-for=" (item, index) in categoryList "
              :class=" currentCategory.name == item.name ? 'sel' : ''"
              :key="index"
              @click="cutCategory(item.id)"
            >
              <span class="nav-item">{{ item.name }}</span>
            </li>
          </ul>
        </scroll>
        <scroll class="cont-scroll">
          <div class="category-cont">
            <div class="category-img">
              <img v-lazy="currentCategory.picUrl" />
            </div>
            <div class="category-slogan">{{currentCategory.desc}}</div>
            <ul class="category-list clearfix">
              <router-link :to="'/categoryList/' + item.id" tag="li" v-for="(item, index) in currentSubCategoryList" :key="index">
                <img class="sub-img" v-lazy="item.picUrl" />
                <span class="category-name">
                  <i>{{ item.name }}</i>
                </span>
              </router-link>
            </ul>
          </div>
        </scroll>
      </div>
    </div>
    <div v-if="!loadEnd" class="loadingWrapper">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import searchBox from "@/components/search-box";
import scroll from "@/components/scroll";
import { catalogList, catalogCurrent } from "@/api/api";
import loading from "@/components/loading";
export default {
  name: "category",
  components: {
    searchBox,
    loading,
    scroll
  },
  data() {
    return {
      categoryList: [],
      currentCategory: {},
      currentSubCategoryList: [],
      loadEnd: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    clickSearchBoxHandle() {
      this.$router.push({
        path: "/search"
      });
    },
    init() {
      catalogList().then(res => {
        let data = res.data.data;
        this.categoryList = data.categoryList;
        this.currentCategory = res.data.data.currentCategory;
        this.currentSubCategoryList = data.currentSubCategory;
        this.loadEnd = true;
      });
    },
    cutCategory(id) {
      catalogCurrent({ id }).then(res => {
        let data = res.data.data;
        this.currentCategory = data.currentCategory;
        this.currentSubCategoryList = data.currentSubCategory;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: none;
}
.category {
  height: 100%;
  padding-top: px2rem(110);
  padding-bottom: px2rem(100);
}

.search-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.category-main {
  height: 100%;
  overflow: hidden;
}
.category-wrapper {
  height: 100%;
  background-color: #fff;
  border-top: px2rem(2) solid $inner-wrapper-bg;
  display: flex;
  .nav-scroll {
    height: 100%;
    width: px2rem(200);
  }
  .nav {
    border-right: px2rem(2) solid $inner-wrapper-bg;
    li {
      height: px2rem(80);
      border-bottom: px2rem(2) solid $inner-wrapper-bg;
      position: relative;

      &.sel {
        color: $act-color;
        position: relative;
      }
      &.sel::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: px2rem(4);
        background-color: $act-color;
      }

      .nav-item {
        position: absolute;
        left: $pd-size-small;
        right: $pd-size-small;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        font-size: $text-size-mid;
        max-height: px2rem(80);
        overflow: hidden;
      }
    }
  }
  .cont-scroll {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
  .category-cont {
    padding: 0 $pd-size-big $pd-size-big;

    .category-img {
      img {
        display: block;
        width: 100%;
      }
    }
    .category-slogan {
      padding-top: $pd-size;
      text-align: center;
    }
    .category-list {
      li {
        float: left;
        width: 33.33%;
        padding-top: $pd-size;
        .sub-img {
          display: block;
          margin: 0 auto;
          height: px2rem(140);
          width: px2rem(140);
        }
        .category-name {
          display: block;
          color: $text-color;
          margin-top: $pd-size-small;
          padding: 0 px2rem(5);
          i {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            font-size: $text-size-mid;
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
</style>