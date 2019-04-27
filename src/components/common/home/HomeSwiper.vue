<template>
    <section class="module">
        <div v-if = "bg_img" class="blur" :style = "{backgroundImage: 'url(http://movie.miguvideo.com/publish/i_www'+bg_img+')'}"></div>
        <swiper class="slide-ul" v-if = "billBord" :options="swiperOption" ref="mySwiper" >
                <swiper-slide class="slide-li"  v-for="(item,index) in billBord" :key="index">
                    <a >
                    <img v-bind:src='"http://movie.miguvideo.com/publish/i_www"+item.imgSrc'/>  
                    </a>
                </swiper-slide>
        </swiper>
    </section>
  
</template>

<script>
export default {
  props:["filmlist"],
  data() {
    return {
      swiperOption: null,
      billBord: null,
      bg_img: "/image/70/492/369.jpg",
    };
  },
 created(){
        // this.swiperOption =  {
        //     effect: "coverflow",
        //     slidesPerView: 3,
        //     centeredSlides: true,
        //     coverflow: {
        //         rotate: 30,
        //         stretch: 6,
        //         depth: 30,
        //         modifier: 2,
        //         slideShadows: true
        //     },
        //     on: {
        //         slideChangeTransitionEnd: function(){
        //             // console.log(1, res.data[0].list[this.activeIndex].imgSrc)
        //             this.bg_img = this.filmlist[0].list[this.activeIndex].imgSrc
        //         }
        //     }
        // },
        // this.billBord = this.filmlist.list
     
    
    this.$http
      .get("/mg/lovev/miguMovie/data/seeFilmData.jsp")
      // .get("http://localhost:3000/api/v1/movie/list")
      .then(res => {
          let that = this
        this.swiperOption =  {
            effect: "coverflow",
            slidesPerView: 3,
            centeredSlides: true,
            loop: true,
            loopedSlides:1,
            coverflow: {
                rotate: 30,
                stretch: 6,
                depth: 30,
                modifier: 2,
                slideShadows: true
            },
            on: {
                slideChangeTransitionEnd: function(){
                    // console.log(1, res.data[0].list[this.activeIndex].imgSrc)
                    that.bg_img = res.data[0].list[this.activeIndex].imgSrc
                }
            }
        }
        this.billBord = res.data[0].list;
      })
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.animate;
    }
  }
};
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
