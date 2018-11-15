
import Vue from  "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import chunks from "./chunks"
import {savecity} from "./plugins"
const store = new Vuex.Store({
    modules:{
        chunks
    },
    plugins:[savecity]
})

export default store