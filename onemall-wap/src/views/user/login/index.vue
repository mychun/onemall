<template>
  <div class="login">
    <div class="login-top">
      <img class="avatar_default" src="@/assets/img/avatar_default.png" />
      <span class="pro-login">Onemall-login</span>
    </div>
    <div class="form-wrapper">
      <p class="form-input">
        <i class="iconfont icon-user"></i>
        <input type="text" v-model="account" class="form-contrl" placeholder="请输入测试账号user123" />
        <i v-show="account" @click="clearInput('account')" class="iconfont icon-shanchu"></i>
      </p>
      <p class="form-input">
        <i class="iconfont icon-mima"></i>
        <input type="password" v-model="password" class="form-contrl" placeholder="请输入测试密码user123" />
        <i v-show="password" @click="clearInput('password')" class="iconfont icon-shanchu"></i>
      </p>
      <p class="form-link">
        <span>免费注册</span>
        <span>忘记密码</span>
      </p>
      <p class="form-btn">
        <input class="btn btn-red" type="button" @click="submitLogin" value="登 录" />
      </p>
    </div>
  </div>
</template>
<script>
import { toast } from "@/components/dialog";
import { getElementsByClassName } from "@/utils/dom";
import { authLoginByAccount } from "@/api/api";
import { emailReg, mobileReg } from "@/utils/validate";
import { setLocalStorage } from "@/utils/cache";
import { mapMutations } from "vuex";

export default {
  name: "login",
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    submitLogin() {
      if (!this.verifyInput) return;

      let loginData = this.getLoginData();
      authLoginByAccount(loginData)
        .then(res => {
          const userInfo = res.data.data.userInfo;
          console.log(res.data.data);
          setLocalStorage({
            Authorization: res.data.data.token,
            avatar: userInfo.avatarUrl,
            nickName: userInfo.nickName
          });

          this.setAuthorization(res.data.data.token);
          this.setAvatar(userInfo.avatarUrl);
          this.setNickName(userInfo.nickName);

          toast.success("登录成功！");
          setTimeout(() => {
            if(!document.referrer){
              this.$router.push({
                path: "/user"
              });
            }else{
              window.location.replace(document.referrer);
            }
          }, 1500);
        })
        .catch(error => {
          toast.fail(error.data.errmsg);
        });
    },
    ...mapMutations({
      setAuthorization: "SET_AUTHORIZATION",
      setAvatar: "SET_AVATAR",
      setNickName: "SET_NICKNAME"
    }),
    verifyInput() {
      if (!this.account || !this.password) {
        toast.fail("请输入帐号或密码");
        return false;
      }
    },
    getLoginData() {
      const password = this.password;
      const account = this._getUserType(this.account);
      return {
        [account]: this.account,
        password: password
      };
    },
    clearInput(type) {
      if (type == "account") {
        this.account = "";
      }
      if (type == "password") {
        this.password = "";
      }
    },
    _getUserType(account) {
      const accountType = mobileReg.test(account)
        ? "mobile"
        : emailReg.test(account)
        ? "email"
        : "username";
      return accountType;
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  background-color: #fff;
  .login-top {
    padding: px2rem(60) 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar_default {
      width: px2rem(110);
      height: px2rem(110);
      border-radius: 50%;
    }
    .pro-login {
      margin-top: px2rem(20);
      font-size: $text-size-big;
    }
  }
}
</style>