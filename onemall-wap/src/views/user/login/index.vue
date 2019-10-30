<template>
    <div class="login">
        <div class="login-top">
            <img class="avatar_default" src="@/assets/img/avatar_default.png" />
            <span class="pro-login">Onemall-login</span>
        </div>
        <div class="form-wrapper">
            <p class="form-input">
                <i class="iconfont icon-user"></i>
                <input type="text" class="form-contrl" placeholder="请输入测试账号user123" />
            </p>
            <p class="form-input">
                <i class="iconfont icon-mima"></i>
                <input type="password" class="form-contrl" placeholder="请输入测试密码user123" />
            </p>
            <p class="form-link">
                <span>免费注册</span>
                <span>忘记密码</span>
            </p>
            <p class="form-btn">
                <input class="btn btn-red" type="button" value="登 录" />
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login'
}
</script>
<style lang="scss" scoped>
.login{
    height: 100%;
    background-color: #fff;
    .login-top{
        padding: px2rem(60) 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .avatar_default{
            width: px2rem(110);
            height: px2rem(110);
            border-radius: 50%;
        }
        .pro-login{
            margin-top: px2rem(20);
            font-size: $text-size-big;
        }
    }
}
</style>