<template>
     <div class="detail-footer">
            <div class="detail-fixed">
                <ul>
                    <li class="bot-list" id="collect" @click="login">
                        <i class="icon-small"></i>
                        <span>&nbsp;我的</span>
                    </li>
                    <li class="bot-list " @click="buy" id="buyticket">选座购票</li>
                </ul>
            </div>
        </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
      return {
          cid:this.$route.query.cid,
          detail:null
      }
      
    },
    created() {
      this.$http
        .get("mg/publish/i_www/resource/lovev/miguMovie/detail/detail_data.jsp?cid=" +this.cid)
        .then(res => {
          this.detail = res.data[0];
        })
        .catch(err => {
          console.log(err);
        });
  },
    methods:{
       buy(){
        if(localStorage.getItem("user")){
          this.$router.push({name:"cinema"})
        }else{
          Toast({
            message: '请先点击"我的"登录',
            position: 'bottom',
            duration: 3000
          });
          // setTimeout(function(){
          //   console.log("login")
          //   this.$router.push({ name: "login"})
          // }, 3000);
         } 
      },
      login(){
        if(localStorage.getItem("user")){
          this.$router.push({ name: "mine"})
        }else{
          this.$router.push({ name: "login",query:{detail:"detail",detailInfo:this.detail}})
        }
         
      }
    }
}
</script>
<style lang="scss">
  .detail-footer {
    .detail-fixed {
      border-top: 1px solid #e6e6e6;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      float: left;
      background-color: #fff;
      z-index: 100;
      .bot-list {
        padding: .266667rem 0px;
        float: left;
        text-align: center;
        font-size: .346667rem;
        color: #fff;
      }
      .icon-small {
        display: inline-block;
        width: .453333rem;
        height: .453333rem;
        background-size: cover;
        background-repeat: no-repeat;
        padding-right: 1px;
      }
      #collect {
        color: #3a3a3a;
        width: 50%;
        i {
          background-image: url("http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/icon/star-grey.png");
          position: relative;
          top: .053333rem;
          
        }
      }
      #edit{
          width: 25%;
          color: #3a3a3a;
          i{
                  background-image: url("http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/icon/edit1.png");
          position: relative;
          top: .053333rem;
          }
      }
      #buyticket{
        padding: 15px 0px 10px;
        display: list-item;
        background-color: #FEC22C;
        width: 50%;
        float: right;
      }
    }
  }
</style>
