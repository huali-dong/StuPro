<template>
<div>
    <div class="cinema-header">
        <span class="region">附近</span>
        <img src="../../../../public/images/siftings-down.png">
    </div>
    <div class="cinema-main" 
        v-for="item in list"  :key="item.id" 
        @click="tocinemadetail(item.cinemaId,item.cinemaName,item.cinemaAdd)"
    >
        <p class="cinema-main-top">{{item.cinemaName}}</p>
        <p class="cinema-main-bottom">{{item.cinemaAdd}}</p>
    </div>
</div>
</template>
<script>
import _ from "lodash"
import { Indicator } from 'mint-ui';
export default {
    data(){
        return {
            list:[],
        }
    },
    methods:{
        tocinemadetail(id,cname,cadd){
            this.$router.push({name:"cinemadetail",query:{cid:id,cname:cname,cadd:cadd}})
        }
    },
    beforeCreate() {
        Indicator.open("加载中")
        this.$http.post("/mg/mta-service/data/migu/validCinemaes.jsp?cityCode=4751").then((res)=>{
            console.log(res)
            Indicator.close()
            this.list = res.data.cinemaes;
        })
        // this.$http.get("/mz/v4/api/cinema",{
        //     params:{
        //         __t:Date.now()
        //     }
        // }).then((res)=>{
        //     Indicator.close()
        //     console.log(res.data.data.cinemas)
        //     let data = res.data.data.cinemas;
        //     this.list = data;
        //     let str = [];
        //     for(var i=0;i<data.length;i++){
        //         str.push(data[i].district.name);
        //     }
        //     for(var i=0;i<data.length;i++){
        //         str.forEach((item,index)=>{
        //             var obj = [];
        //             if(data[i].district.name == item){
        //                 obj[index].push(data)
        //             }
        //         })
        //     }
        //    console.log(obj)
        // })
    },
}
</script>
<style lang="scss">
.cinema-header{
    width: 100%;
    height: 1.066667rem;
    .region{
        width: 1.76rem;
        display: inline-block;
            text-align: center;
            padding-top: .213333rem;
            padding-bottom: .32rem;
            font-size: .373333rem;
                border-bottom: .053333rem solid #F74444;
    color: #F74444;
    }
    img{
        width: .56rem;
        height: .56rem;
        float: right;
        margin: .186667rem .266667rem 0 0 ;
    }
}
.cinema-main{
        padding: .133333rem .32rem .266667rem;
        border-bottom: 1px solid #e7e7e7;
        position: relative;
        width: 10rem;
        height: 2.24rem;
        .cinema-main-top,.cinema-main-bottom{
                padding: .133333rem 0;
                width: 6.533333rem;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-size: .373333rem;

        }
}
</style>
