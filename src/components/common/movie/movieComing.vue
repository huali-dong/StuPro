<template>
<div>
    <div 
    v-for = "(info) in list" :key="info.id"
    >
      <p class="comingdataTitle" v-if="info.isshow" >{{ info.openingDate | time}}</p>
        <div class="app-films-item">
            <div class="img-box"><img :src='"http://movie.miguvideo.com"+info.picAddr' alt="" width="100%"></div>
            <div class="film-info">
              <div class="film-info-top">
                  <span class="title">{{info.filmName}}</span>
              </div>
              <div class="film-info-bottom">
                  <div class="film-info-bottom-left">
                      <p class="director">导演:{{info.director}}</p>
                      <p class="actor">{{info.actor}}</p>
                  </div>
                  <div class="film-info-bottom-right">
                      <div class="film-Status">预售</div>
                  </div>
                  
              </div>
            </div>
        </div>
      </div>
</div>
</template>
<script>
export default {
  props: ["info"],
  data(){
    return {
      list : this.info,
    }
  },
 created(){
    let lists = JSON.parse(JSON.stringify(this.list))
    lists.forEach((item,index) => {
      if(index == 0) item.isshow = true
      if(index>=1){
        if(item.openingDate == lists[index-1].openingDate){
          item.isshow = false
        }else{
          item.isshow = true
        }
      }
    });
    this.list = lists
  },
};
</script>
<style lang="scss">
.comingdataTitle{
    width: 10rem;
    height: .746667rem;
    padding: .133333rem .32rem;
    background: rgb(239,239,239);
    font-size: .373333rem;
    text-align: left;
}
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
        .film-Status {
          height: 0.693333rem;
          line-height: 0.693333rem;
          position: absolute;
          top: 10%;
          right: 0;
          margin-top: -0.346667rem;
          text-align: center;
          font-size: 0.346667rem;
          border: 1px solid rgb(107, 188, 233);
          border-radius: 0.133333rem;
          color: rgb(107, 188, 203);
          width: 20% !important;
        }
      }
    }
  }
}
</style>
