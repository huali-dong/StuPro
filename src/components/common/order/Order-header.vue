<template>
<div>
    <div class="order-head">
        <div class="head-left">
            <router-link to="{name:'city'}">
                <span>北京</span>
            </router-link>
            <span class="span"></span>
        </div>
        <div class="head-center">
            <button class="head-center-left">影片</button>
            <button class="head-center-right">影院</button>
        </div>
    </div>
     <div class="film-Menu">
            <ul>
                <li 
                    v-for="item in types"
                    :key="item.id"
                    @click = "type = item.type"
                    :class = "{navbar_active:item.type===type}"
                >
                    <a>{{item.title}}</a>
                </li>
            </ul>
        </div>
    <section class="main">
        <order-movie :typeinfo="type"></order-movie>
    </section>
    <router-view></router-view>
</div>

</template>
<script>
import OrderMovie from "./Order-movie"
export default {
    components:{
        OrderMovie
    },
    data(){
      return {
           types :[
                {id:1,title:"正在热映",type:"now-playing"},
                {id:2,title:"即将上映",type:"coming-soon"}
            ],
            type:"now-playing" || this.$route.params.url
        }
      }
     
};
</script>
<style lang="scss">
.order-head {
  border-bottom: 1px solid #e6e6e6;
  height: 1.173333rem;
  line-height: 1.173333rem;
  padding: 0;
  position: relative;
  background: #fff;
  z-index: 999;
  .head-left {
    position: absolute;
    left: .32rem;
    display: inline-block;
    span {
      color: #666;
      font-size: .4rem;
    }
    .span {
      background: url("../../../../public/images/areaMore-btn.png") no-repeat
        .053333rem .4rem;
      width: .533333rem;
      height: .746667rem;
    }
  }
  .head-center {
    margin: 0px auto;
    width: 3.466667rem;
    height: 0.8rem;
    button:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    button {
      width: 65px;
      border: 1px solid #f74444;
      background: #fff;
      font-size: .373333rem;
      height: .8rem;
      line-height: .8rem;
      border-radius: .133333rem;
      color: #F74444;
      &:active {
        background: #f74444;
        color: #fff;
      }
    }
  }
}
 .film-Menu{
        width: 100%;
        height: 1.226667rem;
        background: #fff;
        z-index: 999;
        position: relative;
        ul{
            height: 100%;
            list-style: none;
            li{
                width: 50%;
                text-align: center;
                padding-top: 12px;
                padding-bottom: 12px;
                display: inline-block;
            }
            .navbar_active{
                    border-bottom: 2px solid #F74444;
                    color: #F74444;
            }
        }
    }
</style>
