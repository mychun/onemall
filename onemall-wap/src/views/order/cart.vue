<template>
  <div class="cart">
    <div class="cart-top">
      <span @click="editCartActive" class="cart-edit" v-show="!editCart">
        <i class="iconfont icon-bianji"></i>编辑
      </span>
      <span @click="editCartActive" class="cart-edit-ok" v-show="editCart">
        <i class="iconfont icon-wancheng"></i>完成
      </span>
    </div>
    <scroll class="cart-content" v-if="!isEmpty && loadEnd">
      <div class="cart-wrapper">
        <div class="cart-goods" :class="editCart ? 'edit-cart' : ''">
          <div
            class="cgoods-row"
            :ref="'cgoods' + item.id"
            v-for="(item, index) in goods"
            :key="item.id"
          >
            <i
              class="iconfont check-wrapper"
              :class="item.checked ? 'icon-roundcheckfill' : 'icon-round'"
              @click="toggleSel(item.checked, item.id)"
            ></i>
            <div class="cgoods-info">
              <img class="cg-img" :src="item.picUrl" />
              <div class="cg-wrap">
                <h3>{{item.goodsName}}</h3>
                <p>
                  <span
                    class="cg-spec"
                    v-for="(sp_item, sp_index) in item.specifications"
                    :key="sp_index"
                  >{{sp_item}}</span>
                </p>
                <p class="row-b">
                  <span class="gs-price">¥{{item.price}}</span>
                  <span class="gs-num">x {{item.number}}</span>
                </p>
                <p>
                  <counter
                    :inputNumber="item.number"
                    :max="1000"
                    v-show="editCart"
                    @on-change="goodsQuantityChange(item, arguments)"
                  ></counter>
                </p>
              </div>
            </div>
            <div @click="deleteCart(index)" class="cg-edit">删除</div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="cart-bottom">
      <div class="c-all" @click="selAllActive">
        <i class="iconfont" :class="isSelAll ? 'icon-roundcheckfill' : 'icon-round'"></i>全选
      </div>
      <div class="c-compute">
        <span class="c-total">
          总计：
          <i class="c-price">
            ¥
            <em>65.00</em>
          </i>
        </span>
        <span class="btn btn-red">结算</span>
      </div>
    </div>
    <div class="cart-empty" v-if="isEmpty && loadEnd">
      <i class="iconfont icon-empty-cart"></i>
      <span class="e-txt">您的购物车空空如也~</span>
    </div>
    <div v-if="!loadEnd" class="loadingWrapper">
      <loading></loading>
    </div>
  </div>
</template>
<script>
import { toast, confirm } from "@/components/dialog";
import counter from "@/components/counter";
import loading from "@/components/loading";
import scroll from "@/components/scroll";
import { cartList, cartUpdate, cartChecked, cartDelete } from "@/api/api";
import _ from "lodash";
import {
  addClass,
  removeClass,
  hasClass,
  getElementsByClassName
} from "@/utils/dom";

