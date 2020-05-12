<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules">
      <h3 class="login-title">管理员登录</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          name="password"
          :type="passwordType"
          auto-complete="on"
          placeholder="password"
        />
        <span class="show-pwd" @click="cutShowPsw">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-button :loading="loading" @click.native.prevent="handleLogin" type="primary">登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("管理员密码长度应大于6"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin123",
        password: "admin123"
      },
      loginRules: {
        username: [
          { required: true, message: "管理员账户不允许为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "管理员密码不允许为空", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
        ]
      },
      loading: false,
      passwordType: 'password'
    };
  },
  methods: {
      cutShowPsw(){
          this.passwordType = this.passwordType == 'password' ? '' : 'password';
      },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid && !this.loading) {
          this.loading = true;
          
          this.$store.dispatch('LoginByUsername', this.loginForm)
            .then(() => {
                this.loading = false
                this.$router.push( { path: '/' })
            })
            .catch( err => {
                this.loading = false
                this.$notify.error({
                    title: '失败',
                    message: err.data.errmsg
                })
            })
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

.login-container {
  .el-input {
    height: 47px;
    padding-left: 48px;
    padding-right: 48px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $light_gray;
      height: 47px;
      line-height: 47px;
      padding: 0;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-button {
    width: 100%;
    padding: 15.5px 0;
  }
}
</style>
<style lang="scss" scoped>
.login-container {
  height: 100%;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 520px;
  padding: 35px 35px 15px 35px;
}
.login-title {
  font-size: 26px;
  text-align: center;
  margin-bottom: 40px;
  color: #eee;
}
.svg-container,
.show-pwd {
  position: absolute;
  left: 15px;
  color: #889aa4;
  font-size: 18px;
  z-index: 1;
  line-height: 47px;
}
.show-pwd {
  left: auto;
  right: 15px;
  cursor: pointer;
}
</style>