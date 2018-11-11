<template>
<div>
    <div ref="root" class="detail-list-movie">
        <div>
            <div  class="detail-wraper" v-if = "detail">
                <div class="detail-head">
                    <div class="detail-pic">
                        <img :src ='"http://movie.miguvideo.com" +detail.imgSrc1'>
                        <i @click="back"></i>
                        <div class="shadow-box"></div>
                    </div>
                    <div class="detail-movie">
                        <div class="movie-info">
                            <div class="movie-info-left">
                                <img :src='"http://movie.miguvideo.com" +detail.imgSrc'>
                            </div>
                            <div class="movie-info-list">
                                <div class="list">
                                    <p class="mov-name">{{detail.belongToName}}</p>
                                    <p class="icon-ster">
                                        <span id="moviestar"><i></i></span>
                                        <span id="moviescore">{{detail.score}}分</span>
                                    </p>
                                </div>
                                <div class="movie-list-info">
                                    <p class="movieType">{{detail.DetailType}}</p>
                                    <p class="movieregion">{{detail.region}}</p>
                                    <P class="movietime">{{detail.time}}</P>
                                </div>
                            </div>
                        </div>
                        <p id="describe">{{detail.describe}}</p>
                        <div class="text-center">
                            <span id="showDec"></span>
                        </div>
                    </div>
                </div>
                <detail-page :lists= "detail"></detail-page>
            </div>
        </div>
    </div>
    <deatil-foot></deatil-foot>
    </div>
</template>
<script>
import DetailPage from "@c/common/detail/DetailPage";
import DeatilFoot from "@c/common/detail/DetailFoot";
import scroll from "@util/scroll";
export default {
  components: {
    DetailPage,
    DeatilFoot
  },
  data() {
    return {
      detail: null,
      cid: this.$route.query.cid
    };
  },
  created() {
    this.$http
      .get("mg/publish/i_www/resource/lovev/miguMovie/detail/detail_data.jsp?cid=" +this.cid)
      .then(res => {
        this.detail = res.data[0];
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    this.scroll = scroll({
    el: this.$refs.root,
    handler: ()=>{},
    onscroll:()=>{
    }
    });
  },
 methods:{
   back(){
     this.$router.back()
   }
 }
};
</script>
<style lang="scss">
.detail-list-movie {
   height: 15.226667rem;
}
  .detail-wraper {
    background: #f0f0f0;
    .detail-head {
      background-color: #fff;
      box-sizing: border-box;
      height: 11.786667rem;
      .detail-pic {
        position: relative;
        width: 100%;
        float: left;
        width: 100%;
        height: 5.866667rem;
        img {
          width: 100%;
          height: 5.866667rem;
        }
        i {
          background: url("http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/icon/back.png");
          display: inline-block;
          width: 0.8rem;
          height: 0.8rem;
          background-size: cover;
          background-repeat: no-repeat;
          position: absolute;
          top: 0.266667rem;
          left: 0.266667rem;
        }
        .shadow-box {
          position: absolute;
          width: 100%;
          height: 2rem;
          left: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(0, 0, 0, 0.4) 40%,
            rgba(0, 0, 0, 0.8) 98%,
            #fff 100%
          );
        }
      }
      .detail-movie {
        float: left;
        padding: 0 0.266667rem;
        margin-top: -2rem;
        .movie-info {
          position: relative;
          height: 3.946667rem;
          .movie-info-left {
            float: left;
            img {
              height: 3.813333rem;
            }
          }
          .movie-info-list {
            float: left;
            padding-left: 0.266667rem;
            width: 60%;
            .list {
              height: 2rem;
              padding-top: 0.533333rem;
              .mov-name {
                width: 4.533333rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.48rem;
                color: #fff;
              }
              span {
                display: inline-block;
                position: relative;
                left: 0;
                top: 0;
                font-size: 0.373333rem;
                margin-right: 0.08rem;
                color: #f8b246;
              }
            }
            .movie-list-info {
              height: 1.813333rem;
              p {
                width: 4.533333rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.346667rem;
                margin-top: 0.133333rem;
              }
            }
          }
        }
        #describe {
          font-size: 0.373333rem;
          color: #666;
          margin-top: 0.506667rem;
          height: 1.44rem;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .text-center {
          text-align: center;
          #showDec {
            background-image: url("http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/icon/chevron-down.png");
            display: inline-block;
            width: 0.453333rem;
            height: 0.453333rem;
            background-size: cover;
            background-repeat: no-repeat;
            padding-right: 1px;
          }
        }
      }
    }
}
</style>
