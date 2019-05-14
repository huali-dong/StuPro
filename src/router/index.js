import Vue from "vue";
import VueRouter from "vue-router";

import AppHome from "@page/home/AppHome";
import AppMine from "@page/mine/AppMine";
import AppOrder from "@page/order/AppOrder";
import AppDetail from "@page/detail/AppDetail";
import AppLogin from "@page/login/login";
import AppReg from "@page/reg/reg";
import AppNotFound from "@page/not-found/NotFound";
import City from "@page/city/city";
import AppCineame from "@c/common/cinema/cinema";
import AppMovie from "@c/common/movie/movieheader";
import AppCineameDetail from "@c/common/cinema/cinemaDetail";
import AppSeat from "@c/common/seat/seat";
import AppBought from "@page/bought/bought";
import AppMyorder from "@page/myorder/myorder";
//使vuerouter成为全局组件
Vue.use(VueRouter);

const routes = [
    {
        path : "/",
        redirect :{name: 'home'},
    },
    {
        path : "/home",
        name : "home",
        component : AppHome
    },
    {
        path : "/mine",
        name : "mine",
        component : AppMine,
        //在这里做登陆权限验证，进入到这个路由的时候判断，用户有没有登陆
    },
    {
        path : "/myorder",//我的订单页面
        name : "myorder",
        component : AppMyorder,
    },
    {
        path : "/bought",//支付成功页面
        name : "bought",
        component : AppBought,
    },
    {
        path : "/order",
        name : "order",
        component : AppOrder,
        redirect:{name:"movie"},
         children:[
            {
                path : "cinema",
                name : "cinema",
                component : AppCineame,
            },
            {
                path : "movie",
                name : "movie",
                component : AppMovie,
            }
        ]
    },
   
    {
        path : "/city",
        name : "city",
        component :City,
        props:true,
    },
    {
        path : "/login",
        name : "login",
        component : AppLogin,
        props:true,
    },
    {
        path : "/reg",
        name : "reg",
        component : AppReg,
        props:true,
    },
    {
        path : "/cinemadetail",
        name : "cinemadetail",
        component : AppCineameDetail,
        props:true,
    },
    {
        path : "/detail",
        name : "detail",
        component : AppDetail,
        props:true
    },
    {
        path : "/seat",
        name : "seat",
        component : AppSeat,
        props:true
    },
    {
        path : "/not-found",
        name : "not-found",
        component : AppNotFound
    },
    {
        path : "**",
        redirect : "/not-found"
    }
    
]


const router =new VueRouter({
    mode:"history",
    routes
})
//
// router.beforeEach((to, from, next) => {
//     console.log(to,from)
//     next()
//   })
export default router