<template>
    <div class="detail-page">
        <div class="detail-actor">
            <p class="actor-title">
                <span>演职人员</span>
                <a class="actor-right">
                    <i></i>
                </a>
            </p>
           <swiper class="slide-ul" v-if="detaillist" :options="swiperOption" ref="mySwiper" >
                <swiper-slide class="slide-li" v-for="item in detaillist.personnel" :key="item.starid" >
                    <a >
                        <div class="img" >
                            <img :src='"http://movie.miguvideo.com" +item.imgSrc'/>  
                        </div>
                        <div class="info">
                            <p class="info-name">{{item.name}}</p>
                            <p class="info-logo">{{item.nameEn}}</p>
                        </div>
                    </a>
                </swiper-slide>
        </swiper>
        </div>

        <div class="detail-movie">
             <p class="actor-title">
                <span>视频和剧照</span>
                <a class="actor-right">
                    <i></i>
                </a>
            </p>
            <swiper class="slide-ul" v-if="detaillist" :options="swiperOptionmovie" ref="mySwiper2" >
                <swiper-slide class="slide-li" v-for="(item,index) in detaillist.poster" :key="index" >
                    <a >
                            <img :src='"http://movie.miguvideo.com" +item.bigimg'/>  
                    </a>
                </swiper-slide>
        </swiper>
        </div>

       
    </div>
</template>
<script>
export default {
  props: ["lists"],
  data() {
    return {
      swiperOption: {
        freeMode: true,
        slidesPerView: "auto",
        spaceBetween: 30,
        slidesOffsetAfter: 0
      },
      swiperOptionmovie: {
        freeMode: true,
        slidesPerView: "auto",
        spaceBetween: 3,
        slidesOffsetAfter: 0
      },
      detaillist: null
    };
  },
  created() {
    // console.log(this.lists);
    this.detaillist = this.lists;
  }
};
</script>
<style lang="scss">
.detail-page {
  margin-top: 0.266667rem;
  position: relative;
  .detail-actor {
    height: 6.16rem;
    .slide-li {
      width: 2.5rem;
      position: relative;
      border-right: 1px solid #fff;
      float: left;
      .img {
        display: block;
        height: 3.28rem;
      }
      .info {
        text-align: center;
        .info-name {
          font-size: 13px;
          padding-top: 5px;
          color: #4d4d4d;
        }
        .info-logo {
          font-size: 12px;
          color: #666;
          padding-bottom: 10px;
        }
      }
    }
  }

  .detail-actor,
  .detail-movie {
    background-color: #fff;

    .actor-title {
      height: 1.12rem;
      ::before {
        display: inline-block;
        content: "";
        position: absolute;
        width: 3px;
        height: 17px;
        background-color: #f64a5f;
        top: 11px;
        left: 0;
      }
      padding-right: 0.266667rem;
      position: relative;
      font-size: 0.4rem;
      color: #1a1a1a;
      padding: 0.266667rem 0;
      border-bottom: 1px solid #f0f0f0;
      span {
        margin-left: 0.266667rem;
      }
      .actor-right {
        float: right;
        margin-right: 0.533333rem;
        i {
          background-image: url("http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/icon/chevron-right.png");
          display: inline-block;
          width: 0.453333rem;
          height: 0.453333rem;
          background-size: cover;
          background-repeat: no-repeat;
          padding-right: 0.026667rem;
        }
      }
    }
  }
  .detail-movie {
    margin-top: 0.266667rem;
    position: relative;
    height: 2.746667rem;
    .slide-li {
      width: 2.453333rem;
      img {
        width: 2.453333rem;
        height: 1.626667rem;
      }
    }
  }


}
</style>
