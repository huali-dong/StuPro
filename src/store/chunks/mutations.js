import {
    CHANGE_CITY
} from "./mutations-types"

export default{
    //要改变当前城市
    [CHANGE_CITY]:(state,payload)=>{
        //做一个深拷贝是为了预防引用类型数据传过来,传过来的是地址,更改payload也就会更改state
        state.city = _.cloneDeep(payload.city);
        if( payload.cities) state.cities = payload.cities
    }
}