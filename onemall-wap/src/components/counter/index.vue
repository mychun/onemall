<template>
  <div class="counter">
    <div
      ref="minusBtn"
      class="counter-btn minus-btn"
      :class="minusDisable || disableBtn ? 'disable' : ''"
      @click="minus"
    ></div>
    <div class="counter-show">
      <input v-if="!inputDisable" type="number" v-model="number" @blur="fixNumber" />
      <input v-else type="number" disabled v-model="number" @blur="fixNumber" />
    </div>
    <div
      ref="addBtn"
      class="counter-btn add-btn"
      :class="addDisable || disableBtn ? 'disable' : ''"
      @click="add"
    ></div>
  </div>
</template>
<script>
export default {
  name: "counter",
  props: {
    max: {
      type: Number,
      default: 5
    },
    min: {
      type: Number,
      default: 1
    },
    disableBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      number: this.min
    };
  },
  //监听number的变化，然后出发父类绑定的on-change事件
  watch: {
    number() {
      //刚渲染就会触发，因为库存第一次传过时为0
      this.$emit("on-change", this.number);
    }
  },
  computed: {
    minusDisable() {
      if (this.number <= this.min) {
        return true;
      }
      return false;
    },
    addDisable() {
      if (this.number >= this.max) {
        return true;
      }
      return false;
    },
    inputDisable() {
      if (this.max == 0 || this.max < this.min) {
        this.number = 0;
        return true;
      } else {
        this.number = 1;
        return false;
      }
    }
  },
  methods: {
    fixNumber() {
      if (this.disableBtn) {
        this.toast("请先选择商品参数！");
        this.number = 1;
        return;
      }

      let fix;
      if (typeof this.number === "string") {
        fix = Number(this.number.replace(/\D/g, ""));
      } else {
        fix = this.number;
      }

      if (fix > this.max) {
        this.toast("库存不足");
        fix = this.max;
      } else if (fix < this.min) {
        this.toast(`购买数量最少为：${this.min}`);
        fix = this.min;
      }

      this.number = fix;
    },
    minus() {
      if (this.disableBtn) {
        this.toast("请先选择商品参数！");
        return;
      }
      if (this.max == 0 || this.max < this.min) {
        this.toast("库存不足");
        return;
      }
      if (this.number <= this.min) {
        this.toast(`购买数量最少为：${this.min}`);
        return;
      }
      this.number--;
    },
    add() {
      if (this.disableBtn) {
        this.toast("请先选择商品参数！");
        return;
      }
      if (this.max == 0 || this.max < this.min) {
        this.toast("库存不足");
        return;
      }
      if (this.number >= this.max) {
        this.toast("库存不足");
        return;
      }
      this.number++;
    },
    toast(content) {
      this.$parent._total(content);
    }
  }
};
</script>
<style lang="scss" scoped>
.counter {
  display: flex;
  width: px2rem(200);
  overflow: hidden;
  border: px2rem(2) solid #e3e3e3;
  border-radius: px2rem(10);
  .counter-show {
    flex: 1;
    border-left: px2rem(2) solid #e3e3e3;
    border-right: px2rem(2) solid #e3e3e3;
    line-height: px2rem(60);
    height: px2rem(60);
    input {
      display: inline-block;
      height: 100%;
      text-align: center;
      font-size: $text-size-big;

      border: none;

      width: 100%;
    }
  }
  .counter-btn {
    height: px2rem(60);
    line-height: px2rem(60);
    text-align: center;
    width: px2rem(60);
    font-size: px2rem(60);
    position: relative;
    @mixin line {
      content: "";
      background-color: $text-color;
      transform: translate(-50%, -50%);
      position: absolute;
      left: 50%;
      top: 50%;
    }
    &::before {
      @include line;
      height: px2rem(2);
      width: 50%;
    }
    &.add-btn::after {
      @include line;
      height: 50%;
      width: px2rem(2);
    }
    &:active {
      background: #e8e8e8;
    }
    &.disable {
      background-color: #e3e3e3;
    }
  }
}
</style>