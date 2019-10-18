<template>
  <transition name="fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "confirm",
  props: {
    text: {
      type: String,
      default: ""
    },
    cancelBtnText: {
      type: String,
      default: "取消"
    },
    confirmBtnText: {
      type: String,
      default: "确定"
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    cancel() {
      this.hide();
      this.$emit("cancel");
    },
    confirm() {
      this.hide();
      this.$emit("confirm");
    }
  }
};
</script>
<style lang="scss" scoped>
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: $shadow-bg;

  &.fade-enter-active {
    animation: fadein 0.3s;

    .confirm-content {
      animation: zoom 0.3s;
    }
  }

  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    .confirm-content {
      width: px2rem(540);
      border-radius: px2rem(26);
      background: $wrapper-bg;

      .text {
        padding: px2rem(38) px2rem(30);
        line-height: px2rem(44);
        text-align: center;
        font-size: $text-size-big;
        color: $text-color-imp;
      }

      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: $text-size-imp;

        .operate-btn {
          flex: 1;
          line-height: px2rem(44);
          padding: px2rem(20) 0;
          border-top: px2rem(2) solid $inner-wrapper-bg;
          color: $text-color;

          &.left {
            border-right: px2rem(2) solid $inner-wrapper-bg;
          }
        }
      }
    }
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

@keyframes zoom {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>

