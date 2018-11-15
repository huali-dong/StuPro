import { CHANGE_CITY } from "./mutations-types"
import axios from "axios"
export default {
    //定位当前信息，actions执行异步操作
   async getCurrentPosition(context){

        //获取城市信息;因为要更改id
       let citys =await  axios.get("/mz/v4/api/city")
    //    console.log(citys)
        //获取定位城市
        axios.get("/bd/location/ip",{
            params:{
                ak: 'EajH3hpCLeGgNMbnPqbVl1Bm9PWGD0HO'
            }
        }).then(res=>{
            let city={
                cityID :12,
                cityName : res.data.content.address.replace("市","")
            }
            //定位成功，更改城市的id
            for(var i=0;i<citys.data.data.cities.length;i++){
                if(citys.data.data.cities[i].name === city.cityName){
                    city.cityID = citys.data.data.cities[i].id
                }
            }
            //提交mutations,
            context.commit({
                type:CHANGE_CITY,
                city,
                cities:citys.data.data.cities
            })
        }).catch(err=>{
            console.log(err)
        })
    }
}