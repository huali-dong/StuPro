<template>
    <div>
        <header>
            <h1>{{title}}</h1>
            <a class="back" @click="back"></a>
            <div class="change" @click="change">{{otherTitle}}</div>
        </header>
        <div class="con">
            <div class="logo"></div>
            <!-- <form @submit.prevent="sumbit"> -->
                <div class="login-phone">
                    <input required type="text" v-model="phoneNumber" class="phone" placeholder="请输入手机号码">
                </div>
                <div class="login-password">
                    <input
                        required
                        type="password"
                        class="password"
                        placeholder="请输入密码"
                        v-model="password"
                    >
                </div>
                <div v-if="title==='注册'" class="login-password">
                    <input type="password" v-model="confirmpassword"  class="password" placeholder="请确认密码">
                </div>
                <div  @click="handersign" class="submit">{{title}}</div>
            <!-- </form> -->
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  props: ['title','otherTitle','router'],
  data() {
    return {
      router:this.props.router,
      phoneNumber:'',
      password:'',
      confirmpassword:'',
      title:this.title
    };
  },
  methods: {
    handersign(){
        let  reg= /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(this.title=="注册") {
                    if(!reg.test(this.phoneNumber)){
            Toast({
                message: '输入手机号码有误',
                position: 'top',
                duration: 3000
                });
        }else if(this.password!==this.confirmpassword){
             Toast({
                message: '两次输入密码不一致',
                position: 'top',
                duration: 3000
                });
        }else{
             this.$http({
                url: 'http://localhost:3000/api/v1/frontadmin/signup',
                method: 'POST',
                data: {
                    mobile:this.phoneNumber,
                    password:this.password
                }
        }).then((res)=>{
            console.log(res)
            if(res.data.status==201){
                Toast({
                message: '用户名已存在',
                position: 'top',
                duration: 3000
                });
            }else{  
                this.$router.push({ name: "login"})
            } 
        })
        }
    }else{
        this.$http({
                url: 'http://localhost:3000/api/v1/frontadmin/signin',
                method: 'POST',
                data: {
                    mobile:this.phoneNumber,
                    password:this.password
                }
        }).then((res)=>{
            if(res.data.status==202){
                Toast({
                message: '用户名不存在',
                position: 'top',
                duration: 3000
                });
            }else if(res.data.status==203){  
                 Toast({
                message: '密码输入错误',
                position: 'top',
                duration: 3000
                });
            }else{
              if(this.$route.query.detail=='detail'&&this.$route.query.detail){//判断路由 是进入详情页还是我的页面
                localStorage.setItem("user",this.phoneNumber)
                this.$router.push({name:"seat",query:{detailInfo:this.$route.query.detailInfo}})
              }else{
                localStorage.setItem("user",this.phoneNumber)
                this.$router.push({ name: "mine"});  
              } 
            } 
        })
        
        }
    },
    back() {
      this.$router.push({ name: "mine"})
    },
    change(){
        this.$router.push({ name: this.router})
    }
  }
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
  .change{
      position: absolute;
      top:0px;
      right:.625rem;
      font-size: 0.48rem;
      font-weight: normal;
  }
  h1 {
    font-size: 0.48rem;
    font-weight: normal;
    text-align: center;
    color: #e11377;
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
  
    .submit {
      display: inline-block;
      margin-top: 0.533333rem;
      width: 85%;
      margin-left: 0.533333rem;
      height: 1.173333rem;
      line-height: 1.173333rem;
      border: none;
      outline: none;
      text-align: center;
      font-size: 0.426667rem;
      color: #fff;
      background-color: #e11377;
      border-radius: 0.384rem;
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

</style>
