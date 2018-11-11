<template>
    <footer class="app-footer">
        <div class="footer-content">
            <ul >
                <router-link  tag="a" ref="li" class="footer-left" v-for="item in footer" :key="item.id"
                    :to = "item.path"
                    active-class="depColor"
                    @click="change"
                >
                <div>
                    <img :src="item.img">
                    <p >{{item.title}}</p>
                </div>
                </router-link>
            </ul>
        </div>
    </footer>
</template>

<script>
export default {
    data(){
        return {
            footer : [
                {id:1,title:"首页",img:"/images/mainMenu-seeFilm.png",path:"/home"},
                {id:2,title:"购票",img:"/images/mainMenu-tickets.png",path:"/order/now-playing"},
                {id:4,title:"我的",img:"/images/mainMenu-member.png",path:"/mine"}
            ]
        }
    },
    methods:{
        change(){
            console.log(this,333)
        }
    }
}
</script>

<style lang="scss">
      .depColor{
            color:  #f74444 !important;
        }
    .footer-content{
            position: fixed;
            bottom: 0;
            z-index: 999;
            background: #fff;
            width: 100%;
            border-top: 1px solid #dadada;
            height: 1.333333rem;
            ul{
                list-style: none;
                display: flex;
                justify-content: space-around;
                a{
                    text-align: center;
                     color: #666;
                    div{
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        padding-top: .133333rem;
                        padding-bottom: .133333rem;
                        
                        img{
                            width: .64rem;
                            height: .64rem;
                        }
                        p{
                            font-size: .32rem;
                        }
                    }
                }
            }
    }
</style>

