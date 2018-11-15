<template>
<div>
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
        <movie :typeinfo="type"></movie>
    </section>
    <router-view></router-view>
</div>

</template>
<script>
import Movie from "./movie";
// import { mapState } from "vuex";
export default {
    components:{
        Movie,
    },
    data(){
      return {
           types :[
                {id:1,title:"正在热映",type:"now-playing"},
                {id:2,title:"即将上映",type:"coming-soon"}
            ],
            type:"now-playing" || this.$route.params.url
        }
      },
      
    //   beforeCreate() {
    //       this.$store.dispatch({
    //         type:"getCurrentPosition"
    //       })
    //   },
};
</script>
<style lang="scss">

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
