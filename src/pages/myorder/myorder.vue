<template>
    <div>
        <div>
            <i class="orderPic" @click="back"></i>
            <p class="orderdataTitle">我的订单</p>
            <div class="app-films-item" v-for="(item,index) in this.info" :key="item">
                <div class="img-box">
                    <!-- <img :src='"http://movie.miguvideo.com"+item.pic' alt="" width="100%"> -->
                    <img :src="item.pic" width="100%">
                </div>
                <div class="film-info">
                   <div class="delete">
                          <div @click="remove(index)" class="film-Status">删除</div>
                        </div>
                    <div class="film-info-top">
                        <span class="title">{{item.movieName}}</span>
                    </div>
                     <div class="cname">
                        影院:{{item.cinemaName}}
                    </div>
                    <div class="beginTime">
                        时间:{{item.Day}}  {{item.beginTime.slice(0,2)}}:{{item.beginTime.slice(2,4)}}
                    </div>
                   
                    <div class="film-info-bottoms">
                        <div class="film-info-bottom-left">
                            <ul>
                                <li id="addSeat" style="height:30px;">
                                    <div
                                        class="seat"
                                        v-for="items in item.position"
                                        :key="items"
                                    >
                                        <span>{{JSON.parse(items).row+1}}排{{JSON.parse(items).col+1}}座</span>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
      return {
          info: ""
      }
  },
  mounted: function() {
    // console.log(this.info,"movieId")
    this.$http({
      url: "http://localhost:3000/api/v1/seat/finduserone",
      method: "POST",
      data: {
        userId: localStorage.getItem("user")
      }
    }).then(res => {
        // console.log(res,"res")
      this.info = res.data.data;
    });
  },
  methods:{
      back(){
          this.$router.back()
      },
      remove(index){
        // console.log(this.info[index]._id)
        this.$http({
          url: "http://localhost:3000/api/v1/seat/remove",
          method: "DELETE",
          data: {
           _id:this.info[index]._id
          }
        }).then(res => {
             this.$http({
              url: "http://localhost:3000/api/v1/seat/finduserone",
              method: "POST",
              data: {
                userId: localStorage.getItem("user")
              }
            }).then(res => {
                // console.log(res,"res")
              this.info = res.data.data;
            });
        });
      }
  }
};
</script>
<style lang="scss">
 .orderPic {
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
.orderdataTitle {
  width: 10rem;
  height: 1.746667rem;
  line-height: 1.746667rem;
  text-align: center;
  font-size: 24px;
  color: #f74444;
  padding: 0.133333rem 0.32rem;
  background: rgb(239, 239, 239);
  font-size: 0.373333rem;
}
.app-films-item {
  padding: 12px 12px 0;
  border-bottom: 1px solid #e7e7e7;
  height: 4.12rem;
  width: 10rem;
  .img-box {
    width: 22%;
    padding-right: 3%;
    float: left;
  }
  .film-info {
    width: 75%;
    padding-bottom: 3%;
    float: left;
    position: relative;
     .delete{
        position: absolute;
        top: -3px;
        right: 0px;
        border: 1px solid #61a9f7;
        border-radius: 5px;
        padding:5px 8px;
        color: #61a9f7;
    }
    .cname{
        line-height: .9375rem
    }
    .film-info-top {
      display: inline-block;
      position: relative;
     
      span {
        color: #666;
        font-size: 0.426667rem;
      }
    }
    .film-info-bottoms {
      position: relative;
      .film-info-bottom-left {
        width: 100%;
        float: left;
        ul {
          padding: 10px 0 15px;
          border-bottom: 1px solid #d9d9d9;
          .seat{
            display: inline-block;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 3px;
            background-color: #fff;
            font-size: 11px;
            width:1.3rem;
            margin-right: 3px;
          }
        }
      }
    }
    
  }
}
</style>
