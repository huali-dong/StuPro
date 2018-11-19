<template>
    <div>
        <section class="cinema-module  blur">
            <swiper class="slide-ul" :options="swiperOption" ref="mySwiper" >
                    <swiper-slide class="slide-li"
                        v-for="item in list" 
                        :key="item.contentId"
                     >
                        <a >
                        <img class="img" :src="item.picAddr"/>  
                        </a>
                    </swiper-slide>
            </swiper>
            <img class="img-btn" src="../../../../public/images/film-selected.png">
        </section>
    </div>
</template>
<script>
export default {
  props: ["info"],
  data() {
    return {
      swiperOption: {
        freeMode: true,
        slidesPerView: "auto",
        spaceBetween: 10,
        slidesOffsetAfter: 0,
        on: {}
      },
      list: []
    };
  },
  created() {
    this.$http
      .post(
        "/mg/mta-service/data/migu/cinemaMovie.jsp?cinemaId=" + this.info.id
      )
      .then(res => {
        console.log(res);
        this.list = res.data.movies;
      });
  }
};
</script>
<style lang="scss">
.cinema-module {
  width: 10rem;
  height: 4.346667rem;
  background: url("../../../../public/images/film-Selected-bg.png");
  position: relative;
  .img-btn {
    position: absolute;
    width: 0.533333rem;
    bottom: 0rem;
    left: 50%;
    margin-left: -0.266667rem;
  }
  .swiper-container {
    height: 4.346667rem;
    padding: 0.533333rem 0 0.4rem;
    position: relative;
    width: 100%;
    .slide-li {
      width: 2.186667rem;
      height: 3.306667rem;
      .img {
        width: 2.186667rem;
        height: 3.306667rem;
      }
    }
  }
}
</style>
