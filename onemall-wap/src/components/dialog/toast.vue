<template>
  <transition name="fade">
    <div class="toast" v-show="showFlag">
        <i class="iconfont" :class="icon"></i>
        <span>{{ text }}</span>
    </div>
  </transition>
</template>
<script>
export default {
  name: "toast",
  computed: {
      icon(newV){
          if(this.status == 'success'){
              return 'icon-chenggong'
          }
          if(this.status == 'fail'){
              return 'icon-shibai'
          }
          if(this.status == 'warning'){
              return 'icon-gantanhao'
          }
          return '';
      }
  }
};
</script>
<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: $transparent-bg;
  padding: px2rem(30) px2rem(40);
  border-radius: px2rem(10);
  color: #fff;
  display: flex;
  z-index: 999;
&.fade-enter-active {
    animation: fadein 0.3s;
  }
  &.fade-leave-active {
    animation: fadeOut 0.3s;
  }
  .iconfont {
      margin-right: px2rem(10);
    font-size: px2rem(40);
    &.icon-chenggong {
      color: $success-color;
    }
    &.icon-shibai {
      color: $danger-color;
    }
    &.icon-gantanhao{
      color: $warning-color;
    }
  }
  span{
      font-size: $text-size-big;
      white-space: nowrap;
  }
}

@keyframes fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>