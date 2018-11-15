<template>
    <div>
        <order-header></order-header>
        <!-- <order-main></order-main> -->
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
    
</template>
<script>
// import OrderMain from "@c/common/order/OrderMain";
import AppFooter from "@c/layout/appFooter";
import OrderHeader from "@c/layout/order/appOrderHeader"
export default {
    components:{
        OrderHeader,
        // OrderMain,
        AppFooter,
    }
}
</script>
<style lang="scss">

</style>
