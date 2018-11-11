import Vue from 'vue'
import App from './App.vue'


//引入全局样式
import "@style/main.scss"

import "@libs/flexible";

// 引入各种插件：
import '@libs/index';
import router from "./router"

Vue.config.productionTip = false

//跟实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
