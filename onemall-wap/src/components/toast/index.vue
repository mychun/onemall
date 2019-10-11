<template>
  <transition name="fade">
    <div class="toast" v-show="showFlag">
        <i class="iconfont" :class="icon"></i>
        <span>{{ content }}</span>
    </div>
  </transition>
</template>
<script>
export default {
  name: "toast",
  data() {
    return {
      content: "提示文字",
      icon: "",
      showFlag: false
    };
  },
  methods: {
    show(obj) {
      this.content = obj.content;
      this.icon = obj.icon;
      this.showFlag = true;
      setTimeout(()=>{
          this.showFlag = false;
      }, 1000)
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
  background-color: $transparent-background;
  padding: px2rem(30) px2rem(40);
  border-radius: px2rem(10);
  color: #fff;
  display: flex;
  align-items: center;
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
  }
  span{
      font-size: $text-size-big;
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