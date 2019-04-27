<template>
    <div class="page-wraper">
        <div class="page-title">
            <i class="icon-md" @click="backend()"></i>
            <span class="movie-title">反贪风暴</span>
            <span class="pull-right">更换场次</span>
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
                <p class="screen">5号厅屏幕方向</p>
            </div>
            <div class="ciname-seat-info">
                <div class="seat-list-wrap contentBody">
                    <div class="btn-wrap-1">
                        <span>银幕中央</span>
                    </div>
                    <div class="seatD">
                        <div v-for="row in seatRow" :key=row>
                            <div
                                v-for="col in seatCol"
                                class="seat"
                                :key=col
                            >
                                <div
                                    class="inner-seat"
                                    @click="handelSeat(row,col)"
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="seat-selected-wrap">
                    <p>已选座位</p>
                    <ul>
                        <li id="addSeat" style="height:30px;">
                            <button class="seat_5_7">
                                <span>5排7座
                                    <br>37元
                                </span>
                                <i class="btn-remove rem_5_7" data-id="5_7" data-validno="5_7">×</i>
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="cinema-name clearfix">
                    <div>
                        <p class="cinemaTitle">SFC上影影城（成都龙湖IMAX店）</p>
                        <p class="frData">2019-04-20 12:05</p>
                    </div>
                    <button class="price" id="btn" style="width:135px;">确定￥37</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      //影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
      seatArray: [],
      //影院座位行数
      seatRow: 7,
      //影院座位列数
      seatCol: 8,
      //推荐选座最大数量
      smartChooseMaxNum: 5
    };
  },
  methods:{
    handelSeat:async function(row,col){
      console.log(row,col,"23")
      let resDate = await this.$http({
        method:'post',
        url:'http://localhost:3000/api/v1/seat/add',
        data:{
          row:row,
          col:col
        }
    })
    console.log(resDate)
    },
    backend(){
      this.$router.back()
    }
  }
  // methods: {
  //   //处理座位选择逻辑
  //   handleChooseSeat: function(row, col) {
  //     let seatValue = this.seatArray[row][col];
  //     let newArray = this.seatArray;
  //     //如果是已购座位，直接返回
  //     if (seatValue === 2) return;
  //     //如果是已选座位点击后变未选
  //     if (seatValue === 1) {
  //       newArray[row][col] = 0;
  //     } else if (seatValue === 0) {
  //       newArray[row][col] = 1;
  //     }
  //     //必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
  //     this.seatArray = newArray.slice();
  //   },
   
  // },

  // mounted: function() {
  //   this.initSeatArray(10, 20);
  // }
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
          div{
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
           background-image: url('http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-kexuan.png')
          }
          }
          .bought-seat{
              background-image: url('http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-yixuan.png')
          }
          .selected-seat{
              background-image: url('http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-kexuan.png')
          }
          .unselected-seat{
              background-image: url('http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-yishou.png')
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


