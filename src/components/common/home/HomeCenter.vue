<template>
    <section class="module-center">
        <div class="module-name">正在售票</div>
        <swiper class="slide-ul"   v-if = "billBord" :options="swiperOption" ref="mySwiper" >
                <swiper-slide class="slide-li" v-for="(item,index) in billBord" :key="index" >
                    <a >
                        <div class="img" >
                            <img v-bind:src='"http://movie.miguvideo.com/publish/i_www"+item.imgSrc'/>  
                        </div>
                        <div class="info">
                            <p class="info-name">{{item.name}}</p>
                            <p class="info-logo">{{item.LONG_NAME}}</p>
                        </div>
                    </a>
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
         freeMode: true,
        slidesPerView: "auto",
        spaceBetween: 30,
        slidesOffsetAfter: 0,
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
            this.billBord = this.filmlist[1].list
         }
      }
  },
  methods:{
    gotoDetail (index){
       this.$router.push({ name: "detail",query: {cid: this.billBord[index].SRC_CONT_ID}},)
    }
  }
};
</script>
<style lang="scss">
.module-center {
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
  .slide-ul {
    width: 10rem;
    height: 6.106667rem;
    .slide-li {
      width: 3.143467rem;
      height: 5.981333rem;
      margin-right: 0 !important;
      float: left;
      padding-bottom: 5px;
      a {
        color: #000;
        .img {
          width: 3.125067rem;
          height: 4.773333rem;
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
      }
    }
  }
}
</style>
