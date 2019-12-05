<template>
  <div class="orderDetail">
    <div v-if="loadEnd" class="order-main">
      <div class="lr-wapper">
        <router-link to="/user/address/sel" tag="div" class="lr-row">
          <span class="lr-left">收获地址</span>
          <span class="lr-right">
            <i class="iconfont icon-youdanjiantou"></i>
          </span>
        </router-link>
      </div>
      <div class="addr-row">
        <p class="clearfix">
          <span class="addr-left">
            {{checkedAddress.name}}
            <i v-if="checkedAddress.isDefault" class="addr-default">默认</i>
          </span>
          <span class="addr-right">{{checkedAddress.tel}}</span>
        </p>
        <p class="addr-bottom">
          {{checkedAddress.province}}
          {{checkedAddress.city}}
          {{checkedAddress.county}}
          {{checkedAddress.addressDetail}}
        </p>
      </div>
      <div class="order-goods">
        <div class="cgoods-info" v-for="item in checkedGoodsList" :key="item.id">
          <div class="cg-img">
            <img :src="item.picUrl" />
          </div>
          <div class="cg-wrap">
            <h3>{{item.goodsName}}</h3>
            <p>
              <span
                class="cg-spec"
                v-for="(spec, index) in item.specifications"
                :key="index"
              >{{spec}}</span>
            </p>
            <p class="row-b">
              <span class="gs-price">¥{{item.price}}</span>
              <span class="gs-num">x {{item.number}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="lr-wapper order-info">
        <div class="lr-row">
          <span class="lr-left">商品金额</span>
          <span class="lr-right">
            <i class="price">¥{{actualPrice | priceFloat}}</i>
          </span>
        </div>
        <div class="lr-row">
          <span class="lr-left">邮费</span>
          <span class="lr-right">
            <i class="price">¥{{freightPrice | priceFloat}}</i>
          </span>
        </div>
        <div class="lr-row">
          <span class="lr-left">订单备注</span>
          <span class="lr-right">
            <input type="text" class="order-remark" placeholder="请输入" />
          </span>
        </div>
      </div>
      <div class="order-bottom">
        <div class="o-compute">
          <span class="o-total">
            总计：
            <i class="o-price">
              ¥
              <em>{{orderTotalPrice | priceFloat}}</em>
            </i>
          </span>
          <span class="btn btn-red" @click="submitOrder">提交订单</span>
        </div>
      </div>
    </div>
    <div v-if="!loadEnd" class="loadingWrapper">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import { cartCheckout } from "@/api/api";
import loading from "@/components/loading";
import { mapGetters } from "vuex";
export default {
  name: "orderDetail",
  components: {
    loading
  },
  data() {
    return {
      checkedAddress: {},
      checkedGoodsList: [],
      actualPrice: 0,
      freightPrice: 0,
      orderTotalPrice: 0,
      loadEnd: false
    };
  },
  created() {
    this.init();
  },
  computed: {
      ...mapGetters(['addressId'])
  },
  filters: {
    priceFloat(price) {
      return parseFloat(price).toFixed(2);
    }
  },
  methods: {
    init() {
      cartCheckout({
        cartId: 0,
        addressId: this.addressId,
        couponId: 0,
        userCouponId: 0,
        grouponRulesId: 0
      }).then(res => {
        var data = res.data.data;
        this.checkedAddress = data.checkedAddress;
        this.checkedGoodsList = data.checkedGoodsList;
        this.actualPrice = data.actualPrice;
        this.freightPrice = data.freightPrice;
        this.orderTotalPrice = data.orderTotalPrice;
        this.loadEnd = true;
      });
    },
    submitOrder() {}
  }
};
</script>
<style lang="scss" scoped>
.orderDetail {
  padding-bottom: px2rem(100);
  .order-goods {
    margin-top: px2rem(20);
  }
  .cgoods-info {
    background-color: $wrapper-bg;

    position: relative;
    padding: px2rem(20) px2rem(20) px2rem(20) px2rem(210);
    min-height: px2rem(220);
    .cg-img {
      position: absolute;
      left: px2rem(20);
      top: px2rem(20);
      width: px2rem(180);
      height: px2rem(180);
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .cg-wrap {
      h3 {
        font-weight: normal;
        font-size: $text-size-big;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      p {
        .cg-spec {
          display: inline-block;
          margin-top: px2rem(10);
          color: $text-color-assist;
          border: px2rem(2) solid $inner-wrapper-bg;
          border-radius: px2rem(8);
          padding: px2rem(4) px2rem(8);
          margin-right: px2rem(10);
        }
      }
      .row-b {
        margin-top: px2rem(10);
        display: flex;
        justify-content: space-between;
        .gs-price {
          color: $price-color;
        }
        .gs-num {
          color: $text-color-assist;
        }
      }
    }
  }
  .order-info {
    margin-top: $pd-size;
    .order-remark {
      display: inline-block;
      font-size: $text-size-big;
      width: px2rem(500);
      padding: px2rem(10);
    }
  }

  .order-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid $inner-wrapper-bg;
    height: px2rem(100);
    z-index: 10;
    .o-compute {
      float: right;
      .o-price {
        color: $price-color;
        em {
          font-size: px2rem(40);
          font-style: normal;
        }
      }

      .btn {
        width: px2rem(220);
        font-size: $text-size-big;
        height: px2rem(100);
        line-height: px2rem(100);
        margin-left: px2rem(10);
      }
    }
  }
  .addr-row {
    padding: 0 $pd-size-big $pd-size-big $pd-size-big;
    background-color: $wrapper-bg;
    font-size: $text-size-big;
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
  .loadingWrapper {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
}
</style>