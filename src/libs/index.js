
import Vue from "vue";
import axios from "axios"
//引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

// filters
import '@util/filters'

import "@util/filtertime"

//引入axios
// import ajax from "@util/axios.js";

//将VueAweasomeSwiper注册为全局组件
Vue.use(VueAwesomeSwiper);

Vue.prototype.$http = axios;

