<template>
    <div class="box">
        <div class="finish">
            已支付成功
        </div>
        <div class="button" @click="back">回到首页</div>
    </div>
</template>
<script>
export default {
    methods:{
        back(){
             this.$router.push({ name: "home"})
        }
    }
}
</script>
<style lang="scss">
    .box{
        width:100%;
        height:17.8rem;
        background-color: #f0f0f0;
        .finish{
            width: 100%;
            height: 3.125rem;
            line-height: 3.125rem;
            font-size: 26px;
            color:#f74444;
            border: 1px solid #ffffff;
            text-align: center;
        }
        .button{
            width: 100px;
            height: 50px;
            line-height: 50px;
            background-color: #f74444;
            border-radius: .1875rem;
            margin-left: 100px;
            color: #fff;
            // text-align: center;
            margin-top: .625rem;
            padding-left: .625rem;
        }
    }
</style>
