<template>
    <div class="register">
        <div class="form-wrapper">
            <p class="hint-txt">我们将发送验证码到您的手机</p>
            <p class="form-input">
                <i class="iconfont icon-shouji"></i>
                <input type="text" class="form-contrl" placeholder="请输入手机号" />
            </p>
            <p class="form-input">
                <i class="iconfont icon-yanzhengma-"></i>
                <input type="text" class="form-contrl" placeholder="请输入短信验证码" />
                <span class="right-txt">获取验证码</span>
            </p>
            <p class="form-input">
                <i class="iconfont icon-mima"></i>
                <input type="password" class="form-contrl" placeholder="请输入密码" />
            </p>
            <p class="form-input">
                <i class="iconfont icon-mima"></i>
                <input type="password" class="form-contrl" placeholder="请再次确认密码" />
            </p>
            <p class="form-btn">
                <input class="btn btn-red" type="button" value="注 册" />
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'register'
}
</script>
<style lang="scss" scoped>
.register{
    height: 100%;
    background-color: #fff;
    padding: px2rem(60) 0;
}
</style>