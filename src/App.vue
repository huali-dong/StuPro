<template>
  <div id="app">
      <app-home></app-home>
      <app-footer></app-footer>
  </div>
</template>


<script>
  import AppFooter from "@c/layout/appFooter";
  import AppHome from "@page/home/AppHome";
  export default {
      name : "app",
      components:{
        AppHome,
        AppFooter,
      }
  }
</script>
<style lang="scss">

</style>
