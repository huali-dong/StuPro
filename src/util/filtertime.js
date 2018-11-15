

import Vue from "vue"
//将2018-11-23转化为11月23日,并且加上星期几
Vue.filter("time",(time)=>{
    let res = time.split("-");
    var ssdate = new Date(res[0], parseInt(res[1] - 1), res[2]);
    if(res[2]){//因为传过来的数据有些只有月，没有日
        var  week1 = String(ssdate.getDay()).replace("0","日").replace("1","一").replace("2","二").replace("3","三").replace("4","四").replace("5","五").replace("6","六")//就是你要的星期几
        return  res[1] + "月" + res[2] + "日 " + " 星期" + week1;
    }else{
        return  res[1] + "月";
    }
    
})