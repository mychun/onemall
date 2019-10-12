<template>
  <div class="loading">
    <img src="./loading.gif" />
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
export default {
  name: "loading",
  props: {
    title: {
      type: String,
      default: "正在载入..."
    }
  }
};
</script>
<style scoped lang="scss">
.loading {
  padding: $pd-size 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: px2rem(48);
    width: px2rem(48);
    margin-right: px2rem(10);
  }
  .desc {
    line-height: px2rem(40);
    font-size: $text-size-mid;
    color: $text-color;
  }
}
</style>
