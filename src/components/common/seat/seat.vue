<template>
  <div class="page-wraper">
    <div class="page-title">
      <i class="icon-md" @click="back"></i>
      <span class="movie-title">{{this.info.filmName}}</span>
      <!--<span class="pull-right">更换场次</span>-->
    </div>
    <div class="page-main">
      <div class="choose-list">
        <ul class="clearfix">
          <li>
            <span>
              <img
                src="http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-yixuan.png"
                height="21px"
              >
            </span>
            <span class="seat-type">已选</span>
          </li>
          <li>
            <span>
              <img
                src="http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-yishou.png"
                height="21px"
              >
            </span>
            <span class="seat-type">已售</span>
          </li>
          <li>
            <span>
              <img
                src="http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-kexuan.png"
                height="21px"
              >
            </span>
            <span class="seat-type">可选</span>
          </li>
        </ul>
      </div>
      <div class="cinema-title">
        <p class="screen">{{this.showdetail.hallName}}</p>
      </div>
      <div class="ciname-seat-info">
        <div class="seat-list-wrap contentBody">
          <div class="btn-wrap-1">
            <span>银幕中央</span>
          </div>
          <div class="seatD">
            <div v-for="row in seatRow" :key="row">
              <div
                v-for="col in seatCol"
                v-if="seatArray.length>0"
                class="seat"
                :key="col"
                :style="{width:seatSize+'px',height:seatSize+'px'}"
              >
                <div
                  class="inner-seat"
                  @click="handleChooseSeat(row-1,col-1)"
                  :class="seatArray[row-1][col-1]==2?'bought-seat':(seatArray[row-1][col-1]==1?'selected-seat':'unselected-seat')"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div class="seat-selected-wrap">
          <p>已选座位</p>
          <ul>
            <li id="addSeat" style="height:30px;">
              <button
                @click="cancel(JSON.parse(item).row,JSON.parse(item).col)"
                class="seat_5_7"
                v-if="selectArray.length>0"
                v-for="item in selectArray"
                :key="item"
              >
                <span>{{JSON.parse(item).row+1}}排{{JSON.parse(item).col+1}}座</span>
                <i class="btn-remove rem_5_7" data-id="5_7" data-validno="5_7">×</i>
              </button>
            </li>
          </ul>
        </div>
        <div class="cinema-name clearfix">
          <div>
            <p class="cinemaTitle">{{this.filmName.cname}}</p>
            <p class="frData">{{this.time}}</p>
          </div>
          <button @click="buy" class="price" id="btn" style="width:135px;">确定￥{{this.selectArray.length*this.showdetail.miguPrice.slice(0,2)}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import _ from "lodash";
import { Toast, Actionsheet } from "mint-ui";
// import AlipaySdk from 'alipay-sdk';
// import fs from "fs"
export default {
  data() {
    return {
      //影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
      seatArray: [],
      //影院座位行数
      seatRow: 7,
      //影院座位列数
      seatCol: 8,
      //座位尺寸
      seatSize: "",
      //推荐选座最大数量
      smartChooseMaxNum: 5,
      selectArray: [], //已选择的座位
      info: this.$route.query.detailInfo,//详细数据
      filmName:this.$route.query.filmName,//影院名字
      showdetail:this.$route.query.showdetail,//详细数据
      time:this.$route.query.time//时间
    };
  },
  mounted: function() {
    // console.log(this.showdetail,"movieId")
    // const alipaySdk = new AlipaySdk({
    // appId: '2016092900626140',
    // privateKey: fs.readFileSync('./private-key.txt', 'ascii'),
    // alipayPublicKey: fs.readFileSync('./alipay_public_key.txt', 'ascii'),
    // });
    this.$http({
      url: "http://localhost:3000/api/v1/seat/findone",
      method: "POST",
      data: {
        // movieId: this.info.contentId,
        showId:this.showdetail.showId
      }
    }).then(res => {
      this.initSeatArray(10, 20);
      let recordArray = res.data.data;
      //初始化处理数据
      if(recordArray.length>0){
        // console.log(recordArray.length,"3343")
        for(let i = 0;i<recordArray.length;i++){
          let position = recordArray[i].position;
          for(var j=0;j<position.length;j++){
             //TODO 将已售座位状态设置为2
            let recordPosition = JSON.parse(position[j]);//json
            let resrow = recordPosition.row;
            let rescol = recordPosition.col;
            this.seatArray[resrow][rescol] = 2;
          }
        }
      }
      // if (res.data.status == 500) {
      //   this.initSeatArray(10, 20);
      // }
     
    });
  },
  methods: {
    //初始座位数组
    back(){
        //  this.$router.push({ name: "detail",query:{cid:this.info.contentId}})
        this.$router.back()
    },
    initSeatArray: function() {
      let seatArray = Array(this.seatRow)
        .fill(0)
        .map(() => Array(this.seatCol).fill(0));
      // console.log(seatArray,"dhdh")
      this.seatArray = seatArray;
    },

    //处理座位选择逻辑
    handleChooseSeat: function(row, col) {
      let seatValue = this.seatArray[row][col];
      // console.log(seatValue)
      let newArray = this.seatArray;
      let newSelectArray = this.selectArray;
      //如果是已购座位，直接返回
      if (seatValue == 2) return;
      //如果是已选座位点击后变未选
      if (seatValue === 1) {
        newArray[row][col] = 0;
        for (var i = 0; i < newSelectArray.length; i++) {
          if (
            JSON.parse(newSelectArray[i]).col == col &&
            JSON.parse(newSelectArray[i]).row == row
          ) {
            newSelectArray.splice(i, 1);
          }
        }
      } else if (seatValue === 0) {
        if (this.selectArray.length >= 5) {
          Toast({
            message: "最多选择五个座位",
            position: "top",
            duration: 3000
          });
        } else {
          // this.price += Math.round(this.$route.params.info.vipPrice)
          newArray[row][col] = 1;
          let position = {};
          position.row = row;
          position.col = col;
          this.selectArray.push(JSON.stringify(position));
        }
      }
      this.seatArray = newArray.slice();
      this.selectArray = newSelectArray.slice();
    },

    //取消选定座位
    cancel: function(row, col) {
      // console.log(this.seatArray[row][col]);
      let newArray = this.seatArray;
      let newSelectArray = this.selectArray;
      if (newArray[row][col] == 1) {
        newArray[row][col] = 0;
        for (var i = 0; i < newSelectArray.length; i++) {
          if (
            JSON.parse(newSelectArray[i]).col == col &&
            JSON.parse(newSelectArray[i]).row == row
          ) {
            newSelectArray.splice(i, 1);
          } 
        }
      }
      this.seatArray = newArray.slice();
      this.selectArray = newSelectArray.slice();
    },


    //支付


    buy(){
      if(this.selectArray.length>0){
        // console.log(this.info,"info")
         this.$http({
          url: "http://localhost:3000/api/v1/seat/add",
          method: "POST",
          data: {
            movieId: this.info.contentId,
            showId:this.showdetail.showId,
            movieName:this.info.filmName,
            position:this.selectArray,
            userId:localStorage.getItem("user"),
            pic:this.info.picAddr,
            Day:this.time,
            beginTime:this.showdetail.showTime,
            cinemaName:this.filmName.cname,
            price:this.selectArray.length*this.showdetail.miguPrice.slice(0,2)
          }
        }).then(res => {
          this.$router.push({name:"bought"})
          //TODO 将已售座位状态设置为2
        });
      }else{
        Toast({
          message: '还未选座',
          position: 'middle',
          duration: 3000
          });
      }
     
    }
  // async  buy(){
  //     if(this.selectArray.length>0){
  //     await this.$http({
  //         url: "http://localhost:3000/api/v1/seat/add",
  //         method: "POST",
  //         data: {
  //           movieId: this.info.contentId,
  //           showId:this.showdetail.showId,
  //           movieName:this.info.filmName,
  //           position:this.selectArray,
  //           userId:localStorage.getItem("user"),
  //           pic:this.info.picAddr,
  //           Day:this.time,
  //           beginTime:this.showdetail.showTime,
  //           cinemaName:this.filmName.cname,
  //           price:this.selectArray.length*this.showdetail.miguPrice.slice(0,2),
  //           orderNumber:Math.random(0,1000),
  //           status:"未支付"
  //         }
  //       }).then(res => {
  //         console.log(res)
  //       })
  //       this.$http({
  //        url:"https://openapi.alipaydev.com/gateway.do",
  //         method:"GET",
  //         data:{
  //           total_amount:this.info.picAddr,
  //           subject:this.info.filmName,
  //           out_trade_no:Math.random(0,1000)
  //         }
  //     })
  //   }
  //  }
  }
};
</script>
<style lang="scss">
.page-wraper {
  position: relative;
  background-color: #f0f0f0;
  .page-title {
    padding: 10px;
    text-align: center;
    background-color: #fff;
    text-align: center;
    color: #333;
    font-size: 17px;
    border-bottom: 1px solid #f0f0f0;
    position: relative;
    .icon-md {
      width: 24px;
      height: 24px;
      background-size: cover;
      background-repeat: no-repeat;
      float: left;
      background-image: url("http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/icon/backNoBg.png");
    }
  }
  .page-main {
    padding-top: 15px;
    .choose-list {
      padding: 0 10px 15px;
      height: 40px;
      .clearfix {
        list-style: none;
        li {
          width: 25%;
          text-align: center;
          font-size: 15px;
          color: #999;
          float: left;
        }
      }
    }
    .ciname-seat-info {
      .seat-list-wrap {
        position: relative;
        padding: 5px 15px 0;
        height: 331px;
        overflow: auto;
        box-sizing: border-box;
        .btn-wrap-1 {
          text-align: center;
          box-sizing: border-box;
          margin-bottom: 8px;
          span {
            background-color: #f5f5f5;
            border: 1px solid #ccc;
            border-radius: 2px;
            font-size: 10px;
            color: #999;
            display: inline-block;
            padding: 5px;
            padding: 3px 5px;
          }
        }
        .seatD {
          padding-left: 20px;
          box-sizing: border-box;
          width: 100%;
          height: 90%;
          text-align: center;
          div {
            height: 35px;
            .seat {
              float: left;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .inner-seat {
              margin: 5px 5px;
              cursor: pointer;
              width: 25px;
              height: 25px;
              background-size: contain;
              // background-image: url('http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-kexuan.png')
            }
          }
          .bought-seat {
            background-image: url("http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-yishou.png");
          }
          .selected-seat {
            background-image: url("http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-yixuan.png");
          }
          .unselected-seat {
            background-image: url("http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-kexuan.png");
          }
        }
      }
      .seat-selected-wrap {
        padding: 10px;
        background-color: #fff;
        p {
          font-size: 15px;
          color: #666;
        }
        ul {
          padding: 10px 0 15px;
          border-bottom: 1px solid #d9d9d9;
          button {
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 3px;
            background-color: #fff;
            font-size: 11px;
            margin-right: 10px;
          }
        }
      }
      .cinema-name {
        position: relative;
        padding: 16px 10px 13px;
        background-color: #fff;
        .cinemaTitle {
          font-size: 17px;
          color: #1a1a1a;
          margin-bottom: 5px;
          width: 55%;
        }
        .frData {
          font-size: 14px;
          color: #666;
        }
        button {
          position: absolute;
          padding: 12px 20px;
          background-color: #f74444;
          color: #fff;
          font-size: 17px;
          border: 0 none;
          border-radius: 3px;
          top: 16px;
          right: 10px;
        }
      }
    }
    .cinema-title {
      padding: 0 20px;
      text-align: center;
      margin-bottom: 25px;
      .screen {
        padding: 8px 0;
        font-size: 15px;
        color: #666;
        background-image: url("http://movie.miguvideo.com/lovev/miguMovie/images/tixing.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>