export default {
  name: "cart",
  components: {
    counter,
    loading,
    scroll
  },
  data() {
    return {
      goods: [],
      editCart: false,
      isSelAll: false,
      isEmpty: true,
      loadEnd: false
    };
  },
  created() {
    this.initData();
  },
  watch: {
    $route: "initData"
  },
  methods: {
    initData() {
      cartList().then(res => {
        this.goods = res.data.data.cartList;
        console.log(this.goods);
        this.loadEnd = true;

        if (this.goods.length > 0) {
          this.isEmpty = false;
          this.isSelAll = _.every(this.goods, item => {
            return item.checked;
          });
        }
      });
    },
    editCartActive() {
      this.editCart = !this.editCart;
    },
    goodsQuantityChange(item, arg) {
      let number = arg[0];
      cartUpdate({
        number: number,
        goodsId: item.goodsId,
        id: item.id,
        productId: item.productId
      }).catch(err => {
        console.error(err);
        toast.warning(err.data.errmsg);
      });

      _.each(this.goods, v => {
        if (v.id == item.id) {
          v.number = number;
        }
      });
    },
    toggleSel(checkedState, cgoodsId) {
      let addProductIds = [];
      let delProductIds = [];
      _.each(this.goods, item => {
        item.checked
          ? addProductIds.push(item.productId)
          : delProductIds.push(item.productId);

        if (item.id === cgoodsId) {
          item.checked = !checkedState;
          if (checkedState) {
            _.pull(addProductIds, item.productId);
            delProductIds.push(item.productId);
          } else {
            _.pull(delProductIds, item.productId);
            addProductIds.push(item.productId);
          }
        }
      });

      if (addProductIds.length > 0) {
        cartChecked({ productIds: addProductIds, isChecked: 1 });
      }
      if (delProductIds.length > 0) {
        cartChecked({ productIds: delProductIds, isChecked: 0 });
        this.isSelAll = false;
      } else {
        this.isSelAll = true;
      }
    },
    selAllActive() {
      this.isSelAll = !this.isSelAll;

      let productIds = [];
      _.each(this.goods, item => {
        productIds.push(item.productId);
        item.checked = this.isSelAll;
      });

      cartChecked({ productIds, isChecked: this.isSelAll ? 1 : 0 });
    },
    deleteCart(index) {
      let productId = this.goods[index].productId;
      const _this = this;
      confirm({
        text: "确定删除所选商品吗?",
        confirmBtnText: "确定",
        cancelBtnText: "再想想",
        confirm() {
          _this.deleteCartGoods(productId);
        }
      });
    },
    deleteCartGoods(o) {
      let productIds = [];
      if (o instanceof Array) {
        productIds = o;
      } else {
        productIds.push(o);
      }

      cartDelete({ productIds: productIds }).then(res => {
        this.goods = res.data.data.cartList;

        if (this.goods.length == 0) {
          this.isEmpty = true;
        } else {
          this.isSelAll = _.every(this.goods, item => {
            return item.checked;
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.cart {
  height: 100%;
  padding-top: px2rem(78);
  padding-bottom: px2rem(200);
  .cart-top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: $pd-size;
    background-color: #fff;
    text-align: right;
    z-index: 10;
    border-bottom: px2rem(2) solid $inner-wrapper-bg;
    .iconfont {
      color: $text-color-assist;
      font-size: px2rem(30);
      margin-right: px2rem(6);
    }
    border-bottom: 1px solid $inner-wrapper-bg;
  }
  .cart-content {
    height: 100%;
    .cart-wrapper {
      .cart-goods {
        padding-top: $pd-size-small;
        padding-bottom: $pd-size-small;
        .cgoods-row {
          background-color: #fff;
          margin-top: $pd-size-small;
          padding: px2rem(20) px2rem(20) px2rem(20) px2rem(108);
          position: relative;
          &:first-child {
            margin-top: 0;
          }
          .check-wrapper {
            position: absolute;
            left: px2rem(20);
            bottom: px2rem(20);
            top: px2rem(20);
            color: $success-color;
            font-size: px2rem(50);
            display: flex;
            align-items: center;
          }
          .cgoods-info {
            position: relative;
            padding-left: px2rem(190);
            min-height: px2rem(180);
            .cg-img {
              position: absolute;
              left: 0;
              top: 0;
              width: px2rem(180);
              height: px2rem(180);
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
                margin-top: px2rem(10);

                .cg-spec {
                  color: $text-color-assist;
                  margin-right: px2rem(10);
                }
              }
              .row-b {
                display: flex;
                justify-content: space-between;
                .gs-price {
                  color: $price-color;
                }
                .gs-num {
                  color: $text-color-assist;
                }
                .counter {
                  margin-left: px2rem(10);
                }
              }
            }
          }
          .cg-edit {
            background-color: $danger-color;
            color: #fff;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            display: none;
            align-items: center;
            padding: 0 $pd-size;
          }
        }
        &.edit-cart {
          .cgoods-row {
            padding-right: px2rem(116);
          }
          .cg-edit {
            display: flex !important;
          }
        }
      }
    }
  }
  .cart-bottom {
    position: fixed;
    left: 0;
    bottom: px2rem(100);
    width: 100%;
    background-color: #fff;
    border-top: 1px solid $inner-wrapper-bg;
    height: px2rem(100);
    display: flex;
    padding-left: $pd-size;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    .c-all {
      display: flex;
      align-items: center;
      .iconfont {
        color: $success-color;
        font-size: px2rem(50);
        margin-right: px2rem(6);
      }
    }
    .c-compute {
      .c-price {
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
  .cart-empty {
    padding-top: px2rem(500);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-items: center;
    color: $text-color-assist;
    .iconfont {
      font-size: px2rem(90);
      margin-right: $pd-size;
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