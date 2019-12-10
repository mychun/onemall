<template>
  <div class="user">
    <div class="top" :style="{backgroundImage: `url(${background_image})`}">
      <span class="set"><i class="iconfont icon-shezhi-"></i></span>
      <div class="info">
        <img :src="avatar" />
        <span class="name">user123</span>
      </div>
    </div>
    <div class="user-wrapper">
      <ul class="lr-wapper">
          <li class="lr-row">
            <span class="lr-left">我的订单</span>
            <span class="lr-right">
              全部订单<i class="iconfont icon-youdanjiantou"></i>
            </span>
          </li>
      </ul>
      <ul class="lump-row">
        <li>
          <i class="iconfont icon-icon-test"></i>
          <i class="col-txt">待付款</i>
        </li>
        <li>
          <i class="iconfont icon-daifahuo"></i>
          <i class="col-txt">待发货</i>
        </li>
        <li>
          <i class="iconfont icon-daishouhuo"></i>
          <i class="col-txt">待收货</i>
        </li>
        <li>
          <i class="iconfont icon-yiwancheng"></i>
          <i class="col-txt">已完成</i>
        </li>
      </ul>
    </div>
    <div class="user-wrapper">
      <ul class="lr-wapper">
          <li class="lr-row">
            <span class="lr-left"><i class="iconfont icon-shoucang1"></i>我的收藏</span>
            <span class="lr-right">
              <i class="iconfont icon-youdanjiantou"></i>
            </span>
          </li>
          <router-link tag="li" to="/user/address" class="lr-row">
            <span class="lr-left"><i class="iconfont icon-shouhuodizhi"></i>收货地址</span>
            <span class="lr-right">
              <i class="iconfont icon-youdanjiantou"></i>
            </span>
          </router-link>
          <li class="lr-row">
            <span class="lr-left"><i class="iconfont icon-tubiao-"></i>服务中心</span>
            <span class="lr-right">
              <i class="iconfont icon-youdanjiantou"></i>
            </span>
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { userIndex } from "@/api/api";
import avatar_default from '@/assets/img/avatar_default.png';
import bgDefault from "@/assets/img/user_head_bg.png";
export default {
  name: "user",
  data(){
    return{
      background_image: bgDefault,
      avatar: avatar_default,
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      userIndex().then(res => {
        console.log(res.data.data.order);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user{
  .top{
    height: px2rem(260);
    background-repeat: no-repeat;
    background-size: cover;

    .set{ position:absolute; top: $pd-size; right: $pd-size;
      .iconfont{
         font-size: px2rem(60);
         color: #fff;
      }
    }
    .info{
      padding-top: px2rem(60);
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
        width: px2rem(110);
        height: px2rem(110);
        border-radius: 50%;
      }
      .name{
        margin-top: px2rem(20);
        color: #fff;
        font-size: $text-size-mid;
      }
    }
  }
  .user-wrapper{
    background-color: $wrapper-bg;
    margin-top: $pd-size-big;

    .lump-row{
      display:flex;
      padding-bottom: $pd-size-big;
      li{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        &::before{
          content: '';
          position:absolute;
          right: 0;
          top: 0;
          bottom: 0;
          border-right: px2rem(2) solid $inner-wrapper-bg;
        }
        .iconfont{
          color: $text-color;
          font-size: px2rem(60);
        }
        .col-txt{
          margin-top: px2rem(6);
        }
      }
    }
  }
}
</style>