import { CHANGE_CITY } from "./mutations-types"
import axios from "axios"
export default {
    //定位当前信息，actions执行异步操作
   async getCurrentPosition(context){

        //获取城市信息;因为要更改id
    //    let citys = await axios.get("/mz/mta-service/data/migu/cities")
        let citys = await axios.get("/mg/mta-service/data/migu/cities.jsp")
        //获取定位城市
        // axios.get("/bd/location/ip",{
        axios.get("https://restapi.amap.com/v3/ip",{
            params:{
                // ak: 'EajH3hpCLeGgNMbnPqbVl1Bm9PWGD0HO'
                // ak:'ED64cIqRwt3NkXMH6IdrDFNFYgqbzxaW'
                key:'a663c36a1d7e2346add0eb52bf5d2496'
                
            }
        }).then(res=>{
            // console.log("res",res)
            let city={
                cityId :12,
                cityName : res.data.city.replace("市","")
            }
            //定位成功，更改城市的id
           
            for(var i=0;i<citys.data.cities.length;i++){
                if(citys.data.cities[i].cityName === city.cityName){
                    city.cityId = citys.data.cities[i].cityCode
                }
            }
            //提交mutations,
            // console.log(citys.data.cities,"citys")
            context.commit({
                type:CHANGE_CITY,
                city,
                cities:citys.data.cities
            })
        }).catch(err=>{
            console.log(err)
        })
    }
}