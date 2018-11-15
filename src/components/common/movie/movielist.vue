<template>
     <div class="app-films-item">
        <div class="img-box"><img :src='"http://movie.miguvideo.com"+info.picAddr' alt="" width="100%"></div>
        <div class="film-info">
           <div class="film-info-top">
               <span class="title">{{info.filmName}}</span>
           </div>
           <div class="film-info-bottom">
               <div class="film-info-bottom-left">
                   <p class="director">{{info.director}}</p>
                   <p class="actor">{{info.actor}}</p>
               </div>
               <div class="film-info-bottom-right" @click="Todetail(info.contentId)">
                   <img src="../../../../public/images/oreder.png">
               </div>
               
           </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["info"],
  methods:{
    Todetail(id){
      this.$router.push({ name: "detail",query: {cid: id}})
    }
  }
};
</script>
<style lang="scss">
.app-films-item {
  padding: 12px 12px 0;
  border-bottom: 1px solid #e7e7e7;
  height: 3.12rem;
  width: 10rem;
  .img-box {
    width: 22%;
    padding-right: 3%;
    float: left;
  }
  .film-info {
    width: 75%;
    padding-top: 3%;
    padding-bottom: 3%;
    float: left;
    .film-info-top {
      display: inline-block;
      span {
        color: #666;
        font-size: 0.426667rem;
      }
    }
    .film-info-bottom {
      position: relative;
      margin-top: 7%;
      .film-info-bottom-left {
        width: 70%;
        float: left;
        .director,
        .actor {
          line-height: 0.533333rem;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 0.373333rem;
        }
      }
      .film-info-bottom-right {
        width: 30%;
        float: right;
        img {
          width: 1.226667rem;
          height: 0.693333rem;
          height: 0.693333rem;
          position: absolute;
          top: 50%;
          right: 0;
          margin-top: -0.346667rem;
        }
      }
    }
  }
}
</style>
