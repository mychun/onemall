<template>
    <div class="tab">
        <router-link tag="div" to="/index" class="tab-item">
            <i class="iconfont icon-shouye"></i>
            <span>首页</span>
        </router-link>
        <router-link tag="div" to="/category" class="tab-item">
            <i class="iconfont icon-icon-category"></i>
            <span>分类</span>
        </router-link>
        <router-link tag="div" to="/cart" class="tab-item">
            <i class="iconfont icon-shopping_car_grey"></i>
            <span>购物车</span>
        </router-link>
        <router-link tag="div" to="/user" class="tab-item">
            <i class="iconfont icon-wode"></i>
            <span>我的</span>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'tab'
}
</script>
<style lang="scss" scoped>
.tab{
    position: fixed;
    left: 0;
    bottom: 0;
    width:100%;
    z-index: 10;
    height: px2rem(100);
    background-color: $wrapper-bg;
    border-top: 1px solid $inner-wrapper-bg;
    display: flex;
    .tab-item{
        flex: 1;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: px2rem(4);
        &.router-link-active{
            color:$act-color;
        }
        .iconfont{
            font-size: px2rem(40);
        }
        span{
            font-size: $text-size-small;
        }
    }
}
</style>