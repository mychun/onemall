<template>
  <div class="address">
    <base-header title="收货地址"></base-header>
    <div v-if="loadEnd" class="addr-main" :class=" selAddress ? 'addr-sel' : '' ">
      <div class="addr-row" @click="onSelect(item)" v-for="item in addressList" :key="item.id">
        <i
          class="iconfont check-wrapper"
          :class=" item.id == addressId ? 'icon-roundcheckfill' : 'icon-round'"
        ></i>
        <p class="clearfix">
          <span class="addr-left">
            {{item.name}}
            <i class="addr-default" v-if="item.isDefault">默认</i>
          </span>
          <span class="addr-right">{{item.tel}}</span>
        </p>
        <p class="addr-bottom">
          {{item.province}}
          {{item.city}}
          {{item.county}}
          {{item.addressDetail}}
        </p>
      </div>
      <router-link to="/user/addAddress" tag="div" class="addAddr btn btn-red">添加新地址</router-link>
    </div>
    <div v-if="!loadEnd" class="loadingWrapper">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import baseHeader from "@/components/base-header";
import loading from "@/components/loading";
import { addressList } from "@/api/api";
import { setLocalStorage } from "@/utils/cache";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "userAddress",
  components: {
    baseHeader,
    loading
  },
  data() {
    return {
      addressList: [],
      loadEnd: false,
      selAddress: false
    };
  },
  created() {
    this.loadAddress();
  },
  computed: {
        ...mapGetters([
            'addressId'
        ])
    },
  methods: {
    loadAddress() {
      //是否选择地址
      this.$route.params.type == "sel" && (this.selAddress = true);

      addressList().then(res => {
        this.addressList = res.data.data.list;
        this.loadEnd = true;
      });
    },
    onSelect(item) {
      if (!this.selAddress) return;

      setLocalStorage({ addressId: item.id });
      this.setAddressId(item.id);
      this.$router.go(-1);
    },
    ...mapMutations({
      setAddressId: "SET_ADDRESSID"
    })
  }
};
</script>
<style lang="scss" scoped>
.addr-main {
    padding-bottom: px2rem(50);
  &.addr-sel {
    .addr-row {
      padding-left: px2rem(108);
      .check-wrapper {
        display: flex;
      }
    }
  }
  .addr-row {
    padding: px2rem(20);
    background-color: $wrapper-bg;
    font-size: $text-size-big;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: px2rem(20);
      top: 0;
      right: 0;
      border-top: px2rem(2) solid $inner-wrapper-bg;
    }
    &:first-child::before {
      display: none;
    }
    .check-wrapper {
      position: absolute;
      left: px2rem(20);
      bottom: px2rem(20);
      top: px2rem(20);
      color: $success-color;
      font-size: px2rem(50);
      display: none;
      align-items: center;
    }
    .addr-left {
      float: left;
    }
    .addr-right {
      float: right;
    }
    .addr-bottom {
      margin-top: $pd-size-small;
    }
    .addr-default {
      display: inline-block;
      margin-left: px2rem(6);
      font-size: px2rem(24);
      background-color: #5cb85c;
      padding: px2rem(1) px2rem(6);
      border-radius: px2rem(6);
      color: #fff;
    }
  }
  .addAddr{
      position:fixed;
      left: 0;
      right: 0;
      bottom: 0;
      height: px2rem(100);
    line-height: px2rem(100);
  }
}
.loadingWrapper {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
}
</style>