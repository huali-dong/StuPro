<template>
    <div ref="root" class="order-movie">
        <div class="order-movie-box">
            <movie-list v-if="films"
                v-for="film in films"
                :key="film.id"
                :info="film"
            ></movie-list>
            <template v-if="filmcoming.length>0">
                <movie-coming 
                    :info="filmcoming"
                ></movie-coming>
            </template>
        </div>
    </div>
</template>
<script>
import MovieList from "./movielist";
import MovieComing from "./movieComing";
import scroll from '@util/scroll'
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import _ from "lodash"
export default {
    props:["typeinfo"],
    data(){
        return {
            films:[],
            filmcoming:[],
            hasMore:true,
            page:1
        }
    },
    components:{
        MovieList,
        MovieComing
    },
    watch:{
        typeinfo:{
            immediate: true,
            async  handler(){
                this.films = [] // 清空在上映的数据
                this.filmcoming = []
                // this.hasMore = true // 重新更多
                // this.page = 1 // 重置页数
                await this.getlist();
               
            }
        }
    },
        mounted() {
            this.scroll = scroll({
                el: this.$refs.root,
                handler: ()=>{
                    Toast({
                        message: '没有更多数据啦',
                        position: 'bottom',
                        duration: 1000
                        });
                },
                onscroll:(y)=>{
                   if(y <= -200) this.$bus.$emit("changebackshow")
                   if(y>=-200) this.$bus.$emit("changeback")
                }
            })
            this.$bus.$on("backtop",()=>{
                this.scroll.scrollTo(0,0,200)
            })
        },
    methods:{
          getlist(){
              let id = JSON.parse(localStorage.getItem("city")).cityId
                Indicator.open('加载中...');
              if(this.typeinfo == "now-playing"){
                  this.$http.post("/mg/lovev/miguMovie/data/indexFilm_data.jsp?cityCode="+id)
                  .then((res)=>{
                      this.films = res.data.movies;
                       Indicator.close();
                    //   console.log(res.data.movies)
                    //    this.filmlist = this.films.splice(this.index,this.count);
                  })
              }else{
                   this.$http.post("/mg/lovev/miguMovie/data/indexFilmComing_data.jsp?cityCode="+id)
                  .then((res)=>{
                       Indicator.close();
                       this.filmcoming = (res.data.movies).splice(0,70)
                  })
              }
          },
    },

    
}
</script>
<style lang="scss">
   .order-movie{
       height: 15.226667rem;
   }
   .order-movie-box{
        padding-bottom: 1.333333rem;
   }
</style>
