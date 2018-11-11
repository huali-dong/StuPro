<template>
    <div class="mine-page-wrapper">
        <div class="mine-title">
            <span>我的</span>
        </div>
        <div class="mine-head">
            <div class="mine-head-userPhone">
                <img src="/images/defaultPhoto.png">
            </div>
            <p @click="toLogin" class="mine-login">
                <span>
                    <a>{{phone}}</a>
                </span>
            </p>
            <div class="mine-head-right">
                <i></i>
            </div>
        </div>
        <div class="mine-body">
                <div class="mine-body-list">
                    <div class="mine-body-list-order">
                        <i></i>
                        <span>我的订单</span>
                    </div>
                </div>
        </div>
        <div class="mine-foot"></div>
        
    </div>
    
</template>
<script>
export default {
    data(){
        return {
            phone:"点击登陆",
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            console.log(vm)
            // let msg = JSON.parse(localStorage.getItem("userInfo"));
            // if(msg){
            //     this.phone = msg;
            // }
        })
    },
    methods:{
        toLogin(){
            this.$router.push({name:"login"})
        }
    }
    
}
</script>
<style lang="scss">
    .mine-page-wrapper{
        height: 12.746667rem;
        margin-bottom: 2.4rem;
        position: relative;
        background-color: #f0f0f0;
        .mine-title{
                text-align: center;
                color: #333;
                font-size: 17px;
                padding: 10px;
                background-color: #fff;
                border-bottom: 1px solid #f0f0f0;
                position: relative;
                span{
                    position: relative;
                    top: 3px;
                }
        }
        .mine-head{
            padding: 20px 10px;
            background-color: #fff;
            position: relative;
            height: 2.56rem;
            .mine-login{
                    width: 49.98%;
                    height: 1.493333rem;
                    line-height: 1.493333rem;
                    padding-left: .266667rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    float: left;
                    a{
                        list-style: none;
                        color: #000;
                    }
            }
            .mine-head-userPhone{
                    width: 16.66%;
                    text-align: right;
                    float: left;
                    img{
                        width: 1.493333rem;
                        height: 1.493333rem;
                    }
            }
        }
        .mine-body{
            height: 8.746667rem;
            .mine-body-list{
                    margin-top: .266667rem;
                    background-color: #fff;
                    color: #1a1a1a;
                    font-size: .4rem;
                    .mine-body-list-order{
                            padding: .266667rem .32rem;
                            border-bottom: 1px solid #dbdbdb;;
                    }
            }
        }
    }
</style>
