<template>
  <div class="baseHeader">
    <div v-if="preIcon" class="th-l" @click="backAction">
      <i class="iconfont icon-xiangzuo"></i>
    </div>
    <div class="th-title">{{ title }}</div>
    <div class="th-r">
      <slot name="r"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "base-header",
  props: {
    title: {
      type: String,
      default: ""
    },
    preIcon: {
      type: Boolean,
      default: true
    },
    backurl: {
      type: String,
      default: ""
    }
  },
  methods: {
    backAction() {
      if (this.backurl) {
        //如果没有传值
        this.$router.push(this.backurl);
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.baseHeader {
  height: $header-h;
  display: flex;
  align-items: center;
  background-color: $wrapper-bg;
  padding-left: px2rem(66);
  padding-right: px2rem(66);
  border-bottom: px2rem(2) solid $inner-wrapper-bg;
  position: relative;

  @mixin iconf_wrap {
    position: absolute;
    padding-left: $pd-size;
    top: 0;
    height: $header-h;
    display: flex;
    align-items: center;
    .iconfont {
      font-size: $text-size-imp;
      color: $text-color-assist;
    }
  }

  .th-l {
    left: 0;
    @include iconf_wrap();
  }
  .th-title {
    font-size: $text-size-imp;
    text-align: center;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .th-r {
    right: 0;
    @include iconf_wrap();
  }
}
</style>