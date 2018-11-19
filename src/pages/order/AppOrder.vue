<template>
    <div>
        <order-header></order-header>
        <!-- <order-main></order-main> -->
        <router-view ></router-view>
        <app-footer ></app-footer>
         <div @click="backTop" v-if="isbackshow"  class="back-top animated">
                <i class="fa fa-arrow-up"></i>
        </div> 
    </div>
    
</template>
<script>
// import OrderMain from "@c/common/order/OrderMain";
import AppFooter from "@c/layout/appFooter";
import OrderHeader from "@c/layout/order/appOrderHeader"
export default {
    data(){
        return {
            isbackshow:false
        }
    },
    methods:{
        backTop(){
            this.$bus.$emit("backtop")
        }
    },
    mounted() {
        this.$bus.$on("changebackshow",()=>{
            this.isbackshow = true
        })
         this.$bus.$on("changeback",()=>{
            this.isbackshow = false
        })
    },
    components:{
        OrderHeader,
        // OrderMain,
        AppFooter,
    }
}
</script>
<style lang="scss">
.back-top {
       position: fixed;
       right: .533333rem;
       bottom: 1.533333rem;
        background-color: rgba(0,0,0,0.7);
        width: 1.28rem;
        height: 1.28rem;
        line-height: 1.28rem;
        color: #fff;
        text-align: center;
        border-radius: 50%;
        overflow: hidden;
        cursor: pointer;
   } 
</style>
