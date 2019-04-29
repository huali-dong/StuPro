<template>
    <section class="module-center">
        <div class="module-name">正在售票</div>
        <swiper class="slide-ul"   v-if = "billBord" :options="swiperOption" ref="mySwiper" >
                <swiper-slide class="slide-li" v-for="(item,index) in billBord" :key="index" >
                        <div class="img" >
                      <!-- <img v-bind:src='"http://movie.miguvideo.com/publish/i_www"+item.imgSrc'/>   -->
                             <img v-bind:src='"http://localhost:3000"+item.movieLogo'/>
                        </div>
                        <div class="info">
                            <p class="info-name">{{item.movieName}}</p>
                            <!-- <p class="info-logo">{{item.LONG_NAME}}</p> -->
                        </div>
                </swiper-slide>
        </swiper>
    </section>
</template>
<script>
let vm = null;
export default {
  data() {
    return {
      swiperOption: {
        autoplay:false,
        freeMode: false,
        slidesPerView: "auto",
        slidesOffsetAfter : 10,
        on:{
          click:function(){
              let index = this.clickedIndex;
              vm.gotoDetail(index);
          }
        }
      },
      billBord: null,
    };
  },
  props:["filmlist"],
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    created() {
      vm = this;
  },
  watch:{
      filmlist:{
         handler(){
            this.billBord = this.filmlist
            // this.billBord = this.filmlist[1].list
            console.log(this.filmlist)
         }
      }
  },
  methods:{
    gotoDetail (index){
       this.$router.push({ name: "detail",query: {cid: this.billBord[index].movieId}},)
    }
  }
};
</script>
<style lang="scss">
.module-center {
  width: 10rem;
  height: 7.36rem;
  margin-top: .266667rem;
  background: #fff;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  position: relative;
  .module-name {
    height: 1.2rem;
    line-height: 1.2rem;
    background-size: 0.08rem 0.613333rem;
    padding-left: 0.213333rem;
    padding-right: 0.32rem;
    color: #666;
    font-size: 16px !important;
    border-left: 0.08rem solid #f74444;
  }
  .swiper-container{
    // width: 100%;
    height: 6.106667rem;
    position: relative;
    .slide-li {
      width: 3.143467rem;
      height: 5.981333rem;
      // margin-right: 0 !important;
      float: left;
      padding-bottom: 5px;
      margin-right: .3125rem;
      // a {
        color: #000;
        .img {
          width: 3.125067rem;
          height: 4.773333rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .info {
          width: 3.1248rem;
          height: 0px;
          p {
            line-height: 1.7em;
            padding-left: 12px;
            padding-right: 12px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            height: .586667rem;
          }
          .info-name{
              color:  #666;
              font-size: .373333rem;
          }
          .info-logo{
              color: #999;
              font-size: .346667rem;
          }
        }
      // }
    }
  }
}
</style>
