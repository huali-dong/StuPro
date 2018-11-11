<template>
    <div>
        <order-header></order-header>
        <app-footer></app-footer>
    </div>
    
</template>
<script>
import OrderHeader from "@c/common/order/Order-header";
import AppFooter from "@c/layout/appFooter";
export default {
    components:{
        OrderHeader,
        AppFooter,
    }
}
</script>
<style lang="scss">

</style>
