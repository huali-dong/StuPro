<template>
    <div>
        <section class="cinema-module  blur">
            <swiper class="slide-ul"  :options="swiperOption" ref="mySwiper" >
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
        <section class="cinema-info">
          <div class="film-name">
              <div class="film-ScoreLeft pull-left" style="width:100%">
                    <span class="font-16 grey filmName limitFilmBuyName" style="font-size:16px; width:17em;">{{activeList.filmName}}</span>
                    <span class="font-16 deep-red filmComment" style="padding-left: 5px;"></span>
              </div>
          </div>
          <swiper class="time">
            <swiper-slide class="time-li">
              <a>{{this.detail.showdate}}</a>
            </swiper-slide>
          </swiper>
          <div class="detail" v-for="(item,index) in detailInfo" :key="item" >
            <div class="detail-list">
              <ul>
                <li class="pull-left">
                  <p class="grey">{{item.showTime.slice(0,2)}}:{{item.showTime.slice(2,4)}}</p>
                  <p class="light-grey">{{item.showTime.slice(0,2)}}:{{item.showTime.slice(2,4)}}</p>
                </li>
                <li class="pull-left">
                  <p class="high-grey">{{item.language}}/{{item.edition}}</p>
                  <p class="font-13 light-grey">{{item.hallName}}</p>
                </li>
                <li class="pull-left pull-left1">
                  <div class="film-Price1">
                    <span class="font-13">¥</span>
                    <span class="font-18">{{item.miguPrice.slice(0,2)}}</span>
                  </div>
                </li>
                <li class="pull-left">
                  <div class="film-Price2">
                    <button @click="buyTickets(index)" class="order-Btn order-Btn-Active font-13 deep-red">在线购票</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
    </div>
</template>
<script>
var vm = null;
import { Toast } from "mint-ui";
export default {
  props: ["info","cname"],
  data() {
    return {
      swiperOption: {
        // freeMode: true,
        centeredSlides : true,
        slidesPerView: "auto",
        spaceBetween: 10,
        slidesOffsetAfter: 0,
        on: {
          slideChangeTransitionEnd: function(){
              vm.index = this.activeIndex;//上面轮播图对应的index，在下面会用到
          },
        }
      },
      list: [],
      activeList:{},
      index:0,
      detail:[],//detail详细数据。包含有多少天
      detailInfo:[]
    };
  },
  computed: {
      swiper() {
        return this.$refs.mySwiper.swiper;
      }
  },
   watch:{
      index:{
         handler(){
            this.index = this.index;
            this.activeList = this.list[this.index]
            this.$http.post(
              "mg/mta-service/data/migu/userShows.jsp?filmId="+ this.activeList.filmId+"&cinemaId="+this.info.id+"&count=10"
            ).then(res=>{
              this.detail = res.data.dayShows[0];
              this.detailInfo = this.detail.shows
            })
         }
      }
  },
  created() {
     vm = this;
    this.$http
      .post(
        "/mg/mta-service/data/migu/cinemaMovie.jsp?cinemaId=" + this.info.id
      )
      .then(res => {
         this.list = res.data.movies;
         this.activeList = this.list[this.index]
        this.$http.post(
          "mg/mta-service/data/migu/userShows.jsp?filmId="+ this.activeList.filmId+"&cinemaId="+this.info.id+"&count=10"
        ).then(res=>{
          this.detail = res.data.dayShows[0];
          this.detailInfo = this.detail.shows
      }) 
      });
      
  },
  methods:{
    buyTickets(index){//获取index去获取this.detailInfo里面的showId
        // console.log(this.detailInfo[index],this.list[this.index])
        if(localStorage.getItem("user")){
         this.$router.push({ name: "seat",query:{detailInfo:this.list[this.index],filmName:this.cname,showdetail:this.detailInfo[index],time:this.detail.showdate}})
        }else{
          Toast({
            message: '请先登录',
            position: 'bottom',
            duration: 3000
          });
    }
  }
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
.cinema-info{
  .film-name{
    padding: .75rem;
  }
  .time{
    .time-li{
      
      padding: .46875rem 0;
      text-align: center;
      width: 2.5625rem  !important;
      border-bottom: .0625rem solid #F74444;
      &:hover{
        border-bottom: .0625rem solid #F74444;
      }
      a{
            color: #F74444 !important;
      }
    }
  }
  .detail{
        padding: 0 .79rem;
        .detail-list{
            border-bottom: .03125rem solid #e7e7e7;
            height: 1.5625rem;
            ul{
              .pull-left1{
                text-align: center
              }
              .pull-left{
                width: 25%;
                float: left;
                .grey{
                      color: #666;
                      line-height: .625rem;
                      font-size: .4375rem;
                }
                .light-grey{
                      line-height: .4rem;
                      color: #999;
                      font-size: .3125rem !important;
                      overflow: hidden;
                      height:.8rem;
                }
                .high-grey{
                      line-height: .625rem;
                      font-size: .4375rem !important;
                }
                .film-Price1{
                  height: 1.25rem;
                  line-height: 1.25rem;
                  color: #F74444;
                  .font-13{
                        font-size: .3125rem;
                        height: .625rem;
                  }
                  .font-18{
                    font-size: .5rem;
                  }
                }
                .film-Price2{
                  height: 1.25rem;
                  line-height: 1.25rem;
                  button{
                        width: 2.125rem;
                        height: .8125rem;
                        line-height: .8125rem;
                        margin-top: .21875rem;
                        border-radius: .15625rem;
                        background: #fff;
                        border: .03125rem solid #F74444;
                        color: #F74444;
                        font-size: .375rem;
                  }
                }
              }

            }
        }
  }
}
</style>
