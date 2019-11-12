<template>
  <div class="default">
    <base-header class="fixedHeader" :title=" goods.info.name "></base-header>
    <scroll class="default-scroll" ref="defaultScroll" v-show="loadEnd">
      <div class="default-cont">
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider :data=" goods.info.gallery ">
              <div v-for="(item, index) in goods.info.gallery" :key="index">
                <a href="javascript:void(0);">
                  <img :src="item" />
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="g-info-wrapper">
          <p class="g-price">
            <span class="g-now-price">¥{{ goods.info.retailPrice }}</span>
            <del class="g-old-price">¥{{goods.info.counterPrice }}</del>
          </p>
          <p class="g-name">{{ goods.info.name }}</p>
          <p class="g-intro">{{ goods.info.brief }}</p>
        </div>
        <div class="g-detail-wrapper">
          <ul class="g-params">
            <li @click="standardActive">
              <span class="par-left">规格</span>
              <span class="par-right">
                <i class="par-right-txt">请选择</i>
                <i class="iconfont icon-youdanjiantou"></i>
              </span>
            </li>
            <li @click="paramsActive">
              <span class="par-left">属性</span>
              <span class="par-right">
                <i class="iconfont icon-youdanjiantou"></i>
              </span>
            </li>
            <li>
              <span class="par-left">运费</span>
              <span class="par-right">
                <i class="right-txt">满88免邮费</i>
              </span>
            </li>
          </ul>
        </div>
        <div class="g-detail-wrapper">
          <h3 class="d-title">商品详情</h3>
          <div class="d-info" v-if="goods.info.detail" v-html="goods.info.detail"></div>
          <div class="empty-wrapper" v-else>无</div>
        </div>
      </div>
    </scroll>
    <div v-show="!loadEnd" class="loadingWrapper">
      <loading></loading>
    </div>
    <transition name="show">
      <div class="pop-up-frame" v-show="paramsFlag" ref="gParams" @click="paramsActive">
        <div class="frame-cont" @click.stop>
          <div class="params-cont">
            <h3 class="title-wrap">
              商品属性
              <i class="iconfont icon-shibai" @click="paramsActive"></i>
            </h3>
            <ul v-if="params.length" class="params-wrap">
              <li v-for="(item, index) of params" :key="index">
                <span class="par-name">{{item.attribute}}</span>
                <span class="par-info">{{item.value}}</span>
              </li>
            </ul>
            <div class="empty-wrapper" v-else>无</div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="show">
      <div class="pop-up-frame" v-show="standardFlag" ref="gStandard" @click="standardActive">
        <div class="frame-cont buy-cont" @click.stop>
          <div class="buy-wrapper">
            <div class="buy-top">
              <div class="buy-img">
                <img class="min-img" :src="goods.info.picUrl" />
              </div>
              <dl class="buy-info">
                <dt class="price-lump">
                  ¥
                  <template v-if="buyGoodsInfo.price">{{buyGoodsInfo.price}}</template>
                  <template v-else>{{goods.info.retailPrice}}</template>
                </dt>
                <dd class="sel-info">
                  <template v-if="!isSelAll">
                    选择
                    <span v-for="(size,index) in selGoodsSize" :key="index">
                      <i v-if="!size.value && selGoodsSize.length > (index + 1)">{{size.name}};</i>
                      <i v-else-if="!size.value && selGoodsSize.length == (index + 1)">{{size.name}}</i>
                    </span>
                  </template>
                  <template v-else>
                    已选
                    <span v-for="(size,index) in selGoodsSize" :key="index">
                      <i v-if="selGoodsSize.length > (index + 1)">{{ size.value }};</i>
                      <i v-else>{{ size.value }}</i>
                    </span>
                  </template>
                </dd>
              </dl>
              <i class="iconfont icon-shibai" @click="standardActive"></i>
            </div>
            <div class="buy-standard-wrapper" ref="buyStandrad" id="demo1">
              <div
                class="buy-standard"
                v-for="(specification, spec_index) in goods.specificationList"
                :key="spec_index"
              >
                <h3 class="bs-title">{{specification.name}}</h3>
                <p class="bs-row">
                  <span
                    class="standard-item"
                    @click="selSpecific(spec_index, item_index)"
                    v-for="(item, item_index) in specification.valueList"
                    :key="item.id"
                    :data-id="item.id"
                    :ref="'specificItem' +  spec_index + '_' + item_index"
                  >{{item.value}}</span>
                </p>
              </div>
            </div>
            <div class="buy-sum">
              <span class="sum-txt">购买数量</span>
              <counter
                :disableInput="!isSelAll"
                :max="buyGoodsInfo.stockNumber"
                @on-change="buyQuantityChange"
              ></counter>
            </div>
            <div class="buy-bottom">
              <div class="buy-btn">
                <span class="add-cart-btn" @click="addCartHandle">加入购物车</span>
                <span class="must-buy-btn" @click="mustBuyHandle">立即购买</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="details-bttom">
      <router-link tag="i" class="iconfont icon-empty-cart" to="/cart">
        <em>{{cartInfo ? cartInfo : ''}}</em>
      </router-link>
      <i class="iconfont icon-shoucang1"></i>
      <div class="buy-btn">
        <span class="add-cart-btn" @click="standardActive">加入购物车</span>
        <span class="must-buy-btn" @click="standardActive">立即购买</span>
      </div>
    </div>
  </div>
