
import {CHANGE_CITY} from "@store/chunks/mutations-types"
const savecity =(store)=> {
    store.subscribe((mutation,state)=>{
        // console.log(mutation)
           // 如果这次提交是要更改city，就将更改后的city保存在存储中
        if ( mutation.type === CHANGE_CITY ) {
        if (mutation.payload.citys) localStorage.cities = JSON.stringify(mutation.payload.citys);
            localStorage.city = JSON.stringify(mutation.payload.city)
        }
    })
}

export {savecity}