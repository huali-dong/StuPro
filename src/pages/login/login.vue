<template>
<div>
  
     <header>
        <h1>短信登录</h1>
          <a class="back" @click="back"></a>
    </header>
    <div class="con">
            <div class="logo"></div>
            <form @submit.prevent = "login" >
              <div class="login-phone">
                <input required type="text" v-model="phone" class="phone" placeholder="手机号码">
              </div>
                <div class="login-password">
                  <input required type="password" v-model="code" class="password" placeholder="短信验证码">
                  <input type="button"  @click="sendCode" class="btn1"  v-model="msg">
                </div>
                 <button type="submit" class="center-block submit" >登录</button>
            </form>
    </div>
</div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      phone: "13198487983",
      resendTime: 60,
      isResend: false,
      msg:"获取验证码",
      code: "",
      history : ""
    }
  },
    methods: {
      sendCode() {
        if (!this.isResend) {
          this.$http
            .post("/mz/v4/api/code?__t" + Date.now(), {
              mobile: this.phone,
              type: "2"
            })
            .then(res => {
              // console.log(res)
              if (res.data.status == 0 ) {
                this.authCode();
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      login() {
      this.$http
        .post("/mz/v4/api/login?__t" + Date.now(), {
          loginType: 1,
          password: this.code,
          username: this.phone
        })
        .then((res) => {
          // console.log(res);
          if (res.data.status === 0 ||res.data.status === -23117) {
            // 验证码发送成功
            // 存储
            console.log(this.phone)
            localStorage.setItem("userInfo", JSON.stringify(this.phone));
            this.$router.replace({ name: "mine" });
          }
          // }else if(res.data.status === -23117){
          //     Toast({
          //     message: '输入的验证码有误',
          //     position: 'middle',
          //     duration: 5000
          //   });
          // }
        });
    },
    authCode() {
      // 验证码处理
        this.isResend = true;
        this.timer = setInterval(() => {
        this.resendTime--;
        this.msg='重新获取'+this.resendTime;
        if (this.resendTime === 0) {
          clearInterval(this.timer);
          this.isResend = false;
          this.resendTime = 60;
          this.msg="获取验证码"
        }
      }, 1000);
    },
    back(){
        this.$router.back()
    }
    },
};
</script>
<style lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.173333rem;
  line-height: 1.173333rem;
  border-bottom: 1px solid #eef1f3;
  background-color: #fff;
  z-index: 200;
  h1 {
    font-size: 0.48rem;
    font-weight: normal;
    text-align: center;
  }
  .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.333333rem;
    height: 1.173333rem;
    &::before {
      position: absolute;
      content: "";
      top: 0.48rem;
      left: 0.48rem;
      width: 0.3rem;
      height: 0.3rem;
      border-top: 1px solid #31363e;
      border-left: 1px solid #31363e;
      -webkit-transform: rotateZ(-45deg);
    }
  }
}
.con {
  height: 14.826667rem;
  width: 100%;
  padding-top: 1.2rem;
  .logo {
    margin: 0.8rem auto;
    width: 3.68rem;
    height: 0.906667rem;
    background: url("/images/migu-logo.png") no-repeat center center;
    background-size: 100% 100%;
  }
  form {
    .submit{
        display: inline-block;
        margin-top: .533333rem;
      width: 85%;
      margin-left: .533333rem;
      height: 1.173333rem;
      line-height: 1.173333rem;
      border: none;
      outline: none;
      text-align: center;
      font-size: .426667rem;
      color: #fff;
      background-color: #e11377;
      border-radius: .384rem;
    }
    input {
      outline: none;
      width: 100%;
      height: 0.64rem;
      border: none;
      outline: none;
      font-size: 0.426667rem;
      line-height: 0.64rem;
      padding: 0.346667rem 0;
      color: #31363e;
    }
    .btn1 {
      display: inline-block;
      line-height: 0.746667rem;
      width: 2.666667rem;
      height: 0.746667rem;
      text-align: center;
      font-size: 0.373333rem;
      color: #e11377;
      background-color: #fff;
      border: 1px solid #e11377;
      border-radius: 0.384rem;
      padding: 0 0.373333rem;
      position: absolute;
      top: 0.346667rem;
      right: 0.533333rem;
    }
    .login-phone,
    .login-password {
      width: 8.613333rem;
      position: relative;
      font-size: 0.426667rem;
      padding: 0 0.266667rem;
      line-height: 1.333333rem;
      border-bottom: 1px solid #dbdddf;
      margin: auto;

      &:hover {
        border-bottom: 1px solid #e11377;
      }
    }
  }
}
</style>