</template>
<script>
import baseHeader from "@/components/base-header";
import scroll from "@/components/scroll";
import slider from "@/components/slider";
import loading from "@/components/loading";
import counter from "@/components/counter";
import { toast } from "@/components/dialog";

import _ from "lodash";

import { goodsDetail, cartAdd, cartGoodsCount } from "@/api/api";
import {
  addClass,
  removeClass,
  hasClass,
  getElementsByClassName,
  siblings
} from "@/utils/dom";
export default {
  name: "default",
  components: {
    baseHeader,
    loading,
    scroll,
    slider,
    counter
  },
  data() {
    return {
      goods: {
        info: {
          gallery: []
        },
        attribute: [],
        specificationList: []
      },
      goodsId: this.$route.params.id,
      loadEnd: false,
      paramsFlag: false,
      standardFlag: false,
      selGoodsSize: [],
      cartInfo: 0
    };
  },
  created() {
    this.initData();
  },
  computed: {
    params() {
      if (this.goods.attribute.length) {
        return this.goods.attribute;
      } else {
        return [];
      }
    },
    isSelAll() {
      //判断是否选择购买商品的全部参数

      if (!this.selGoodsSize.length) {
        return (status = false);
      }

      let status = true;
      this.selGoodsSize.forEach(item => {
        if (!item.value) {
          status = false;
        }
      });

      return status;
    },
    buyGoodsInfo() {
      let buyGoodsInfo = {
        goodsId: Number(this.$route.params.id),
        price: 0,
        stockNumber: 0,
        buyNumber: 1,
        specifications: {}
      };

      if (!this.isSelAll || !this.selGoodsSize.length) {
        return buyGoodsInfo;
      }

      const specifications = this.selGoodsSize.map(item => {
        return item.value;
      });

      this.goods.productList.forEach(item => {
        if (this._isSameArr(item.specifications, specifications)) {
          buyGoodsInfo.price = item.price;
          buyGoodsInfo.stockNumber = item.number;
          //buyGoodsInfo.specifications = item.specifications;
        }
      });

      this.selGoodsSize.forEach((item, index) => {
        let s = "s" + (index + 1);
        buyGoodsInfo.specifications[s] = parseInt(item.id);
      });

      if (buyGoodsInfo.stockNumber == 0) {
        toast.warning("库存不足！");
      }
      return buyGoodsInfo;
    }
  },
  methods: {
    initData() {
      goodsDetail({ id: this.goodsId }).then(res => {
        const data = res.data.data;
        this.goods = data;
        this.loadEnd = true;
        //选择购买的商品属性
        this.goods.specificationList.forEach(item => {
          this.selGoodsSize.push({
            id: "",
            name: item.name,
            value: ""
          });
        });
      });

      cartGoodsCount().then(res => {
        this.cartInfo = res.data.data;
      });
    },
    standardActive() {
      this.standardFlag = !this.standardFlag;
    },
    paramsActive() {
      this.paramsFlag = !this.paramsFlag;
    },
    selSpecific(spec_index, item_index) {
      const curSpecificItem = "specificItem" + spec_index + "_" + item_index;
      const curSpecific = this.$refs[curSpecificItem][0];

      if (hasClass(curSpecific, "sel") || hasClass(curSpecific, "disable")) {
        return;
      }

      const curParentNode = curSpecific.parentNode;
      const curAllSpecific = curParentNode.getElementsByTagName("span");
      const buyStandardSiblings = siblings(curParentNode.parentNode);

      for (var i = 0; i < curAllSpecific.length; i++) {
        if (hasClass(curAllSpecific[i], "sel")) {
          removeClass(curAllSpecific[i], "sel");
          this.selGoodsSize[spec_index].value = "";
        }
      }

      addClass(curSpecific, "sel");

      const curSpecificHtml = curSpecific.innerHTML;
      this.selGoodsSize[spec_index].value = curSpecificHtml;
      this.selGoodsSize[spec_index].id = curSpecific.getAttribute("data-id");
      //库存不足禁止选择商品属性
      //let selGoodsSize = this.selGoodsSize;
      const goodsProductList = this.goods.productList;
      let curSelAllgroup = [];

      for (var i = 0; i < buyStandardSiblings.length; i++) {
        let allSiblingsSpecNode = getElementsByClassName(
          "standard-item",
          buyStandardSiblings[i]
        );
        for (var i = 0; i < allSiblingsSpecNode.length; i++) {
          if (hasClass(allSiblingsSpecNode[i], "disable")) {
            removeClass(allSiblingsSpecNode[i], "disable");
          }
        }
      }

      goodsProductList.forEach(gpro_item => {
        //先把当前选择的属性，并与之匹配的都找出来
        if (gpro_item.specifications.indexOf(curSpecificHtml) >= 0) {
          curSelAllgroup.push({
            number: gpro_item.number,
            specifications: gpro_item.specifications
          });
        }
      });

      curSelAllgroup.forEach(cursel_item => {
        cursel_item.specifications.forEach(spec_item => {
          if (spec_item != curSpecificHtml && cursel_item.number == 0) {
            for (var i = 0; i < buyStandardSiblings.length; i++) {
              let allSiblingsSpecNode = getElementsByClassName(
                "standard-item",
                buyStandardSiblings[i]
              );
              for (var i = 0; i < allSiblingsSpecNode.length; i++) {
                if (allSiblingsSpecNode[i].innerHTML == spec_item) {
                  addClass(allSiblingsSpecNode[i], "disable");
                }
              }
            }
          }
        });
      });
    },
    buyQuantityChange(number) {
      this.buyGoodsInfo.buyNumber = number;
    },
    addCartHandle() {
      if (!this.isSelAll) {
        toast.warning("请先选择商品参数！");
        return;
      }
      console.log(this.buyGoodsInfo);
      const buyGoodsInfo = this.buyGoodsInfo;
      let params = {
        goodsId: buyGoodsInfo.goodsId,
        number: buyGoodsInfo.buyNumber,
        productId: 0
      };

      if (_.has(buyGoodsInfo.specifications, "s3")) {
        toast.fail("目前仅支持两规格");
      } else if (_.has(buyGoodsInfo.specifications, "s2")) {
        params.productId = this.getProductId(
          buyGoodsInfo.specifications.s1,
          buyGoodsInfo.specifications.s2
        );
      } else {
        params.productId = this.getProductIdByOne(
          buyGoodsInfo.specifications.s1
        );
      }
      cartAdd(params).then(() => {
        this.cartInfo = this.cartInfo + buyGoodsInfo.buyNumber;
        toast.success("已添加至购物车");
        this.standardFlag = false;
      });
    },
    mustBuyHandle() {
      if (!this.isSelAll) {
        toast.warning("请先选择商品参数！");
        return;
      }
      console.log(this.buyGoodsInfo);
    },
    getProductId(s1, s2) {
      var productId;
      var s1_name;
      var s2_name;
      _.each(this.goods.specificationList, specification => {
        _.each(specification.valueList, specValue => {
          if (specValue.id === s1) {
            s1_name = specValue.value;
          } else if (specValue.id === s2) {
            s2_name = specValue.value;
          }
        });
      });

      _.each(this.goods.productList, v => {
        let result = _.without(v.specifications, s1_name, s2_name);
        if (result.length === 0) {
          productId = v.id;
        }
      });
      return productId;
    },
    getProductIdByOne(s1) {
      var productId;
      var s1_name;
      _.each(this.goods.specificationList, specification => {
        _.each(specification.valueList, specValue => {
          if (specValue.id === s1) {
            s1_name = specValue.value;
            return;
          }
        });
      });

      _.each(this.goods.productList, v => {
        let result = _.without(v.specifications, s1_name);
        if (result.length === 0) {
          productId = v.id;
        }
      });
      return productId;
    },
    _isSameArr(arr1, arr2) {
      let flag = true;
      if (arr1.length !== arr2.length) {
        flag = false;
      } else {
        arr1.forEach(item => {
          if (arr2.indexOf(item) === -1) {
            flag = false;
          }
        });
      }
      return flag;
    }
  }
};
</script>
<style lang="scss" scoped>
.default {
  height: 100%;
  padding: $header-h 0;
  .fixedHeader {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .default-scroll {
    height: 100%;
    overflow: hidden;
  }
  .default-cont {
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100.5%;
      overflow: hidden;

      .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .g-info-wrapper {
      padding: $pd-size-big;
      background-color: $wrapper-bg;
      p {
        margin-top: $pd-size-small;
      }
      p:first-child {
        margin-top: 0;
      }
      .g-price {
        .g-now-price {
          color: $price-color;
          font-size: $text-size-imp;
          margin-right: px2rem(6);
        }
        .g-old-price {
          color: $text-color-assist;
        }
      }
      .g-name {
        font-size: $text-size-big;
      }
      .g-intro {
        color: $text-color;
      }
    }
    .g-detail-wrapper {
      background-color: $wrapper-bg;
      margin-top: $pd-size;

      .g-params {
        li {
          padding: $pd-size-big;
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: $text-size-big;
          &::after {
            content: "";
            position: absolute;
            left: $pd-size-big;
            bottom: 0;
            right: 0;
            height: px2rem(2);
            background-color: $inner-wrapper-bg;
          }
          .par-right {
            color: $text-color-assist;
            display: flex;
            align-items: center;
            .iconfont {
              font-size: px2rem(40);
            }
          }
        }
      }
      .d-title {
        padding: $pd-size-big;
        font-size: $text-size-big;
        text-align: center;
        font-weight: normal;
      }
    }
  }
  .loadingWrapper {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
  }
  .pop-up-frame {
    background-color: $shadow-bg;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    &.show-enter-active,
    &.show-leave-active {
      transition: all 0.3s;
      .frame-cont {
        transition: all 0.3s ease-out;
      }
    }

    &.show-enter,
    &.show-leave-to {
      opacity: 0;
      .frame-cont {
        transform: translateY(100%);
      }
    }
    .frame-cont {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 90%;
      overflow-y: auto;
      background-color: $wrapper-bg;
      .icon-shibai {
        position: absolute;
        right: $pd-size-big;
        top: $pd-size-big;
        font-size: px2rem(40);
        color: $text-color-assist;
      }
      .params-cont {
        height: 100%;
        padding: px2rem(100) $pd-size-big $pd-size-big;
        .title-wrap {
          padding: $pd-size-big;
          font-weight: normal;
          text-align: center;
          font-size: $text-size-big;
          background-color: #fff;
          z-index: 10;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
        }
        .params-wrap {
          li {
            padding: $pd-size 0;
            display: flex;
            color: $text-color;

            &:first-child {
              padding-top: 0;
            }

            .par-name {
              width: px2rem(200);
            }
            .par-info {
              flex: 1;
            }
          }
        }
      }

      .buy-wrapper {
        height: 100%;
        padding: $pd-size-big $pd-size-big px2rem(160) $pd-size-big;

        .buy-top {
          padding-bottom: $pd-size-big;
          display: flex;
          align-items: center;
          .buy-img {
            background-color: $inner-wrapper-bg;
            height: px2rem(192);
            width: px2rem(192);
            margin-right: $pd-size-small;
            border-radius: px2rem(10);
            overflow: hidden;
            .min-img {
              display: block;
              height: 100%;
              width: 100%;
            }
          }

          .buy-info {
            .price-lump {
              color: $price-color;
              font-size: $text-size-imp;
            }
            .sel-info {
              color: $text-color;
              margin-top: px2rem(6);
            }
          }
        }
        @mixin space-mixin {
          padding: $pd-size 0;
          border-top: px2rem(2) solid #f3f3f3;
        }
        .buy-standard {
          padding-bottom: $pd-size;

          .bs-title {
            @include space-mixin;
            font-size: $text-size-big;
            font-weight: normal;
          }
          .bs-row {
            display: flex;
            flex-wrap: wrap;
            .standard-item {
              white-space: nowrap;
              padding: px2rem(10) px2rem(20);
              background-color: $inner-wrapper-bg;
              border-radius: px2rem(10);
              margin: px2rem(10) px2rem(20) px2rem(10) 0;
              color: $text-color;
              &.sel {
                color: #fff;
                background-color: $act-color;
              }
              &.disable {
                color: $text-color-assist;
                background-color: $disable-bg;
              }
            }
          }
        }
        .buy-sum {
          @include space-mixin;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .sum-txt {
            font-size: $text-size-big;
          }
        }
        .buy-bottom {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100%;
          background-color: #fff;
          z-index: 10;
          padding: px2rem(40) $pd-size-big;
        }
      }
    }
  }
  .empty-wrapper {
    padding: 0 $pd-size-big $pd-size-big;
    text-align: center;
    color: $text-color-assist;
  }

  .buy-btn {
    border-radius: px2rem(100);
    display: flex;
    overflow: hidden;
    span {
      flex: 1;
      color: #fff;
      font-size: $text-size-big;
      line-height: px2rem(80);
      text-align: center;
    }
    .add-cart-btn {
      background: $warning-btn-bg;
    }
    .must-buy-btn {
      background-color: $act-color;
    }
  }

  .details-bttom {
    position: fixed;
    z-index: 9;
    left: 0;
    bottom: 0;
    width: 100%;
    height: px2rem(100);
    background-color: $wrapper-bg;
    border-top: px2rem(2) solid $inner-wrapper-bg;
    display: flex;
    align-items: center;
    .iconfont {
      width: px2rem(100);
      height: px2rem(100);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: px2rem(40);
    }
    .icon-empty-cart {
      position: relative;
      em {
        min-width: px2rem(35);
        font-style: normal;
        text-align: center;
        padding: px2rem(2) px2rem(4);
        border-radius: px2rem(100);
        font-size: px2rem(24);
        background-color: $act-color;
        color: #fff;
        position: absolute;
        left: px2rem(60);
        top: px2rem(10);
        &:empty {
          display: none;
        }
      }
    }
    .buy-btn {
      flex: 1;
      height: px2rem(80);
    }
  }
}
</style>
<style lang="scss">
.d-info {
  img {
    display: block;
    width: 100%;
  }
}
</style>