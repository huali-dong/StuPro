<template>
<div class="city-top">
    <div class="city-header">
        <div class="city-header-title">
            <div class="close" @click="back">
                <span>关闭</span>
                </div>
            <div class="choose">
                <span>选择城市</span>
            </div>
        </div>
    </div>
    <div class="city-now">
        <span class="city-now-title">
            <i>当前城市:</i>&nbsp;&nbsp;{{city.cityName}}
            </span>
    </div>
    <div class="go-top" v-if="Show">
        <img src="images/back_top.png">
    </div>
</div>
</template>
<script>
import {mapState} from "vuex"
export default {
  
    data(){
        return {
            Show:false

        }
    },
   computed:mapState({//从state里面获得数据
       city : state=>state.chunks.city
   }),
//    beforeCreate() {
//     //    console.log(this.$store)
//        this.$store.dispatch({//当mutation更改数据之后
//            type:"getCurrentPosition"
//        })
//        this.$store.
//    },
    methods:{
        back(){
            this.$router.back()
        }
    }

}
</script>
<style lang="scss">
.city-header{
    width: 100%;
    height: 1.066667rem;
    background-color: #eb3452;
    top: 0;
    z-index: 100;
    .city-header-title{
            padding: 0;
            margin: 0;
            .close{
                span{
                        font-size: 14px;
                        float: left;
                        margin-left: 3.5%;
                        color: #fff;
                }
            }
            .close,.choose{
                line-height: 1.066667rem;
            }
            .choose{
                span{
                        width: 5.333333rem;
                        display: block;
                        font-size: .373333rem;
                        text-align: center;
                        color: #fff;
                        position: absolute;
                        left: 50%;
                        margin-left: -2.666667rem;
                }
            }
    }
}
.city-now{
    height: 1.36rem;
    .city-now-title{
            margin-top: .533333rem;
            padding: .4rem .533333rem;
            background: #f5f5f5;
            display: block;
            color: #323232;
            border-top: 1px solid #cdccd1;
            margin-bottom: .533333rem;
            }
}
.go-top{
    width: 1.066667rem;
    height: 1.066667rem;
    position: fixed;
    bottom: .3rem;
    right: .4rem;
    z-index: 100;
}
</style>
