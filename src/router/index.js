import Vue from "vue";
import VueRouter from "vue-router";

import AppHome from "@page/home/AppHome";
import AppMine from "@page/mine/AppMine";
import AppOrder from "@page/order/AppOrder";
import AppDetail from "@page/detail/AppDetail";
import AppLogin from "@page/login/login"
import AppNotFound from "@page/not-found/NotFound";
import City from "@page/city/city"

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
        path : "/order/:url",
        name : "order",
        component : AppOrder,
        props:true,
    },
    {
        path : "/login",
        name : "login",
        component : AppLogin,
        props:true,
    },
    {
        path : "/detail",
        name : "detail",
        component : AppDetail,
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