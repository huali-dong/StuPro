<template>
    <section class="module-up">
        <div class="module-name">精彩活动</div>
        <swiper class="slide-ul" v-if = "billBord" :options="swiperOption" ref="mySwiper" >
                <swiper-slide class="slide-li"  v-for="(item,index) in billBord" :key="index">
                    <a >
                        <div class="img">
                            <img v-bind:src='"http://movie.miguvideo.com/publish/i_www"+item.imgSrc'/>  
                        </div>
                        <!-- <div class="info">
                            <p class="info-name">{{item.name}}</p>
                            <p class="info-logo">{{item.LONG_NAME}}</p>
                        </div> -->
                    </a>
                </swiper-slide>
        </swiper>
    </section>
</template>
<script>
let vm = null;
export default {
  props:["filmlist"],
  data() {
    return {
      swiperOption: {
        direction: "horizontal",
        freeMode: false,
        slidesPerView: "auto",
        spaceBetween: 30,
        loop: true,
        loopedSlides:1,
      //   on:{
      //     click:function(){
      //         let index = this.clickedIndex;
      //         vm.gotoDetail(index);
      //     }
      // }
    },
      billBord: null
    }
  },
   created() {
      vm = this;
  },
  watch:{
    filmlist(){
      //  console.log(this.filmlist[2].list);
      return this.billBord = this.filmlist[2].list;
    
    }
  },
   methods:{
    gotoDetail (index){
      // console.log(this.billBord[index].REDREICT_ID)
       this.$router.push({ name: "detail",query: {cid: this.billBord[index].REDREICT_ID}},)
    }
  }

};
</script>
<style lang="scss">
.module-up {
  height: 5.84375rem;
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
    // width: 10rem;
    height: 4.375rem;
    .slide-li {
      width: 10rem;
          height: 4.375rem;
      margin-right: 0 !important;
      float: left;
      padding-bottom: 5px;
      a {
        color: #000;
        .img {
          width: 10rem;
          height: 4.375rem;
          img{
             height: 4.375rem;
          }
        }
        .info {
          width: 3.1248rem;
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
