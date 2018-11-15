<template>
<div>
    <div class="cinema-detail-head">
        <img @click="back" class="cinema-back" src="../../../../public/images/back.png"/>
        <span class="cineama-name">{{cname}}</span>
    </div>
    <div class="cinema-detail-main">
        <div class="cinema-detail-order">
            <div class="cinema-intro">
                <div class="cinema-intro-left">
                    <h3>{{cname}}</h3>
                    <p>{{cadd}}</p>
                </div>
                <div class="cinema-intro-right">
                    <img class="phone" src="../../../../public/images/phone.png">
                </div>
            </div>
        </div>
        <cinema-detail-main></cinema-detail-main>
    </div>
    <app-footer></app-footer>
</div>
</template>
<script>
import AppFooter from "@c/layout/appFooter";
import CinemaDetailMain from "./cinemaDetailMain";
export default {
    components:{
        AppFooter,
        CinemaDetailMain
    },
    data(){
        return {
            lisy:[],
            cname:this.$route.query.cname,
            cadd : this.$route.query.cadd
        }
    },
    methods:{
        back(){
             this.$router.push({name:"movie"})
        }
    },
    created() {
        console.log(this.$route)
        let id = this.$route.query.cid
        this.$http.post("/mg/mta-service/data/migu/cinemaMovie.jsp?cinemaId="+id)
        .then((res)=>{
            console.log(res)
        })
    },
}
</script>
<style lang="scss">
    .cinema-detail-head{
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            z-index: 50;
            background: #fff;
            border-bottom: .026667rem solid #E6E6E6;
            height: 1.173333rem;
            line-height: 1.173333rem;
            padding: 0;
            text-align: center;
            .cinema-back{
                    position: absolute;
                    top: .266667rem;
                    left: .32rem;
                    width: .64rem;
            }
            .cineama-name{
                color: #666;
                font-size: .453333rem;
                
            }
    }
    .cinema-detail-main{
        margin-top: 1.173333rem;
        .cinema-detail-order{
            height: 1.92rem;
            .cinema-intro{
                height: 1.92rem;
                    padding: .32rem 0;
                    margin: 0 .32rem;
                    border-bottom: .026667rem solid #e7e7e7;
                    position: relative;
                    .cinema-intro-left{
                        width: 85%;
                        float: left;
                        h3{
                            padding: 5px 0;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            color: #666;
                        }
                        p{
                                padding: 3px 0;
                                line-height: 1.43em; 
                                font-size: .32rem;       
                        }
                    }
                    .cinema-intro-right{
                        width: 15%;
                        float: left;
                        .phone{
                                width: .746667rem;
                                position: absolute;
                                top: 50%;
                                right: 2%;
                                margin-top: -0.373333rem;
                        }
                    }
            }
        }
    }
</style>
