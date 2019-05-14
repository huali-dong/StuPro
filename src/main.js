import Vue from 'vue'
import App from './App.vue'


//引入全局样式
import "@style/main.scss"

import "@libs/flexible";

// 引入各种插件以及util里面的工具：
import '@libs/index';
import router from "./router"

import store from "./store"
Vue.config.productionTip = false

//跟实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
