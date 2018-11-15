<template>
    <div>
         <section class="module">
        <div class="blur"></div>
        <swiper class="slide-ul" :options="swiperOption" ref="mySwiper" >
                <swiper-slide class="slide-li" >
                    <a >
                    <img />  
                    </a>
                </swiper-slide>
        </swiper>
    </section>
    </div>
</template>
<script>
export default {
   data(){
       return {
            swiperOption: {
         freeMode: true,
        slidesPerView: "auto",
        spaceBetween: 30,
        slidesOffsetAfter: 0,
            }
       }
   }
}
</script>
<style lang="scss">
.module {
  margin-top: 2.133333rem;
  margin-bottom: 0.266667rem;
  background: #fff;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  position: relative;
  height: 8.986667rem;
  .blur {
    filter: blur(35px);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  .slide-ul{
     .slide-li{
       width: 5rem !important;
       height: 7.413333rem !important;
       margin-top: 1.066667rem;
        img{
          width: 5rem;
          height: 7.413333rem
        }
  }
  }
}
</style>
