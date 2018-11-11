<template>
    <div ref="root" class="order-movie">
        <div>
            <order-movie-list
                v-for="film in filmlist"
                :key="film.id"
                :info="film"
            ></order-movie-list>
        </div>
    </div>
</template>
<script>
import OrderMovieList from "./Order-movie-list"
import scroll from '@util/scroll'
import { Indicator } from 'mint-ui';
export default {
    props:["typeinfo"],
    data(){
        return {
            films:[],
            filmlist :[],
            count:5,
            index:0,
            hasMore:true
        }
    },
    components:{
        OrderMovieList
    },
    watch:{
        typeinfo:{
            immediate: true,
            handler(){
                this.getlist()
            }
        }
    },
    methods:{
          getlist(){
              if(this.typeinfo == "now-playing"){
                  this.$http.post("/mg/lovev/miguMovie/data/indexFilm_data.jsp?cityCode=4799")
                  .then((res)=>{
                      this.films = res.data.movies;
                       this.filmlist = this.films.splice(this.index,this.count);
                  })
              }else{
                   this.$http.post("/mg/lovev/miguMovie/data/indexFilmComing_data.jsp")
                  .then((res)=>{
                      this.films = res.data.movies
                       this.filmlist = this.films.splice(this.index,this.count);
                  })
              }
             
          },

          sendlist(){
              console.log(this.hasMore)
              if(this.hasMore){
                  console.log(this.filmlist)
                  if(this.count<18){
                       new Promise(resolve=>{
                           setTimeout( ()=>{
                            Indicator.open('加载中...');
                            this.index = this.count,
                            this.count +=5;
                            this.filmlist = this.filmlist.concat(this.films.splice(this.index,this.count))
                        },500)
                        resolve()
                    }).then(()=>{
                        Indicator.close('加载中...');
                    }) 
                  }else{
                      this.hasMore = false;
                      this.index=0;
                      this.count=5
                  }
                  
              }
          }
    //    async getlist(){
    //         if(!this.hasMore) return false;
    //         // http://movie.miguvideo.com/mta-service/data/migu/currentCity.jsp
    //         // let res = await this.$http.get("/mg/mta-service/data/migu/currentCity.jsp",{
    //         let res = await this.$http.get("/mz/v4/api/film/"+this.typeinfo,{
    //                 params:{
    //                     page:this.page,
    //                     count:7
    //                 }
    //             })
    //             .then((res)=>{
    //                 return res;
    //             }).catch((err)=>{
    //                 console.log(err);
    //             });
    //          //判断有没有更多数据
    //         if ( res.data.data.page.total - res.data.data.page.current <= 0 ) {
    //             this.hasMore = false
    //         }else {
    //             this.page ++ // 有更多的话，页数增加
    //         } 
    //         // console.log(res)
    //     this.films = this.films.concat(res.data.data.films)
    //    },
    },
    mounted() {
        // console.log(this.$refs.root,scroll)
        this.scroll = scroll({
            el: this.$refs.root,
            handler: this.sendlist.bind(this),
            onscroll:()=>{

            }
        })
    },
}
</script>
<style lang="scss">
   .order-movie{
       height: 15.226667rem;
   }
</style>
