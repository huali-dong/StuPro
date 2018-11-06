<template>
    <footer class="app-footer">
        <div class="footer-content">
            <ul >
                <li ref="li" @click="changeColor" class="footer-left" v-for="item in footer" :key="item.id">
                    <a class="footer-block">
                        <img :src="item.img" v-bind:class="{depColor:item.classActive}">
                        <p  v-bind:class="{depColor:item.classActive}">{{item.title}}</p>
                    </a>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script>
export default {
    data(){
        return {
            footer : [
                {id:1,title:"首页",img:"/images/mainMenu-find.png",path:"/",classActive:false},
                {id:2,title:"购票",img:"/images/mainMenu-member.png",path:"/",classActive:false},
                {id:4,title:"我的",img:"/images/mov-active.png",path:"/",classActive:false}
            ]
        }
    },
    methods:{
        changeColor (){
            console.log(this)
        }
    }
}
</script>

<style lang="scss">
    
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
                justify-content: center;
                li{
                    text-align: center;
                    a{
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        padding-top: .133333rem;
                        padding-bottom: .133333rem;
                        img{
                            width: .64rem;
                            height: .64rem;
                        }
                        .depColor{
                            color: #f74444;
                        }
                        p{
                            color: #666;
                            font-size: .32rem;
                        
                        }
                    }
                }
            }
    }
</style>

