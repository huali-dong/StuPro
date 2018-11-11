<template>
    <div>
        <home-header></home-header>
        <div class="home-box">
            <home-swiper ></home-swiper>
            <home-center :filmlist = "filmlist"></home-center>
            <home-up :filmlist = "filmlist"></home-up>
        </div>
        <app-footer></app-footer>
    </div>
</template>
<script>
import HomeHeader from "@c/common/home/HomeHeader";
import HomeSwiper from "@c/common/home/HomeSwiper";
import HomeCenter from "@c/common/home/HomeCenter";
import HomeUp from "@c/common/home/HomeUp";
import AppFooter from "@c/layout/appFooter";
export default {
  components: {
    HomeHeader,
    HomeSwiper,
    HomeCenter,
    HomeUp,
    AppFooter
  },
  data(){
      return {
          filmlist:[],
      }
  },
  created() {
      this.$http.get("/mg/lovev/miguMovie/data/seeFilmData.jsp")
      .then((res)=>{
          this.filmlist = res.data
      }).catch((err)=>{
          consoel.log(err)
      })
  },
};
</script>
<style lang="scss">
.home-box {
    background: #efefef;
    margin-bottom: 1.173333rem;
    padding-bottom: .266667rem;

}
</style>
