<template>
<header>
    <div class="head">
        <div class="head-left">
            <a>
                <img v-bind:src="head.walletimg">
                <span>{{head.money}}</span>
            </a>
        </div>
        <div class="head-right">
            <a>
                <img :src="head.historyimg">
            </a>
            <a class="right">
                <img :src="head.search">
            </a>
        </div>
    </div>
    <nav class="navbar">
        <div class="navbar-left">
            <ul>
                <li v-for="item in navbar.message" :key="item.id">
                    {{item.title}}
                </li>
            </ul>
        </div> 
        <div class="nav-right">
            <a>
                <img v-bind:src="navbar.navListimg">
            </a>
        </div>
    </nav>
</header>
</template>
<script>
export default {
    data(){
        return {
            head:{
                walletimg:"./images/wallet.png",
                money:"0元",
                historyimg:"./images/history-btn.png",
                search:"./images/search_grey.png"
            },
            navbar:{
                message:[
                    {id:"1",title:"推荐"},
                    {id:"2",title:"影单"},
                    {id:"3",title:"小视频"},
                    {id:"4",title:"影评"}
                ],
                navListimg:"./images/nav-list.png"
            }
        }
    }
}
</script>
<style lang="scss">
    header{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: #fff;
        .head{
            padding: 8px 12px;
            text-align: center;
            position: relative;
            height: 40px;
            display: flex;
            justify-content: space-between;
            .head-left{
                a{
                     display: flex;
                    justify-content: flex-start;
                    font-size: 0;
                    img{
                        width: 24px;
                        height: 24px;
                        margin-right: 5px;
                    }
                    span{
                        font-size: 15px;
                        text-align: left;
                    }
                }
               
            }
            .head-right{
                text-align: right;
                a{
                    img{
                        width: 24px;
                        height: 24px;
                    }
                }
                .right{
                    margin-left: .266667rem;
                }
                
            }
        }
        .navbar{
            width: 100%;
            height: 1.066667rem;
            display: flex;
            justify-content: flex-start;
            .navbar-left{
                width: 83%;
                ul{
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    li{
                        padding-top: .213333rem;
                        padding-bottom: .32rem;
                        font-size: .373333rem;
                        text-align: center;
                        &:hover{
                            border-bottom: .053333rem solid #F74444;
                            color: #F74444;
                        }
                    }
                }
            }
            .nav-right{
                    width: 17%;
                    text-align: center; 
                    img{
                        width: .56rem;
                        height: .56rem; 
                        vertical-align: bottom;
                        margin-top: .186667rem;
                    }
            }
        }
    }
</style>
