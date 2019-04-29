<template>
    <div class="page-wraper">
        <div class="page-title">
            <i class="icon-md" @click="backend()"></i>
            <span class="movie-title">{{this.info.name}}</span>
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
                <p class="screen">5号厅屏幕方向</p>
            </div>
            <div class="ciname-seat-info">
                <div class="seat-list-wrap contentBody">
                    <div class="btn-wrap-1">
                        <span>银幕中央</span>
                    </div>
                    <div class="seatD">
                       <div v-for="row in seatRow">
                          <div v-for="col in seatCol"
                              v-if="seatArray.length>0"
                              class="seat"
                              :style="{width:seatSize+'px',height:seatSize+'px'}">
                            <div class="inner-seat"
                                @click="handleChooseSeat(row-1,col-1)"
                                v-if="seatArray[row-1][col-1]!==-1"
                                :class="seatArray[row-1][col-1]===2?'bought-seat':(seatArray[row-1][col-1]===1?'selected-seat':'unselected-seat')">
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
import axios from "axios";
import _ from 'lodash'
import { Toast,Actionsheet } from 'mint-ui';
export default {
  data() {
    return {
      // //影院座位的二维数组,0为可选座位，1为已选座位(绿色),2为已购座位(红色)
      // seatArray: [],
      // //影院座位行数
      // seatRow: 7,
      // //影院座位列数
      // seatCol: 8,
      // //推荐选座最大数量
      // smartChooseMaxNum: 5,
      // info:this.$route.query.detailInfo

      	//影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
				seatArray:[],
        //影院座位行数
        seatRow:7,
        //影院座位列数
        seatCol:8,
        //座位尺寸
        seatSize:'',
        //推荐选座最大数量
        smartChooseMaxNum:5,
        choose:{
          style:{

          },
          text:'请先选座'
        },
        info:this.$route.query.detailInfo,
        title:'',
        price:0,
        data: [{
        name: '确认支付',
        method : this.pay,	// 调用methods中的函数
        position:[],
      }],
      // action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
      sheetVisible: false
			}
    },
     mounted:function(){
      this.initSeatArray(10,20)
      this.seatArray[4][4]=2
    },
  created() {
    console.log(this.info,"wohenhao")
    // 初始化选中座位
    // this.seatArray[0][1]=2
    // this.$http({
    //         url: `/zq/order/${this.info.seqNo}`,
    //         method: 'GET'
    //     }).then((res)=>{
    //         if(res.status){
    //             console.log('res==>',res);
    //             let oldArray = this.seatArray.slice();
    //             _.some(res.result,(item)=>{
    //               _.get(item,'seat').map((seat)=>{
    //                 oldArray[seat[0]][seat[1]] = 2
    //               })
    //             })
    //             this.seatArray = oldArray;
    //         }else{
    //           let instance = Toast(res.mes);
    //         }
    //         this.isFinish = true
    //     })
  },
  // methods:{
  //   handelSeat:async function(row,col){
  //     const obj={
  //       row:row,
  //       col:col,
  //       status:0
  //     }
  //     this.seatArray.push(obj)
  //     console.log(this.seatArray,"123")
  //     console.log(row,col,"23")
  //     await axios({
  //       method:"post",
  //       url:"http://localhost:3000/api/v1/seat/add",
  //       data:{
  //         row:row,
  //         col:col
  //       }
  //     }).then((res)=>{
  //       console.log(res)
  //     })
  //   //  await this.$http
  //   //   .post(
  //   //     "http://localhost:3000/api/v1/seat/add",
  //   //     {row:row,col:col},
  //   //     // {emulateJSON:true}
  //   //   )
  //   //   .then(res => {
  //   //     console.log(res);
  //   //   });
  //   },
  //   backend(){
  //     this.$router.back()
  //   }
  // }
    methods:{
      backend(){
        this.$router.back()
    },
      //支付
      pay:function(){
        // 请求数据将选定座位的position发送给后端 支付完成后跳到首页
        this.$http({
            url: '/zq/order/commit',
            method: 'POST',
            data: {
                userId: parseInt(localStorage.getItem('userInfo')),
                seat: this.position,
                nm:this.title,
                seatNum:this.position.length,
                time:this.info.dt + " " + this.info.tm,
                price:this.price,
                cinemaNm:this.$route.params.cinemaNm,
                seqNo:this.info.seqNo,
                imgUrl:this.$route.params.movies
            }
        }).then((res)=>{
            if(res.status){
                this.$router.push('/profile')
            }else{
              let instance = Toast(res.mes);
            }
            this.isFinish = true
        })
      },
			//向前后某个方向进行搜索的函数,参数是起始行，终止行,推荐座位个数
      searchSeatByDirection: function(fromRow,toRow,num){
        /*
         * 推荐座位规则
         * (1)初始状态从座位行数的一半处的后一排的中间开始向左右分别搜索，取离中间最近的，如果满足条件，
         *    记录下该结果离座位中轴线的距离，后排搜索完成后取距离最小的那个结果座位最终结果，优先向后排进行搜索，
         *    后排都没有才往前排搜，前排逻辑同上
         *
         * (2)只考虑并排且连续的座位，不能不在一排或者一排中间有分隔
         *
         * */

        /*
         * 保存当前方向搜索结果的数组,元素是对象,result是结果数组，offset代表与中轴线的偏移距离
         * {
         *   result:Array([x,y])
         *   offset:Number
         * }
         *
         */
        let currentDirectionSearchResult = [];

        let largeRow = fromRow>toRow?fromRow:toRow,
            smallRow = fromRow>toRow?toRow:fromRow;

        for(let i=smallRow;i<=largeRow;i++){
          //每一排的搜索,找出该排里中轴线最近的一组座位
          let tempRowResult = [],
              minDistanceToMidLine=Infinity;
          for(let j=0;j<=this.seatCol - num;j++){
            //如果有合法位置
            if(this.checkRowSeatContinusAndEmpty(i,j,j+num-1)){
              //计算该组位置距离中轴线的距离:该组位置的中间位置到中轴线的距离
              let resultMidPos = parseInt((j+num/2),10);
              let distance = Math.abs(parseInt(this.seatCol/2) - resultMidPos);
              //如果距离较短则更新
              if(distance<minDistanceToMidLine){
                minDistanceToMidLine = distance;
                //该行的最终结果
                tempRowResult = this.generateRowResult(i,j,j+num-1)
              }
            }
          }
          //保存该行的最终结果
          currentDirectionSearchResult.push({
            result:tempRowResult,
            offset:minDistanceToMidLine
          })
        }

        //处理后排的搜索结果:找到距离中轴线最短的一个
        //注意这里的逻辑需要区分前后排，对于后排是从前往后，前排则是从后往前找
        let isBackDir = fromRow < toRow;
        let finalReuslt = [],minDistanceToMid = Infinity;
        if(isBackDir){
        	//后排情况,从前往后
          currentDirectionSearchResult.forEach((item)=>{
            if(item.offset < minDistanceToMid){
              finalReuslt = item.result;
              minDistanceToMid = item.offset;
            }
          });
        }else{
        	//前排情况，从后往前找
          currentDirectionSearchResult.reverse().forEach((item)=>{
            if(item.offset < minDistanceToMid){
              finalReuslt = item.result;
              minDistanceToMid = item.offset;
            }
          })
        }

        //直接返回结果
        return finalReuslt
      },


			//推荐选座,参数是推荐座位数目
      smartChoose: function(num){
        //找到影院座位水平垂直中间位置的后一排
        let rowStart = parseInt((this.seatRow-1)/2,10)+1;
        //先从中间排往后排搜索
      	let backResult = this.searchSeatByDirection(rowStart,this.seatRow-1,num);
      	if(backResult.length>0){
      		this.chooseSeat(backResult);
          return
        }
      	//再从中间排往前排搜索
        let forwardResult = this.searchSeatByDirection(rowStart-1,0,num);
        if(forwardResult.length>0) {
          this.chooseSeat(forwardResult);
          return
        }
        //提示用户无合法位置可选
        alert('无合法位置可选!')

      },

      /*辅助函数，判断每一行座位从i列到j列是否全部空余且连续
       *
       */
      checkRowSeatContinusAndEmpty: function(rowNum,startPos,endPos){
      	  let isValid = true;
          for(let i=startPos;i<=endPos;i++){
          	if(this.seatArray[rowNum][i]!==0){
          		isValid=false;
          		break;
            }
          }
          return isValid
      },
      //辅助函数：返回每一行的某个合理位置的座位数组
      generateRowResult: function(row,startPos,endPos){
      	let result = [];
      	for(let i=startPos;i<=endPos;i++){
      		result.push([row,i])
        }
        return result
      },
      //辅助函数:智能推荐的选座操作
      chooseSeat: function(result){
        let oldArray = this.seatArray.slice();
        for(let i=0;i<result.length;i++){
        	//选定座位
        	oldArray[result[i][0]][result[i][1]] = 1
        }
        this.seatArray = oldArray;
      },


			//重置座位
      resetSeat: function(){
        //将所有座位的值变为0
        let oldArray = this.seatArray.slice();
        for(let i=0;i<this.seatRow;i++){
          for(let j=0;j<this.seatCol;j++){
          	if(oldArray[i][j]!==-1){
              oldArray[i][j]=0
            }
          }
        }
        this.seatArray = oldArray;
      },
			//选定且购买座位
      buySeat: function(){
        let oldArray = this.seatArray.slice();
        let position = [];
        for(let i=0;i<this.seatRow;i++){
        	for(let j=0;j<this.seatCol;j++){
        		if(oldArray[i][j]===1){
              position.push([i,j]);
            }
          }
        }
        console.log('position===>',position);
        if(_.isEmpty(position)){
           let instance = Toast('请选择电影票');
          return
        }else{
          this.position = position;
        }
        this.sheetVisible = true;
      },
			//处理座位选择逻辑
      handleChooseSeat: function(row,col){
        console.log(row,col)
      	let seatValue = this.seatArray[row][col];
      	let newArray = this.seatArray;
      	//如果是已购座位，直接返回
        if(seatValue===2) return
        //如果是已选座位点击后变未选
        if(seatValue === 1){
          this.price -= Math.round(this.$route.params.info.vipPrice)
          console.log(this.price)
          newArray[row][col]=0
        }else if(seatValue === 0){
          this.price += Math.round(this.$route.params.info.vipPrice)
          newArray[row][col]=1
        }
        if(_.flatten(newArray).includes(1)){
          this.choose = {
            style:{background:'#f90'},
            text:'确认选座'
          }
        }else{
          this.choose = {
            style:{background:'#ffddb2'},
            text:'请先选座'
          }
        }
        //必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
        this.seatArray = newArray.slice();
      },
      //初始座位数组
      initSeatArray: function(){
        let seatArray = Array(this.seatRow).fill(0).map(()=>Array(this.seatCol).fill(0));
        console.log(seatArray,"dhdh")
        this.seatArray = seatArray;
      },
    },

   
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
            // background-image: url('http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-kexuan.png')
          }
          }
          .bought-seat{
              background-image: url('http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-yishou.png')
          }
          .selected-seat{
              background-image: url('http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-yixuan.png')
          }
          .unselected-seat{
              background-image: url('http://movie.miguvideo.com/publish/i_www/resource/lovev/miguMovie/images/seat-kexuan.png')
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


