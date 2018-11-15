<template>
  <div id="app">
       <main>
           <router-view></router-view>
      </main>
       
  </div>
</template>


<script>
import {CHANGE_CITY} from "@store/chunks/mutations-types"
  export default {
      name : "app",
       beforeCreate () {
        // 一进来就先去定位更改城市信息, 如果有保存的，就别获取去了
        if ( localStorage.city ) {
            this.$store.commit({
                type:  CHANGE_CITY,
                cities: JSON.parse(localStorage.cities),
                city: JSON.parse(localStorage.city)
            })
        } else {
            this.$store.dispatch({type: 'getCurrentPosition'})
        }     
    },
  }
</script>
<style lang="scss">

</style>
