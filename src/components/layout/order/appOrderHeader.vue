<template>
     <div class="order-head">
        <div class="head-left">
            <router-link :to = "{name:'city'}">
                <span>{{city.cityName}}</span>
                <i style="width:25px;height:25px;display:inline-block">
                    <img  src="../../../../public/images/areaMore-btn.png">
                </i>
            </router-link>
            <span class="span"></span>
        </div>
        <div class="head-center">
          <router-link 
                v-for="item in type " :key="item.id"
                :to="{ name:item.path }"
                @click.native="change"
          >
            <button :class="{ depactive : item.path === typeinfo }"  class="head-center-left" >{{item.title}}</button>
          </router-link>
        </div>
    </div>
</template> 

<script>
export default {
    computed:{
         city(){
             return this.$store.state.chunks.city
         }
      },
     data(){
       return {
         type : [
          {id:1,path:"movie",title:"影片"},
          {id:2,path:"cinema",title:"影院"}
         ],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
         typeinfo :this.$route.name,
       }
     },
    methods:{
      change(){
        this.typeinfo = this.$route.name
      }
    }
}
</script>
<style lang="scss">
 .depactive{
        background: #f74444 !important;
        color: #fff !important;
    }
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
    }
  }
}
</style>
