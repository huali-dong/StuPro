import Vue from 'vue'
import App from './App.vue'


//引入全局样式
import "@style/main.scss"

import "@libs/flexible";

Vue.config.productionTip = false

//跟实例
new Vue({
  render: h => h(App)
}).$mount('#app')
