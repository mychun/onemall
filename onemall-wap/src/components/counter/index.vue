<template>
  <div class="counter">
    <div
      ref="minusBtn"
      class="counter-btn minus-btn"
      :class="minusDisable || disableInput ? 'disable' : ''"
      @click="minus"
    ></div>
    <div class="counter-show">
      <input v-if="!disableInput" type="number" v-model="number" @blur="fixNumber" />
      <input v-else type="number" disabled v-model="number" @blur="fixNumber" />
    </div>
    <div
      ref="addBtn"
      class="counter-btn add-btn"
      :class="addDisable || disableInput ? 'disable' : ''"
      @click="add"
    ></div>
  </div>
</template>
<script>
import { toast } from "@/components/dialog";
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
    inputNumber: {
      type: Number,
      default: 1
    },
    disableInput: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      number: this.inputNumber
    }
  },
  //监听number的变化，然后出发父类绑定的on-change事件
  watch: {
    number() {
      //刚渲染就会触发，因为库存第一次传过时为0
      this.$emit("on-change", Number(this.number));
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
    }
  },
  methods: {
    fixNumber() {
      if (this.disableBtn) {
        this.number = this.inputNumber;
        return;
      }

      let fix;
      if (typeof this.number === "string") {
        fix = Number(this.number.replace(/\D/g, ""));
      } else {
        fix = this.number;
      }

      if (fix > this.max) {
        toast.warning(`最多购买 ${this.max}`);
        fix = this.max;
      } else if (fix < this.min) {
        toast.warning(`最少购买 ${this.min}`);
        fix = this.min;
      }

      this.number = fix;
    },
    minus() {
      if (this.disableInput) {
        return;
      }
      if (this.number <= this.min) {
        toast.warning(`最少购买 ${this.min}`);
        return;
      }
      this.number--;
    },
    add() {
      if (this.disableInput) {
        return;
      }
      if (this.number >= this.max) {
        toast.warning(`最多购买 ${this.max}`);
        return;
      }
      this.number++;
    },
    toast(content) {
      toast.warning(content);
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
    input {
      display: inline-block;
      line-height: px2rem(60);
      height: px2rem(60);
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
    &.add-btn {
      border-left: px2rem(2) solid #e3e3e3;
    }
    &.minus-btn {
      border-right: px2rem(2) solid #e3e3e3;
    }
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