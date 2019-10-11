<template>
    <div class="empty-hint">
        <i class="iconfont icon-ku"></i>
        <span class="empty-txt">{{emptyTxt}}</span>
    </div>
</template>
<script>
export default {
    name: 'empty-hint',
    props: {
        emptyTxt: {
            type: String,
            default: '暂无数据'
        }
    }
}
</script>
<style lang="scss" scoped>
    .empty-hint{
        background-color: $wrapper-bg;
        padding: px2rem(60) 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $text-color;
        .icon-ku{
            font-size: px2rem(40);
            margin-right: px2rem(10);
        }
        .empty-txt{
            font-size: $text-size-mid;
        }
    }
</style>