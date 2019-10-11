<template>
  <ul class="search-goods-list">
    <li v-for="(item, index) in data" :key="index">
      <img v-lazy="item.picUrl" />
      <div class="g-info">
        <h3 class="g-name">{{item.name}}</h3>
        <p class="g-intro">{{item.brief}}</p>
        <p class="g-price">
          <span class="now-price">¥{{item.retailPrice}}</span>
          <del>¥{{item.counterPrice}}</del>
        </p>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "goods-list",
  props: {
    data: {
      type: Array,
      default: []
    }
  }
};
</script>
<style lang="scss" scoped>
.search-goods-list {
  padding: $pd-size;
  background-color: $wrapper-bg;
  li {
    padding: $pd-size-mid 0;
    display: flex;
    img {
      display: block;
      height: px2rem(180);
      width: px2rem(180);
      margin-right: px2rem(20);
    }
    .g-info {
      flex: 1;
      h3 {
        font-weight: normal;
      }
      p {
        color: $text-color;
        margin-top: px2rem(10);
      }
      .g-price {
        .now-price {
          color: $price-color;
          margin-right: px2rem(10);
        }
      }
    }
  }
}
</style>